---
title: VitePress博客折腾日记-添加Waline评论区
author: Ju33Huang22
date: '2023-08-26'
categories:
 - 技术文
tags:
 - VitePress
 - Waline
 - JavaScript
 - Vue.js
---

# 开头
用久了的朋友就会发现，VitePress不支持直接在 Markdown 文件中添加 CSS 或 JavaScript，而且就算能加每一个 Markdown 都要加一遍怪麻烦的

虽然说某些不用特别动的 CSS 或 JavaScript 只要放在 `.vitepress/config.ts` 的 HEAD 段就好了

那么问题来了

像 Waline 这种需要路由的怎么办呢？

又要怎么给 VitePress 安装Waline呢？

# 安装 Waline 客户端模块

```bash
npm install @waline/client
```

## 新建 Vue 模块

```javascript
<template>
    <Waline :serverURL="serverURL" :path="path" />
  </template>
<script setup>
import { Waline } from '@waline/client/component';
import { computed, onMounted } from 'vue';

  
import '@waline/client/dist/waline.css';
  
const serverURL = ''; // 你的后端地址


onMounted(()=>{
  let path = computed(() => window.location.path);
})
</script>
  
```

## 在 VitePress 中引入

修改 `.vitepress/theme/index.ts`

```typescript
// .vitepress/theme/index.ts

import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'

import Walineinit from '../../components/Walineinit.vue'; // 导入这个Vue文件

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('Walineinit', Walineinit)
  }
}
```

# 将 Walineinit 作为一个 layout 导入到每一个文章页中
这里的方法和上次添加 frontmatter 显示的方法是一样的，但由于 VitePress 只允许一个 Layout 文件，多个文件会白屏，所以我建议你把 `frontmatterlayout.vue` 这个名字改一下然后直接在里面加 Waline

修改后的整个 `layout.vue` 是这样的

```javascript
// .vitepress/theme/layout.vue
<!--.vitepress/theme/frontmatter.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import Walineinit from '../../components/Walineinit.vue'

const { Layout } = DefaultTheme

const { frontmatter } = useData() //这里的frontmatter就是各个md文件中自己写在最上面的东西
</script>

<template>
  <Layout>
    <template #doc-before>
      <span class="page-info"><font size="+3">📰{{ frontmatter.title }}</font></span><br>
      <span class="page-info">✍️{{ frontmatter.author }}</span>
      <span class="page-info">🕐{{ frontmatter.date }}</span>
      <span>
        🔗
        <span class="page-info" v-for="item in frontmatter.tags" :key="item">{{ item }}</span>
      </span>
    </template>
    <template #doc-after>
      <Walineinit />
    </template>
  </Layout>
</template>

<style>
  .page-info{
    font-size: 13px;
    color: #7f7f7f;
    margin-right: 10px;
  }
</style>
```