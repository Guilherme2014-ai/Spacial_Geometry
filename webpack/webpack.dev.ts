/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from "path";
import { merge } from "webpack-merge";
const common = require("./webpack.common.ts");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: resolve(__dirname, "..", "dist"),
    },
    hot: true,
  },
});
