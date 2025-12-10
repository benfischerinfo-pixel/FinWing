#!/usr/bin/env python3
"""Simple HTML minifier: removes HTML comments and collapses whitespace outside <script> tags.
Saves minified output to full-app-rich.min.html in the same folder.
"""
import re
from pathlib import Path

IN = Path('full-app.html')
OUT = Path('full-app-rich.min.html')

def minify_outside_scripts(text: str) -> str:
    # remove HTML comments
    text = re.sub(r'<!--([\s\S]*?)-->', '', text)
    # collapse whitespace (newlines/tabs/spaces) into single spaces
    text = re.sub(r"\s+", ' ', text)
    return text.strip()

pattern = re.compile(r'(<script\b[^>]*>)([\s\S]*?)(</script>)', re.I)

html = IN.read_text(encoding='utf-8')
parts = []
last = 0
for m in pattern.finditer(html):
    # text before script
    before = html[last:m.start()]
    parts.append(minify_outside_scripts(before))
    # script block unchanged (keep as-is)
    parts.append(m.group(1) + m.group(2) + m.group(3))
    last = m.end()
# tail after last script
tail = html[last:]
parts.append(minify_outside_scripts(tail))

minified = ''.join(p for p in parts if p)
OUT.write_text(minified, encoding='utf-8')
print(f'Wrote {OUT} ({OUT.stat().st_size} bytes)')
