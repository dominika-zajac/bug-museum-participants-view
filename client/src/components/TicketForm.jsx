import React, { useState } from 'react';

export default function TicketForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [tickets, setTickets] = useState(1);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingRef, setBookingRef] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, date, tickets }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      setBookingRef(data.booking?.id);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(`Booking failed: ${err.message}`);
    }
  };

  if (status === 'success') {
    return (
      <div className="ticket-form" role="status" id="ticket-success-message">
        <div className="form-success">
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎟️</p>
          <strong>Booking Confirmed!</strong>
          <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
            {tickets} ticket{tickets !== 1 ? 's' : ''} confirmed for {name}.
          </p>
          {bookingRef && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
              Booking Reference: <code>{bookingRef}</code>
            </p>
          )}
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem' }}
            onClick={() => {
              setStatus(null);
              setName('');
              setEmail('');
            }}
          >
            Book Another Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate id="ticket-form">
      <div className="form-group">
        <label htmlFor="ticket-name" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
          Full Name
        </label>
        <input
          id="ticket-name"
          className="form-input"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ticket-email" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
          Email Address
        </label>
        <input
          id="ticket-email"
          className="form-input"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ticket-date" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
            Visit Date
          </label>
          <input
            id="ticket-date"
            className="form-input"
            type="date"
            placeholder="Visit date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ticket-count" style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
            Tickets
          </label>
          <input
            id="ticket-count"
            className="form-input"
            type="number"
            placeholder="Qty"
            value={tickets}
            onChange={e => setTickets(parseInt(e.target.value, 10) || 1)}
            min="1"
            max="20"
            required
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="form-error" role="alert" style={{ color: '#e05252', fontSize: '0.875rem', margin: '0.5rem 0' }}>
          {errorMsg}
        </div>
      )}

      <button
        className="form-submit"
        type="submit"
        id="ticket-submit-btn"
      >
        Book {tickets} Ticket{tickets !== 1 ? 's' : ''} →
      </button>

      <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        Free cancellation up to 48 hours before your visit.
      </p>
    </form>
  );
}
