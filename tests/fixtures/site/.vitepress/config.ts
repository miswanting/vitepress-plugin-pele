import { defineConfig } from "vitepress"
import { peleMermaid } from "vitepress-plugin-pele"

export default defineConfig({
  title: "Pele fixture",
  markdown: {
    config: peleMermaid(),
  },
})
