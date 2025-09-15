export default {
  test: {
    environment: 'node',
    globals: true,                               // ⬅️ add this
    include: ['tests/**/*.spec.{js,mjs,ts}'],
    setupFiles: ['tests/setup.mjs'],
    coverage: { provider: 'v8' }
  }
}
