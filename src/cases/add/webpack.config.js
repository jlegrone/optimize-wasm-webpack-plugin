const OptimizeWasmPlugin = require('optimize-wasm-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeWasmPlugin()
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true
    })
  ],
  module: {
    rules: [{
      test: /\.wasm$/,
      type: "webassembly/experimental"
    }]
  }
};
