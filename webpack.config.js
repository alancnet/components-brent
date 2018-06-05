const path = require('path')
const Copy = require('copy-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')


module.exports = {
  devtool: 'source-map',

  mode: process.env.NODE_ENV || 'development',
  
  plugins: [
    new Copy([
      { from: 'app/index.html', to: 'index.html' }
    ]),
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ],

  entry: './app/index.js',
  
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js'
  },
  module:{
    rules:[
      // {
      //   test:/\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: { presets: ['es2015'] }
      //   }
      // },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      },
      {
        test:/\.(?:svg|png|eot|woff2|woff|ttf)$/,
        use:['file-loader']
      },
      {
        test:/\.html$/,
        use:['html-loader']
      }
    ]
  }
};