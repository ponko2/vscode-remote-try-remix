/// <reference types="vitest" />
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

const isVitest = process.env["VITEST"] === "true";
const isStorybook = process.argv[1]?.includes("storybook");

installGlobals({
  nativeFetch: true,
});

export default defineConfig({
  plugins: [
    !(isVitest || isStorybook) &&
      remix({
        future: {
          unstable_optimizeDeps: true,
          v3_fetcherPersist: true,
          v3_lazyRouteDiscovery: true,
          v3_relativeSplatPath: true,
          v3_singleFetch: true,
          v3_throwAbortReason: true,
        },
      }),
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
});
