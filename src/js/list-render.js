/**
 * List page renderer. Reads list type from data-list-type on main or ?type= query param,
 * looks up LIST_CONFIG, and injects document title, page header, and table content.
 * Depends on list-config.js (LIST_CONFIG, LIST_AVATAR_URL).
 */
(function () {
  'use strict';

  var STANDARD_ICON_BASE = 'theme/slds-1/assets/icons/standard-sprite/svg/symbols.svg#';
  var UTILITY_ICON_BASE = 'theme/slds-1/assets/icons/utility-sprite/svg/symbols.svg#';
  var UTILITY_SPRITE = UTILITY_ICON_BASE + 'down';
  var AVATAR_URL = typeof LIST_AVATAR_URL !== 'undefined' ? LIST_AVATAR_URL : 'theme/slds-1/assets/images/avatar2.jpg';

  function getListType() {
    var main = document.getElementById('main');
    if (main && main.getAttribute('data-list-type')) {
      return main.getAttribute('data-list-type').trim();
    }
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    return type ? type.trim() : null;
  }

  function escapeHtml(s) {
    if (s == null) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function avatarCellHtml(name) {
    return '<div class="slds-media slds-media_center">' +
      '<div class="slds-media__figure">' +
      '<span class="slds-avatar slds-avatar_circle slds-avatar_x-small">' +
      '<img src="' + escapeHtml(AVATAR_URL) + '" alt="' + escapeHtml(name) + '" />' +
      '</span></div>' +
      '<div class="slds-media__body"><span class="slds-truncate">' + escapeHtml(name) + '</span></div></div>';
  }

  function actionsButtonHtml(rowName) {
    var label = rowName ? 'More actions for ' + escapeHtml(rowName) : 'More actions';
    return '<button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small" aria-haspopup="true" tabindex="0" title="' + label + '">' +
      '<svg class="slds-button__icon slds-button__icon_hint slds-button__icon_small" aria-hidden="true">' +
      '<use href="' + UTILITY_SPRITE + '"></use></svg>' +
      '<span class="slds-assistive-text">' + label + '</span></button>';
  }

  function render() {
    var type = getListType();
    if (!type || typeof LIST_CONFIG === 'undefined' || !LIST_CONFIG[type]) {
      return;
    }
    var config = LIST_CONFIG[type];
    var nameKey = config.nameKey || 'name';
    var firstColLabel = config.columns[0] ? config.columns[0].label : 'Name';

    document.title = config.title + ' — Agentforce Studio';

    var titleEl = document.querySelector('#main .slds-page-header__title');
    if (titleEl) {
      titleEl.textContent = config.title;
      titleEl.setAttribute('title', config.title);
    }

    var newBtn = document.querySelector('#main .slds-page-header__control .slds-button_neutral');
    if (newBtn) newBtn.textContent = config.newButtonLabel;

    var metaEl = document.querySelector('#main .slds-page-header__meta-text');
    if (metaEl) metaEl.textContent = '10 items • Sorted by ' + firstColLabel + ' • Updated a few seconds ago';

    var iconUse = document.querySelector('#main .slds-page-header__icon use');
    if (iconUse) {
      if (config.sectionIcon) {
        iconUse.setAttribute('href', UTILITY_ICON_BASE + config.sectionIcon);
      } else if (config.icon) {
        iconUse.setAttribute('href', STANDARD_ICON_BASE + config.icon);
      }
    }

    var table = document.querySelector('#main table.slds-table');
    if (!table) return;

    var thead = table.querySelector('thead');
    var tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;

    var theadRow = document.createElement('tr');
    theadRow.className = 'slds-line-height_reset';
    config.columns.forEach(function (col) {
      var th = document.createElement('th');
      th.className = 'slds-cell_action-mode';
      th.scope = 'col';
      th.innerHTML = '<div class="slds-truncate" title="' + escapeHtml(col.label) + '">' + escapeHtml(col.label) + '</div>';
      theadRow.appendChild(th);
    });
    var thActions = document.createElement('th');
    thActions.className = 'slds-cell_action-mode';
    thActions.scope = 'col';
    thActions.setAttribute('style', 'width:3.25rem');
    thActions.innerHTML = '<div class="slds-truncate slds-assistive-text" title="Actions">Actions</div>';
    theadRow.appendChild(thActions);
    thead.innerHTML = '';
    thead.appendChild(theadRow);

    table.setAttribute('aria-label', config.title + ' list');
    table.setAttribute('role', 'grid');

    tbody.innerHTML = '';
    config.rows.forEach(function (row) {
      var tr = document.createElement('tr');
      tr.className = 'slds-hint-parent';
      var nameVal = row[nameKey] != null ? String(row[nameKey]) : '';
      var slug = typeof nameToSlug === 'function' ? nameToSlug(nameVal) : '';
      var detailUrl = (config.pathPrefix && slug) ? config.pathPrefix + '/' + slug : (config.detailPageUrl + (nameVal ? '?name=' + encodeURIComponent(nameVal) : ''));

      config.columns.forEach(function (col, i) {
        var val = row[col.key];
        var cellContent = '';
        var isFirst = i === 0;
        if (isFirst) {
          var th = document.createElement('th');
          th.className = 'slds-cell_action-mode';
          th.setAttribute('data-label', col.label);
          th.scope = 'row';
          th.innerHTML = '<div class="slds-truncate" title="' + escapeHtml(nameVal) + '">' +
            '<a href="' + escapeHtml(detailUrl) + '" tabindex="0">' + escapeHtml(nameVal) + '</a></div>';
          tr.appendChild(th);
        } else {
          var td = document.createElement('td');
          td.className = 'slds-cell_action-mode';
          td.setAttribute('role', 'gridcell');
          td.setAttribute('data-label', col.label);
          if (col.avatar && val) {
            td.innerHTML = avatarCellHtml(String(val));
          } else {
            td.innerHTML = '<div class="slds-truncate">' + escapeHtml(val != null ? String(val) : '') + '</div>';
          }
          tr.appendChild(td);
        }
      });
      var tdActions = document.createElement('td');
      tdActions.className = 'slds-cell_action-mode';
      tdActions.setAttribute('role', 'gridcell');
      tdActions.innerHTML = actionsButtonHtml(nameVal);
      tr.appendChild(tdActions);
      tbody.appendChild(tr);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
