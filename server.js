var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev');

var port = 8090,
    ip = '0.0.0.0',
    host = 'http://' + ip + ':' + port;

config.entry.unshift("webpack-dev-server/client?" + host, "webpack/hot/dev-server");

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath, // e.g. '/build/', slashes is a required
  contentBase: 'public/',
  hot: true,
  stats: {
    // see https://webpack.github.io/docs/node.js-api.html
    colors: true,
    cached: false
    // modules: false
    // chunks: false
  },
  // stats: 'verbose', // presets: none, errors-only, minimal, normal, verbose
  // noInfo: true, // Display no info to console (only warnings and errors)
  // quiet: true, // Display nothing to the console
  // outputPathinfo: true
  // historyApiFallback: true
}).listen(port, ip, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at ' + host);
});

/*
"webpack-dev-server --debug --hot --devtool eval-source-map
--output-pathinfo --watch --colors --inline --content-base public
 --port 8090 --host 0.0.0.0"
*/
