// Мобилно меню
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// Активен елемент в менюто според секцията на екрана
const links = document.querySelectorAll('.nav > li > a[href^="#"]');
const map = {};
links.forEach(a => { map[a.getAttribute('href').slice(1)] = a.parentElement; });
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && map[e.target.id]) {
      document.querySelectorAll('.nav > li').forEach(li => li.classList.remove('active'));
      map[e.target.id].classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
Object.keys(map).forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });

// Форми (демонстрация – за реално изпращане е нужен бекенд / услуга за форми)
function handleFormSubmit(e) {
  e.preventDefault();
  document.getElementById('formSuccess').style.display = 'block';
  e.target.reset();
}
function handleNewsletterSubmit(e) {
  e.preventDefault();
  document.getElementById('newsletterSuccess').style.display = 'block';
  e.target.reset();
}

// ===== Безплатна консултация – интерактивен въпросник (демо; отговорите не се изпращат никъде) =====
(function () {
  const IC = {"wind": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 18h24a5 5 0 1 0-5-5\"/><path d=\"M6 26h32a5 5 0 1 1-5 5\"/><path class=\"ac\" d=\"M6 34h16\"/></svg>", "rain": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M14 29a8 8 0 0 1 1-16 10 10 0 0 1 19 3 6.5 6.5 0 0 1 0 13z\"/><path class=\"ac\" d=\"M16 36l-2 6M24 36l-2 6M32 36l-2 6\"/></svg>", "heart": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M24 41S6 30 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23z\"/><path class=\"ac\" d=\"M25 14l-5 9 6 4-4 9\"/></svg>", "rings": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"18\" cy=\"24\" r=\"11\"/><circle class=\"ac\" cx=\"30\" cy=\"24\" r=\"11\"/></svg>", "sprout": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M24 41V24\"/><path d=\"M24 30c0-8-6-11-13-11 0 8 5 11 13 11z\"/><path class=\"ac\" d=\"M24 25c0-7 5-10 12-10 0 7-5 10-12 10z\"/></svg>", "cal": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M8 12h32v28H8zM8 22h32M16 7v8M32 7v8\"/><path class=\"ac\" d=\"M16 29h4M24 29h4M16 35h4\"/></svg>", "clock": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"16\"/><path class=\"ac\" d=\"M24 14v10l7 5\"/></svg>", "mount": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 40L18 15l9 14 5-7 12 18z\"/><path class=\"ac\" d=\"M14 24l4 4 4-5\"/></svg>", "person": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"16\" r=\"7\"/><path class=\"ac\" d=\"M10 41c0-9 6-14 14-14s14 5 14 14\"/></svg>", "pair": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"17\" r=\"6\"/><circle class=\"ac\" cx=\"33\" cy=\"19\" r=\"5\"/><path d=\"M5 40c0-8 5-12 11-12s11 4 11 12\"/><path class=\"ac\" d=\"M29 29c6 0 11 3 12 11\"/></svg>", "group": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"15\" r=\"5.5\"/><circle class=\"ac\" cx=\"10\" cy=\"20\" r=\"4.5\"/><circle class=\"ac\" cx=\"38\" cy=\"20\" r=\"4.5\"/><path d=\"M13 40c0-7 5-11 11-11s11 4 11 11\"/><path class=\"ac\" d=\"M3 38c0-6 3-9 7-9M45 38c0-6-3-9-7-9\"/></svg>", "compass": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"17\"/><path class=\"ac\" d=\"M31 17l-4 10-10 4 4-10z\"/></svg>", "done": "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"19\"/><path class=\"ac\" d=\"M14 25l7 7 13-14\"/></svg>"};
  const FACE_SVG = ["<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"#fff7ea\" stroke=\"#ff9f1c\"/><circle cx=\"17\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><circle cx=\"31\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><path stroke=\"#00968a\" d=\"M15 28q9 9 18 0\"/></svg>", "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"#fff7ea\" stroke=\"#ff9f1c\"/><circle cx=\"17\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><circle cx=\"31\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><path stroke=\"#00968a\" d=\"M16 29q8 5 16 0\"/></svg>", "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"#fff7ea\" stroke=\"#ff9f1c\"/><circle cx=\"17\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><circle cx=\"31\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><path stroke=\"#00968a\" d=\"M16 31h16\"/></svg>", "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"#fff7ea\" stroke=\"#ff9f1c\"/><circle cx=\"17\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><circle cx=\"31\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><path stroke=\"#00968a\" d=\"M16 33q8-6 16 0\"/><path stroke=\"#00968a\" d=\"M13 14l7 2M35 14l-7 2\"/></svg>", "<svg viewBox=\"0 0 48 48\" fill=\"none\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"#fff7ea\" stroke=\"#ff9f1c\"/><circle cx=\"17\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><circle cx=\"31\" cy=\"20\" r=\"2\" fill=\"#00968a\" stroke=\"none\"/><path stroke=\"#00968a\" d=\"M15 35q9-10 18 0\"/><path stroke=\"#25a7df\" d=\"M33 25v6\"/></svg>"];
  const Q1 = [[IC.wind, 'Тревожност и напрежение', 'Непрестанни мисли, трудно спокойствие'], [IC.rain, 'Ниско настроение', 'Липса на енергия и мотивация'], [IC.heart, 'Тежък спомен или травма', 'Преживяване, което още тежи'], [IC.rings, 'Взаимоотношения', 'Трудности във връзката или семейството']];
  const Q2 = [[IC.sprout, 'От по-малко от месец'], [IC.cal, 'От 1 до 6 месеца'], [IC.clock, 'От повече от 6 месеца'], [IC.mount, 'От години']];
  const Q4 = [[IC.person, 'Индивидуални срещи'], [IC.pair, 'Двойка или семейство'], [IC.group, 'Групова работа'], [IC.compass, 'Не знам – искам съвет']];
  const FACES = [0, 0, 1, 1, 2, 2, 3, 3, 3, 4, 4].map(i => FACE_SVG[i]);
  const LBL = ['Почти не ми пречи', 'Лек дискомфорт', 'Усеща се в ежедневието', 'Пречи ми осезаемо', 'Пречи ми много'];
  const REC = [
    ['Индивидуална психотерапия и КПТ', 'Започваме с разбиране на мислите и тялото и с практични техники за успокояване.', 'Люба Цанова'],
    ['Схема терапия', 'Разпознаваме дълбоки повтарящи се модели, които поддържат ниското настроение.', 'Люба Цанова'],
    ['TSM и EMDR терапия', 'Безопасна преработка на тежки преживявания – стъпка по стъпка и във ваш ритъм.', 'Люба Цанова'],
    ['Психодрама и семейни констелации', 'Поглеждаме на връзките отвън и откриваме нов начин на общуване.', 'Теодора Петкова']
  ];
  const WAIT = ['Подреждаме отговорите ви…', 'Търсим подходящ метод…', 'Подготвяме препоръката…'];
  const ov = document.getElementById('svOverlay'), body = document.getElementById('svBody'), bar = document.getElementById('svBar');
  if (!ov) return;
  const TOTAL = 5; let step = 0, ans = [], timer;
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const back = () => '<button type="button" class="sv-back" id="svBack">← Назад</button>';
  const head = (n, q) => '<div class="sv-step">Въпрос ' + n + ' от 4</div><h3 class="sv-q" id="svTitle">' + esc(q) + '</h3>';

  function cards(list, cls) {
    return '<div class="sv-grid ' + (cls || '') + '">' + list.map((o, i) => '<button type="button" class="sv-card" data-i="' + i + '" style="animation-delay:' + i * 70 + 'ms"><span class="sv-ico">' + o[0] + '</span><b>' + esc(o[1]) + '</b>' + (o[2] ? '<small>' + esc(o[2]) + '</small>' : '') + '</button>').join('') + '</div>';
  }
  function pick(n) { body.querySelectorAll('.sv-card').forEach(b => b.onclick = () => { b.classList.add('sel'); ans[n] = +b.dataset.i; setTimeout(() => { step++; render(); }, 280); }); }

  function render() {
    clearInterval(timer);
    bar.style.width = Math.round(step / TOTAL * 100) + '%';
    body.classList.remove('sv-in'); void body.offsetWidth; body.classList.add('sv-in');
    if (step === 0) { body.innerHTML = head(1, 'Какво ви тревожи най-много в момента?') + cards(Q1, 'two'); pick(0); }
    else if (step === 1) { body.innerHTML = head(2, 'От колко време се чувствате така?') + cards(Q2, 'two') + back(); pick(1); }
    else if (step === 2) {
      const v = ans[2] == null ? 5 : ans[2];
      body.innerHTML = head(3, 'Доколко това се отразява на съня, работата и близките ви?') +
        '<div class="sv-face" id="svFace">' + FACES[v] + '</div><div class="sv-lbl" id="svLbl">' + LBL[Math.min(4, Math.floor(v / 2.1))] + '</div>' +
        '<input type="range" min="0" max="10" value="' + v + '" id="svRange" class="sv-range" aria-label="Ниво"><div class="sv-ends"><span>Малко</span><span>Много</span></div>' +
        '<button type="button" class="btn" id="svNext">Продължи</button>' + back();
      const r = document.getElementById('svRange'), upd = () => { const x = +r.value; ans[2] = x; r.style.setProperty('--p', x * 10 + '%'); document.getElementById('svFace').innerHTML = FACES[x]; document.getElementById('svLbl').textContent = LBL[Math.min(4, Math.floor(x / 2.1))]; };
      r.oninput = upd; upd();
      document.getElementById('svNext').onclick = () => { step++; render(); };
    }
    else if (step === 3) { body.innerHTML = head(4, 'За какъв формат на работа мислите?') + cards(Q4, 'two') + back(); pick(3); }
    else if (step === 4) {
      let i = 0;
      body.innerHTML = '<div class="sv-wait"><div class="sv-spin"></div><p id="svWait">' + WAIT[0] + '</p></div>';
      timer = setInterval(() => { i++; if (i >= WAIT.length) { clearInterval(timer); step++; render(); } else document.getElementById('svWait').textContent = WAIT[i]; }, 800);
      return;
    }
    else if (step === 5) { result(); return; }
    else { done(); return; }
    const b = document.getElementById('svBack'); if (b) b.onclick = () => { step--; render(); };
  }

  function result() {
    const r = REC[ans[0]], score = Math.min(92, Math.round(12 + ans[1] * 9 + ans[2] * 4.5));
    const lvl = score < 35 ? 'леко' : score < 60 ? 'умерено' : 'повишено';
    bar.style.width = '90%';
    body.innerHTML = '<div class="sv-step">Вашата препоръка</div><h3 class="sv-q" id="svTitle">Ето къде бихме започнали</h3>' +
      '<div class="sv-res"><div class="sv-ring" id="svRing"><span id="svNum">0</span><small>%</small></div><div><b>Ориентировъчно натоварване: ' + lvl + '</b><p>Не е диагноза – само помага да подберем първата стъпка.</p></div></div>' +
      '<div class="sv-rec"><b>' + esc(r[0]) + '</b><p>' + esc(r[1]) + '</p><span>' + IC.person + ' Подходящ специалист: ' + esc(r[2]) + '</span></div>' +
      (score >= 60 ? '<p class="sv-urgent">Състоянието ви се отразява осезаемо – препоръчваме да не отлагате първата среща.</p>' : '') +
      '<form id="svForm"><input type="text" required placeholder="Вашето име" aria-label="Име"><input type="tel" required placeholder="Телефон за връзка" aria-label="Телефон"><button class="btn" type="submit">Заявявам безплатна консултация</button></form>' + back() +
      '<p class="sv-fine">Данните ви остават поверителни. Първата консултация е безплатна и неангажираща.</p>';
    const ring = document.getElementById('svRing'), num = document.getElementById('svNum'); let n = 0;
    const t = setInterval(() => { n += 2; if (n >= score) { n = score; clearInterval(t); } num.textContent = n; ring.style.background = 'conic-gradient(var(--orange) ' + n * 3.6 + 'deg,#e3f1f1 0)'; }, 25);
    document.getElementById('svBack').onclick = () => { step = 3; render(); };
    document.getElementById('svForm').onsubmit = e => { e.preventDefault(); step++; render(); };
  }

  function done() {
    bar.style.width = '100%';
    body.innerHTML = '<div class="sv-done"><div class="sv-big">' + IC.done + '</div><h3 class="sv-q" id="svTitle" style="padding:0">Заявката е приета!</h3><p>Ще се свържем с вас възможно най-скоро, за да уговорим удобен час.</p><p style="margin-top:12px">Или се обадете директно: <a href="tel:+359887720117" class="accent">+359 88 772 0117</a></p></div>';
    const cols = ['#ff9f1c', '#00968a', '#25a7df', '#ffd27a', '#62c1e8'];
    for (let i = 0; i < 48; i++) { const c = document.createElement('i'); c.className = 'sv-conf'; c.style.cssText = 'left:' + Math.random() * 100 + '%;background:' + cols[i % 5] + ';animation-delay:' + Math.random() * .5 + 's;transform:rotate(' + Math.random() * 360 + 'deg)'; document.querySelector('.sv-modal').appendChild(c); setTimeout(() => c.remove(), 2600); }
  }

  function open() { step = 0; ans = []; render(); ov.classList.add('open'); ov.setAttribute('aria-hidden', 'false'); }
  function close() { clearInterval(timer); ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true'); }
  document.querySelectorAll('[data-survey]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); open(); }));
  document.getElementById('svClose').onclick = close;
  ov.addEventListener('click', e => { if (e.target === ov) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
