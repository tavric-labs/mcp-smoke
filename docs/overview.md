# Overview

`mcp-smoke-agent` is a small CLI for smoke-testing MCP servers through real plain-English requests.

## Why use it in e2e harnesses

If you are building MCP server infrastructure, it gives you one realistic client for end-to-end tests.

Instead of hand-writing raw MCP requests for every case, you can send a plain-English request through the CLI, let it invoke the real MCP tool path, and verify the surrounding infrastructure behavior. That is useful for checking routing, auth, logging, tracing, and whether analytics are generated correctly for real tool-invocation flows.

## Two modes

| Mode | Command | Uses an LLM | Output |
| --- | --- | --- | --- |
| Agent (default) | `mcp-smoke-agent [flags] [request]` | Yes, OpenAI or Anthropic | The model's answer on stdout, tool calls logged on stderr |
| Smoke | `mcp-smoke-agent smoke [flags]` | No | A JSON report on stdout |

- [Agent mode](usage.md) connects to a server, lists its tools, and lets a model choose which one to call from your request.
- [Smoke mode](smoke-mode.md) runs raw MCP protocol checks, so you can test a server without any API key.

## Where to go next

- [Install](install.md) the CLI.
- Follow the [quick start](quick-start.md).
- Read [how it works](how-it-works.md) for the request flow.
