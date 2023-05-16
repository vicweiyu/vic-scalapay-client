import * as path from 'path';

import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.config.base';

import { IS_SIT, API_PRD_SERVER_URL, API_DEV_SERVER_URL } from '../src/common/constants';

interface Configuration extends webpack.Configuration {
  devServer?: WebpackDevServer.Configuration;
}

const devConfig: Configuration = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      chunks: ['vendors', 'app'],
      favicon: 'public/favicon.png',
      inject: 'body',
      hash: true,
      minify: {
        html5: true,
        collapseWhitespace: false,
        preserveLineBreaks: true,
        minifyCSS: false,
        minifyJS: false,
        removeComments: false,
      },
    }),
  ],
  devServer: {
    port: 8001,
    https: IS_SIT,
    compress: true,
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: API_DEV_SERVER_URL,
        router: () => API_PRD_SERVER_URL,
        changeOrigin: true,
      },
    },
  },
  devtool: 'eval-source-map',
};

export default merge(baseConfig, devConfig);
