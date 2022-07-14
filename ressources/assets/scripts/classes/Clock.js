class Clock {
  constructor(el) {
    this.el = el;

    this.render();
  }

  getTime() {
    const date = new Date();

    let day = this.padTime(date.getDay());
    let month = this.padTime(date.getMonth());
    let year = date.getFullYear();
    let hours = this.padTime(date.getHours());
    let minutes = this.padTime(date.getMinutes());
    let seconds = this.padTime(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  padTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  render() {
    this.el.textContent = this.getTime();

    requestAnimationFrame(() => this.render());
  }
}

export default Clock;
