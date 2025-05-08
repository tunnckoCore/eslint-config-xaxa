import { typescript } from '@antfu/eslint-config';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import type { OptionsTypescript, UserConfig } from './types';
import type { Awaitable } from './utils.ts';

import { airbnb, type OptionsAirbnb } from './configs/index.ts';

export type {
  OptionsAirbnb,
  OptionsTypescript,
  UserConfig,
};

export interface OptionsAirbnbTypescript {
  /**
     * Enable TypeScript support
     *
     * @default auto-detect if TypeScript is installed
     */
  typescript?: boolean | OptionsTypescript;
}

/**
 *
 * @param {OptionsAirbnb & OptionsAirbnbTypescript} options - Options for Airbnb preset including TypeScript support.
 * @param {UserConfig[]} userConfigs - User-defined configurations to be merged with the preset.
 * @returns
 */
export default function airbnbPreset(
  options: OptionsAirbnb & OptionsAirbnbTypescript = {},
  ...userConfigs: Awaitable<UserConfig>[] | UserConfig[]
): FlatConfigComposer {
  const isTypescript = isPackageExists('typescript');
  const { typescript: enableTypeScript = isTypescript, ...opts } = { ...options };

  const configs = [
    airbnb(opts as OptionsAirbnb),
    enableTypeScript && typescript(enableTypeScript === true ? {} : enableTypeScript as OptionsTypescript),
  ];

  let composer = new FlatConfigComposer();
  composer = composer
    .append(
      ...configs.flat().filter(Boolean),
      ...userConfigs.flat().filter(Boolean) as any, // ? NOTE: bruh... it's okay
    );

  return composer;
}

export {
  airbnbPreset as airbnb,
  typescript,
};
