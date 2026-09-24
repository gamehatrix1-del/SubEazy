const express = require('express');
const crypto = require('crypto');
const { read, write } = require('../lib/store');

const router = express.Router();

function all() {
  return read('reviews', []);
}

// GET /api/reviews — only approved reviews are ever exposed publicly.
router.get('/', (_req, res) => {
  const approved = all()
    .filter((r) => r.status === 'approved')
    .map(({ id, name, product, quote, rating, verified }) => ({ id, name, product, quote, rating, verified }));
  res.json(approved);
});

// POST /api/reviews — buyer-submitted review, held for manual moderation.
router.post('/', (req, res) => {
  const { name, email, product, quote, rating } = req.body ?? {};
  if (!name || !quote || !product) {
    return res.status(400).json({ error: 'name, product and quote are required' });
  }

  const review = {
    id: crypto.randomUUID(),
    name: String(name).slice(0, 80),
    email: email ? String(email).slice(0, 200) : '',
    product: String(product).slice(0, 80),
    quote: String(quote).slice(0, 600),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    verified: false,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const reviews = all();
  reviews.push(review);
  write('reviews', reviews);

  res.status(201).json({ ok: true });
});

// POST /api/reviews/:id/approve — admin-only: promote a pending review to public.
// Call with header x-subeazy-secret matching REVIEW_ADMIN_SECRET.
router.post('/:id/approve', (req, res) => {
  const secret = req.header('x-subeazy-secret');
  if (!process.env.REVIEW_ADMIN_SECRET || secret !== process.env.REVIEW_ADMIN_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const reviews = all();
  const review = reviews.find((r) => r.id === req.params.id);
  if (!review) {
    return res.status(404).json({ error: 'not found' });
  }
  review.status = 'approved';
  if (req.body?.verified) {
    review.verified = true;
  }
  write('reviews', reviews);
  res.json({ ok: true });
});

module.exports = router;
