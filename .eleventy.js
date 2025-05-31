// .eleventy.js
const { DateTime } = require("luxon"); // npm install --save-dev luxon

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets (CSS, images, etc.)
  // Eleventy will copy these files/folders to the output directory (_site)
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  // You can add more passthrough copies for JS files, fonts, etc.
  // eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Set custom directories for input, output, includes, and data
  return {
    dir: {
      input: "content",       // Source files
      includes: "../_includes", // Relative to input directory
      data: "../_data",       // Relative to input directory
      output: "_site"         // Output directory (default)
    },
    markdownTemplateEngine: "njk", // Use Nunjucks for Markdown files
    htmlTemplateEngine: "njk",     // Use Nunjucks for HTML files
    templateFormats: ["md", "njk", "html"] // Which file extensions to process
  };
};