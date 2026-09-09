(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#nav-menu');
  const yearEl = document.querySelector('#year');
  const formIframe = document.querySelector('#consultation-form');
  const formNotice = document.querySelector('#form-setup-notice');

  function normalizeGoogleFormUrl(url) {
    const trimmed = url.trim();
    if (!trimmed) return '';

    const match = trimmed.match(/\/forms\/d\/e\/([^/?]+)/);
    if (match) {
      return `https://docs.google.com/forms/d/e/${match[1]}/viewform?embedded=true`;
    }

    if (trimmed.includes('embedded=true')) {
      return trimmed;
    }

    return trimmed.replace(/(\?|&)usp=[^&]*/g, '').replace(/\?$/, '') + (
      trimmed.includes('?') ? '&embedded=true' : '?embedded=true'
    );
  }

  function getFormEmbedOffset() {
    const offset = (typeof PORTFOLIO_CONFIG !== 'undefined' && PORTFOLIO_CONFIG.formEmbedHeaderOffset)
      ? Number(PORTFOLIO_CONFIG.formEmbedHeaderOffset)
      : 128;
    return Number.isFinite(offset) ? offset : 128;
  }

  function applyFormEmbedOffset() {
    const offset = getFormEmbedOffset();
    document.documentElement.style.setProperty('--form-embed-offset', `${offset}px`);
  }

  function resizeFormIframe(height) {
    if (!formIframe || !height) return;
    const offset = getFormEmbedOffset();
    const nextHeight = Math.max(Number(height) + offset, 720 + offset);
    formIframe.style.height = `${nextHeight}px`;
  }

  function getBasePath() {
    const config = typeof PORTFOLIO_CONFIG !== 'undefined' ? PORTFOLIO_CONFIG : {};

    if (config.basePath) {
      return String(config.basePath).replace(/\/$/, '');
    }

    const repo = config.githubRepoName || 'learn-with-chahat';
    const path = window.location.pathname;

    if (path === `/${repo}` || path.startsWith(`/${repo}/`)) {
      return `/${repo}`;
    }

    return '';
  }

  function applyGitHubPagesMeta() {
    const base = getBasePath();
    const canonical = document.querySelector('link[rel="canonical"]');

    if (base) {
      document.documentElement.dataset.basePath = base;
    }

    if (canonical) {
      canonical.href = base
        ? `${window.location.origin}${base}/`
        : `${window.location.origin}${window.location.pathname.replace(/index\.html$/, '')}`;
    }
  }

  applyGitHubPagesMeta();
  applyFormEmbedOffset();

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://docs.google.com' || !formIframe) return;

    if (typeof event.data === 'number') {
      resizeFormIframe(event.data);
      return;
    }

    if (typeof event.data === 'string') {
      const parsed = Number.parseInt(event.data, 10);
      if (!Number.isNaN(parsed)) {
        resizeFormIframe(parsed);
      }
    }
  });

  const rawFormUrl = (typeof PORTFOLIO_CONFIG !== 'undefined' && PORTFOLIO_CONFIG.googleFormUrl)
    ? PORTFOLIO_CONFIG.googleFormUrl
    : '';
  const formUrl = normalizeGoogleFormUrl(rawFormUrl);

  if (formUrl && formIframe) {
    formIframe.src = formUrl;
    if (formNotice) formNotice.hidden = true;
  } else if (formIframe && formNotice) {
    formIframe.hidden = true;
    formNotice.hidden = false;
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
