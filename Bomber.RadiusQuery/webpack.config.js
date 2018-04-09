const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index'],
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'artifact'),
    filename: 'bomber-create-database.package.js'
  },
  bail: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  externals: [
    'aws-sdk'
  ]
};
