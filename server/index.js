const express = require('express');
const cors = require('cors');
const { exhibits: initialExhibits } = require('./exhibits-data');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let exhibitsList = JSON.parse(JSON.stringify(initialExhibits));
let tickets = [];

app.use((req, res, next) => {
  console.log(`[API ${new Date().toISOString().split('T')[1].slice(0, 8)}] ${req.method} ${req.url}`);
  next();
});

/**
 * GET /api/exhibits — Returns all exhibit data
 */
app.get('/api/exhibits', (req, res) => {
  res.json({ success: true, data: exhibitsList });
});

/**
 * GET /api/exhibits/search — Search exhibits by query
 */
app.get('/api/exhibits/search', (req, res) => {
  const q = (req.query.q || '').trim();

  if (!q) {
    return res.json({ success: true, data: exhibitsList });
  }

  if (q.toLowerCase().includes('goliath')) {
    console.error(`[API ERROR] 500 Internal Server Error: Database taxonomy crash on search term "${q}"`);
    return res.status(500).json({
      success: false,
      error: "Database query failed: Exhibit 'Goliath Beetle' classification mismatch in inventory engine (Code: ERR_INVENTORY_TAXONOMY_CRASH).",
      code: "ERR_INVENTORY_TAXONOMY_CRASH",
    });
  }

  const matches = exhibitsList.filter(e => 
    e.title.toLowerCase().includes(q.toLowerCase()) ||
    e.category.toLowerCase().includes(q.toLowerCase()) ||
    e.location.toLowerCase().includes(q.toLowerCase())
  );

  res.json({ success: true, data: matches, count: matches.length });
});

/**
 * GET /api/exhibits/:id — Get a single exhibit
 */
app.get('/api/exhibits/:id', (req, res) => {
  const exhibit = exhibitsList.find(e => e.id === parseInt(req.params.id, 10));
  if (!exhibit) {
    return res.status(404).json({ success: false, error: 'Exhibit not found' });
  }
  res.json({ success: true, data: exhibit });
});

/**
 * PUT /api/exhibits/:id/notes — Update curator notes
 */
app.put('/api/exhibits/:id/notes', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exhibitIndex = exhibitsList.findIndex(e => e.id === id);

  if (exhibitIndex === -1) {
    return res.status(404).json({ success: false, error: 'Exhibit not found' });
  }

  const { notes } = req.body;

  if (typeof notes !== 'string') {
    return res.status(400).json({
      success: false,
      error: "Missing required string field 'notes' in request body. Received: " + JSON.stringify(req.body),
    });
  }

  exhibitsList[exhibitIndex].notes = notes;
  console.log(`[API] Updated curator notes for Exhibit #${id}: "${notes}"`);

  res.json({
    success: true,
    message: 'Curator notes updated successfully',
    data: exhibitsList[exhibitIndex],
  });
});

/**
 * POST /api/tickets — Book museum tickets
 */
app.post('/api/tickets', async (req, res) => {
  const { name, email, date, tickets: ticketCount } = req.body;

  if (!name || !email || !date) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, date',
    });
  }

  await new Promise(resolve => setTimeout(resolve, 1200));

  const booking = {
    id: `BOOK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name,
    email,
    date,
    tickets: parseInt(ticketCount, 10) || 1,
    createdAt: new Date().toISOString(),
  };

  tickets.push(booking);
  console.log(`[API] Ticket booked: ${booking.id} for ${name}`);

  res.status(201).json({
    success: true,
    booking,
    totalBookingsForUser: tickets.filter(t => t.email === email).length,
    message: `Booking confirmed! Reference: ${booking.id}`,
  });
});

/**
 * GET /api/tickets — List all bookings
 */
app.get('/api/tickets', (req, res) => {
  res.json({ success: true, bookings: tickets, count: tickets.length });
});

/**
 * DELETE /api/tickets — Reset ticket bookings
 */
app.delete('/api/tickets', (req, res) => {
  tickets = [];
  res.json({ success: true, message: 'All bookings cleared' });
});

/**
 * POST /api/reset — Reset entire API state
 */
app.post('/api/reset', (req, res) => {
  exhibitsList = JSON.parse(JSON.stringify(initialExhibits));
  tickets = [];
  res.json({ success: true, message: 'API state reset to default' });
});

app.listen(PORT, () => {
  console.log(`[Museum of Bugs API] Server running on http://localhost:${PORT}`);
});

module.exports = app;
