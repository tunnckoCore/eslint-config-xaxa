import { interopDefault, type TypedFlatConfigItem } from '@antfu/eslint-config';

export async function nextjs(options?: TypedFlatConfigItem['rules']): Promise<TypedFlatConfigItem[]> {
  const nextjsConfig = await interopDefault(import('@next/eslint-plugin-next'));

  return [nextjsConfig.flatConfig.recommended, {
    name: 'xaxa/next/user-overrides',
    rules: {
      ...(options || {}),
    },
  }];
}
