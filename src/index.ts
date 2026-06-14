#!/usr/bin/env node
/**
 * faf-mcp-rig — a minimal FAF-ready MCP server.
 *
 * Two tools, stdio transport. Born FAF-ready: a Trophy `project.faf` and a
 * `server.json` carrying `one.faf/context` in `_meta`. Doubles as the safe test
 * target for FAF publish tooling (registry-preflight, /migrate-onefaf, /pubpro)
 * so we never dogfood on a production server.
 */
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "faf-mcp-rig", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

const TOOLS = [
  {
    name: "ping",
    description: "Health check — returns pong.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "faf_context",
    description:
      "Return this server's FAF context block (one.faf/context), honest-first.",
    inputSchema: { type: "object", properties: {} },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  switch (req.params.name) {
    case "ping":
      return { content: [{ type: "text", text: "pong" }] };
    case "faf_context":
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                faf: "./project.faf",
                mediaType: "application/vnd.faf+yaml",
                deterministic: true,
              },
              null,
              2,
            ),
          },
        ],
      };
    default:
      return {
        content: [{ type: "text", text: `unknown tool: ${req.params.name}` }],
        isError: true,
      };
  }
});

await server.connect(new StdioServerTransport());
