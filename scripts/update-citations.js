const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch citation data for a single paper
async function fetchPaperCitations(title) {
    try {
        // Construct the search URL
        const searchQuery = encodeURIComponent(title);
        const url = `https://scholar.google.com/scholar?q=${searchQuery}`;
        
        // Add headers to mimic a browser request
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
        };

        // Make the request
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);

        // Find the first result that matches our title
        let citations = 0;
        $('.gs_ri').each((i, element) => {
            const resultTitle = $(element).find('.gs_rt').text().trim();
            if (resultTitle.toLowerCase().includes(title.toLowerCase())) {
                const citationText = $(element).find('.gs_fl a').text();
                const match = citationText.match(/Cited by (\d+)/);
                if (match) {
                    citations = parseInt(match[1], 10);
                }
                return false; // Break the loop
            }
        });

        return citations;
    } catch (error) {
        console.error(`Error fetching citations for "${title}":`, error.message);
        return null;
    }
}

// Function to update markdown files with new citation data
async function updateMarkdownFiles() {
    const publicationsDir = path.join(__dirname, '../content/publications');
    const files = fs.readdirSync(publicationsDir).filter(file => file.endsWith('.md') && file !== 'index.md');

    for (const file of files) {
        const filePath = path.join(publicationsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Extract title from front matter
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        if (!titleMatch) continue;
        
        const title = titleMatch[1];
        
        // Add a small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Fetch new citation count
        const citations = await fetchPaperCitations(title);
        if (citations === null) continue;

        // Update citations in front matter
        const updatedContent = content.replace(
            /citations:\s*\d+/,
            `citations: ${citations}`
        );

        // Only write if there are changes
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent);
            console.log(`Updated citations for ${file}: ${citations}`);
        } else {
            console.log(`No changes needed for ${file}`);
        }
    }
}

// Main function
async function main() {
    console.log('Starting citation update process...');
    try {
        await updateMarkdownFiles();
        console.log('Citation update completed successfully!');
    } catch (error) {
        console.error('Error during citation update:', error);
        process.exit(1);
    }
}

main(); 