var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ["./src/index"],
  output: {
    path: path.join(__dirname, 'public', 'build'),
    publicPath: "/build/",
    filename: "bundle.js"
  },
  devtool: 'eval', // 'source-map'
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "react-hot!babel", exclude: [/node_modules/, /public/] },
      { test: /\.css$/,  loader: "style!css!autoprefixer" },
      { test: /\.gif$/,  loader: "url?limit=10000&mimetype=image/gif" },
      { test: /\.jpg$/,  loader: "url?limit=10000&mimetype=image/jpg" },
      { test: /\.png$/,  loader: "url?limit=10000&mimetype=image/png" },
      { test: /\.svg/,   loader: "url?limit=26000&mimetype=image/svg+xml" },
      { test: /\.json$/, loader: "json" }
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({NODE_ENV: 'true'})
  ]
}
