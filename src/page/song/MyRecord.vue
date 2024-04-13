<script setup lang="ts">
import { ref, computed, inject } from 'vue';

import { useQuery } from '@vue/apollo-composable';

import { GET_MY_RECORDS, type GetRecord } from '@/query';
import { usePrefs } from '@/misc';

import { songKey } from '../SongPage.vue';

import LevelSelect from '@/view/LevelSelect.vue';
import LoadingPanel from '@/view/LoadingPanel.vue';
import RequireLogin from '@/view/RequireLogin.vue';
import RecordView from '@/view/RecordView.vue';

import { GChart } from 'vue-google-charts';

const song = inject(songKey)!.value!;
const level = ref(song.levels[Math.min(3, song.levels.length) - 1].level);

const prefs = usePrefs();

const query = useQuery(GET_MY_RECORDS, {
    token: prefs.accessToken || '',
    songId: parseInt(song.id),
    level
  }),
  { result } = query;

const data = computed(() => {
  let records = result?.value.records as GetRecord[] | null;
  if (!records) return null;
  return [['Time', 'Score'], ...records.map((r) => [new Date(r.time), r.score])];
});
const last = computed(() => {
  let records = result?.value.records as GetRecord[] | null;
  if (!records || records.length === 0) return null;
  return records[records.length - 1];
});
</script>

<template>
  <div class="p-4 h-full">
    <RequireLogin v-if="!prefs.accessToken" class="mx-auto" />
    <div v-else class="h-full">
      <LevelSelect :levels="song.levels.map((it) => it.level)" class="mb-4" v-model="level" />
      <LoadingPanel v-if="!result" :query="query" />
      <div v-else class="w-full">
        <div v-if="result.records.length" class="flex justify-center">
          <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            <RecordView v-for="record in result.records" :record="record" />
          </div>
          <GChart
            v-if="false"
            :settings="{ packages: ['corechart'], language: 'zh' }"
            type="LineChart"
            :data="data"
            :options="{
              chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017'
              }
            }"
          />
        </div>
        <div v-else class="flex py-8">
          <h2 class="font-semibold mx-auto italic">没有，成绩；没有，打过。对</h2>
        </div>
      </div>
    </div>
  </div>
</template>
