// @ts-check

import keystatic from '@keystatic/astro';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

const isDev = process.argv.some((a) => a === 'dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.searchirl.ie',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [mdx(), sitemap(), keystatic(), react()],

  fonts: [
      {
          provider: fontProviders.google(),
          name: 'Space Grotesk',
          cssVariable: '--font-display',
          fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
          weights: [500, 700],
      },
      {
          provider: fontProviders.google(),
          name: 'Inter',
          cssVariable: '--font-body',
          fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
          weights: [400, 500, 600],
      },
      {
          provider: fontProviders.google(),
          name: 'JetBrains Mono',
          cssVariable: '--font-mono',
          fallbacks: ['ui-monospace', 'monospace'],
          weights: [400, 500],
      },
  ],

  adapter: isDev ? undefined : netlify(),
});