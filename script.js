// テーマ切替 & 簡易 contact form -> mailto 実装
document.addEventListener('DOMContentLoaded', () => {
  // 年を自動セット
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // テーマ切替
  const toggle = document.getElementById('theme-toggle');
  const current = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if(current === 'dark') document.body.classList.add('dark');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', isDark);
  });

  // contact form を mailto で開く（受信先は未設定）
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const message = data.get('message') || '';
    const subject = encodeURIComponent(`お問い合わせ from ${name}`);
    const body = encodeURIComponent(`名前: ${name}\nメール: ${email}\n\n${message}`);
    // 受信先メールアドレスが未指定の場合は recipient を空にして mailto を開く
    // 受信先を指定したい場合は 'you@example.com' の部分を置き換えてください
    const recipient = ''; // 例: 'you@example.com'
    const mailto = recipient
      ? `mailto:${recipient}?subject=${subject}&body=${body}`
      : `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });
});
