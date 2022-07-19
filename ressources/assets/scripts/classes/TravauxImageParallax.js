import MathUtils from "../utils/mathutils";

class TravauxImageParallax {
  constructor(workContainer, images, links) {
    this.workContainer = workContainer;
    this.links = links;
    this.images = images;
    this.x = window.innerWidth * 0.85 - this.workContainer.clientWidth;
    this.y = window.innerHeight * 0.95 - this.workContainer.clientHeight;
    this.lastX = 0;
    this.lastY = 0;
    this.lastActiveImage;

    this.handleMouseMove();
    this.handleOnHoverLinks();
    this.render();
  }

  handleMouseMove() {
    document.addEventListener("mousemove", (e) => {
      this.x =
        window.innerWidth * 0.85 -
        this.workContainer.clientWidth +
        (e.clientX / window.innerWidth) * 100;
      this.y =
        window.innerHeight * 0.95 -
        this.workContainer.clientHeight +
        (e.clientY / window.innerHeight) * 100 * -1;
    });
  }

  handleOnHoverLinks() {
    this.links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        const image = this.getImageForLink(link);

        if (image) {
          this.lastActiveImage = image;

          if (!image.classList.contains("is-active")) {
            image.classList.add("is-active");
          }
        }
      });

      link.addEventListener("mouseleave", () => {
        if (this.lastActiveImage) {
          this.lastActiveImage.classList.remove("is-active");

          this.lastActiveImage = null;
        }
      });
    });
  }

  getImageForLink(link) {
    let rightImage = null;

    this.images.forEach((image) => {
      if (
        parseInt(image.getAttribute("data-index"), 10) ===
        parseInt(link.getAttribute("data-index"), 10)
      ) {
        return (rightImage = image);
      }
    });

    return rightImage;
  }

  render() {
    this.lastX = MathUtils.lerp(this.lastX, this.x, 0.05);
    this.lastY = MathUtils.lerp(this.lastY, this.y, 0.05);

    this.workContainer.style.transform = `translate3d(${this.lastX}px, ${this.lastY}px, 0)`;

    requestAnimationFrame(() => this.render());
  }
}

export default TravauxImageParallax;
