class Breakpoints {
  static breakpoints = {
    mobile: 499,
    tablet_sm: 800,
    tablet: 1024,
    desktop_sm: 1280,
    desktop: 1600,
  };

  static isMobileOrBigger() {
    if (window.innerWidth > this.breakpoints.mobile) return true;

    return false;
  }

  static isTabletSmallOrBigger() {
    if (window.innerWidth > this.breakpoints.tablet_sm) return true;

    return false;
  }

  static isTabletOrBigger() {
    if (window.innerWidth > this.breakpoints.tablet) return true;

    return false;
  }

  static isDesktopSmallOrBigger() {
    if (window.innerWidth > this.breakpoints.desktop_sm) return true;

    return false;
  }

  static isDesktopOrBigger() {
    if (window.innerWidth > this.breakpoints.desktop) return true;

    return false;
  }
}

export default Breakpoints;
