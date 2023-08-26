---
title: VitePress博客折腾日记-针对手机进一步优化CSS
author: Ju33Huang22
date: '2023-08-26'
categories:
 - 技术文
tags:
 - VitePress
 - CSS
---

# 开头
原本 littlear 的css已经足够美观，就在你在电脑前沾沾自喜关掉电脑在手机上看的时候才发现：

![](/img/articles/VitePress-CSS/1.png)

我：6

这不是我的问题，我在 littlear 自己的博客看也是这样

# 针对手机的CSS片段

我已经搞出来了，你可以直接成为一个CV工程师然后 Copy 过去，随便把这段 css 放在任意一个位置就行（当然我建议你放到好看点的位置不然本来就乱的 css 更乱了）

```css
/* For Mobile */
@media screen and (max-width: 600px) {
  .docs.info-wrapper {
    display: none; /* 在小屏幕上隐藏 */
  }
  .name {
    font-size: 30px !important;
  }
  .tagline {
    font-size: 20px !important; 
  }
}
```

以上CSS解释一下就是

- 调小了首页大标题的文字大小
- 调小了首页小标题的文字大小
- 在手机状态下隐藏了信息右侧栏