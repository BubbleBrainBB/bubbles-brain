---
externalId: "youre-probably-overprompting-claude"
kind: "article"
title: "You're Probably Overprompting Claude"
description: "Addy Osmani on prompting newer models less: give Claude a clear goal and a way to verify it, prune instructions written for older models, and know when subagents, cloud sessions, Projects and code review are worth it."
date: 2026-10-29
sourceUrl: "https://x.com/addyosmani/status/2115688494865465370"
cover: "https://pbs.twimg.com/media/HVxuqqUagAA_bVB?format=jpg&name=large"
tags: ["Claude", "Claude Code", "Prompt", "Agent"]
featured: true
draft: false
articleIntro:
  sourceName: "Addy Osmani"
---

![Title card: You're probably overprompting Claude, beside a card reading "The goal and how to verify it."](https://pbs.twimg.com/media/HVxuqqUagAA_bVB?format=jpg&name=large)

**Newer models need less prompting than most of us still give them.**

With [Opus 5.5](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/), try a single prompt that states a **clear goal** and how Claude should **verify** that it got there, then let it work. Start at `/effort medium` and adjust from there.

![Flow: your prompt holds one clear goal and how to verify it's done; Claude works; a check runs (pass/fail, or a number to beat); not yet means keep going, a pass means it reports back and shows you the command and its output. No one has to watch.](https://pbs.twimg.com/media/HVxsQYpbEAES48q?format=jpg&name=large)

If you don't yet know what you want, have Claude interview you until it could write a spec. Then open a new session and build from that spec.

Claude stops by itself when it thinks the work is done.

When it can run something that answers pass/fail or gives a number to beat, and the report is in a form it can read, Claude can keep going without you watching.

For long background tasks, `/goal` sets a condition that a separate model checks after every turn.

Recent Claude Code versions also made [auto mode the default](https://claude.com/resources/articles/auto-mode-default-in-claude-code) starting mode for interactive terminal sessions. There, a classifier reviews Claude's actions in place of the usual permission prompts. That does not guarantee safe behavior, and neither does approving every prompt without reading it. When Claude reports back, ask it to show you the command and output, or a screenshot.

**For models like Claude Opus 5 and Claude Fable 5, [more than 80% of the Claude Code system prompt](https://x.com/trq212/status/2080710971228918066) was removed with no measurable drop in its coding evals.**

When a new model such as Opus 5.5 ships, you can run the same experiment on your own instructions: remove some, then add back only the ones the model misses. The [`/doctor prompt-audit`](https://code.claude.com/docs/en/commands#:~:text=/doctor%20%5Bprompt%2Daudit%20%5Bpath%5D%5D) command flags instructions written for older models.

![Left: the Claude Code system prompt with over 80% removed and no measurable drop in coding evals, the rest kept. Right: try it on your own instructions, remove some, see what it misses, add back only those, and repeat with each new model; /doctor prompt-audit flags instructions written for older models.](https://pbs.twimg.com/media/HVxshHaaUAAHco5?format=jpg&name=large)

[Subagents](https://claude.com/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop) are another place to cut your own work.

Claude delegates to them on its own, so you rarely have to ask. Ask only for large, standalone jobs such as long audits or migrations, which Opus 5.5 can split across parallel subagents. On small jobs, subagents multiply cost and latency. They can parallelize work or give a second opinion, but by default they don't make the result smarter.

For agents you build yourself, Addy has seen a single agent with skills beat a subagent design on quality, often at lower cost and latency.

Use [Claude cloud sessions](https://claude.dev/blog/claude-code-in-the-cloud/) when you want to close your laptop. Start one from [claude.ai/code](https://claude.ai/code), the Claude app, or `claude --cloud`. A cloud session runs in its own VM on a fresh clone of your repo, so push your commits first. Check in from your phone, answer any questions the session raised, then review the diff and open the PR. Keep the session local if the task needs resources that only exist on your machine.

Parallel sessions pay off only once a single session can finish without you. If you have [Projects](https://code.claude.com/docs/en/claude-projects) in Claude Code, Addy thinks you'll find them very useful. Without a project, you manage several sessions yourself and have to track what each one is doing and which have finished.

![Left, without a project: you track every session, each a question mark. Right, with a project: you talk to one long-running chat that runs the threads in parallel and shows which are done, which have a PR ready and which need you.](https://pbs.twimg.com/media/HVxs35AboAA87A4?format=jpg&name=large)

A project is one long-running chat that does most of the project management: paste in issues and jobs as they come up, and Claude opens a separate thread for each (usually a cloud session) and runs them in parallel. Instructions you give once apply to every new thread. The Overview shows which tasks are complete, which PRs are ready and what is waiting on you.

Projects are in [public beta](https://x.com/ClaudeDevs/status/2100633571543367691) on Pro and Max, so you may not have them yet, but hopefully soon.

Review still matters. On the Claude Code team, though, most of the reading is now automated: most changes are reviewed and fixed by Claude at least once before a person is asked to look.

On Team and Enterprise plans you can use [Code Review](https://claude.dev/blog/solving-code-review-at-anthropic/), or the lighter `/code-review`, which reviews your diff in a subagent that hasn't seen the conversation. You can also just start a new session; if you do, give it the spec and tell it to ignore style.

**Every few months, audit how you work, so you aren't still building around how older models used to behave.**
