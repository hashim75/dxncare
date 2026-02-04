const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// CONFIGURATION
const CSV_FILE = 'blogs.csv';
const OUTPUT_DIR = path.join(__dirname, 'content/blogs');

// 1. Create the content/blogs folder
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`🚀 Starting Error-Free Blog Import from ${CSV_FILE}...`);

const results = [];

if (!fs.existsSync(CSV_FILE)) {
    console.error(`❌ Error: Could not find '${CSV_FILE}'.`);
    process.exit(1);
}

// 2. Read the CSV
fs.createReadStream(CSV_FILE)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        if (results.length === 0) {
            console.log("⚠️ Warning: CSV is empty.");
            return;
        }

        // Clean up old files first to prevent conflicts
        const files = fs.readdirSync(OUTPUT_DIR);
        for (const file of files) {
            fs.unlinkSync(path.join(OUTPUT_DIR, file));
        }
        console.log(`🧹 Cleaned up ${files.length} old files.`);

        results.forEach((row) => {
            // --- A. FIND CRITICAL FIELDS ---
            
            // Content Body
            const content = row['Content'] || row['Body'] || row['Description'] || row['Rich Text'] || "";

            // Slug Generation
            let slug = row['Slug'] || row['slug'] || row['Handle'];
            if (!slug) {
                const title = row['Title'] || row['title'] || row['Name'] || "untitled-post";
                slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
            }

            // --- B. BUILD FRONTMATTER ---
            // We manually add 'slug' here.
            let fileContent = `---
slug: "${slug}"
`;

            // --- C. DYNAMIC LOOP ---
            Object.keys(row).forEach(key => {
                const lowerKey = key.toLowerCase().trim();

                // 🚨 CRITICAL FIX: Skip 'slug' here because we added it above!
                if (lowerKey === 'slug' || lowerKey === 'content' || lowerKey === 'body' || lowerKey === 'description' || !key) return;

                let value = row[key];
                let cleanKey = lowerKey.replace(/[^a-z0-9_]/g, '_');

                // Handle Tags
                if (cleanKey === 'tags' || cleanKey === 'keywords') {
                    if (typeof value === 'string' && value.includes(',')) {
                        const tagsArray = value.split(',').map(t => t.trim()).filter(t => t);
                        fileContent += `${cleanKey}: ${JSON.stringify(tagsArray)}\n`;
                        return; 
                    }
                }

                // Clean Text
                if (typeof value === 'string') {
                    value = value.replace(/"/g, '\\"').replace(/\n/g, ' ');
                }

                fileContent += `${cleanKey}: "${value}"\n`;
            });

            // --- D. FINALIZE ---
            fileContent += `---\n\n${content}`;

            try {
                fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.md`), fileContent);
                console.log(`✅ Created: ${slug}.md`);
            } catch (err) {
                console.error(`❌ Error creating ${slug}:`, err);
            }
        });

        console.log("🎉 Import Complete! Duplicate keys fixed.");
    });