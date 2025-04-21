import 'zone.js';

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
  browser: true,
  version: '',
  versions: {}
};
(window as any).Buffer = require('buffer').Buffer;