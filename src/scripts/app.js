"use strict";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ------- CUSTOM CURSOR -------

const cursor = document.querySelector('.custom--cursor');      // Cursor
const outline = document.querySelector('.cursor--outline');    // Border Follow

let mouseX = 0, mouseY = 0;       // Coord Cursor
let outlineX = 0, outlineY = 0;   // Coord Border

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
            duration: 0.2,
            stagger: { each: 0.2, from: "end" },
            onComplete: function () {
                gsap.to(menu, {
                    y: "-100%",
                    duration: 0.2,
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
                duration: 0.5,
                ease: "power4.out",
                onComplete: function () {
                    gsap.to(
                        menuLinks,
                        {
                            opacity: 1,
                            duration: 0.4,
                            stagger: 0.2,
                            ease: "power2.out",
                        }
                    );
                },
            }
        );

        menu.classList.add("open");

        // Close menu when clicking on a link
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                gsap.to(menuLinks, {
                    opacity: 0,
                    duration: 0.1,
                    stagger: { each: 0.1, from: "end" },
                    onComplete: function () {
                        gsap.to(menu, {
                            y: "-100%",
                            duration: 0.2,
                            ease: "power3.out",
                        });
                        menu.classList.remove("open");
                        menuButton.classList.remove("open");
                    },
                });
            });
        });
    }
});

// ------- HOME PAGE -------

// Anim Content Header
const headerTitle = document.querySelector('.section--header__content .title--big');

gsap.fromTo(headerTitle,
  {
    y: -80,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      const subtitles = document.querySelector('.section--header__content .text--big');
      gsap.fromTo(subtitles, 
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }
);

// --- Anim Compass Header ---

const compass = document.querySelector('.compass--h1');

gsap.fromTo (compass, 
  {
    rotate: -20,
  },
  {
    rotate: 20,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  }
);

// --- Anim Chapters Tablet/Desktop ---
const fixedJapanese = document.getElementById('fixed-japanese'); // Fixed Japanese Content
const fixedChapter = document.getElementById('fixed-chapter'); // Fixed Chapter Content
const sections = Array.from(document.querySelectorAll('.section--chapter')); // All sections with chapters

// Get all sections with chapters and their content
const chaptersData = sections.map(section => {
    const jap = section.querySelector('.japanese--content')?.innerHTML || ''; 
    const chap = section.querySelector('.text--chapter')?.innerHTML || '';
    return { jap, chap, section };
});

// Currently visible section
function getCurrentSection() {
    const scrollY = window.scrollY || window.pageYOffset;
    // Previous section scroll
    let current = chaptersData[0];
    for (const data of chaptersData) {
        const rect = data.section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollY + 120 >= top) current = data;
    }
    return current;
}

let lastJap = '';
let lastChap = '';

function updateFixedContent() {
    if (window.innerWidth >= 768) {
        const { jap, chap } = getCurrentSection();

        // If content changes, anim transition
        if (jap !== lastJap || chap !== lastChap) {
            // Anim out
            gsap.to(fixedJapanese, {
              x: -100,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in"
            });
            gsap.to(fixedChapter, {
              x: 100, opacity:
              0, duration: 0.3,
              ease: "power2.in",
              onComplete: () => {
                // Update content
                fixedJapanese.innerHTML = jap;
                fixedChapter.innerHTML = chap;

                // Out of screnn to entry
                gsap.set(fixedJapanese, { x: -100 });
                gsap.set(fixedChapter, { x: 100 });

                // Anim entry
                gsap.to(fixedJapanese, {
                  x: 0,
                  opacity: 1,
                  duration: 0.4,
                  ease: "power2.out"
                });
                gsap.to(fixedChapter, {
                  x: 0,
                  opacity: 1,
                  duration: 0.4,
                  ease: "power2.out"
                });
            }});
            lastJap = jap;
            lastChap = chap;
        }
    } else {
        fixedJapanese.innerHTML = '';
        fixedChapter.innerHTML = '';
        lastJap = '';
        lastChap = '';
    }
}

// Update content on scroll and resize
window.addEventListener('scroll', updateFixedContent);
window.addEventListener('resize', updateFixedContent);
// Initialize when loading page
updateFixedContent();

// --- Anim Chapter Content ---

const animatedElements = gsap.utils.toArray([
  '.section--chapter__frame',
  '.section--chapter__content',
  'figure'
]);

animatedElements.forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: -60,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      end: '80% top',
      toggleActions: 'play reverse play reverse',
    }
  });
});

