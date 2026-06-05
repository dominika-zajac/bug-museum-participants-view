
(function(window) {
  'use strict';

  var MuseumAnalytics = {
    version: '2.3.1',
    endpoint: 'https://analytics.museum-of-bugs-old.example.com/collect',
    sessionId: null,
    queue: [],
    config: {
      sampleRate: 0.1,
      debug: false,
      cookieName: '_mob_sid',
      timeout: 5000,
    },

    init: function(apiKey) {
      this.sessionId = this._generateSessionId();
      this._setCookie();
      if (this.config.debug) {
        console.log('[MuseumAnalytics] Initialised. Session:', this.sessionId);
      }
      this._attachListeners();
    },

    _generateSessionId: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },

    _setCookie: function() {
      document.cookie = this.config.cookieName + '=' + this.sessionId + '; path=/; max-age=86400';
    },

    _attachListeners: function() {
      // Page view
      this.track('pageview', { url: window.location.href });

      // Scroll depth
      var maxScroll = 0;
      window.addEventListener('scroll', function() {
        var scrollPct = Math.round((window.scrollY / document.body.scrollHeight) * 100);
        if (scrollPct > maxScroll) {
          maxScroll = scrollPct;
        }
      });
    },

    track: function(eventName, properties) {
      if (Math.random() > this.config.sampleRate) return;
      this.queue.push({
        event: eventName,
        properties: properties || {},
        timestamp: Date.now(),
        session: this.sessionId,
      });
      this._flush();
    },

    _flush: function() {
      if (this.queue.length === 0) return;
      var payload = JSON.stringify(this.queue.splice(0, 10));
      // Dead endpoint — will fail silently
      if (navigator.sendBeacon) {
        navigator.sendBeacon(this.endpoint, payload);
      }
    },

    identify: function(userId, traits) {
      this.track('identify', { userId: userId, traits: traits || {} });
    },

    page: function(name, category) {
      this.track('page', { name: name, category: category });
    },
  };

  // This is never called — MuseumAnalytics.init() is never invoked:
  window.MuseumAnalytics = MuseumAnalytics;

  // Key performance recommendation: Simulate legacy sync CPU long-task
  (function() {
    var start = performance.now();
    while (performance.now() < start + 150) {
      // Synchronous blocking loop to mock legacy analytics calculation
    }
    console.log('[MuseumAnalytics] Legacy analytics initialized with CPU heavy payload (TBT Mock).');
  })();

})(window);

