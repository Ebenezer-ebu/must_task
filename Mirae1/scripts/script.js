document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const nav = document.getElementById('nav');

  burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  const sliderImages = document.querySelector('.slider-images');
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');

  let currentIndex = 0;
  const slideCount = slides.length;
  const slideWidth = slides[0].clientWidth;
  let interval;

  // Function to go to a specific slide
  const goToSlide = (index) => {
    currentIndex = index;
    sliderImages.style.transform = `translateX(-${slideWidth * index}px)`;
    updateIndicators();
  };

  // Function to update indicator states
  const updateIndicators = () => {
    indicators.forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === currentIndex);
    });
  };

  // Automatic sliding
  const startAutoSlide = () => {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      goToSlide(currentIndex);
    }, 3000); // Change slides every 3 seconds
  };

  // Event listeners for indicators
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', (e) => {
      clearInterval(interval); // Stop auto sliding on user interaction
      const index = parseInt(e.target.getAttribute('data-index'), 10);
      goToSlide(index);
      startAutoSlide(); // Restart auto sliding
    });
  });

  // Initial setup
  goToSlide(0);
  startAutoSlide();

  let currentIndex2 = 0;

  const track = document.querySelector('.slider-track');
  const slides2 = document.querySelectorAll('.slide-img');
  const totalSlides = slides2.length;

  const slideLeft = () => {
    currentIndex2 = (currentIndex2 - 1 + totalSlides) % totalSlides; // Go to previous slide
    track.style.transform = `translateX(-${currentIndex2 * 100}%)`;
  };

  const slideRight = () => {
    currentIndex2 = (currentIndex2 + 1) % totalSlides; // Go to next slide
    track.style.transform = `translateX(-${currentIndex2 * 100}%)`;
  };

  // Attach event listeners
  document.querySelector('.arrow.left').addEventListener('click', slideLeft);
  document.querySelector('.arrow.right').addEventListener('click', slideRight);
});
