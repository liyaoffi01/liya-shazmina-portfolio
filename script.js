const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const progressBar = document.querySelector('.scroll-progress');
const nav = document.querySelector('.nav');

function updateScrollEffects() {
  const doc = document.documentElement;
  const maxScroll = doc.scrollHeight - doc.clientHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 12);
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects();

const revealTargets = document.querySelectorAll(
  'section, .card, .video-card, .link-card, .gallery-block, .gallery img, .contact-card, .contact-box > .card'
);

revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.setProperty('--delay', `${Math.min(index % 6, 5) * 55}ms`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });

revealTargets.forEach((element) => revealObserver.observe(element));

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const closeLightbox = document.querySelector('.lightbox-close');

function openLightbox(image) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt || 'Portfolio image';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightboxView() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery img').forEach((image) => {
  image.addEventListener('click', () => openLightbox(image));
});

if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxView);
if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightboxView();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightboxView();
});
