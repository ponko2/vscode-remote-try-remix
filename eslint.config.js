/* eslint-disable import/no-named-as-default-member */

import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    files: ["app/**/*"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2025,
      },
    },
  },
  {
    ignores: ["app/**/*"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  reactCompiler.configs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/internal-regex": "^~/",
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      // ---------------------------------------------------------------------------
      // React
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
      // ---------------------------------------------------------------------------

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

      // Disallow missing props validation in a React component definition
      "react/prop-types": "off",

      // Disallow extra closing tags for components without children
      "react/self-closing-comp": "error",

      // ---------------------------------------------------------------------------
      // React Refresh
      // https://github.com/ArnaudBarre/eslint-plugin-react-refresh/blob/main/README.md
      // ---------------------------------------------------------------------------
      "react-refresh/only-export-components": [
        "warn",
        {
          allowExportNames: ["meta", "links", "headers", "loader", "action"],
          allowConstantExport: true,
        },
      ],

      // ---------------------------------------------------------------------------
      // TypeScript
      // https://typescript-eslint.io/rules/
      // ---------------------------------------------------------------------------

      // Enforce consistent usage of type imports
      "@typescript-eslint/consistent-type-imports": "error",

      // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    ...vitest.configs.recommended,
    rules: {
      // ---------------------------------------------------------------------------
      // Vitest
      // https://github.com/vitest-dev/eslint-plugin-vitest
      // ---------------------------------------------------------------------------
      ...vitest.configs.recommended.rules,

      // enforce using test or it but not both
      "vitest/consistent-test-it": "error",

      // disallow alias methods
      "vitest/no-alias-methods": "error",

      // disallow conditional expects
      "vitest/no-conditional-expect": "error",

      // disallow conditional tests
      "vitest/no-conditional-in-test": "error",

      // disallow disabled tests
      "vitest/no-disabled-tests": "warn",

      // disallow using a callback in asynchronous tests and hooks
      "vitest/no-done-callback": "error",

      // disallow duplicate hooks and teardown hooks
      "vitest/no-duplicate-hooks": "error",

      // disallow focused tests
      "vitest/no-focused-tests": "error",

      // disallow string interpolation in snapshots
      "vitest/no-interpolation-in-snapshots": "error",

      // disallow importing from __mocks__ directory
      "vitest/no-mocks-import": "error",

      // disallow using `expect` outside of `it` or `test` blocks
      "vitest/no-standalone-expect": "error",

      // disallow using `test` as a prefix
      "vitest/no-test-prefixes": "error",

      // disallow return statements in tests
      "vitest/no-test-return-statement": "error",

      // enforce using `toBeCalledWith()` or `toHaveBeenCalledWith()`
      "vitest/prefer-called-with": "error",

      // enforce using the built-in comparison matchers
      "vitest/prefer-comparison-matcher": "error",

      // enforce using the built-in quality matchers
      "vitest/prefer-equality-matcher": "error",

      // enforce using `expect().resolves` over `expect(await ...)` syntax
      "vitest/prefer-expect-resolves": "error",

      // enforce having hooks before any test cases
      "vitest/prefer-hooks-on-top": "error",

      // enforce using `vi.spyOn`
      "vitest/prefer-spy-on": "error",

      // enforce strict equal over equal
      "vitest/prefer-strict-equal": "error",

      // enforce using toBe()
      "vitest/prefer-to-be": "error",

      // enforce using toContain()
      "vitest/prefer-to-contain": "error",

      // enforce using toHaveLength()
      "vitest/prefer-to-have-length": "error",

      // enforce using `test.todo`
      "vitest/prefer-todo": "error",

      // require setup and teardown to be within a hook
      "vitest/require-hook": "error",

      // enforce that all tests are in a top-level describe
      "vitest/require-top-level-describe": "error",
    },
  },
  {
    ignores: ["app/**/*"],
    ...tseslint.configs.disableTypeChecked,
  },
  prettier,
);
