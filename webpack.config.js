const path = require("path");

module.exports = {
  entry: [
    "./js/ajax.js",
    "./js/utils.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/map.js",
    "./js/filter.js",
    "./js/form.js",
    "./js/main-pin-moving.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
