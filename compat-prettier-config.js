const sortImportsPlugin = {
  importOrder: [
    '<BUILTIN_MODULES>',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/(.*)$',
    '^@/(.*)$',
    '^~(.*)$',
    '^[./]',
  ],
};

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  overrides: [
    {
      files: ['**/.all-contributorsrc'],
      options: { parser: 'json' },
    },
    {
      files: ['**/.vscode/settings.json'],
      options: { parser: 'jsonc' },
    },
    // {
    //   files: ["**/*.json"],
    //   options: {
    //     parser: "json-stringify",
    //   },
    // },
    {
      files: ['**/*.{mjs,js,jsx}'],
      options: {
        ...sortImportsPlugin,
        // !NOTE: tailwind plugin must be last
        plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      options: {
        ...sortImportsPlugin,
        parser: 'typescript',
        // !NOTE: tailwind plugin must be last
        plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
      },
    },
    {
      files: ['**/tsconfig*.json'],
      options: { parser: 'jsonc' },
    },
    {
      files: ['**/package.json'],
      options: {
        parser: 'json-stringify',
        plugins: ['prettier-plugin-pkgjson'],
      },
    },
    {
      files: ['**/*.md'],
      options: {
        parser: 'markdown',
        proseWrap: 'always',
      },
    },
    {
      files: ['**/*.mdx'],
      options: {
        parser: 'mdx',
        proseWrap: 'always',
      },
    },
    {
      files: ['**/*.astro'],
      options: {
        parser: 'astro',
        // !NOTE: tailwind plugin must be last
        plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
      },
    },
    {
      files: ['**/*.sol'],
      options: {
        bracketSpacing: false,
        parser: 'solidity-parse',
        plugins: ['prettier-plugin-solidity'],
        printWidth: 100,
        singleQuote: false,
        tabWidth: 4,
        useTabs: false,
      },
    },
  ],
  printWidth: 100,
  proseWrap: 'always',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',

  // !NOTE: do not use root level `plugins`, put it on overrides

  useTabs: false,
};

export default config;
