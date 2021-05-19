const COMMON = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');


module.exports = merge (COMMON, {
    mode: "production",
    output: {
        // filename: '[name].[contenthash].bundle.js',
        filename = "js/app.js"
    },
    module: {
        rules: [
            {
                test: [/\.js$/],
                exclude: [/node_modules/],
                loader: "babel-loader",
                options: { presets: ["env"] },
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].[hash].css",
          chunkFilename: "[id].[hash].css",
        }),
        new ImageminPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i,
          optipng: { optimizationLevel: 3 },
          jpegtran: { progressive: true },
          gifsicle: { optimizationLevel: 1 },
          svgo: {},
        }),
    ],
    // https://webpack.js.org/configuration/optimization/
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
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
    }
});
