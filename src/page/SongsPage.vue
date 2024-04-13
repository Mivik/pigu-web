<script setup lang="ts">
import { computed } from 'vue';

import { useQuery } from '@vue/apollo-composable';

import semver from 'semver';

import { songCover } from '@/misc';
import { GET_SONGS } from '@/query';

import Card from '@/view/Card.vue';
import CardsView from '@/view/CardsView.vue';
import LoadingPanel from '@/view/LoadingPanel.vue';

const query = useQuery(GET_SONGS),
  { result } = query;

interface Song {
  sid: string;
  name: string;
  composer: string;
  version: string;
}

const songs = computed(() => {
  let songs = result?.value.songs as Song[] | null;
  if (!songs) return null;
  songs = [...songs];
  songs.sort((x, y) => {
    let t = -semver.compare(x.version, y.version);
    if (t !== 0) return t;
    return x.name.localeCompare(y.name);
  });
  return songs;
});
</script>

<template>
  <div class="w-full py-2">
    <LoadingPanel v-if="!result" :query="query" />
    <CardsView v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <Card
        v-for="song in songs"
        :key="song.sid"
        :cover="songCover(song.sid, true)"
        :title="song.name"
        :subtitle="song.composer"
        :to="{ name: 'song', params: { id: song.sid } }"
      />
    </CardsView>
  </div>
</template>

<style>
@keyframes shimmer {
  0% {
  }
  to {
    transform: translateX(100%);
  }
}
</style>
