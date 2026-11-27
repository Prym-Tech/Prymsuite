const nav = document.getElementById('main-nav-bar');
const updateNavigation = () => nav?.classList.toggle('nav-scrolled', window.scrollY > 40);
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const waveMotions = document.querySelectorAll('.hero-wave-motion');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const syncWaveMotion = () => {
  waveMotions.forEach((motion) => {
    if (motionPreference.matches) motion.endElement?.();
    else motion.beginElement?.();
  });
};
if (!motionPreference.matches) syncWaveMotion();
motionPreference.addEventListener?.('change', syncWaveMotion);

const tabNames = {
  prymagent: 'PrymAgent billing',
  pages: 'Pages professional site',
  prymsearch: 'Prymsearch discovery',
};

window.switchWorkTab = (tabKey) => {
  const selected = tabNames[tabKey] ? tabKey : 'prymagent';
  const indicator = document.getElementById('walkthrough-active-indicator');
  if (indicator) indicator.textContent = `Tab: ${tabNames[selected]}`;

  Object.keys(tabNames).forEach((key) => {
    const panel = document.getElementById(`tab-panel-${key}`);
    const button = document.getElementById(`tab-btn-${key}`);
    const active = key === selected;
    panel?.classList.toggle('hidden', !active);
    panel?.classList.toggle('block', active);
    if (button) {
      button.className = active
        ? 'px-5 sm:px-6 py-2 rounded-full text-[14px] font-bold transition-all bg-[#010E09] text-[#F7FAF0] shadow-sm'
        : 'px-5 sm:px-6 py-2 rounded-full text-[14px] font-bold transition-all text-[#010E09] hover:bg-black/10';
      button.setAttribute('aria-pressed', String(active));
    }
  });

  const activePanel = document.getElementById(`tab-panel-${selected}`);
  window.setTimeout(() => {
    activePanel?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }, 0);
};

document.querySelectorAll('.faq-item').forEach((item) => {
  const trigger = item.querySelector('.faq-trigger');
  trigger?.addEventListener('click', () => {
    const shouldOpen = item.getAttribute('data-open') !== 'true';
    document.querySelectorAll('.faq-item').forEach((other) => {
      other.setAttribute('data-open', 'false');
      other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
    });
    item.setAttribute('data-open', String(shouldOpen));
    trigger.setAttribute('aria-expanded', String(shouldOpen));
  });
});
