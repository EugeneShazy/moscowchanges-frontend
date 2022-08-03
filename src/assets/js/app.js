import Swiper, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
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

  /* Init Swiper */
  const swiper = new Swiper('.swiper-hero', {
    // configure Swiper to use modules
    modules: [Pagination],
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
