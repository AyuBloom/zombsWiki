import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Function to recursively find all .md files in a directory
function findMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith(".md")) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function extractTitleAndDescription(content) {
  const lines = content.split("\n");
  let title = null;
  let titleLineIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^#\s+(.+)$/);
    if (match) {
      title = match[1].replace(/`/g, "").trim();
      titleLineIndex = i;
      break;
    }
  }

  if (!title) return { title: null, description: null };

  // Find the next paragraph
  let descriptionLines = [];
  let foundParagraph = false;
  let isNonText = false;

  for (let i = titleLineIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "") {
      if (foundParagraph) {
        // End of the paragraph
        break;
      }
      continue; // Skip empty lines before paragraph
    }

    if (!foundParagraph) {
      // First non-empty line
      if (
        /^[<>\-\*\+#\|]|^\d+\.|^```/.test(line) ||
        /^:::/.test(line) ||
        /^!\[/.test(line)
      ) {
        // Starts with a non-text markdown character, so it's not a text description
        isNonText = true;
        break;
      } else {
        foundParagraph = true;
        descriptionLines.push(line);
      }
    } else {
      descriptionLines.push(line);
    }
  }

  const description =
    foundParagraph && !isNonText
      ? descriptionLines
          .join(" ")
          .replace(/`/g, "")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      : null;
  return { title, description };
}

function updateHead(head, title, description) {
  if (!head || !Array.isArray(head)) {
    head = [];
  }

  // Filter out existing og:title, description, og:description
  head = head.filter((item) => {
    if (!Array.isArray(item) || item.length < 2) return true;
    if (item[0] !== "meta") return true;
    const attrs = item[1];
    if (attrs.property === "og:title") return false;
    if (attrs.name === "description") return false;
    if (attrs.property === "og:description") return false;
    return true;
  });

  if (description) {
    head.push([
      "meta",
      { property: "og:title", content: `${title} - zombs.io Wiki` },
    ]);
    head.push(["meta", { name: "description", content: description }]);
    head.push(["meta", { property: "og:description", content: description }]);
  }

  return head.length > 0 ? head : null;
}

function processFiles() {
  const srcDir = path.join(process.cwd(), "src");
  const mdFiles = findMarkdownFiles(srcDir);
  let updatedCount = 0;

  for (const filePath of mdFiles) {
    try {
      const rawContent = fs.readFileSync(filePath, "utf-8");

      if (rawContent.trim() === "") {
        continue;
      }

      const file = matter(rawContent);

      const hasTitle =
        typeof file.data.title === "string" &&
        file.data.title.trim().length > 0;

      let hasOgTitle = false;
      let hasDescription = false;
      let hasOgDescription = false;

      if (file.data.head && Array.isArray(file.data.head)) {
        for (const item of file.data.head) {
          if (Array.isArray(item) && item[0] === "meta" && item[1]) {
            if (item[1].property === "og:title") hasOgTitle = true;
            if (item[1].name === "description") hasDescription = true;
            if (item[1].property === "og:description") hasOgDescription = true;
          }
        }
      }

      const hasAllSeo = hasOgTitle && hasDescription && hasOgDescription;
      const hasAnySeo = hasOgTitle || hasDescription || hasOgDescription;

      if (hasTitle && (!hasAnySeo || hasAllSeo)) {
        continue;
      }

      const { title, description } = extractTitleAndDescription(file.content);

      if (!title) {
        console.log(
          `Skipped (No H1): ${path.relative(process.cwd(), filePath)}`,
        );
        continue;
      }

      file.data.title = `${title} - zombs.io Wiki`;
      const updatedHead = updateHead(file.data.head, title, description);
      if (updatedHead) {
        file.data.head = updatedHead;
      } else {
        delete file.data.head;
      }

      const newContent = matter.stringify(file.content, file.data);
      fs.writeFileSync(filePath, newContent, "utf-8");
      updatedCount++;

      console.log(
        `Updated: ${path.relative(process.cwd(), filePath)}${description ? " (with description)" : " (no description)"}`,
      );
    } catch (e) {
      console.error(`Error processing ${filePath}:`, e);
    }
  }
  console.log(`Successfully updated ${updatedCount} files.`);
}

processFiles();
