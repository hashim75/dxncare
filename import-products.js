const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const results = [];
const outputDir = path.join(__dirname, 'content', 'products');

// 1. Create the content/products folder if it doesn't exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

// 2. Read the CSV
fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    
    console.log(`Found ${results.length} products. Converting...`);

    results.forEach((product) => {
      // 1. Identify critical fields (Slug & Description)
      // Webflow usually names them 'Slug' and 'Description'
      const slug = product['Slug'] || product['slug'] || product['Name'].toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      // We pull 'Description' OUT of the top section to be the main body text
      const description = product['Description'] || product['description'] || product['Body'] || "";

      // 2. Start building the file content
      let fileContent = `---
id: "${slug}"
`;

      // 3. DYNAMICALLY LOOP through ALL other columns
      Object.keys(product).forEach(key => {
        // Skip keys we handled separately or empty keys
        const lowerKey = key.toLowerCase();
        if (lowerKey === 'description' || lowerKey === 'body' || !key) return;

        let value = product[key];
        
        // Clean up the Key (make it computer-friendly, e.g., "Main Image" -> "main_image")
        let cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');

        // Clean up Price fields (remove "Rs.", "$", or commas)
        if (cleanKey.includes('price') || cleanKey.includes('cost')) {
            value = value ? value.toString().replace(/[^0-9.]/g, '') : "0";
        }

        // Clean up Text values (escape quotes so they don't break the file)
        if (typeof value === 'string') {
            value = value.replace(/"/g, '\\"').replace(/\n/g, ' ');
        }

        // Add to the list
        fileContent += `${cleanKey}: "${value}"\n`;
      });

      // Close the top section and add the description body
      fileContent += `---\n\n${description}`;

      // 4. Write the file
      try {
        fs.writeFileSync(path.join(outputDir, `${slug}.md`), fileContent);
        console.log(`✅ Created: ${slug}.md`);
      } catch (err) {
        console.error(`❌ Error creating ${slug}:`, err);
      }
    });

    console.log("🎉 Import Complete! All fields have been captured.");
  });