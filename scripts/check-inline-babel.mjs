import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';

const filePath = path.resolve('frontend/index.html');
const html = fs.readFileSync(filePath, 'utf8');

const scriptRegex = /<script[^>]*type=["']text\/babel["'][^>]*>([\s\S]*?)<\/script>/i;
const match = html.match(scriptRegex);

if (!match) {
  console.error('Kein <script type="text/babel"> Block gefunden!');
  process.exit(1);
}

const scriptContent = match[1];
const scriptLines = scriptContent.split('\n');

try {
  parse(scriptContent, {
    sourceType: 'script',
    plugins: ['jsx']
  });
  console.log('OK: Inline-Babel-Script ist syntaktisch korrekt.');
  process.exit(0);
} catch (err) {
  const { loc } = err;
  if (!loc) {
    console.error('Parser-Fehler:', err.message);
    process.exit(1);
  }
  const errorLine = loc.line;
  const start = Math.max(0, errorLine - 11);
  const end = Math.min(scriptLines.length, errorLine + 9);
  console.error(`Parser-Fehler: ${err.message} (Zeile ${errorLine}, Spalte ${loc.column})`);
  for (let i = start; i < end; i++) {
    const ln = (i + 1).toString().padStart(4, ' ');
    const marker = (i + 1 === errorLine) ? '>>' : '  ';
    console.error(`${marker} ${ln}: ${scriptLines[i]}`);
  }
  process.exit(1);
}
