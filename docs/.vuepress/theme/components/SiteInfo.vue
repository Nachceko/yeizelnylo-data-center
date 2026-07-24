<script setup lang="ts">
import { ref, onMounted } from 'vue'

const buildPlatform = ref('检测中...')
const buildTime = ref('')
const deviceInfo = ref({
  hostname: '',
  platform: '',
  arch: '',
  nodeVersion: '',
  cpuCores: 0,
  totalMemory: ''
})

onMounted(async () => {
  try {
    const response = await fetch('/build-info.json')
    if (response.ok) {
      const info = await response.json()
      buildPlatform.value = info.platform || 'Unknown'
      buildTime.value = info.buildTime ? new Date(info.buildTime).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) : 'Unknown'
      
      if (info.device) {
        deviceInfo.value = info.device
      }
    } else {
      buildPlatform.value = 'Local Development'
      buildTime.value = new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  } catch (error) {
    buildPlatform.value = 'Local Development'
    buildTime.value = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
})

const formatPlatform = (platform: string) => {
  const platformMap: Record<string, string> = {
    'win32': 'Windows',
    'darwin': 'macOS',
    'linux': 'Linux'
  }
  return platformMap[platform] || platform
}
</script>

<template>
  <div class="site-info-container">
    <div class="site-info-title">站点信息</div>
    <div class="site-info-item">
      <span class="site-info-label">构建平台</span>
      <span class="site-info-value">{{ buildPlatform }}</span>
    </div>
    <div class="site-info-item">
      <span class="site-info-label">构建时间</span>
      <span class="site-info-value">{{ buildTime }}</span>
    </div>
    
    <div class="site-info-divider">构建设备</div>
    <div class="site-info-item">
      <span class="site-info-label">主机名</span>
      <span class="site-info-value device-hostname">{{ deviceInfo.hostname || '-' }}</span>
    </div>
    <div class="site-info-item">
      <span class="site-info-label">操作系统</span>
      <span class="site-info-value">{{ formatPlatform(deviceInfo.platform) }} {{ deviceInfo.arch || '-' }}</span>
    </div>
    <div class="site-info-item">
      <span class="site-info-label">Node 版本</span>
      <span class="site-info-value">{{ deviceInfo.nodeVersion || '-' }}</span>
    </div>
  </div>
</template>

<style scoped>
.site-info-container {
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.site-info-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.site-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  font-size: 0.8rem;
}

.site-info-label {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.site-info-value {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.device-hostname {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
}

.site-info-divider {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--vp-c-divider);
}

[data-theme="dark"] .site-info-container {
  background: var(--vp-c-bg-soft);
}
</style>