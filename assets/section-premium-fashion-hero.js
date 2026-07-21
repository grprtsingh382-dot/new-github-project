document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('[data-section-type="premium-fashion-hero"]');

  sections.forEach(function (section) {
    const revealItems = section.querySelectorAll('.reveal');
    const media = section.querySelector('.premium-fashion-hero__media');
    const mediaFrame = section.querySelector('.premium-fashion-hero__media-frame');
    const buttons = section.querySelectorAll('.js-magnetic');
    const enableAnimations = section.getAttribute('data-animation-enabled') !== 'false';

    if (enableAnimations && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -60px 0px'
      });

      revealItems.forEach(function (item, index) {
        item.style.setProperty('--reveal-delay', index * 0.06 + 's');
        revealObserver.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add('is-visible');
      });
    }

    if (enableAnimations && media && mediaFrame) {
      const applyParallax = function () {
        const rect = media.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const distance = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
        const offset = (distance - 0.4) * 10;
        mediaFrame.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
      };

      window.addEventListener('scroll', applyParallax, { passive: true });
      window.addEventListener('resize', applyParallax);
      applyParallax();
    }

    if (media) {
      media.addEventListener('mousemove', function (event) {
        const rect = media.getBoundingClientRect();
        const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
        media.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
      });

      media.addEventListener('mouseleave', function () {
        media.style.transform = '';
      });

      media.classList.add('is-visible');
    }

    buttons.forEach(function (button) {
      button.addEventListener('mousemove', function (event) {
        const rect = button.getBoundingClientRect();
        const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
        button.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0)';
      });

      button.addEventListener('mouseleave', function () {
        button.style.transform = '';
      });
    });
  });
});
