import type { Linter } from 'eslint';

import fs from 'node:fs';
import path from 'node:path';

export type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore';

export type Awaitable<T> = T | Promise<T>;
export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord>, 'plugins'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   */
  plugins?: Record<string, any>;
};

export function isPnpm(cwd: string = process.cwd()): boolean {
  const isPnpmPackageManager = process.env.npm_package_packageManager?.includes('pnpm@');
  if (isPnpmPackageManager) {
    return true;
  }

  return (
    fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))
    || fs.existsSync(path.join(cwd, 'pnpm-lock.yml'))
  );
}
export function isUnoCSS(cwd: string = process.cwd()): boolean {
  return (
    fs.existsSync(path.join(cwd, 'uno.config.ts'))
    || fs.existsSync(path.join(cwd, 'unocss.config.ts'))

    || fs.existsSync(path.join(cwd, 'uno.config.js'))
    || fs.existsSync(path.join(cwd, 'unocss.config.js'))

    || fs.existsSync(path.join(cwd, 'uno.config.mts'))
    || fs.existsSync(path.join(cwd, 'unocss.config.mts'))

    || fs.existsSync(path.join(cwd, 'uno.config.mjs'))
    || fs.existsSync(path.join(cwd, 'unocss.config.mjs'))
  );
}
