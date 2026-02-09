/**
 * Global header component loader.
 * Injects the reusable header from components/global-header.html into #app-global-header
 * so the top nav is the same on every page.
 *
 * Usage: Add <div id="app-global-header"></div> at top of body, then load this script.
 * Override source: <div id="app-global-header" data-global-header-src="path/to/header.html"></div>
 */
(function () {
  'use strict';

  var PLACEHOLDER_ID = 'app-global-header';
  var DEFAULT_SRC = 'components/global-header.html';

  function init() {
    var placeholder = document.getElementById(PLACEHOLDER_ID);
    if (!placeholder) return;

    var src = placeholder.getAttribute('data-global-header-src') || DEFAULT_SRC;

    fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error('Global header fetch failed: ' + res.status);
        return res.text();
      })
      .then(function (html) {
        placeholder.outerHTML = html.trim();
      })
      .catch(function (err) {
        console.error('[global-header]', err);
        placeholder.outerHTML = '<header class="slds-global-header_container"><div class="slds-p-around_medium slds-text-color_error">Header could not be loaded.</div></header>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
