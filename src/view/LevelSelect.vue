<script setup lang="ts">
import { type SongLevelKind } from '@/misc';

defineProps<{
  levels: SongLevelKind[];
}>();

const model = defineModel<SongLevelKind>({
  default: 'IN'
});

const COLORS: Record<SongLevelKind, string> = {
  EZ: 'bg-green-500',
  HD: 'bg-yellow-500',
  IN: 'bg-violet-500',
  AT: 'bg-red-500',
  Legacy: 'bg-gray-500',
  SP: 'bg-blue-500'
};
</script>

<template>
  <div class="flex justify-center">
    <div
      v-for="level in levels"
      :key="level"
      class="font-bold text-lg px-8 py-2 first:rounded-l last:rounded-r border border-white/40 border-r-0 last:border-r hover:opacity-80 can-click select-none transition-[opacity,background]"
      :class="{ [COLORS[level]]: model === level }"
      @click="model = level"
    >
      {{ level }}
    </div>
  </div>
</template>
