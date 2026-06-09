/*
 * @Author: error: git config user.email & please set dead value or install git
 * @Date: 2026-05-14 23:05:07
 * @LastEditors: error: git config user.email & please set dead value or install git
 * @LastEditTime: 2026-06-01 22:11:02
 */
import { defineConfig } from 'umi';

const isPWA = process.env.BUILD_MODE === 'pwa';

export default defineConfig({
  title: '物品清单',
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: '@/pages/home/index' },
        { path: '/outfit', component: '@/pages/outfit/index' },
        { path: '/settings', component: '@/pages/settings/index' },
        { path: '/settings/items', component: '@/pages/settings/items' },
        {
          path: '/settings/appearance',
          component: '@/pages/settings/appearance',
        },
        { path: '/settings/language', component: '@/pages/settings/language' },
        { path: '/settings/data', component: '@/pages/settings/data' },
        {
          path: '/settings/categories',
          component: '@/pages/settings/categories',
        },
        { path: '/item/:id', component: '@/pages/item/detail' },
      ],
    },
  ],
  plugins: ['@umijs/plugins/dist/tailwindcss', '@umijs/plugins/dist/locale'],
  tailwindcss: {},
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
    antd: false,
  },
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
  ],
  ...(isPWA
    ? {
        metas: [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, viewport-fit=cover',
          },
          { name: 'theme-color', content: '#87CEEB' },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
        ],
        links: [{ rel: 'manifest', href: '/manifest.json' }],
      }
    : {}),
});
