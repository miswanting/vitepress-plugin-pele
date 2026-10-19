import type { MarkdownRenderer } from "vitepress"
import { markdownItPele, type PeleMermaidOptions } from "./markdown-it"

export type { PeleMermaidOptions } from "./markdown-it"
export { markdownItPele }
export { clearDiagramCache } from "./markdown-it"

/**
 * Default width of `.VPDoc.has-aside .content-container` in the VitePress
 * default theme: 43rem = 688px.
 */
export const VITEPRESS_CONTENT_WIDTH = 688

/**
 * VitePress entry point.
 *
 * ```ts
 * import { defineConfig } from 'vitepress'
 * import { peleMermaid } from 'vitepress-plugin-pele'
 *
 * export default defineConfig({
 *   markdown: { config: peleMermaid() },
 * })
 * ```
 */
export function peleMermaid(options: PeleMermaidOptions = {}) {
  return (md: MarkdownRenderer): void => {
    markdownItPele(md, { maxWidth: VITEPRESS_CONTENT_WIDTH, ...options })
  }
}

export default peleMermaid
