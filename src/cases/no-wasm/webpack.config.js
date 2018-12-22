const OptimizeWasmPlugin = require('optimize-wasm-webpack-plugin');

const plugin = new OptimizeWasmPlugin({
  options: true
});

module.exports = {
  entry: './index',
  plugins: [
    plugin,
  ],
  module: {
    rules: [{
      test: /\.wasm$/,
      type: "webassembly/experimental"
    }]
  },
  optimization: {
    minimize: true
  }
};
