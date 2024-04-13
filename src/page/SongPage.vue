<script lang="ts">
export const songKey = Symbol('song') as InjectionKey<Ref<GetSong | undefined>>;
</script>

<script setup lang="ts">
import { ref, onUnmounted, watch, type InjectionKey, type Ref, provide } from 'vue';
import { useRoute, type LocationAsRelativeRaw } from 'vue-router';

import { useQuery } from '@vue/apollo-composable';

import { useUIState } from '@/ui';
import { GET_SONG, type GetSong } from '@/query';

import { MIcon, MSpinner, vRipple } from '@/m';

import { mdiChartAreaspline, mdiTrophy } from '@mdi/js';

const route = useRoute();

const sid = String(route.params.id);
const { result } = useQuery(GET_SONG, { sid });

const song = ref<GetSong>();
provide(songKey, song);

const ui = useUIState();
ui.breadcumbs = [
  {
    text: '歌曲',
    to: { name: 'songs' }
  },
  null
];
onUnmounted(
  watch(
    result,
    (res) => {
      if (res?.song) {
        let s = res.song as GetSong;
        ui.breadcumbs[1] = {
          text: s.name,
          to: { name: 'song', params: { id: sid } }
        };
        song.value = s;
      }
    },
    {
      immediate: true
    }
  )
);

interface TabConfig {
  icon: string;
  name: string;
  to: LocationAsRelativeRaw;
}
const TABS: TabConfig[] = [
  { icon: mdiChartAreaspline, name: '我的成绩', to: { name: 'song-my-record' } },
  { icon: mdiTrophy, name: '排行榜', to: { name: 'song-leaderboard' } }
];
</script>

<template>
  <div class="pt-[55vh]">
    <div v-if="result?.song">
      <h2>{{ result.song.composer }}</h2>
      <h1 class="text-5xl font-black" :title="sid">{{ result.song.name }}</h1>
    </div>
    <div class="mt-8 flex flex-col md:flex-row gap-4">
      <div class="md:w-1/4 rounded bg-slate-700 shadow-xl min-h-24 flex flex-col p-1 h-fit">
        <RouterLink
          v-for="tab in TABS"
          v-ripple
          :key="tab.name"
          :to="tab.to"
          class="rounded m-0.5 flex px-4 py-3"
          :class="{ 'bg-indigo-500/30': route.name === tab.to.name! }"
          replace
        >
          <MIcon :icon="tab.icon" />
          <span class="ml-2 select-none font-medium text-nowrap">{{ tab.name }}</span>
        </RouterLink>
      </div>
      <div class="grow shadow-xl rounded bg-slate-700 w-full">
        <RouterView v-if="song" v-show="!ui.pageLoading" v-slot="{ Component }">
          <Transition name="fade" mode="in-out">
            <component :is="Component" />
          </Transition>
        </RouterView>
        <div v-if="ui.pageLoading" class="w-full p-6">
          <MSpinner class="mx-auto w-12" />
        </div>
      </div>
    </div>
  </div>
</template>
