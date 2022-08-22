import imagesLoaded from "imagesloaded";
import { gsap } from "gsap";
import SplitType from "split-type";

class Loader {
  constructor(images) {
    this.images = images;
    this.loader = document.querySelector(".loader-container");
    this.line = this.loader.querySelector(".line-to-fill");
    this.percent = this.loader.querySelector(".title");

    this.init();
  }

  init() {
    this.loadImages();
  }

  loadImages() {
    if (this.images.length) {
      let imagesIndex = 0;

      this.images.forEach((image, index) => {
        imagesLoaded(image, () => {
          imagesIndex++;
          const percent = Math.round((imagesIndex / this.images.length) * 100);

          if (imagesIndex === this.images.length) {
            this.imagesLoaded();
          } else {
            this.update(percent);
          }
        });
      });
    } else {
      this.imagesLoaded();
    }
  }

  update(percent) {
    this.percent.textContent = percent;
    this.line.style.width = `${percent}%`;
  }

  imagesLoaded() {
    const percentText = this.loader.querySelector(".text--white");
    const percentLine = this.loader.querySelector(".loader-container__line");
    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent("loaderOnFinished"));

          window.isLoaderFinished = true;
        }, 1300);
      },
    });

    setTimeout(() => {
      this.update(100);

      setTimeout(() => {
        percentLine.classList.add("is-out");

        const splitPercent = new SplitType(
          this.loader.querySelector(".title"),
          {
            types: "chars",
          }
        );

        tl.to(this.line, {
          x: "100%",
          ease: "expo.inOut",
          duration: 0.75,
        })
          .to(
            percentText,
            {
              opacity: 0,
              duration: 0.25,
            },
            ">-.35"
          )
          .to(
            splitPercent.chars,
            {
              y: -120,
              duration: 0.75,
              stagger: 0.1,
              ease: "expo.inOut",
            },
            ">-.25"
          )
          .to(
            this.loader,
            {
              y: "-100%",
              duration: 0.85,
              ease: "expo.inOut",
            },
            ">-.5"
          );
        tl.play();
      }, 250);
    }, 750);
  }

  static onLoad(callback) {
    if (window.isLoaderFinished) {
      callback(false);
    }

    document.addEventListener("loaderOnFinished", () => {
      callback(true);
    });
  }
}

export default Loader;
