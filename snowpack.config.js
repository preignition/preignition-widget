/** @type {import("snowpack").SnowpackUserConfig } */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');

const mount = {
  // bower_components: { url: '/bower_components', static: true },
  // preignition_src: { url: '/preignition', static: true },
  // __: { url: '/__', static: true },
  // data: { url: '/data', static: true },
  public: { url: '/', static: true },
  src: { url: '/dist' },
  bower_components: { url: '/bower_components', static: true }
};

mount[resolve(__dirname, '../lit-firebase')] = '/src/@lit-firebase';
mount[resolve(__dirname, '../preignition-demo')] = '/src/@preignition-demo';
mount[resolve(__dirname, '../preignition-config')] = '/src/@preignition-config';
mount[resolve(__dirname, '../preignition-state')] = '/src/@preignition-state';
mount[resolve(__dirname, '../preignition-mixin')] = '/src/@preignition-mixin';
mount[resolve(__dirname, '../preignition-styles')] = '/src/@preignition-styles';
mount[resolve(__dirname, '../preignition-util')] = '/src/@preignition-util';
mount[resolve(__dirname, '../preignition-router')] = '/src/@preignition-router';

module.exports = {
  mount,
  alias: {
    '@preignition/lit-firebase': '../lit-firebase',
    '@preignition/preignition-config': '../preignition-config',
    '@preignition/preignition-demo': '../preignition-demo',
    '@preignition/preignition-mixin': '../preignition-mixin',
    '@preignition/preignition-state': '../preignition-state',
    '@preignition/preignition-styles': '../preignition-styles',
    '@preignition/preignition-util': '../preignition-util',
    '@preignition/preignition-router': '../preignition-router',
  },
  plugins: ['@snowpack/plugin-babel', '@snowpack/plugin-dotenv'],
  routes: [
    { 'match': 'routes', 'src': '^((?!(bower_components|preignition)).)*$', 'dest': '/index.html' }
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  exclude: [
    '**/node_modules/**/*',
    '**/web_modules/**/*',
    '**/preignition_src/**/*',
    '**/demo/**/*',
    '**/build/**/*',
    '**/public/**/*',
    '**/docs/**/*',
    '**/.pnpm/**/*',
    '**/bower_components/**/*',
    '**/__/**/*',
    '**/__*',
    '**/test/*',
    '**/*.@(spec|test).@(js|mjs)',
    '**/*.stories.@(tsx|mdx)',
    '**/rollup.config.js/**',
  ],
  packageOptions: {
    knownEntrypoints: [],
    rollup: {
      dedup: [
        'router-slot',
        '@preignition/preignition-util',
        '@preignition/preignition-demo',
        '@preignition/preignition-mixin',
        '@preignition/preignition-config',
        '@preignition/preignition-state',
        '@preignition/preignition-styles',
      ]
    }
  },
  devOptions: {
    open: 'none'
  },
  buildOptions: {
    htmlFragments: true
  },
};
