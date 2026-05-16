import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to recursively find all .md files in a directory
function findMarkdownFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findMarkdownFiles(filePath, fileList);
        } else if (filePath.endsWith('.md')) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

function checkFiles() {
    const srcDir = path.join(process.cwd(), 'src');
    const mdFiles = findMarkdownFiles(srcDir);
    let errorCount = 0;

    for (const filePath of mdFiles) {
        try {
            const rawContent = fs.readFileSync(filePath, 'utf-8');
            
            if (rawContent.trim() === '') {
                continue;
            }

            const file = matter(rawContent);

            const hasTitle = typeof file.data.title === 'string' && file.data.title.trim().length > 0;
            
            let hasOgTitle = false;
            let hasDescription = false;
            let hasOgDescription = false;

            if (file.data.head && Array.isArray(file.data.head)) {
                for (const item of file.data.head) {
                    if (Array.isArray(item) && item[0] === 'meta' && item[1]) {
                        if (item[1].property === 'og:title') hasOgTitle = true;
                        if (item[1].name === 'description') hasDescription = true;
                        if (item[1].property === 'og:description') hasOgDescription = true;
                    }
                }
            }

            const hasAllSeo = hasOgTitle && hasDescription && hasOgDescription;
            const hasAnySeo = hasOgTitle || hasDescription || hasOgDescription;

            if (!hasTitle) {
                console.error(`Error: Missing 'title' in frontmatter for ${path.relative(process.cwd(), filePath)}`);
                errorCount++;
                continue;
            }

            if (hasAnySeo && !hasAllSeo) {
                console.error(`Error: Incomplete SEO fields in 'head' for ${path.relative(process.cwd(), filePath)}. Expected either none, or all three (og:title, description, og:description).`);
                errorCount++;
                continue;
            }

        } catch (e) {
            console.error(`Error processing ${filePath}:`, e);
            errorCount++;
        }
    }

    if (errorCount > 0) {
        console.error(`\nFrontmatter CI check failed: ${errorCount} file(s) do not meet the standards.`);
        process.exit(1);
    } else {
        console.log('Frontmatter CI check passed: All files meet the standards.');
    }
}

checkFiles();
