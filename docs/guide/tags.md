---
title: 标签索引
permalink: /guide/tags/
createTime: 2026/07/19 18:43:30
copyright:
  author:
    name: YeizelNylo
---

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vuepress/client'

const route = useRoute()
const guidePosts = ref([])

// 定义 guide 文件夹下的所有文档（手动维护，确保 tags 能正确显示）
const guideDocs = [
  {
    title: 'Minecraft Java 安装指南',
    path: '/guide/jc/mcjava-windows-install/',
    tags: ['Minecraft Java'],
  },
  // 添加更多文档时，在这里添加对应的条目
]

onMounted(() => {
  guidePosts.value = guideDocs
})

const tagsTree = computed(() => {
  const tree = {}
  
  guidePosts.value.forEach(post => {
    const tags = post.tags || []
    tags.forEach(tag => {
      if (!tree[tag]) {
        tree[tag] = []
      }
      tree[tag].push({
        title: post.title,
        path: post.path,
      })
    })
  })
  
  return tree
})

const sortedTags = computed(() => {
  return Object.keys(tagsTree.value).sort()
})
</script>

## 标签索引

以下是 guide 文件夹内所有文档的标签分类：

<div v-if="sortedTags.length === 0" class="empty-tags">
  <p>暂无标签</p>
</div>

<div v-else class="tags-tree">
  <div v-for="tag in sortedTags" :key="tag" class="tag-group">
    <h3 class="tag-name">
      <span class="tag-icon">️</span>
      {{ tag }}
      <span class="tag-count">({{ tagsTree[tag].length }})</span>
    </h3>
    <ul class="tag-posts">
      <li v-for="post in tagsTree[tag]" :key="post.path" class="tag-post-item">
        <a :href="post.path" class="post-link">{{ post.title }}</a>
      </li>
    </ul>
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
  list-style: none;
  padding: 0;
  margin: 0;
}

.tag-post-item {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.tag-post-item::before {
  content: '├─';
  position: absolute;
  left: 0;
  color: var(--vp-c-text-3);
}

.tag-post-item:last-child::before {
  content: '─';
}

.post-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.2s;
}

.post-link:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

.empty-tags {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-3);
  font-size: 1.1rem;
}
</style>