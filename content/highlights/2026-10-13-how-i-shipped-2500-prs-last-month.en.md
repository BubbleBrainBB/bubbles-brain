---
externalId: "how-i-shipped-2500-prs-last-month"
kind: "article"
title: "How I Shipped 2,500 PRs Last Month to Production"
description: "Lauren Tan (poteto) on getting agents to ship over 2,000 PRs a month: not by running more agents, but by earning your trust in them first, with verification skills, an agent-friendly codebase and layers of constraints."
date: 2026-10-13
sourceUrl: "https://x.com/poteto/status/2102050467505430555"
tags: ["Agent", "Skills", "Cursor", "Coding Agents", "Software Engineering"]
featured: true
draft: false
articleIntro:
  sourceName: "Lauren Tan (poteto)"
  note: "Summarized on October 13, 2026 from the talk video, section by section in her order, with notes for newcomers at the end. The title says 2,500 PRs; in the talk she says 2,000. Both are her own figures."
---

Lauren Tan, poteto on X, works on Grok Bot at SpaceXAI, after time at Cursor and on the React team. She says she shipped 2,000 pull requests to production last month, though that was never her goal: every skill, tool and codebase change she made added up to one thing, **being able to trust her agents' work even when she isn't watching**.

The talk was meant for Cursor Compile in London. She couldn't make it, so she posted it on X for free.

## It comes down to trust

She prefers a Michelin kitchen to the "software factory": building a product is creative work, not mass production on an assembly line. With agents we no longer cook every component ourselves, but we are still responsible for what reaches the table, and for how the kitchen is set up: which tools and training the line cooks, sous chefs and dishwashers get, and in what ratio.

She describes the stages of working with agents:

- **One to five agents:** you babysit every conversation and keep correcting course. Step away and they do the wrong thing. She calls this the hardest stage to leave, because it isn't clear how.
- **Wanting a hundred:** what holds you back is not tooling but trust. Spawn a hundred sub-agents without it and you get sloppy PRs, regressions and bugs.

So the question becomes: **how do you trust your agents more?**

## Step one: let agents verify their own work

When she joined Cursor, she was asked to fix performance in the new agents window that replaces the Cursor IDE. PRs landed so fast she couldn't tell whether performance was regressing, so she spent her days in Chrome DevTools taking traces and heap snapshots by hand, until she asked herself why, with agents around, she was doing this at all.

So she started building **verification skills**: teaching the agent to run the application itself, take and read traces, find hot spots and hill-climb towards better performance.

Verification has a range:

- **The lighter end:** verification skills that teach the agent to run your app and debug it through the Chrome DevTools Protocol or similar, taking traces and snapshots.
- **The far end:** formal verification with languages like Lean or TLA+, proving your business-logic invariants always hold. It is hard, and few people do it.

Even without formal methods, she says, verification skills get you very far. Her first skill at Cursor was one of these. It grew two essential parts:

1. **A CLI inside the skill directory.** Instead of agents writing different throwaway scripts each session, they use one tool, every time, to run the app reproducibly and collect evidence that the code works and meets the performance bar. It is worth investing in so it handles many cases.
2. **A feature map.** A Slack report would arrive with a vague screenshot and three question marks, and the agent could run the app but only guess what the user meant. The feature map, inspired by a site map, records what the app's features are, how a user reaches them (shortcuts, which elements to click) and what they do. It lives in the skill, kept up to date by an automation.

Together, the CLI and the feature map let agents both control the app reproducibly and understand reports from internal and external users. The skill became critical infrastructure for the team.

## Step two: teach agents to work like engineers

Verification is about **correctness**: does the checkout button actually check out the cart? It gives you empirical evidence, but says little about performance or code quality.

