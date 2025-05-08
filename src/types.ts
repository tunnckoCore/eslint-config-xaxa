import type {
  OptionsFormatters,
  OptionsOverrides,
  OptionsRegExp,
  OptionsTypescript,
  StylisticConfig,
  TypedFlatConfigItem,
} from '@antfu/eslint-config';
import type { Linter } from 'eslint';
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';
import type { FlatConfigComposer } from 'eslint-flat-config-utils';

import type { OptionsAirbnb } from './configs/airbnb.ts';

export type {
  FlatConfigComposer,
  FlatGitignoreOptions,
  Linter,
  OptionsFormatters,
  OptionsOverrides,
  OptionsRegExp,
  OptionsTypescript,
  StylisticConfig,
  TypedFlatConfigItem,
}

export interface OptionsUnoCSS {
  /**
       * Whether to enable attributify mode rules
       * @default true
       */
  attributify?: boolean;
  /**
     * Whether to enable strict mode rules
     * @default false
     */
  strict?: boolean;
  /**
     * Additional rules to override or add
     */
  overrides?: TypedFlatConfigItem['rules'];
}

export interface OptionsXaxa {
  /**
     * Enable detection to disable auto-fixes of 3 rules, for developer experience.
   * @default true
   */
  isInEditor?: boolean;

  /**
   * Extend the default Airbnb Base ESLint config with rules and other settings.
   */
  airbnb?: OptionsAirbnb;

  /**
   * Enable ASTRO support.
   *
   * Requires installing:
   * - `eslint-plugin-astro`
   *
   * Requires installing for formatting .astro:
   * - `prettier-plugin-astro`
   *
   * @default false
   */
  astro?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable Next.js support.
   * @default false
   */
  nextjs?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable the ESLint's JS recommended preset (@eslint/js/recommended)
   * @default true
   */
  eslintJsRecommended?: boolean;

  /**
   * Enable auto-renaming of plugins
   * @default true
   */
  autoRenamePlugins?: boolean;

  /**
   * Enable component extensions
   */
  componentExts?: string[];

  /**
   * Enable gitignore support.
   *
   * Passing an object to configure the options.
   *
   * @see https://github.com/antfu/eslint-config-flat-gitignore
   * @default true
   */
  gitignore?: boolean | FlatGitignoreOptions;

  /**
   * User ignores
   */
  ignores?: string[];

  /**
   * Enable JSX support. Auto-detected and enabled if `react`/`preact` is detected in the dependencies.
   * @default false
   */
  jsx?: boolean;

  /**
   * Enable linting for **code snippets** in Markdown.
   *
   * For formatting Markdown content, enable also `formatters.markdown`.
   *
   * @default true
   */
  markdown?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable Node support
   * @default true
   */
  node?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable Perfectionist support
   * @default true
   */
  perfectionist?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable pnpm (workspace/catalogs) support.
   * See `src/utils.ts isPnpm`
   *
   * @default auto-detect based on existence `pnpm-lock.yaml`
   */
  pnpm?: boolean;

  /**
   * Enable Promise support
   * @default true
   */
  promise?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable react rules.
   *
   * @default auto-detect and enabled if `react`/`preact` is detected in the dependencies
   */
  react?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable regexp rules.
   *
   * @see https://ota-meshi.github.io/eslint-plugin-regexp/
   * @default true
   */
  regexp?: boolean | (OptionsRegExp & OptionsOverrides);

  /**
   * Enable semi-colon support
   * @default true
   */
  semi?: boolean;

  /**
   * Package type (lib or app)
   * @default 'lib'
   */
  type?: 'lib' | 'app';

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript;

  /**
   * Enable Unicorn support
   * @default true
   */
  unicorn?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable WGW support
   * @default true
   */
  wgw?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable stylistic rules. Defaults to `semi: true`, `quote: 'single'` and `indent: 2` (spaces)
   *
   * @see https://eslint.style/
   * @default true
   */
  stylistic?: boolean | (StylisticConfig & OptionsOverrides);

  /**
   * Enable JSONC support
   * @default true
   */
  jsonc?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable YAML support
   * @default true
   */
  yaml?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable TOML support
   * @default true
   */
  toml?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable TailwindCSS support.
   *
   * It uses the `eslint-plugin-tailwindcss` plugin but its missing whitespace removal,
   * so we can use UnoCSS with Tailwind comapt preset `@unocss/preset-wind4`.
   *
   * @default false
   */
  tailwind?: boolean | TypedFlatConfigItem['rules'];

  /**
   * Enable UnoCSS support
   * @default auto-detect based on if there's UnoCSS config files
   */
  unocss?: boolean | OptionsUnoCSS;

  /**
   * Use external formatters to format files.
   *
   * Requires installing:
   * - `eslint-plugin-format`
   *
   * When set to `true`, it will enable all formatters.
   *
   * @default false
   */
  formatters?: boolean | OptionsFormatters;

  /**
   * Rules to disable fixes for.
   * @default []
   */
  disableFixForRules?: string[];

  /**
   * Root directory to detect `pnpm` files and `unocss` config files
   * @default process.cwd()
   */
  cwd?: string;
}

export type UserConfig =
  TypedFlatConfigItem |
  TypedFlatConfigItem[] |
  FlatConfigComposer<any, any> |
  Linter.Config[];
