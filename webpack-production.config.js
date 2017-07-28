const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app:'./src/components/App.js',
  },

  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].bundle.js',
    publicPath:'./'
  },

  devtool:'cheap-source-map',

  module: {
    rules: [
      {
        test:/\.scss$/,
        exclude:/node_modules/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader','sass-loader'],
          publicPath:'/dist/'
        })
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:['babel-loader']
      },
      {
        test:/\.(jpe?g|png|svg|gif)$/i,
        exclude:/node_modules/,
        use:[
          'file-loader?name=[name].[ext]&outputPath=images/',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(ttf|woff|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]&outputPath=style/'
      }
    ]
  },//end module

  plugins: [
    new HtmlWebpackPlugin({
      title:'Redux Time App Bundle',
      minify: {
        collapseWhitespace:true
      },
      hash: true,
      // filename:'./../index.html',
      // excludeChunks:['contact'],
      template: './src/index.ejs',
      // favicon: 'path/to/favicon.png'
    }),
    new ExtractTextPlugin({
      filename:'app.css',
      disable:false,
      allChunks:true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]//end plugins
};
