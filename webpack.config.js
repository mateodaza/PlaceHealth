var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {  
  entry: [
    './app/src/index.js'
  ],
  output: {
    path: path.resolve(__dirname,'app/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: ['./app/build', path.resolve(__dirname, 'res')],
    //historyApiFallback: true,
    //hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TBA',
     // filename: 'index.html'
      template: './app/front/index.html'
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      { test: /\.svg$/,loader: 'svg-inline-loader'},
      { test: /\.(woff2?|jpe?g|png|gif|ico)$/, use: 'file-loader?name=./res/[name].[ext]' },
],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    readline: 'empty'
  },
};
