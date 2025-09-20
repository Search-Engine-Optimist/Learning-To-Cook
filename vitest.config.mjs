export default {
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.spec.{js,mjs,ts}'],
    setupFiles: ['tests/setup.mjs'],
    coverage: { provider: 'v8' },
  },
};
