import MarkdownIt from "markdown-it"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { clearDiagramCache, type PeleMermaidOptions } from "../src/core"
import markdownItPele from "../src/markdown-it"

const SIMPLE = "flowchart LR\n  A[Start] --> B[End]"
const WIDE = "flowchart LR\n  A --> B --> C --> D --> E --> F --> G --> H"

function createMarkdown(options: PeleMermaidOptions = {}): MarkdownIt {
  return new MarkdownIt({ html: true }).use(markdownItPele, options)
}

function render(options: PeleMermaidOptions, source: string, env?: object): string {
  return createMarkdown(options).render(source, env as never)
}

function svgSize(html: string): { width: number; height: number } {
  const match = /<svg[^>]*\swidth="(\d+)"[^>]*\sheight="(\d+)"/.exec(html)
  if (!match) throw new Error(`No SVG dimensions in output:\n${html}`)
  return { width: Number(match[1]), height: Number(match[2]) }
}

describe("markdown-it plugin", () => {
  beforeEach(() => clearDiagramCache())
  afterEach(() => vi.restoreAllMocks())

  it("renders mermaid fences to inline SVG", () => {
    const html = render({}, "```mermaid\n" + SIMPLE + "\n```")

    expect(html).toContain("<svg")
    expect(html).toContain("pele-flowchart")
    expect(html).toContain('class="pele-diagram"')
    expect(html).toContain("v-pre")
    expect(html).not.toContain("language-mermaid")
  })

  it("preserves Vue interpolation syntax inside labels", () => {
    const html = render(
      {},
      '```mermaid\nflowchart LR\n  A["{{ value }}"] --> B\n```',
    )

    expect(html).toContain("{{ value }}")
  })

  it("leaves non-mermaid fences to the original renderer", () => {
    const html = render({}, "```js\nconst answer = 42\n```")

    expect(html).toContain('class="language-js"')
    expect(html).not.toContain("<svg")
  })

  it("uses the width= fence option to switch layout", () => {
    const wide = render({}, "```mermaid\n" + WIDE + "\n```")
    const narrow = render({}, "```mermaid width=120\n" + WIDE + "\n```")

    expect(svgSize(wide).width).toBeGreaterThan(svgSize(wide).height)
    expect(svgSize(narrow).height).toBeGreaterThan(svgSize(narrow).width)
  })

  it("accepts braced and quoted width options", () => {
    for (const info of ["{width=120}", 'width="120px"']) {
      const html = render({}, `\`\`\`mermaid ${info}\n` + WIDE + "\n```")
      expect(svgSize(html).height).toBeGreaterThan(svgSize(html).width)
    }
  })

  it("warns with the file name and falls back to a code block", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const html = render(
      {},
      "```mermaid\nflowchart LR\n  A[\n```",
      { relativePath: "guide/broken.md" },
    )

    expect(html).toContain('class="language-mermaid"')
    expect(warn).toHaveBeenCalledOnce()

    const message = warn.mock.calls[0]?.[0] as string
    expect(message).toContain("guide/broken.md")
    expect(message).toContain("Failed to render Mermaid diagram")
    expect(message).toContain("Falling back to a code block")
  })

  it("falls back silently with onError: 'code'", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const html = render(
      { onError: "code" },
      "```mermaid\nnot a diagram\n```",
    )

    expect(html).toContain('class="language-mermaid"')
    expect(warn).not.toHaveBeenCalled()
  })

  it("throws with onError: 'throw'", () => {
    expect(() =>
      render(
        { onError: "throw" },
        "```mermaid\nnot a diagram\n```",
        { relativePath: "guide/broken.md" },
      ),
    ).toThrow(/Failed to render Mermaid diagram in guide\/broken\.md/)
  })

  it("can disable the v-pre wrapper", () => {
    const html = render({ vueSafe: false }, "```mermaid\n" + SIMPLE + "\n```")

    expect(html).toContain('<div class="pele-diagram">')
    expect(html).not.toContain("v-pre")
  })

  it("supports a custom wrapper class", () => {
    const html = render({ className: "my-diagram" }, "```mermaid\n" + SIMPLE + "\n```")

    expect(html).toContain('class="my-diagram"')
  })
})
