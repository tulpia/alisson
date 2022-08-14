import Highway from "@dogstudio/highway";
import Clock from "../classes/Clock";
import Loader from "../classes/Loader";
import Main from "../main";
import { gsap } from "gsap";
import SplitType from "split-type";
import Breakpoints from "../utils/breakpoints";

class AccueilRenderer extends Highway.Renderer {
  constructor(properties) {
    super(properties);

    this.tlLanding = gsap.timeline({ paused: true });
    this.scroll;
  }

  // Hooks/methods
  onEnter() {
    // Clock
    const clockContainer = document.querySelector(".landing__time");

    if (clockContainer) {
      const clock = new Clock(clockContainer);
    }

    // Scroll
    this.scroll = Main.initLocomotive();

    //------------------------
    // ------------ ANIMATIONS
    //------------------------

    // Anims landing
    const title = new SplitType(".page-accueil__landing .title", {
      types: "lines",
    });

    this.tlLanding
      .fromTo(
        title.lines,
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.075,
        }
      )
      .fromTo(
        clockContainer,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.25,
        },
        ">-.5"
      );

    if (Breakpoints.isTabletOrBigger()) {
      const linksHeader = [...document.querySelectorAll("#menu a")];

      this.tlLanding.fromTo(
        linksHeader,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.09,
        },
        ">-.15"
      );
    }

    // Anims introduction
    const tlIntro = gsap.timeline({ paused: true });
    const introText = new SplitType(".page-accueil__intro .text p", {
      types: "lines",
    });

    tlIntro.fromTo(
      introText.lines,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
      }
    );

    // Anims travaux
    const works = [...document.querySelectorAll(".works__work")];
    const worksTimelines = {};

    works.forEach((work) => {
      const scrollCall = work.getAttribute("data-scroll-call");
      const timeline = gsap.timeline({ paused: true });
      const title = new SplitType(work.querySelector(".title"), {
        types: "chars",
      });
      const imageCover = work.querySelector(".image-cover-anim");

      timeline
        .fromTo(
          imageCover,
          {
            y: "0%",
          },
          {
            y: "100%",
            duration: 0.75,
            ease: "expo.inOut",
          }
        )
        .fromTo(
          title.chars,
          {
            opacity: 0,
            x: 5,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            stagger: 0.055,
          },
          ">-.5"
        );

      worksTimelines[scrollCall] = timeline;
    });

    // Lancement des animations au scroll
    this.scroll.on("call", (func) => {
      if (func === "introduction") {
        tlIntro.play();
      }

      if (worksTimelines[func]) {
        setTimeout(() => {
          worksTimelines[func].play();
        }, 250);
      }
    });
  }

  onLeave() {
    this.scroll.destroy();
  }

  onEnterCompleted() {
    this.scroll.update();

    Loader.onLoad(() => {
      this.tlLanding.play();
    });
  }

  onLeaveCompleted() {}
}

// Don`t forget to export your renderer
export default AccueilRenderer;
