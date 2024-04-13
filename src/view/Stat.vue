<script setup lang="ts">
const SIZES = {
  xl: 'text-xl',
  '5xl': 'text-5xl'
};

withDefaults(
  defineProps<{
    title: string;
    content?: string;
    size?: keyof typeof SIZES;
  }>(),
  { size: 'xl' }
);
</script>

<template>
  <div>
    <label class="text-gray-400">{{ title }}</label>
    <h1 v-if="content" class="font-semibold" :class="SIZES[size]">
      {{ content }}
    </h1>
    <slot />
  </div>
</template>
