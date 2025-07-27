// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

export default [
  {
    ignores: ["dist"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: eslintPluginPrettier,
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    rules: {
      // Prettier rules
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: false,
          trailingComma: "es5", // keeps trailing commas where valid in ES5 (objects, arrays, etc.)
        },
      ],

      // React rules
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Style
      "capitalized-comments": ["error", "always"],

      // Testing rules
      "testing-library/await-async-utils": "error",
      "testing-library/no-await-sync-events": "error",
    },
  },
];
