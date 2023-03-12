module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/core-modules': [
      'react-router-dom',
    ],
  },
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
          '.tsx',
          '.ts',
        ],
      },
    ],
  },
};
