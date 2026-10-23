# Install

## With Go

```bash
go install github.com/tavric-labs/mcp-smoke/cmd/mcp-smoke-agent@latest
```

This installs the `mcp-smoke-agent` binary into your Go bin directory. CI for this repository builds with Go 1.24.

## From a release

Pushing a `v*` tag builds `mcp-smoke-agent` for Linux, macOS and Windows on amd64 and arm64 and attaches them to the [GitHub release](https://github.com/tavric-labs/mcp-smoke/releases): a `.tar.gz` per Linux and macOS target, a `.zip` per Windows target, and a `checksums.txt` with SHA-256 sums. Each archive also contains `LICENSE` and `README.md`.

## From source

```bash
git clone https://github.com/tavric-labs/mcp-smoke.git
cd mcp-smoke
go run ./cmd/mcp-smoke-agent --help
```

## Check the install

```bash
mcp-smoke-agent --help
mcp-smoke-agent smoke --help
```

Running `mcp-smoke-agent` with no arguments prints usage and exits with status 2.
