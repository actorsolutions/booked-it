import * as dotenv from "dotenv";
import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import { prisma } from "./src/utils/prisma";
import { cypressSanitize } from "./cypress/support";
import { AUDITION_DATA, USER_DATA } from "./cypress/support/seedData";

dotenv.config({ path: ".env.test" });
export default defineConfig({
  env: {
    ...process.env,
  },

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
      on("task", {
        async "db:seed"() {
          return cypressSanitize(["statusChange", "audition", "user"])
            .then(async () => {
              await prisma.user.create({ data: USER_DATA });
              await prisma.audition.create({
                data: AUDITION_DATA,
              });
            })
            .then(() => {
              prisma.$disconnect();
            })
            .then(() => {
              return true;
            });
        },
        async "db:sanitize"() {
          return cypressSanitize(["statusChange", "audition", "user"]).then(
            () => {
              return true;
            }
          );
        },
      });
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

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },
});
