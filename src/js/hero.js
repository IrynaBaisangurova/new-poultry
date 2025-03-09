// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';


document.addEventListener('DOMContentLoaded', () => {

  const prevButton = document.querySelector('.button-prev');
  const nextButton = document.querySelector('.button-next');

  let swiper

  function updateButtonsState() {
      
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

  swiper = new Swiper('.swiper-hero', {
    watchOverflow: false,
    loop: true,
    direction: 'horizontal',
    simulateTouch: true,
    grabCursor: true,
    slidesPerView: 1,
    speed: 1000,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    },
    on: {
      slideChange: updateButtonsState,
      init: updateButtonsState,
    },
  });
});



