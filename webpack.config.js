const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('node:path');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  devtool: 'eval-source-map',
  target: 'web',
  output: {
    path: path.join(__dirname, 'public', 'js'),
    publicPath: '/public/js',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '@tests': path.join(__dirname, 'tests'),
      '@data': path.join(__dirname, 'src', 'data'),
      '@domain': path.join(__dirname, 'src', 'domain'),
      '@infra': path.join(__dirname, 'src', 'infra'),
      '@main': path.join(__dirname, 'src', 'main'),
      '@presentation': path.join(__dirname, 'src', 'presentation'),
      '@validation': path.join(__dirname, 'src', 'validation'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 3000,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(
        'https://fordevs.herokuapp.com/api',
      ),
    }),
  ],
};
