const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
require("dotenv").config();

const extractSass = new ExtractTextPlugin({
  filename: "../build/styles/[name].css"
});

module.exports = {
  devtool: "inline-source-map",
  entry: {
    app: [
      "babel-polyfill",
      "webpack/hot/only-dev-server",
      "webpack-dev-server/client?http://localhost:5000",
      path.join(__dirname, "./src/client/entry")
    ]
  },
  output: {
    path: path.join(__dirname, "/public/build/"),
    filename: "scripts/[name].js",
    publicPath: "http://localhost:5000/build/"
  },
  resolve: {
    extensions: [
      ".js",
      ".scss"
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$|\.scss$/,
        use: ['css-hot-loader'].concat(extractSass.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {}
            }
          ]
        }))
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
      "CONTENTFUL_BASE_URL",
      "CONTENT_DELIVERY_ACCESS_TOKEN",
      "CONTENT_PREVIEW_ACCESS_TOKEN",
      "SPACE_ID"
    ])
  ]
};
