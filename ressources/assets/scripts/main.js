// Dependencies
import Highway from "@dogstudio/highway";
import LocomotiveScroll from "locomotive-scroll";
import Menu from "./classes/Menu";

// Renderers
import AccueilRenderer from "./renderers/AccueilRenderer";
import AboutRenderer from "./renderers/AboutRenderer";
import ContactRenderer from "./renderers/ContactRenderer";
import WorksRenderer from "./renderers/WorksRenderer";
import SingleRenderer from "./renderers/SingleRenderer";

// Transitions
import DefaultTransition from "./transitions/DefaultTransition";
import Breakpoints from "./utils/breakpoints";
import Loader from "./classes/Loader";

class Main {
  constructor() {
    this.menu;
    this.highway;
    this.loader;

    this.initLoader();
    this.initHighway();
    this.initMenu();
  }

  initLoader() {
    this.loader = new Loader([...document.querySelectorAll("img")]);
  }

  initHighway() {
    this.highway = new Highway.Core({
      renderers: {
        home: AccueilRenderer,
        about: AboutRenderer,
        contact: ContactRenderer,
        works: WorksRenderer,
        single: SingleRenderer,
      },
      transitions: {
        default: DefaultTransition,
      },
    });
  }

  static initLocomotive() {
    let scroll;

    if (Breakpoints.isTabletOrBigger()) {
      scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        inertia: 0.5,
      });
    } else {
      scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: false,
      });
    }

    return scroll;
  }

  initMenu() {
    this.menu = new Menu();
  }
}

new Main();

export default Main;
