import { defineConfig } from "vitepress";
import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

const links = []

// 引入导航栏和侧边栏设置
import nav from "./config/nav";
import sidebar from "./config/sidebar";

// 默认设置
export default defineConfig({
  title: "Ju33Huang22's Blog",
  description: "Just sharing my ideas.",
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id))
    links.push({
      // you might need to change this if not using clean urls mode
      url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
      lastmod: pageData.lastUpdated
    })
  },
  buildEnd: ({ outDir }) => {
    // you need to change hostname to your domain
    const sitemap = new SitemapStream({ hostname: 'https://ju33huang22.vercel.app/' })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach((link) => sitemap.write(link))
    sitemap.end()
  },
  themeConfig: {
    // 网站标志
    logo: "/img/avatar/Ju33Huang22.jpg",
    // 导航栏
    nav,
    // 侧边导引
    sidebar,
    // 社交平台账号
    socialLinks: [
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
        },
        link: "https://t.me/Ju33Huang22",
      },
    ],
    // 搜索
    search: {
      provider: "local",
    },
    // 版权设置
    footer: {
      message: 'The leader of FakeMirror',
      copyright: 'Copyright © 2023 FakeMirror'
    },
  },
  // Head 部分设置
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/favicon.png" }],
    [
      "script",
      {
        src: "https://img.js.design/assets/Resources/xframe/latest/jsframe.js"
      }
    ],
    [
      "script",
      {
        src: "https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/js/all.js"
      }
    ],
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-VD9K3ERMGG',
      },
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-VD9K3ERMGG');",
    ],
  ],

  // 最后编辑时间显示
  lastUpdated: true,
});
