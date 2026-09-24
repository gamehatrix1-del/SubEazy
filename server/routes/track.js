const express = require('express');

const router = express.Router();

// POST /api/track — relays a browser event to the Meta Conversions API so
// server-side and Pixel events dedupe on the same eventId. Requires
// META_PIXEL_ID and META_CAPI_ACCESS_TOKEN; without them it's a no-op so
// local dev doesn't break.
router.post('/', async (req, res) => {
  const { eventName, eventId, payload } = req.body ?? {};
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return res.status(202).json({ ok: true, relayed: false });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: accessToken,
        data: [
          {
            event_name: eventName,
            event_id: eventId,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            custom_data: payload,
            user_data: {
              client_ip_address: req.ip,
              client_user_agent: req.header('user-agent'),
            },
          },
        ],
      }),
    });
    const relayed = response.ok;
    res.status(202).json({ ok: true, relayed });
  } catch {
    res.status(202).json({ ok: true, relayed: false });
  }
});

module.exports = router;
