(function() {
const proto = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.appendChild(this.canvas);
      this.setAttribute("type", this.getAttribute("type") || "Line");
      this.setAttribute("eventName", this.getAttribute("eventName") || "data");
      this.setAttribute("emitter", this.getAttribute("emitter") || "bigquery-data-converter");
      this.rechart = rechart.bind(this);

      document.querySelector(this.getAttribute("emitter"))
      .addEventListener(this.getAttribute("eventName"), this.rechart);
    }
  },
  attributeChangedCallback: {
    value: function (name, oldVal, newVal) {
      if (name === "emitter") {
        var oldEl = document.querySelector(oldVal),
        newEl = document.querySelector(newVal);

        if (oldEl) {
          oldEl.removeEventListener(this.getAttribute("eventName"), this.rechart);
        }

        if (newEl) {
          newEl.addEventListener(this.getAttribute("eventName"), this.rechart);
        }
      }
    }
  }
});

document.registerElement("x-chart", {prototype: proto});

function rechart(event) {
  new Chart(this.ctx)[this.getAttribute("type")](event.detail);
}
}())
