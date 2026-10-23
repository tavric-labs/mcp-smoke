# Running in e2e harnesses

mcp-smoke gives an end-to-end test one realistic client. Send a plain-English request, let it go through the real MCP tool path, then check what your infrastructure did: routing, auth, logging, tracing, and whether analytics were generated for a real tool invocation.

## A check you can copy

[`scripts/agent-e2e.sh`](https://github.com/tavric-labs/mcp-smoke/blob/main/scripts/agent-e2e.sh) is the live check this repository runs. It:

1. requires `OPENAI_API_KEY` and writes it to a temporary env file (`.env` by default, or the path given as the first argument), then unsets it from the environment so the CLI has to read the file;
2. runs the agent against the bundled test server with the prompt `add 41 and 1`;
3. asserts that the combined output contains the tool-call trace `tool> add {"a":41,"b":1}` and the number `42`;
4. removes the env file and its log on exit.

The same shape works for your own server: replace `--server` and the prompt, and assert on the `tool>` trace and the answer.

## In this repository's CI

`ci.yml` runs on pushes and pull requests to `main`:

- `go test ./...`
- a Docker smoke test that builds the image and runs it
- a live agent e2e job that runs the script above only when an `OPENAI_API_KEY` secret is configured, and is skipped otherwise

## The Docker image

The repository's `Dockerfile` builds both `mcp-smoke-agent` and the test server into one image. Its entrypoint runs smoke mode against the bundled test server over stdio:

```bash
docker build -t mcp-smoke .
docker run --rm mcp-smoke
```

## The bundled test server

`cmd/mcp-test-server` is a small stdio MCP server for trying the CLI and for testing the CLI itself:

| Kind | Names |
| --- | --- |
| Tools | `echo`, `add`, `ping` |
| Prompts | `hello`, `hello-name` |
| Resources | `example-resource` (`mcp://example/resource`) |
