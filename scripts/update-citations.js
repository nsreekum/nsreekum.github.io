const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Scholar ID from your Google Scholar profile
const SCHOLAR_ID = 'V_4N7n0AAAAJ';

// Function to fetch citation data using scholar-scraper
async function fetchCitationData() {
    try {
        // Using scholar-scraper to get citation data
        // Note: You'll need to install scholar-scraper: npm install scholar-scraper
        const output = execSync(`scholar-scraper --author-id ${SCHOLAR_ID} --format json`).toString();
        return JSON.parse(output);
    } catch (error) {
        console.error('Error fetching citation data:', error);
        return null;
    }
}

// Function to update markdown files with new citation data
function updateMarkdownFiles(citationData) {
    const publicationsDir = path.join(__dirname, '../content/publications');
    const files = fs.readdirSync(publicationsDir).filter(file => file.endsWith('.md') && file !== 'index.md');

    files.forEach(file => {
        const filePath = path.join(publicationsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Extract title from front matter
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        if (!titleMatch) return;
        
        const title = titleMatch[1];
        
        // Find matching paper in citation data
        const paper = citationData.find(p => p.title.toLowerCase() === title.toLowerCase());
        if (!paper) return;

        // Update citations in front matter
        const updatedContent = content.replace(
            /citations:\s*\d+/,
            `citations: ${paper.citations}`
        );

        // Only write if there are changes
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
            console.log(`Updated citations for ${file}`);
        }
    });
}

// Main function
async function main() {
    console.log('Fetching citation data...');
    const citationData = await fetchCitationData();
    
    if (citationData) {
        console.log('Updating markdown files...');
        updateMarkdownFiles(citationData);
        console.log('Done!');
    } else {
        console.error('Failed to fetch citation data');
        process.exit(1);
    }
}

main(); 