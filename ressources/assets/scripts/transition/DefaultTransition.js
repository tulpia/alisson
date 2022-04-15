import Highway from '@dogstudio/highway';

class DefaultTransition extends Highway.Transition {
  // Built-in methods
  in({ from, to, trigger, done }) {
    // [...]
    from.remove();
    done();
  }

  out({ from, trigger, done }) {
    // [...]
    from.remove();
    done();
  }
}

// Don`t forget to export your transition
export default DefaultTransition;