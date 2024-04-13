<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { push } from 'notivue';

import { useQuery } from '@vue/apollo-composable';

import { GChart } from 'vue-google-charts';

import { usePrefs, fetchApi } from '@/misc';
import { useUIState } from '@/ui';
import { GET_HISTORY, type GetHistory } from '@/query';

import Stat from '@/view/Stat.vue';
import LoadingPanel from '@/view/LoadingPanel.vue';
import { MButton } from '@/m';

interface GetUser {
  name: string;
  avatar: string;
  rks: number;
  chal_rank: number;
}

const prefs = usePrefs();
const ui = useUIState();
ui.breadcumbs = [];

const router = useRouter();
if (!prefs.accessToken) {
  router.replace({ name: 'login' });
  push.error('请先登录');
}

const query = fetchApi<GetUser>('/sync', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${prefs.accessToken}`
    }
  }),
  { result } = query;

const avatar = ref<string>();
fetch('/api/avatar', {
  headers: {
    Authorization: `Bearer ${prefs.accessToken}`
  }
})
  .then(async (res) => {
    avatar.value = URL.createObjectURL(await res.blob());
  })
  .catch((e) => {
    push.error(e);
  });

const CHAL_CONFIG = [
  ['白', 'bg-gray-700'],
  ['绿', 'bg-green-600'],
  ['蓝', 'bg-blue-600'],
  ['红', 'bg-red-600'],
  ['金', 'bg-yellow-500'],
  ['彩', 'from-green-500 to-red-400 bg-gradient-to-br']
];
const chal = computed(() => {
  if (!result.value) return null;
  return CHAL_CONFIG[Math.floor(result.value.chal_rank / 100)];
});

const rksQuery = useQuery(GET_HISTORY, {
    token: prefs.accessToken
  }),
  { result: rksResult } = rksQuery;
const rksData = computed(() => {
  if (!rksResult.value) return null;
  let data: any[] = [['Time', 'RKS']];
  for (let item of rksResult.value.userHistories) {
    data.push([new Date(item.time), item.rks / 100]);
  }
  return data;
});

function logout() {
  prefs.accessToken = '';
  router.back();
  push.success('已退出登录');
}
</script>

<template>
  <div class="w-full flex">
    <div class="mt-2 flex flex-col lg:w-3/5 mx-auto">
      <h1 class="text-5xl font-poppins font-extrabold">个人</h1>

      <LoadingPanel v-if="!result" :query="query" />
      <div v-else class="p-4">
        <div class="flex gap-4">
          <img :src="avatar" class="w-48 h-48 rounded-full" />
          <div class="flex flex-col items-start gap-3">
            <Stat title="昵称" :content="result.name" />
            <Stat title="RKS" :content="result.rks.toFixed(3)" />
            <Stat title="课题等级">
              <p v-if="chal" class="rounded px-3 py-1 font-bold" :class="chal[1]">
                {{ chal[0] + ' ' + String(result.chal_rank % 100) }}
              </p>
            </Stat>
            <MButton class="mt-4" color="red" @click="logout">退出登录</MButton>
          </div>
        </div>
      </div>

      <LoadingPanel v-if="!rksResult" :query="rksQuery" />
      <GChart
        v-else
        :settings="{ packages: ['corechart'], language: 'zh' }"
        type="LineChart"
        class="text-white"
        :data="rksData"
        :options="{
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017'
          },
          backgroundColor: 'transparent',
          hAxis: {
            textStyle: { color: '#fff' }
          },
          vAxis: {
            textStyle: { color: '#fff' }
          },
          legend: {
            textStyle: {
              color: '#fff'
            }
          },
          titleTextStyle: {
            color: '#fff'
          },
          focusTarget: 'category',
          crosshair: { orientation: 'vertical', trigger: 'focus' }
        }"
      />
    </div>
  </div>
</template>
