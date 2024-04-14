const slideshowWrapper = document.querySelector('.slideshow');
const slides = slideshowWrapper.querySelectorAll('.slide');
let currentSlideIndex = 0;

function changeSlide() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    slide.classList.remove('next');
    slide.classList.remove('prev');
  });

  slides[currentSlideIndex].classList.add('prev');
  const nextSlideIndex = currentSlideIndex + 1;
  if (nextSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else {
    currentSlideIndex = nextSlideIndex;
  }
  slides[currentSlideIndex].classList.add('next');
  slides[currentSlideIndex].classList.add('active');
}

setInterval(changeSlide, 5000);