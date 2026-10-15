---
externalId: "how-to-be-more-ambitious"
kind: "article"
title: "How to Be More Ambitious: A Tutorial for Humans with Models"
description: "Felix Rieseberg, who works on Claude, splits \"be more ambitious with models\" into altitude, depth and range: don't stop at doing the task faster. Ask for the outcome, work the way the best people in the field would, and borrow methods from other fields."
date: 2026-10-15
sourceUrl: "https://felixrieseberg.com/how-to-be-more-ambitious-a-tutorial-for-humans-with-models/"
tags: ["Claude", "Agent", "Prompt", "Working with models"]
featured: true
draft: false
articleIntro:
  sourceName: "Felix Rieseberg"
  note: "Summarized on October 15, 2026 from the October 13 original, section by section, not line by line, with notes for newcomers at the end. The post opens with Goya's Modo de volar (A Way of Flying); that image is not included here."
---

Felix Rieseberg works on Claude. Every day he hears about something done with or by Claude that he hadn't considered, didn't think possible, or simply lacked the curiosity and time to try. This month it may have helped discover a new planet. He has seen the first AI music video he really likes. And they are talking about a new era of math.

Model capabilities don't grow evenly. As Terence Tao puts it, models are "astounding in some directions, while inadequate in others". Some people pilot the astounding parts and seem to be flying. Watching people reach those heights with products he helped build is addictive. Many others are still learning to use the new wings, and don't know what they're good for beyond "What is the capital of France" or "Can you make this email sound less angry".

He and others who work on AI often say we ought to be more ambitious when using it. See something impressive, repost it, and write "we're not ambitious enough". It has become a rallying cry. He knows the advice is hard to follow, so he wrote a tutorial.

He thinks of ambition in four types: speed, altitude, depth and range.

- **Speed:** the same work in less time. This is the bread and butter of AI's economic value: if you need some code written, he'll do it faster with Claude. The path is well established and takes little creativity, so he skips it.
- **Altitude:** go up in abstraction and consider the outcome rather than the individual task.
- **Depth:** consider a task the way a field-leading expert would. Don't stay at the task's layer. Go one level down and touch the underlying data, tools and problems.
- **Range:** draw on more than the one field the task seems to need, using knowledge, tools and techniques you normally wouldn't.

He primarily uses Claude, but the advice is not tied to one model.

## Altitude: ask for the outcome, then the task

People casually call this "letting the model operate at a higher abstraction". The task you hand over is your best guess at how to get the outcome you want. To be more ambitious in altitude, ask what you want to happen next, and what the goal beyond the goal is. At the beginning of last year he still asked Claude to fix individual crashes. Eventually he asked Claude to keep the apps crash-free.

Take an ordinary office task. You work at Acme Inc, an imagined company, and you need a deck for the quarterly business review. Given a pile of data, Claude will happily make slides. Maybe you already have a template and it only has to fill in the numbers. That is a long way from finding a new planet. Each step below is a little more ambitious than the last:

- Most reviews want to know what changed this quarter, why, and what should be done about it. Resist updating whatever numbers are already in the template. Give the model as much data as you can get, so it can understand the business: "Tell me what changed this quarter, why, and what we should do about it."
- The good kind of meeting ends with decisions. Ask Claude: "Work out which three decisions are most urgent in the face of everything you've learned, and start working on possible directions with arguments for and against."
- QBRs come from a time when a good review meant humans carefully sifting data, figuring out what it meant, and whether the business should adjust. Ask Claude: "The review exists so leadership catches problems early and moves money and people to the right places. Design a better way to do that than a quarterly deck, show from our own history that it would have caught things sooner, and run it beside the current one for a quarter."

Altitude works best when you really are after some ultimate outcome. It works less well for creative work. A tell is that you are going to have meetings about whatever you are working on. There are limits. In 2026, "Claude, go make money" does not by itself work for most businesses. What he sees is that the more capable models become, the higher the level of abstraction they can operate at.

Altitude is also where people find durable workflows that take the human out of the loop, so you are not constantly updating the model with task after task. Doing it well often means changing the workflow first. To let Claude keep an app crash-free, he first had to make crash reports easy to fetch, map each app version to a git commit, and give it Windows, macOS and Linux machines so it could reproduce and verify fixes on its own.

## Depth: work the way the best people in the field would

Sometimes you just want a task done really well. Ambition in depth means pushing the model to use the tools, techniques, media and knowledge the best professionals in the field use, and to keep pushing until even those people might learn something new from the result.

Stay with Acme's quarterly review, and assume the company is struggling with user churn. He has found a mix of these useful:

- **Insist on the same instruments the best in the field use.** Asked to "act like a professional", models often switch vocabulary without switching methods. Depth means the tools the best data scientists and statisticians use. When Claude reaches for a Markdown table, insist on databases and statistical models. You don't have to know what the experts use. Claude usually does.
- **Pick an unreasonable goal and tell the model it is very reasonable.** Need the site to load in 5 seconds instead of 10? Ask for 200 milliseconds. Does something seem impossible to the model? Say again that it is solvable, and that it just needs to keep going.
- **Challenge what you think you know.** In business especially, a lot of what we believe is a rough approximation of reality. Give the model the raw information and ask it to check assumptions adversarially. "We believe churn is an onboarding problem. Try to reproduce that from the raw data."
- **Produce new knowledge.** This attaches easily to the last point. Once Claude is already inside the data, ask it to find blind spots. "Build a simulation of our customers that reproduces the last year from our logs. Then find the earliest signal of churn we don't know about yet, and show it predicts on data it has not seen."
- **Use an outside judge.** Do not ask the model to judge itself. He assumes rising intelligence will eventually fix this, but in October 2026 he asks you to insist on outside validation. Ideally that is a tool the model can run, so the feedback comes back immediately.

