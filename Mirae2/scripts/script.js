document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const nav = document.getElementById('nav');

  burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Select all indicators, sections, and wrappers
  const indicators = document.querySelectorAll('.indicator');
  const sections = document.querySelectorAll('.section');
  const indicatorWrappers = document.querySelectorAll('.indicator-wrapper');
  const scrollIndicators = document.querySelector('.indicator-bar');
  const footer = document.querySelector('.footer');

  const observerOptions = {
    root: null,
    threshold: 0.5, // 50% of the footer must be visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        scrollIndicators.classList.add('hidden');
      } else {
        scrollIndicators.classList.remove('hidden');
      }
    });
  }, observerOptions);

  observer.observe(footer);

  // Track the currently active index
  let currentIndex = -1;

  function updateActiveIndicator() {
    let maxVisibleRatio = 0;
    let activeIndex = currentIndex;

    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();

      // Calculate the visible height ratio of the section in the viewport
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const visibleRatio = visibleHeight / rect.height;

      if (visibleRatio > maxVisibleRatio) {
        maxVisibleRatio = visibleRatio;
        activeIndex = i;
      }
    });

    if (activeIndex !== currentIndex) {
      currentIndex = activeIndex;

      // Update active indicator and labels
      indicators.forEach((indicator, i) => {
        const wrapper = indicatorWrappers[i];
        if (i === activeIndex) {
          indicator.classList.add('active');
          wrapper.classList.add('active'); // Show label
        } else {
          indicator.classList.remove('active');
          wrapper.classList.remove('active'); // Hide label
        }
      });
    }
  }

  // Add click listeners to indicators
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const targetId = indicator.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Update active indicator on scroll
  window.addEventListener('scroll', updateActiveIndicator);

  // Initial setup
  updateActiveIndicator();
});
