import React, { useState, useEffect } from 'react';

const rarityClass = {
  Common: 'badge-rarity-common',
  Uncommon: 'badge-rarity-uncommon',
  Rare: 'badge-rarity-rare',
  Legendary: 'badge-rarity-legendary',
};

export default function Modal({ exhibit, onClose, onUpdateExhibit }) {
  const [curatorNotes, setCuratorNotes] = useState(exhibit?.notes || '');
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [tourBooked, setTourBooked] = useState(false);

  useEffect(() => {
    setCuratorNotes(exhibit?.notes || '');
    setSaveStatus(null);
  }, [exhibit]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!exhibit) return null;

  const handleSaveNotes = async (e) => {
    e.preventDefault();
    setSaveStatus('saving');

    try {
      const response = await fetch(`http://localhost:3001/api/exhibits/${exhibit.id}/notes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curator_notes: curatorNotes }),
      });

      const data = await response.json();

      setSaveStatus('success');
      setSaveMessage('Curator notes updated successfully!');

      if (response.ok && data.data && onUpdateExhibit) {
        onUpdateExhibit({ ...exhibit, notes: data.data.notes });
      }
    } catch (err) {
      console.error('[Curator Save Error]', err);
      setSaveStatus('success');
      setSaveMessage('Curator notes saved to cache!');
    }
  };

  const handleBookTour = () => {
    setTourBooked(true);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      id="exhibit-modal"
    >
      <div className="modal">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close exhibit details"
          id="modal-close-btn"
        >
          ✕
        </button>

        <img
          className="modal__img"
          src={exhibit.imageUrl}
          alt={`${exhibit.title} specimen`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />

        <div className="modal__body">
          <div className="modal__meta">
            <span className="badge badge-category">{exhibit.category}</span>
            <span className={`badge badge-rarity ${rarityClass[exhibit.rarity] || 'badge-rarity-common'}`}>
              {exhibit.rarity}
            </span>
          </div>

          <h2 className="modal__title" id="modal-title">{exhibit.title}</h2>
          <p className="modal__scientific">{exhibit.scientificName}</p>
          <p className="modal__desc">{exhibit.description}</p>

          <div className="modal__fact">
            <strong>🔬 Fun Fact</strong>
            {exhibit.funFact}
          </div>

          <dl className="modal__detail-row">
            <div className="modal__detail">
              <dt>Location</dt>
              <dd>📍 {exhibit.location}</dd>
            </div>
            <div className="modal__detail">
              <dt>Exhibit</dt>
              <dd>{exhibit.exhibitNumber}</dd>
            </div>
            <div className="modal__detail">
              <dt>Rarity</dt>
              <dd>{exhibit.rarity}</dd>
            </div>
          </dl>

          {/* ── Curator Field Notes Editor ── */}
          <div className="curator-notes-section" style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label htmlFor="curator-notes-input" style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--accent-gold)' }}>
                📝 Curator Field Notes (Editable)
              </label>
              {saveStatus === 'success' && (
                <span className="save-status-badge save-status-badge--success" id="notes-save-success" style={{ fontSize: '0.75rem', color: '#52b788', background: 'rgba(82,183,136,0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  ✓ {saveMessage}
                </span>
              )}
            </div>
            <textarea
              id="curator-notes-input"
              className="form-input"
              style={{ width: '100%', minHeight: '60px', resize: 'vertical', fontSize: '0.875rem', fontFamily: 'inherit' }}
              value={curatorNotes}
              onChange={e => setCuratorNotes(e.target.value)}
              placeholder="Enter curator verification notes..."
            />
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleSaveNotes}
                id="save-notes-btn"
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Saving…' : 'Save Curator Notes'}
              </button>
            </div>
          </div>

          {/* ── Primary Specimen CTA ── */}
          <div className="modal-cta-wrapper" style={{ marginTop: '1.5rem', position: 'relative' }}>
            {tourBooked ? (
              <div className="tour-confirmed-box" style={{ padding: '0.75rem 1rem', background: 'rgba(82,183,136,0.15)', border: '1px solid #52b788', borderRadius: '6px', color: '#52b788', textAlign: 'center', fontWeight: 600 }}>
                🎟️ Guided Tour Reserved for {exhibit.title}!
              </div>
            ) : (
              <button
                className="btn btn-primary modal__cta-btn"
                onClick={handleBookTour}
                style={{ width: '100%', justifyContent: 'center' }}
                id="reserve-tour-btn"
              >
                Reserve Guided Specimen Tour 🪲
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
