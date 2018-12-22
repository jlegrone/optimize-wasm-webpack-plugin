/* eslint-disable import/no-dynamic-require, global-require */
import * as fs from 'fs';
import * as path from 'path';
import * as webpack from 'webpack';
import * as rimraf from 'rimraf';
import * as binaryen from "binaryen";

jest.mock('optimize-wasm-webpack-plugin');

const cases = fs.readdirSync(path.join(__dirname, './cases'));

describe('Webpack Integration Tests', () => {
  cases.forEach((testCase) => {
    it(testCase, (done) => {
      let options: webpack.Configuration = { entry: { index: './index.js' } };
      const testDirectory = path.join(__dirname, 'cases', testCase);
      const outputDirectory = path.join(__dirname, 'test_output', testCase);
      const configFile = path.join(testDirectory, 'webpack.config.js');

      if (fs.existsSync(configFile)) {
        options = require(configFile);
      }

      options.context = testDirectory;
      if (!options.module) options.module = { rules: [] };
      // if (!options.module.loaders) {
      //   options.module.loaders = [{ test: /\.txt$/, loader: OptimizeWasmPlugin.extract('raw-loader') }];
      // }
      if (!options.output) options.output = { filename: '[name].js' };
      if (!options.output.path) options.output.path = outputDirectory;

      options.stats = "verbose"

      // console.log(options);

      rimraf(outputDirectory, () => {
        webpack(options, (err, stats) => {
          if (err) return done(err);
          if (stats.hasErrors()) return done(new Error(stats.toString()));

          fs.readdirSync(outputDirectory).forEach((file: string) => {
            if (file.endsWith(".wasm")) {
              const filePath = path.join(outputDirectory, file);
              const buffer = fs.readFileSync(filePath);
              const mod = binaryen.readBinary(buffer);
              expect(mod.validate()).toEqual(1);
              const text = mod.emitText();
              expect(text).toMatchSnapshot();
            }
          });

          const expectedDirectory = path.join(testDirectory, 'expected');
          fs.readdirSync(expectedDirectory).forEach((file) => {
            const filePath = path.join(expectedDirectory, file);
            const actualPath = path.join(outputDirectory, file);
            expect(readFileOrEmpty(actualPath)).toEqual(readFileOrEmpty(filePath));
            expect(readFileOrEmpty(actualPath)).toMatchSnapshot();
          });

          done();
        });
      });
    });
  });
});

function readFileOrEmpty(path: string) {
  try {
    return fs.readFileSync(path, 'utf-8');
  } catch (e) {
    return '';
  }
}
