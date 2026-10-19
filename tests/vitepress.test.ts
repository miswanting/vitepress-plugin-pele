import { createMarkdownRenderer, disposeMdItInstance } from "vitepress"
import { beforeAll, describe, expect, it } from "vitest"
import { peleMermaid } from "../src/index"

describe("vitepress entry", () => {
  let md: Awaited<ReturnType<typeof createMarkdownRenderer>>

  beforeAll(async () => {
    md = await createMarkdownRenderer(process.cwd(), {
      config: peleMermaid(),
    })
  })

  it("renders through the VitePress markdown pipeline", () => {
    const html = md.render(
      '```mermaid\nflowchart LR\n  A["{{ x }}"] --> B{Pele}\n```',
      { relativePath: "index.md" } as never,
    )

    expect(html).toContain("<svg")
    expect(html).toContain("pele-flowchart")
    expect(html).toContain("v-pre")
    expect(html).toContain("{{ x }}")
  })

  it("defaults maxWidth to the VitePress content width", () => {
    const html = md.render(
      "```mermaid\nflowchart LR\n  A --> B --> C --> D --> E --> F --> G --> H\n```",
      { relativePath: "index.md" } as never,
    )
    const match = /<svg[^>]*\swidth="(\d+)"/.exec(html)

    expect(match).not.toBeNull()
    expect(Number(match?.[1])).toBeLessThanOrEqual(688)
  })

  it("can be composed with an existing markdown config", async () => {
    disposeMdItInstance()
    let existingCalled = false
    const composed = await createMarkdownRenderer(process.cwd(), {
      config(markdown) {
        existingCalled = true
        peleMermaid({ maxWidth: 480 })(markdown)
      },
    })

    const html = composed.render("```mermaid\nflowchart LR\n  A --> B\n```", {
      relativePath: "index.md",
    } as never)

    expect(existingCalled).toBe(true)
    expect(html).toContain("<svg")
  })
})
