import { defineClientConfig } from 'vuepress/client'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import BulletinContent from './theme/components/BulletinContent.vue'
import LinkPreview from './theme/components/LinkPreview.vue'
import Layout from './theme/Layout.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'

import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`
    app.component('BulletinContent', BulletinContent)
    app.component('LinkPreview', LinkPreview)

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
  layouts: {
    Layout,
  },
  setup() {
    // 添加《蔚蓝档案》风格点击特效的 Canvas 元素
    if (typeof window !== 'undefined') {
      const canvas = document.createElement('canvas')
      canvas.id = 'sparkCanvas'
      document.body.appendChild(canvas)
    }
  },
})