/* eslint complexity: ["error", 100] */

import type {
  Awaitable,
  OptionsFormatters,
  OptionsOverrides,
  StylisticConfig,
} from '@antfu/eslint-config';

import {
  astro as antfuAstro,
  defaultPluginRenaming as antfuPluginRenaming,
  comments,
  disables,
  formatters,
  ignores,
  interopDefault,
  isInEditorEnv,
  // jsdoc, // TODO: add jsdoc + jsdoc examples support
  jsonc,
  jsx,
  markdown,
  pnpm,
  react,
  regexp,
  resolveSubOptions,
  sortPackageJson,
  sortTsconfig,
  toml,
  typescript,
  yaml,
} from '@antfu/eslint-config';
import js from '@eslint/js';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import type { OptionsXaxa, UserConfig } from './types.ts';

import * as config from './configs/index.ts';
import { isPnpm, isUnoCSS } from './utils.ts';

const renaming = antfuPluginRenaming as any;

export * from './configs/index.ts';
export * from './plugins.ts';
export * from './types.ts';
export * from './vscode.ts';

export const defaultPluginRenaming = { ...renaming, '@next/next': 'nextjs' } as any;
export {
  FlatConfigComposer,
  interopDefault,
  isInEditorEnv,
  isPackageExists,
  isPnpm,
  isUnoCSS,
  js,
  antfuAstro as astro,
  comments,
  disables,
  formatters,
  ignores,
  // jsdoc, // TODO: add jsdoc + jsdoc examples support
  jsonc,
  jsx,
  markdown,
  pnpm,
  react,
  regexp,
  resolveSubOptions,
  sortPackageJson,
  sortTsconfig,
  toml,
  typescript,
  yaml,
};

/**
 * Construct an array of ESLint flat config items.
 *
 * @param {OptionsXaxa} options - The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]} userConfigs - The user configurations to be merged with the generated configurations.
 * @returns {Promise<TypedFlatConfigItem[]>} The merged ESLint configurations.
 */
