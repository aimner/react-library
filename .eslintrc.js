module.exports = {
  extends: [require.resolve('arui-presets-lint/eslint'), 'plugin:react/jsx-runtime'],
  parserOptions: {
    project: ['./tsconfig.eslint.json' /* './cypress/tsconfig.json' */],
  },

  overrides: [
    {
      files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        // TODO: добавить после cypess 'cypress/**/*.ts',
        devDependencies: ['**/*.test.{ts,tsx,js,jsx}'],
      },
    ],
    'import/no-default-export': 'error',
    indent: 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^action' }],
    'no-nested-ternary': 'off',
    'no-unneeded-ternary': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'arrow-body-style': 'off',
    'no-irregular-whitespace': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'import/no-default-export': 'off',
    'no-param-reassign': 'off',
    'prefer-template': 'off'
  },
  ignorePatterns: ['coverage', 'cypress.config.ts'],
};
