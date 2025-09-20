import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node
    },
    rules: {
      // Add custom rules here if needed
    }
  },
  {
    files: ["tests/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly"
      }
    }
  },
  {
    ignores: ["coverage/", ".lighthouseci/", "artifacts/"]
  }
];
