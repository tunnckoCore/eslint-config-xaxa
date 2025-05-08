import {
  ensurePackages,
  GLOB_JSX,
  GLOB_TSX,
  interopDefault,
  type TypedFlatConfigItem,
} from '@antfu/eslint-config';

// import { pluginTailwind } from '../plugins.ts';

export async function tailwindcss(
  options?: TypedFlatConfigItem['rules'],
): Promise<TypedFlatConfigItem[]> {
  await ensurePackages(['eslint-plugin-tailwindcss']);
  const tailwindcssEslint = await interopDefault(import('eslint-plugin-tailwindcss'));

  const pluginTailwind = tailwindcssEslint?.configs?.['flat/recommended']?.[0]?.plugins?.tailwindcss;

  if (!pluginTailwind) {
    throw new Error('[eslint-config-xaxa]: Failed to load tailwindcss plugin properly; it is a weird one');
  }

  return [{
    files: [GLOB_JSX, GLOB_TSX],
    name: 'xaxa/tailwind/rules',
    plugins: { tailwindcss: pluginTailwind },
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/migration-from-tailwind-2': 'off',
      'tailwindcss/no-arbitrary-value': 'off',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
    },
  }, {
    name: 'xaxa/tailwind/overrides',
    rules: {
      ...(options || {}),
    },
  }];
}
