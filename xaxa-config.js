import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
// import { configs as astroConfigs } from 'eslint-plugin-astro';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNoUseExtendNative from 'eslint-plugin-no-use-extend-native';
// import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import { configs as tseslintConfigs, parser as typescriptParser } from 'typescript-eslint';

import airbnbBase from './airbnb-base.js';

const airbnb = airbnbBase
  .filter((x) => !x.name.includes('import'))
  // @ts-ignore
  .concat({
    name: 'airbnb/plugin-import-rules',
    rules: airbnbBase?.find((x) => x.name.includes('import'))?.rules || {},
  });

export default [
  { ignores: ['**/node_modules/**', '**/dist/**'] },
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
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['tsconfig.json', 'packages/**/tsconfig.json'],
        projectService: true,
        // projectService: {
        //   allowDefaultProject: ['*.js', '*.mjs', '*.ts', '.jsx', '*.tsx'],
        // },
        lib: ['ESNext'],
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

      // https://eslint.org/docs/rules/function-call-argument-newline
      'no-import-assign': 'error',

      // https://eslint.org/docs/rules/function-call-argument-newline
      'function-call-argument-newline': ['error', 'consistent'],

      // Prefer Object.hasOwn() over Object.prototype.hasOwnProperty.call()
      // https://eslint.org/docs/rules/prefer-object-has-own
      'prefer-object-has-own': 'error',

      // Off in Airbnb, until `eslint v7.15 is required`
      // disallow use of optional chaining in contexts where the undefined value is not allowed
      // https://eslint.org/docs/rules/no-unsafe-optional-chaining
      'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],

      // https://eslint.org/docs/rules/default-param-last
      'default-param-last': 'error',

      'prefer-regex-literals': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extend-native': 'error',
      'no-use-extend-native/no-use-extend-native': 'error',

      // yes, we know that it's just a convention, allow me Airbnb.
      'no-underscore-dangle': 'off',

      // why?
      'no-continue': 'warn',
      'no-console': 'off',

      // we use es modules
      strict: ['off', 'global'],

      // we use spaces
      'no-tabs': 'error',

      // Enforce using named functions when regular function is used,
      // otherwise use arrow functions
      'func-names': ['error', 'always'],
      // Always use parens (for consistency).
      // https://eslint.org/docs/rules/arrow-parens
      'arrow-parens': ['error', 'always', { requireForBlockBody: true }],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true, allowUnboundThis: true }],
      // http://eslint.org/docs/rules/max-params
      'max-params': ['error', { max: 6 }],
      // http://eslint.org/docs/rules/max-statements
      'max-statements': ['error', 40, { ignoreTopLevelFunctions: true }],
      // http://eslint.org/docs/rules/max-statements-per-line
      'max-statements-per-line': ['error', { max: 1 }],
      // http://eslint.org/docs/rules/max-nested-callbacks
      'max-nested-callbacks': ['error', { max: 4 }],
      // http://eslint.org/docs/rules/max-depth
      'max-depth': ['error', { max: 4 }],
      // enforces no braces where they can be omitted
      // https://eslint.org/docs/rules/arrow-body-style
      // Never enable for object literal.
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
      // Allow functions to be use before define because:
      // 1) they are hoisted,
      // 2) because ensure read flow is from top to bottom
      // 3) logically order of the code.
      // 4) the only addition is 'typedefs' option, see overrides for TS files
      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
          allowNamedExports: true,
        },
      ],

      // disallow declaration of variables that are not used in the code
      'no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true, // airbnb's default
          vars: 'all', // airbnb's default
          // caughtErrorsIgnorePattern: '^(?:$$|xx|_|__|[iI]gnor(?:e|ing|ed))',
          varsIgnorePattern: '^(?:$$|xx|_|__|[iI]gnor(?:e|ing|ed))',
          args: 'after-used', // airbnb's default
          argsIgnorePattern: '^(?:$$|xx|_|__|[iI]gnor(?:e|ing|ed))',

          // catch blocks are handled by Unicorns
          caughtErrors: 'none',
          // caughtErrorsIgnorePattern: '^(?:$$|xx|_|__|[iI]gnor(?:e|ing|ed))',
        },
      ],

      // Default as Airbnb's except we allow for of & for await of
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        // {
        //   selector: 'ForOfStatement',
        //   message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
        // },
        {
          selector: 'LabeledStatement',
          message:
            'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message:
            '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
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
