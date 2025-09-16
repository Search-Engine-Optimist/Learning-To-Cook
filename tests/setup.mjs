// tests/setup.mjs
// Minimal File polyfill for Node test envs (Node 18 lacks globalThis.File).
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File extends Blob {
    constructor(bits = [], name = '', options = {}) {
      super(bits, options);
      this.name = String(name);
      this.lastModified = options.lastModified ?? Date.now();
    }
  };
}
