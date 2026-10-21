---
externalId: "how-codex-happened"
kind: "article"
title: "How Codex Happened"
description: "Dan Shipper's account of OpenAI's coding comeback: a cloud Codex that missed product-market fit, a pivot onto the developer's own computer, then a desktop app with no code editor that became the base of the ChatGPT desktop app."
date: 2026-10-15
sourceUrl: "https://every.to/p/how-codex-happened"
tags: ["OpenAI", "Codex", "Agent", "Coding Agents"]
featured: true
draft: false
articleIntro:
  sourceName: "Dan Shipper"
  note: "Retold on October 16, 2026 from the October 15 original, section by section, with the interviews' claims, names, dates and figures kept. The original illustrations and the page's agent-reading and subscription controls are left out. Notes for newcomers are at the end."
---

Dan Shipper can date the night he started to think OpenAI might lose the lead in AI coding that had looked untouchable since ChatGPT took off. It was the summer of 2025, the eve of the GPT-5 launch, in OpenAI's Mission Bay office. The building felt staged: lights like stage lights, people moving a little faster through rust and brown halls, the next day's launch pulling the room into its orbit. What he had come to say sat awkwardly in that mood.

Every, the company he runs, had a reputation for putting new models on real work and writing down what they could and could not do. OpenAI had given them GPT-5 about a month early, so they could publish a Vibe Check on launch day. Ten of them spent a week in a house in upstate New York, working at one long table and testing the model on a big screen. Everyday use felt good. Inside Codex, the reaction was muted.

Codex is now the center of OpenAI's comeback: the product that swallowed ChatGPT from the inside. That summer it was still a small effort to build an AI software engineer. A [cloud version](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent) from a few months earlier had missed product-market fit, and the team was mid-pivot to a version that ran on a developer's own computer, in the terminal and in the editor.

GPT-5 in Codex was fast and seemed smart. Naveen Naidu, one of Every's most technical engineers, used it to track down a freeze in his dictation app Monologue that had stalled him for days. It also stopped early, wary of stepping outside what it was allowed to do. It felt built as a pair programmer.

Every had already moved past step-by-step collaboration. With Claude Code, a group led by Kieran Klaassen handed whole tasks to Opus 4 and walked away until a feature, sometimes a whole app, came back. Staff writer Katie Parrott built and deployed her own AI content system in a few days, with little help from an engineer. Next to Opus 4 in Claude Code, GPT-5 in Codex felt boxed in.

That is what Shipper took into a conference room with Lindsay McCallum from communications and Alexander Embiricos from Codex. McCallum, alert to shifts in the market, had set the meeting so Shipper could explain why he would not stop talking about this way of working. She typed across the table. Embiricos sat beside Shipper and coded while he talked, rushing a GPT-5 feature that would make the agent pause and ask before touching files or running commands outside its sandbox.

Shipper told him: with Claude Code, you let it rip. GPT-5 felt timid, held back by the sandbox, afraid of its own power. McCallum, still looking at her laptop, told him to describe the new engineering workflow. Embiricos turned his chair. Shipper said they barely looked at the code anymore, then blushed. Explaining agentic delegation to the person whose job was an autonomous coding agent felt ridiculous, and he was unsure the approach would survive outside Every's small team. A Slack ping broke the quiet. Embiricos muted the machine and pushed the lid three-quarters shut, enough for his Codex agent to keep thinking.

## Leaving Mission Bay

Walking out, Shipper wondered whether OpenAI was building the perfect tool for a workflow that was already dying. Burned by the cloud agent, the company looked as if it were retreating to the editor, where AI helps a programmer one step at a time, while Claude Code was taking off among people who handed over a whole task and left.

Staying in the editor had a case. After GPT-5, Codex shipped an extension that put Codex in the sidebar of VS Code and Cursor. By the following October usage had grown more than tenfold, and the editor extension overtook the terminal as Codex's most-used surface.

In most companies that would have been the business to double down on. Embiricos and a small group of engineers, designers and researchers wanted something larger. Over the next months the Codex team trained a dedicated line of coding models, separate from the models behind ChatGPT, and built a desktop app for running several agents at once. By June 2026 Codex had more than 5 million weekly active users and was spreading into other knowledge work.

By July 2026 Codex had merged into the flagship ChatGPT desktop app. Its leader, Thibault Sottiaux, was put in charge of OpenAI's core products and platforms, including ChatGPT, Codex and the API. Codex and ChatGPT for Work together now have 40 million weekly active users.

