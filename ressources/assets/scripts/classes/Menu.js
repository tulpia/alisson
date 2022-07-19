import { gsap } from "gsap";
import Breakpoints from "../utils/breakpoints";

class Menu {
  constructor() {
    this.tl;
    this.isOpen = false;
    this.isOpening = false;
    this.btnMenu = document.querySelector("#btn-menu");
    this.menu = document.querySelector("#menu");
    this.openMenuContainer = this.btnMenu.querySelector(".btn-open-menu");
    this.closeMenuContainer = this.btnMenu.querySelector(".btn-close-menu");
    this.links = [...this.menu.querySelectorAll("a")];

    this.activateLinksOnClicks();

    if (!Breakpoints.isTabletOrBigger()) {
      this.createTimeline();
      this.eventsMobile();
    }
  }

  activateLinksOnClicks() {
    this.links.forEach((link) => {
      link.addEventListener("click", () => {
        this.links.forEach((linkUnclicked) => {
          if (linkUnclicked.classList.contains("is-active")) {
            linkUnclicked.classList.remove("is-active");
          }
        });

        link.classList.add("is-active");
      });
    });
  }

  eventsMobile() {
    this.btnMenu.addEventListener("click", () => {
      if (!this.isOpening) {
        if (this.isOpen) {
          this.closeMenu();
        } else {
          this.openMenu();
        }
      }
    });

    this.links.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu();
      });
    });
  }

  createTimeline() {
    this.tl = gsap.timeline({
      onStart: () => {
        setTimeout(() => {
          this.closeMenuContainer.classList.add("is-active");
        }, 750);
      },
      onComplete: () => {
        this.isOpen = true;

        this.menu.classList.add("is-active");
      },
      onReverseComplete: () => {
        this.isOpen = false;

        this.closeMenuContainer.classList.remove("is-active");
      },
      paused: true,
    });

    this.tl
      .fromTo(
        this.menu.querySelector(".mobile-menu-background"),
        {
          x: "100%",
        },
        {
          x: "0%",
          duration: 1,
          ease: "expo.inOut",
        }
      )
      .fromTo(
        this.menu.querySelector(".mobile-menu-background-2"),
        {
          x: "100%",
        },
        {
          x: "0%",
          duration: 1,
          ease: "expo.inOut",
        },
        ">-0.85"
      )
      .fromTo(
        this.links,
        {
          x: 15,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.45,
        },
        ">-0.45"
      );
  }

  openMenu() {
    console.log("open");

    this.tl.play();
  }

  closeMenu() {
    this.menu.classList.remove("is-active");

    setTimeout(() => {
      this.closeMenuContainer.classList.remove("is-active");
    }, 150);

    this.tl.reverse();
  }
}

export default Menu;
