/// <reference types="vitest" />
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

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
});
