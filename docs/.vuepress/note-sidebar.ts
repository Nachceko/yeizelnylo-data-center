/**
 * Note 侧边栏配置 - 部署部分
 * 此文件被 collections.ts 导入使用
 * 实际配置数据存储在 note-sidebar.json 中，可通过 PagesCMS 编辑
 */

import noteSidebarData from './note-sidebar.json'

export const notesidebar = noteSidebarData.items.map(item => ({
  text: item.text,
  link: item.link,
  icon: item.icon,
  badge: item.badge_type && item.badge_text ? {
    type: item.badge_type,
    text: item.badge_text
  } : undefined
}))