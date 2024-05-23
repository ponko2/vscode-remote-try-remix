/// <reference types="vitest" />
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

const isStorybook = process.argv[1]?.includes("storybook");

installGlobals({
  nativeFetch: true,
});

export default defineConfig({
  plugins: [
    !process.env["VITEST"] &&
      !isStorybook &&
      remix({
        future: {
          unstable_singleFetch: true,
        },
      }),
    !process.env["VITEST"] &&
      !isStorybook &&
      babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
          presets: ["@babel/preset-typescript"],
          plugins: [["babel-plugin-react-compiler", {}]],
        },
      }),
    (process.env["VITEST"] ?? isStorybook) &&
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", {}]],
        },
      }),
    tsconfigPaths(),
  ],
});
