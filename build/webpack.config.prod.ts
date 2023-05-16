import * as path from 'path';

import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.config.base';

const prodConfig: webpack.Configuration = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      chunks: ['vendors', 'app'],
      favicon: 'public/favicon.png',
      inject: 'body',
      hash: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerWebpackPlugin({ parallel: true })],
  },
  devtool: 'source-map',
};

export default merge(baseConfig, prodConfig);
