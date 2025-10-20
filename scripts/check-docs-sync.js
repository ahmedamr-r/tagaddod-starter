#!/usr/bin/env node

/**
 * Check if component documentation is synced and up-to-date
 *
 * This script verifies that:
 * 1. .component-documentation directory exists
 * 2. Essential documentation files are present
 * 3. Documentation is comprehensive enough for Claude skill usage
 *
 * Usage:
 *   node scripts/check-docs-sync.js
 */

import { readdirSync, statSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TEMPLATE_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(TEMPLATE_ROOT, '.component-documentation');

// Essential documentation files that should exist
const ESSENTIAL_DOCS = [
  'Button.mdx',
  'TextInput.mdx',
  'Table.mdx',
  'Modal.mdx',
  'Select.mdx',
  'ThemeProvider.mdx',
  'DesignTokens.mdx'
];

// Recommended documentation files
const RECOMMENDED_DOCS = [
  'Drawer.mdx',
  'Popover.mdx',
  'Tabs.mdx',
  'Checkbox.mdx',
  'Switch.mdx',
  'Sonner.mdx',
  'Tooltip.mdx',
  'Badge.mdx',
  'Avatar.mdx'
];

/**
 * Check if directory exists
 */
function checkDirectoryExists() {
  if (!existsSync(DOCS_DIR)) {
    console.log('❌ Documentation directory not found!');
    console.log(`   Expected: ${DOCS_DIR}`);
    console.log('\n💡 How to fix:');
    console.log('   If in monorepo: Run "yarn sync:docs" to copy documentation');
    console.log('   If standalone: Ensure .component-documentation is included in repo\n');
    return false;
  }
  return true;
}

/**
 * Get all .mdx files in documentation directory
 */
function getDocumentationFiles() {
  try {
    const files = readdirSync(DOCS_DIR)
      .filter(file => file.endsWith('.mdx'))
      .sort();
    return files;
  } catch (error) {
    console.error(`❌ Error reading documentation directory: ${error.message}`);
    return [];
  }
}

/**
 * Check file size
 */
function getFileSize(filepath) {
  try {
    const stats = statSync(filepath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

/**
 * Format bytes to human-readable
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Main execution
 */
function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  Tagaddod Design System - Documentation Sync Checker          ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Step 1: Check directory exists
  console.log('📂 Step 1: Checking documentation directory...\n');
  if (!checkDirectoryExists()) {
    process.exit(1);
  }
  console.log(`✅ Documentation directory exists: ${DOCS_DIR}\n`);

  // Step 2: Get all documentation files
  console.log('📄 Step 2: Scanning documentation files...\n');
  const allDocs = getDocumentationFiles();

  if (allDocs.length === 0) {
    console.log('❌ No documentation files found!\n');
    console.log('💡 How to fix:');
    console.log('   If in monorepo: Run "yarn sync:docs"');
    console.log('   If standalone: Ensure .mdx files are included\n');
    process.exit(1);
  }

  console.log(`✅ Found ${allDocs.length} documentation files\n`);

  // Step 3: Check essential documentation
  console.log('📋 Step 3: Checking essential documentation...\n');
  let essentialMissing = [];

  for (const doc of ESSENTIAL_DOCS) {
    if (allDocs.includes(doc)) {
      const filepath = path.join(DOCS_DIR, doc);
      const size = getFileSize(filepath);
      console.log(`   ✅ ${doc.padEnd(25)} (${formatBytes(size)})`);
    } else {
      console.log(`   ❌ ${doc.padEnd(25)} (MISSING)`);
      essentialMissing.push(doc);
    }
  }

  if (essentialMissing.length > 0) {
    console.log(`\n⚠️  Missing ${essentialMissing.length} essential documentation files`);
    console.log('   These files are critical for Claude skill functionality\n');
  } else {
    console.log('\n✅ All essential documentation files present\n');
  }

  // Step 4: Check recommended documentation
  console.log('📋 Step 4: Checking recommended documentation...\n');
  let recommendedMissing = [];

  for (const doc of RECOMMENDED_DOCS) {
    if (allDocs.includes(doc)) {
      console.log(`   ✅ ${doc.padEnd(25)}`);
    } else {
      console.log(`   ⚠️  ${doc.padEnd(25)} (optional)`);
      recommendedMissing.push(doc);
    }
  }

  if (recommendedMissing.length > 0) {
    console.log(`\n💡 ${recommendedMissing.length} recommended files missing (optional)\n`);
  } else {
    console.log('\n✅ All recommended documentation files present\n');
  }

  // Step 5: List all available documentation
  console.log('📚 Step 5: All available documentation:\n');
  const componentNames = allDocs.map(doc => doc.replace('.mdx', '')).join(', ');
  console.log(`   ${componentNames}\n`);

  // Summary
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║  Summary                                                       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log(`📊 Total documentation files: ${allDocs.length}`);
  console.log(`✅ Essential files present: ${ESSENTIAL_DOCS.length - essentialMissing.length}/${ESSENTIAL_DOCS.length}`);
  console.log(`📝 Recommended files present: ${RECOMMENDED_DOCS.length - recommendedMissing.length}/${RECOMMENDED_DOCS.length}`);

  if (essentialMissing.length === 0) {
    console.log('\n✨ Documentation is ready for Claude skill usage!\n');
    console.log('🤖 Claude Code agents can now automatically read component');
    console.log('   documentation from .component-documentation/ folder\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some essential documentation is missing');
    console.log('   Claude skill will fall back to Shadcn/Antd for missing components\n');
    console.log('💡 To sync documentation:');
    console.log('   - Monorepo: Run "yarn sync:docs"');
    console.log('   - Standalone: Ensure all .mdx files are in .component-documentation/\n');
    process.exit(1);
  }
}

// Run the script
main();
