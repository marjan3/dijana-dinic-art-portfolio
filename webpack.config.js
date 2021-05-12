const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const MinifyPlugin = require("babel-minify-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const CONFIG = {
  entry: "./src/js/app.js",
  mode: process.env.NODE_ENV,
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "app.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      author: "Dijana Dinic",
      title: "Dijana Dinic Art",
      // comma separated list
      keywords:
        "dijana dinic,portfolio,gallery,art,showcase,work,contact,cv,resume",
      description: "Dijana Dinic Art portfolio website",
      url: "https://dijanadinic.netlify.com/",
      imageUrl: "https://dijanadinic.netlify.com/image.jpg",
      siteName: "dijanadinic.netlify.com",
      template: "./src/index.html",
      filename: "./index.html",
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
      },
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern:
          '<script type="text/javascript" src="../build/app.js"></script>',
        replacement: "",
      },
      {
        pattern: '<link rel="stylesheet" href="./css/cover.css">',
        replacement: "",
      },
    ]),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),
    new CopyWebpackPlugin([
      {
        from: "src/assets/icons/",
        to: "icons/",
      },
      {
        from: "src/assets/images/",
        to: "images/",
      },
      {
        from: "src/assets/*.txt",
        to: "./[name].[ext]",
        toType: "template",
      },
    ]),
    new ImageminPlugin({
      disable: devMode,
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: { optimizationLevel: 3 },
      jpegtran: { progressive: true },
      gifsicle: { optimizationLevel: 1 },
      svgo: {},
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          {
            loader: "css-loader",
            options: {
              // Adds CSS to the DOM by injecting a `<style>` tag

              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 3001,
    hot: true,
    watchContentBase: true,
    noInfo: true,
  },
};

if (!devMode) {
  CONFIG.output.publicPath = "./";
  CONFIG.output.filename = "js/app.js";
  CONFIG.plugins.push(new MinifyPlugin());
  CONFIG.module.rules.push({
    test: [/\.js$/],
    exclude: [/node_modules/],
    loader: "babel-loader",
    options: { presets: ["env"] },
  });
}

module.exports = CONFIG;
