---
layout: home
title: Documentation
hero:
  name: mcp-smoke
  text: Smoke-test MCP servers in plain English
  tagline: A small CLI that sends real requests through your MCP server's tool path, and checks the surrounding infrastructure along the way.
  image:
    src: /logo.svg
    alt: mcp-smoke
  actions:
    - theme: brand
      text: Quick start
      link: /quick-start
    - theme: alt
      text: How it works
      link: /how-it-works
    - theme: alt
      text: View on GitHub
      link: https://github.com/tavric-labs/mcp-smoke
features:
  - icon: 💬
    title: Plain-English requests
    details: Say "add 41 and 1". A model reads your server's tool list and decides which MCP tool to call.
    link: /usage
    linkText: Agent mode
  - icon: 🔌
    title: Your server, either transport
    details: Point it at a Streamable HTTP URL or launch a stdio command. One client for both.
    link: /usage#choosing-a-server
    linkText: Server specs
  - icon: 🧪
    title: Raw protocol checks
    details: Skip the model. Initialize, list tools, prompts and resources, and optionally call them, with a JSON report.
    link: /smoke-mode
    linkText: Smoke mode
  - icon: 🔁
    title: Built for e2e harnesses
    details: One realistic client for end-to-end tests of routing, auth, logging, tracing and analytics.
    link: /e2e
    linkText: Harnesses and CI
  - icon: 🤖
    title: OpenAI or Anthropic
    details: Bring either provider key through the environment or a .env file.
    link: /usage#provider-and-model
    linkText: Provider config
  - icon: 📦
    title: Bundled test server
    details: A small MCP server with tools, prompts and a resource ships in the repository for trying things out.
    link: /e2e#the-bundled-test-server
    linkText: Test server
---

<div class="home-section">

## How a request flows

```mermaid
flowchart LR
    req["Plain-English request"] --> cli["mcp-smoke-agent"]
    cli <-->|"tool list + request"| llm["OpenAI or Anthropic"]
    cli <-->|"initialize, tools/list, tools/call"| srv["Your MCP server"]
    cli --> ans["Answer on stdout"]
```

## Start here

<div class="home-paths">
  <a class="home-path" href="./install">
    <strong>Install</strong>
    <span>Get the CLI with <code>go install</code>.</span>
  </a>
  <a class="home-path" href="./quick-start">
    <strong>Run your first request</strong>
    <span>Add an API key and call a tool on the bundled test server.</span>
  </a>
  <a class="home-path" href="./smoke-mode">
    <strong>Check protocol behaviour</strong>
    <span>Raw MCP checks with a machine-readable JSON report.</span>
  </a>
  <a class="home-path" href="./e2e">
    <strong>Wire it into CI</strong>
    <span>See how this repository runs its own end-to-end check.</span>
  </a>
</div>

</div>
