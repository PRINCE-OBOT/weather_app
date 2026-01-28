export default class AppFetch {
  static errorMsg;
  static errorMsgSection;

  constructor(URL) {
    this.URL = URL;
  }

  static setElem(errorMsg, errorMsgSection) {
    this.errorMsg = errorMsg;
    this.errorMsgSection = errorMsgSection;
  }

  async loadJSON(queryParameter) {
    try {
      const res = await fetch(this.URL(queryParameter));

      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 404) {
          this.msg("Data not found");
          this.display();
        }
      }
    } catch (err) {
      this.msg("Error fetching data");
      this.display();
    }
  }

  msg(msg) {
    this.constructor.errorMsg.textContent = msg;
  }

  display() {
    this.constructor.errorMsgSection.classList.remove("hide");
    setTimeout(() => this.hide(), 5000);
  }

  hide() {
    this.constructor.errorMsgSection.classList.add("hide");
  }
}
