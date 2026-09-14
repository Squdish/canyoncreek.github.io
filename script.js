// ==========================================================================
// CANYON CREEK — shared site behaviour
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDust();
  markActiveNav();
});

function initNav(){
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if(!burger || !links) return;
  burger.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

function markActiveNav(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if(a.dataset.page === path) a.classList.add('active');
  });
}

function initDust(){
  const field = document.querySelector('.hero-dust');
  if(!field) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = 26;
  for(let i = 0; i < count; i++){
    const mote = document.createElement('span');
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = 9 + Math.random() * 8;
    const size = 2 + Math.random() * 2;
    mote.style.left = left + '%';
    mote.style.animationDelay = delay + 's';
    mote.style.animationDuration = duration + 's';
    mote.style.width = size + 'px';
    mote.style.height = size + 'px';
    field.appendChild(mote);
  }
}
