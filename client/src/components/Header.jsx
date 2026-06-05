import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ cartCount, onCartClick }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { href: '#exhibits', label: 'Exhibits' },
    { href: '#gallery',  label: 'Gallery'  },
    { href: '#tickets',  label: 'Tickets'  },
    { href: '#shop',     label: 'Gift Shop' },
  ];

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        {/* Logo */}
        <Link
          to="/"
          className="header__logo"
          aria-label="Museum of Bugs home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="header__logo-icon" aria-hidden="true">🪲</span>
          <div>
            <span className="header__logo-text">Museum of Bugs</span>
            <span className="header__logo-sub">Est. 1842 · Natural History</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map(link =>
            link.isLink
              ? <Link key={link.href} to={link.href} className="header__nav-link">{link.label}</Link>
              : <a key={link.href} href={link.href} className="header__nav-link">{link.label}</a>
          )}
        </nav>

        {/* Right-side: cart + hamburger */}
        <div className="header__right">
          <button
            className="header__cart-btn"
            onClick={onCartClick}
            aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            id="cart-button"
          >
            🛒
            <span className="cart-badge" aria-live="polite">{cartCount}</span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`header__hamburger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            id="hamburger-btn"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        id="mobile-nav"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navLinks.map(link =>
            link.isLink
              ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="mobile-nav__link"
                  onClick={() => setMenuOpen(false)}
                >{link.label}</Link>
              )
              : (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav__link"
                  onClick={() => setMenuOpen(false)}
                >{link.label}</a>
              )
          )}
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="mobile-nav__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
