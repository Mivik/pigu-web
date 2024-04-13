<script setup lang="ts">
import { type GetRecord } from '@/query';
import { getRankIcon } from '@/misc';

import Stat from '@/view/Stat.vue';

defineProps<{
  record: GetRecord;
}>();
</script>

<template>
  <div
    class="flex border min-w-fit w-fit p-4 rounded-lg border-white/30 bg-gradient-to-br from-transparent to-gray-300/30"
  >
    <div class="mx-auto">
      <div class="flex">
        <Stat title="成绩" :content="String(record.score).padStart(7, '0')" size="5xl" />
        <img :src="getRankIcon(record.score)" class="w-24 h-24 ml-4 mt-2" />
      </div>
      <div class="flex gap-4 -mt-2">
        <Stat title="准度" :content="record.accuracy.toFixed(3) + '%'" />
        <Stat title="达成时间" :content="new Date(record.time).toLocaleString()" />
      </div>
    </div>
  </div>
</template>
