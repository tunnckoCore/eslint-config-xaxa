# eslint-config-xaxa

> The ultimate ESLint config - successor to Airbnb Config. Built on Anthony Fu's ESLint config,
> Airbnb, UnoCSS, Tailwind, JSX, ESLint Stylistic, Perfectionist, React, TypeScript, Astro,
> ~~JSDocs~~ (soon), Prettier\*, Node.js, Unicorns, Promises, and more.

## Motivation

First things first. It uses and sits (inherits) on top of `@antfu/eslint-config` as core (thus you
can read more info there), but also tweaks other stuff and adds Airbnb.

Fully packed ESLint config for all your needs. It includes all the rules you need to get started
with a new project, and it also includes all the rules you need to keep your code clean and
consistent. It's based on [@antfu](https://github.com/antfu), and Airbnb's ESLint configs. It's well
suited for any project from JavaScript to TypeScript, from React to Preact, from Node.js to Deno,
from Astro to Next.js, from Tailwind to UnoCSS, from JSON to YAML, from TOML to Markdown, and more.

The tailwind support is based on `eslint-plugin-tailwindcss`, but it doesn't remove the extra
whitespace, so you can use UnoCSS with Tailwind compatible preset `@unocss/preset-wind4`, thus you
should use `unocss: true` instead of `tailwind: true`, or just add `unocss.config.ts` (or any UnoCSS
config file) to the root of your project and it will be auto-detected and enabled.

React/Preact and TypeScript are auto-detected too. If you have `react` in your dependencies, it will
enable the React rules. If React is detect, the JSX will also be auto-enabled. If you have
`typescript` in your dependencies, it will add the TypeScript rules too. If you use `pnpm` as
package manager, that will be auto-detected too.

It's smart. It's jam-packed. It's the ultimate ESLint config. Built over many years of experience
and many projects. The config's core, around Airbnb, was used in all my 300+ packages with several
tweaks over the years. The config is well tested and battle-proven.

> [!NOTE]
>
> As of 2025, since `eslint-config-airbnb` is in pretty bad state, i migrated it entirely to ESLint
> v9 and the new flat-config system. Turns out, most of Airbnb rules are now A) in
> [ESLint Stylistic](https://eslint.style) (an initiative to move out most of the styling rules out
> of ESLint Core), and B) in modern `eslint-plugin-import-x` () and `eslint-plugin-n` (node). You
> should keep in mind that i _did not_ migrated Airbnb's React config. But I included a lot more
> modern stuff that handles everything well-enough.

Currently, the focus is to avoid the use of Prettier as much as possible. You can read more on
[Anthony's blog](https://antfu.me/posts/why-not-prettier). The config is built to be used with
ESLint's built-in formatter and Language API which allows to lint any language, not just JS/TS.
There is an option `formatters` that can set to enable any of the supported formatters - that's done
by `@antfu/eslint-config` and `eslint-plugin-format`.

For best experience in TypeScript React projects, you should use UnoCSS compatibility layer for
TailwindCSS, like `@unocss/preset-wind4`. The `xaxa` config for that will look like this:

```ts
import xaxa from 'eslint-config-xaxa';

// eslint.config.ts
export default xaxa({
  nextjs: true,
  // unocss: true, // auto-detected if you have `unocss.config.ts` or `uno.config.ts` in the root of your project
  // typescript: true, // auto-detected if you have `typescript` in your dependencies
  // react: true, // auto-detected if you have `react` or `preact` in your dependencies
  // jsx: true, // auto-detected if you have `react` or `preact` in your dependencies
});
```

and add UnoCSS config like

```ts
// unocss.config.ts
import presetWind4 from '@unocss/preset-wind4';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [presetWind4({ preflights: { reset: true } })],
});
```

- it will format & lint source code with ESLint & Stylistic
- it will support TypeScript + React + JSX + Next.js
- it will support TailwindCSS, and it will sort classes, and remove the extra whitespaces in
  classnames
- it will support TOML, JSON, YAML, Markdown, and Pnpm automatically

## As ModernBnB

You can use this config as a replacement for the Airbnb config. If you don't want any of the extra
features and goodies, you can just import the `airbnb` config from this package and use it as a base
for your own config. **It does have several small tweaks (consider it as Airbnb v20).** It is
cleaned up and some rules were remove/replaced due to deprecation or straight removal from ESLint or
other plugins.

To use it as base you can do this:

```ts
// ?NOTE: important - the one exported from the main is different
import airbnb from 'eslint-config-xaxa/airbnb';

export default airbnb({
  // overrides: {} // add your own overrides here to the Airbnb config
  // imports: false // disable the import plugin rules, default true
  // typescript: false // auto-detected and enabled if `typescript` is installed
  // typescript: {
  //   tsconfigPath: './tsconfig.json', // path to your tsconfig.json file
  //   overrides: {
  //     // rules overrides for the typescript-eslint rules
  //   },
  // }
});
```

Instead of passsing `typescript: true` (which is the default / auto-detected), you can pass anything
that the `@antfu/eslint-config` supports, like `overrides`, `tsconfigPath`, `parserOptions`, etc.
Start typing and you will see hints if you're in eslint `.ts` config file.

## Install

Keep in mind that this package is written TypeScript and published as ESModules only, so you need to
use `eslint.config.js` or `.ts` file to use it

```bash
npm install --save-dev eslint eslint-config-xaxa
```

## Usage

Create a file named `eslint.config.ts` in the root of your project and add the following code:

```ts
import xaxa from 'eslint-config-xaxa';

// You can pass `OptionsXaxa` in the first argument,
// and user eslint config in the next arguments
export default xaxa({
  // react: true, // auto-detected and enabled if `react` / `preact` is installed
  semi: false, // Disable semi-colons, default is true
  // jsx: true, // Enable only JSX, enabled when react is true
  // type: 'lib', // default is 'lib', can be 'app'
  // typescript: true, // auto-detected and enabled
  // airbnb: {
  //   // Airbnb overrides, check the options below
  // },
  // pnpm: true, // Enable pnpm support, auto-detected and enabled based on existence of `pnpm-lock.yaml`
  // unocss: false // auto-detected and enabled if UnoCSS config files detected
});
```

## Options

Full list of options can be found below. If you want to override anything, you can by passing an
object instead of boolean, and follow the intellisense hints.

```ts
export interface OptionsAirbnb {
  imports?: boolean;
  typescript?: boolean;
  globals?: typeof globals;
  overrides?: TypedFlatConfigItem['rules'];
  setup?: Linter.Config<Linter.RulesRecord>;
  linterOptions?: Linter.LinterOptions;
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
```
