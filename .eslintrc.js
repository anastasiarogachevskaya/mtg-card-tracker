// module.exports = {
//   parser: '@typescript-eslint/parser', // Specifies the ESLint parser
//   parserOptions: {
//     ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
//     ecmaFeatures: {
//       jsx: true, // Allows for the parsing of JSX
//     },
//     sourceType: 'module', // Allows for the use of imports
//     project: './tsconfig.json', // Required for rule generation
//   },
//   plugins: ['@typescript-eslint', 'react'],
//   extends: [
//     'airbnb',
//     'airbnb/hooks',
//     'plugin:react/recommended',
//     'plugin:@next/next/recommended',
//     'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
//     'plugin:@typescript-eslint/recommended-requiring-type-checking',
//     'plugin:import/errors',
//     'plugin:import/warnings',
//     'plugin:import/typescript',
//   ],
//   env: {
//     es6: true,
//     node: true,
//     browser: true,
//   },
//   rules: {
//     'react/prop-types': 'off', // No need since we use TS
//     'no-console': 'off', // Console.log is allowed for log collection
//   },
//   ignorePatterns: [
//     '.next/',
//     'node_modules/',
//   ],
//   settings: {
//     react: {
//       version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
//     },
//   },
//   overrides: [
//     // Disable prop spreading for Storybook stories since actions addon needs it
//     // Disable no-extraneous-dependencies for Storybook stories
//     {
//       files: ['**/*/*.stories.[jt]s?(x)'],
//       rules: {
//         'react/jsx-props-no-spreading': 'off',
//         'import/no-extraneous-dependencies': 'off',
//       },
//     },
//   ],
// };
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@next/next/recommended',
  ],
  parser: '@babel/eslint-parser', // Default to js/jsx
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    // Make sure ESLint resolves both JS and TS files correctly
    // 'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'no-console': 'off',
    'no-param-reassign': [2, {
      props: false,
    }],
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx'],
    }],
    // Ignore file extensions since we have JS and TS
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  // globals: {
  // },
  overrides: [
    // Typescript settings
    {
      files: ['**/*.{ts,tsx}'],

      // Global ESLint Settings
      // =================================
      env: {
        es6: true,
        node: true,
        browser: true,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        react: {
          version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
      },

      // Parser Settings
      // =================================
      // allow ESLint to understand TypeScript syntax
      // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js#L10
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // Lint with Type Information
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
        // tsconfigRootDir: __dirname,
        // project: './tsconfig.json',
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        ecmaFeatures: {
          jsx: true, // Allows for the parsing of JSX
        },
        sourceType: 'module', // Allows for the use of imports
        project: './tsconfig.json', // Required for rule generation
      },

      // Plugins
      // =================================
      plugins: ['@typescript-eslint', 'react'],

      // Extend Other Configs
      // =================================
      extends: [
        'airbnb-typescript',
      ],
      rules: {
        'react/prop-types': 'off', // No need since we use TS
        'react/require-default-props': 'off', // Since we do not use prop-types
        'no-console': 'off', // Console.log is allowed for log collection
        'react/jsx-uses-react': 'off', // react 17 doesnt need importing react
        'react/react-in-jsx-scope': 'off', // react 17 doesnt need importing react
      },
    },
  ],
};
