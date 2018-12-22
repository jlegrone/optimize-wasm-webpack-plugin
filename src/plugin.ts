import * as binaryen from "binaryen";
import * as webpack from "webpack";
import { SourceMapSource } from "webpack-sources";

const PLUGIN_NAME = "OptimizeWasmPlugin";

interface OptimizeWasmOptions {
  test?: RegExp,
}

class OptimizeWasmPlugin {
  options: OptimizeWasmOptions;

  constructor(options: OptimizeWasmOptions = {}) {
    const {
      test = /\.wasm$/
    } = options;

    this.options = {
      test,
    }
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.optimizeChunkAssets.tapAsync(PLUGIN_NAME, (chunks: webpack.compilation.Chunk[], callback) => {
        Array.from(chunks)
          .reduce((acc, chunk) => acc.concat(chunk.files || []), [])
          .concat(compilation.additionalChunkAssets || [])
          .filter((file: string) => this.options.test.test(file))
          .forEach((file: string) => {
            const original: any = compilation.assets[file];
            const buffer: ArrayBuffer = original.source();

            const mod = binaryen.readBinary(new Uint8Array(buffer));
            mod.optimize();

            if (!mod.validate())
              throw new Error("validation error");

            const optimized = new SourceMapSource(
              mod.emitBinary().buffer, file, null, original
            );

            // The current size method implementation assumes source returns a
            // string, so we're overriding this for now to allow webpack to report
            // a size metric for wasm assets which are represented by ArrayBuffer.
            optimized.size = function (): number {
              return this.source().byteLength;
            }

            compilation.assets[file] = optimized;
          });

        callback();
      });
    });
  }
}

export = OptimizeWasmPlugin;
