import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import { pluginNode } from '../plugins.ts';

// slightly modified from antfu's, plus allow overrides
export async function node(options?: TypedFlatConfigItem['rules']): Promise<TypedFlatConfigItem[]> {
  return [{
    name: 'xaxa/node/rules',
    plugins: {
      node: pluginNode,
    },
    rules: {
      'node/file-extension-in-import': 'off',
      'node/handle-callback-err': ['error', '^(err|error|_err|_error|_er)$'],
      'node/no-deprecated-api': 'error',
      'node/no-exports-assign': 'error',
      'node/no-missing-import': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
      'node/no-unpublished-bin': 'error',
      'node/no-unpublished-import': 'error',
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',
      'node/process-exit-as-throw': 'off',
    },
  }, {
    name: 'xaxa/node/user-overrides',
    rules: {
      ...(options || {}),
    },
  }];
}
