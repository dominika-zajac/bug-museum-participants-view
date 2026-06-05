import {setGlobalOptions} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import { exhibits } from "./exhibits-data";

setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(express.json());


// In-memory ticket store
const tickets: any[] = [];

app.get('/api/exhibits', (req, res) => {
  res.json({ success: true, data: exhibits });
});

app.post('/api/tickets', (req, res) => {
  const { name, email, date, tickets: ticketCount } = req.body;

  if (!name || !email || !date) {
    res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, date',
    });
    return;
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

export const api = onRequest(app);
