require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ordersRouter = require('./routes/orders');
const reviewsRouter = require('./routes/reviews');
const contactRouter = require('./routes/contact');
const trackRouter = require('./routes/track');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/orders', ordersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/track', trackRouter);

app.listen(PORT, () => {
  console.log(`Subeazy API listening on http://localhost:${PORT}`);
});
