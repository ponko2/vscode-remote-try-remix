/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{css,json,yaml,yml}": "prettier --write",
  "*.{cjs,js,jsx,mjs,ts,tsx}": ["eslint --fix", "prettier --write"],
  "schema.prisma": (filenames) =>
    filenames.flatMap((filename) => [
      `prisma format --schema=${filename}`,
      `prisma-case-format --file ${filename}`,
    ]),
};
