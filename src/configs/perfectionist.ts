import { ensurePackages, interopDefault, type TypedFlatConfigItem } from '@antfu/eslint-config';

export async function perfectionist(options?: TypedFlatConfigItem['rules']): Promise<TypedFlatConfigItem[]> {
  await ensurePackages(['eslint-plugin-perfectionist']);
  const pluginPerfectionist = await interopDefault(import('eslint-plugin-perfectionist'));

  return [{
    name: 'xaxa/perfectionist/setup',
    plugins: {
      perfectionist: pluginPerfectionist,
    },
    rules: {
      'perfectionist/sort-array-includes': 'off', // pretty dangerous and un-ergonomic
      'perfectionist/sort-exports': ['error', {
        order: 'asc',
        type: 'natural',
      }],
      'perfectionist/sort-imports': ['error', {
        // ?NOTE: that's ugly
        // groups: [
        //   'type',
        //   ['parent-type', 'sibling-type', 'index-type', 'internal-type'],

        //   'builtin',
        //   'external',
        //   'internal',
        //   ['parent', 'sibling', 'index'],
        //   'side-effect',
        //   'object',
        //   'unknown',
        // ],
        newlinesBetween: 'always',
        order: 'asc',
        type: 'alphabetical',
      }],
      'perfectionist/sort-named-exports': ['error', {
        order: 'asc',
        type: 'natural',
      }],

      'perfectionist/sort-named-imports': ['error', {
        order: 'asc',
        type: 'natural',
      }],
      'perfectionist/sort-objects': ['error', {
        type: 'alphabetical',
      }],
    },
  }, {
    name: 'xaxa/perfectionist/user-overrides',
    rules: {
      ...(options || {}),
    },
  }];
}
