import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:react-hooks/recommended",
      "plugin:react-refresh/recommended",
      "plugin:prettier/recommended", // Ensures Prettier rules are respected
      "prettier", // Disables ESLint rules that conflict with Prettier
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto", singleQuote: false }],
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "capitalized-comments": ["error", "always"],
      "react/react-in-jsx-scope": "off",
    },
  }
);
