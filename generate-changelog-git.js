import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANGELOG_PATH = path.join(__dirname, 'docs', 'guide', 'changelog.md');

function getGitCommits() {
  try {
    const result = execSync(
      'git log --pretty=format:"%H%n%h%n%s%n%b%n%ai%n---END---"',
      { 
        cwd: __dirname,
        encoding: 'utf8',
        maxBuffer: 1024 * 1024
      }
    );
    
    const commits = [];
    const blocks = result.split('---END---\n');
    
    blocks.forEach(block => {
      if (!block.trim()) return;
      
      const lines = block.trim().split('\n');
      if (lines.length < 5) return;
      
      const sha = lines[0];
      const shortSha = lines[1];
      const subject = lines[2];
      const body = lines.slice(3, -1).join('\n');
      const dateStr = lines[lines.length - 1];
      const date = dateStr.split(' ')[0];
      
      commits.push({
        sha: shortSha,
        fullSha: sha,
        subject,
        messageBody: body,
        date,
        htmlUrl: `https://github.com/Nachceko/yeizelnylo-data-center/commit/${sha}`
      });
    });
    
    return commits;
  } catch (error) {
    console.error('Git 命令执行失败:', error.message);
    throw new Error('请确保已安装 Git 并且在 PATH 中');
  }
}

function generateChangelog(commits) {
  const commitsByDate = {};
  
  commits.forEach(commit => {
    const date = commit.date;
    
    if (!commitsByDate[date]) {
      commitsByDate[date] = [];
    }
    
    commitsByDate[date].push(commit);
  });

  const dates = Object.keys(commitsByDate).sort().reverse();
  
  let changelog = `---
title: 更新日志
createTime: ${new Date().toLocaleString('zh-CN', { 
  year: 'numeric', 
  month: '2-digit', 
  day: '2-digit', 
  hour: '2-digit', 
  minute: '2-digit', 
  second: '2-digit' 
}).replace(/\//g, '/')}
permalink: /guide/changelog/
copyright:
  author:
    name: YeizelNylo
---

`;

  dates.forEach(date => {
    changelog += `## ${date}\n\n`;
    
    commitsByDate[date].forEach(commit => {
      changelog += `- **${commit.subject}** [${commit.sha}](${commit.htmlUrl})\n`;
      
      if (commit.messageBody) {
        const lines = commit.messageBody.split('\n');
        const detailLines = lines.filter(line => {
          const trimmed = line.trim();
          return trimmed && 
                 !trimmed.startsWith('> beta-') && 
                 !trimmed.startsWith('beta-');
        });
        
        detailLines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.startsWith('- ')) {
            changelog += `  ${trimmed}\n`;
          } else if (trimmed) {
            changelog += `  - ${trimmed}\n`;
          }
        });
      }
      
      changelog += '\n';
    });
  });

  return changelog;
}

function main() {
  try {
    console.log('正在从本地 Git 仓库获取 commits...');
    const commits = getGitCommits();
    console.log(`获取到 ${commits.length} 个 commits`);
    
    const changelog = generateChangelog(commits);
    
    fs.writeFileSync(CHANGELOG_PATH, changelog, 'utf8');
    console.log(`✓ 更新日志已生成: ${CHANGELOG_PATH}`);
  } catch (error) {
    console.error('✗ 错误:', error.message);
    process.exit(1);
  }
}

main();