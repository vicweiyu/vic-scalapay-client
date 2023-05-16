module.exports = function (api) {
  api.cache(true);

  /**
   * Use @babel/preset-env to polyfill
   */
  // eslint-disable-next-line
  const presets_env = [
    [
      '@babel/preset-env',
      {
        corejs: {
          version: '3.30',
          proposals: true,
        },
        useBuiltIns: 'usage',
        modules: false,
        debug: true,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  // eslint-disable-next-line
  const plugins_env = [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        regenerator: false,
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ];

  /**
   * Use @babel/plugin-transform-runtime to polyfill
   */
  // eslint-disable-next-line
  const presets_runtime = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        modules: false,
        debug: true,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  // eslint-disable-next-line
  const plugins_runtime = [
    [
      '@babel/plugin-transform-runtime',
      {
        version: '^7.21.4',
        corejs: {
          version: 3,
          proposals: true,
        },
        regenerator: true,
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ];

  return {
    presets: presets_runtime,
    plugins: plugins_runtime,
  };
};
