// スタッガーと reduced-motion 対応の IntersectionObserver
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
} else {
  const targets = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseFloat(el.dataset.revealDelay || 0);
      setTimeout(() => el.classList.add('show'), delay * 1000);
      io.unobserve(el);
    });
  }, { threshold: 0.2 });

  targets.forEach((t, i) => {
    // もし data-reveal-delay がなければ簡単なスタッガーを与える
    if (!t.hasAttribute('data-reveal-delay')) t.dataset.revealDelay = (i * 0.08).toFixed(2);
    io.observe(t);
  });
}
