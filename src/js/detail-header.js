/**
 * Detail page header: set page header icon to the parent section icon (utility),
 * and sync page title + breadcrumb from path (e.g. /my-agents/service-agent) or ?name= fallback.
 * Depends on list-config.js (LIST_CONFIG, nameToSlug). Load after list-config.js on detail pages.
 */
(function () {
  'use strict';

  var UTILITY_ICON_BASE = 'theme/slds-1/assets/icons/utility-sprite/svg/symbols.svg#';
  var DOC_TITLE_SUFFIX = ' — Agentforce Studio';

  function slugToDisplayName(slug) {
    if (!slug) return '';
    return slug.split('-').map(function (part) {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' ');
  }

  function resolveRecordName(config, nameKey) {
    var pathname = (window.location.pathname || '').replace(/^\/+/, '');
    var segments = pathname.split('/').filter(Boolean);
    if (config.pathPrefix && segments.length >= 2 && segments[0] === config.pathPrefix && typeof nameToSlug === 'function') {
      var slug = segments[1];
      for (var i = 0; i < config.rows.length; i++) {
        var row = config.rows[i];
        var val = row[nameKey];
        if (val != null && nameToSlug(String(val)) === slug) return String(val);
      }
      return slugToDisplayName(slug);
    }
    var params = new URLSearchParams(window.location.search);
    var name = params.get('name');
    if (name) name = name.trim();
    return name || null;
  }

  function init() {
    var main = document.getElementById('main');
    if (!main || typeof LIST_CONFIG === 'undefined') return;
    var type = main.getAttribute('data-detail-type');
    if (!type || !LIST_CONFIG[type]) return;
    var config = LIST_CONFIG[type];
    var nameKey = config.nameKey || 'name';
    var recordName = resolveRecordName(config, nameKey);

    var listTitle = config.title;
    var listPageUrl = config.listPageUrl || '#';

    document.title = (recordName || config.title) + DOC_TITLE_SUFFIX;

    var titleEl = main.querySelector('.slds-page-header__title');
    if (titleEl) {
      titleEl.textContent = recordName || titleEl.getAttribute('title') || config.title;
      titleEl.setAttribute('title', titleEl.textContent);
    }

    var breadcrumbItems = main.querySelectorAll('.slds-breadcrumb .slds-breadcrumb__item');
    if (breadcrumbItems.length >= 1) {
      var firstLink = breadcrumbItems[0].querySelector('a');
      if (firstLink) {
        firstLink.textContent = listTitle;
        firstLink.setAttribute('href', listPageUrl);
      }
    }
    if (recordName && breadcrumbItems.length >= 2) {
      var lastItem = breadcrumbItems[breadcrumbItems.length - 1];
      var lastCrumbEl = lastItem.querySelector('a') || lastItem.querySelector('.app-breadcrumb-current') || lastItem.querySelector('span');
      if (lastCrumbEl) lastCrumbEl.textContent = recordName;
    }

    var sectionIcon = config.sectionIcon;
    if (sectionIcon) {
      var container = main.querySelector('.slds-page-header .slds-media__figure .slds-icon_container');
      var iconUse = main.querySelector('.slds-page-header .slds-page-header__icon use');
      if (container && iconUse) {
        iconUse.setAttribute('href', UTILITY_ICON_BASE + sectionIcon);
        Array.prototype.forEach.call(container.classList, function (cls) {
          if (cls && cls.indexOf('slds-icon-standard-') === 0) container.classList.remove(cls);
        });
        container.classList.add('app-page-header__icon-container');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
