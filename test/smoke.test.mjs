// WJTTC smoke tests — spawn the built server over stdio, drive the MCP handshake.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SERVER = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'index.js');

function drive(sends, wantId) {
  return new Promise((resolve) => {
    const p = spawn('node', [SERVER], { stdio: ['pipe', 'pipe', 'ignore'] });
    let buf = '';
    p.stdout.on('data', (d) => {
      buf += d.toString();
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i);
        buf = buf.slice(i + 1);
        if (!line.trim()) continue;
        let m;
        try { m = JSON.parse(line); } catch { continue; }
        if (m.id === wantId) { p.kill(); resolve(m); }
      }
    });
    p.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 't', version: '1' } } }) + '\n');
    setTimeout(() => { for (const s of sends) p.stdin.write(JSON.stringify(s) + '\n'); }, 300);
    setTimeout(() => { p.kill(); resolve(null); }, 5000);
  });
}

test('🛑 BRAKE — lists exactly 2 tools (ping, faf_context)', async () => {
  const r = await drive([
    { jsonrpc: '2.0', method: 'notifications/initialized' },
    { jsonrpc: '2.0', id: 2, method: 'tools/list' },
  ], 2);
  assert.ok(r, 'no tools/list response');
  const names = r.result.tools.map((t) => t.name).sort();
  assert.deepEqual(names, ['faf_context', 'ping']);
});

test('🔧 ENGINE — ping returns pong', async () => {
  const r = await drive([
    { jsonrpc: '2.0', method: 'notifications/initialized' },
    { jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'ping', arguments: {} } },
  ], 2);
  assert.ok(r, 'no tools/call response');
  assert.equal(r.result.content[0].text, 'pong');
});
