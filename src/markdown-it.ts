import type MarkdownIt from "markdown-it"
import { renderDiagram, type PeleMermaidOptions } from "./core"

export type { PeleMermaidOptions } from "./core"
export { clearDiagramCache } from "./core"

interface MarkdownEnv {
  path?: string
  relativePath?: string
}

/**
 * Render ```mermaid fences to inline SVG at build time.
 *
 * Framework agnostic: this is a regular markdown-it plugin, so it works with
 * VitePress, VuePress, Eleventy or any other markdown-it based pipeline.
 */
export function markdownItPele(
  md: MarkdownIt,
  options: PeleMermaidOptions = {},
): void {
  const original = md.renderer.rules.fence

  if (!original) {
    throw new Error(
      "[vitepress-plugin-pele] Expected markdown-it's default fence renderer to be registered.",
    )
  }

  md.renderer.rules.fence = (tokens, idx, renderOptions, env, self) => {
    const token = tokens[idx]
    if (!token) return original(tokens, idx, renderOptions, env, self)

    const [lang, ...meta] = token.info.trim().split(/\s+/)
    if (lang !== "mermaid") {
      return original(tokens, idx, renderOptions, env, self)
    }

    const width = parseWidth(meta)
    const envInfo = env as MarkdownEnv | undefined

    return renderDiagram(
      token.content,
      width === undefined ? options : { ...options, maxWidth: width },
      {
        file: envInfo?.relativePath || envInfo?.path,
        line: token.map ? token.map[0] + 1 : undefined,
        fallback: () => original(tokens, idx, renderOptions, env, self),
      },
    )
  }
}

export default markdownItPele

/**
 * Parse `width=` / `maxWidth=` from the fence info string. Also accepts the
 * braced and quoted spellings people tend to try: `{width=480}`,
 * `width="480px"`.
 */
function parseWidth(meta: string[]): number | undefined {
  for (const raw of meta) {
    const item = raw.replace(/^\{|\}$/g, "")
    const match = /^(?:max-?width|width)=["']?(\d+)(?:px)?["']?$/i.exec(item)
    if (match) {
      const value = Number(match[1])
      if (Number.isFinite(value) && value > 0) return value
    }
  }
  return undefined
}
