/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(environment.paths.source)
  .filter((file) => ['.html', '.ejs'].includes(path.extname(file).toLowerCase())).map((filename) => ({
    input: filename,
    output: filename.replace(/\.ejs$/, '.html'),
  }));

const htmlPluginEntries = templateFiles.map((template) => new HTMLWebpackPlugin({
  inject: true,
  hash: false,
  filename: template.output,
  template: path.resolve(environment.paths.source, template.input),
//  favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
}));

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'assets/js', 'app.js'),
  },
  output: {
    filename: 'assets/js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'assets/img/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: 'assets/fonts/[name].[hash:6][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPartialsPlugin({
      path: path.resolve(environment.paths.source, 'partials/header.html'),
      template_filename: '*',
      priority: 'high',
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.resolve(environment.paths.source, 'partials/footer.html'),
      template_filename: '*',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, 'assets/img'),
          to: path.resolve(environment.paths.output, 'assets/img'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
/*
        {
          from: path.resolve(environment.paths.source, 'videos'),
          to: path.resolve(environment.paths.output, 'videos'),
          toType: 'dir',
          globOptions: {
            ignore: ['*.DS_Store', 'Thumbs.db'],
          },
        },
 */
      ],
    }),
  ].concat(htmlPluginEntries),
  target: 'web',
};
