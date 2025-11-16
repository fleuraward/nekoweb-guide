const nunjucks = require("nunjucks");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  
  eleventyConfig.addNunjucksFilter("formatDate", (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  });

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItAttrs);

// adjust markdown so *this* makes <i>this</i>
  md.renderer.rules.em_open = () => '<i>';
  md.renderer.rules.em_close = () => '</i>';
// adjust markdown so **this** makes <b>this</b>
  md.renderer.rules.strong_open = () => '<b>';
  md.renderer.rules.strong_close = () => '</b>';

// adjust md smart punctuation
  md.core.ruler.push('disable_smart_punctuation', state => {
    state.tokens.forEach(token => {
      if (token.type === 'inline' && token.children) {
        token.children.forEach(child => {
          if (child.type === 'text') {
            child.content = child.content.replace(/…/g, '...');
            child.content = child.content.replace(/[“”]/g, '"');
            child.content = child.content.replace(/[‘’]/g, "'");
          }
        });
      }
    });
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      if (data?.permalinkStyle === "default") return;
      return `${data.page.filePathStem}.html`;
    }
  });  

  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/css/");

  const blockedPages = [
    "/random",
    "/home",
    "/sitemap"
  ];

  eleventyConfig.addCollection("allPages", function(collectionApi) {
    return collectionApi.getAll().filter(page => {
      return !page.url.startsWith("/assets/js/") && !blockedPages.includes(page.url);
    });
  });
  

  eleventyConfig.on("beforeBuild", () => {
    console.log("⏳ Build starting...");
  });

  eleventyConfig.on("afterBuild", () => {
    console.log("✅ Build complete. Have a nice day!");
  });

  return {
    dir: {
      input: "src",
      output: "docs.layercake.moe",
    },
  };
};