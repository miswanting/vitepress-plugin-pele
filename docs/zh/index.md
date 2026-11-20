---
layout: home

hero:
  name: vitepress-plugin-pele
  text: Mermaid 图表，构建期渲染
  tagline: 零客户端 JavaScript。内联 SVG。支持 SSR。自动适配明暗主题。
  actions:
    - theme: brand
      text: 图表库
      link: /zh/gallery
    - theme: alt
      text: 快速上手
      link: /zh/guide
    - theme: alt
      text: GitHub
      link: https://github.com/miswanting/vitepress-plugin-pele

features:
  - icon: ⚡
    title: 构建期渲染
    details: 在 VitePress 构建时，Pele 把 mermaid 代码围栏转成内联 SVG，浏览器不会收到任何与图表相关的代码。
  - icon: 🧩
    title: 零客户端 JS
    details: 没有 mermaid.js 产物，没有水合过程，也不会产生布局抖动。
  - icon: 🌗
    title: 明暗双主题
    details: 图表通过 CSS 变量跟随 VitePress 配色切换，无需重新渲染。
  - icon: 🌐
    title: 兼容 SSR 与无 JS 环境
    details: 爬虫、打印输出以及禁用 JavaScript 的读者依然能看到图表。
  - icon: 🛠
    title: 错误信息可定位
    details: 图表出错时会提示所在文件与行号，也可以用 onError "throw" 让 CI 直接失败。
  - icon: 📦
    title: markdown-it 核心插件
    details: VitePress 入口只是通用 markdown-it 插件的一层薄封装。
---

## 立即看一个图表

下面就是一个普通的 `mermaid` 代码围栏，它在构建期被编译，最终以内联 SVG 的形式输出。

```mermaid
flowchart LR
  A[编写 mermaid 代码围栏] --> B[VitePress 构建]
  B --> C[Pele 渲染 SVG]
  C --> D[内联 HTML]
  D --> E[不引入 mermaid.js]
```

在导航栏切换配色模式即可。SVG 不会重新渲染，只是换了一组 CSS 变量。

## 为什么不用 mermaid.js？

| | mermaid.js 插件 | 本插件 |
| --- | --- | --- |
| 客户端 JS | 约 1.6 MB | **0 字节** |
| 渲染时机 | 在浏览器中 | **构建期** |
| SSR / 无 JS | 看不到图表 | **内联 SVG** |
| 布局抖动 | 水合之后才出现 | **没有** |

接下来可以阅读[快速上手](/zh/guide)，或者直接浏览[图表库](/zh/gallery)。
