import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/index.ts", "src/markdown-it.ts"],
  format: "esm",
  platform: "node",
  target: "node20",
  dts: true,
  clean: true,
  sourcemap: true,
  outExtensions: () => ({ js: ".js", dts: ".d.ts" }),
  deps: {
    neverBundle: ["markdown-it", "pele", "vitepress"],
  },
})
