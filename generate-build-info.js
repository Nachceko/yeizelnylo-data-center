import { writeFileSync } from 'fs'
import { join } from 'path'
import os from 'os'

// 自动检测构建平台
function detectPlatform() {
  // Cloudflare Pages
  if (process.env.CF_PAGES) {
    return 'Cloudflare Pages'
  }
  // GitHub Actions
  if (process.env.GITHUB_ACTIONS) {
    return 'GitHub Actions'
  }
  // GitHub Pages
  if (process.env.GITHUB_PAGES) {
    return 'GitHub Pages'
  }
  // Cloudflare Workers
  if (process.env.CF_WORKER) {
    return 'Cloudflare Worker'
  }
  // Vercel
  if (process.env.VERCEL) {
    return 'Vercel'
  }
  // Netlify
  if (process.env.NETLIFY) {
    return 'Netlify'
  }
  // 手动指定
  if (process.env.VITE_BUILD_PLATFORM) {
    return process.env.VITE_BUILD_PLATFORM
  }
  
  return 'Local Development'
}

// 获取设备信息
function getDeviceInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    cpuCores: os.cpus().length,
    totalMemory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB`
  }
}

const buildInfo = {
  platform: detectPlatform(),
  buildTime: new Date().toISOString(),
  device: getDeviceInfo()
}

const outputPath = join(process.cwd(), 'docs', '.vuepress', 'public', 'build-info.json')
writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2), 'utf-8')

console.log(`✓ Build info generated: ${buildInfo.platform} at ${buildInfo.buildTime}`)
console.log(`✓ Device: ${buildInfo.device.hostname} (${buildInfo.device.platform} ${buildInfo.device.arch})`)