import * as dotenv from 'dotenv';
import { defineConfig } from "cypress";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.log(config)

      config.env = {
        ...process.env,
        ...config.env,
      };
      config.defaultCommandTimeout = 10000

      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/*.{js,jsx,ts,tsx}',
  },
});
