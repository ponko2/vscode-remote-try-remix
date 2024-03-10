export default {
  "*.{css,json,scss,yml}": "prettier --write",
  "*.{js,jsx,cjs,mjs,ts,tsx}": ["eslint --fix", "prettier --write"],
};
