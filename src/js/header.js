import Notiflix from 'notiflix';
const btn = document.querySelector('.menu-btn-mobile');
const menu = document.querySelector('.mobile-menu');
const backdrop = document.querySelector('.backdrop');
btn.addEventListener('click', onBtnClick);
backdrop.addEventListener('click', onBackClick);
const navLinks = document.querySelectorAll('.menu-link');
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  } else if (window.location.pathname === '/') {
    navLinks[0].classList.add('active');
  } else {
    link.classList.remove('active');
  }
});
// phone
const mobNavLinks = document.querySelectorAll('.mobile-menu-link');
mobNavLinks.forEach(mobLink => {
  if (mobLink.href === window.location.href) {
    mobLink.classList.add('active');
  } else if (window.location.pathname === '/') {
    mobNavLinks[0].classList.add('active');
  } else {
    mobLink.classList.remove('active');
  }
});

function onBtnClick(event) {
  event.preventDefault();
  menu.classList.toggle('is-open');
  btn.classList.toggle('hide');
  backdrop.classList.toggle('is-hidden');
  headerScrollDisabled()
}

function onBackClick(event) {
  event.preventDefault();
  menu.classList.remove('is-open');
  btn.classList.remove('hide');
  backdrop.classList.add('is-hidden');
  headerScrollDisabled()
}
function headerScrollDisabled(){
  const bodyHeader = document.body;
  bodyHeader.classList.toggle('header-scroll-disabled');
}

window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  menu.classList.remove('is-open');
  backdrop.classList.add('is-hidden');
  btn.classList.remove('hide');
  headerScrollDisabled()
});
