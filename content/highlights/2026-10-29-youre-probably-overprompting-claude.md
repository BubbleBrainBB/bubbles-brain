---
externalId: "youre-probably-overprompting-claude"
kind: "article"
title: "你给 Claude 的提示词，多半写多了"
description: "Addy Osmani 讲新模型该怎么少写提示词：给 Claude 一个清楚的目标和验证办法就放手，定期删掉为旧模型写的指令，以及子智能体、云端会话、Projects 和代码审查各在什么时候用。"
date: 2026-10-29
sourceUrl: "https://x.com/addyosmani/status/2115688494865465370"
cover: "https://pbs.twimg.com/media/HVxuqqUagAA_bVB?format=jpg&name=large"
tags: ["Claude", "Claude Code", "Prompt", "Agent"]
featured: true
draft: false
articleIntro:
  sourceName: "Addy Osmani"
  note: "2026 年 10 月 30 日按 10 月 29 日的原文逐段译成中文。斜杠命令和链接保留原样，四张配图的说明里译出了图中文字。"
---

![标题图：你可能给 Claude 写了太多提示词（You're probably overprompting Claude）。旁边的卡片写着：目标，以及怎么验证。](https://pbs.twimg.com/media/HVxuqqUagAA_bVB?format=jpg&name=large)

**新模型需要的提示，比我们大多数人现在写的要少。**

用 [Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/) 时，试着只给 Claude 一条提示，写清楚你想做成什么，这是**明确的目标**；再写清楚 Claude 该怎么**验证**自己已经做到。然后让 Claude 自己去做。先用 `/effort medium`，需要时再调。

![你的提示：一个明确的目标；怎么验证已经做完。→ Claude 干活 → 跑检查（通过或不通过，或者一个要超过的数字）。还没通过：继续做。通过：回来汇报，让它给你看命令和输出。不用有人盯着。](https://pbs.twimg.com/media/HVxsQYpbEAES48q?format=jpg&name=large)

如果你还不清楚自己要做什么，就让 Claude 来采访你，一直问到它能写出一份规格说明（spec）为止。然后开一个新会话，用这份 spec 去做你想要的东西。

Claude 认为自己做完了，就会自己停下。

如果它能运行某种检查，结果是通过或不通过，或者是一个要超过的数字，而且检查的报告它读得懂，Claude 就能一直做下去，不用你在旁边盯着。

长时间的后台任务，可以用 `/goal` 设一个条件，每一轮结束后由另一个模型来检查它。

最近几版 Claude Code 还把[自动模式（auto mode）设成了默认](https://claude.com/resources/articles/auto-mode-default-in-claude-code)，交互式终端会话一开始就处在这个模式。在这个模式下，由一个分类器来分析 Claude 的操作，不再依靠平常的权限确认提示。这并不能保证行为安全，盲目批准每一次提示也保证不了。Claude 回来汇报时，让它把命令和输出给你看，或者给一张截图。

**对 Claude Opus 5 和 Claude Fable 5 这样的模型，[Claude Code 系统提示词里超过 80% 的内容](https://x.com/trq212/status/2080710971228918066)被删掉了，编程评测（eval）没有测出可以察觉的下降。**

像 Opus 5.5 这样的新模型出来时，你可以拿自己的指令做同样的实验：先删掉一些，再只把模型做漏了的那些加回来。[`/doctor prompt-audit`](https://code.claude.com/docs/en/commands#:~:text=/doctor%20%5Bprompt%2Daudit%20%5Bpath%5D%5D) 命令会标出那些为旧模型写的指令。

![左边，Claude Code 系统提示词：删掉了超过 80%，编程评测没有可以察觉的下降；其余保留。右边，拿你自己的指令试试：1 删掉一些；2 看它漏了什么；3 只把这些加回来。每出一个新模型就重复一次。/doctor prompt-audit 会标出为旧模型写的指令。](https://pbs.twimg.com/media/HVxshHaaUAAHco5?format=jpg&name=large)

另一个能减少你自己工作量的地方，是[子智能体（subagents）](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop)。

Claude 会自己把活派给它们，所以你很少需要开口。只在做大块的、能独立完成的工作时才去要求，比如很长的审计或迁移，Opus 5.5 可以把这类工作拆给多个并行的子智能体。小活用子智能体，成本和延迟都会成倍增加。子智能体可以让工作并行，或者给出第二种意见，但它们默认并不会让事情做得更聪明。

至于你自己搭的智能体，就我看到的情况，一个带技能（skills）的单智能体，质量上可以胜过子智能体的设计，成本和延迟往往也更低。

想合上笔记本电脑的时候，就用 [Claude 云端会话](https://claude.dev/blog/claude-code-in-the-cloud/)。可以从 [claude.ai/code](https://claude.ai/code)、Claude 应用启动，也可以用 `claude --cloud` 启动。云端会话跑在一台单独的虚拟机（VM）上，用的是你仓库新克隆的一份，所以开始前一定要把提交都推上去。用手机就能查看进度，回答会话提出的问题，然后审查 diff，开 PR。如果任务要用只有你自己机器上才有的资源，就把会话留在本地。

只有单个会话不用你也能做完，并行开多个会话才划算。如果你在 Claude Code 里有 [Projects](https://code.claude.com/docs/en/claude-projects)，我想你会觉得它们很有用。没有 project 的话，你就是好几个会话的管理者，得跟踪每个会话在做什么，哪些已经做完了。

![左边，没有 project：每个会话都要你自己跟踪（你连着四个打问号的会话）。右边，有 project：一个聊天替你管各个线程（你 → 一个长期运行的聊天 → 已完成、PR 已就绪、需要你），各线程并行运行。](https://pbs.twimg.com/media/HVxs35AboAA87A4?format=jpg&name=large)

一个 project 是一个长期运行的聊天，大部分项目管理工作它都替你做了：有问题或任务冒出来时，把它们贴进去，Claude 会为每一件开一个单独的线程（通常是一个云端会话），并行地跑。指令你只要给一次，所有新线程都会用上。Overview（概览）会显示哪些任务已经完成，哪些 PR 已经就绪，哪些在等你回复。

Projects 正在 Pro 和 Max 套餐上[公开测试（public beta）](https://x.com/ClaudeDevs/status/2100633571543367691)，所以你可能还没有，希望很快就有！

审查仍然重要。不过在 Claude Code 团队，大部分阅读工作已经自动化了：大多数改动在请人来看之前，都已经被 Claude 审查并修过至少一次。

Team 和 Enterprise 套餐可以用 [Code Review](https://claude.dev/blog/solving-code-review-at-anthropic/)，也可以用更轻量的 `/code-review`，它会在一个没看过这段对话的子智能体里审查你的 diff。你也可以直接开一个新会话。这样做的话，把 spec 给它，并告诉它别管风格上的问题。

**每隔几个月，回头审视一下自己的工作方式，确认你不是还在照着旧模型过去的工作方式来搭东西。**
