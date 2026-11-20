import { defineConfig } from "vitepress"
import { peleMermaid } from "vitepress-plugin-pele"

// GitHub Pages serves this project from /vitepress-plugin-pele/.
// Local development and `vitepress preview` keep the root base.
const base = process.env.DOCS_BASE ?? "/"

// English is the default locale and lives at the site root (`root` key);
// the Chinese translation lives under /zh/ (`zh` key).
export default defineConfig({
  base,
  title: "vitepress-plugin-pele",
  description:
    "Mermaid diagrams for VitePress, rendered at build time with Pele",
  cleanUrls: true,
  markdown: {
    config: peleMermaid(),
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: "vitepress-plugin-pele",
      description:
        "Mermaid diagrams for VitePress, rendered at build time with Pele",
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
        outline: { level: [2, 3], label: "On this page" },
        docFooter: { prev: "Previous page", next: "Next page" },
        lastUpdated: { text: "Last updated" },
        darkModeSwitchLabel: "Appearance",
        lightModeSwitchTitle: "Switch to light theme",
        darkModeSwitchTitle: "Switch to dark theme",
        sidebarMenuLabel: "Menu",
        returnToTopLabel: "Return to top",
        langMenuLabel: "Change language",
        navMenuLabel: "Main Navigation",
        mobileMenuLabel: "Menu",
        extraMenuLabel: "More options",
        skipToContentLabel: "Skip to content",
        // Keep the language switcher on the corresponding page.
        i18nRouting: true,
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      title: "vitepress-plugin-pele",
      description: "在构建期为 VitePress 渲染 Mermaid 图表",
      themeConfig: {
        nav: [
          { text: "指南", link: "/zh/guide" },
          { text: "图表库", link: "/zh/gallery" },
          { text: "尺寸", link: "/zh/sizing" },
          { text: "主题", link: "/zh/theming" },
        ],
        sidebar: [
          {
            text: "指南",
            items: [{ text: "快速上手", link: "/zh/guide" }],
          },
          {
            text: "示例",
            items: [
              { text: "图表库", link: "/zh/gallery" },
              { text: "尺寸与宽度", link: "/zh/sizing" },
              { text: "主题定制", link: "/zh/theming" },
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
          message: "MIT 许可。本演示站运行 VitePress 2.0.0-alpha.20。",
          copyright: "Copyright © 2026 姬飞雨",
        },
        outline: { level: [2, 3], label: "本页目录" },
        docFooter: { prev: "上一页", next: "下一页" },
        lastUpdated: { text: "最后更新于" },
        darkModeSwitchLabel: "外观",
        lightModeSwitchTitle: "切换到浅色主题",
        darkModeSwitchTitle: "切换到深色主题",
        sidebarMenuLabel: "菜单",
        returnToTopLabel: "返回顶部",
        langMenuLabel: "切换语言",
        navMenuLabel: "主导航",
        mobileMenuLabel: "菜单",
        extraMenuLabel: "更多选项",
        skipToContentLabel: "跳到正文",
        // Keep the language switcher on the corresponding page.
        i18nRouting: true,
      },
    },
  },
})
