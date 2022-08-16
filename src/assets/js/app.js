import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/thumbs';
import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', function() {
  /* Mobile Collapsible Menu */
  const mobileMenuTrigger = document.getElementById('collapsibleMenuMobileTrigger');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');

  function collapseMobileMenu() {
    mobileMenuPanel.classList.toggle('active');
    if (mobileMenuPanel.classList.contains('active')) {
      setTimeout(() => {
        mobileMenuPanel.classList.add('shown');
      }, 500);
      mobileMenuTrigger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mobile-menu-opened');
    } else {
      closeMobileMenu();
    }
  }

  function closeMobileMenu() {
    mobileMenuPanel.classList.remove('shown', 'active');
    mobileMenuTrigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-opened');
  }

  mobileMenuTrigger.addEventListener('click', collapseMobileMenu);

  /* Desktop Header Collapsible Elements */

  const pageWrapper = document.getElementById('pageWrapper');
  const desktopSearchTrigger = document.getElementById('searchFormDesktopTrigger');
  const desktopSearchForm = document.getElementById('searchFormDesktop');
  const desktopMenuTrigger = document.getElementById('collapsibleMenuDesktopTrigger');
  const desktopMenuPanel = document.getElementById('desktopMenuPanel');

  function desktopHeaderCollapsibleElementTriggerAction(trigger, element) {
    if (!element.classList.contains('active')) {
      unCollapseElement(trigger, element);
    } else {
      collapseElement(trigger, element);
    }
  }

  function unCollapseElement(trigger, element) {
    element.classList.add('active');
    setTimeout(() => {
      element.classList.add('shown');
    }, 100);
    trigger.setAttribute('aria-expanded', 'true');
  }

  function collapseElement(trigger, element) {
    element.classList.remove('shown');
    setTimeout(() => {
      element.classList.remove('active');
    }, 100);
    trigger.setAttribute('aria-expanded', 'false');
  }

  desktopSearchTrigger.addEventListener('click', function (event) {
    event.preventDefault();
    collapseElement(desktopMenuTrigger, desktopMenuPanel);
    setTimeout(() => {
      desktopHeaderCollapsibleElementTriggerAction(desktopSearchTrigger, desktopSearchForm);
    }, 100);
  });

  desktopMenuTrigger.addEventListener('click', function (event) {
    event.preventDefault();
    collapseElement(desktopMenuTrigger, desktopSearchForm);
    setTimeout(() => {
      desktopHeaderCollapsibleElementTriggerAction(desktopMenuTrigger, desktopMenuPanel);
    }, 100);
  });

  pageWrapper.addEventListener('click', function(event) {
    if (desktopSearchForm.classList.contains('shown') && !desktopSearchForm.contains(event.target)) {
      collapseElement(desktopSearchTrigger, desktopSearchForm);
    }
  });

  pageWrapper.addEventListener('click', function(event) {
    if (desktopMenuPanel.classList.contains('shown') && !desktopMenuPanel.contains(event.target)) {
      collapseElement(desktopMenuTrigger, desktopMenuPanel);
    }
  });

  /* Hero Swiper */
  const swiperHero = new Swiper('.swiper-hero', {
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  /* Posts Swiper */
  const swiperPosts = new Swiper('.swiper-posts', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 18,
    breakpoints: {
      550: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      750: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  /* Gallery Swiper */
  const gallerySwiperThumbs = new Swiper('.swiper-gallery-thumbs-carousel', {
    modules: [Navigation],
    spaceBetween: 0,
    slidesPerView: 3,
    threshold: 20,
    breakpoints: {
      550: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: '.swiper-gallery-thumbs-button-next',
      prevEl: '.swiper-gallery-thumbs-button-prev',
    },
  });
  const gallerySwiper = new Swiper('.swiper-gallery', {
    modules: [Thumbs],
    thumbs: {
      swiper: gallerySwiperThumbs,
    },
  });
  const gallerySwiperThumbsModalVersion = new Swiper('.swiper-gallery-thumbs-carousel-modal-version', {
    spaceBetween: 6,
    slidesPerView: 4,
    threshold: 20,
  });
  const gallerySwiperModalVersion = new Swiper('.swiper-gallery-modal-version', {
    modules: [Navigation, Pagination, Thumbs],
    navigation: {
      enabled: false,
    },
    pagination: {
      el: '.swiper-gallery-modal-version-pagination',
      clickable: true,
    },
    thumbs: {
      swiper: gallerySwiperThumbsModalVersion,
    },
    breakpoints: {
      768: {
        navigation: {
          enabled: true,
          nextEl: '.swiper-gallery-modal-version-button-next',
          prevEl: '.swiper-gallery-modal-version-button-prev',
        },
        pagination: {
          enabled: false,
        },
      },
    },
  });

  const galleryModal = document.getElementById('galleryModal');
  const galleryModalOpenElements = document.querySelectorAll('.swiper-gallery .swiper-slide');

  galleryModalOpenElements.forEach(function (openSlide) {
    openSlide.addEventListener('click', function (event) {
      const activeSlideNumber = this.dataset.slideIndex;
      gallerySwiperModalVersion.slideTo(activeSlideNumber - 1, 0, false);
      galleryModal.classList.add('active');
      document.body.classList.add('modal-opened');
    });
  });

  window.onclick = function(event) {
    if (event.target === galleryModal) {
      const activeSlideNumber = document.querySelector('.swiper-gallery-modal-version .swiper-slide-active').dataset.slideIndex;
      gallerySwiper.slideTo(activeSlideNumber - 1, 0, false);
      galleryModal.classList.remove('active');
      document.body.classList.remove('modal-opened');
    }
  };

  /* On Resize */
  window.addEventListener('resize', function () {
    if (window.innerWidth < 992) {
      collapseElement(desktopSearchTrigger, desktopSearchForm);
      collapseElement(desktopMenuTrigger, desktopMenuPanel);
    } else {
      closeMobileMenu();
    }
  });
});
