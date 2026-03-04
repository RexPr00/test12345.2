const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];

const langPill = $('.lang-pill');
const langMenu = $('.lang-menu:not(.static)');
if (langPill && langMenu) {
  langPill.addEventListener('click', () => {
    const open = langMenu.classList.toggle('open');
    langPill.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-wrap')) {
      langMenu.classList.remove('open');
      langPill.setAttribute('aria-expanded', 'false');
    }
  });
}

const drawer = $('#mobile-drawer');
const burger = $('.burger');
const closeBtn = $('.drawer-close');
const backdrop = $('.drawer-backdrop');

function trapFocus(container, event) {
  if (event.key !== 'Tab') return;
  const focusables = $$('a,button,input,summary,[tabindex]:not([tabindex="-1"])', container).filter(el => !el.disabled);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  backdrop.hidden = false;
  document.body.classList.add('locked');
  closeBtn.focus();
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  backdrop.hidden = true;
  document.body.classList.remove('locked');
}
if (burger) burger.addEventListener('click', openDrawer);
if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
if (backdrop) backdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDrawer();
    closeModal();
  }
  if (drawer.classList.contains('open')) trapFocus(drawer, e);
  if (modal.classList.contains('open')) trapFocus(modal, e);
});
$$('.drawer-nav a').forEach(a => a.addEventListener('click', closeDrawer));

$$('.faq-list details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    $$('.faq-list details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const modal = $('#privacy-modal');
const openPrivacy = $('[data-open-privacy]');
const closePrivacy = $('[data-close-privacy]');
const closeX = $('.modal-x');

function openModal(e) {
  e.preventDefault();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  closeX.focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
}
if (openPrivacy) openPrivacy.addEventListener('click', openModal);
if (closePrivacy) closePrivacy.addEventListener('click', closeModal);
if (closeX) closeX.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => io.observe(el));

$$('form').forEach(form => form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you. After you sign up, you get instant access to the next steps.');
  form.reset();
}));
