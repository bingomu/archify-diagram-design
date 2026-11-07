#!/usr/bin/env node
// Insert the diagram-design CSS skin into an Archify explainer HTML.
// Usage: node scripts/apply-skin.mjs <archify-output.html> <skinned.html> [skin.css]
// Only adds one <style id="dd-skin"> before </head>. Never touches scripts or data-archify-artifact.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [input, output, skinArg] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node apply-skin.mjs <archify-output.html> <skinned.html> [skin.css]');
  process.exit(1);
}
if (path.resolve(input) === path.resolve(output)) {
  console.error('Refusing to overwrite the Archify original. Write to a new file so you can roll back.');
  process.exit(1);
}
const here = path.dirname(fileURLToPath(import.meta.url));
const skinPath = skinArg || path.join(here, '..', 'assets', 'dd-skin.css');
const css = fs.readFileSync(skinPath, 'utf8').trim();
let html = fs.readFileSync(input, 'utf8');

// Idempotent: drop an earlier dd-skin block if present.
html = html.replace(/<style id="dd-skin">[\s\S]*?<\/style>\n?/, '');
const at = html.indexOf('</head>');
if (at < 0) {
  console.error('No </head> found. Is this an Archify explainer HTML?');
  process.exit(1);
}
const out = html.slice(0, at) + `<style id="dd-skin">\n${css}\n</style>\n` + html.slice(at);
fs.writeFileSync(output, out);
console.log(JSON.stringify({ ok: true, input, output, skin: skinPath, bytes: Buffer.byteLength(out) }));
