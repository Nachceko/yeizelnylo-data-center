<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface LinkInfo {
  title: string
  description: string
  image: string
  hostname: string
}

const props = defineProps<{
  url: string
}>()

const linkInfo = ref<LinkInfo | null>(null)
const loading = ref(true)
const error = ref(false)

const fetchLinkInfo = async (url: string) => {
  try {
    loading.value = true
    error.value = false
    
    const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
    const data = await res.json()
    
    if (data.status === 'success' && data.data) {
      const { title, description, image, url: finalUrl } = data.data
      const hostname = new URL(finalUrl).hostname
      
      linkInfo.value = {
        title: title || hostname,
        description: description || finalUrl,
        image: image?.url || '',
        hostname
      }
    } else {
      const hostname = new URL(url).hostname
      linkInfo.value = {
        title: hostname,
        description: url,
        image: '',
        hostname
      }
    }
  } catch (err) {
    error.value = true
    console.error('Failed to fetch link info:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLinkInfo(props.url)
})

const handleClick = () => {
  window.open(props.url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <a :href="url" target="_blank" rel="noopener noreferrer" class="link-preview-card">
    <div v-if="loading" class="link-preview-loading">
      <div class="loading-spinner"></div>
    </div>
    <div v-else-if="error" class="link-preview-error">
      <span>⚠️ 无法加载预览</span>
    </div>
    <div v-else-if="linkInfo" class="link-preview-content">
      <div v-if="linkInfo.image" class="link-preview-image">
        <img :src="linkInfo.image" :alt="linkInfo.title" loading="lazy">
      </div>
      <div class="link-preview-info">
        <div class="link-preview-title">{{ linkInfo.title }}</div>
        <div class="link-preview-description">{{ linkInfo.description }}</div>
        <div class="link-preview-hostname">{{ linkInfo.hostname }}</div>
      </div>
    </div>
  </a>
</template>

<style scoped>
.link-preview-card {
  display: block;
  margin: 0.75rem 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  overflow: hidden;
}

.link-preview-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-preview-loading,
.link-preview-error {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--vp-c-border);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.link-preview-content {
  display: flex;
  gap: 0;
}

.link-preview-image {
  flex-shrink: 0;
  width: 120px;
  height: 100%;
  min-height: 80px;
  background: var(--vp-c-bg);
}

.link-preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.link-preview-info {
  flex: 1;
  padding: 0.6rem 0.75rem;
  min-width: 0;
}

.link-preview-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.link-preview-description {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-preview-hostname {
  font-size: 0.65rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .link-preview-content {
    flex-direction: column;
  }
  
  .link-preview-image {
    width: 100%;
    height: 100px;
  }
}
</style>