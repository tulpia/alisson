// Dependencies
import Highway from "@dogstudio/highway";
import LocomotiveScroll from 'locomotive-scroll';

// Renderers
import AccueilRenderer from "./renderers/AccueilRenderer";
import AboutRenderer from "./renderers/AboutRenderer";
import ContactRenderer from "./renderers/ContactRenderer";
import WorksRenderer from "./renderers/WorksRenderer";

// Transitions
import DefaultTransition from "./transitions/DefaultTransition";

// eslint-disable-line
const H = new Highway.Core({
    renderers: {
        home: AccueilRenderer,
        about: AboutRenderer,
        contact: ContactRenderer,
        works: WorksRenderer

    },
    transitions: {
        default: DefaultTransition
    }
});

let scroll;

document.addEventListener("DOMContentLoaded", function() {
    scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        inertia: 0.5
    });
});

H.on("NAVIGATE_OUT", () => {
    scroll.scrollTo(".page");
});
  
H.on("NAVIGATE_END", () => {
    scroll.update();
});