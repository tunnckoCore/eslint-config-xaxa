import { ensurePackages, interopDefault, type TypedFlatConfigItem } from '@antfu/eslint-config';

// import { pluginPromise } from '../plugins.ts';

export async function promise(options?: TypedFlatConfigItem['rules']): Promise<TypedFlatConfigItem[]> {
  await ensurePackages(['eslint-plugin-promise']);
  const pluginPromise = await interopDefault(import('eslint-plugin-promise'));

  return [{
    name: 'xaxa/promise/rules',
    plugins: {
      promise: pluginPromise,
    },
    rules: {
      'promise/always-return': 'off',
      'promise/avoid-new': 'off',
      // These below are to ensure not changes
      // inside upstream XO and the plugin:promise/recommended configs
      'promise/catch-or-return': 'off',
      'promise/no-callback-in-promise': 'off',
      'promise/no-native': 'off',
      'promise/no-nesting': 'off',
      'promise/no-new-statics': 'error',
      'promise/no-promise-in-callback': 'off',
      'promise/no-return-in-finally': 'error',

      // These are the same as in XO CLI, but they are not in the eslint-config-xo
      'promise/no-return-wrap': ['error', { allowReject: true }],
      'promise/param-names': 'error',
      'promise/prefer-await-to-callbacks': 'off',
      'promise/prefer-await-to-then': 'off',
      'promise/valid-params': 'error',
    },
  }, {
    name: 'xaxa/promise/user-overrides',
    rules: {
      ...(options || {}),
    },
  }];
}
