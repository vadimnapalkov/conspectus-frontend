module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    require.resolve('eslint-config-standard'),
    require.resolve('eslint-config-prettier'),
    require.resolve('eslint-config-prettier/standard'),
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  ignorePatterns: [
    '__sapper__'
  ],
  plugins: ['prettier', 'svelte3'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    },
  ],
  rules: {
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index']],
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
  },
  globals: {
    FileReader: 'readonly',
  },
};
