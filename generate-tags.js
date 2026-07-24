import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { load } from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GUIDE_DIR = path.join(__dirname, 'docs', 'guide');
const TAGS_FILE = path.join(GUIDE_DIR, 'tags.md');

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  
  try {
    return load(match[1]) || {};
  } catch (error) {
    console.error(`  ⚠️ YAML 解析失败: ${error.message}`);
    return {};
  }
}

function getAllMarkdownFiles(dir) {
  let results = [];
  
  if (!fs.existsSync(dir)) {
    return results;
  }
  
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith('.md') && file !== 'tags.md') {
      results.push(filePath);
    }
  });
  
  return results;
}

function generateTagsContent() {
  const files = getAllMarkdownFiles(GUIDE_DIR);
  const tagsTree = {};
  
  console.log('\n📄 解析文件:');
  files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(content);
    
    const title = frontmatter.title || path.basename(filePath, '.md');
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    
    const relativePath = path.relative(GUIDE_DIR, filePath);
    const permalink = '/guide/' + relativePath.replace(/\\/g, '/').replace('.md', '/');
    
    console.log(`  ✓ ${relativePath}`);
    console.log(`    标题: ${title}`);
    console.log(`    标签: ${tags.length > 0 ? tags.join(', ') : '(无)'}`);
    
    if (tags.length > 0) {
      tags.forEach(tag => {
        if (!tagsTree[tag]) {
          tagsTree[tag] = [];
        }
        tagsTree[tag].push({
          title,
          path: permalink,
          category: relativePath.split('/')[0],
        });
      });
    }
  });
  
  const sortedTags = Object.keys(tagsTree).sort();
  
  let content = `---
title: 标签索引
permalink: /guide/tags/
createTime: ${new Date().toLocaleString('zh-CN', { 
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit' 
}).replace(/\//g, '/')}
copyright:
  author:
    name: YeizelNylo
---

## 标签索引

以下是 guide 文件夹内所有文档的标签分类：

`;

  if (sortedTags.length === 0) {
    content += `<div class="empty-tags">
  <p>暂无标签</p>
</div>
`;
  } else {
    content += `<div class="tags-tree">
`;
    
    sortedTags.forEach(tag => {
      content += `
## ${tag} (${tagsTree[tag].length})

<div class="tag-posts">
`;
      
      tagsTree[tag].forEach(post => {
        content += `  <div class="tag-post-item">
    <span class="post-category">${post.category}</span>
    <a href="${post.path}" class="post-link">${post.title}</a>
  </div>
`;
      });
      
      content += `</div>

`;
    });
    
    content += `</div>
`;
  }
  
  content += `
<style scoped>
.tags-tree {
  margin-top: 2rem;
}

.tag-group {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.tag-name {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--vp-c-brand);
}

.tag-icon {
  font-size: 1.2rem;
}

.tag-count {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  font-weight: normal;
}

.tag-posts {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tag-post-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 3px solid var(--vp-c-brand-light);
  transition: all 0.2s;
}

.tag-post-item:hover {
  border-left-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  transform: translateX(4px);
}

.post-category {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--vp-c-brand);
  color: white;
  font-size: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  min-width: 3rem;
  text-align: center;
  flex-shrink: 0;
}

.post-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-weight: 500;
  flex: 1;
  transition: color 0.2s;
}

.post-link:hover {
  color: var(--vp-c-brand);
}

.empty-tags {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-3);
  font-size: 1.1rem;
}
</style>
`;
  
  return content;
}

function main() {
  try {
    console.log('\n🔍 正在扫描 guide 目录...');
    const content = generateTagsContent();
    
    fs.writeFileSync(TAGS_FILE, content, 'utf8');
    console.log(`\n✓ 标签索引已生成: ${TAGS_FILE}`);
  } catch (error) {
    console.error('\n✗ 错误:', error.message);
    process.exit(1);
  }
}

main();