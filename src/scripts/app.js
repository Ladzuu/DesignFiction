"use strict";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ------- CUSTOM CURSOR -------

const cursor = document.querySelector('.custom--cursor');      // Cursor
const outline = document.querySelector('.cursor--outline');    // Border Follow

let mouseX = 0, mouseY = 0;             // Coord Cursor
let outlineX = 0, outlineY = 0;         // Coord Border

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Cursor Mouvements
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
});

// Easing function
function animate() {
  // Ease (10%)
  outlineX += (mouseX - outlineX) * 0.1;
  outlineY += (mouseY - outlineY) * 0.1;

  // Apply new coords
  outline.style.left = `${outlineX}px`;
  outline.style.top = `${outlineY}px`;

  // New Frame request
  requestAnimationFrame(animate);
}

// Start Anim
animate();

// ------- NAVIGATION -------

const menu = document.querySelector(".nav__mb");
const menuButton = document.querySelector(".menu--btn");

menuButton.addEventListener("click", function () {
    const menuLinks = document.querySelectorAll(".nav__list .nav__link");

    menuButton.classList.toggle("open");

    if (menu.classList.contains("open")) {
        gsap.to(menuLinks, {
            opacity: 0,
            duration: 0.1,
            stagger: { each: 0.1, from: "end" },
            onComplete: function () {
                gsap.to(menu, {
                    y: "-100%",
                    duration: 0.1,
                    ease: "power3.out",
                });
                menu.classList.remove("open");
            },
        });
    } else {
        gsap.fromTo(
            menu,
            { y: "-100%" },
            {
                y: "0%",
                duration: 0.2,
                ease: "power4.out",
                onComplete: function () {
                    gsap.to(
                        menuLinks,
                        {
                            opacity: 1,
                            duration: 0.2,
                            stagger: 0.2,
                            ease: "power2.out",
                        }
                    );
                },
            }
        );

        menu.classList.add("open");
    }
});

// ------- HOME PAGE -------

// Compass Header Animation


// Chapter Animation

window.addEventListener('DOMContentLoaded', function () {

  const fixedChapter = document.querySelector('.fixed--chapter');
  const jpBlock = fixedChapter.querySelector('.japanese--content');
  const jpText = jpBlock.querySelector('.text');
  const frBlock = fixedChapter.querySelector('.text--chapter');

  function animateText(newJP, newFR) {
    // Sortie animée puis mise à jour + entrée
    gsap.to(jpBlock, {
      x: -80,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        jpText.textContent = newJP;
        gsap.fromTo(jpBlock, 
            { 
                x: -80,
                opacity: 0
            },
            { 
                x: 0,
                opacity: 1,
                duration: 0.5
            });
      }
    });

    gsap.to(frBlock, {
      x: 80,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        frBlock.textContent = newFR;
        gsap.fromTo(frBlock, 
            { 
                x: 80,
                opacity: 0
            }, 
            { 
                x: 0,
                opacity: 1,
                duration: 0.5
            });
      }
    });
  }

  // ScrollTrigger sur chaque h2
  const headings = document.querySelectorAll('.section--chapter .title--section');
  headings.forEach(h2 => {
    const section = h2.closest('.section--chapter');
    const jp = section.querySelector('.japanese--content .text')?.textContent;
    const fr = section.querySelector('.text--chapter')?.textContent;

    if (jp && fr) {
      ScrollTrigger.create({
        trigger: h2,
        start: "top center",
        onEnter: () => animateText(jp, fr),
        onEnterBack: () => animateText(jp, fr)
      });
    }
  });

  // ScrollTrigger pour le header
  const header = document.querySelector('#chapter0');
  const headerJP = header.querySelector('.japanese--content .text')?.textContent;
  const headerFR = header.querySelector('.text--chapter')?.textContent;

  if (headerJP && headerFR) {
    ScrollTrigger.create({
      trigger: '.trigger--header',
      start: "top center",
      onEnter: () => animateText(headerJP, headerFR),
      onEnterBack: () => animateText(headerJP, headerFR)
    });
  }
});

