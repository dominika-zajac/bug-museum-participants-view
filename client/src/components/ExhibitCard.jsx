import React, { useState } from 'react';

const rarityClass = {
  Common: 'badge-rarity-common',
  Uncommon: 'badge-rarity-uncommon',
  Rare: 'badge-rarity-rare',
  Legendary: 'badge-rarity-legendary',
};

export default function ExhibitCard({ exhibit, onOpen, style }) {
  const [isFav, setIsFav] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="exhibit-card"
      style={style}
      onClick={() => onOpen(exhibit)}
      id={`exhibit-card-${exhibit.id}`}
    >
      <div className="exhibit-card__img-wrap">
        {imgError ? (
          <div className="img-error">
            <span className="img-error-icon">🖼️</span>
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            className="exhibit-card__img"
            src={exhibit.imageUrl}
            alt={exhibit.title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        <span className="exhibit-card__number">{exhibit.exhibitNumber}</span>

        <button
          className={`exhibit-card__fav ${isFav ? 'is-fav' : ''}`}
          onClick={(e) => { e.stopPropagation(); setIsFav(!isFav); }}
          id={`fav-btn-${exhibit.id}`}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>

      <div className="exhibit-card__body">
        <div className="exhibit-card__meta">
          <span className="badge badge-category">{exhibit.category}</span>
          <span className={`badge badge-rarity ${rarityClass[exhibit.rarity] || 'badge-rarity-common'}`}>
            {exhibit.rarity}
          </span>
        </div>
        <h3 className="exhibit-card__title">{exhibit.title}</h3>
        <p className="exhibit-card__scientific">{exhibit.scientificName}</p>
        <p className="exhibit-card__desc">{exhibit.description}</p>
      </div>

      <div className="exhibit-card__footer">
        <span className="exhibit-card__location">
          📍 {exhibit.location}
        </span>
        <span className="exhibit-card__view-btn">View Exhibit →</span>
      </div>
    </article>
  );
}
