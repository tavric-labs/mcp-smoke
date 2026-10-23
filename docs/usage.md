# Agent mode

The default mode connects to an MCP server, lists its tools, and lets an OpenAI or Anthropic model decide which MCP tool to call from your request.

```bash
mcp-smoke-agent [flags] [plain English request]
```

## Giving it a request

- Pass the request as trailing text.
- Use `--prompt "..."` for a one-shot call.
- Pipe stdin for one-shot usage.
- Omit the prompt to use [interactive mode](#interactive-mode).

If you use `--command` or `--transport=stdio` instead of `--server`, trailing arguments are passed to the stdio command, so give the request with `--prompt`.

## Choosing a server

`--server` accepts three forms:

| Form | Example |
| --- | --- |
| An HTTP URL | `http://localhost:3000/mcp` |
| A stdio command string | `go run ./cmd/mcp-test-server` |
| A JSON array command | `["go","run","./cmd/mcp-test-server"]` |

A command string is split on whitespace. Use the JSON array form when arguments contain spaces. The prefixes `stdio:` and `cmd:` are accepted before a command and are stripped.

`--server` cannot be combined with `--transport`, `--url` or `--command`. If you prefer the explicit flags:

```bash
mcp-smoke-agent --transport=http --url http://localhost:3000/mcp --prompt "your request"
mcp-smoke-agent --transport=stdio --command ./your-mcp-server --prompt "your request" -- --server-flag
```

The server must advertise the `tools` capability and return at least one tool, or the run fails.

## Provider and model

The CLI reads provider config from the shell environment or a dotenv file (`.env` by default):

- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- `OPENAI_MODEL` or `ANTHROPIC_MODEL`

Default models are `gpt-4.1-mini` for OpenAI and `claude-3-5-haiku-latest` for Anthropic.

How the provider is chosen:

- With `--provider openai` or `--provider anthropic`, that provider is used.
- Otherwise, if only one of the two API keys is set, that provider is used.
- If both keys are set, pass `--provider`, or the run fails.

Values in the shell environment take precedence over the dotenv file. `--api-key` and `--model` override both. A missing default `.env` is ignored; a missing file passed to `--env-file` is an error, and `--env-file ""` disables dotenv loading.

## Flags

| Flag | Default | Description |
| --- | --- | --- |
| `--server` | | Server spec: HTTP URL, stdio command string, or JSON array command. |
| `--transport` | | `stdio` or `http`. Inferred from `--url` or `--command` when omitted. |
| `--url` | | Streamable HTTP endpoint URL. |
| `--command` | | Stdio command to run. |
| `--prompt` | | Single prompt to run. Omit for stdin or interactive mode. |
| `--provider` | auto | `openai` or `anthropic`. |
| `--model` | provider default | Model name. |
| `--api-key` | | Provider API key. |
| `--env-file` | `.env` | Dotenv file for API keys and model names. Empty disables. |
| `--protocol` | `2025-06-18` | MCP protocol version the client announces. |
| `--timeout` | `60s` | Timeout per prompt. |
| `--max-steps` | `8` | Maximum model and tool turns per prompt. |

## Output and exit codes

- The model's final answer is written to stdout.
- Each tool call is logged to stderr as `tool> <name> <json arguments>`, for example `tool> add {"a":41,"b":1}`.
- If a tool call fails, the error is returned to the model as the tool result rather than ending the run. Calls to unknown tools and invalid tool arguments are handled the same way.
- Exceeding `--max-steps` ends the run with an error.

| Exit code | Meaning |
| --- | --- |
| `0` | Success, or `--help`. |
| `1` | A runtime failure: connecting, initializing, listing tools, or the model request. |
| `2` | Invalid flags or configuration, such as a missing server or API key. |

## Interactive mode

With no prompt and no piped stdin, the CLI prints a banner on stderr listing the connected server, provider, model and tools, then reads requests line by line.

- `tools` or `help` lists the server's tools again.
- `quit` or `exit` leaves the session, as does end of input.
- A failed request prints `error: ...` and the session continues.
