import * as path from 'path';

import * as webpack from 'webpack';
import ESlintWebpackPlugin from 'eslint-webpack-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const devMode: boolean = process.env.NODE_ENV !== 'production';
console.info(`Victor Scalapay Client is building...`);
console.info(`devMode:${devMode}, NODE_ENV:${process.env.NODE_ENV}`);

const baseConfig: webpack.Configuration = {
  entry: {
    app: path.join(__dirname, '../src/index.tsx'),
  },
  output: {
    filename: '[name]_[contenthash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: devMode ? '/' : '', // TODO
  },
  mode: devMode ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/i,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.ts(x?)$/i,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.css|less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset/resource', // TODO
        generator: {
          filename: 'images/[name]_[contenthash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource', // TODO
        generator: {
          filename: 'font/[name]_[contenthash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new ESlintWebpackPlugin({
      overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
      context: path.resolve(__dirname, '../src'),
      exclude: ['../node_modules', '../dist'],
      files: '**/*.{js,jsx,ts,tsx,json,md}',
      fix: false,
      lintDirtyModulesOnly: false,
      threads: true,
    }),
    new StylelintWebpackPlugin({
      configFile: path.resolve(__dirname, '../.stylelintrc.js'),
      context: path.resolve(__dirname, '../src'),
      customSyntax: 'postcss-less',
      exclude: ['../node_modules', '../dist'],
      files: '**/*.{css,less}',
      fix: false,
      lintDirtyModulesOnly: false,
      threads: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'app_[contenthash:8].css',
    }),
    function (this) {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors?.length && process.argv.indexOf('--watch') === -1) {
          console.log('Webpack Build Error!');
          console.log(stats.compilation.errors);
          process.exit(3000);
        }
      });
    },
  ],
  optimization: {
    splitChunks: {
      minSize: 50,
      cacheGroups: {
        vendors: {
          // test: /(react|react-dom|redux|redux-thunk|react-redux|react-router-dom|react-router-redux|@mui|@emotion)/,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

export default baseConfig;
