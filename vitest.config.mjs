// vitest.config.mjs
export default {
  test: {
    coverage: {
      provider: 'v8',
      all: false,
      thresholds: { statements: 0.6, branches: 0.5, functions: 0.6, lines: 0.6 }
    }
  }
}
