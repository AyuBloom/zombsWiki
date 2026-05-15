import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.resolve(ROOT_DIR, "src");
const CONFIG_PATH = path.resolve(ROOT_DIR, ".vitepress/config.mts");
const OUTPUT_PATH = path.resolve(ROOT_DIR, "src/public/llms.txt");

const BASE_URL = "https://ayubloom.github.io/zombsWiki";

/**
 * Extract the sidebar array from the VitePress config file.
 * Parses the TypeScript config to isolate the `sidebar: [...]` block,
 * then evaluates it as plain JavaScript (the sidebar is pure data).
 */
function extractSidebar() {
  const configContent = fs.readFileSync(CONFIG_PATH, "utf-8");

  // Find the `sidebar:` key and extract its array value
  const sidebarStart = configContent.indexOf("sidebar:");
  if (sidebarStart === -1) {
    throw new Error("Could not find `sidebar:` in config.mts");
  }

  // Find the opening bracket of the sidebar array
  let i = configContent.indexOf("[", sidebarStart);
  if (i === -1) {
    throw new Error("Could not find sidebar array opening bracket");
  }

  // Track bracket depth to find the matching closing bracket
  let depth = 0;
  let start = i;
  for (; i < configContent.length; i++) {
    if (configContent[i] === "[") depth++;
    else if (configContent[i] === "]") depth--;
    if (depth === 0) break;
  }

  const sidebarStr = configContent.slice(start, i + 1);

  // The sidebar is pure JS object literals — safe to evaluate
  // We need to handle unquoted keys and trailing commas (valid in JS, not JSON)
  const sidebar = new Function(`return ${sidebarStr}`)();
  return sidebar;
}

/**
 * Given a VitePress link (e.g. "/architecture/engine/overview"),
 * resolve the corresponding .md file and extract its first H1 heading.
 */
function getPageTitle(link) {
  // VitePress links map to src/<link>.md or src/<link>/index.md
  const candidates = [
    path.resolve(SRC_DIR, `${link.replace(/^\//, "")}.md`),
    path.resolve(SRC_DIR, `${link.replace(/^\//, "")}/index.md`),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const match = content.match(/^#\s+(.+)$/m);
      if (match) {
        // Strip any inline code backticks for cleaner display
        return match[1].replace(/`/g, "");
      }
    }
  }

  return null;
}

/**
 * Build the full URL for a page link.
 */
function buildUrl(link) {
  // Convert VitePress route to .md URL for LLM consumption
  if (link === "/") {
    return `${BASE_URL}/index.md`;
  }
  return `${BASE_URL}${link}.md`;
}

/**
 * Recursively walk a sidebar item's children and collect entries.
 * Returns an array of { text, link, children, depth } objects.
 */
function walkSidebarItems(items, depth = 0) {
  const entries = [];

  for (const item of items) {
    if (item.link) {
      const title = getPageTitle(item.link) || item.text;
      entries.push({ title, link: item.link, depth });
    }

    if (item.items && item.items.length > 0) {
      // This is a group heading
      entries.push({ heading: item.text, depth });
      entries.push(...walkSidebarItems(item.items, depth + 1));
    }
  }

  return entries;
}

/**
 * Generate the llms.txt content from the sidebar structure.
 */
function generateLlmsTxt(sidebar) {
  const lines = [];

  // Header
  lines.push("# zombs.io Wiki");
  lines.push("");
  lines.push("> Wiki for everything zombs.io");
  lines.push("");
  lines.push(
    "Documentation about zombs.io, a 2D multiplayer survival game. " +
      "Covers the game engine architecture, gameplay mechanics, buildings, " +
      "zombies, exploits, bugs, scripting, and community resources.",
  );
  lines.push("");
  lines.push("## Table of Contents");

  for (const section of sidebar) {
    lines.push("");

    // Top-level section heading (e.g. "Introduction", "Architecture", "Gameplay")
    lines.push(`### ${section.text}`);
    lines.push("");

    if (section.items) {
      const entries = walkSidebarItems(section.items);
      renderEntries(entries, lines);
    }
  }

  return lines.join("\n") + "\n";
}

/**
 * Render a flat list of entries (with depth info) into formatted lines.
 * Depth 0-1 entries with children become #### sub-headings.
 * Leaf entries become `- [Title](url)` list items.
 */
function renderEntries(entries, lines) {
  for (const entry of entries) {
    if (entry.heading !== undefined) {
      // Sub-group heading — use #### for nested sections
      if (entry.depth <= 1) {
        lines.push(`#### ${entry.heading}`);
        lines.push("");
      } else {
        // Deeper nesting: use ##### or just bold text
        lines.push(`##### ${entry.heading}`);
        lines.push("");
      }
    } else if (entry.link) {
      const url = buildUrl(entry.link);
      lines.push(`- [${entry.title} - zombs.io Wiki](${url})`);
    }
  }
}

// --- Main ---

try {
  const sidebar = extractSidebar();
  const output = generateLlmsTxt(sidebar);
  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`Successfully generated ${OUTPUT_PATH}`);
} catch (error) {
  console.error("Error generating llms.txt:", error);
  process.exit(1);
}
