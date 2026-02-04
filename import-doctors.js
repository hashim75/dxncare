const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// CONFIGURATION
const CSV_FILE = 'doctors.csv';
const OUTPUT_DIR = path.join(__dirname, 'content/doctors');

// 1. Create the content/doctors folder
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`🚀 Starting Doctor Import from ${CSV_FILE}...`);

const results = [];

if (!fs.existsSync(CSV_FILE)) {
    console.error(`❌ Error: Could not find '${CSV_FILE}'. Make sure it is in the root folder.`);
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

        // Clean up old files
        const files = fs.readdirSync(OUTPUT_DIR);
        for (const file of files) {
            fs.unlinkSync(path.join(OUTPUT_DIR, file));
        }
        console.log(`🧹 Cleaned up ${files.length} old doctor files.`);

        results.forEach((row) => {
            // --- A. FIND CRITICAL FIELDS ---
            
            // Content Body (Introduction or Bio)
            const content = row['Introduction'] || row['Bio'] || row['Description'] || row['Main Content'] || "";

            // Slug Generation
            let slug = row['Slug'] || row['slug'] || row['Handle'];
            if (!slug) {
                const name = row['Name'] || row['name'] || "doctor";
                slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
            }

            // --- B. BUILD FRONTMATTER ---
            let fileContent = `---
slug: "${slug}"
`;

            // --- C. DYNAMIC LOOP ---
            Object.keys(row).forEach(key => {
                const lowerKey = key.toLowerCase().trim();

                // 🚨 SKIP keys we handled manually to avoid duplicates
                if (lowerKey === 'slug' || lowerKey === 'introduction' || lowerKey === 'bio' || lowerKey === 'main content' || !key) return;

                let value = row[key];
                let cleanKey = lowerKey.replace(/[^a-z0-9_]/g, '_'); // e.g. "Registration Number" -> "registration_number"

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

        console.log(`🎉 Import Complete! Processed ${results.length} doctors.`);
    });