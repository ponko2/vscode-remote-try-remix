/// <reference types="vitest" />
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
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
    tsconfigPaths(),
  ],
});
