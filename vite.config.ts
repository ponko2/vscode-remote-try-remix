/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isVitest = process.env["VITEST"] === "true";
const isStorybook = process.argv[1]?.includes("storybook");

export default defineConfig({
  plugins: [
    tailwindcss(),
    !(isVitest || isStorybook) && reactRouter(),
    !(isVitest || isStorybook) &&
      babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
          compact: false,
          presets: ["@babel/preset-typescript"],
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
    (isVitest || isStorybook) &&
      react({
        babel: {
          compact: false,
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
    tsconfigPaths(),
  ],
  server: {
    host: "127.0.0.1",
  },
  test: {
    projects: [
      // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --ci flag will skip prompts and not open a browser
            storybookScript: "pnpm run storybook --ci",
          }),
        ],
        test: {
          name: "storybook",
          // Enable browser mode
          browser: {
            enabled: true,
            // Make sure to install Playwright
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./.storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
