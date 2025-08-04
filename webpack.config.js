const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js", //insert source js here
  output: {
    filename: "weather.js", //just the name of output can be anything
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
    devtool: "eval-source-map",
    devServer: {
      watchFiles: ["./template.html"],
  },

  plugins: [ 
    new HtmlWebpackPlugin({
      template: "./src/template.html", //what src html file to pull
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      }
    ],
  },
};