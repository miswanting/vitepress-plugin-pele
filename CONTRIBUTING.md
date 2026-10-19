# Contributing

Thanks for taking the time to contribute! This project is a small, focused plugin; bug reports, reproductions, documentation fixes and pull requests are all welcome.

## Requirements

- Node.js 20 or newer (VitePress 2 requires Node 22)
- pnpm 12 (`packageManager` in `package.json` is authoritative)

```bash
git clone https://github.com/miswanting/vitepress-plugin-pele.git
cd vitepress-plugin-pele
pnpm install
```

## Repository layout

| Path | Purpose |
| --- | --- |
| `src/core.ts` | Rendering, options, error handling, cache |
| `src/markdown-it.ts` | Framework-agnostic markdown-it fence plugin |
| `src/index.ts` | VitePress entry (`peleMermaid`) |
| `style.css` | `--pele-*` → VitePress variable mapping |
| `tests/` | Unit tests and the VitePress build fixture |
| `scripts/assert-build.mjs` | Assertions for the e2e fixture output |

## Commands

| Command | Description |
| --- | --- |
| `pnpm build` | Build `dist/` with tsdown |
| `pnpm typecheck` | Type-check sources and tests |
| `pnpm test` | Run unit and VitePress markdown tests |
| `pnpm test:e2e` | Build the package and a fixture site, then assert the HTML |
| `pnpm check` | Build, typecheck, unit tests and e2e |

Please run `pnpm check` before opening a pull request.

## Tests

- Unit tests live in `tests/markdown-it.test.ts` and run against a real `markdown-it` instance.
- `tests/vitepress.test.ts` exercises the VitePress markdown pipeline through `createMarkdownRenderer`.
- `tests/fixtures/site` is a minimal VitePress site used by `test:e2e`; it imports the built package through its own package name, so it also validates the published entry points.

When changing rendering behavior, add a test that would fail without your change. When changing user-facing options, update the README and the option table.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: support width= fence option
fix: fall back to a code block on syntax errors
docs: clarify theme setup
chore: bump pele to 1.7.0
```

Keep pull requests focused. One logical change per PR makes review and changelog generation much easier.

## Pull requests

1. Fork the repository and create a branch from `main`.
2. Make your change, add tests, update documentation when needed.
3. Run `pnpm check`.
4. Open a pull request using the template and describe the problem and the solution.

A maintainer will review as soon as possible. For larger changes, please open an issue first so we can agree on the approach.

## Release process (maintainers)

1. Update `version` in `package.json` and add an entry to `CHANGELOG.md`.
2. Commit the release (`chore: release v0.2.0`).
3. Tag and push:

   ```bash
   git tag v0.2.0
   git push origin main --tags
   ```

4. The [Release workflow](.github/workflows/release.yml) builds, tests and publishes to npm with provenance.

The repository needs an `NPM_TOKEN` secret with publish access to the `vitepress-plugin-pele` package.
