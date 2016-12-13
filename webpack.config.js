var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ["./index"],
  output: {
    path: path.join(__dirname, 'public', 'build'),
    publicPath: "/build/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        exclude: [/node_modules/, /public/]
        // include: sources
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css!autoprefixer")
        // exclude: [/node_modules/, /public/]
        // include: sources
      }, {
        test: /\.gif$/,
        loader: "url?limit=10000&mimetype=image/gif"
      }, {
        test: /\.jpg$/,
        loader: "url?limit=10000&mimetype=image/jpg"
      }, {
        test: /\.png$/,
        loader: "url?limit=10000&mimetype=image/png"
      }, {
        test: /\.svg/,
        loader: "url?limit=26000&mimetype=image/svg+xml"
      }, {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["node_modules"]
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader'],
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // mangle: false,
      sourceMap: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({NODE_ENV: 'false'})
  ]
}
