let WebpackDevServer = require("webpack-dev-server");
let webpack = require("webpack");
let config = require("../../webpack.config.dev");

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: {
    colors: true
  },
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

server.listen(5000, "localhost", function () {});
