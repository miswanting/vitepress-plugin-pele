# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 0.1.x | yes |

While the project is pre-1.0, only the latest published version receives security fixes.

## Reporting a vulnerability

Please **do not** open a public issue for security problems.

Report privately through [GitHub Security Advisories](https://github.com/miswanting/vitepress-plugin-pele/security/advisories/new).

Include:

- the affected version(s),
- a minimal reproduction or proof of concept,
- the impact you believe the issue has,
- any suggested fix.

You can expect an initial acknowledgement within a few days. Once the issue is confirmed and fixed, a release will be published and the advisory disclosed with credit to the reporter unless you prefer to stay anonymous.

## Scope

This plugin runs at build time and renders repository-controlled Markdown. The most relevant classes of issues are:

- SVG injection or unsafe link/image schemes from diagram sources,
- dependency vulnerabilities in `pele` or the build toolchain,
- publishing or provenance issues in the release workflow.

Reports about diagrams authored by untrusted users are especially welcome, since build-time rendering assumes the Markdown itself is trusted unless stated otherwise.
