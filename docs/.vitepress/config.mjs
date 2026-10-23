import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withMermaid } from 'vitepress-plugin-mermaid'

const docsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoDir = path.resolve(docsDir, '..')
const repoUrl = 'https://github.com/tavric-labs/mcp-smoke'
const siteUrl = 'https://mcp-smoke.tavric-labs.net'

// Links that leave docs/ (scripts, source files, ...) point at repo files;
// send them to GitHub instead of failing the dead-link check.
function repoLinks(md) {
  md.core.ruler.push('repo-links', (state) => {
    const rel = state.env.relativePath
    if (!rel) return
    const from = path.dirname(path.join(docsDir, rel))
    const walk = (tokens) => {
      for (const t of tokens) {
        if (t.type === 'link_open') {
          const href = t.attrGet('href')
          if (href && !/^([a-z]+:|#|\/)/i.test(href)) {
            const [file, hash = ''] = href.split('#')
            const abs = path.resolve(from, file)
            if (abs.startsWith(repoDir + path.sep) && !abs.startsWith(docsDir + path.sep)) {
              const isDir = fs.existsSync(abs) && fs.statSync(abs).isDirectory()
              const target = path.relative(repoDir, abs).split(path.sep).join('/')
              t.attrSet('href', `${repoUrl}/${isDir ? 'tree' : 'blob'}/main/${target}${hash ? '#' + hash : ''}`)
            }
          }
        }
        if (t.children) walk(t.children)
      }
    }
    walk(state.tokens)
  })
}

const description =
  'A small CLI that smoke-tests MCP servers through real plain-English requests, plus raw protocol checks without an LLM.'

export default withMermaid({
  title: 'mcp-smoke',
  titleTemplate: ':title | mcp-smoke',
  description,
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: `${siteUrl}/` },
  markdown: { config: repoLinks },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#6d4aea' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'mcp-smoke' }],
    ['meta', { property: 'og:title', content: 'mcp-smoke documentation' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: `${siteUrl}/logo.svg` }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ],
  mermaid: {
    theme: 'neutral',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    flowchart: { htmlLabels: true, curve: 'basis', padding: 14, wrappingWidth: 320, useMaxWidth: true },
    sequence: { mirrorActors: false, useMaxWidth: true }
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'mcp-smoke',
    nav: [
      { text: 'Get started', link: '/quick-start', activeMatch: '^/(install|quick-start)' },
      { text: 'Guides', link: '/usage', activeMatch: '^/(usage|smoke-mode|e2e)' },
      { text: 'How it works', link: '/how-it-works' },
      { text: 'Releases', link: `${repoUrl}/releases` }
    ],
    sidebar: [
      { text: 'Get started', items: [
        { text: 'Overview', link: '/overview' },
        { text: 'Install', link: '/install' },
        { text: 'Quick start', link: '/quick-start' } ] },
      { text: 'Guides', items: [
        { text: 'Agent mode', link: '/usage' },
        { text: 'Low-level smoke mode', link: '/smoke-mode' },
        { text: 'Running in e2e harnesses', link: '/e2e' } ] },
      { text: 'Concepts', items: [
        { text: 'How it works', link: '/how-it-works' } ] }
    ],
    socialLinks: [{ icon: 'github', link: repoUrl }],
    editLink: { pattern: `${repoUrl}/edit/main/docs/:path`, text: 'Edit this page on GitHub' },
    lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
    outline: { level: [2, 3], label: 'On this page' },
    docFooter: { prev: 'Previous', next: 'Next' },
    search: { provider: 'local', options: { detailedView: true } },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Tavric Labs'
    }
  }
})
