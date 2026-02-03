import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import promise from 'eslint-plugin-promise';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  {
    files: [
      '**/*.ts',
      '**/*.js',
      '**/*.mjs',
      '**/*.tsx',
      '**/*.jsx',
      './eslint.config.mjs',
    ],
    plugins: {
      prettier,
      js,
      promise,
      tseslint,
      import: importPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    extends: ['js/recommended'],
    rules: {
      ...prettierConfig.rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': ['error'],

      'newline-before-return': 'error',
      'no-async-promise-executor': 'error',
      'no-promise-executor-return': 'error',
      'no-useless-catch': 'error',
      'no-underscore-dangle': [
        'error',
        { allowAfterThis: true, allowAfterSuper: true },
      ],
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
      'no-console': 'warn',
      'no-param-reassign': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-template': 'error',
      'dot-notation': 'error',
      'prefer-destructuring': [
        'error',
        {
          object: true,
          array: false,
        },
      ],

      'promise/always-return': 'off',
      'promise/catch-or-return': 'error',

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/require-default-props': 'off',
      'react/display-name': 'error',
      'react/prop-types': 'off',
      'react/jsx-newline': 'error',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],

      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-dom',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '*.scss',
              group: 'index',
              patternOptions: { matchBase: true },
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/no-unused-modules': 'off',
      'import/no-cycle': ['error', { maxDepth: 1 }],
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-absolute-path': 'error',
      'import/no-relative-packages': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
  },
]);

export default eslintConfig;
