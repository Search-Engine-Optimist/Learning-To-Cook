// vitest.config.mjs
export default {
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.{js,mjs,ts}'],
    setupFiles: ['tests/setup.mjs'],
    coverage: { provider: 'v8' }
  }
}
