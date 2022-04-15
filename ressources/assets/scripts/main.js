// Dependencies
import Highway from "@dogstudio/highway";

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