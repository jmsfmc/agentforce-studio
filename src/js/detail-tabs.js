/**
 * Detail page tabs: switch visible panel and update active tab when a tab link is clicked.
 * Load on detail pages that use .slds-tabs_default.
 */
(function () {
  'use strict';

  function handleTabClick(e) {
    var link = e.target.closest('a[href^="#"].slds-tabs_default__link');
    if (!link) return;
    var id = link.getAttribute('aria-controls');
    if (!id) return;
    e.preventDefault();

    var tabsContainer = link.closest('.slds-tabs_default');
    if (!tabsContainer) return;

    var nav = tabsContainer.querySelector('.slds-tabs_default__nav');
    var items = nav ? nav.querySelectorAll('.slds-tabs_default__item') : [];
    var links = nav ? nav.querySelectorAll('.slds-tabs_default__link') : [];
    var panels = tabsContainer.querySelectorAll('.slds-tabs_default__content');

    items.forEach(function (item) {
      item.classList.toggle('slds-is-active', item.contains(link));
    });
    links.forEach(function (l) {
      var isSelected = l === link;
      l.setAttribute('aria-selected', isSelected);
      l.setAttribute('tabindex', isSelected ? '0' : '-1');
    });
    panels.forEach(function (panel) {
      var show = panel.id === id;
      panel.classList.toggle('slds-show', show);
      panel.classList.toggle('slds-hide', !show);
    });
  }

  function init() {
    var main = document.getElementById('main');
    if (!main) return;
    main.addEventListener('click', handleTabClick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
