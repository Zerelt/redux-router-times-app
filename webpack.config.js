const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

/*
to check where the webpack is serving the file:
You can see it:  http://localhost:8080/webpack-dev-server
Then I could see my bundle.js path > http://localhost:8080/dist/bundle.js
After that I used that /dist/bundle.js in my index.html <script src="/dist/bundle.js"></script>
Now it refreshes any file changes.

https://stackoverflow.com/questions/36150456/webpack-dev-server-not-bundling-even-after-showing-bundle-valid-message
*/

module.exports = {
  entry: {
    app:'./src/components/App.js'
  },

  output: {
    path: path.resolve(__dirname,'dist'),
    publicPath:'http://localhost:8080/',
    // publicPath: 'http://192.168.x.xxx:xxxx/', //for wds on mobile over wifi (go to this adddress instead of localhost:8080)
    filename: '[name].bundle.js',
  },

  devtool:'inline-source-map',

  module: {
    rules: [
      {
        test:/\.scss$/,
        exclude:/node_modules/,
        use: ['style-loader','css-loader','sass-loader']
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
          'file-loader?name=[name].[ext]&outputPath=images/&publicPath=/',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.(ttf|woff|eot)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },//end module

  devServer:{
    contentBase:path.join(__dirname,'dist'),
    // publicPath:'/dist/',
    // publicPath: 'http://localhost:8080/dist',
    // publicPath: 'http://192.168.x.xxx:xxxx/',  // for wds on mobile over wifi
    compress:true,
    // port:8080,
    inline:true,
    // stats: 'errors-only',
    hot: true,
    // hotOnly: true
    // open:true
    historyApiFallback: true //attempt for react-router
  },

  plugins: [
    new HtmlWebpackPlugin({
      title:'My custom project title',
      minify: {
        // collapseWhitespace:true
      },
      hash: true,
      // filename:'./../index.html',
      // excludeChunks:['contact'],
      template: './src/index.ejs',
      // favicon: 'path/to/favicon.png'
    }),
    new ExtractTextPlugin({
      filename:'app.css',
      disable:true,
      allChunks:true
    }),
    new webpack.HotModuleReplacementPlugin({
      // isProd:false //specify is development environment is development or production
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]//end plugins
};
