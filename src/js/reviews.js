
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';



document.addEventListener('DOMContentLoaded', () => {

  const prevButton = document.querySelector('.button-prev');
  const nextButton = document.querySelector('.button-next');

  let swiper

  function updateButtons() {
      
    if (!swiper) return;
  
    if (swiper.isBeginning) {
      prevButton.setAttribute('disabled', 'true');
    } else {
      prevButton.removeAttribute('disabled');
    }
  
    if (swiper.isEnd) {
      nextButton.setAttribute('disabled', 'true');
    } else {
      nextButton.removeAttribute('disabled');
    }
  }

  swiper = new Swiper('.slider-wrapper', {
    watchOverflow: true,
    centeredSlides: true,
    loop: true,
    direction: 'horizontal',
    simulateTouch: true,
    grabCursor: true,
    spaceBetween: 16,
    slidesPerView: 1,
    speed: 1000,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false
    // },
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
    on: {
      slideChange: updateButtons,
      init: updateButtons,
    },
    breakpoints: {
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        },
  });
});
