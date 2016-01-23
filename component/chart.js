const chartElement = Object.create(HTMLElement.prototype, {
  createdCallback: {
    value: function() {
      this.canvas = document.createElement("canvas"),
      this.ctx = this.canvas.getContext("2d");
      this.appendChild(this.canvas);
    }
  },
  attributeChangedCallback: {
    value: function (name, oldVal, newVal) {
      if (name !== "config") {return;}

      var config = JSON.parse(newVal);
      this.setAttribute("type", config.type || this.getAttribute("type"));
      this.setAttribute("data", JSON.stringify(config.data) || this.getAttribute("data"));
      new Chart(this.ctx)[this.getAttribute("type")](JSON.parse(this.getAttribute("data")));
    }
  }
});

document.registerElement("x-chart", {prototype: chartElement});
