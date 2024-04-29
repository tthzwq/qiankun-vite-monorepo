import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'qiankun-template',
  description: 'qiankun-template',
  lastUpdated: true,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh'
    }
  },
  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/qiankun_w16_h16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/qiankun_w32_h32.png' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/qiankun.svg' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/qiankun.svg', width: 24, height: 24 },
    nav: [
      { text: '快速开始', link: '/start' },
      { text: '注意事项', link: '/tips' }
    ],

    sidebar: {
      start: [],
      tips: []
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/tthzwq/qiankun-vite-monorepo' }],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    lastUpdated: {
      text: '上次更新'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '大纲',
      level: [2, 3]
    },
    darkModeSwitchLabel: '切换主题',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '语言',

    externalLinkIcon: true
  }
})
