import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import cors from "cors";
import { exhibits as initialExhibits } from "./exhibits-data";

setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

let exhibitsList = JSON.parse(JSON.stringify(initialExhibits));
let tickets: any[] = [];

/**
 * GET /api/exhibits — Returns exhibit data
 */
app.get('/api/exhibits', (req, res) => {
  res.json({ success: true, data: exhibitsList });
});

/**
 * GET /api/exhibits/search — Search exhibits by query
 */
app.get('/api/exhibits/search', (req, res) => {
  const q = ((req.query.q as string) || '').trim();

  if (!q) {
    res.json({ success: true, data: exhibitsList });
    return;
  }

  if (q.toLowerCase().includes('goliath')) {
    res.status(500).json({
      success: false,
      error: "Database query failed: Exhibit 'Goliath Beetle' classification mismatch in inventory engine (Code: ERR_INVENTORY_TAXONOMY_CRASH).",
      code: "ERR_INVENTORY_TAXONOMY_CRASH",
    });
    return;
  }

  const matches = exhibitsList.filter((e: any) =>
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
  const id = parseInt(req.params.id, 10);
  const exhibit = exhibitsList.find((e: any) => e.id === id);
  if (!exhibit) {
    res.status(404).json({ success: false, error: 'Exhibit not found' });
    return;
  }
  res.json({ success: true, data: exhibit });
});

/**
 * PUT /api/exhibits/:id/notes — Update curator notes
 */
app.put('/api/exhibits/:id/notes', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const exhibitIndex = exhibitsList.findIndex((e: any) => e.id === id);

  if (exhibitIndex === -1) {
    res.status(404).json({ success: false, error: 'Exhibit not found' });
    return;
  }

  const { notes } = req.body;

  if (typeof notes !== 'string') {
    res.status(400).json({
      success: false,
      error: "Missing required string field 'notes' in request body. Received: " + JSON.stringify(req.body),
    });
    return;
  }

  exhibitsList[exhibitIndex].notes = notes;
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
    res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, date',
    });
    return;
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

  res.status(201).json({
    success: true,
    booking,
    totalBookingsForUser: tickets.filter((t: any) => t.email === email).length,
    message: `Booking confirmed! Reference: ${booking.id}`,
  });
});

/**
 * GET /api/tickets — List all bookings
 */
app.get('/api/tickets', (req, res) => {
  res.json({ success: true, bookings: tickets, count: tickets.length });
});

export const api = onRequest(app);
