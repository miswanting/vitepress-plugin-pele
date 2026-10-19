# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-19

### Added

- Build-time Mermaid rendering for VitePress via Pele, with inline SVG output and no client-side JavaScript.
- `peleMermaid()` VitePress entry and framework-agnostic `vitepress-plugin-pele/markdown-it` plugin.
- `width=` / `maxWidth=` fence options that map to Pele's `maxWidth`.
- Light/dark theming through `--pele-*` CSS variables mapped to the VitePress palette.
- `v-pre` wrapping so `{{ ... }}` inside diagram labels is preserved.
- Graceful error handling with `warn`, `throw` and `code` modes, including file and line information.
- Build cache for repeated diagrams, accessible id prefixes, and a documented theme stylesheet import.
- Unit tests, a VitePress e2e fixture, CI and release workflows.

[Unreleased]: https://github.com/miswanting/vitepress-plugin-pele/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/miswanting/vitepress-plugin-pele/releases/tag/v0.1.0
