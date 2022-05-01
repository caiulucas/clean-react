const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('node:path');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@tests': path.join(__dirname, 'tests'),
      '@data': path.join(__dirname, 'src', 'data'),
      '@domain': path.join(__dirname, 'src', 'domain'),
      '@infra': path.join(__dirname, 'src', 'infra'),
    },
  },
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [new CleanWebpackPlugin()],
};
