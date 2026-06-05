import React from 'react';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo" id="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🪲</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--amber)', fontWeight: 700 }}>
                Museum of Bugs
              </span>
            </div>
            <p>
              The world's finest collection of arthropod specimens,
              thoughtfully curated since 1842. Open Tue–Sun, 10am–6pm.
              No live insects on the premises. We checked. Mostly.
            </p>
          </div>

          <div>
            <h3 className="footer__col-title">Visit</h3>
            <ul className="footer__links">
              <li><a href="#exhibits">Exhibits</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#tickets">Tickets</a></li>
              <li><a href="#shop">Gift Shop</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__col-title">Museum</h3>
            <ul className="footer__links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Research</a></li>
              <li><a href="#">Conservation</a></li>
              <li><a href="#">Education</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          {/* BUG #3b: Color var(--text-muted) on dark background — sufficient contrast */}
          <p className="footer__copy">
            © 2024 Museum of Bugs. All rights reserved. No bugs were harmed in the making of this website.
          </p>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Terms</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
