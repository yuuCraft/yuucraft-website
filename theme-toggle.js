// <button id="themeToggle" aria-pressed="false">Theme</button> を想定
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');

function applyTheme(t) {
  root.setAttribute('data-theme', t);
  if (toggle) toggle.setAttribute('aria-pressed', t === 'dark');
}

const saved = localStorage.getItem('theme');
if (saved) applyTheme(saved);
else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

if (toggle) {
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}
