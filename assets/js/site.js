/* Netherrack docs - progressive enhancements. The pages work without this; it adds the
   theme toggle, an "On this page" list, heading links and copy buttons for code blocks. */
(function () {
  'use strict';

  var STORAGE_KEY = 'netherrack-theme';
  var root = document.documentElement;
  var prefersDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  /* ---------- theme ---------- */

  function currentTheme() {
    var chosen = root.getAttribute('data-theme');
    if (chosen === 'light' || chosen === 'dark') {
      return chosen;
    }
    return prefersDark && prefersDark.matches ? 'dark' : 'light';
  }

  function updateToggle(button) {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    button.setAttribute('title', 'Switch to ' + next + ' theme');
  }

  function setupThemeToggle() {
    var button = document.querySelector('.theme-toggle');
    if (!button) {
      return;
    }
    updateToggle(button);
    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* private mode: the choice just lasts for this page */
      }
      updateToggle(button);
    });
    if (prefersDark && prefersDark.addEventListener) {
      prefersDark.addEventListener('change', function () {
        updateToggle(button);
      });
    }
  }

  /* ---------- heading links ---------- */

  function setupAnchors() {
    var headings = document.querySelectorAll('.content h2[id], .content h3[id]');
    Array.prototype.forEach.call(headings, function (heading) {
      var link = document.createElement('a');
      link.className = 'anchor';
      link.href = '#' + heading.id;
      link.setAttribute('aria-label', 'Link to this section');
      link.textContent = '#';
      heading.appendChild(link);
    });
  }

  /* ---------- "On this page" ---------- */

  function setupToc() {
    var toc = document.querySelector('.toc');
    var list = document.getElementById('toc-list');
    var headings = document.querySelectorAll('.content h2[id]');
    if (!toc || !list || headings.length < 2) {
      return;
    }

    var links = [];
    Array.prototype.forEach.call(headings, function (heading) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      /* the heading's whole text, without the "#" link added by setupAnchors */
      var copy = heading.cloneNode(true);
      var anchor = copy.querySelector('.anchor');
      if (anchor) {
        anchor.remove();
      }
      link.textContent = heading.getAttribute('data-toc') || copy.textContent.trim();
      item.appendChild(link);
      list.appendChild(item);
      links.push({ link: link, heading: heading });
    });
    toc.hidden = false;

    var ticking = false;
    function highlight() {
      ticking = false;
      var active = links[0];
      links.forEach(function (entry) {
        if (entry.heading.getBoundingClientRect().top <= 140) {
          active = entry;
        }
      });
      links.forEach(function (entry) {
        entry.link.classList.toggle('active', entry === active);
      });
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(highlight);
      }
    }, { passive: true });
    highlight();
  }

  /* ---------- copy buttons ---------- */

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(area);
      }
    });
  }

  function setupCopyButtons() {
    var blocks = document.querySelectorAll('.content pre');
    Array.prototype.forEach.call(blocks, function (pre) {
      var wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy-btn';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      button.setAttribute('aria-live', 'polite');
      wrap.appendChild(button);

      var timer = null;
      button.addEventListener('click', function () {
        var text = (pre.querySelector('code') || pre).textContent.replace(/\n$/, '');
        copyText(text).then(function () {
          button.textContent = 'Copied!';
        }, function () {
          button.textContent = 'Press Ctrl+C';
        }).then(function () {
          window.clearTimeout(timer);
          timer = window.setTimeout(function () {
            button.textContent = 'Copy';
          }, 1800);
        });
      });
    });
  }

  function init() {
    setupThemeToggle();
    setupAnchors();
    setupToc();
    setupCopyButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
