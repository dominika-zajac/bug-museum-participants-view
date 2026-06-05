import React, { useState } from 'react';
import { categories, rarities } from '../data/exhibits';

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rarity, setRarity] = useState('');

  const handleSearch = (newName, newCat, newRar) => {
    try {
      const nameRegex = newName ? new RegExp(newName, 'i') : null;
      onSearch({ nameRegex, category: newCat, rarity: newRar, rawName: newName });
    } catch (e) {
      console.error('Search regex error:', e.message);
      // Search silently fails — no results shown
      onSearch({ nameRegex: null, category: newCat, rarity: newRar, rawName: newName, error: true });
    }
  };

  return (
    <section className="search-section" id="search" aria-label="Search exhibits">
      <div className="container">
        <span className="section-label">🔍 Search Collection</span>
        <div className="search-bar">
          <div className="search-field">
            <label htmlFor="search-name">Search by Name</label>
            <input
              id="search-name"
              className="search-input"
              type="text"
              placeholder="e.g. Beetle, Monarch..."
              value={name}
              onChange={e => {
                setName(e.target.value);
                handleSearch(e.target.value, category, rarity);
              }}
            />
          </div>

          <div className="search-field">
            <label htmlFor="search-category">Category</label>
            <select
              id="search-category"
              className="search-select"
              value={category}
              onChange={e => {
                setCategory(e.target.value);
                handleSearch(name, e.target.value, rarity);
              }}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="search-rarity">Rarity</label>
            <select
              id="search-rarity"
              className="search-select"
              value={rarity}
              onChange={e => {
                setRarity(e.target.value);
                handleSearch(name, category, e.target.value);
              }}
            >
              <option value="">All Rarities</option>
              {rarities.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
