---
title: VitePress博客折腾日记
author: Ju33Huang22
date: '2023-08-26'
categories:
 - 技术文
tags:
 - VitePress
 - JavaScript
 - Vue.js
---

# 起因
之前在刷 Twitter 的时候看到了 Jinjiang [写的一篇文章](https://jiongks.name/blog/migrate-my-blog-to-vitepress)

反正现在重开后闲着也没事干，那就试试改造VitePress吧

# 开始
我的方法并不和 Jinjiang 的一样（因为他写的并不够详细），我用的是来自 littlear 的方法 ([参考文章1](https://juejin.cn/post/7134586612406714375),[参考文章2](https://younglina.top/write/docs/vitepress-data.html))

## 整理首页

通过他开源的博客原始码可以看到他把VitePress原本默认的 `index.md` 给改成了很多个人博客程序的文章列表的样子，接下来我会把我整理出来的code放出来

#### index.md

把这段写到 index.md
```html
<script setup>
import home from './components/home.vue' //这里的路径取决于你把这个vue文件放到哪里。接下来的code也是如此，记得改路径
</script>

<home />
```

#### home.vue
```javascript

<script setup>
import { onMounted } from 'vue'
// import { MlHeatmap } from 'ml-heatmap'
// import lcData from './lcData.json'
// import moment from 'moment'
import DocList from '/components/docList.vue'
import { useDocs } from './useDocs.js'
import 'ml-heatmap/dist/style.css'
const CLORS = ['#FFB3B3', '#FFDBA4', '#FFE9AE', '#C1EFFF']
// const submissionCalendar = JSON.parse(lcData.userCalendar.submissionCalendar)
// const nowDate = new Date()
// let calendarData = Object.keys(submissionCalendar).map((key) => {
//   let date = new Date(key * 1000)
//   return {
//     date: moment(date).format('YYYY-MM-DD'),
//     count: submissionCalendar[key],
//   }
// })
const { docData, categories, tags, docNum, tagNum } = useDocs()
onMounted(()=>{
if (typeof window !== undefined) {
  console.log(window,'window')
  console.log(document,'document')
  var s_div = document.createElement('div');   // 创建节点
  document.body.appendChild(s_div);   // 添加节点
}

})
</script>

<template>
  <div class="home-page">
    <div class="home-top">
      <h1 class="name">Ju33Huang22's Blog</h1>
      <p class="tagline">Just sharing my ideas.</p>
    </div>

    <!-- <MlHeatmap id="heat-map" :data="calendarData" :year="2022" locale="cn" /> -->

    <div class="docs-wrap">
      <DocList />
      <div class="docs info-wrapper">
        <div class="info-person">
          <img class="info-avatar" src="/img/avatar/Ju33Huang22.jpg" />
          <div class="info-name">Ju33Huang22</div>
          <div class="info-num">
            <div>
              <h3>{{ docNum }}</h3>
              <h6>文章</h6>
            </div>
            <div>
              <h3>{{ tagNum }}</h3>
              <h6>标签</h6>
            </div>
          </div>
        </div>
        <div>
          <h3 class="docs-types">分类</h3>
          <a v-for="(num, k) in categories" :key="k" class="docs-categor docs" :href="`/categories?cat=${k}&type=cat`"
            target="_blank">
            <span>{{ k }}</span>
            <span class="docs-categor-num" :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 4)] }">
              {{ num }}
            </span>
          </a>
        </div>
        <div>
          <h3 class="docs-types">标签</h3>
          <a v-for="t in tags" :key="t" class="docs-tags"
            :style="{ backgroundColor: CLORS[Math.floor(Math.random() * 4)] }" :href="`/categories?tag=${t}&type=tag`"
            target="_blank">
            <div>{{ t }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
```

#### docList.vue
```javascript
<script setup>
import { watch, ref } from 'vue'
import { useDocs } from './useDocs.js'

const props = defineProps(['filter', 'type'])

const { categories, docData } = useDocs()
const totalData = ref([])
let curPage = ref(1),
  totalPage = ref(1),
  inputPage = ref(null),
  filterData = ref([])
watch(
  () => props.filter,
  (val) => {
    let data = []
    if (props.type === 'tag') {
      data = docData.filter(
        (item) => !val || (item.tags && item.tags.includes(val))
      )
    } else {
      data = docData.filter(
        (item) => !val || (item.categories && item.categories.includes(val))
      )
    }
    totalPage.value = Math.ceil(data.length / 10)
    totalData.value = data
    filterData.value = data.slice(0, 10)
  },
  {
    immediate: true,
  }
)

function changePage(p) {
  if (!isNaN(p) || p >= totalPage.value || p < 1) {
    curPage.value = p > totalPage.value ? totalPage.value : p < 1 ? 1 : +p
  } else {
    if (p == 'prev' || p == 'next') {
      curPage.value += (p === 'prev' ? -1 : 1)
    } else {
      curPage.value = 1
    }
  }
  filterData.value = totalData.value.slice((curPage.value - 1) * 10, curPage.value * 10)
}
</script>

<template lang="">
  <div class="docs-list-wrap">
    <div class="docs-list">
      <a v-for="item in filterData" :key="item.title" :href="item.link" class="docs">
        <div class="docs-title">{{ item.title }}</div>
        <div class="docs-footer">
          <span class="docs-info">✍️{{ item.author }}</span>
          <span class="docs-info">🕐{{ item.date }}</span>
          <span>
            🔗
            <a v-for="tag in item.tags" class="docs-info docs-tag" :style="{color:tag===props.filter?'var(--vp-home-hero-name-color)':'#7f7f7f'}" :key="tag"
              :href="`/categories?tag=${tag}&type=tag`" target="_blank">
              <span >{{ tag }}</span>
            </a>
          </span>
        </div>
      </a>
    </div>
    <div class="page-nation">
      <span>共{{totalPage}}页</span>
      <span>当前第{{curPage}}页</span>
      <button @click="changePage('prev')" :disabled="curPage==1">上一页</button>
      <button @click="changePage('next')" :disabled="curPage==totalPage">下一页</button>
      <span>跳转至</span>
      <input v-model="inputPage" class="input-page" />
      <button @click="changePage(inputPage)">前往</button>
    </div>
    </div>
</template>
<style>
.page-nation {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.page-nation * {
  margin-right: 16px;
  font-size: 14px;
}

.page-nation button {
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0 6px;
}

.input-page {
  width: 60px;
  border-radius: 4px;
  padding: 0 6px;
  border: 1px solid gainsboro;
}
</style>
```

#### useDocs.js
```javascript
import docData from './docs.json'


export function useDocs() {
  docData.sort((a, b) => new Date(b.date) - new Date(a.date))

  const categories = {}
  const tags = new Set()
  let docNum = 0, tagNum = 0
  docData.map(item => {
    docNum++
    if (item.categories) {
      item.categories.map(c => {
        if (!categories[c]) {
          categories[c] = 0
        }
        categories[c]++
      })
    }
    if (item.tags) {
      item.tags.map(c => {
        tags.add(c)
      })
    }
  })
  tagNum = tags.size

  return {
    docData, categories, tags, docNum, tagNum
  }
}
```

### 引入首页CSS
我个人是不喜欢把一堆 css 写在同一个文件的，因为不方便更改。所以我会教你怎么把自定义的 css 和 VitePress 的默认 css 分开
首先打开 `.vitepress/theme/index.ts` 写入以下 TypeScript 引入自定义 css

```typescript
import './custom.css'
```

然后在同目录新建一个跟刚刚设置的引入自定义 css 的文件名一样的 css（即 `custom.css`)

```css

@media (min-width: 960px) {
    .image-src {
      max-width: 190px !important;
    }
  }
  
  .image-src {
    border-radius: 50%;
  }
  
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  
  
  .home-top {
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    background: url(/img/bg/5166b9ef2256fc6c19b426e3c72d794f_7824440040419994538.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  } 
  
  .docs-wrap {
    display: flex;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: 1200px;
  }
  
  .docs-list-wrap {
    flex: auto;
  }
  
  .info-wrapper {
    max-width: 35vh;
    margin-left: 20px !important;
  }
  
  .info-person {
    text-align: center;
  }
  
  .info-name {
    color: var(--vp-c-brand);
    font-weight: bold;
    font-size: 18px;
    margin: 20px 0;
  }
  
  .info-num {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .info-num>div {
    flex: 0 0 50%;
  }
  
  .info-num h3 {
    font-size: 18px;
    font-weight: bold;
  }
  
  .info-num h6 {
    font-size: 12px;
  }
  
  .info-num>div:first-child {
    border-right: 1px solid #333;
  }
  
  .info-avatar {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
  
  .name {
    color: #FFF;
    text-shadow: black 0.1em 0.1em 0.2em;
    font-size: 48px;
    line-height: 64px;
    font-weight: 700;
    padding-bottom: 10px;
  }
  
  .tagline {
    color: #FFF;
    text-shadow: black 0.1em 0.1em 0.2em;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    padding-bottom: 20px;
  }
  
  .svg-img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  
  .docs-types {
    padding: 20px 0;
    border-top: 1px solid gainsboro;
  }
  
  .docs.docs-categor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    transition: all 0.5s;
  }
  
  .docs-categor:hover {
    transform: scale(1.04);
  }
  
  .docs-categor-num {
    padding: 4px 8px;
    color: #42b883;
    font-weight: bolder;
    font-size: 12px;
    border-radius: 2px;
    width: 32px;
    text-align: center;
  }
  
  .docs-tags {
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    color: #fff;
    font-weight: bolder;
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    line-height: 13px;
    font-size: 13px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
  }
  
  .docs-tags:hover {
    transform: scale(1.04);
    color: #fff;
  }
  
  .docs {
    display: block;
    padding: 16px 20px;
    margin: 0 auto 16px;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .docs:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  }
  
  .docs-footer>span {
    margin-right: 10px;
    font-size: 12px;
  }
  
  .docs-title {
    position: relative;
    width: fit-content;
    padding: 6px 0;
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 500;
  }
  
  .docs-title::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: var(--vp-home-hero-name-color);
    visibility: hidden;
    transform: scaleX(0);
    transition: 0.3s ease-in-out;
  }
  
  .docs-title:hover::after {
    visibility: visible;
    transform: scaleX(1);
  }
  
  .docs-info {
    color: #7f7f7f;
    margin-right: 10px;
  }
  
  .docs-tag:hover {
    color: var(--vp-home-hero-name-color) !important;
  }
  
  #heat-map {
    margin: 40px auto 20px;
    height: 100px;
  }
  
  .illustration {
    display: none !important;
  }
  
  .lcdata {
    text-align: right;
    padding-right: 20px;
    font-size: 12px;
  }
  
  a[href="/categories.html"] {
    display: none !important;
  }
  
  button:disabled {
    cursor: not-allowed;
    color: gainsboro;
  }
  #gitalk-container{
    padding: 10px 40px;
  }
  #gitalk-page-container{
    padding: 10px 40px;
  }
  .VPHome {
    padding-bottom: 0 !important;
  }
  
  .vp-doc :not(pre) > code{
    font-weight: bold;
  }
  /* 
   .heat-map {
    margin: 40px 0 !important;
    width: 100%;
  } 
  
  .vch__container {
    transform: scale(0.8);
    font-size: 12px;
    padding-top: 30px;
  }
  
  .vch__legend {
    display: none;
  }
  
  [id^="tippy-"] {
    background-color: rgba(239, 241, 246, .85);
    color: rgb(38, 38, 38);
    padding: 4px;
    border-radius: 2px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif;
  }
  
  .live2d-canvas {
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
  } */
```

### 安装ml-heatmap
```bash
npm install ml-heatmap
```


## 获取VitePress所有文章数据

虽然 littlear 的博客是开源的，但是他的《获取vitepress所有文章数据》文章中提到的 `readMD.js` 并没有整理好直接放在里面，而是分成三段

我这边给大家分享一下经过我改过的脚本，能够输出探测到了多少个 Markdown 文档

新建一个 JavaScript 文件在根目录（不是存放文章的那个根目录）

```javascript
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const out = [];
const re = /---(.*?)---/sg;

function readAll(parentPath) {
    const files = fs.readdirSync(parentPath)
    files.map(item => {
      let tempPath = path.join(parentPath, item); //当前文件或文件夹的路径
      let stats = fs.statSync(tempPath); //判断是文件还是文件夹
      if (stats.isDirectory()) { //文件夹递归处理
        readAll(tempPath);
      } else {
        const content = fs.readFileSync(tempPath, 'utf8') //获取文件内容
        let s = re.exec(content) //通过正则获取frontmatter的内容
        re.lastIndex = 0 // 这里如果不操作，在后面正则判断时会有问题，当时在这里卡了很久
        if (s) {
          let docs = yaml.load(s[1]) // 通过yaml转换成对象
          docs.link = tempPath.slice(4, -3) // 这里是为了文章列表的跳转
          out.push(docs);
        }
      }
    })
}

readAll('./Blog/Articles');

const filePath = './Blog/components/docs.json';
fs.writeFileSync(
    filePath,
    JSON.stringify(out, null, 2), // 添加漂亮的格式化，2个空格缩进
    {
        encoding: 'utf8',
    }
);

console.log(`Parsed ${out.length} documents. JSON data written to ${filePath}`);

```

该 JavaScript 脚本用到了 js-yaml ，记得运行前装好

```bash
npm install js-yaml
```

然后用 node 执行这个 JavaScript 脚本

```
node readMD.js
Parsed 1 documents. JSON data written to ./Blog/components/docs.json # 最后输出的Log
```

#### frontmatter
这里要注意一下没有 frontmatter 的 Markdown 文件它是不会检测的，不过他用到的主题需要你也不可能不写，格式大概是这样的

（恕我不能在这里直接贴yaml,因为傻逼脚本的问题他检测到了两个frontmatter,你可以直接到我的[博客原始码](https://github.com/j33h22/j33h22.github.io/blob/master/Blog/Articles/Technolgies/VitePress-Build.md)查看，最顶部就是了）

# 尾巴
这样到这里就差不多大功告成了