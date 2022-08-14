import Highway from "@dogstudio/highway";
import Loader from "../classes/Loader";
import Main from "../main";
import { gsap } from "gsap";

// Blocs
import BlocTexte from "../blocs/BlocTexte";
import BlocImage from "../blocs/BlocImage";
import BlocImageTexte from "../blocs/BlocImageTexte";

class SingleRenderer extends Highway.Renderer {
  constructor(properties) {
    super(properties);

    this.tlLanding = gsap.timeline({ paused: true });
    this.scroll;
  }

  // Hooks/methods
  onEnter() {
    this.scroll = Main.initLocomotive();

    //------------------------
    // ------------ ANIMATIONS
    //------------------------
    const header = document.querySelector(".image-title__image-container");
    const headerImg = header.querySelector("img");

    this.tlLanding
      .fromTo(
        headerImg,
        {
          scale: 1.1,
          rotate: 5,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(
        header,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
        },
        ">-.8"
      );

    //------------------------
    // ------------ ANIMATIONS DES BLOCS
    //------------------------
    const blocs = [...document.querySelectorAll("[data-bloc]")];

    if (blocs && blocs.length) {
      blocs.forEach((bloc) => {
        let blocClass = bloc.getAttribute("data-bloc");

        if (blocClass) {
          blocClass = `Bloc${blocClass}`;

          const correspondingClass = this.instantiateClass(blocClass);
          new correspondingClass(bloc, this.scroll);
        }
      });
    }
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

  instantiateClass(className) {
    const classes = {
      BlocImage,
      BlocImageTexte,
      BlocTexte,
    };

    return classes[className];
  }
}

// Don`t forget to export your renderer
export default SingleRenderer;
