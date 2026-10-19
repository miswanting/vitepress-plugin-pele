---
layout: home

hero:
  name: vitepress-plugin-pele
  text: Mermaid diagrams, rendered at build time
  tagline: Zero client-side JavaScript. Inline SVG. SSR-ready. Theme-aware.
  actions:
    - theme: brand
      text: Diagram gallery
      link: /gallery
    - theme: alt
      text: Quick start
      link: /guide
    - theme: alt
      text: GitHub
      link: https://github.com/miswanting/vitepress-plugin-pele

features:
  - icon: ⚡
    title: Build-time rendering
    details: Pele turns mermaid fences into inline SVG while VitePress builds. Nothing diagram-related ships to the browser.
  - icon: 🧩
    title: Zero client JS
    details: No mermaid.js bundle, no hydration step and no layout shift.
  - icon: 🌗
    title: Light and dark
    details: Diagrams follow the VitePress palette through CSS variables, without re-rendering.
  - icon: 🌐
    title: SSR and no-JS friendly
    details: Crawlers, print output and readers without JavaScript still get the diagram.
  - icon: 🛠
    title: Errors you can act on
    details: A broken diagram warns with its file and line, or fails CI with onError "throw".
  - icon: 📦
    title: Markdown-it core
    details: The VitePress entry is a thin wrapper around a generic markdown-it plugin.
---

## A diagram, right now

This is a plain `mermaid` fence, compiled during the build and served as inline SVG.

```mermaid
flowchart LR
  A[Write a mermaid fence] --> B[VitePress builds]
  B --> C[Pele renders SVG]
  C --> D[Inline HTML]
  D --> E[No mermaid.js shipped]
```

Toggle the color mode in the navbar. The SVG does not re-render — it is themed with CSS variables.

## Why not mermaid.js?

| | mermaid.js plugin | this plugin |
| --- | --- | --- |
| Client JS | ~1.6 MB | **0 bytes** |
| Rendering | in the browser | **at build time** |
| SSR / no-JS | diagram missing | **inline SVG** |
| Layout shift | after hydration | **none** |

Continue with the [quick start](/guide) or browse the [diagram gallery](/gallery).
