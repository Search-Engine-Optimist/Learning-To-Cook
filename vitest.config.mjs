// vitest.config.mjs
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Default environment is 'node' (good for your fs/path + cheerio tests)
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      reportsDirectory: "coverage",
      all: true,
    },
  },
});
