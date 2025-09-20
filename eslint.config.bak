import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node }
    }
  },
  {
    files: ["tests/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: { test: "readonly", expect: "readonly" }
    }
  },
  {
    ignores: ["coverage/", ".lighthouseci/", "artifacts/"]
  }
  languageOptions: {
  ecmaVersion: "latest",
  sourceType: "module",
  parser: require("espree"),
  globals: { ...globals.node }
}
rules: {
  "no-console": "warn",
  "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
}

];
