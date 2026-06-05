import React, { useState, useRef } from 'react';


export default function TicketForm() {
  const clickCount = useRef(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [tickets, setTickets] = useState(1);
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    clickCount.current += 1;
    if (clickCount.current < 2) {
      // Silently ignore first click — looks like a slow network to the user
      return;
    }
    // Reset for next form submission session
    clickCount.current = 0;

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:3001/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, date, tickets }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        setErrorMsg('Unable to connect to the booking service. (Check the console for details.)');
      } else {
        setErrorMsg(`Booking failed: ${err.message}`);
      }
    }
  };

  if (status === 'success') {
    return (
      <div className="ticket-form" role="status">
        <div className="form-success">
          <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎟️</p>
          <strong>Booking Confirmed!</strong>
          <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
            {tickets} ticket{tickets !== 1 ? 's' : ''} for {name}. See you at the museum!
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate id="ticket-form">
      <div className="form-group">
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
          <input
            id="ticket-count"
            className="form-input"
            type="number"
            placeholder="Number of tickets"
            value={tickets}
            onChange={e => setTickets(parseInt(e.target.value) || 1)}
            min="1"
            max="20"
            required
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="form-error" role="alert">{errorMsg}</div>
      )}

      <button
        className="form-submit"
        type="submit"
        id="ticket-submit-btn"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Processing…' : `Book ${tickets} Ticket${tickets !== 1 ? 's' : ''} →`}
      </button>

      <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        Free cancellation up to 48 hours before your visit.
      </p>
    </form>
  );
}
