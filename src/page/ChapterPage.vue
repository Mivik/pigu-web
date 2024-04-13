<script setup lang="ts">
import { onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useQuery } from '@vue/apollo-composable';

import { useUIState } from '@/ui';
import { GET_CHAPTER } from '@/query';

const route = useRoute();

const sid = String(route.params.id);
const { result } = useQuery(GET_CHAPTER, { sid });

const ui = useUIState();
ui.breadcumbs = [
  {
    text: '章节',
    to: { name: 'chapters' }
  },
  null
];
onUnmounted(
  watch(result, (res) => {
    ui.breadcumbs[1] = {
      text: res?.chapter?.name,
      to: { name: 'chapter', params: { id: sid } }
    };
  })
);
</script>

<template>
  <div></div>
</template>
