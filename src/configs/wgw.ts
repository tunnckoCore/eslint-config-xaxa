import { GLOB_MARKDOWN_CODE, type TypedFlatConfigItem } from '@antfu/eslint-config';

import { pluginNoUseExtendNative, pluginUnusedImports } from '../plugins.ts';

export interface OptionsWgw {
  /**
   * Enable TypeScript support
   */
  isTypescript?: boolean;
  /**
   * Enable editor specific rules
   */
  isInEditor?: boolean;
  /**
   * User overrides
   */
  overrides?: TypedFlatConfigItem['rules'];
  /**
   * Enable Astro patches
   */
  isAstro?: boolean;
}

export async function wgw(options?: OptionsWgw): Promise<TypedFlatConfigItem[]> {
  const {
    isAstro = false,
    isInEditor,
    isTypescript = true,
    overrides = {},
  } = { ...options } as OptionsWgw;

  const tsRules = {
    'ts/no-explicit-any': 'off',
    'ts/no-unnecessary-template-expression': 'off',
    'ts/no-unused-vars': 'off', // F off, we have properly configured `no-unused-vars` & `unused-imports` plugin
    'ts/triple-slash-reference': 'off',
  } as any;

  return [{
    name: 'xaxa/wgw/rules-and-overrides',
    plugins: {
      'no-use-extend-native': pluginNoUseExtendNative,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      ...(isAstro
        ? {
            'astro/sort-attributes': ['error', {
              ignoreCase: true,
              order: 'asc',
              type: 'alphabetical',
            }],
          }
        : {}),
      ...(isTypescript ? tsRules : {}),

      // enforces no braces where they can be omitted
      // https://eslint.org/docs/rules/arrow-body-style
      // Never enable for object literal.
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
      'camelcase': 'off',
      'class-methods-use-this': 'off',
      'consistent-return': 'off',

      // https://eslint.org/docs/rules/default-param-last
      'default-param-last': 'error',
      // Enforce using named functions when regular function is used,
      // otherwise use arrow functions
      'func-names': ['error', 'always'],

      // ?NOTE: buggy ones
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',

      'max-classes-per-file': 'off',
      // http://eslint.org/docs/rules/max-depth
      'max-depth': ['error', { max: 4 }],
      // http://eslint.org/docs/rules/max-nested-callbacks
      'max-nested-callbacks': ['error', { max: 4 }],
      // http://eslint.org/docs/rules/max-params
      'max-params': ['error', { max: 6 }],
      // http://eslint.org/docs/rules/max-statements
      'max-statements': ['error', 40, { ignoreTopLevelFunctions: true }],

      'no-await-in-loop': 'off',
      'no-console': 'off',

      // why?
      'no-continue': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extend-native': 'error',
      'no-import-assign': 'error',

      'no-nested-ternary': 'off',
      // 'no-explicit-any': 'warn',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',

      'no-restricted-exports': 'off',
      // Default as Airbnb's except we allow `for of` & `for await of` and disallow `TSEnumDeclaration` & `TSExportAssignment`
      // https://eslint.org/docs/rules/no-restricted-syntax
      'no-restricted-syntax': [
        'error',
        'TSEnumDeclaration[const=true]',
        'TSExportAssignment',
        {
          message: `for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.`,
          selector: 'ForInStatement',
        },
        // {
        //   selector: 'ForOfStatement',
        //   message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
        // },
        {
          message: `Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.`,
          selector: 'LabeledStatement',
        },
        {
          message: `the "with" is disallowed in strict mode because it makes code impossible to predict and optimize.`,
          selector: 'WithStatement',
        },
      ],
      // yes, we know that it's just a convention, allow me Airbnb.
      'no-underscore-dangle': 'off',

      'no-unnecessary-template-expression': 'off',

      // Off in Airbnb, until `eslint v7.15 is required`
      // disallow use of optional chaining in contexts where the undefined value is not allowed
      // https://eslint.org/docs/rules/no-unsafe-optional-chaining
      'no-unsafe-optional-chaining': ['error', {
        disallowArithmeticOperators: true,
      }],

      // Allow functions to be use before define because:
      // 1) they are hoisted,
      // 2) because ensure read flow is from top to bottom
      // 3) logically order of the code.
      // 4) the only addition is 'typedefs' option, see overrides for TS files
      'no-use-before-define': ['error', {
        allowNamedExports: true,
        classes: true,
        functions: false,
        variables: true,
      }],

      'no-use-extend-native/no-use-extend-native': 'error',
      'no-useless-template-literals': 'off',

      // ?NOTE: buggy
      'node/no-missing-import': 'warn',
      'node/no-unpublished-import': 'warn',

      'prefer-arrow-callback': ['error', {
        allowNamedFunctions: true,
        allowUnboundThis: true,
      }],
      'prefer-const': [isInEditor ? 'warn' : 'error',
        { ignoreReadBeforeAssign: true },
      ],
      // bruh
      'prefer-destructuring': 'off',
      // Prefer Object.hasOwn() over Object.prototype.hasOwnProperty.call()
      // https://eslint.org/docs/rules/prefer-object-has-own
      'prefer-object-has-own': 'error',
      'prefer-regex-literals': 'error',

      'sort-keys': 'off',

      // we use es modules
      'strict': ['off', 'global'],
      // Always use parens (for consistency).
      // https://eslint.org/docs/rules/arrow-parens
      'style/arrow-parens': ['error', 'always'],

      'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],

      'style/lines-between-class-members': ['error', {
        enforce: [
          { blankLine: 'never', next: '*', prev: 'field' },
          { blankLine: 'always', next: 'method', prev: 'field' },
          { blankLine: 'always', next: 'method', prev: 'method' },
        ],
      }],

      // http://eslint.org/docs/rules/max-statements-per-line
      'style/max-statements-per-line': ['error', { max: 1 }],
      'style/quote-props': 'error',
      'unused-imports/no-unused-imports': isInEditor ? 'warn' : 'error',
      // disallow declaration of variables that are not used in the code
      'unused-imports/no-unused-vars': ['error', {
        args: 'after-used', // airbnb's default
        argsIgnorePattern: '^(?:$$|xx|_|__|[iI]gnor(?:e|ing|ed))',
        // catch blocks are handled by Unicorns
        caughtErrors: 'none',
        ignoreRestSiblings: true, // airbnb's default
        vars: 'all', // airbnb's default

        // caughtErrorsIgnorePattern: '^(?:$$|xx|_|__|[iI]gnor(?:e|ing|ed))',
        varsIgnorePattern: '^(?:$$|xx|_|__|[iI]gnor(?:e|ing|ed))',
      }],
    },
  }, { // ensure antfu/markdown/disables are last (because WGW is set as last, so we need to redefine these here again)
    files: [GLOB_MARKDOWN_CODE],
    name: 'xaxa/markdown/disables',
    rules: {
      'antfu/no-top-level-await': 'off',

      // ?NOTE: buggy ones
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',

      'no-alert': 'off',
      'no-console': 'off',
      'no-labels': 'off',
      'no-lone-blocks': 'off',
      'no-restricted-syntax': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'off',

      'no-unused-vars': 'off',

      // ?NOTE: buggy
      'node/no-missing-import': 'off',
      'node/no-unpublished-import': 'off',

      'node/prefer-global/process': 'off',

      'style/comma-dangle': 'off',
      'style/eol-last': 'off',

      'ts/consistent-type-imports': 'off',
      'ts/explicit-function-return-type': 'off',
      'ts/no-namespace': 'off',
      'ts/no-redeclare': 'off',
      'ts/no-require-imports': 'off',
      'ts/no-unused-expressions': 'off',
      'ts/no-unused-vars': 'off',
      'ts/no-use-before-define': 'off',

      'unicode-bom': 'off',

      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  }, {
    name: 'xaxa/wgw/user-overrides',
    rules: {
      ...overrides,
    },
  }];
}
