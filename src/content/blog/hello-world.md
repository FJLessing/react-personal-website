---
title: "Hello World: This Site Now Has a Blog"
description: "I rebuilt my personal site with static pre-rendering and a markdown blog engine. Here's how it works and what to expect."
date: 2026-07-28
tags: ["meta", "web-dev", "react"]
---

Welcome to the new blog section of my site. This is the very first post, written entirely in **markdown** and rendered at build time.

## How it works

Each post is a `.md` file with YAML frontmatter (title, description, date, tags). At build time a small Vite plugin turns every file into static HTML with [Shiki](https://shiki.style) syntax highlighting, and the whole site is pre-rendered to flat HTML files — no server runtime required.

```ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## What to expect

- Deep dives into Laravel, Vue, React and Flutter
- DevOps and server architecture notes
- Lessons from leading a dev team

> If you have topics you'd like me to cover, reach out via the contact section on the home page.

Stay tuned!
