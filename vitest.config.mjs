export default {
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.{js,mjs,ts}'],
    coverage: { provider: 'v8' }
  }
}
