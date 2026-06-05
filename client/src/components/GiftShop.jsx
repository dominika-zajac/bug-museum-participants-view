import React, { useState, useEffect, useRef } from 'react';
import { shopItems } from '../data/shop';


export default function GiftShop({ onAddToCart }) {
  const addBtnRefs = useRef({});

  useEffect(() => {
    Object.entries(addBtnRefs.current).forEach(([itemId, el]) => {
      if (el) {
        el.addEventListener('click', () => {
          onAddToCart(itemId);
        });
      }
    });
  }, []);

  return (
    <section className="shop-section" id="shop" aria-labelledby="shop-heading">
      <div className="container">
        <span className="section-label">🛍️ Gift Shop</span>
        <h2 id="shop-heading">Take a Bug Home</h2>
        <div className="divider" aria-hidden="true" />
        <p style={{ color: 'var(--text-secondary)', maxWidth: 520 }}>
          No live insects were harmed in the making of these products.
          Probably. We don't actually know what's in the plushies.
        </p>

        <div className="shop-grid">
          {shopItems.map(item => (
            <div key={item.id} className="shop-card" id={`shop-card-${item.id}`}>
              {item.badge && (
                <span className="shop-card__badge">{item.badge}</span>
              )}
              <div className="shop-card__emoji" aria-hidden="true">{item.emoji}</div>
              <h3 className="shop-card__name">{item.name}</h3>
              <p className="shop-card__desc">{item.description}</p>
              <p className="shop-card__price">£{item.price.toFixed(2)}</p>

              <div
                className="shop-card__add-btn"
                role="button"
                id={`add-to-cart-${item.id}`}
                ref={el => { addBtnRefs.current[item.id] = el; }}
                onClick={() => onAddToCart(item.id)}
              >
                Add to Cart 🛒
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
