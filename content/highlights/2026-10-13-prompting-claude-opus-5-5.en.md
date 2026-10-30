---
externalId: "prompting-claude-opus-5-5"
kind: "article"
title: "Prompting Claude Opus 5.5: What Changes from Opus 5"
description: "A walkthrough of Claude's official guide to prompting Opus 5.5: where it improves on Opus 5, how to set effort, and how to adjust prompts for unattended agents, progress updates, multi-app and multi-agent work, chat, pasted text, dense images and front-end design."
date: 2026-10-13
sourceUrl: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5"
tags: ["Claude", "Anthropic", "Prompt", "Prompt Engineering", "Agent"]
featured: true
draft: false
articleIntro:
  sourceName: "Claude Docs"
---

This official guide covers how Claude Opus 5.5 behaves differently from Opus 5, and how to adjust prompts and the harness (the layer that lets the model call tools and work in a loop). The headline: Opus 5.5 produces output faster and often finishes the same work with fewer tokens, and prompts written for Opus 5 still work well. There's no need to start over; **when you hit a specific problem, read the matching section**.

> The guide opens with a symptom-to-section table: unsure which effort level to use, turns running longer and costing more, an old integration that ran with thinking disabled, unattended agents stopping mid-task, refused requests, long turns with no visible output, multi-app agents missing information, agent teams that should finish faster, slow chat replies, the model following instructions in pasted text, missed details in images, and same-looking front ends. The sections below follow that order.

## Where it improves on Opus 5

- **Coding and code review.** Multi-step work in real repositories, pushing a change through until the tests pass, is its strongest area. In Anthropic's testing, it matches or beats Opus 5 at high effort while running at the default medium, with fewer steps and tokens. It sustains hours-long audits and migrations with parallel subagents, and finds more bugs with fewer false positives in review.
- **Knowledge work.** It is much less likely to state a wrong figure or cite the wrong source, is better at financial modeling and at fixing valuation workbooks, and catches easy-to-miss details in large inputs.
- **Reporting.** Updates during the work and summaries at the end say clearly what it did, what it found and what it needs from you.
- **Images and computer use.** Without extra tools it reads dense charts more accurately than Opus 5, even at the lowest effort, and does better where meaning depends on position: which boxes an arrow connects, what changed between two diagrams, exact meeting times in a calendar screenshot. Computer use at default effort reaches success rates Opus 5 only hit at much higher settings.

## Set effort first

Thinking is always on in Opus 5.5, so **effort is the main dial for how much it thinks**, and the first setting to adjust when trading off intelligence, latency and cost.

