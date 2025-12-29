// add-lazy-loading.js
const fs = require('fs');
const path = require('path');

// Directory to process (change this if needed)
const ROOT_DIR = '.'; // current directory

// Regex to match <img> tags that don't already have loading attribute
const imgRegex = /<img\s+([^>]*?)\/?>/gi;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(imgRegex, (match, attrs) => {
    // Skip if already has loading="lazy" or loading="eager"
    if (/<img\s[^>]*\sloading\s*=\s*["'](?:lazy|eager)["']/i.test(match)) {
      return match;
    }
    // Skip if inside <noscript> – not handled here, but safe to skip anyway
    // Optional: skip images marked as critical
    if (/<img\s[^>]*\sdata-critical\b/i.test(match)) {
      return match;
    }

    // Insert loading="lazy" right after <img
    return match.replace(/<img\s/i, '<img loading="lazy" ');
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (file.endsWith('.html')) {
      processFile(filePath);
    }
  }
}

console.log('🔍 Scanning for HTML files...\n');
walk(ROOT_DIR);
console.log('\n✨ Done! All <img> tags updated with loading="lazy" (where applicable).');