'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navbar = document.querySelector('.nav');
const openModal = function (e) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(move => move.addEventListener('click', openModal));
/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); */

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////// SELECTING, CREATING, AND DELETING ELEMENTS //////////

//     Selecting Elements     //
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const head = document.querySelector('.header');
const allSelector = document.querySelectorAll('.section');
console.log(allSelector);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//     Creating and Inserting Elements     //
const cookieMsg = document.createElement('div');
cookieMsg.classList.toggle('cookie-message');
// cookieMsg.textContent = 'We want your cookie';
cookieMsg.innerHTML =
  'We want your cookie, Accept cookies <button class="btn btn--close-cookie">click here</button>';
head.prepend(cookieMsg);
// head.append(cookieMsg);
// head.append(cookieMsg.cloneNode(true));
// head.before(cookieMsg);
// head.after(cookieMsg);

//     Deleting Elements     //

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => cookieMsg.remove());

//////////     STLYES,ATTRIBUTE,AND CLASSES     //////////

//     Style     //
cookieMsg.style.backgroundColor = '#37383d';
cookieMsg.style.width = '120%';
console.log(getComputedStyle(cookieMsg).color);
console.log(getComputedStyle(cookieMsg).height);
cookieMsg.style.height =
  Number.parseFloat(getComputedStyle(cookieMsg).height) + 25 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'skyblue');

//     Attributes     //
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
logo.alt = 'I am Ndzalo NK';

// data attributes

console.log(logo.dataset.versionNumber);

//classes

//////////     SMOOTH SCROLLING  BTN   //////////

const scrollBTN = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

scrollBTN.addEventListener('click', e => {
  const section1Coords = section1.getBoundingClientRect();
  console.log(section1Coords);
  console.log(e.target.getBoundingClientRect());

  //   scrolling   //
  // window.scrollTo(
  //   /* current position plus current scroll */
  //   section1Coords.left + window.pageXOffset,
  //   section1Coords.top + window.pageYOffset
  // );

  /* window.scrollTo({
    left: section1Coords.left + window.scrollX,
    top: section1Coords.top + window.scrollY,
    behavior: 'smooth',
  }); */

  ///    MORDEN WAY    ///
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////     Page Navigation     //////////
/* document.querySelectorAll('.nav__link').forEach(el =>
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    console.log('Links', id);
  })
);
 */

//  Event Delgation  //
//1. add event listener to common parent element
//2. determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////     TYPES OF EVENTS AND EVENT HANDLERS     /////////
const alertH1 = e => {
  alert('Keep reading the heading');
  h1.removeEventListener('mouseenter', alertH1);
};

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);

// h1.onmouseenter = e => alert('Keep reading the heading');

//////////     BUBBLING AND CAPTURING     //////////
// rgb(255,255,255)
const randomINT = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomINT(0, 255)},${randomINT(0, 255)},${randomINT(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
  console.log('Link');
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColor();
});

//////////     DOM TRAVESING  (walking throug the DOM)   //////////

//     GOING DOWNWARDS: CHILD     //
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'Blue';

//     GOING UPWARDS: PARENTS     //
console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest('.header').style.backgroundColor = 'pink';

//   selecting siblings   //
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    // el.style.transform = 'scale(0.9)';
  }
});

//////////     TABBED COMPONENT     //////////

/* const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operation__content');
 */

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate clicked tab
  clicked.classList.add('operations__tab--active');

  // Activate corresponding content
  const content = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  // console.log('Activating content:', content);
  content.classList.add('operations__content--active');
});

//////////     PASSING ARGUMENTS TO EVENT HANDLERS     //////////

//Manu fade animation
const linkAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passinge "arguments" into a handler
navbar.addEventListener('mouseover', linkAnimation.bind(0.5));
navbar.addEventListener('mouseout', linkAnimation.bind(1));

//////////     STICKY NAVBAR     //////////

/* const section1Coords = section1.getBoundingClientRect();
console.log(window.scrollY);
//avoid scroll event
window.addEventListener('scroll', function (e) {
  if (window.pageYOffset > section1Coords.top) {
    navbar.classList.add('sticky');
  } else navbar.classList.remove('sticky');
}); */

////     A MODERN WAY OF DOING A STICKY NAVBAR (The intersection Observer API)   ////

/* const observerCallBack = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const observerOptions = {
  root: null,
  threshold: [0, 0.2],
};
const Observer = new IntersectionObserver(observerCallBack, observerOptions);
Observer.observe(section1); */
const navHight = navbar.getBoundingClientRect().height;
const observingCallback = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
};
const observingOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHight}px`,
};
const observer = new IntersectionObserver(observingCallback, observingOptions);
observer.observe(head);

/////////     REVEALING ELEMENTS ON SCROLL      //////////
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const sectionCallBack = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; /* guard clause */
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
    } else {
      entry.target.classList.add('section--hidden');
    }
  });
};
const sectionOption = {
  root: null,
  threshold: 0.15,
};
const revealSections = new IntersectionObserver(sectionCallBack, sectionOption);
allSelector.forEach(section => revealSections.observe(section));

//////////     LAZY LOADING IMAGES     //////////
const allImg = document.querySelectorAll('img[data-src]');
const lazyLoadCallBack = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  lazyLoad.unobserve(entry.target);
};
const lazyLoadOptions = {
  root: null,
  threshold: 0.9,
  // rootMargin: '-200px',
};
const lazyLoad = new IntersectionObserver(lazyLoadCallBack, lazyLoadOptions);
allImg.forEach(picture => lazyLoad.observe(picture));

//////////     BUILDING A SLIDER COMPONENT     //////////
const slidingEffect = function () {
  // Slider
  let currentSlide = 0;
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const maxSlide = slides.length;
  // slider.style.transform = 'scale(0.7)';
  // slider.style.overflow = 'visible';
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // 0%, 100%, 200%, 300%

  // Helper function: go to specific slide
  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    /* currentSlide = 1, -100%, 0%, 100%, 200% */
  };

  //activate dots
  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //next slide
  const nextSlide = () => {
    if (currentSlide === maxSlide - 1) currentSlide = 0; //back to start
    else currentSlide++;
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  //previous slide
  const prevSlide = () => {
    if (currentSlide === 0) currentSlide = maxSlide - 1; //last slide
    else currentSlide--;
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  //next slide
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  //////     PART 2     /////

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  createDots();
  activateDots(0); // activate first dot initially

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      currentSlide = Number(slide);
      goToSlide(currentSlide);
      activateDots(currentSlide);
    }
  });
};
slidingEffect();

/////////     LIFECYCLE DOM EVENTS     //////////

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully load', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});

//////////     EFFICIENT SCRIPT LOADING: defer and async     //////////
