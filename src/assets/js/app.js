import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
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
    } else {
      closeMobileMenu();
    }
  }

  function closeMobileMenu() {
    mobileMenuPanel.classList.remove('shown', 'active');
    mobileMenuTrigger.setAttribute('aria-expanded', 'false');
  }

  mobileMenuTrigger.addEventListener('click', collapseMobileMenu);

  /* Desktop Header Collapsible Elements */

  const pageWrapper = document.getElementById('pageWrapper');
  const desktopSearchFormArea = document.getElementById('collapsibleSearchFormDesktopArea');
  const desktopSearchTrigger = document.getElementById('searchFormDesktopTrigger');
  const desktopSearchForm = document.getElementById('searchFormDesktop');
  const desktopCollapsibleMenuArea = document.getElementById('collapsibleMenuDesktopArea');
  const desktopMenuTrigger = document.getElementById('collapsibleMenuDesktopTrigger');
  const desktopMenuPanel = document.getElementById('desktopMenuPanel');

  function desktopHeaderCollapsibleElementTrigger(collapsibleArea, trigger, element) {
    if (!element.classList.contains('active')) {
      unCollapseElement(collapsibleArea, trigger, element);
    } else {
      collapseElement(trigger, element);
    }
  }

  function unCollapseElement(collapsibleArea, trigger, element) {
    element.classList.add('active');
    setTimeout(() => {
      element.classList.add('shown');
    }, 150);
    trigger.setAttribute('aria-expanded', 'true');

    pageWrapper.addEventListener('click', function(event) {
      if (!collapsibleArea.contains(event.target)) {
        collapseElement(trigger, element);
        pageWrapper.removeEventListener('click', function() {});
      }
    });
  }

  function collapseElement(trigger, element) {
    element.classList.remove('shown');
    setTimeout(() => {
      element.classList.remove('active');
    }, 150);
    trigger.setAttribute('aria-expanded', 'false');
  }

  desktopSearchTrigger.addEventListener('click', function (event) {
    event.preventDefault();
    collapseElement(desktopMenuTrigger, desktopMenuPanel);
    desktopHeaderCollapsibleElementTrigger(desktopSearchFormArea, desktopSearchTrigger, desktopSearchForm);
  });

  desktopMenuTrigger.addEventListener('click', function (event) {
    event.preventDefault();
    collapseElement(desktopMenuTrigger, desktopSearchForm);
    desktopHeaderCollapsibleElementTrigger(desktopCollapsibleMenuArea, desktopMenuTrigger, desktopMenuPanel);
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
      992: {
        slidesPerView: 4,
        slidesPerGroup: 4,
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
