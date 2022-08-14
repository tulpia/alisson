import Bloc from "./Bloc";
import SplitType from "split-type";

class BlocImageTexte extends Bloc {
  createAnimation() {
    const image = this.el.querySelector(
      ".bloc-image-texte__image-container img"
    );
    const imageHider = this.el.querySelector(
      ".bloc-image-texte__anim-component"
    );

    this.tl
      .to(imageHider, {
        y: "0%",
        duration: 0.6,
        ease: "circ.inOut",
      })
      .set(
        image,
        {
          opacity: 1,
        },
        ">"
      )
      .to(imageHider, {
        y: "-100%",
        duration: 0.6,
        ease: "circ.inOut",
      });

    let firstFlag = true;

    [...this.el.querySelectorAll(".text > *:not(ul)")].forEach((text) => {
      const splitText = new SplitType(text, {
        types: "lines",
      });

      if (firstFlag) {
        this.tl.fromTo(
          splitText.lines,
          {
            opacity: 0,
            y: 5,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            duration: 0.35,
          },
          ">-.5"
        );
      } else {
        this.tl.fromTo(
          splitText.lines,
          {
            opacity: 0,
            y: 5,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.025,
            duration: 0.35,
          },
          ">-.2"
        );
      }

      firstFlag = false;
    });
  }
}

export default BlocImageTexte;