export default function xaxa(
  options?: OptionsXaxa,
  ...userConfigs: Awaitable<UserConfig>[] | UserConfig[]
): FlatConfigComposer {
  // console.log('current dir', process.cwd(), fileURLToPath(import.meta.url));
  const settings = { ...options } as OptionsXaxa;
  const isTypescript = isPackageExists('typescript');
  const isReact = isPackageExists('preact') || isPackageExists('react');
  const {
    astro: enableAstro = false,
    autoRenamePlugins = true,
    componentExts = [],
    eslintJsRecommended = true,
    gitignore: enableGitignore = true,
    ignores: userIgnores = [],
    jsonc: enableJsonc = true,
    // jsdoc: enableJsdoc = true,
    jsx: enableJsx = isReact,
    markdown: enableMarkdown = true,
    nextjs: enableNextjs = false,
    node: enableNode = true,
    perfectionist: enablePerfectionist = true,
    pnpm: enableCatalogs = isPnpm(settings.cwd),
    promise: enablePromise = true,
    react: enableReact = isReact,
    regexp: enableRegexp = true,
    semi: enableSemi = true,
    tailwind: enableTailwind = false,
    toml: enableToml = true,
    type: packageType = 'lib',
    typescript: enableTypeScript = isTypescript,
    unicorn: enableUnicorn = true,
    unocss: enableUnoCSS = isUnoCSS(settings.cwd),
    wgw: enableWgw = true,
    yaml: enableYaml = true,
    ...opts
  } = { ...settings } as OptionsXaxa;

  if (('files' in settings) && ('name' in settings) && ('plugins' in settings)) {
    throw new Error(
      '[eslint-xaxa-config] The first argument should not contain the "files" property as the "options" are supposed to be global.',
    );
  }

  const disableFixForRules = opts.disableFixForRules || [
    'unused-imports/no-unused-imports',
    'test/no-only-tests',
    'prefer-const',
  ];
  let isInEditor = opts.isInEditor;
  if (isInEditor == null) {
    isInEditor = isInEditorEnv();
    if (isInEditor) {
      console.log(`[eslint-config-xaxa] Detected running in editor, fix disabled for: ${disableFixForRules.join(', ')}`.trim());
    }
  }
  // eslint-disable-next-line no-nested-ternary
  const stylisticOptions = (opts.stylistic === false
    ? false
    : typeof opts.stylistic === 'object'
      ? opts.stylistic
      : {}
  ) as (StylisticConfig & OptionsOverrides);

  stylisticOptions.jsx = enableJsx;
  stylisticOptions.semi = enableSemi;

  const configs: any = [];

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) => [r({
          name: 'antfu/gitignore',
          ...enableGitignore,
        })]),
      );
    } else {
      configs.push(
        interopDefault(import('eslint-config-flat-gitignore')).then((r) => [r({
          name: 'antfu/gitignore',
          strict: false,
        })]),
      );
    }
  }

  const typescriptOptions = resolveSubOptions(opts as any, 'typescript');
  const tsconfigPath = 'tsconfigPath' in typescriptOptions
    ? typescriptOptions.tsconfigPath
  // eslint-disable-next-line no-undefined
    : undefined;

  // Base configs
  configs.push(
    ignores(userIgnores), // user ignores
    comments(),
    eslintJsRecommended && { name: '@eslint/js/recommended', ...js.configs.recommended },
    config.airbnb({
      typescript: isTypescript,
      ...(opts.airbnb || {}),
    }),
    enableNode && config.node(enableNode === true ? {} : enableNode),
    enablePromise && config.promise(enablePromise === true ? {} : enablePromise),
    enablePerfectionist && config.perfectionist(
      enablePerfectionist === true ? {} : enablePerfectionist,
    ),
    enableUnicorn && config.unicorn(enableUnicorn === true ? {} : enableUnicorn),
    enableRegexp && regexp(enableRegexp === true ? {} : enableRegexp),

    enableJsx && jsx(),
    enableTailwind && config.tailwindcss(enableTailwind === true ? {} : enableTailwind),
    enableUnoCSS && config.unocss(enableUnoCSS === true ? {} : enableUnoCSS),

    enableTypeScript && typescript({
      ...typescriptOptions,
      componentExts,
      type: packageType,
    }),
    enableNextjs && config.nextjs(enableNextjs === true ? {} : enableNextjs),
    enableReact && react({
      ...typescriptOptions,
      overrides: enableReact === true ? {} : enableReact,
      tsconfigPath,
    } as any), // ? NOTE: buggy even in antfu source... it's okay

    enableMarkdown && markdown({
      componentExts,
      overrides: enableMarkdown === true ? {} : enableMarkdown,
    }),

    // enableJsdoc && jsdoc({}),
  );

  if (stylisticOptions) {
    configs.push(config.stylistic(stylisticOptions));
  }

  if (enableCatalogs) {
    configs.push(
      pnpm(),
    );
  }

  if (enableJsonc) {
    configs.push(
      jsonc({
        overrides: enableJsonc === true ? { 'style/comma-dangle': ['error', 'never'] } : enableJsonc,
        stylistic: stylisticOptions,
      }),
      sortPackageJson(),
      sortTsconfig(),
    );
  }

  if (enableYaml) {
    configs.push(yaml({
      overrides: enableYaml === true ? {} : enableYaml,
      stylistic: stylisticOptions,
    }));
  }

  if (enableToml) {
    configs.push(toml({
      overrides: enableToml === true ? {} : enableToml,
      stylistic: stylisticOptions,
    }));
  }

  configs.push(
    // enableAstro
    //   ? [
    //       pluginAstro.configs['flat/recommended'].flat(),
    //       {
    //         // files: [GLOB_ASTRO],
    //         name: 'xaxa/astro/overrides',
    //         rules: {
    //           'astro/sort-attributes': ['error', {
    //             ignoreCase: true,
    //             order: 'asc',
    //             type: 'alphabetical',
    //           }],
    //         },
    //       },
    //     ].flat()
    //   : {},
    enableAstro && antfuAstro({
      overrides: enableAstro === true ? {} : enableAstro,
      stylistic: stylisticOptions,
    }),
    enableWgw && config.wgw({
      isAstro: Boolean(enableAstro),
      isInEditor,
      isTypescript,
      overrides: enableWgw === true ? {} : enableWgw,
    }),
  );

  configs.push(
    disables(),
  );

  if (enableMarkdown) {
    opts.formatters = (opts.formatters || {}) as OptionsFormatters;
    opts.formatters = { markdown: 'prettier', ...opts.formatters } as OptionsFormatters;
  }
  // if (enableAstro) {
  //   opts.formatters = (opts.formatters || {}) as OptionsFormatters;
  //   opts.formatters = { astro: 'prettier', ...opts.formatters } as OptionsFormatters;
  // }

  if (opts.formatters) {
    configs.push(formatters(
      opts.formatters,
      typeof stylisticOptions === 'boolean' ? {} : stylisticOptions,
    ));
  }

  let composer = new FlatConfigComposer();
  composer = composer
    .append(
      ...configs.flat().filter(Boolean),
      ...userConfigs.flat().filter(Boolean) as any, // ? NOTE: bruh... it's okay
    );

  if (autoRenamePlugins) {
    composer = composer
      .renamePlugins(defaultPluginRenaming);
  }

  if (isInEditor) {
    composer = composer
      .disableRulesFix(disableFixForRules, {
        builtinRules: () => {
          const imported = import(['eslint', 'use-at-your-own-risk'].join('/'));

          return imported.then((r) => r.builtinRules);
        },
      });
  }

  return composer;
}

export {
  xaxa,
};
