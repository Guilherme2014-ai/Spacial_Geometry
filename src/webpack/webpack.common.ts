import { resolve } from "path";
import miniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = {
  entry: resolve(__dirname, "..", "index.ts"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new miniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "..", "..", "dist"),
  },
};
