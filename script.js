const header = document.querySelector('[data-header]') || document.querySelector('.site-header');
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-nav-toggle]');

const themeToggle = document.querySelector('[data-theme-toggle]') || document.createElement('button');
if (!themeToggle.isConnected) {
  themeToggle.type = 'button';
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('data-theme-toggle', '');
}
themeToggle.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-label"></span>';

const updateThemeToggle = () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.querySelector('.theme-toggle-icon').textContent = dark ? '☀' : '☾';
  themeToggle.querySelector('.theme-toggle-label').textContent = dark ? 'Light' : 'Dark';
};

if (header) {
  if (!themeToggle.isConnected) header.insertBefore(themeToggle, toggle || nav);
  updateThemeToggle();
}

themeToggle.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  if (dark) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) { /* Storage may be unavailable. */ }
  updateThemeToggle();
});

window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', (event) => {
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (_) { /* Use the system preference. */ }
  if (savedTheme) return;
  if (event.matches) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  updateThemeToggle();
});

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const closeNav = (returnFocus = false) => {
  toggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('open');
  document.body.style.overflow = '';
  if (returnFocus) toggle?.focus();
};

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  if (open) closeNav();
  else {
    toggle.setAttribute('aria-expanded', 'true');
    nav?.classList.add('open');
    document.body.style.overflow = 'hidden';
    nav?.querySelector('a')?.focus();
  }
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeNav();
}));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) closeNav(true);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760 && nav?.classList.contains('open')) closeNav();
}, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
let observer = null;
if ('IntersectionObserver' in window) {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

const hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
hashTarget?.classList.add('visible');
hashTarget?.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
if (observer) revealElements.forEach((element) => observer.observe(element));
document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
