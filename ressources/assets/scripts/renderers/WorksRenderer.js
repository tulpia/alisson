import Highway from "@dogstudio/highway";
import Loader from "../classes/Loader";
import Main from "../main";
import { gsap } from "gsap";
import TravauxImageParallax from "../classes/TravauxImageParallax";

class WorksRenderer extends Highway.Renderer {
  constructor(properties) {
    super(properties);

    this.tlLanding = gsap.timeline({ paused: true });
    this.scroll;
  }

  onEnter() {
    this.scroll = Main.initLocomotive();

    //------------------------
    // ------------ ANIMATIONS
    //------------------------

    // Anims landing
    const works = [...document.querySelectorAll(".works-listing__work")];
    const workTitle = document.querySelector(
      ".page-works__side-title .title span"
    );

    this.tlLanding
      .fromTo(
        works,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.075,
        }
      )
      .fromTo(
        workTitle,
        {
          x: 15,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
        },
        ">-.5"
      );
  }

  onLeave() {
    this.scroll.destroy();
  }

  onEnterCompleted() {
    this.scroll.update();

    // Init du hover des travaux
    const works = [...document.querySelectorAll(".works-listing__work")];
    const imageContainer = document.querySelector(
      ".page-works__images-container"
    );
    const images = [...imageContainer.querySelectorAll("img")];

    new TravauxImageParallax(imageContainer, images, works);

    Loader.onLoad(() => {
      setTimeout(() => {
        this.tlLanding.play();
      }, 150);
    });
  }

  onLeaveCompleted() {}
}

// Don`t forget to export your renderer
export default WorksRenderer;
