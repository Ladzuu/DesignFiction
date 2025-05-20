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