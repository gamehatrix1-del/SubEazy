const express = require('express');
const { read, write } = require('../lib/store');

const router = express.Router();
const clients = new Set();

function monthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(date = new Date()) {
  return date.toLocaleString('en-US', { month: 'long' });
}

function currentState() {
  const state = read('orders', { count: 0, monthKey: monthKey() });
  if (state.monthKey !== monthKey()) {
    state.count = 0;
    state.monthKey = monthKey();
    write('orders', state);
  }
  return state;
}

function broadcast(payload) {
  const message = `event: order\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const res of clients) {
    res.write(message);
  }
}

// GET /api/orders/count — current honest count for this calendar month.
router.get('/count', (_req, res) => {
  const state = currentState();
  res.json({ count: state.count, monthLabel: monthLabel() });
});

// GET /api/orders/stream — SSE feed so the on-page counter updates live.
router.get('/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders?.();
  clients.add(res);

  req.on('close', () => {
    clients.delete(res);
  });
});

// POST /api/orders/event — call this from your own order-confirmation flow
// (e.g. a WhatsApp Business webhook or a manual admin action) whenever a
// real order is delivered. Never fabricate calls to this endpoint.
router.post('/event', (req, res) => {
  const secret = req.header('x-subeazy-secret');
  if (!process.env.ORDER_EVENT_SECRET || secret !== process.env.ORDER_EVENT_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const state = currentState();
  state.count += 1;
  write('orders', state);

  const payload = { count: state.count, monthLabel: monthLabel() };
  broadcast(payload);
  res.status(201).json(payload);
});

module.exports = router;
