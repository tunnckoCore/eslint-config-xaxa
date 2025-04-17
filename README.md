# eslint-config-xaxa

Modern, ESLint v9+ compatible, config based on Airbnb with support for Astro, Prettier, Plugin
Promise, Plugin Unicorn, Plugin Import, React and Typescript.

## Motivation

Airbnb Config is basically dead and the main creator is struggling to keep up, and he also left
Airbnb a long time ago. So, i got the latest (as of April 2025) from the master branch of the repo
and added my preferences on top - i was doing that on my own config for YEARS and never changed.

It's time for ESLint v9.

Versioning policy scheme is `YY.major.patch`, but i don't change things frequently and i don't plan
to support and keep track of what's going on with ESLint rules, changes and whatnot.

Versions of dependencies are locked, so there won't be any problems, ever! In the past year, every
few weeks when i get into my editor, something breaks.. And no, i didn't updated versions, i didn't
changed the lockfiles, i didn't even opened my laptop for weeks on end. But editors were throwing
errors constantly.

## Note on Prettier

This config uses `eslint-plugin-prettier` to both disable and apply prettier. But it includes my
opinionated Prettier config with several plugins like Organize Imports, Tailwind CSS, Astro, and
Package.json sorting. You can include it on you `prettier.config.js` and install prettier
separately.

## Previous versions

Previously there was `eslint-config-xaxa` which was more or less the same thing, and was behind the
`xaxa` cli and library wrapper for ESLint. Maybe i'll update the `xaxa` soon to use ESLint 9 and
that config. For now just config is fine for me.

## Install

using Bun, JSR, pnpm, npm, or whatever:

```
bun add -D eslint-config-xaxa
```

## Usage

For ESLint prior to v9 you can use `eslint-config-tunnckocore` which is basically what i used in the
past few years, otherwise for v9+ and above, use the flat config:

```js
import eslintConfigXaxa from 'eslint-config-xaxa';

export default eslintConfigXaxa;
```

For Prettier make sure your `prettier.config.js` is in ES Modules format, and you should have
`"type": "module"` in your package.json.

```js
import prettierConfigXaxa from 'eslint-config-xaxa/prettier';

export default prettierConfigXaxa;
```

If you want to use just the Airbnb Base Config which just includes their style and few rules from
the import plugin:

```js
import airbnbConfig from 'eslint-config-xaxa/airbnb-base';

export default airbnbConfig;
```
