---
externalId: "get-started-with-claude-motion"
kind: "article"
title: "Claude Motion 上手指南：把报告和数据做成短动画"
description: "整理 Claude 帮助中心的 Motion 入门文章：动画是怎么做出来的、从哪里开始、怎么改、怎么导出和分享，以及谁能用、会占多少额度。"
date: 2026-10-12
sourceUrl: "https://support.claude.com/en/articles/17454997-get-started-with-claude-motion"
tags: ["Claude", "Anthropic", "Artifacts", "动画", "视频"]
featured: true
draft: false
articleIntro:
  sourceName: "Claude 帮助中心"
  note: "2026 年 10 月 12 日按原文整理成中文，文末补充了新手解读。功能仍在测试阶段，以原文最新版本为准。"
---

Claude Motion 能把你手里的报告、数据和图片做成几十秒的短动画，比如全员大会上的讲解短片、董事会材料里会动的图表，或者给新客户看的产品上手演示。

> 先看自己能不能用：Motion 目前是测试版，只在 Team 和 Enterprise 套餐里提供。Team 套餐默认开启；Enterprise 套餐默认关闭，要等组织的所有者在 Organization settings > Artifacts 里打开。

## 动画是怎么做出来的

- 每段动画都是一个 artifact，也就是 Claude 生成的、可以单独打开反复修改的作品，从 Motion 模板开始做。
- Claude 按你的描述写代码，让里面的文字、图表、形状和图片动起来，播放起来就像一段短视频。
- 它用的不是视频生成模型，所以做不出实拍画面，也做不出真人。
- 整段动画是代码，所以改一个词、一个数字或者某一段的节奏时，其余部分保持原样。
- 做过的动画都保存在 Artifacts 标签页里。

## 从哪里开始

**在聊天里直接说。** 任何对话里都可以让 Claude 做动画，比如：

- 「把这份季度报告做成全员大会用的 30 秒讲解动画。」
- 「做一段动画，对比我们几个价格套餐，销售启动会上用。」
- 「给新客户做一段设置步骤的简短演示。」

也可以在输入框里点 Output，选 Motion。

**从 Artifacts 标签页开始。**

1. 打开 Artifacts 标签页。
2. 选一个 Motion 模板。
3. 描述你想要的动画。

**想做得更好：** 说清楚谁来看、在哪里播、大概多长；再把要用的报告、数据或图片附上，动画就会用你自己的内容。

## 怎么改

- **让 Claude 改：** 在对话里直接说，比如「第二个场景放慢一点」「把第三季度的数字改成 18%」。
- **自己改：** 在编辑器里直接调整。

## 导出和分享

- **下载：** 点 Export，选 MP4。
- **分享：** 动画默认只有你自己能看。打开动画，点 Share 再发给别人。

## 会用掉多少额度

Motion 和平时用 Claude 一样，算在套餐的用量限额里。动画越长、越复杂，用掉的额度比一条普通消息多。

## 管理员：给组织打开 Motion

这部分只和 Team、Enterprise 套餐的 Owner 和 Primary Owner 有关。

- **开关位置：** Organization settings > Artifacts。
- **默认状态：** Team 套餐开，Enterprise 套餐关。
- **限定范围：** Enterprise 套餐还能用自定义角色，只让特定的小组使用。

---

## 新手怎么理解

- **它更像会自己写代码的演示动画，而不是 AI 拍视频。** 适合讲数据、讲流程、讲产品；想要真人出镜或实拍画面，得找视频生成模型。
- **改起来很省事。** 用视频生成模型时，想改一个细节通常只能整段重新生成；Motion 是代码，改哪里就只动哪里。所以提需求可以先给个大概，再一处一处细调。
- **描述动效要具体。** 「慢一点」「一个接一个出现」「只播一次」这类说法，Claude 更容易照做。站内的[动效图鉴](/vibe-coding/terms/#motion)收了几十种常见动效，每种都配了可以直接拿去说的句子。
- 想看看用代码做视频能做到什么程度，可以逛逛 [Code to Video](/vibe-coding/showcase/) 里的作品。

## 相关链接（英文）

- [What are artifacts and how do I use them?](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)
- [Sharing artifacts](https://support.claude.com/en/articles/9547008)
- [How usage and length limits work](https://support.claude.com/en/articles/11647753)
- [Artifacts admin guide for Team and Enterprise plans](https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans)
