// @ts-check

/**
 * 📖 [Microsoft/vscode-extension-doc: Bundling Extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)
 * 📖 [Microsoft/vscode-extension-samples: Webpack & Extensions](https://github.com/Microsoft/vscode-extension-samples/blob/master/webpack-sample/README.md)
 */

'use strict';
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {

  // vscode extensions run in a Node.js-context
  // 📖 https://webpack.js.org/configuration/node/
  target: 'node',

  mode: 'production',

  // the entry point of this extension
  // 📖 https://webpack.js.org/configuration/entry-context/
  entry: './src/extension.ts',

  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'extension.js',

    // only difference between commonjs and commonjs2
    // commonjs: exports["MyLibrary"] = {...} 
    // commonjs2: module.exports = {...} 
    // 📖 https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',

    devtoolModuleFilenameTemplate: '../[resource-path]',
  },

  devtool: 'source-map',

  externals: {
    // the vscode-module is created on-the-fly and must be excluded. 
    // Add other modules that cannot be webpack'ed
    // 📖 https://webpack.js.org/configuration/externals/
    vscode: 'commonjs vscode',
  },

  resolve: {
    extensions: ['.ts', '.js',],
  },

  module: {
    rules: [
      { // ts-loader
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      }
    ]
  },

}

module.exports = config;