import { ref } from 'vue';
import { defineStore } from 'pinia';

import { type QueryReturn } from './query';

export function songCover(sid: string, thumbnail = false) {
  return `/api/cover/song/${sid}?thumbnail=${thumbnail}`;
}

export function chapterCover(sid: string, thumbnail = false) {
  return `/api/cover/chapter/${sid}?thumbnail=${thumbnail}`;
}

export const usePrefs = defineStore('prefs', {
  state: () => {
    let defaults = {
      accessToken: null as string | null
    };
    let local = window.localStorage.getItem('prefs');
    try {
      if (local) Object.assign(defaults, JSON.parse(local));
    } catch (e) {
      console.error(e);
    }
    return defaults;
  },
  actions: {
    save() {
      localStorage.setItem('prefs', JSON.stringify(this.$state));
    }
  }
});

export type SongLevelKind = 'EZ' | 'HD' | 'IN' | 'AT' | 'Legacy' | 'SP';

import IconPhi from './assets/rank/phi.webp';
import IconV from './assets/rank/v.webp';
import IconS from './assets/rank/s.webp';
import IconA from './assets/rank/a.webp';
import IconB from './assets/rank/b.webp';
import IconC from './assets/rank/c.webp';
import IconF from './assets/rank/f.webp';

export function getRankIcon(score: number) {
  if (score < 700000) return IconF;
  if (score < 820000) return IconC;
  if (score < 880000) return IconB;
  if (score < 920000) return IconA;
  if (score < 960000) return IconS;
  if (score < 1000000) return IconV;
  return IconPhi;
}

interface RequestEx extends RequestInit {
  json?: object;
  query?: Record<string, string>;
}

export function fetchApi<T>(path: string, request?: RequestEx): QueryReturn<T> {
  if (!request) request = {};
  request.headers = new Headers(request.headers);
  if (request.json) {
    request.headers.set('Content-Type', 'application/json');
    request.body = JSON.stringify(request.json);
  }
  if (request.query) path += '?' + new URLSearchParams(request.query).toString();

  const result = ref<any>();
  const loading = ref(true);
  const error = ref<Error | null>(null);
  let cancel: AbortController | null = null;
  function refetch() {
    cancel?.abort();
    cancel = new AbortController();
    loading.value = true;
    request!.signal = cancel.signal;
    fetch('/api' + path, request)
      .then(async (res) => {
        if (res.status < 400) result.value = await res.json();
        else {
          let error = await res.text();
          try {
            error = JSON.parse(error).error;
          } catch (e) {}
          throw new Error(error);
        }
      })
      .catch((e) => (error.value = e));
  }
  refetch();

  return {
    result,
    loading,
    error,
    refetch
  };
}
