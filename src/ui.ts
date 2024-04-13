import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue';
import { type RouteLocationRaw } from 'vue-router';

import { defineStore } from 'pinia';

export function useEventListener(
  name: string,
  callback: EventListenerOrEventListenerObject,
  target: EventTarget = document
) {
  onMounted(() => target.addEventListener(name, callback));
  onActivated(() => target.addEventListener(name, callback));
  onUnmounted(() => target.removeEventListener(name, callback));
  onDeactivated(() => target.removeEventListener(name, callback));
}

export const useUIState = defineStore('ui-state', {
  state: () => ({
    cover: null as string | null,
    pageLoading: false,
    breadcumbs: [] as ({ text: string; to: RouteLocationRaw } | null)[]
  })
});
