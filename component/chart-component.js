const proto = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      this.canvas = document.createElement("canvas"),
      this.ctx = this.canvas.getContext("2d");
      this.appendChild(this.canvas);
      this.setAttribute("type", this.getAttribute("type") || "Line");
      this.setAttribute("eventName", this.getAttribute("eventName") || "new-data");
      this.setAttribute("emitter", this.getAttribute("emitter") || "bigquery-data-converter");
      document.querySelector(this.getAttribute("emitter"))
      .addEventListener(this.getAttribute("eventName"), rechart.bind(this));
    }
  },
  attributeChangedCallback: {
    value: function (name, oldVal, newVal) {
      if (name === "emitter") {
        document.querySelector(oldVal).removeEventListener(this.getAttribute("eventName"), rechart.bind(this));
        document.querySelector(newVal).addEventListener(this.getAttribute("eventName"), rechart.bind(this));
      }
    }
  }
});

document.registerElement("x-chart", {prototype: proto});

function rechart(event) {
  console.dir(this.ctx);
  new Chart(this.ctx)[this.getAttribute("type")](event.detail);
}
