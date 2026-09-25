import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ExhibitCard from './components/ExhibitCard';
import Modal from './components/Modal';
import TicketForm from './components/TicketForm';
import GiftShop from './components/GiftShop';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

import { exhibits as defaultExhibits } from './data/exhibits';

function MuseumSite({ cartCount, onAddToCart }) {
  const [exhibitsList, setExhibitsList] = useState(defaultExhibits);
  const [selectedExhibit, setSelectedExhibit] = useState(null);
  const [searchFilter, setSearchFilter] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/exhibits')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setExhibitsList(prev => prev.map(localEx => {
            const remoteEx = data.data.find(d => d.id === localEx.id);
            return remoteEx ? { ...localEx, ...remoteEx } : localEx;
          }));
        }
      })
      .catch(() => {
        // Fallback to local default data
      });
  }, []);

  const handleSearch = useCallback((filter) => {
    setSearchFilter(filter);
  }, []);

  const handleExhibitUpdate = useCallback((updatedExhibit) => {
    setExhibitsList(prev => prev.map(e => e.id === updatedExhibit.id ? updatedExhibit : e));
    setSelectedExhibit(updatedExhibit);
  }, []);

  const filteredExhibits = exhibitsList.filter(exhibit => {
    if (searchFilter.error) return false;

    if (searchFilter.apiResults) {
      const isMatch = searchFilter.apiResults.some(r => r.id === exhibit.id);
      if (!isMatch) return false;
    } else if (searchFilter.nameRegex && !searchFilter.nameRegex.test(exhibit.title)) {
      return false;
    }

    if (searchFilter.category && exhibit.category !== searchFilter.category) return false;
    if (searchFilter.rarity && exhibit.rarity !== searchFilter.rarity) return false;
    return true;
  });

  const handleOpenModal = useCallback((exhibit) => {
    setSelectedExhibit(exhibit);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedExhibit(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" id="hero" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="container">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <span aria-hidden="true">🔬</span>
              Entomological Collection · Est. 1842
            </div>
            <h1 className="hero__title" id="hero-title">
              Welcome to the<br />Museum of Bugs
            </h1>
            <p className="hero__desc">
              Explore over 12 million specimens spanning 300 million years of
              evolution. From the humble ladybug to the legendary Goliath Beetle —
              every creature tells a story. Most of them involve eating something.
            </p>
            <div className="hero__cta">
              <a href="#exhibits" className="btn btn-primary">
                🪲 Explore Exhibits
              </a>
              <a href="#tickets" className="btn btn-ghost">
                🎟️ Book Tickets
              </a>
            </div>
            <div className="hero__stats" role="list">
              <div role="listitem">
                <span className="hero__stat-number">12M+</span>
                <span className="hero__stat-label">Specimens</span>
              </div>
              <div role="listitem">
                <span className="hero__stat-number">300M</span>
                <span className="hero__stat-label">Years of History</span>
              </div>
              <div role="listitem">
                <span className="hero__stat-number">42</span>
                <span className="hero__stat-label">Galleries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Audio Guide Floating Banner ── */}
      <div className="mobile-audio-banner" id="mobile-audio-banner">
        <div className="mobile-audio-banner__content">
          <span>🎧 <strong>Audio Tour Active</strong> · Hall 3</span>
          <button
            className="mobile-audio-banner__btn"
            onClick={() => alert('Audio Guide: Welcome to the Hall of Coleoptera.')}
          >
            Play
          </button>
        </div>
      </div>

      {/* ── Search ── */}
      <SearchBar onSearch={handleSearch} />

      {/* ── Exhibits Grid ── */}
      <section className="exhibits-section" id="exhibits" aria-labelledby="exhibits-heading">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-label">📦 Current Collection</span>
              <h2 id="exhibits-heading">Featured Exhibits</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {filteredExhibits.length} of {exhibitsList.length} exhibits shown
            </p>
          </div>

          <div className="exhibits-grid" role="list" aria-live="polite" aria-label="Exhibit cards">
            {filteredExhibits.length === 0 ? (
              <div className="empty-state" role="listitem" id="search-empty-state">
                <span className="empty-state-icon" aria-hidden="true">🔍</span>
                <p>No exhibits match your search query.</p>
                {searchFilter.error && (
                  <div className="search-error-callout" role="alert" style={{ marginTop: '0.75rem', color: '#e05252', fontSize: '0.875rem', background: 'rgba(224,82,82,0.1)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid rgba(224,82,82,0.2)' }}>
                    <strong>Search Request Failed:</strong> {searchFilter.errorMessage || 'Internal server error while searching taxonomy.'}
                  </div>
                )}
              </div>
            ) : (
              filteredExhibits.map((exhibit, i) => (
                <ExhibitCard
                  key={exhibit.id}
                  exhibit={exhibit}
                  onOpen={handleOpenModal}
                  style={{ animationDelay: `${i * 40}ms` }}
                  role="listitem"
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <Gallery />

      {/* ── Tickets ── */}
      <section className="ticket-section" id="tickets" aria-labelledby="tickets-heading">
        <div className="container">
          <div className="ticket-grid">
            <div className="ticket-info">
              <span className="section-label">🎟️ Visit Us</span>
              <h2 id="tickets-heading">Book Your Tickets</h2>
              <div className="divider" aria-hidden="true" />
              <p style={{ color: 'var(--text-secondary)', maxWidth: 420 }}>
                Join us for an unforgettable journey through 300 million years of
                insect evolution. Guided tours available. No touching the specimens.
                We really mean it about the Goliath Beetle.
              </p>
              <ul className="ticket-info__list" aria-label="Ticket information">
                {[
                  { icon: '🕙', text: 'Open Tuesday – Sunday, 10am – 6pm' },
                  { icon: '💷', text: 'Adults £14.50 · Children £7.50 · Under 5s free' },
                  { icon: '♿', text: 'Fully accessible · Audio guides available' },
                  { icon: '🅿️', text: 'Free parking · 5 min from Central Station' },
                ].map((item, i) => (
                  <li key={i} className="ticket-info__item">
                    <span className="ticket-info__icon" aria-hidden="true">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <TicketForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Gift Shop ── */}
      <GiftShop onAddToCart={onAddToCart} />

      {/* ── Footer ── */}
      <Footer />

      {/* ── Modal ── */}
      {selectedExhibit && (
        <Modal
          exhibit={selectedExhibit}
          onClose={handleCloseModal}
          onUpdateExhibit={handleExhibitUpdate}
        />
      )}
    </>
  );
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = useCallback(() => {
    setCartCount(c => c + 1);
  }, []);

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => {}}
      />
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={<MuseumSite cartCount={cartCount} onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </main>
    </>
  );
}
