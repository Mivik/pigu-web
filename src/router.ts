import { createRouter, createWebHistory } from 'vue-router';

import SongsPage from './page/SongsPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'songs',
      component: SongsPage,
      meta: { mainPage: true }
    },
    {
      path: '/chapters',
      name: 'chapters',
      component: () => import('./page/ChaptersPage.vue'),
      meta: { mainPage: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./page/ProfilePage.vue'),
    },
    {
      path: '/songs/:id',
      name: 'song',
      component: () => import('./page/SongPage.vue'),
      redirect: { name: 'song-my-record' },
      children: [
        {
          path: '',
          name: 'song-my-record',
          component: () => import('./page/song/MyRecord.vue')
        },
        {
          path: 'leaderboard',
          name: 'song-leaderboard',
          component: () => import('./page/song/Leaderboard.vue')
        }
      ]
    },
    {
      path: '/chapters/:id',
      name: 'chapter',
      component: () => import('./page/ChapterPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./page/LoginPage.vue')
    }
  ]
});

export default router;
