const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const helper = require("./webpack.helper");
const FaviconsPlugin = require("favicons-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const options = {
  author: "Dijana Dinic",
  // comma separated list
  keywords:
    "dijana dinic,portfolio,gallery,art,showcase,work,contact,cv,resume",
  description: "Dijana Dinic Art portfolio website",
  url: "https://dijanadinic.netlify.com/",
  imageUrl: "https://dijanadinic.netlify.com/image.jpg",
  siteName: "dijanadinic.netlify.com",
};

module.exports = {
  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: "./src/page-cover/cover.js",
    overview: "./src/page-overview/overview.js",
    gallery: "./src/page-gallery/gallery.js",
    contact: "./src/page-contact/contact.js",
    about: "./src/page-about/about.js",
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "./build"),
  },
  plugins: [
    new FaviconsPlugin({
      logo: "./assets/icons/icon.png",
      prefix: "icons/",
      inject: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "public/**", to: "[name][ext]" }],
    }),
    helper.htmlWebpackPlugin(
      {
        title: "Dijana's ART ®",
        template: "./src/page-cover/cover.ejs",
        inject: true,
        chunks: ["index"],
        filename: "./index.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "Dijana's ART ® - Overview",
        template: "./src/page-overview/overview.ejs",
        inject: true,
        chunks: ["overview"],
        filename: "./overview.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "Dijana's ART ® - Gallery",
        template: "./src/page-gallery/gallery.ejs",
        inject: true,
        chunks: ["gallery"],
        filename: "./gallery.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "Dijana's ART ® - Contact",
        template: "./src/page-contact/contact.ejs",
        inject: true,
        chunks: ["contact"],
        filename: "./contact.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "Dijana's ART ® - About me",
        template: "./src/page-about/about.ejs",
        inject: true,
        chunks: ["about"],
        filename: "./about.html",
      },
      options
    ),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: [/node_modules|ejs$/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(txt)$/i,
        type: "asset/source",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.(css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hmr: devMode,
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
    ],
  },
};
