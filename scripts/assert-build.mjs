import { readFile } from "node:fs/promises"

const html = await readFile(
  new URL(
    "../tests/fixtures/site/.vitepress/dist/index.html",
    import.meta.url,
  ),
  "utf8",
)

const failures = []
const check = (condition, message) => {
  if (!condition) failures.push(message)
}

check(html.includes("<svg"), "expected an inline SVG in the built page")
check(html.includes("pele-flowchart"), "expected Pele's flowchart output")
check(
  html.includes("{{ braces }}"),
  "expected Vue interpolation inside labels to be preserved",
)
check(
  html.includes("language-js"),
  "expected non-mermaid code blocks to keep syntax highlighting",
)
check(
  !html.includes("language-mermaid"),
  "expected the mermaid fence to be replaced",
)

if (failures.length) {
  console.error(`e2e assertions failed:\n- ${failures.join("\n- ")}`)
  process.exit(1)
}

console.log("e2e assertions passed")
