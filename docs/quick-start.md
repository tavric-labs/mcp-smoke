# Quick start

This runs a plain-English request against the small test server that ships in the repository. You need Go and an OpenAI or Anthropic API key.

## 1. Add your API key

Create a `.env` file in the directory you run the command from:

```bash
cat > .env <<'EOF'
OPENAI_API_KEY=your-key-here
EOF
```

The CLI also reads `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` from your shell environment. See [provider and model](usage.md#provider-and-model).

## 2. Ask for something

From a checkout of the repository:

```bash
go run ./cmd/mcp-smoke-agent \
  --server "go run ./cmd/mcp-test-server" \
  "add 41 and 1"
```

What happens:

1. The CLI starts the test server as a stdio subprocess and initializes MCP.
2. It lists the server's tools and gives them to the model.
3. The model calls the `add` tool. The call is logged on stderr as `tool> add {"a":41,"b":1}`.
4. The model's final answer is printed on stdout.

## 3. Point it at your own server

```bash
# a Streamable HTTP endpoint
mcp-smoke-agent --server http://localhost:3000/mcp "list what you can do"

# a stdio command
mcp-smoke-agent --server "./your-mcp-server --flag" "your request"
```

## 4. Try it without a model

Smoke mode needs no API key:

```bash
mcp-smoke-agent smoke --transport=http --url http://localhost:3000/mcp
```

Continue with [agent mode](usage.md) or [smoke mode](smoke-mode.md).
