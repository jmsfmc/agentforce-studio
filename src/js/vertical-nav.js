/**
 * Vertical navigation component loader.
 * Injects the reusable nav from components/vertical-nav.html into #app-vertical-nav
 * and attaches expand/collapse behavior for section headers.
 *
 * Usage: Add <div id="app-vertical-nav"></div> in the app shell, then load this script.
 * Override source: <div id="app-vertical-nav" data-vertical-nav-src="path/to/nav.html"></div>
 */
(function () {
  'use strict';

  var PLACEHOLDER_ID = 'app-vertical-nav';
  var DEFAULT_SRC = 'components/vertical-nav.html';

  /** When on a detail (drilldown) page, highlight the parent list link in the nav. */
  var DETAIL_PAGE_TO_LIST_BASE = {
    'agent-detail': 'agents',
    'asset-library-detail': 'asset-library',
    'connection-detail': 'connections',
    'mcp-server-detail': 'mcp-servers',
    'foundation-model-detail': 'foundation-models',
    'generative-model-detail': 'generative-models',
    'predictive-model-detail': 'predictive-models',
    'embedding-model-detail': 'embedding-models',
    'data-library-detail': 'data-libraries',
    'search-index-detail': 'search-indexes',
    'retriever-detail': 'retrievers',
    'prompt-detail': 'prompts',
    'test-suite-detail': 'test-suites',
    'metric-detail': 'metrics',
    'session-detail': 'sessions-intents'
  };

  var WRAPPER_CLASS_COLLAPSED = 'app-nav-vertical-wrapper_collapsed';
  var WRAPPER_CLASS_PEEK = 'app-nav-vertical-wrapper_peek';
  var PLACEHOLDER_CLASS_COLLAPSED = 'app-vertical-nav_collapsed';
  var STORAGE_KEY_COLLAPSED = 'app-nav-collapsed';
  var STORAGE_KEY_SECTION_EXPANDED = 'app-nav-section-expanded';

  function setToggleState(toggleLink, expanded) {
    if (!toggleLink) return;
    var labelEl = toggleLink.querySelector('.app-nav-toggle-label');
    var iconCollapse = toggleLink.querySelector('.app-nav-toggle-icon-collapse');
    var iconExpand = toggleLink.querySelector('.app-nav-toggle-icon-expand');
    if (expanded) {
      if (labelEl) labelEl.textContent = 'Collapse';
      toggleLink.setAttribute('title', 'Collapse sidebar');
      toggleLink.setAttribute('aria-label', 'Collapse sidebar');
      if (iconCollapse) { iconCollapse.hidden = false; iconCollapse.removeAttribute('hidden'); }
      if (iconExpand) { iconExpand.hidden = true; iconExpand.setAttribute('hidden', ''); }
    } else {
      if (labelEl) labelEl.textContent = 'Expand';
      toggleLink.setAttribute('title', 'Expand sidebar');
      toggleLink.setAttribute('aria-label', 'Expand sidebar');
      if (iconCollapse) { iconCollapse.hidden = true; iconCollapse.setAttribute('hidden', ''); }
      if (iconExpand) { iconExpand.hidden = false; iconExpand.removeAttribute('hidden'); }
    }
  }

  function setToggleStateForPeek(toggleLink, isPeek) {
    if (!toggleLink) return;
    var labelEl = toggleLink.querySelector('.app-nav-toggle-label');
    var iconCollapse = toggleLink.querySelector('.app-nav-toggle-icon-collapse');
    var iconExpand = toggleLink.querySelector('.app-nav-toggle-icon-expand');
    if (isPeek) {
      if (labelEl) labelEl.textContent = 'Expand';
      toggleLink.setAttribute('title', 'Expand sidebar');
      toggleLink.setAttribute('aria-label', 'Expand sidebar');
      if (iconCollapse) { iconCollapse.hidden = true; iconCollapse.setAttribute('hidden', ''); }
      if (iconExpand) { iconExpand.hidden = false; iconExpand.removeAttribute('hidden'); }
    } else {
      /* Still collapsed (icon bar): show jump_to_right only */
      if (labelEl) labelEl.textContent = 'Collapse';
      toggleLink.setAttribute('title', 'Expand sidebar');
      toggleLink.setAttribute('aria-label', 'Expand sidebar');
      if (iconCollapse) { iconCollapse.hidden = true; iconCollapse.setAttribute('hidden', ''); }
      if (iconExpand) { iconExpand.hidden = false; iconExpand.removeAttribute('hidden'); }
    }
  }

  function getSectionExpandedState(container) {
    var state = {};
    container.querySelectorAll('.app-nav-section-header').forEach(function (btn) {
      var id = btn.getAttribute('aria-controls');
      if (id) state[id] = btn.getAttribute('aria-expanded') === 'true';
    });
    return state;
  }

  function restoreSectionExpandedState(container, state) {
    if (!state || !container) return;
    container.querySelectorAll('.app-nav-section-header').forEach(function (btn) {
      var id = btn.getAttribute('aria-controls');
      if (id && state[id] !== undefined) btn.setAttribute('aria-expanded', state[id]);
    });
  }

  function loadPersistedCollapsed() {
    try {
      return sessionStorage.getItem(STORAGE_KEY_COLLAPSED) === 'true';
    } catch (e) {
      return false;
    }
  }

  function loadPersistedSectionExpanded() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY_SECTION_EXPANDED);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function savePersistedState(collapsed, sectionExpanded) {
    try {
      sessionStorage.setItem(STORAGE_KEY_COLLAPSED, collapsed ? 'true' : 'false');
      if (sectionExpanded && typeof sectionExpanded === 'object') {
        sessionStorage.setItem(STORAGE_KEY_SECTION_EXPANDED, JSON.stringify(sectionExpanded));
      }
    } catch (e) {}
  }

  function applyPersistedState(placeholder, wrapper, toggleLink) {
    if (!loadPersistedCollapsed()) return;
    wrapper.classList.add(WRAPPER_CLASS_COLLAPSED);
    placeholder.classList.add(PLACEHOLDER_CLASS_COLLAPSED);
    placeholder.querySelectorAll('.app-nav-section-header').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
    setToggleState(toggleLink, false);
  }

  function attachSidebarCollapseExpand(placeholder) {
    var wrapper = placeholder.querySelector('.app-nav-vertical-wrapper');
    var toggleLink = placeholder.querySelector('.app-nav-toggle');
    if (!wrapper || !toggleLink) return;

    var savedSectionExpanded = loadPersistedSectionExpanded();
    applyPersistedState(placeholder, wrapper, toggleLink);

    toggleLink.addEventListener('click', function (e) {
      e.preventDefault();
      var isCollapsed = wrapper.classList.contains(WRAPPER_CLASS_COLLAPSED);
      var isPeek = wrapper.classList.contains(WRAPPER_CLASS_PEEK);

      if (isPeek) {
        wrapper.classList.remove(WRAPPER_CLASS_COLLAPSED, WRAPPER_CLASS_PEEK);
        placeholder.classList.remove(PLACEHOLDER_CLASS_COLLAPSED);
        restoreSectionExpandedState(placeholder, savedSectionExpanded);
        setToggleState(toggleLink, true);
        savePersistedState(false);
        return;
      }
      if (isCollapsed) {
        wrapper.classList.remove(WRAPPER_CLASS_COLLAPSED, WRAPPER_CLASS_PEEK);
        placeholder.classList.remove(PLACEHOLDER_CLASS_COLLAPSED);
        restoreSectionExpandedState(placeholder, savedSectionExpanded);
        setToggleState(toggleLink, true);
        savePersistedState(false);
      } else {
        savedSectionExpanded = getSectionExpandedState(placeholder);
        wrapper.classList.add(WRAPPER_CLASS_COLLAPSED);
        placeholder.classList.add(PLACEHOLDER_CLASS_COLLAPSED);
        placeholder.querySelectorAll('.app-nav-section-header').forEach(function (btn) {
          btn.setAttribute('aria-expanded', 'false');
        });
        setToggleState(toggleLink, false);
        savePersistedState(true, savedSectionExpanded);
      }
    });

    wrapper.addEventListener('mouseenter', function () {
      if (!wrapper.classList.contains(WRAPPER_CLASS_COLLAPSED)) return;
      wrapper.classList.add(WRAPPER_CLASS_PEEK);
      restoreSectionExpandedState(placeholder, savedSectionExpanded);
      setToggleStateForPeek(toggleLink, true);
    });
    wrapper.addEventListener('mouseleave', function () {
      if (!wrapper.classList.contains(WRAPPER_CLASS_COLLAPSED)) return;
      wrapper.classList.remove(WRAPPER_CLASS_PEEK);
      setToggleStateForPeek(toggleLink, false);
    });
  }

  function attachExpandCollapse(container) {
    if (!container) return;
    container.querySelectorAll('.slds-nav-vertical__action_overflow').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        var state = getSectionExpandedState(container);
        savePersistedState(loadPersistedCollapsed(), state);
      });
    });
  }

  /**
   * Apply section open state: only the active item's section plus any user-expanded sections.
   * Call after injecting nav HTML: collapse all, restore persisted, then ensure active section is open.
   */
  function applySectionExpandedState(container) {
    if (!container) return;
    var persisted = loadPersistedSectionExpanded();
    container.querySelectorAll('.app-nav-section-header').forEach(function (btn) {
      var id = btn.getAttribute('aria-controls');
      var expanded = id && persisted[id] === true;
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  function setActiveFromUrl(container) {
    if (!container) return;
    var pathname = (window.location.pathname || '').replace(/\/$/, '');
    var segments = pathname.split('/').filter(Boolean);
    var currentFile = pathname.split('/').pop() || '';
    if (!currentFile || currentFile === 'src') currentFile = 'index.html';
    var currentBase = currentFile.replace(/\.html$/, '');
    var activeBase = null;
    var activeFile = null;
    /* Prefer detail-page mapping so connection-detail highlights Connections, not Agents */
    if (DETAIL_PAGE_TO_LIST_BASE[currentBase]) {
      activeBase = DETAIL_PAGE_TO_LIST_BASE[currentBase];
      activeFile = activeBase + '.html';
    } else if (segments.length >= 2 && typeof LIST_CONFIG !== 'undefined') {
      var pathPrefix = segments[0];
      for (var key in LIST_CONFIG) {
        if (LIST_CONFIG[key].pathPrefix === pathPrefix) {
          activeBase = key;
          activeFile = key + '.html';
          break;
        }
      }
    }
    if (!activeBase) {
      activeBase = currentBase;
      activeFile = currentFile;
    }
    function pathMatches(linkHref) {
      var file = linkHref.split('/').pop().split('?')[0].split('#')[0];
      var base = file.replace(/\.html$/, '');
      return file === activeFile || base === activeBase || file === activeBase || base === activeFile;
    }
    var links = container.querySelectorAll('.slds-nav-vertical__list a[href]');
    container.querySelectorAll('.slds-nav-vertical__item.slds-is-active').forEach(function (el) {
      el.classList.remove('slds-is-active');
    });
    container.querySelectorAll('.slds-nav-vertical__action[aria-current="page"]').forEach(function (el) {
      el.removeAttribute('aria-current');
    });
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').trim();
      if (href === '#' || href === '') return;
      if (!pathMatches(href)) return;
      var li = a.closest('.slds-nav-vertical__item');
      if (li) {
        li.classList.add('slds-is-active');
        a.setAttribute('aria-current', 'page');
        var section = li.closest('.app-nav-section-item');
        if (section) {
          var btn = section.querySelector('.app-nav-section-header');
          if (btn) btn.setAttribute('aria-expanded', 'true');
          var sublist = section.querySelector('.slds-nav-vertical__list');
          if (sublist && sublist.id) {
            var header = container.querySelector('.app-nav-section-header[aria-controls="' + sublist.id + '"]');
            if (header) header.setAttribute('aria-expanded', 'true');
          }
        }
      }
    });
  }

  function init() {
    var placeholder = document.getElementById(PLACEHOLDER_ID);
    if (!placeholder) return;

    var src = placeholder.getAttribute('data-vertical-nav-src') || DEFAULT_SRC;

    fetch(src)
      .then(function (res) {
        if (!res.ok) throw new Error('Vertical nav fetch failed: ' + res.status);
        return res.text();
      })
      .then(function (html) {
        placeholder.classList.add('app-vertical-nav_restoring');
        placeholder.innerHTML = html.trim();
        attachExpandCollapse(placeholder);
        applySectionExpandedState(placeholder);
        setActiveFromUrl(placeholder);
        attachSidebarCollapseExpand(placeholder);
        requestAnimationFrame(function () {
          placeholder.classList.remove('app-vertical-nav_restoring');
        });
      })
      .catch(function (err) {
        console.error('[vertical-nav]', err);
        placeholder.innerHTML = '<p class="slds-p-around_medium slds-text-color_error">Navigation could not be loaded.</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
