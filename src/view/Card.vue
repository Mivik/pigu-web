<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router';

defineProps<{
  cover: string;
  title: string;
  subtitle?: string;
  to: RouteLocationRaw;
}>();

function imageOnLoad(event: Event) {
  let el = event.target as HTMLImageElement;
  el.style.opacity = '1';
  let sibling = el.nextSibling as HTMLElement | null;
  if (sibling && sibling.classList.contains('shimmer')) sibling.remove();
}
</script>

<template>
  <RouterLink
    class="can-click group relative w-full aspect-[150/79] rounded-lg shadow-xl bg-gray-700 overflow-hidden"
    :to="to"
  >
    <img
      :src="cover"
      loading="lazy"
      @load="imageOnLoad"
      class="transition-[opacity,filter] w-full duration-300 brightness-50"
      style="opacity: 0"
      :alt="title"
    />
    <div
      class="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
    />
    <div class="absolute left-4 bottom-4">
      <p v-if="subtitle" class="text-sm text-gray-300">{{ subtitle }}</p>
      <p class="font-black text-xl group-hover:underline">{{ title }}</p>
    </div>
  </RouterLink>
</template>
