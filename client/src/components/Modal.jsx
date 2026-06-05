import React, { useEffect } from 'react';

const rarityClass = {
  Common: 'badge-rarity-common',
  Uncommon: 'badge-rarity-uncommon',
  Rare: 'badge-rarity-rare',
  Legendary: 'badge-rarity-legendary',
};


export default function Modal({ exhibit, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    // Should be:
    // return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!exhibit) return null;

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

          {/* Key recommendation: Add an interactive button inside the z-index blocked zone */}
          <div style={{ marginTop: '2rem', display: 'flex', position: 'relative' }}>
            <button
              className="btn btn-primary"
              onClick={() => alert(`Successfully adopted: ${exhibit.title}! Check your email for adoption papers.`)}
              style={{ width: '100%', justifyContent: 'center' }}
              id="adopt-specimen-btn"
            >
              Adopt this Specimen 🪲
            </button>

            <div className="modal__ghost-cover" id="modal-ghost-cover" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>
  );
}
