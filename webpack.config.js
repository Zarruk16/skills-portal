const path = require('path');

module.exports = {
  mode: 'development', // Change to 'production' for production builds
  entry: './src/index.js', // Your main entry point
  ignoreWarnings: [/Failed to parse source map/],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {

    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: /node_modules/, // Exclude source map warnings from node_modules
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000, // Adjust port if needed
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Support for .jsx files
  },
};
