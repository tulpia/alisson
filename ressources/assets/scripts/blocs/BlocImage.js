import Bloc from "./Bloc";

class BlocImage extends Bloc {
  createAnimation() {
    const image = this.el.querySelector("img");
    const imageHider = this.el.querySelector(".bloc-image__anim-component");

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
  }
}

export default BlocImage;
