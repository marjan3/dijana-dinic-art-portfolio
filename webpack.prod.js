const COMMON = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");

module.exports = merge(COMMON, {
  mode: "production",
  output: {
    // filename: '[name].[contenthash].bundle.js',
    filename: "[name].js",
    clean: true,
    assetModuleFilename: "images/[name][ext][query]",
  },
  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: [/node_modules|ejs$/],
        loader: "babel-loader",
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: "warning", // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: [
                  ["gifsicle", { interlaced: false }],
                  [
                    "mozjpeg",
                    {
                      quality: 65,
                      fastCrush: true,
                    },
                  ],
                  ["pngquant", { quality: "65-90", speed: 4 }],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          sourceMap: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
});
