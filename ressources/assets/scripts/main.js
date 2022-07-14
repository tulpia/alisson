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

let scroll;
let menu;

// eslint-disable-line
const H = new Highway.Core({
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

  menu = new Menu();
}

H.on("NAVIGATE_OUT", () => {
  scroll.scrollTo("[data-router-view]");
});

H.on("NAVIGATE_END", () => {
  scroll.update();
});
