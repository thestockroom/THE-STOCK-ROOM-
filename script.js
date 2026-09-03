const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');

menu.addEventListener('click', () => {
  nav.classList.toggle('mobile');
});

document.querySelectorAll('.nav nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('mobile'));
});

const modal = document.getElementById('modal');
const title = document.getElementById('modalTitle');

document.querySelectorAll('[data-course]').forEach(btn => {
  btn.addEventListener('click', () => {
    title.textContent = btn.dataset.course;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('.close').addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
