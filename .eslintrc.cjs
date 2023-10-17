module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent', 'index'],
          'unknown',
        ],
        pathGroups: [
          {
            pattern: '{react*,react*/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@store/**/*',
            group: 'internal',
          },
          {
            pattern: '@utils/**/*',
            group: 'internal',
          },
          {
            pattern: '@components/**/*',
            group: 'internal',
          },
          {
            pattern: '{@theme,@theme/**/*}',
            group: 'unknown',
          },
          {
            pattern: '{@fortawesome/**/*}',
            group: 'unknown',
          },
        ],
        pathGroupsExcludedImportTypes: [],

        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },

        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'off',
    'import/export': 'off',
  },
};
