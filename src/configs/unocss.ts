import { interopDefault, type TypedFlatConfigItem } from '@antfu/eslint-config';

import type { OptionsUnoCSS } from '../types';

export async function unocss(
  options: OptionsUnoCSS = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    attributify = true,
    overrides = {},
    strict = false,
  } = options;

  const pluginUnoCSS = await interopDefault(import('@unocss/eslint-plugin'));

  return [{
    name: 'antfu/unocss',
    plugins: {
      unocss: pluginUnoCSS,
    },
    rules: {
      'unocss/order': 'error',
      ...attributify
        ? {
            'unocss/order-attributify': 'error',
          }
        : {},
      ...strict
        ? {
            'unocss/blocklist': 'error',
          }
        : {},
    },
  }, {
    name: 'xaxa/unocss/overrides',
    rules: {
      ...overrides,
    },
  }];
}
