// script.js — 軽量なナビゲーション制御とスムーススクロール
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.setAttribute('aria-hidden', String(expanded));
      // 更新ボタンラベル（スクリーンリーダー用）
      this.setAttribute('aria-label', expanded ? 'メニューを開く' : 'メニューを閉じる');
    });

    // メニュー外をクリックしたら閉じる（モバイル挙動向上）
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'メニューを開く');
      }
    });
  }

  // スムーススクロール（内部リンク）
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // モバイルならメニューを閉じる
        if (nav && window.getComputedStyle(toggle).display !== 'none') {
          nav.setAttribute('aria-hidden', 'true');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});
