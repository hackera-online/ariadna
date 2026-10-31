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