In less than a year the team went from a failed cloud launch to the foundation of OpenAI's flagship product, and helped remake the company.

## Thinking: three generations

The comeback starts with the line "Thinking...." In 2026 that word shimmers where an answer is about to appear, on any complex request. It can look like a replacement for the macOS beach ball. In this story it names a style of computing Codex depends on.

The first large language models thought by answering. An email or a line of code had to come out one word at a time, with no separate pass for planning or revision. Early chat models were like improv actors: impressive, and sometimes funny. They would insist "strawberry" had two r's, spell it out, and congratulate themselves.

Users noticed that asking the model to write its reasoning before the answer often improved the answer. That technique, the same advice a grade-school math teacher gives, is chain-of-thought prompting.

The second generation trained that behavior in. A reasoning model works in a scratch pad, a reasoning trace, before it replies: it can try angles, back out of a dead end, and answer only once it has settled. OpenAI called the first of these models o1 and previewed it in September 2024. Until then, progress had mostly meant training larger models for longer. With o1, the same model could improve on a hard problem by spending more time on it.

Programming stood to gain the most. It is a closed loop: edit code, run it, see within seconds whether the change worked, and revise without a person checking. Left to think long enough, a reasoning model could in theory do any programming task alone.

## Codex had many beginnings

Building an AI programmer is old enough at OpenAI that Codex has had many starts, beginning with the name. The first Codex, in 2021, was GPT-3 fine-tuned on public code and powered the original GitHub Copilot. After the o1 preview, a prompt from leadership sent several groups after the dream again.

One start was Embiricos in late 2024. His first real "feel the AGI" moment was watching a reasoning model connected to a terminal read files, run commands and work through errors on its own. He had come to OpenAI earlier that year when it acquired Multi, the multiplayer screen-sharing tool for programmers he had cofounded. At OpenAI he wanted humans and agents working together inside the apps people already used, first on the ChatGPT desktop app, then on Atlas, an AI browser. The models were too slow and clumsy at reading a screen.

In the terminal they could work in text and code. Coding was not yet his full-time job, but he started sketching a product. He believed users would need to see what the model was doing every 30 seconds, or at most every minute.

Speed was the constraint again. Most AI coding products had grown around VS Code: Copilot's autocomplete extension, Cursor and Windsurf as editors built on VS Code's open-source code, with chat beside the programmer. Those tools needed a tight loop, because the models could not work alone for long. OpenAI's early reasoning models were the reverse: slow and weak when their thinking time was cut short. Could the wait be turned into the advantage?

## There was no decision to split the model line

Elsewhere in the company, Sottiaux, who goes by Tibo, was turning reasoning models back on the research that produced them. He got involved with coding agents around December 2024. Shipper interviewed him in the OpenAI cafeteria: brown hair, wire glasses, a dark hoodie printed "Research and Deployment Co," a slice of pepperoni pizza. The goal, between bites, was to help OpenAI write infrastructure and do research faster.

Sottiaux had spent much of his career building infrastructure for researchers, at DeepMind and then at OpenAI. Research infrastructure is the shared code researchers use to run, evaluate, reproduce and deploy experiments. It sounds like plumbing. In AI it is where a lot of the action is: cut the time to run an experiment, and you can run more of them and reach a better model sooner.

Shipper wanted to fast-forward to a meeting where someone, Sottiaux or Greg Brockman or Sam Altman, made a farsighted choice to split Codex off from ChatGPT. Sottiaux said there was no such decision. At the start it was a research exploration and an optimization of velocity.

His group trained internal coding agents on OpenAI's monorepo, the single repository of the organization's code. The agents wrote the Python researchers needed to run and improve the systems that built new models. Researchers used them every day, which gave the team a tight loop. The training techniques differed from, and for a while were hard to reconcile with, how the larger organization trained public models. Sottiaux would not describe the techniques. The result was visible: the group had turned the models back onto the research process, and researchers were using them to make the next generation. Engineers call that bootstrapping.

That was one half of what became Codex: agents that could improve the infrastructure for building new models. The other half was Embiricos's thesis about how people should work with those agents.

## Several paths converge

From above, late 2024 and early 2025 look like several people, including Sottiaux and Embiricos, working at angles on the same question once coding became a top-level company goal. Brockman told Shipper the open question was the form factor: terminal, editor, or the cloud, on the agent's own computer. Some paths were dead ends. Nobody knew which.

