
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());


// In-memory ticket store
const tickets = [];

app.get('/api/exhibits', (req, res) => {
  const { exhibits } = require('./exhibits-data');
  res.json({ success: true, data: exhibits });
});

app.post('/api/tickets', (req, res) => {
  const { name, email, date, tickets: ticketCount } = req.body;

  if (!name || !email || !date) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, date',
    });
  }

  const booking = {
    id: `BOOK-${Date.now()}`,
    name,
    email,
    date,
    tickets: parseInt(ticketCount) || 1,
    createdAt: new Date().toISOString(),
  };

  tickets.push(booking);

  console.log(`[Museum of Bugs API] Ticket booked: ${booking.id} for ${name} on ${date}`);

  res.status(201).json({
    success: true,
    booking,
    message: `Booking confirmed! Reference: ${booking.id}`,
  });
});

/**
 * GET /api/tickets — List all bookings (for workshop inspection)
 */
app.get('/api/tickets', (req, res) => {
  res.json({ success: true, bookings: tickets, count: tickets.length });
});

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════╗
║   Museum of Bugs – API Server                ║
║   Running on http://localhost:${PORT}           ║
║                                              ║
║   ⚠️  WARNING: CORS is intentionally missing  ║
║   This is Bug #10 for the workshop exercise  ║
╚══════════════════════════════════════════════╝
  `);
});

module.exports = app;