A prompt that often helps him, in short:

> I want a deeper version of this task, not a bigger one. Before rewriting it: (1) say what a top professional in this field would do here that I'm not asking for; (2) name the rawest material they would start from instead of what has already been digested for me; (3) name the specific methods and tools they would use; (4) say what, other than you or me, would show the result is right. Then rewrite my prompt to ask for exactly that.

## Range: borrow methods and people from other fields

Ambition in range means looking at the work from more fields than would have been economical to hire in the past. The insight isn't unique: every heist movie spends the first half hour assembling a crew. As AI products make multi-agent setups easier (multiple threads, orchestrators, or simply sub-agents), he has seen interesting results from asking Claude to bring other fields in.

Putting it into practice takes creativity. Until he saw his colleague Alex Albert use Blender to render interior designs, he never considered using Claude for 3D environments on his homepage, even though he has made video games. He says this is where he sees the most magic.

How he does it:

- **Replace the nouns with verbs.** An old trick from Tom Kelley and Jonathan Littman's *The Art of Innovation*. A quarterly review isn't "a deck". It is "getting busy people to believe a story about cause and effect, and to decide under uncertainty, in 30 minutes". The verbs make it easier, for you and for Claude, to see which fields might bring a useful angle.
- **Assemble the crew.** The deck has to be amazing, or aliens will blow up Earth. What team would humanity put together? For something you could actually present, he would bring an analyst, a journalist and an editor. If it has to be presented, probably a motion and audio designer too. An adversarial red team can help: a short seller and a forensic accountant. It is easy to slip into role play, which makes the transcript weirder without improving the outcome. Use the crew to find fields and techniques. Don't ask the model to write as a short seller. Ask it to do what a short seller does when researching a position.

Every kind of ambition he describes needs the model to have a computer that can install software, and access to the relevant data, through MCP connectors or some other means. Plenty of tools make that possible. He recommends you use one.

## We have been here before

That is his concrete advice. He then explains why he thinks the advice is necessary.

Humans have always been held back by what we believe is possible, and we usually trust ourselves only inside a narrow discipline. Michelangelo famously didn't want to paint the Sistine Chapel: he was a sculptor, not a painter.

While looking into ambition, he found psychology's name for this: self-efficacy. People with high self-efficacy believe more in their own abilities, and in turn accomplish more. There is evidence it can be nudged. Locke and Latham went through 35 years of goal-setting research and concluded that people given specific hard goals perform better than people simply told to do their best. Stripe founder Patrick Collison keeps a "Fast" list of things humans have accomplished when given both audacious goals and tight deadlines. A few well documented moves:

- **Believe a hard thing is possible, and you are more likely to do it.** In 1939 George Dantzig arrived late to a statistics class at Berkeley, copied two problems off the blackboard, and handed in solutions thinking they were homework. They were two unsolved problems in statistics.
- **Watch somebody else do it, and you are more likely to do it too.** Humans chased the four-minute mile for decades. Roger Bannister broke it in May 1954 and was the only person to have done so for just 46 days. If you run, something similar is happening to the two-hour marathon: the author writes that Sabastian Sawe ran the first official sub-two-hour marathon in London this April, and the runner-up in the same race also broke two hours.
- **Give yourself permission to fail.** Apparently everyone's favorite business book is *The Inner Game of Tennis*, which he discovered the week he wrote this. Its thesis is that you are not playing your best tennis if you are trying very, very hard. Engineers may remember Linux, announced as "just a hobby, won't be big and professional like GNU".

Self-efficacy is not a new problem, but it is a more powerful one now. When abilities leap every few weeks, we need techniques for doing things we didn't consider or didn't believe possible. If you find more of them, he asks you to tell him.

---

## Notes for newcomers

- **"More ambitious" does not mean a longer prompt, or more agents at once.** He skips "do it faster". The other three are: ask for the outcome above the task (altitude), use the field's real methods and the raw data (depth), and borrow practices from other fields (range).
- **The altitude example to keep: from "fix this crash" to "keep the app crash-free".** The second one needs a workflow change first: crash reports, a map from version to commit, and machines that can reproduce the bug. Without that, the model still waits for you to feed it the next task.
- **The depth line that is easiest to miss: "be professional" often changes the vocabulary, not the method.** Tables become databases and statistical models, and self-judgment becomes a check something else can run. His four-step prompt is a way to rewrite the request after asking what a top professional would add.
- **Range is not role play.** The crew is there to name fields and techniques. Ask the model to do the research a short seller would do, not to speak as one.
- The "may have helped discover a new planet" line, and the name and result of the two-hour marathon, are the author's. They are not checked again here.

## Related links

- [Original: How to be more ambitious](https://felixrieseberg.com/how-to-be-more-ambitious-a-tutorial-for-humans-with-models/)
