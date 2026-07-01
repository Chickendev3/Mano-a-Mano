document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    const root = document.documentElement;
    const esClaro = root.getAttribute('data-theme') === 'light';

    if (esClaro) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
});