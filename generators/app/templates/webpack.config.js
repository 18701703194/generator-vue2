const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const f2eci = require("./f2eci")
const env = require("./f2eci").env

let config = {
  entry: {
    'index': [
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: env == 'alpha' ? './' : f2eci["urlPrefix"],
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js|\.jsx$/,
        loader: 'babel',
        exclude: /node_modules\/(?!(@gfe|@dp))/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
          test: /\.less$/,
          loader: env == "alpha" ? "style!css!postcss!less" : ExtractTextPlugin.extract('css!postcss!less')
      },
      {
          test: /\.css$/,
          loader: env == "alpha" ? "style!css!postcss!less" : ExtractTextPlugin.extract('css!postcss!less')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["url?limit=1000"]
      }
    ]
  },
  vue: {
    loaders: {
      // css: ExtractTextPlugin.extract('!css?-autoprefixer'),
      // less: ExtractTextPlugin.extract('!css?-autoprefixer!less-loader'),
      js: 'babel'
    }
  },
  resolve: {
    alias: {
      vue: env == "alpha" ? 'vue/dist/vue.common.js' : 'vue/dist/vue.min.js'
    }
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart: ['gulp']})
  ],
  devServer: {
    historyApiFallback: false,
    noInfo: true,
    hot: true,
    contentBase: f2eci.output,
    publicPath: '/',
    stats:{
      colors: true
    }
  },
  devtool: '#source-map'
}

if(env != 'alpha') {
  config.plugins.push(
    // minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // optimize module ids by occurence count
    new webpack.optimize.OccurenceOrderPlugin()
  )
}

module.exports = config