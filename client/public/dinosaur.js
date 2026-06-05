const DinosaurExhibit = {
  name: 'Triassic Bug Collection',
  era: 'Mesozoic',
  specimens: [
    { id: 'DINO-001', name: 'Amber Preserved Fly', age: '99 million years', status: 'On loan to Smithsonian' },
    { id: 'DINO-002', name: 'Giant Dragonfly (Meganeuropsis)', age: '280 million years', status: 'Plaster cast only' },
    { id: 'DINO-003', name: 'Triassic Cockroach', age: '220 million years', status: 'In storage' },
    { id: 'DINO-004', name: 'Cretaceous Beetle', age: '145 million years', status: 'On display — Room 7' },
  ],
  init: function() {
    console.log('[DinosaurExhibit] Initialising... (Note: this exhibit was cancelled)');
    this.specimens.forEach(s => {
      console.log(`  - ${s.name} (${s.age}) — ${s.status}`);
    });
  },
  renderCard: function(specimenId) {
    const specimen = this.specimens.find(s => s.id === specimenId);
    if (!specimen) return null;
    return `<div class="dino-card"><h3>${specimen.name}</h3><p>${specimen.age}</p></div>`;
  },
  analytics: {
    track: function(event, data) {
      // Stub — was connected to old analytics endpoint
      void event; void data;
    }
  }
};

// This is never called:
// DinosaurExhibit.init();

window.__DinosaurExhibit = DinosaurExhibit;
