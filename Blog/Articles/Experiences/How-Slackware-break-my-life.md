---
title: Slackware Linux是怎么样成功毁掉我的人生
author: Ju33Huang22
date: '2023-10-03'
categories:
 - 体验文
tags:
 - Linux
 - Slackware
---
# 前言
本文只是在吐槽我在尝试使用Slackware的事情，社区里还是有不少人在使用Slackware的，只是这次我在半夜时遇到的麻烦真的有够让我崩溃（写这篇文章已经是晚上12点了）

# 系统安装？
Slackware的系统安装没啥问题，小学三年级都会，这里不展开来讲

# 包管理器
Slackware有一套自己的包管理器，但是那玩意理论上不联网，要你自己通过别的源进行安装

所以为了让这包管理器好用一点，我还搞了个[SlackQuickInstaller](https://github.com/FakeMirrorOSS/SlackQuickInstaller)

但是很明显，我并不打算直接用这个包管理器，毕竟实在是不好用，也不方便，所以我打算开始安装Nix

# 安装Nix的折磨
首先就是缺各种依赖，以下是截至我放弃之前收到的编译错误缺失的依赖

![](/img/articles/How-Slackware-break-my-life/1.png)

其实前面缺依赖都没啥问题的，大不了就装呗

但是最后一个 `mdbook` ，就有问题了

遇到Nix编译错误缺依赖：

![](/img/articles/How-Slackware-break-my-life/2.png)

内心OS：“又缺个依赖，算了装就完事了”

![](/img/articles/How-Slackware-break-my-life/3.png)

内心OS：“啊？？？”

没错这个包实际上是有问题的，但是根据Slackbuilds的[Changelog](https://git.slackbuilds.org/slackbuilds/log/development/mdbook?h=15.0)来看，明显是有活跃维护的

![](/img/articles/How-Slackware-break-my-life/4.png)

当时已经晚上11点55分了（神他妈单线程编译），我真的没这心情再去花时间研究这玩意了，也不知道为什么维护者要写一串这样的URL进去

所以我到最后决定放弃了，不玩了，老子又他妈不用Slackware，爱用谁用去😅