Altman told Ben Thompson in 2025 that OpenAI is in some sense betting on a series of startups, all of them internal. People inside sometimes find the parallel work chaotic. Shipper has run a similar strategy and knows how thin the line is between room to explore and a mess. He also came to see it as necessary while the frontier keeps moving. Fast sustaining progress at the model level, in Clayton Christensen's term, keeps making new kinds of apps possible and disrupting the last ones. A model that finishes a line of code fits autocomplete. A model that can think for 30 seconds fits a chat sidebar. A model that can work for an hour wants to be something else. A product that fits the previous model does not tell you what is next.

By early 2025 OpenAI was ready to combine forces. Sottiaux's group merged with an effort called Scientist Assistant, which brought him together with Embiricos. Brockman said they merged two internal coding efforts, then another two. The crew was small: product thinkers like Embiricos, infrastructure engineers like Sottiaux, researchers like Mia Glaese.

Glaese had come from DeepMind, where she worked on Gemini and alignment. At OpenAI she owned the data used for training and alignment, the data that shapes specific behavior. She is bluntly quantitative: trusting vibes is not that useful in research. She also laughs at how much of training a model is a leap. Every run is a magical adventure that starts with "how are we going to do that?"

A team with product and research side by side is unusual in AI. The field has paid star researchers on a different scale from everyone else, and labs have long tried to flatten that by titling most technical people Member of Technical Staff, researcher or not. Working next to product let the researchers see how models were used and hear what people wanted next. Product could ask for a behavior; research could try to make it. Sottiaux's loop, now running between a model and the product on top of it.

OpenAI had a Codex team. They still had to decide what to build.

## The cloud version

At Anthropic, another approach was already moving. On February 24, 2025 the company released Claude 3.7 Sonnet and a research preview of Claude Code. Claude Code had no built-in editor. It ran in the terminal and worked on the files on your computer: you said what you wanted, it read, edited and ran. Because the work landed in the files and tools you already had, you could interrupt it, and you could carry lessons from one session into the next. Codex Cloud, with throwaway cloud computers, could not.

Developers took to it. At Every, Edmar Ferreira wrote in a March 2025 Vibe Check that Claude Code was better than anything he had used on the agent side. The rest of the team was coming around.

That spring the merged Codex team aimed at a different future: Codex Cloud, an agent in the cloud with its own computer, built for asynchronous work, so a person could delegate from a computer or a phone. They gave themselves about seven weeks. In ChatGPT's sidebar you opened a workspace, described a task and hit Code. The task went to a queue. Codex copied the repo onto an isolated machine, edited files, ran tests and linters, and returned a summary, a diff and a button to open a pull request.

It launched on May 16, 2025, nearly three months before the Mission Bay meeting. Sottiaux called it very successful internally. Outside, the launch drew interest and little sustained use. Developers had to recreate their laptop's software, permissions and settings in the cloud, sometimes over hours of copying credentials and installing packages. Once set up, it could deliver a well-specified task. You could not interrupt it, and a follow-up prompt started a fresh machine.

Shipper's launch-day Vibe Check said it was a tool for a tech lead adding features or fixing bugs on an existing codebase, and the wrong tool if you were trying to vibe-code a new one-person company. Inside OpenAI, standardized environments hid how much setup everyone else was being asked to do. Embiricos later said it was also too early: the models were not smart enough. Glaese said they had been building toward a future vision, and had skipped "go to people where they are," which was on the laptop.

Shipper asked why they had skipped the terminal form that was starting to work for Anthropic. Sottiaux said they had not skipped it. They built an internal version, used it for a month, and discarded it to go for the full cloud product, because they were optimizing for what they thought they would gain if they were willing to invest heavily in setup. Behind that is a belief Shipper heard over and over inside OpenAI: the ideal agent works for you in the cloud and keeps going after you shut the laptop. Brockman said the same thing. If you project forward, the right form is an AI in the cloud with its own laptop, and they built that. The choice was also a truce with model limits. The first Cloud product was built around models that could spend longer on a task.

OpenAI did ship a small open-source Codex CLI on April 16, 2025, a month before Cloud, reminiscent of Claude Code. Embiricos described it as a side project built by about two people. The company's attention, and the specialized model trained for Cloud, were elsewhere. You could not even use the Codex model in the CLI. Running an agent on a user's computer also raised safety questions: it could edit files and run commands. Embiricos said the company's safety stance is very conservative, and getting comfortable with that capability took a lot of work. Early CLI users ran a general-purpose model, o4-mini by default, that had not been built as a coding agent.

