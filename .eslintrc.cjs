/* eslint-env node */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2024: true,
  },

  // Base config
  extends: ["eslint:recommended", "prettier"],

  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "react-refresh", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
      rules: {
        // React
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
        // ----------------------------------------------

        // Enforce consistent usage of destructuring assignment of props, state, and context
        "react/destructuring-assignment": "error",

        // Enforce a specific function type for function components
        "react/function-component-definition": [
          "error",
          {
            namedComponents: ["function-declaration", "function-expression"],
            unnamedComponents: "function-expression",
          },
        ],

        // Ensure destructuring and symmetric naming of useState hook value and setter variables
        "react/hook-use-state": "error",

        // Enforce boolean attributes notation in JSX
        "react/jsx-boolean-value": "error",

        // Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes
        "react/jsx-curly-brace-presence": "error",

        // Enforce shorthand or standard form for React fragments
        "react/jsx-fragments": "error",

        // Disallow `.bind()` or arrow functions in JSX props
        "react/jsx-no-bind": [
          "error",
          {
            ignoreDOMComponents: true,
            ignoreRefs: true,
            allowArrowFunctions: true,
            allowFunctions: false,
            allowBind: false,
          },
        ],

        // Disallows JSX context provider values from taking values that will cause needless rerenders
        "react/jsx-no-constructed-context-values": "error",

        // Disallow problematic leaked values from being rendered
        "react/jsx-no-leaked-render": "error",

        // Disallow unnecessary fragments
        "react/jsx-no-useless-fragment": "error",

        // Enforce PascalCase for user-defined JSX components
        "react/jsx-pascal-case": "error",

        // Enforce props alphabetical sorting
        "react/jsx-sort-props": "error",

        // Disallow when this.state is accessed within setState
        "react/no-access-state-in-setstate": "error",

        // Disallow usage of Array index in keys
        "react/no-array-index-key": "error",

        // Disallow usage of dangerous JSX properties
        "react/no-danger": "error",

        // Disallow `this` from being used in stateless functional components
        "react/no-this-in-sfc": "error",

        // Disallow creating unstable components inside components
        "react/no-unstable-nested-components": "error",

        // Enforce stateless components to be written as a pure function
        "react/prefer-stateless-function": "error",

        // Disallow extra closing tags for components without children
        "react/self-closing-comp": "error",

        // React Refresh
        // https://github.com/ArnaudBarre/eslint-plugin-react-refresh/blob/main/README.md
        // ----------------------------------------------
        "react-refresh/only-export-components": [
          "warn",
          {
            allowExportNames: ["meta", "links", "headers", "loader", "action"],
            allowConstantExport: true,
          },
        ],
      },
    },

    // TypeScript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier",
      ],
      rules: {
        // React
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
        // ----------------------------------------------

        // Disallow missing props validation in a React component definition
        "react/prop-types": "off",

        // TypeScript
        // https://typescript-eslint.io/rules/
        // ----------------------------------------------

        // Enforce type definitions to consistently use either `interface` or `type`
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      },
    },
  ],
};
