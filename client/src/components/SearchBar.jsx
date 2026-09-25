import React, { useState, useCallback } from 'react';
import { categories, rarities } from '../data/exhibits';

export default function SearchBar({ onSearch }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rarity, setRarity] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(async (newName, newCat, newRar) => {
    let nameRegex = null;
    try {
      if (newName) {
        nameRegex = new RegExp(newName, 'i');
      }
    } catch (e) {
      console.warn('[Search] Regex parsing exception:', e.message);
    }

    if (!newName && !newCat && !newRar) {
      onSearch({ error: false, results: null, category: '', rarity: '', nameRegex: null, rawName: '' });
      return;
    }

    setIsSearching(true);

    try {
      const queryParams = new URLSearchParams();
      if (newName) queryParams.set('q', newName);

      const response = await fetch(`http://localhost:3001/api/exhibits/search?${queryParams.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        console.error('[Search API Failure]', response.status, data);
        onSearch({
          error: true,
          errorMessage: data.error || `HTTP ${response.status} Search Error`,
          rawName: newName,
          category: newCat,
          rarity: newRar,
        });
      } else {
        onSearch({
          error: false,
          apiResults: data.data,
          nameRegex,
          category: newCat,
          rarity: newRar,
          rawName: newName,
        });
      }
    } catch (err) {
      console.error('[Search Network Exception]', err);
      onSearch({
        error: false,
        nameRegex,
        category: newCat,
        rarity: newRar,
        rawName: newName,
      });
    } finally {
      setIsSearching(false);
    }
  }, [onSearch]);

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
              placeholder="e.g. Beetle, Monarch, Goliath..."
              value={name}
              onChange={e => {
                const val = e.target.value;
                setName(val);
                performSearch(val, category, rarity);
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
                const val = e.target.value;
                setCategory(val);
                performSearch(name, val, rarity);
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
                const val = e.target.value;
                setRarity(val);
                performSearch(name, category, val);
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
