import Highway from "@dogstudio/highway";
import Loader from "../classes/Loader";
import Main from "../main";
import { gsap } from "gsap";
import SplitType from "split-type";

class ContactRenderer extends Highway.Renderer {
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
    const title = new SplitType(".page-contact .title", { types: "lines" });
    const text = document.querySelector(".page-contact__content .introduction");
    const mail = document.querySelector(".page-contact__content .mail");

    this.tlLanding
      .fromTo(
        title.lines,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.085,
        }
      )
      .fromTo(
        text,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.35,
        },
        ">-.35"
      )
      .fromTo(
        mail,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.35,
        },
        ">-.15"
      );
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
export default ContactRenderer;
