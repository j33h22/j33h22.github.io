---
title: VitePress博客折腾日记-在文章页中显示frontmatter (useData获取)
author: Ju33Huang22
date: '2023-08-26'
categories:
 - 技术文
tags:
 - VitePress
 - JavaScript
 - Vue.js
---
# 开头
接上回搞好了VitePress的博客化，继续来做自定义

这回是要做在文章页中显示frontmatter（也就是你们现在能在这个页面的顶部看到的三个 emoji 组成的信息）

这是通过 VitePress 自带的API接口使用 `useData` 获取的，它的数据格式是这个样子的

```
interface VitePressData {
  site: Ref<SiteData>
  page: Ref<PageData>
  theme: Ref<any> // themeConfig from .vitepress/config.js
  frontmatter: Ref<PageData['frontmatter']>
  lang: Ref<string>
  title: Ref<string>
  description: Ref<string>
  localePath: Ref<string>
}
```

## layout.vue
新建该文件到 `.vitepress/theme/`

```javascript
.vitepress/theme/layout.vue
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme

const { frontmatter } = useData() //这里的frontmatter就是各个md文件中自己写在最上面的东西
</script>

<template>
  <Layout>
    <template #doc-before>
      <span class="page-info">✍️{{ frontmatter.author }}</span>
      <span class="page-info">🕐{{ frontmatter.date }}</span>
      <span>
        🔗
        <span class="page-info" v-for="item in frontmatter.tags" :key="item">{{ item }}</span>
      </span>
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

## index.ts
然后引入模块到 `.vitepress/theme/index.ts`

```typescript
import layout from './layout.vue'
```

将原本自带的这段删掉
```typescript
export default {
//...
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
//...
```

改为
```typescript
export default {
//...
Layout: layout,
//...
```

最后大概就是这个样子的
```typescript
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'
import layout from './layout.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// 组件
import Player from '../../components/Player.vue'; // 这是我自己引入的视频播放器，你没有很正常
import Walineinit from '../../components/Walineinit.vue';  // 这是我自己引入的Waline评论区，你没有很正常

export default {
  extends: Theme,
  Layout: layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(Antd);
    app.component('Player', Player) // 这是我自己引入的视频播放器，你没有很正常
    app.component('Walineinit', Walineinit)  // 这是我自己引入的Waline评论区，你没有很正常
  }
}
```

# 自定义
你也可以稍微改一改顶部的信息，例如我想让他直接获取 frontmatter 设置好的标题

我就改为了

```html
<template>
  <Layout>
    <template #doc-before>
    <!--这一行是我新加的标题，文字大小设置成了+3，你觉得大过头了可以改一下-->
      <span class="page-info"><font size="+3">📰{{ frontmatter.title }}</font></span><br>
      <span class="page-info">✍️{{ frontmatter.author }}</span>
      <span class="page-info">🕐{{ frontmatter.date }}</span>
      <span>
        🔗
        <span class="page-info" v-for="item in frontmatter.tags" :key="item">{{ item }}</span>
      </span>
    </template>
  </Layout>
</template>
```