import { gsap } from "gsap";

class Bloc {
  constructor(el, scroll) {
    this.el = el;
    this.scroll = scroll;
    this.tl = gsap.timeline({ paused: true });
    this.scrollCall = this.el.getAttribute("data-scroll-call");

    this.createAnimation();
    this.launchAnimationOnScroll();
  }

  createAnimation() {
    console.log("TODO ANIM");
  }

  launchAnimationOnScroll() {
    this.scroll.on("call", (func) => {
      if (func === this.scrollCall) {
        this.tl.play();
      }
    });
  }
}

export default Bloc;
