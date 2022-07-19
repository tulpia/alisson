import Highway from "@dogstudio/highway";
import Loader from "../classes/Loader";
import Main from "../main";
import { gsap } from "gsap";
import SplitType from "split-type";

class AboutRenderer extends Highway.Renderer {
  constructor(properties) {
    super(properties);

    this.tlLanding = gsap.timeline({ paused: true });
    this.scroll;
  }

  onEnter() {
    this.scroll = Main.initLocomotive();

    // Changement de la couleur du body
    if (!document.body.classList.contains("dark")) {
      document.body.classList.add("dark");
    }

    //------------------------
    // ------------ ANIMATIONS
    //------------------------
    // Landing
    const title = new SplitType(".page-about__landing .title", {
      types: "lines",
    });

    this.tlLanding.fromTo(
      title.lines,
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.05,
      }
    );

    // Work experience
    const worksHeader = document.querySelector(".experiences__header");
    const tlWorksIntro = gsap.timeline({ paused: true });

    tlWorksIntro.fromTo(
      worksHeader,
      {
        opacity: 0,
      },
      {
        opacity: 0.15,
        duration: 0.25,
      },
      ">-.35"
    );

    // Works
    const works = [...document.querySelectorAll(".list__experience")];
    const worksTimelines = {};

    works.forEach((work) => {
      const workCall = work.getAttribute("data-scroll-call");
      const texts = [...work.querySelectorAll(".text")];
      const line = work.querySelector(".line");
      const timeline = gsap.timeline({ paused: true });

      if (line) {
        timeline
          .fromTo(
            line,
            {
              width: "0%",
            },
            {
              width: "100%",
              duration: 0.75,
              ease: "expo.inOut",
            }
          )
          .fromTo(
            texts,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.35,
              stagger: 0.025,
            },
            ">-.5"
          );
      } else {
        timeline.fromTo(
          texts,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.25,
            stagger: 0.025,
          }
        );
      }

      worksTimelines[workCall] = timeline;
    });

    this.scroll.on("call", (func) => {
      if (func === "experience") {
        setTimeout(() => {
          tlWorksIntro.play();
        }, 250);
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
export default AboutRenderer;
