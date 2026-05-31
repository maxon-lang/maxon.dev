# maxon-web

The website for the [Maxon programming language](https://maxon.dev) — a marketing landing
page plus full documentation, examples, and install instructions.

Built with **Astro** + **Starlight** + **Tailwind**, output as a static site. Maxon code is
syntax-highlighted at build time using the language's own TextMate grammar (the same one the
VS Code extension ships), so highlighting always matches the editor.

## Local development

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # static build to ./dist
npm run preview    # serve the built site locally
```

Requires Node.js 20+.

## Project structure

```
src/
  pages/                 Bespoke marketing pages (Astro)
    index.astro          Landing — "Written by AI, for AI"
    examples.astro       Curated, highlighted example programs
    install.astro        Per-OS build-from-source instructions
  layouts/
    MarketingLayout.astro  Shared shell (nav/footer) for the marketing pages
  components/
    MaxonCode.astro      Maxon-highlighted code block for marketing pages
  content/docs/docs/     Starlight docs collection (served under /docs/*)
    getting-started/     Hand-authored intro / install / first-program
    language/            Language Reference, split by topic
    stdlib/  cli/  best-practices/  spec/
    blog/                Blog posts (starlight-blog plugin) — served at /blog/
  grammars/
    maxon.tmLanguage.json  Maxon TextMate grammar (copied from the compiler repo)
  examples/              Real .maxon programs (copied from the compiler repo)
  assets/  styles/
public/                  favicon, og image
astro.config.mjs         Site config, sidebar, Shiki/Expressive-Code grammar registration
```

The docs live at `src/content/docs/docs/` (nested one level) so Starlight serves them under
`/docs/…` rather than the site root.

## Content sourcing & re-sync

Documentation, the syntax grammar, and the example programs are **copied** from the Maxon
compiler repo (a sibling checkout at `../maxon`) and curated for a public audience. They are
not auto-synced — refresh them deliberately when the language docs change.

| Website file | Source in `../maxon` |
| --- | --- |
| `src/grammars/maxon.tmLanguage.json` | `vscode-extension/syntaxes/maxon.tmLanguage.json` |
| `src/examples/*.maxon` | `examples/*.maxon` |
| `src/content/docs/docs/language/*` | `docs/LANGUAGE_REFERENCE.md` (split by section) |
| `src/content/docs/docs/stdlib/` | `docs/STDLIB_REFERENCE.md` |
| `src/content/docs/docs/cli/` | `docs/CLI_REFERENCE.md` |
| `src/content/docs/docs/best-practices/*` | `docs/WRITING_MAXON_CODE.md`, `docs/BEST_PRACTICES.md` |
| `src/content/docs/docs/spec/` | `docs/BNF_SYNTAX.md` |

The `getting-started/` pages are written for this site and have no single source file.

When re-importing curated Markdown:

- Add Starlight front matter (`title`, `description`, `sidebar.order`). **Quote any
  `description` that contains a colon** — unquoted `key: value` colons break the YAML.
- Tag Maxon code fences ` ```maxon ` so they highlight; leave shell fences as ` ```bash `.
- Trim compiler-repo-internal notes, but keep the agent-facing "how to write Maxon" framing —
  it's intentional and on-brand.

## Blog

The blog uses the [`starlight-blog`](https://github.com/HiDeoo/starlight-blog) plugin
(pinned to `0.16.x` for Starlight 0.30 compatibility). It's a mixed feed — release notes and
essays — served at `/blog/`, with an RSS feed at `/blog/rss.xml`, plus tag and author pages.

To add a post, drop a Markdown file in `src/content/docs/blog/`:

```markdown
---
title: Maxon v1.1
description: One-line summary for SEO and the post header.
date: 2026-06-15            # YYYY-MM-DD; controls ordering
authors: maxon             # author key defined in astro.config.mjs
tags:
  - release                # free-form; tag pages are generated automatically
excerpt: Shown on the blog index and in social/RSS previews.
---

Post body in Markdown. Maxon code fences (```maxon) highlight automatically.
```

Authors are defined once in `astro.config.mjs` under the `starlightBlog({ authors })` option.

## Brand

- Accent: Maxon cyan `#00ADD8` (Tailwind `brand`, and the Starlight accent in
  `src/styles/theme.css`).
- The logo/favicon reuse the diamond-"M" mark from the VS Code extension.
- Marketing pages are dark, terminal-inspired; the docs follow the light/dark toggle.

## Deployment

The site is host-agnostic static output (`./dist`). Two good options for `maxon.dev`
(registered at Namecheap):

### Vercel — keep DNS at Namecheap

Import the repo in Vercel (framework preset: Astro). Then in Namecheap → **Advanced DNS**:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Add `maxon.dev` (and `www.maxon.dev`) as domains in Vercel; it issues TLS automatically.
Set one as the canonical and redirect the other.

### Cloudflare Pages

Either **delegate nameservers** to Cloudflare (set the two Cloudflare nameservers in Namecheap;
Cloudflare then manages DNS and Pages creates the records), **or** keep Namecheap DNS and add:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `<project>.pages.dev` |
| CNAME | `@` | `<project>.pages.dev` (Namecheap flattens apex CNAMEs) |

In both cases, enable the apex ↔ www redirect and force HTTPS.

## License

Maxon is dual-licensed under MIT and Apache-2.0.
