var path = require('path');

module.exports = {
  entry: {
    App: "./app/assets/scripts/App.js",
    Vendor: "./app/assets/scripts/Vendor.js"
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"), //bundle our js
    filename: "[name].js"
  },
  module: { //convert our js files from es6 to regular js.
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/, //only want babel plugin to be applied to js files
        exclude: /node-modules/
      }
    ]
  }
}
