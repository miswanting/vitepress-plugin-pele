import { defineConfig } from "vitepress"
import { peleMermaid } from "vitepress-plugin-pele"

export default defineConfig({
  title: "vitepress-plugin-pele",
  description:
    "Mermaid diagrams for VitePress, rendered at build time with Pele",
  cleanUrls: true,
  markdown: {
    config: peleMermaid(),
  },
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "Gallery", link: "/gallery" },
      { text: "Sizing", link: "/sizing" },
      { text: "Theming", link: "/theming" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Quick start", link: "/guide" }],
      },
      {
        text: "Examples",
        items: [
          { text: "Diagram gallery", link: "/gallery" },
          { text: "Sizing and widths", link: "/sizing" },
          { text: "Theming", link: "/theming" },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/miswanting/vitepress-plugin-pele",
      },
    ],
    footer: {
      message: "MIT licensed. Demo runs VitePress 2.0.0-alpha.20.",
      copyright: "Copyright © 2026 姬飞雨",
    },
    outline: { level: [2, 3] },
  },
})
