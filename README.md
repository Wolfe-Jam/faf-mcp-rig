# faf-mcp-rig

**A minimal FAF-ready MCP server — reference + test rig.**

Two jobs:

1. **Reference** — what a FAF-composed MCP server looks like: a Trophy `project.faf`, a `server.json` carrying `one.faf/context` in `_meta` (emitter-sourced, honest-first), and `mcpName` matched to the registry name.
2. **Test rig** — a safe, disposable target to validate FAF publish tooling (`registry-preflight`, `/migrate-onefaf`, `/pubpro`) **without touching production servers**.

## Tools

| Tool | Returns |
|------|---------|
| `ping` | `pong` |
| `faf_context` | this server's `one.faf/context` block (honest-first) |

## Run

```bash
npm install && npm run build && npm start
```

**.faf source:** Use `bunx faf` (from faf-cli) to init/score/maintain the project.faf this rig demonstrates. Zero-install, git-native. See the [faf-cli agent guide](https://github.com/Wolfe-Jam/faf-cli/blob/main/docs/faf-cli-for-agents.md).
