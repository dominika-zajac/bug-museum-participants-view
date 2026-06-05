import React from 'react';

import heroBannerLarge from '../assets/hero_banner_large.png';
import ladybugImg from '../assets/exhibit_ladybug_1780132631312.png';
import stagBeetleImg from '../assets/exhibit_stag_beetle_1780132644943.png';
import atlasMothImg from '../assets/exhibit_atlas_moth_1780132671135.png';
import prayingMantisImg from '../assets/exhibit_praying_mantis_1780132683967.png';
import monarchButterflyImg from '../assets/exhibit_monarch_butterfly_1780132715828.png';
import orchidMantisImg from '../assets/exhibit_orchid_mantis_1780132727559.png';

const galleryItems = [
  { src: heroBannerLarge, alt: 'Museum grand hall', caption: 'The Grand Entomology Hall, Est. 1842' },
  { src: atlasMothImg, alt: 'Atlas Moth specimen', caption: 'Atlas Moth – Wingspan record 28cm' },
  { src: orchidMantisImg, alt: 'Orchid Mantis', caption: 'Orchid Mantis – Master of disguise' },
  { src: monarchButterflyImg, alt: 'Monarch Butterfly', caption: 'Monarch migration display' },
  { src: prayingMantisImg, alt: 'Praying Mantis', caption: 'Mantis religiosa – Hunt sequence' },
  { src: ladybugImg, alt: 'Ladybug', caption: 'Coccinellidae collection' },
  { src: stagBeetleImg, alt: 'Stag Beetle', caption: 'Stag Beetle – Male specimen EX-002' },
];

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery" aria-labelledby="gallery-heading">
      <div className="container">
        <span className="section-label">🖼️ Photo Gallery</span>
        <h2 id="gallery-heading">Specimen Gallery</h2>
        <div className="divider" aria-hidden="true" />
        <p style={{ color: 'var(--text-secondary)', maxWidth: 520, marginBottom: '0.5rem' }}>
          Explore our photographic record of all specimens. Images captured using
          high-resolution macroscopic photography equipment by our in-house team.
        </p>

        <div className="gallery-grid" role="list">
          {galleryItems.map((item, i) => (
            <figure
              key={i}
              className="gallery-item"
              role="listitem"
              id={`gallery-item-${i}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                style={{ width: '100%' }}
              />
              <figcaption style={{
                padding: '0.625rem 0.875rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-surface)',
                borderTop: '1px solid var(--border)',
              }}>
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
