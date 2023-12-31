---
title: VitePress博客折腾日记-标签云（aka 分类云）
author: Ju33Huang22
date: '2023-08-26'
categories:
 - 技术文
tags:
 - VitePress
 - JavaScript
 - Vue.js
---

# 什么是标签云（aka 分类云）？
就是你见到人家的博客的文章标签合集五颜六色的按钮，有些还会依照这个标签被多少个文章使用的数量而加大文字大小（不过这次的演示并不是加大文字大小，而是改变按钮的颜色）

上次搞首页搞到一半，发现漏了标签云的跳转页的功能，那么我们继续完善它

# 新建占位Markdown文件

新建一个 Markdown 文档并命名为 `categories.md` 并放到根目录
```markdown
---
layout: page
---

<script setup>
import wyCat from './components/wyCat.vue' //这里的路径取决于你要把这个文件放到哪里
</script> 

<wyCat />
```

# 新建 `wyCat.vue`

```javascript

<script setup>
import { ref } from 'vue'
import { useDocs } from './useDocs.js'
import DocList from './docList.vue'

const CLORS = ['#FFB3B3', '#FFDBA4', '#FFE9AE', '#C1EFFF', '#3498DB']
const { categories, tags } = useDocs()
let curFilter = ref(''), curData = ref([]), curType = ref('')

if (typeof window !== 'undefined') {
  let parma = new URLSearchParams(window.location.search)
  let type = parma.get('type')
  if (type === 'tag') {
    curFilter.value = parma.get('tag')
    curData.value = [...tags].map(item => {
      return { label: item, color: CLORS[Math.floor(Math.random() * 4)] }
    })
  } else {
    curFilter.value = parma.get('cat')
    curData.value = Object.keys(categories).map(item => {
      return { label: item, num: categories[item], color: CLORS[Math.floor(Math.random() * 4)] }
    })
  }
  curType.value = type
}

function handleCatClick(k) {
  curFilter.value = k
}

</script>

<template>
  <div class="wy-cat docs-wrap">
    <div class="cat-wrap">
      <div v-for="item in curData" :key="item.label"
        :class="[curType !== 'tag' ? 'cat-item' : 'tag-item', curFilter === item.label ? 'is-cur' : '']"
        @click="handleCatClick(item.label)">
        <span v-if="curType !== 'tag'">{{ item.num }}</span>
        <span :class="[curType !== 'tag' ? 'docs-categor-num' : 'docs-tag-num']"
          :style="{ backgroundColor: item.color }">{{
              item.label
          }}</span>
      </div>
    </div>
    <DocList :filter="curFilter" :type="curType" />
  </div>
</template>

<style>
.wy-cat {
  padding-top: 20px;
  flex-direction: column;
}

.wy-cat .docs-list {
  padding: 20px 0;
}

.cat-item:hover,
.tag-item:hover,
.is-cur {
  background: #42b883;
  color: #fff;
}

.cat-wrap {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}

.cat-wrap>div {
  margin-right: 20px;
}

.cat-item,
.tag-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  min-width: 110px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}

.cat-item .docs-categor-num {
  padding: 2px 6px;
  width: unset;
}

.tag-item {
  padding: 0;
  min-width: unset;
}

.tag-item .docs-tag-num {
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
```

这样就好了