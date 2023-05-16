module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-prettier'],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    'prettier/prettier': true,
    'declaration-empty-line-before': 'never',
    'font-family-no-missing-generic-family-keyword': null, // TODO
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['constant'],
      },
    ],
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: ['device-pixel-ratio'],
      },
    ],
    'selector-class-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$|^Mui', // kebab-case + Mui
  },
};
