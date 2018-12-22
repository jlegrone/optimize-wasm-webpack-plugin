<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![size][size]][size-url]

# optimize-wasm-webpack-plugin

This plugin uses [binaryen](https://github.com/WebAssembly/binaryen) to optimize your WebAssembly.

## Requirements

This module requires a minimum of Node v6.11.5 and Webpack v4.0.0.

## Getting Started

To begin, you'll need to install `optimize-wasm-webpack-plugin`:

```console
$ npm install optimize-wasm-webpack-plugin --save-dev
```

Then add the plugin to your `webpack` config. For example:

**webpack.config.js**

```js
const OptimizeWasmPlugin = require('optimize-wasm-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new OptimizeWasmPlugin()],
  },
};
```

And run `webpack` via your preferred method.

## License

[Apache 2.0](./LICENSE)

[npm]: https://img.shields.io/npm/v/optimize-wasm-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/optimize-wasm-webpack-plugin
[node]: https://img.shields.io/node/v/optimize-wasm-webpack-plugin.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/jlegrone/optimize-wasm-webpack-plugin.svg
[deps-url]: https://david-dm.org/jlegrone/optimize-wasm-webpack-plugin
[tests]: https://img.shields.io/travis/jlegrone/optimize-wasm-webpack-plugin.svg
[tests-url]: https://travis-ci.org/jlegrone/optimize-wasm-webpack-plugin
[cover]: https://codecov.io/gh/jlegrone/optimize-wasm-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/jlegrone/optimize-wasm-webpack-plugin
[size]: https://packagephobia.now.sh/badge?p=optimize-wasm-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=optimize-wasm-webpack-plugin