Cloud missed product-market fit. The team's engineering manager left for Cursor, then the front-runner in AI coding at a $9 billion valuation. Around the same time OpenAI reportedly reached a $3 billion agreement to acquire Windsurf. The deal fell apart in July. Embiricos called the hardest stretch the period when they did not know what to do, or knew and could not see the progress. For the first time the Codex team, and a good part of OpenAI's coding ambition, was lost.

## Back to the local machine

A reasoning model is powerful because it can backtrack. If it rewrites the part of the code where it thinks a bug lives, and the bug is still there, it can drop the assumption and search again. After the Cloud launch, in the late spring and summer of 2025, the team was ready to try another path. Designer Ed Bayes, newly on the team, remembered the project as the backwaters of OpenAI. The sexy design work was ChatGPT.

Sottiaux became engineering manager there and changed direction. They pivoted to local: the agent on the developer's own computer, the way Claude Code did. They started from the local CLI, the two-person side project, and Sottiaux chose to rewrite the agent before piling on CLI features. The CLI was the interface. His priority was the machinery underneath, separated from the terminal so it could live in an editor, a desktop or mobile app, the cloud, or ChatGPT. They rebuilt it in Rust, a language aimed at systems where speed and safety both matter. The same machinery could later power the terminal and the editor extension.

They still lacked a model good enough to drive it.

## GPT-5 as a pair programmer

While the agent was being rebuilt, Michelle Pokrass was making GPT-5 better at real programming. She had led research on GPT-4.1 and was leading post-training for customers who wanted better interactive coding. A coding model can be like a student with a perfect SAT score and no job. OpenAI's models had done well in competitions, and that had not carried into everyday engineering. Brockman said they had never seen a messy codebase, or a programmer interrupting them halfway through. Pokrass's team sat with programmers, watched where the models broke, and turned those failures into repeatable training tasks.

That work produced the model Shipper met in Mission Bay in August 2025. Seen from inside the team's summer, the caution he felt made sense. After the burn of jumping straight to full autonomy, and with customers asking for a better collaborator, OpenAI had built a model that worked with a human step by step: it could read a messy codebase, explain a plan, investigate a bug, and pause before stepping out of line.

Compared with Claude Code, GPT-5 in the Codex CLI still felt behind to Every. Kieran's launch-day line was that GPT-5 was a Sonnet 3.5 killer, not a leap into the future. For most software engineers at the time, a careful collaborator was what they wanted. Handing production code to an autonomous agent was still commonly dismissed.

