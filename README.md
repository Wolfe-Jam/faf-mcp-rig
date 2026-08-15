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

**.faf source:** `bunx faf` (from faf-cli) inits/scores/maintains the project.faf this rig demonstrates — zero-install, git-native.

## Citation

> Wolfe, J. (2025). *Format-Driven AI Context Architecture: The .faf Standard for Persistent Project Understanding*. Zenodo. https://doi.org/10.5281/zenodo.18251362

> Wolfe, J. (2026). *Why Agents Need a Passport: .fafa — Portable Identity for the Agentic Era*. Zenodo. https://doi.org/10.5281/zenodo.21951641

See [the faf-cli agent guide](https://github.com/Wolfe-Jam/faf-cli/blob/main/docs/faf-cli-for-agents.md).
