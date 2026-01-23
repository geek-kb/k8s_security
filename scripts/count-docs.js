#!/usr/bin/env node
/**
 * Counts all files in docs/ and guides/ directories
 * and writes the count to a JSON file for use in the landing page.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIRS = ['docs', 'guides'];
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'doc-count.json');

function countFiles(dir, basePath = '') {
  const fullPath = path.join(basePath || process.cwd(), dir);
  let count = 0;

  if (!fs.existsSync(fullPath)) {
    return 0;
  }

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(entry.name, fullPath);
    } else if (entry.isFile()) {
      count++;
    }
  }

  return count;
}

function main() {
  let totalCount = 0;

  for (const dir of DOCS_DIRS) {
    const count = countFiles(dir);
    console.log(`  ${dir}/: ${count} files`);
    totalCount += count;
  }

  console.log(`  Total: ${totalCount} documentation pages`);

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the count to JSON
  const data = {
    count: totalCount,
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`  Written to: ${OUTPUT_FILE}`);
}

main();
