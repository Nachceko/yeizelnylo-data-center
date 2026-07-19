import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANGELOG_PATH = path.join(__dirname, 'docs', 'guide', 'changelog.md');
const GITHUB_REPO = 'Nachceko/yeizelnylo-data-center';
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;

async function fetchCommitsFromGitHub(page = 1, perPage = 100, allCommits = []) {
  try {
    const url = `${GITHUB_API_BASE}/commits?per_page=${perPage}&page=${page}`;
    console.log(`正在从 GitHub API 获取 commits (第 ${page} 页)...`);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Changelog-Generator'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API 请求失败: ${response.status} ${response.statusText}`);
    }
    
    const commits = await response.json();
    
    if (!Array.isArray(commits) || commits.length === 0) {
      return allCommits;
    }
    
    const parsedCommits = commits.map(commit => ({
      sha: commit.sha.substring(0, 7),
      fullSha: commit.sha,
      subject: commit.commit.message.split('\n')[0],
      messageBody: commit.commit.message.split('\n').slice(1).join('\n'),
      date: commit.commit.author.date.split('T')[0],
      htmlUrl: commit.html_url
    }));
    
    allCommits.push(...parsedCommits);
    
    if (commits.length === perPage) {
      return fetchCommitsFromGitHub(page + 1, perPage, allCommits);
    }
    
    return allCommits;
  } catch (error) {
    console.error('GitHub API 请求失败:', error.message);
    throw error;
  }
}

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
    url: https://github.com/tb-miao
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

async function main() {
  try {
    let commits = [];
    
    console.log('正在从本地 Git 仓库获取 commits...');
    try {
      commits = getGitCommits();
      console.log(`本地获取到 ${commits.length} 个 commits`);
    } catch (error) {
      console.warn('本地 Git 获取失败，尝试使用 GitHub API...');
    }
    
    if (commits.length === 0) {
      console.log('本地 commits 为空，尝试从 GitHub API 获取...');
      commits = await fetchCommitsFromGitHub();
      console.log(`从 GitHub API 获取到 ${commits.length} 个 commits`);
    } else if (commits.length < 10) {
      console.warn(`本地只获取到 ${commits.length} 个 commits，可能不完整`);
      console.log('尝试从 GitHub API 获取完整 commits...');
      const githubCommits = await fetchCommitsFromGitHub();
      if (githubCommits.length > commits.length) {
        console.log(`从 GitHub API 获取到 ${githubCommits.length} 个 commits，使用 GitHub 数据`);
        commits = githubCommits;
      }
    }
    
    if (commits.length === 0) {
      throw new Error('无法获取任何 commits，请检查网络连接或 Git 配置');
    }
    
    const changelog = generateChangelog(commits);
    
    fs.writeFileSync(CHANGELOG_PATH, changelog, 'utf8');
    console.log(`✓ 更新日志已生成: ${CHANGELOG_PATH}`);
    console.log(`✓ 共包含 ${commits.length} 个 commits`);
  } catch (error) {
    console.error('✗ 错误:', error.message);
    process.exit(1);
  }
}

main();