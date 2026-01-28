const targets = document.querySelectorAll('.reveal');

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

targets.forEach(t => io.observe(t));
