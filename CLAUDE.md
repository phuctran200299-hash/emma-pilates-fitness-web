# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Static HTML/CSS/JS design mockups for redesigning the Emma Pilates & Fitness website (live site: https://emmapilates.vn/, WordPress 6.4 + Flatsome child theme + WooCommerce + Contact Form 7). Nothing here is the production site. The mockups are handed to the client as published claude.ai Artifacts and later re-implemented in WordPress. All content, docs and commit messages are in Vietnamese. Keep new UI text in Vietnamese with full diacritics.

There is no package manager, no build system, no linter and no test suite. Open the HTML files in a browser, or serve a folder with `python -m http.server`. Use a server for `emma-design/` and `emma-mockup/` because they load relative assets.

### `hallmark/`: a third-party tool, not project code

An untracked git clone of https://github.com/Nutlope/hallmark (v2.0.0, MIT, by Together AI). It has its own `.git`, so don't edit it or commit it into this repo. It is an agent skill whose purpose is to make generated web pages "look made, not generated". It is **not installed** as a skill in this environment, so it only applies when the user explicitly asks to use Hallmark.

- `skills/hallmark/SKILL.md`: the skill itself. It defines a "Floor" of rules that can't be waived (colors and fonts only through `:root` tokens, no `transition: all`, `overflow-x: clip` instead of `hidden`, `:focus-visible` everywhere, `prefers-reduced-motion`, no invented metrics or testimonials, no eyebrows or tracked-caps labels, the hero must fit in 1280×800, …), waivable "Reflex" gates and a build flow: pre-flight → ask once → deal a theme → build the hero first → sweep. `references/` holds the detailed rules (`gates.md`, `layout.md`, `redesign.md`, …) and 50 themes (`references/themes/<slug>.md` + `.jpg`).
- `skills/hallmark/scripts/`: zero-dependency Node tools. `sloplint.mjs` lints HTML/CSS. `theme.mjs` handles `deal`, `draw`, `scaffold`, `photos`, `log`, `validate` and `index`. `capture.mjs` takes screenshots. `install.mjs` / `install-hook.mjs` install the skill and an edit-time hook.
- `site/` is the usehallmark.com website (static, deployed on Vercel). `eval/` is the internal benchmark harness and isn't shipped.

Useful commands if you're asked to use it on the Emma pages (Node 18+; `--render` also needs `npm i -g puppeteer-core` and Chrome, but static checks run without them):

```
node hallmark/skills/hallmark/scripts/sloplint.mjs emma-design/index.html            # static lint
node hallmark/skills/hallmark/scripts/sloplint.mjs emma-design/index.html --render   # also measure in a browser
```

Hallmark only modifies an existing design when its name is called (`redesign <path>` / `audit <path>`). The Emma mockups follow their own design system (see below), so don't apply the Hallmark Floor to them on your own initiative.

## The three mockup folders

### `emma-design/`: current main design
- A single-page app: `index.html` + `emma.css` + `emma.js` (plain JS, no dependencies) + `assets/`.
- **Hash router** (`PAGES` map in `emma.js`): each route such as `#/pilates` maps to a page section `<section id="p-<page>">` in `index.html`. Many sub-routes share one parent page (for example `pilates`, `fitness` and `bang-gia` all show `dich-vu`). `paint()` toggles `hidden` on the page sections and sets `aria-current` on the nav. Page changes use `document.startViewTransition` when it's available. `#/san-pham/<id>` builds the product page on the fly (`buildProduct`).
- **All content lives in the `DATA` object** at the top of `emma.js` (machines, coaches, posts, services and so on). The render functions (`machineCard`, `buildStatic`, `buildFranchisePages`, …) write it into the elements named by `fill(id, html)`. Change content in `DATA`, not in the markup. The plan is for `DATA` to become WordPress custom post types / ACF fields.
- `data-cms="…"` attributes mark the blocks the client will be able to edit. The "Hiện trường quản trị" toggle adds `.cms` to `<html>` to show these labels.
- Forms and info popups are `<dialog>`s driven by the `FORMS` / `INFO` objects. `FX` handles the scroll-reveal (`.rv` → `.in`).
- Design tokens are in `:root` at the top of `emma.css`. The brand color is the logo teal `#63C7C8` (decoration only). Text and buttons use `--accent #0C6E71` for AA contrast. The palette is light only and doesn't follow the viewer's dark mode. Fonts are Cormorant Garamond + Manrope.

### `emma-mockup/`: earlier design variants A–F
- `index.html` = A (fonv style), `index-original-design.html` = B (the client asked to keep it unchanged), `variant-*.html` = the other variants. C/D/E share `shared/fx.css` + `shared/fx.js`. F (`variant-f-fonv.html`) has its CSS and JS inline and holds 9 pages.
- Images are in `img/`. `docs/` holds the client report, the WordPress implementation spec (`02-ky-thuat-trien-khai.md`: tokens, block → Flatsome mapping, effects) and the analysis of the reference site fonv.co.kr. `docs/README.md` lists the published Artifact URL for each variant and the open questions about the client's content (two different emails, conflicting opening hours).

### `emma-ban-e/`
A finished single-file build ("Emma Pearl Studio", based on variant E): CSS/JS and base64 images are inlined. Treat it as build output.

## Building single-file versions for publishing

Artifacts must be self-contained, so the variants are bundled with images inlined as data URIs:

```
cd emma-mockup
python build.py <out.html>                      # variant A (index.html)
python build2.py <variant.html> <out.html>      # C/D/E/F: also inlines shared/fx.css and shared/fx.js
```

`build2.py` only replaces the exact tags `<link rel="stylesheet" href="shared/fx.css">` and `<script src="shared/fx.js"></script>`, and only rewrites paths that start with `img/` inside quotes. Keep those references in exactly that form. Write build outputs and test files outside the repo or under the names in `.gitignore` (`_probe*.html`, `_preview*.html`, …).

## Constraints carried over from the WordPress spec

- Effects and layout must be easy to move into the child theme as `assets/emma.css` + `assets/emma.js`. Use no large libraries and keep the JS plain.
- Content must stay editable by the client (UX Builder / posts), so don't hard-code content inside layout code.
- Low-resolution source photos (230px) were removed on purpose and replaced with color blocks. Don't add them back.
