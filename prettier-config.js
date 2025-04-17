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
  endOfLine: 'lf',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  proseWrap: 'always',
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,

  // !NOTE: do not use root level `plugins`, put it on overrides

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
        plugins: ['prettier-plugin-solidity'],
        parser: 'solidity-parse',
        printWidth: 100,
        tabWidth: 4,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: false,
      },
    },
  ],
};

export default config;
