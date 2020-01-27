var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');
var path = require('path');

var basePath= __dirname;

module.exports = {
  context: path.join(basePath,'src'),
  entry: {
    app: './students.js',
    appStyles: ['./mystyles.scss'],
    vendor:["jquery"],
    vendorStyles:[
      '../node_modules/bootstrap/dist/css/bootstrap.css'
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
  },  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader,
         'css-loader'
         ]
      },
      {
        test: /\.scss$/,
        use:[
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
          loader: "sass-loader",
          options: {
            implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=5000'
      },
      {
        test: /\.html$/,
        loader:'html-loader'
      }
    ]
  },
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      //hash: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
