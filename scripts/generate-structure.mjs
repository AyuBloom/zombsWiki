import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "../src");
const PUBLIC_DIR = path.resolve(SRC_DIR, "public");
const README_PATH = path.resolve(__dirname, "../README.md");

const IGNORED_PATHS = [
  path.resolve(PUBLIC_DIR, "asset/image"),
];

function generateTree(dir, ignorePaths = [], depth = 0, prefix = "") {
  const items = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => {
      const fullPath = path.join(dir, item.name);
      return !ignorePaths.includes(fullPath) && item.name !== ".DS_Store";
    })
    .sort((a, b) => {
      // Directories first, then files alphabetically
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  let output = "";
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const connector = isLast ? "└── " : "├── ";
    output += `${prefix}${connector}${item.name}\n`;

    if (item.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      output += generateTree(path.join(dir, item.name), ignorePaths, depth + 1, newPrefix);
    }
  });
  return output;
}

function replaceCodeBlock(readme, sectionHeading, content) {
  const regex = new RegExp(
    `(${sectionHeading}[\\s\\S]*?\`\`\`)[\\s\\S]*?(\`\`\`)`,
  );
  if (!regex.test(readme)) {
    console.error(`Could not find "${sectionHeading}" section with a code block in README.md`);
    return readme;
  }
  return readme.replace(regex, `$1\n${content}$2`);
}

try {
  const layoutTree = "src/\n" + generateTree(SRC_DIR, [PUBLIC_DIR]);
  const assetsTree = "src/public/\n" + generateTree(PUBLIC_DIR, IGNORED_PATHS);

  let readme = fs.readFileSync(README_PATH, "utf-8");
  readme = replaceCodeBlock(readme, "### Website layout", layoutTree);
  readme = replaceCodeBlock(readme, "### Website assets", assetsTree);

  fs.writeFileSync(README_PATH, readme);
  console.log("Successfully updated README.md with project structure.");
} catch (error) {
  console.error("Error generating structure:", error);
  process.exit(1);
}
