import { PeleError, render, type RenderOptions } from "pele"

/** How to handle diagrams that Pele cannot render. */
export type PeleErrorMode = "warn" | "throw" | "code"

export interface PeleMermaidOptions {
  /**
   * Maximum width available for the diagram layout, in pixels.
   *
   * Pele uses this to wrap labels and, for supported diagrams, switch to a
   * vertical layout on narrow screens. The VitePress entry defaults this to
   * the default theme's content width (688px). The plain markdown-it entry
   * leaves it undefined so Pele uses the diagram's natural width.
   */
  maxWidth?: number
  /** Allow the SVG to shrink to fit its container. Pele defaults to `true`. */
  responsive?: boolean
  /** Class name of the wrapper element. Defaults to `pele-diagram`. */
  className?: string
  /**
   * Mark the wrapper with `v-pre` so Vue does not treat `{{ ... }}` inside
   * diagram labels as interpolation. Defaults to `true`; only disable this
   * when the output is not compiled by Vue.
   */
  vueSafe?: boolean
  /**
   * What to do when a diagram cannot be rendered:
   * - `warn` (default): log a warning and fall back to a code block
   * - `code`: fall back to a code block silently
   * - `throw`: fail the build with the rendering error
   */
  onError?: PeleErrorMode
  /** Cache rendered SVGs for identical diagrams. Defaults to `true`. */
  cache?: boolean
  /** Prefix for accessibility ids inside the SVG. */
  idPrefix?: string
  /** Extra options forwarded to `pele.render()`. */
  renderOptions?: Omit<RenderOptions, "maxWidth" | "responsive" | "idPrefix">
}

interface ResolvedOptions {
  maxWidth?: number
  responsive?: boolean
  className: string
  vueSafe: boolean
  onError: PeleErrorMode
  cache: boolean
  idPrefix?: string
  renderOptions: Omit<RenderOptions, "maxWidth" | "responsive" | "idPrefix">
}

export interface RenderContext {
  /** Source file, usually `env.relativePath`. */
  file?: string
  /** 1-based line of the opening fence. */
  line?: number
  /** Original fence renderer, used when rendering fails. */
  fallback: () => string
}

const DEFAULTS = {
  className: "pele-diagram",
  vueSafe: true,
  onError: "warn" as PeleErrorMode,
  cache: true,
}

const svgCache = new Map<string, string>()

/**
 * Render a Mermaid source string to inline SVG HTML.
 *
 * This is the shared implementation behind both the VitePress helper and the
 * plain markdown-it plugin. It never throws unless `onError` is `"throw"`.
 */
export function renderDiagram(
  source: string,
  options: PeleMermaidOptions,
  context: RenderContext,
): string {
  const resolved = resolveOptions(options)
  const idPrefix = resolved.idPrefix ?? `pele-${hash(source)}`
  const cacheable = resolved.cache && Object.keys(resolved.renderOptions).length === 0
  const cacheKey = `${resolved.maxWidth ?? ""}|${resolved.responsive ?? ""}|${idPrefix}|${source}`

  const cached = cacheable ? svgCache.get(cacheKey) : undefined
  if (cached !== undefined) return wrap(cached, resolved)

  const renderOptions: RenderOptions = { ...resolved.renderOptions, idPrefix }
  if (resolved.maxWidth !== undefined) renderOptions.maxWidth = resolved.maxWidth
  if (resolved.responsive !== undefined) renderOptions.responsive = resolved.responsive

  let svg: string
  try {
    svg = render(source, renderOptions).svg
  } catch (error) {
    return handleError(error, resolved, context)
  }

  if (cacheable) svgCache.set(cacheKey, svg)
  return wrap(svg, resolved)
}

/** Clear the module-level SVG cache. Exposed for tests and long-running dev servers. */
export function clearDiagramCache(): void {
  svgCache.clear()
}

function resolveOptions(options: PeleMermaidOptions): ResolvedOptions {
  return {
    maxWidth: options.maxWidth,
    responsive: options.responsive,
    className: options.className ?? DEFAULTS.className,
    vueSafe: options.vueSafe ?? DEFAULTS.vueSafe,
    onError: options.onError ?? DEFAULTS.onError,
    cache: options.cache ?? DEFAULTS.cache,
    idPrefix: options.idPrefix,
    renderOptions: options.renderOptions ?? {},
  }
}

function wrap(svg: string, options: ResolvedOptions): string {
  const className = options.className
    ? ` class="${escapeAttribute(options.className)}"`
    : ""
  const vueSafe = options.vueSafe ? " v-pre" : ""
  return `<div${className}${vueSafe}>${svg}</div>\n`
}

function handleError(
  error: unknown,
  options: ResolvedOptions,
  context: RenderContext,
): string {
  const message = describeError(error, context)

  if (options.onError === "throw") {
    throw new Error(message, { cause: error })
  }

  if (options.onError === "warn") {
    console.warn(
      `[vitepress-plugin-pele] ${message}\nFalling back to a code block.`,
    )
  }

  return context.fallback()
}

function describeError(error: unknown, context: RenderContext): string {
  let where = ""
  if (context.file) {
    where = ` in ${context.file}${context.line ? `:${context.line}` : ""}`
  } else if (context.line) {
    where = ` at line ${context.line}`
  }

  if (error instanceof PeleError) {
    const position = error.line
      ? ` at diagram line ${error.line}${error.column ? `, column ${error.column}` : ""}`
      : ""
    const snippet = error.snippet ? `\n${error.snippet}` : ""
    return `Failed to render Mermaid diagram${where}${position}: ${error.message}${snippet}`
  }

  const message = error instanceof Error ? error.message : String(error)
  return `Failed to render Mermaid diagram${where}: ${message}`
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
}

/** FNV-1a, used to derive stable accessibility id prefixes. */
function hash(input: string): string {
  let value = 0x811c9dc5
  for (let index = 0; index < input.length; index++) {
    value ^= input.charCodeAt(index)
    value = Math.imul(value, 0x01000193)
  }
  return (value >>> 0).toString(36)
}
