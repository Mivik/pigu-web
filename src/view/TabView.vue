<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router';

import { MIcon, vRipple } from '@/m';

export interface TabViewProps {
  icon: string;
  title: string;
  active: boolean;
  to: RouteLocationRaw;
  replace?: boolean;
}

defineProps<TabViewProps>();
</script>

<template>
  <RouterLink
    v-ripple
    class="can-click hover:bg-indigo-400/20 h-14 flex justify-center items-center m-0.5 rounded transition-colors"
    :class="{ 'bg-indigo-500/20': active }"
    :to="to"
    :replace="replace"
  >
    <MIcon :icon="icon" />
    <span class="ml-2 font-semibold select-none">{{ title }}</span>
  </RouterLink>
</template>
