const express = require('express');
const crypto = require('crypto');
const { read, write } = require('../lib/store');

const router = express.Router();

// POST /api/contact — stores the message and logs it. Wire up real email
// delivery (e.g. nodemailer, Resend, SES) where the TODO below is.
router.post('/', (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }

  const entry = {
    id: crypto.randomUUID(),
    name: String(name).slice(0, 80),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 2000),
    createdAt: new Date().toISOString(),
  };

  const messages = read('contact', []);
  messages.push(entry);
  write('contact', messages);

  // TODO: send an email/Slack notification to the Subeazy team here.
  console.log('[contact] new message from', entry.email);

  res.status(201).json({ ok: true });
});

module.exports = router;
