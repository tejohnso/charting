var webdriverio = require("webdriverio"),
assert = require("assert"),
options = {
  host: "localhost",
  port: 4444,
  desiredCapabilities: {
    browserName: "chrome",
    chromeOptions: {
      binary: "/usr/bin/google-chrome-stable"
    }
  }
},
timeForSeleniumInitialRun = 20000;

describe("integration tests", function() {
  var client;
  this.timeout(timeForSeleniumInitialRun);

  before(()=>{
    client = webdriverio.remote(options);
    return client.init();
  });

  describe("basic functionality", function() {
    it("can read the page title", ()=>{
      return client
      .url("localhost:8080/test/importing-doc.html")
      .getTitle()
      .then((title)=> {
        console.log("Title was: " + title);
        assert.equal(title, "Charting");
      });
    });
  });

  describe("charting", function() {
    it("renders the sample line chart", ()=>{
      var sampleData = require("./sample-data.json"),
      emptyChartDataLength= 2000;

      function sendComponentData(sampleData) {
        document.querySelector("x-chart").setAttribute("config", sampleData);
      }

      function checkChartResult(emptyChartDataLength) {
        var chartData = document.querySelector("x-chart canvas").toDataURL();

        return chartData.length > emptyChartDataLength;
      }

      client.execute(sendComponentData, JSON.stringify(sampleData));

      return client.waitUntil(()=>{
        return client.execute(checkChartResult, emptyChartDataLength)
        .then((chartResult)=>{
          return chartResult.value;
        });
      }, 5000);
    });
  });

  after(()=>{
    return client.end();
  });
});
