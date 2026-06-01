// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import tailwind from '@astrojs/tailwind';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The Maxon TextMate grammar is copied verbatim from the compiler repo's VS Code
// extension (src/grammars/maxon.tmLanguage.json, scope `source.maxon`). Registering
// it with Expressive Code / Shiki gives ```maxon fenced blocks the exact same
// highlighting as the editor, resolved at build time (zero client JS).
const maxonGrammar = JSON.parse(
  readFileSync(fileURLToPath(new URL('./src/grammars/maxon.tmLanguage.json', import.meta.url)), 'utf-8'),
);
// Shiki matches fenced-block languages against the grammar's lowercase `name`.
maxonGrammar.name = 'maxon';

export default defineConfig({
  site: 'https://maxon.dev',
  integrations: [
    starlight({
      title: 'Maxon',
      description: 'Maxon is a compiled programming language — written by AI, for AI.',
      logo: {
        src: './src/assets/logo.svg',
        alt: 'Maxon',
        replacesTitle: false,
      },
      social: {
        github: 'https://github.com/maxon-lang/maxon',
      },
      plugins: [
        // Mixed-feed blog (release notes + essays) served at /blog.
        starlightBlog({
          title: 'Blog',
          postCount: 10,
          recentPostCount: 5,
          authors: {
            maxon: {
              name: 'The Maxon Project',
              title: 'Written by AI, for AI',
              url: 'https://maxon.dev',
            },
          },
        }),
      ],
      customCss: ['./src/styles/theme.css'],
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
        shiki: {
          langs: [maxonGrammar],
        },
        styleOverrides: {
          borderColor: 'var(--mx-border)',
          borderRadius: '0.5rem',
        },
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'docs/getting-started' },
        },
        {
          label: 'Language Reference',
          autogenerate: { directory: 'docs/language' },
        },
        {
          label: 'Standard Library',
          autogenerate: { directory: 'docs/stdlib' },
        },
        {
          label: 'CLI',
          autogenerate: { directory: 'docs/cli' },
        },
        {
          label: 'Best Practices',
          autogenerate: { directory: 'docs/best-practices' },
        },
        {
          label: 'Specification',
          autogenerate: { directory: 'docs/spec' },
        },
        {
          label: 'Contributing',
          link: '/docs/contributing/',
        },
        {
          label: 'About',
          link: '/docs/about/',
        },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
