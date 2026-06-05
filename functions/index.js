
const functions = require('firebase-functions');
const express = require('express');

const app = express();
app.use(express.json());


const tickets = [];

const exhibits = [
  { id: 1, title: 'Ladybug', category: 'Beetle', rarity: 'Common' },
  { id: 2, title: 'Stag Beetle', category: 'Beetle', rarity: 'Uncommon' },
  { id: 3, title: 'Firefly', category: 'Beetle', rarity: 'Uncommon' },
  { id: 4, title: 'Atlas Moth', category: 'Moth', rarity: 'Rare' },
  { id: 5, title: 'Praying Mantis', category: 'Mantis', rarity: 'Uncommon' },
  { id: 6, title: 'Hercules Beetle', category: 'Beetle', rarity: 'Rare' },
  { id: 7, title: 'Monarch Butterfly', category: 'Butterfly', rarity: 'Uncommon' },
  { id: 8, title: 'Orchid Mantis', category: 'Mantis', rarity: 'Rare' },
  { id: 9, title: 'Ant Colony', category: 'Ant', rarity: 'Common' },
  { id: 10, title: 'Dragonfly', category: 'Dragonfly', rarity: 'Common' },
  { id: 11, title: 'Leaf Insect', category: 'Stick Insect', rarity: 'Rare' },
  { id: 12, title: 'Goliath Beetle', category: 'Beetle', rarity: 'Common' },
];

app.get('/exhibits', (req, res) => res.json({ success: true, data: exhibits }));

app.post('/tickets', (req, res) => {
  const { name, email, date, tickets: count } = req.body;
  if (!name || !email || !date) {
    return res.status(400).json({ success: false, error: 'Missing fields' });
  }
  const booking = {
    id: `BOOK-${Date.now()}`,
    name, email, date,
    tickets: parseInt(count) || 1,
    createdAt: new Date().toISOString(),
  };
  tickets.push(booking);
  res.status(201).json({ success: true, booking });
});

app.get('/tickets', (req, res) => {
  res.json({ success: true, bookings: tickets });
});

exports.api = functions.https.onRequest(app);
