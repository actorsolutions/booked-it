import * as dotenv from "dotenv";
import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        webpackPreprocessor({
          webpackOptions: {
            resolve: {
              extensions: [".tsx", ".jsx", ".ts", ".js"],
            },
            module: {
              rules: [
                {
                  test: /\.(ts|tsx)$/,
                  exclude: [/node_modules/],
                  use: [
                    {
                      loader: "babel-loader",
                      options: {
                        presets: ["next/babel"],
                      },
                    },
                  ],
                },
              ],
            },
            plugins: [new NodePolyfillPlugin()],
          },
        })
      );
      config.env = {
        ...process.env,
        ...config.env,
      };
      config.defaultCommandTimeout = 10000;

      return config;
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/*.{js,jsx,ts,tsx}",
  },
});
