import Bloc from "./Bloc";
import SplitType from "split-type";

class BlocTexte extends Bloc {
  createAnimation() {
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
            duration: 0.5,
          }
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
            duration: 0.5,
          },
          ">-.35"
        );
      }

      firstFlag = false;
    });
  }
}

export default BlocTexte;
