import type { Plugin } from 'vuepress'
import type MarkdownIt from 'markdown-it'

export default function linkPreviewPlugin(md: MarkdownIt) {
  md.block.ruler.before('paragraph', 'link_preview_block', (state, startLine, endLine, silent) => {
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]
    const line = state.src.slice(pos, max)

    const match = line.match(/^:::\s*link-preview\s+(.+)\s*$/)
    if (!match) return false
    if (silent) return true

    const url = match[1].trim()

    // 查找闭合标记
    let nextLine = startLine + 1
    while (nextLine < endLine) {
      const nextPos = state.bMarks[nextLine] + state.tShift[nextLine]
      const nextMax = state.eMarks[nextLine]
      const nextLineText = state.src.slice(nextPos, nextMax)
      
      if (/^:::\s*$/.test(nextLineText)) {
        break
      }
      nextLine++
    }

    state.line = nextLine + 1

    const token = state.push('link_preview', 'link_preview', 0)
    token.meta = { url }
    token.content = url
    token.block = true

    return true
  })

  md.renderer.rules.link_preview = function(tokens: any[], idx: number) {
    const url = tokens[idx].meta.url
    return `<LinkPreview url="${url}" />`
  }
}

export function linkPreviewVuePressPlugin(): Plugin {
  return {
    name: 'vuepress-plugin-link-preview',
    extendsMarkdown: (md) => {
      md.use(linkPreviewPlugin)
    },
  }
}