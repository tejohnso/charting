## Charting

Charting with chart.js as a web component

#### Usage
Attribute | Description | Default
:---: | :---: | :---:
emitter | A selector for an element that will emit a new data event | bigquery-data-converter
eventName | The name of the emitted event | data

Import the component with the required attributes

See `test/` for reference implementation.

#### Testing
```
npm install -g http-server
npm install -g selenium-standalone
npm install
npm run setup-test-env
npm test
npm run teardown-test-env
```
