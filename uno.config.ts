/* eslint-disable node/no-unpublished-import */
import presetWind4 from '@unocss/preset-wind4';
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4({
      preflights: { reset: true },
    }),
  ],
});
