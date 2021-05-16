const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const helper = require("./webpack.helper");

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
    path: path.resolve(__dirname, "./build"),
  },
  plugins: [
    helper.htmlWebpackPlugin(
      {
        title: "Index",
        template: "./src/page-cover/cover.html",
        inject: true,
        chunks: ["index"],
        filename: "./index.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "Overview",
        template: "./src/page-overview/overview.html",
        inject: true,
        chunks: ["overview"],
        filename: "./overview.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "Gallery",
        template: "./src/page-gallery/gallery.html",
        inject: true,
        chunks: ["gallery"],
        filename: "./gallery.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "Contact",
        template: "./src/page-contact/contact.html",
        inject: true,
        chunks: ["contact"],
        filename: "./contact.html",
      },
      options
    ),
    helper.htmlWebpackPlugin(
      {
        title: "About",
        template: "./src/page-about/about.html",
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
        test: /\.(jpe?g|png|gif|svg|ico|txt)$/i,
        type: "asset/resource",
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
