const path = require("path")
const htmlWP = require("html-webpack-plugin")
const miniCss = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, ".kilo"),
    filename: "index.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          miniCss.loader,
          "css-loader",
          "sass-loader"
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', ".scss"],
  },
  mode: "production",
  plugins: [
    new miniCss(
      {
        filename: "style.css"
      }
    ),
    new htmlWP(
      {
        template: "./src/index.html",
        filename: "index.html",
      }
    )
  ]
}