David Heinemeier Hansson, creator of Ruby on Rails, said around the GPT-5 launch that he did not let it drive his code. The joy, for him, was typing the code himself, and when the agent drove he could feel competence draining out of his fingers. By January 2026 he would [write](https://world.hey.com/dhh/promoting-ai-agents-3ee04945) that agents were fully capable of production-grade contributions to real codebases, and at Rails World in September he declared the end of writing code by hand at his company.

When the team followed GPT-5 with a VS Code and Cursor extension in late August, developers flocked to it. Each new user and feature request pulled the team toward step-by-step help. For Embiricos the same launch meant they could chase the larger ambition. The rebuilt local agent finally had a model that could drive it. Shipping GPT-5 with the revamped CLI, he said, created a self-fulfilling flywheel. He remembers thinking: finally we can fight.

## The next bet was a desktop app

With the CLI and the editor extension exploding, the logical move was to keep investing in both. Sottiaux decided they should keep maintaining the CLI, and put the next big investment into a native desktop app. Inside OpenAI he could see models finishing longer tasks and pulling in information from outside the repo, with voice and images coming. People would run several agents and spend the day with them. A text-only window from the 1970s was a poor home for half a dozen agents speaking in text, images, voice and video.

For Embiricos a local app also pointed at the workflow Cloud had missed, where you could not interrupt the agent. On your own computer you could start close and then, like onboarding a teammate, learn which tasks to leave. The same interface could eventually reach people who would never open a terminal.

Sottiaux brought in Andrew Ambrosino, a designer, programmer and former founder. Shipper compares him to B.J. Novak's character in The Office: dark hair, thick eyebrows, a small smile, privately amused. A post of his with 617 likes is the single word "ai." Another, with more than a thousand likes, is "tibo." Asked whose comedy he admires, Ambrosino said Tibo is his comedy idol.

The small group knew they wanted a desktop app and did not know what it looked like. The first mandate was to make it their own daily tool, lighter than an IDE. A few apps were already experimenting with a home for coding agents outside the terminal. Conductor, a Mac app, had a sidebar of tasks, each with its own agent and chat. ChatGPT offered another reference: a list of conversations and a thread in the middle. Ambrosino said the Codex app took more inspiration from chat than from VS Code. Anthropic already had a Claude desktop app.

They answered the basic questions quickly. Each task had its own conversation. The sidebar grouped conversations by project. The layout was a task list beside the selected conversation. Then the harder question: if the agent got something wrong, could you fix the code by hand inside Codex? They decided no. There would be no built-in editor. Changes went through the agent.

Ambrosino said they specifically wanted it to be a different thing from a code editor. Let people type code in the app and they would expect undo, search and shortcuts, and they would notice what Codex lacked. Meeting those expectations would have been a huge effort for a team of four. Codex could not win by being a bad editor. Coding with agents had to be good enough that developers would not miss the editor.

They were still building that replacement inside VS Code. Embiricos would come in and ask, around the table, whether anyone was maining the app. At first every answer was no. Without an editor, even a small correction meant a conversation. Dominik Kundel wrote in Slack that it felt cumbersome to prompt Codex just to replace a sentence. Ambrosino himself wrote in November that "no file editing" was the launch scope he was most skeptical about.

The market made the choice look riskier. In November 2025 Google released Antigravity, another coding tool on VS Code, agents plus a full editor. The team looked at each other and wondered if skipping a VS Code fork had been a huge mistake. They did not agree. Forking means taking a copy of an existing codebase and developing it as your own. VS Code's code is open source. Cursor and Windsurf both began that way, building AI features on Microsoft's editor.

The models were a problem too. OpenAI had launched the dedicated Codex line in September, and by November it was still too weak for the desktop product. Ambrosino said even a fully featured app would have been unreleasable at that quality.

Over the next weeks that changed. On November 19 OpenAI released GPT-5.1 Codex Max, which could code for hours. GPT-5.2 Codex followed on December 18, better at changes across large codebases. Glaese worked with the rest of the team to shorten the loop between developer feedback and model changes, aimed at the people using Codex, with benchmark scores behind that. Because the Codex line was separate from the main ChatGPT model, they could move without worrying about the 800 million people on ChatGPT.

By December more of the team was in the Codex app. Kundel wrote that he had craved an editor, and now most of his changes were inline comments, and fast. Ambrosino still steered the model and no longer edited its code by hand. Glaese called 5.2 the turning point where she got excited about what it could do for her. Over the holidays, across the industry, developers spent the break building whole apps with Opus 4.5 and GPT-5.2 without touching a line of code.

By early January the whole Codex team was on the app. The next question was whether the rest of OpenAI would use it. If not, Ambrosino said, back to the drawing board. By February it was spreading on the engineering and research teams. Noam Brown said he had fully switched. Brockman, devoted to the terminal and Emacs, switched too, and said the old workflow felt like going back in time. Altman later called it the most loved internal product they had ever had.

Codex Cloud had also been loved inside OpenAI, and flopped outside. Would this be different?

## Released on February 2, 2026

The macOS app went public on February 2, 2026. It looked like a chat app: a sidebar of current and past tasks, and a click that showed what the agent had done and let you send more instructions. One agent could fix a bug while another built a feature, each on its own copy of the code. You could steer closely or leave several assignments running.

Little of that was new. The Claude desktop app had let technical and nontechnical people do the same for months. Claude's app had been built in steps, Chat, then Code, then Cowork, and the interface felt tacked together: which tab, which permissions. The Codex app had none of those scars. Shipper's first use, alongside GPT-5.3 Codex a few days later, felt fast, simple and agent-native. Because the team had refused a code editor, the agent could do almost anything inside the app that a user could, including connecting a new tool if you asked it.

Part of that was a latecomer's advantage. The Claude desktop app already had tabs for Claude Code and Cowork, so the Codex team could see a path that had been tried. GPT-5.3 Codex was also a capability turn. Glaese said it was the first time they branched the Codex line out from programming-only training. They still named it Codex, and she was not claiming it was better at everything. They had started asking what else a coding agent needed for other knowledge work.

Shipper switched large parts of his work from Claude to Codex. On Proof, a document editor he was building, he watched it fix complex bugs with little intervention, then left it overnight. GPT-5.4 in early March made Codex his daily driver: still an expert coder, clearer about what it was doing and about what he wanted. The app was clean and fast enough that he started doing all of his work inside it. Many people at Every had reversed too, after a stretch when Claude was far ahead. Their GPT-5.4 Vibe Check said OpenAI was back.

Beyond Every, OpenAI said on March 19 that Codex had passed 2 million weekly users, with overall usage up fivefold since the start of the year. In April an in-app browser let the agent look things up and check its work on a live page. It could work across other Mac apps and preview documents, slides and spreadsheets. Someone who had never written code could ask for a presentation or a budget and see it without leaving the app.

By June, weekly users were past 5 million, and about one in five was a knowledge worker. On July 9 OpenAI made the Codex desktop app the new ChatGPT desktop app, with chat inside it. Under the hood the new ChatGPT still tells a Mac its name is com.openai.codex. Codex Cloud had shipped as a tab inside ChatGPT. Now ChatGPT runs on Codex.

Ed Bayes walked out of the all-hands where the merge was announced thinking about the distance traveled, from a few people in the corner to the future of ChatGPT. He told Shipper it felt like a piece of American corporate history.

## The whiteboard and The Innovator's Dilemma

Ten months after the GPT-5 launch, Shipper was back in a room with Embiricos, early June, a month before Codex would merge into ChatGPT, in OpenAI's downtown Manhattan office. Embiricos's role had just changed from product lead for the Codex agent to head of enterprise product. Shipper asked how the team had gone from Cloud's failure to the foundation of ChatGPT, and how they had avoided the pair-programming trap he had worried about in Mission Bay. Most teams build on what is working. This one had not.

Embiricos sketched the growth on a whiteboard. A short curve for Codex Cloud, a spike that flattened. A steeper curve for the CLI after GPT-5. A higher one for the editor extension. Then 5.3 Codex and the desktop app, a curve that dwarfed the others. The first mark looked like a scratch at the bottom of the board.

The drawing looked like a diagram from Christensen's The Innovator's Dilemma. Christensen traced how advances in disks and processors drove the shift from mainframes to minicomputers to desktops, laptops and phones, each leap in the hardware enabling a simpler form that opened a larger, less technical market. A pattern that took half a century and a succession of companies had played out inside OpenAI in ten months, with a handful of people. Model leaps kept outgrowing the interfaces around them, and the team moved from an editor sidebar, to a terminal, to a light desktop app with the editor removed.

In Christensen's account, the team on a winning curve almost never rides the next one. The existing product suffocates what comes after. Codex avoided that partly because OpenAI's executives had studied the trap. The company was built to behave like a portfolio of parallel bets, and the Codex team could iterate on its own product and model line outside ChatGPT's scale. Using AI to build AI changed the cost of starting over. In a traditional company a new product means months of meetings for budget and engineers, and the booming product usually wins. At OpenAI a handful of people using Codex to build Codex could stand up a new surface in weeks. Sottiaux had told Shipper it takes much less talking to convince people.

Embiricos had one more curve to draw. With millions of people trusting the agent on their own computers, the next step was the vision that had failed the previous spring: an agent that keeps working after you walk away. He said they were going to move to asynchronous work, which meant hoisting the product back to the cloud. Shipper noticed the laptop on the table, lid firmly closed.

Dan Shipper is cofounder and CEO of Every, where he writes the Chain of Thought column and co-hosts The Every Podcast.

The reporting draws on interviews with Greg Brockman, Alexander Embiricos, Thibault Sottiaux, Amelia Glaese, Andrew Ambrosino and Ed Bayes.

---

## For newcomers

- This is a reported story. The weekly-user figures, the valuations and "most loved internal product" are what the people in the piece, or OpenAI, said. They are not re-checked here.
- The through-line is that the form follows the model. A line-completing model fits an editor. A model that can think for a while fits a sidebar. A model that can work for a long time wants an interface you can leave. Codex Cloud bet on the last of those before the models and the setup were ready.
- After the editor extension took off, the next large investment was a desktop app with no code editor. Changes went through the agent. The team only made it their main tool once the models reached GPT-5.2 and GPT-5.3 Codex.
- On July 9, 2026 the Codex desktop app became the new ChatGPT desktop app. The process name is still com.openai.codex. Embiricos's last curve sends the work back to the cloud, now that people trust the agent on their own machines.

## Links

- [Original: How Codex Happened](https://every.to/p/how-codex-happened)
- [Every's launch-day Vibe Check of Codex Cloud](https://every.to/vibe-check/vibe-check-codex-openai-s-new-coding-agent)
- [DHH: Promoting AI agents](https://world.hey.com/dhh/promoting-ai-agents-3ee04945)
