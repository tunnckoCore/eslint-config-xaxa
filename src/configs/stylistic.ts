import {
  GLOB_JSX,
  GLOB_TSX,
  type OptionsOverrides,
  type StylisticConfig,
  type TypedFlatConfigItem,
} from '@antfu/eslint-config';

import { pluginAntfu, pluginStylistic } from '../plugins.ts';

export const StylisticConfigDefaults = {
  arrowParens: true,
  blockSpacing: true,
  braceStyle: '1tbs',
  commaDangle: 'always-multiline',
  indent: 2,
  jsx: false,
  overrides: {},
  pluginName: 'style',
  quoteProps: 'consistent-as-needed',
  quotes: 'single',
  semi: true,
  severity: 'error',
};

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {
  lessOpinionated?: boolean;
}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const opts = {
    ...StylisticConfigDefaults,
    ...options,
  };

  // await ensurePackages(['@stylistic/eslint-plugin']);

  return [{
    name: 'xaxa/stylistic/setup',
    plugins: {
      antfu: pluginAntfu,
      style: pluginStylistic,
    },
    rules: {
      ...pluginStylistic.configs.customize(opts as any).rules,

      'antfu/consistent-chaining': 'error',
      'antfu/consistent-list-newline': 'off',
      'antfu/curly': 'error',
      'antfu/if-newline': 'error',
      'antfu/import-dedupe': 'error',
      'antfu/no-import-dist': 'error',
      'antfu/no-import-node-modules-by-path': 'error',
      'antfu/no-top-level-await': 'off',
      'antfu/no-ts-export-equal': 'error',
      'antfu/top-level-function': 'error',
    },
  }, {
    files: [GLOB_TSX, GLOB_JSX],
    name: 'xaxa/stylistic/jsx-files',
    plugins: { style: pluginStylistic },
    rules: {
      ...pluginStylistic.configs.customize({ ...opts, jsx: true } as any).rules,

      'style/jsx-curly-spacing': ['error', 'never'],
      'style/jsx-sort-props': ['error', {
        callbacksLast: true,
        shorthandFirst: true,
      }],
    },
  }, {
    name: 'xaxa/stylistic/overrides',
    rules: {
      ...opts.overrides,
    },
  }];
}
