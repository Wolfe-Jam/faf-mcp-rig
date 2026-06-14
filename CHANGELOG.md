<!-- faf: faf-mcp-rig | TypeScript | mcp-server | FAF-ready MCP server rig — reference + test target, 2 tools -->
<!-- faf: doc=changelog | latest=v0.1.0 | canonical=project.faf | family=FAF -->

# Changelog

All notable changes to faf-mcp-rig will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-06-14 — The Rig Edition

**Born FAF-ready.** A minimal MCP server that ships with a Trophy `project.faf` and a `server.json` carrying `one.faf/context` in `_meta` — emitter-sourced (faf-cli `registryMeta()`), honest-first (no baked score; points to the `.faf`, asserts determinism). Doubles as the safe test target for FAF publish tooling.

### Added

- `ping` + `faf_context` tools (stdio transport).
- 🏆 Trophy 100% `project.faf`, bi-synced `CLAUDE.md`.
- `server.json` with `one.faf/context` `_meta` (nested under `io.modelcontextprotocol.registry/publisher-provided`).
- `.mcpb` Desktop Extension packaging (`manifest.json` + `pack:mcpb`).
- DNS-ready MCP Registry publish workflow — the `login dns` reference (not OIDC), so it works for the `one.faf` namespace.
- WJTTC smoke tests (brake: tool count · engine: ping).
