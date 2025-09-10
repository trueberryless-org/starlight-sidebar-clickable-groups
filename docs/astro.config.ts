import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightSidebarClickableGroups from 'starlight-sidebar-clickable-groups'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/trueberryless-org/starlight-sidebar-clickable-groups/edit/main/docs/',
      },
      plugins: [starlightSidebarClickableGroups()],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started'],
        },
      ],
      social: [
        { href: 'https://github.com/trueberryless-org/starlight-sidebar-clickable-groups', icon: 'github', label: 'GitHub' },
      ],
      title: 'starlight-sidebar-clickable-groups',
    }),
  ],
})
