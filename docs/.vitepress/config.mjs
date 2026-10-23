import { defineDocsConfig } from '@tavric-labs/docs-theme/config'

export default defineDocsConfig({
  name: 'mcp-smoke',
  repo: 'tavric-labs/mcp-smoke',
  siteUrl: 'https://mcp-smoke.tavric-labs.net',
  description:
    'A small CLI that smoke-tests MCP servers through real plain-English requests, plus raw protocol checks without an LLM.',
  nav: [
    { text: 'Get started', link: '/quick-start', activeMatch: '^/(install|quick-start)' },
    { text: 'Guides', link: '/usage', activeMatch: '^/(usage|smoke-mode|e2e)' },
    { text: 'How it works', link: '/how-it-works' },
    { text: 'Releases', link: 'https://github.com/tavric-labs/mcp-smoke/releases' }
  ],
  sidebar: [
    {
      text: 'Get started',
      items: [
        { text: 'Overview', link: '/overview' },
        { text: 'Install', link: '/install' },
        { text: 'Quick start', link: '/quick-start' }
      ]
    },
    {
      text: 'Guides',
      items: [
        { text: 'Agent mode', link: '/usage' },
        { text: 'Low-level smoke mode', link: '/smoke-mode' },
        { text: 'Running in e2e harnesses', link: '/e2e' }
      ]
    },
    {
      text: 'Concepts',
      items: [{ text: 'How it works', link: '/how-it-works' }]
    }
  ]
})
