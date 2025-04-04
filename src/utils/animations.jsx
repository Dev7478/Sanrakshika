import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Fade in animation
export const fadeIn = (element, duration = 0.5, delay = 0) => {
  return gsap.from(element, {
    opacity: 0,
    duration,
    delay,
    ease: 'power2.out'
  });
};

// Slide in from left
export const slideInLeft = (element, duration = 0.5, delay = 0) => {
  return gsap.from(element, {
    x: -100,
    opacity: 0,
    duration,
    delay,
    ease: 'power2.out'
  });
};

// Slide in from right
export const slideInRight = (element, duration = 0.5, delay = 0) => {
  return gsap.from(element, {
    x: 100,
    opacity: 0,
    duration,
    delay,
    ease: 'power2.out'
  });
};

// Slide in from bottom
export const slideInUp = (element, duration = 0.5, delay = 0) => {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration,
    delay,
    ease: 'power2.out'
  });
};

// Scale in
export const scaleIn = (element, duration = 0.5, delay = 0) => {
  return gsap.from(element, {
    scale: 0,
    opacity: 0,
    duration,
    delay,
    ease: 'back.out(1.7)'
  });
};

// Stagger children animation
export const staggerChildren = (parent, childSelector, animation, stagger = 0.1) => {
  return gsap.from(parent.querySelectorAll(childSelector), {
    ...animation,
    stagger,
    ease: 'power2.out'
  });
};

// Scroll trigger animation
export const scrollTrigger = (element, animation, trigger = element) => {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
};

// Parallax effect
export const parallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    y: `${speed * 100}%`,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

// Text reveal animation
export const textReveal = (element, duration = 0.5, delay = 0) => {
  const text = element.textContent;
  element.textContent = '';
  
  const chars = text.split('').map(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    element.appendChild(span);
    return span;
  });
  
  return gsap.from(chars, {
    opacity: 0,
    y: 20,
    duration,
    delay,
    stagger: 0.02,
    ease: 'power2.out'
  });
};

// Counter animation
export const counterAnimation = (element, endValue, duration = 1, delay = 0) => {
  return gsap.to(element, {
    innerHTML: endValue,
    duration,
    delay,
    snap: { innerHTML: 1 },
    ease: 'power1.out'
  });
};

// Progress bar animation
export const progressBar = (element, value, duration = 1, delay = 0) => {
  return gsap.to(element, {
    width: `${value}%`,
    duration,
    delay,
    ease: 'power1.out'
  });
};

// Clean up animations
export const cleanup = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf('*');
}; 