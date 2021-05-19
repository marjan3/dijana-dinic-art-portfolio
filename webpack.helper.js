const HtmlPlugin = require("html-webpack-plugin");

const generateMeta = (options) => {
  return {
    "http-equiv": {
      name: "http-equiv",
      content: "ie=edge",
    },
    viewport: {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no",
    },
    "msapplication-tap-highlight": {
      name: "msapplication-tap-highlight",
      content: "no",
    },
    author: {
      name: "author",
      content: options.author,
    },
    keywords: {
      name: "keywords",
      content: options.keywords,
    },
    description: {
      name: "description",
      content: options.description,
    },
    name: {
      itemprop: "name",
      content: options.title,
    },
    description: {
      itemprop: "description",
      content: options.description,
    },
    image: {
      itemprop: "image",
      content: options.imageUrl,
    },
    "apple-mobile-web-app-capable": {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    "apple-mobile-web-app-status-bar-style": {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black",
    },
    "apple-mobile-web-app-title": {
      name: "apple-mobile-web-app-title",
      content: options.title,
    },
    "og:title": { property: "og:title", content: options.title },
    "og:description": {
      property: "og:description",
      content: options.description,
    },
    "og:type": { property: "og:type", content: "website" },
    "og:url": { property: "og:url", content: options.url },
    "og:image": { property: "og:image", content: options.imageUrl },
    "og:site_name": { property: "og:site_name", content: options.siteName },
  };
};

module.exports.htmlWebpackPlugin = (properties, options) => {
  return new HtmlPlugin({
    ...{
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
      },
      meta: generateMeta(options),
    },
    ...properties,
  });
};
