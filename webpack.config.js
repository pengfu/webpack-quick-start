var webpack = require('webpack')

module.exports = {
  entry: './js/entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "> 1%"]}',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  plugins: [
      //生成环境使用，可减小压缩体积
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: function () {
    //       return [autoprefixer];
    //     },
    //   }
    // })
  ]
}