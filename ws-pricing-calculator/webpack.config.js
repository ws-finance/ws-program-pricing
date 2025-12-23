const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // Load chunks relative to the current page (good for GitHub Pages)
    publicPath: './',
    // Use numeric ids for chunk files so runtime will request e.g. "43.bundle.js"
    chunkFilename: '[id].bundle.js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: true,
  },
  mode: 'development',
  devtool: 'source-map',
};
