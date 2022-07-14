import Highway from "@dogstudio/highway";
import Clock from "../classes/Clock";

class AccueilRenderer extends Highway.Renderer {
  // Hooks/methods
  onEnter() {
    // Clock
    const clockContainer = document.querySelector(".landing__time");

    if (clockContainer) {
      const clock = new Clock(clockContainer);
    }
  }
  onLeave() {}
  onEnterCompleted() {}
  onLeaveCompleted() {}
}

// Don`t forget to export your renderer
export default AccueilRenderer;
