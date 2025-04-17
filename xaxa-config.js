import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
// import { configs as astroConfigs } from 'eslint-plugin-astro';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native';
// import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import { configs as tseslintConfigs } from 'typescript-eslint';

import airbnbBase from './airbnb-base.js';

const airbnb = airbnbBase
  .filter((x) => !x.name.includes('import'))
  // @ts-ignore
  .concat({
    name: 'airbnb/plugin-import-rules',
    rules: airbnbBase?.find((x) => x.name.includes('import'))?.rules || {},
  });

export default [
  eslintJs.configs.recommended,
  eslintPluginNoUseExtendNative.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginImport.flatConfigs.errors,
  eslintPluginImport.flatConfigs.warnings,
  eslintPluginImport.flatConfigs.react,
  eslintPluginImport.flatConfigs.typescript,
  eslintPluginPromise.configs['flat/recommended'],
  tseslintConfigs.eslintRecommended,

  // TODO: bruh.. buggy
  // astroConfigs['flat/recommended'],

  ...airbnb,

  {
    name: 'wgw/plugin-import-overrides',
    rules: {
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^astro:*', '^bun:*', '^bun$', '^npm:*', '^jsr:*', '^cloudflare:*'],
        },
      ],
      'import/no-unassigned-import': 'off',
      'import/prefer-default-export': 'off',
      'import/no-relative-packages': 'off',

      'import/namespace': ['error', { allowComputed: true }],
      'import/no-absolute-path': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/no-self-import': 'error',

      // Enable this sometime in the future when Node.js has ES2015 module support
      'import/no-cycle': 'error',

      // Disabled as it doesn't work with TypeScript
      // 'import/newline-after-import': 'error',

      'import/no-amd': 'error',
      'import/no-duplicates': 'error',

      // Enable this sometime in the future when Node.js has ES2015 module support
      // 'import/unambiguous': 'error',

      // Enable this sometime in the future when Node.js has ES2015 module support
      // 'import/no-commonjs': 'error',

      // Looks useful, but too unstable at the moment
      'import/no-deprecated': 'error',

      'import/no-extraneous-dependencies': 'off',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default-member': 'error',

      // ! buggy, when you have same identifier as default and as named
      // like `import test from 'foo';` and `import { test } from 'foo';`
      'import/no-named-as-default': 'off',

      // Disabled because it's buggy and it also doesn't work with TypeScript
      // 'import/no-unresolved': [
      //  'error', { commonjs: true }
      // ],

      'import/order': 'error',
      // 'import/no-unassigned-import': [
      //   'error',
      //   {
      //     allow: ['dotenv/config', 'dotenv/import', '@babel/polyfill', '@babel/register', '*.css'],
      //   },
      // ],

      // Ensure more web-compat
      // ! note that it doesn't work in CommonJS
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
      // "import/extensions": ["error", "ignorePackages"],
      'import/extensions': ['off'],

      // ? Always use named exports. Enable?
      // 'import/no-default-export': 'error',

      // ? enable?
      'import/exports-last': 'off',

      // TODO: Enable in future.
      // Ensures everything is tested (all exports should be used).
      // For cases when you don't want or can't test, add eslint-ignore comment!
      // see: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unused-modules.md
      // ! maybe not
      // 'import/no-unused-modules': '',

      'import/no-useless-path-segments': ['error', { noUselessIndex: false }],
    },
  },
  {
    name: 'wgw/plugin-promise-overrides',
    rules: {
      // These below are to ensure not changes
      // inside upstream XO and the plugin:promise/recommended configs
      'promise/catch-or-return': 'off',
      'promise/always-return': 'off',
      'promise/no-native': 'off',
      'promise/no-nesting': 'off',
      'promise/no-promise-in-callback': 'off',
      'promise/no-callback-in-promise': 'off',
      'promise/avoid-new': 'off',
      'promise/prefer-await-to-then': 'error',
      'promise/prefer-await-to-callbacks': 'error',

      // These are the same as in XO CLI, but they are not in the eslint-config-xo
      'promise/no-return-wrap': ['error', { allowReject: true }],
      'promise/param-names': 'error',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/valid-params': 'error',
    },
  },
  {
    name: 'wgw/plugin-unicorn-overrides',
    rules: {
      'unicorn/no-await-expression-member': 'off',
      'unicorn/consistent-destructuring ': 'off',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/no-useless-spread': 'off', // useless rule
      'unicorn/prefer-switch': 'off', // fvck off

      // It is too much annoyance for me. It's a good thing, but generally
      // after so many years we already name things properly,
      // so please don't mess with me and don't correct me.
      'unicorn/prevent-abbreviations': 'off',

      // Please don't annoy me.
      'unicorn/no-null': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/no-array-reduce': 'off',

      // These below are intentional & explicit overrides of XO and Unicorn

      // ! needed for `unicorn/no-unreadable-array-destructuring`
      // 'prefer-destructuring': ['warn', { object: true, array: false }],
      'unicorn/no-unreadable-array-destructuring': 'error', // default in recommended

      'unicorn/no-unused-properties': 'error',
      // Disallow unsafe regular expressions.
      // Don't allow potential catastrophic crashes, slow behaving and downtimes.
      // You still can disable that and do whatever you want,
      // but that will be explicit and visible.
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-unsafe-regex.md
      // 'unicorn/no-unsafe-regex': 'error',

      // Enforce importing index files with `.` instead of `./index`. (fixable)
      // But we should be explicit. We know it is working without that,
      // but at least it is good for newcomers.
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/import-index.md
      'unicorn/import-index': 'off',

      // Enforce proper Error subclassing. (fixable)
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/custom-error-definition.md
      'unicorn/custom-error-definition': 'error',

      // Pretty useful rule, but it depends.
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/filename-case.md
      'unicorn/filename-case': 'off',

      // It is pretty common to name it `err`, and there is almost no reason to be any other.
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/catch-error-name.md
      'unicorn/catch-error-name': ['error', { name: 'err' }],

      // Doesn't work well in node-land. We have `.on/.off` emitters in Nodejs.
      'unicorn/prefer-add-event-listener': 'off',
      'unicorn/no-process-exit': 'error',
    },
  },
  {
    name: 'wgw/misc',
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: {
          alwaysTryTypes: true,
          project: 'packages/*/{ts,js}config.json',
          bun: true,
          node: true,
        },
      },
    },
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.node,
        ...globals.nodeBuiltin,
        ...globals['shared-node-browser'],
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      // parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        // project: ['packages/**/tsconfig.json'],
        // projectService: true,
        // lib: ['ESNext'],
        ecmaFeatures: {
          jsx: true,
          generators: false,
        },
      },
    },
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // fvck off, we have properly configured `no-unused-vars`
      '@typescript-eslint/no-explicit-any': 'off',
      'no-restricted-exports': 'off',
      'sort-keys': 'off',
      camelcase: 'off',
      // !NOTE: eslint-plugin-node is unmaintained and not used in April 2025
      // "node/prefer-global/process": "off",
      // "node/file-extension-in-import": "off",

      // "no-param-reassign": "off",
      // 'no-explicit-any': 'warn',

      'no-restricted-syntax': 'off',
      // bruh
      'prefer-destructuring': 'off',
      'lines-between-class-members': [
        'error',
        {
          enforce: [
            { blankLine: 'never', prev: 'field', next: '*' },
            { blankLine: 'always', prev: 'field', next: 'method' },
            { blankLine: 'always', prev: 'method', next: 'method' },
          ],
        },
      ],
    },
  },

  eslintConfigPrettier,
  // eslintPluginPrettier.configs.recommended,
];
