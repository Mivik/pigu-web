import './assets/main.css';

import { createApp, h, provide } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { useUIState } from './ui';
import { songCover, chapterCover } from './misc';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

import 'notivue/notifications.css';
import 'notivue/animations.css';
import { createNotivue } from 'notivue';

const httpLink = createHttpLink({
  uri: '/api/graphql'
});
const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App)
});

const notivue = createNotivue();

app.use(createPinia()).use(router).use(notivue);

app.mount('#app');

const ui = useUIState();
router.beforeEach((_to, _from, next) => {
  ui.pageLoading = true;
  next();
});
router.afterEach((to) => {
  let cover = null;
  if (to.name === 'song' || String(to.name!).startsWith('song-'))
    cover = songCover(String(to.params.id));
  else if (to.name === 'chapter') cover = chapterCover(String(to.params.id));
  ui.cover = cover;
  ui.pageLoading = false;
});
