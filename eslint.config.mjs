import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-console": "warn",
      "eqeqeq": "error",
      "curly": "error"
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