That is where skills that teach agents to work like real engineers come in. Her plugin [pstack](https://github.com/cursor/plugins/tree/main/pstack) is a collection of skills drawn from her own workflows for debugging, feature development and prototyping. This is where a team's experienced engineers contribute most, by building a shared repository of skills that make the agents smarter.

Combined with verification, agents can confirm their work is both correct and high quality, with real performance numbers to show for it.

## Step three: let the codebase constrain your agents

She calls this one of the most important things a team can do: **refactor your architecture to be agent-friendly**. If agents will write all the code, the codebase should make them do the right thing by default.

She orders the ways of building trust from the hardest constraint to the softest:

1. **The codebase is the best memory.** Agents love to extend the patterns they see, and the files they read sit in their context. They won't refactor in every PR; they extend what is there.
2. **Make mistakes categorically impossible** through better data structures and architecture.
3. **Static analysis:** linters, compiler diagnostics, CI. A mistake an agent keeps repeating after you correct it becomes a lint rule.
4. **Rules, Bugbot and skills:** guidance rather than enforcement. Agents mostly use them, but may forget to read a rule, or the person piloting may ignore it.
5. **The style guide:** enforceable only by humans in review, which can't keep up with this rate of PRs. Don't rely on it alone, though recurring review comments are a good signal of what the other layers are missing.

## Dune: a framework that is locked down on purpose

The Grok Bot codebase runs on **Dune**, a framework designed for agents. Its key principle: **agents love taking shortcuts**, so make the easy path the right path.

That makes the codebase annoying for humans, since it is locked down in what you can and can't do, but ideal for agents, especially ones with little context. Contributors are no longer only engineers; designers, product managers and CEOs ship features too. The codebase should let an agent piloted by a busy person with little context do a good job by default.

The reverse holds as well: **anti-patterns spread like a virus.** One small workaround, or a comment explaining it, gets copied by agents, and within days or weeks it is everywhere, a de facto pattern.

Her example is **code comments**. Comments are normal for humans, but in the Cursor codebase she saw agents use nearby comments to justify a band-aid instead of fixing the real problem. So Dune bans comments, to stop that pattern from propagating.

Every team, she argues, needs a "gardener" who watches for weeds and nips them in the bud before they spread. Dune's principles:

- **Delete the tech debt you already have.**
- **Keep a single paved path** for most blessed patterns: one conventional way, so agents don't guess, with enough guidance in the codebase, CI and lint rules.
- **When you see a bad pattern, write a lint rule.** You don't have to clean it up right away, but you stop the bleeding. Then have agents clean it up, so the codebase stays in a state you'd be happy for an agent to copy.

One concrete case: Dune strictly separates code for Electron's main process from code for the renderer. In Cursor's agents window, slow code sometimes got imported into the renderer and made the UI janky. With a frame budget of 16 ms at 60 fps, or 8 ms at 120 fps, Dune enforces the boundary through the import and dependency graph, so that class of performance problem can't happen.

The point, she says, isn't Dune itself but **having an agent-friendly framework of your own**: taking the tribal knowledge your best engineers used to leave in code review comments and encoding it in the framework and codebase. The codebase is the snapshot you want agents to extend, so keep it pristine enough that the next agent keeps it that way.

## The outer loop: let Grok Bot start the work

She sees Grok Bot and Cursor working well together, with Grok Bot providing the "outer loop". It connects to Slack, Datadog, Sentry, PlanetScale and other services, and aggregates that information to make decisions. Some call this a "company brain"; she doesn't think you need anything that sophisticated, because agents are good at using tools.

Grok Bot routines that subscribe to Slack threads or Sentry alerts can kick off cloud agents automatically, and Cursor automations and the SDK let you build more bots on the same agent infrastructure for harder tasks. Her team's automations already reproduce bug reports and open pull requests. Each layer compounds the others.

## If you remember one thing

Her one slide: **whenever you find yourself correcting or intervening with an agent, ask which of those five layers is the most effective fix, and think about them in order**. First, can the codebase, architecture or data structures make the mistake impossible? If not, static analysis. Then layer on rules, Bugbot and skills.

Do all of that and you trust the environment enough to let your agents run free. It isn't a secret, she says; it's a lot of hard work.

---

## Notes for newcomers

- **"Trust" means merging an agent's changes without watching it work.** Her whole approach raises that trust instead of simply running more agents; more agents you can't trust only means more mess to clean up.
- **Start with verification.** An agent that can run the app and see the result is far more reliable than one that only writes code.
- **Turn every correction into something that sticks.** Saying it once is forgotten by the next conversation; a lint rule or a structural change keeps working.
- The 2,000 and 2,500 figures are self-reported and not independently checked. The approach is the part worth borrowing.

## Related links

- [Lauren Tan's original post with the talk, on X](https://x.com/poteto/status/2102050467505430555)
- [pstack (cursor/plugins)](https://github.com/cursor/plugins/tree/main/pstack)
