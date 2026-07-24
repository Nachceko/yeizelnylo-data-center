<script setup lang="ts">
import { Layout as ThemeLayout } from 'vuepress-theme-plume/client'
import SiteInfo from './components/SiteInfo.vue'
</script>

<template>
  <ThemeLayout>
    <template #aside-bottom>
      <SiteInfo />
    </template>
  </ThemeLayout>
</template>