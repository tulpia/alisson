import Highway from "@dogstudio/highway/src/highway";
import { gsap } from "gsap";

const transitionLayer = document.querySelector(".transition-container");

class DefaultTransition extends Highway.Transition {
  // Built-in methods
  in({ from, to, trigger, done }) {
    from.remove();

    const tlIn = gsap.timeline({
      paused: true,
    });

    tlIn.fromTo(
      transitionLayer,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.75,
        onComplete: () => {
          done();
        },
      }
    );

    tlIn.play();
  }

  out({ from, trigger, done }) {
    const tlOut = gsap.timeline({
      paused: true,
      onComplete: () => {
        // quand le done est appelé, la transition
        done();
      },
    });

    tlOut.fromTo(
      transitionLayer,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.75,
      }
    );

    tlOut.play();
  }
}

// Don`t forget to export your transition
export default DefaultTransition;
