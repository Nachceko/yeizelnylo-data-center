---
title: 标签索引
permalink: /guide/tags/
createTime: 2026/07/21 09:21:20
copyright:
  author:
    name: YeizelNylo
    url: https://github.com/tb-miao
---

## 标签索引

以下是 guide 文件夹内所有文档的标签分类：

<div class="tags-tree">

## Minecraft Java (2)

<div class="tag-posts">
  <div class="tag-post-item">
    <span class="post-category">jc\mcjava-windows-install.md</span>
    <a href="/guide/jc/mcjava-windows-install/" class="post-link">Minecraft Java 安装指南</a>
  </div>
  <div class="tag-post-item">
    <span class="post-category">note\mcjava-command.md</span>
    <a href="/guide/note/mcjava-command/" class="post-link">Minecraft Java 指令笔记</a>
  </div>
</div>


## Minecraft Java Command (1)

<div class="tag-posts">
  <div class="tag-post-item">
    <span class="post-category">note\mcjava-command.md</span>
    <a href="/guide/note/mcjava-command/" class="post-link">Minecraft Java 指令笔记</a>
  </div>
</div>

</div>

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
