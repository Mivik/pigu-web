<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';

import { chapterCover } from '@/misc';
import { GET_CHAPTERS } from '@/query';

import Card from '@/view/Card.vue';
import CardsView from '@/view/CardsView.vue';
import LoadingPanel from '@/view/LoadingPanel.vue';

const query = useQuery(GET_CHAPTERS),
  { result } = query;
</script>

<template>
  <div class="w-full py-2">
    <LoadingPanel v-if="!result" :query="query" />
    <CardsView v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      <Card
        v-for="chapter in result.chapters"
        :key="chapter.sid"
        :cover="chapterCover(chapter.sid, true)"
        :title="chapter.name"
        :to="{ name: 'chapter', params: { id: chapter.sid } }"
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
