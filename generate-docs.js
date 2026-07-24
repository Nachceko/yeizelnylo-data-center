import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GUIDE_DIR = path.join(__dirname, 'docs', 'guide');
const SIDEBAR_FILE = path.join(__dirname, 'docs', '.vuepress', 'guide-sidebar.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function getSubdirectories() {
  const items = fs.readdirSync(GUIDE_DIR);
  return items.filter(item => {
    const fullPath = path.join(GUIDE_DIR, item);
    return fs.statSync(fullPath).isDirectory();
  });
}

async function main() {
  try {
    console.log('\n📝 YeizelNylo 文档生成器\n');
    console.log('═'.repeat(50));

    const subdirs = getSubdirectories();
    console.log('\n📂 可用的文件夹:');
    subdirs.forEach((dir, index) => {
      console.log(`  ${index + 1}. ${dir}`);
    });

    let subdirIndex;
    while (true) {
      const input = await ask('\n请选择要创建文档的文件夹 (输入数字): ');
      subdirIndex = parseInt(input) - 1;
      if (subdirIndex >= 0 && subdirIndex < subdirs.length) {
        break;
      }
      console.log('⚠️  无效的选择，请重新输入');
    }

    const selectedSubdir = subdirs[subdirIndex];
    console.log(`✓ 已选择: ${selectedSubdir}`);

    let filename;
    while (true) {
      filename = await ask('\n请输入文件名 (英文，不含扩展名): ');
      if (!filename) {
        console.log('⚠️  文件名不能为空');
        continue;
      }
      if (filename.includes(' ')) {
        console.log('⚠️  文件名不能包含空格');
        continue;
      }
      if (!/^[a-zA-Z0-9_-]+$/.test(filename)) {
        console.log('⚠️  文件名只能包含英文字母、数字、下划线和连字符');
        continue;
      }
      break;
    }

    const title = await ask('\n请输入文档标题: ');
    if (!title) {
      console.log('⚠️  标题不能为空，使用文件名作为标题');
    }

    console.log('\n是否添加到侧边栏配置 (guide-sidebar.json)?');
    const addToSidebar = await ask('请输入 (y/n): ');

    let sidebarItem = null;
    if (addToSidebar.toLowerCase() === 'y' || addToSidebar.toLowerCase() === 'yes') {
      console.log('\n📋 请填写侧边栏配置信息:');
      
      let text = await ask('  text (显示名称): ');
      if (!text) {
        text = title || filename;
        console.log(`  未输入，使用标题: ${text}`);
      }
      const link = `/guide/${selectedSubdir}/${filename}/`;
      console.log(`  link (自动生成): ${link}`);
      
      const badge_type = await ask('  badge_type (类型: info/warning/danger/tip，留空则不设置): ');
      const badge_text = await ask('  badge_text (徽章文字，留空则不设置): ');

      sidebarItem = {
        text: text,
        link: link,
        icon: 'ri:file-text-line',
      };
      
      if (badge_type && badge_text) {
        sidebarItem.badge_type = badge_type;
        sidebarItem.badge_text = badge_text;
      }
      
      console.log('\n💡 提示: icon 字段需要手动修改 guide-sidebar.json 文件');
    }

    const createTime = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\//g, '/');

    const permalink = `/guide/${selectedSubdir}/${filename}/`;

    const mdContent = `---
title: ${title || filename}
createTime: ${createTime}
permalink: ${permalink}
tags:
  - 
copyright:
  author:
    name: YeizelNylo
---

# ${title || filename}

<!-- 在这里编写文档内容 -->

`;

    const outputPath = path.join(GUIDE_DIR, selectedSubdir, `${filename}.md`);
    fs.writeFileSync(outputPath, mdContent, 'utf8');
    console.log(`\n✓ 文档已创建: ${path.relative(__dirname, outputPath)}`);

    if (sidebarItem) {
      let sidebarData = { items: [] };
      
      if (fs.existsSync(SIDEBAR_FILE)) {
        sidebarData = JSON.parse(fs.readFileSync(SIDEBAR_FILE, 'utf8'));
      }
      
      sidebarData.items.push(sidebarItem);
      fs.writeFileSync(SIDEBAR_FILE, JSON.stringify(sidebarData, null, 2) + '\n', 'utf8');
      console.log(`✓ 侧边栏已更新: ${path.relative(__dirname, SIDEBAR_FILE)}`);
    }

    console.log('\n✅ 文档生成完成！\n');
  } catch (error) {
    console.error('\n✗ 错误:', error.message);
  } finally {
    rl.close();
  }
}

main();