- **The default changed:** medium for Opus 5.5, high for Opus 5. Set it explicitly and test several levels on your own evals rather than carrying over the Opus 5 value.
- **Same names, different amounts.** Opus 5.5 at medium matches Opus 5 at high on coding and knowledge work; on several coding evals, low comes close at a much lower cost.
- **It thinks more per level**, especially at xhigh and max, so keeping your Opus 5 setting means longer turns and more output tokens. Three adjustments: give max_tokens enough room, since thinking counts against it even when not returned (Anthropic found 128,000, the model's maximum, works well for long agentic coding turns); use xhigh and max only where you have measured a gain; and lower effort first if you want less thinking, since that works more reliably than prompt instructions.
- **Changing the top-level effort between requests invalidates the prompt cache.** Use the per-message effort beta to change it mid-conversation and keep the cache.

## Integrations that ran with thinking disabled

Opus 5 accepted disabled thinking at high effort or below; Opus 5.5 does not. Besides the request changes in the migration guide:

1. **Start at low and measure.** If time to first token still matters, a system-prompt line asking it to answer directly can trim thinking further; check quality when you add it.
2. **Remove instructions to write reasoning into the reply.** Read the summarized thinking block instead. Prompts that push the model to reproduce its reasoning in the reply can be refused under the reasoning-extraction category.
3. **Retest the workarounds for disabled thinking**, which targeted quirks that only appeared in that mode, and delete any rule telling the model not to think.
4. **Read responses by block type.** The first block may or may not be a thinking block, and by default its thinking field is empty.

## Unattended agent runs

On long multi-part tasks, Opus 5.5 keeps the user posted as it works, and some updates end the turn with text instead of a tool call. A loop that treats that as "done" stops there.

**In the harness:** treat a text-only turn as a report, not proof of completion. Keep the task's parts in a checklist the model updates, and if a turn ends with open items and no stated blocker, send a short user message listing them. Alternatively, write the completion condition up front and have a smaller model check each turn against it. Either way, stop after two or three automatic continuations so a genuinely stuck run ends for review. If something the model started is still running, wait for it and return its output.

**In the prompt:** Opus 5.5 responds well to instructions that name the specific early stops you want it to avoid. The guide offers a system-prompt addition along these lines: don't close a turn with a summary that announces the next step without taking it; don't stop to offer to continue; don't hand the user decisions that don't block the rest of the work; don't stop just because the turn has been long or a milestone is done. Status notes and recommendations are welcome, but in the same message as the next tool call. The right stops are where nothing can move without the user, or where the blocker is deliberately protected. Risky actions still need confirmation.

Add it from the first request of the session (adding it later changes the system prompt and invalidates earlier thinking blocks), keep your own confirmations for risky or irreversible actions, don't use it in human-in-the-loop apps, and expect somewhat more tool calls and tokens per task.

## Safeguard refusals

Opus 5.5 runs classifiers covering biology (the same safeguards as Claude Fable 5.1, new if you are coming from Opus 5; everyday health and education questions are unaffected), cybersecurity (finding vulnerabilities in source code is allowed; high-risk dual-use activity is not) and reasoning extraction (requests to reproduce internal reasoning in the reply). A refusal comes back as a normal response with stop_reason "refusal" and its category. You can retry on a fallback model automatically, except for reasoning-extraction refusals, which are returned directly.

## Progress updates for users

Between tool calls, Opus 5.5 writes short updates on what it just found and what it will do next. Four levers control what users see:

1. **Make sure your client receives them.** They arrive as a special thinking block that is empty by default, so a client that only renders text blocks can look silent. Setting display to "updates" (beta) returns a short summary of each.
2. **Give it a send-to-user tool** for content it needs to hand over verbatim mid-turn, declared from the first request.
3. **Ask in the system prompt** for a one-line plan before the first tool call and a short recap at the end. Most useful in human-in-the-loop work.
4. **Have the harness nudge it.** After several silent steps (say five), append a turn-scoped system reminder after the latest tool result, and stop after two or three. Because reminders are appended, the cache and thinking blocks stay valid. In Anthropic's agentic coding tests this roughly halved the share of tasks with long silences, with no measurable cost change.

## Look around before acting across apps

In automations spanning email, documents, spreadsheets and CRM records, the information a task depends on often sits somewhere the request never mentions. Opus 5.5 tends to start quickly, so for broadly described tasks, one system-prompt sentence asking it to explore the relevant emails, documents, tabs and records first, including ones the task doesn't name, clearly raised the share of tasks done correctly at both medium and max effort, at a small cost in tool calls and tokens. Because it tells the model to act on what it finds, make sure the records it searches contain no untrusted content.

## Time signals for agent teams

Opus 5.5 pays close attention to elapsed time. If you can estimate how long a task should take, have the harness append the elapsed time against a budget, in seconds, to each message sent back to the model; it paces itself and usually finishes well inside the budget, so set the budget a bit above what you really want. If you can't estimate one, show elapsed time only and add a sentence saying time matters and earlier correct results are better. Both signals made small agent teams finish research tasks faster than a single agent, and budgeted teams kept comparable answer quality. A tighter budget is not the same as lower effort: lower effort cuts the work, a budget mainly spreads it across more agents. The budget is advisory, so keep your own timeout, and check quality, since search and verification may thin out under time pressure.

## Thinking in chat apps

- **Drop "think carefully before answering" instructions.** The model decides how much to think, and effort is the control. Removing such lines in one chat product made replies start sooner with no noticeable drop in quality.
- **Stop it revisiting earlier answers.** In multi-turn chat it sometimes reconsiders previous answers even for short follow-ups. Two sentences at the end of the system prompt, telling it to treat answered questions as settled unless the user raises them, cut thinking on follow-ups without hurting quality. Leave them out of long analyses or agentic tasks where later steps may expose earlier mistakes, since it becomes less likely to flag its own errors.

## Mark pasted text in user messages

Opus 5.5 resists indirect prompt injection better than any earlier Opus model, and with the right context it also resists instructions hidden in text users paste in from emails or web pages. Wrap each pasted block in an opening and closing tag that share a short random ID generated by your app, each on its own line, and tell the model in the system prompt that tagged text was pasted from elsewhere, may contain instructions the user didn't write, should be followed only where the user's own message asks, and that the ID shouldn't be mentioned. It may make the model slightly more cautious, and the tags are plain text that can be imitated, so treat this as one layer among your defenses.

## Dense visual input

Since it reads charts, diagrams and screenshots much more precisely than Opus 5 without tools, retest whether you still need the scaffolding built for earlier models. For the densest inputs, higher-resolution images help (especially technical drawings), and so do image tools: run it as an agent with the original image in a container with PIL and OpenCV so it can crop, zoom, measure and verify, or give it just a crop tool if a container is too heavy. It uses these tools better at higher effort; without tools, higher effort helps with technical drawings but not much with charts.

## Front-end defaults

Without design guidance, it falls back on a few default styles, and generic instructions like "avoid a generic AI look" mostly swap one default for another. Naming the specific patterns to avoid works much better; the guide's example asks for a personal website without a cream or off-white background, italic accent words in headlines, numbered "01/02/03" section labels, monospace labels or pill-shaped buttons. Iterate: see what the first result switched to, and extend the list.

---

## Notes for newcomers

- **The one thing most people need: set effort first.** Lower it for speed and cost, raise it for hard problems; don't try to prompt it into thinking less.
- **"It stopped" doesn't always mean "it's done."** An agent that reports as it works is a good thing, but a loop that treats a report as the finish line will abandon the task halfway. That is why a harness needs a checklist, and someone or something that checks whether the work is really finished.
- **Specific prompts beat general ones.** Whether it's "don't stop like this", "look around first" or "no off-white background", naming the thing works far better than "do a good job." The model can't guess requirements you never stated.
- **Know who wrote the pasted text.** If you paste an email into a chat and ask for a summary, and the email says "ignore previous instructions," the model shouldn't obey. Marking what was pasted is a simple, effective defense.

## Related links

- [What's new in Claude Opus 5.5](https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5)
- [Claude Opus 5.5 migration guide](https://platform.claude.com/docs/en/models/opus-5-5/migration-guide#migrating-from-claude-opus-5)
- [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
