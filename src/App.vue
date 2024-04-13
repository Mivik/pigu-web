<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router';

import { Notivue, Notification, slateTheme } from 'notivue';

import { useUIState } from './ui';

import { MIcon, MProgress, MSpinner, vRipple } from '@/m';
import TabView from '@/view/TabView.vue';

import { mdiAccount, mdiArrowLeft, mdiBook, mdiMusicBoxMultiple } from '@mdi/js';

const route = useRoute();

const ui = useUIState();
</script>

<template>
  <MProgress v-if="ui.pageLoading" class="fixed" />
  <div class="relative">
    <Notivue v-slot="item">
      <Notification :theme="slateTheme" :item="item" />
    </Notivue>
    <div class="-z-10 absolute pointer-events-none w-full h-screen">
      <img
        v-if="ui.cover"
        :src="ui.cover"
        class="h-[80vh] object-cover brightness-[20%] w-full transition-[opacity] duration-700"
        onload="this.style.opacity = 1"
        style="opacity: 0"
      />
      <div class="absolute w-full h-48 -mt-48 bg-gradient-to-b from-transparent to-base"></div>
    </div>
    <div class="w-full xl:w-3/4 mx-auto p-8">
      <div
        class="transition-[max-height] overflow-hidden h-12 flex items-center px-4 text-lg duration-700 delay-200"
        :class="{
          'max-h-12': !route.meta?.mainPage,
          'max-h-0': route.meta?.mainPage
        }"
      >
        <div v-ripple class="rounded-full shrink-0 p-2">
          <MIcon :icon="mdiArrowLeft" class="can-click" @click="$router.back()" />
        </div>
        <div v-for="item in ui.breadcumbs" class="whitespace-nowrap">
          <span class="text-white/20 px-3">/</span>
          <RouterLink v-if="item" class="font-semibold hover:underline" :to="item.to">
            {{ item.text }}
          </RouterLink>
          <MSpinner v-else class="w-6 h-6 inline-block" />
        </div>
      </div>

      <div
        class="overflow-hidden transition-[max-height] duration-[1s]"
        :class="{
          'max-h-48 md:max-h-40': route.meta?.mainPage,
          'max-h-0': !route.meta?.mainPage
        }"
      >
        <div class="flex flex-col h-48 md:h-40">
          <div class="grow">
            <span class="text-7xl font-poppins font-extrabold">Pigu</span>
            <span class="block mt-3 md:mt-0 md:inline ml-1 text-gray-400">
              精神状态美丽的 Phigros 查分器
            </span>
          </div>

          <div class="grid grid-flow-col w-full justify-stretch">
            <TabView
              :icon="mdiMusicBoxMultiple"
              title="曲目"
              :active="route.name === 'songs' || route.name === 'song'"
              :to="{ name: 'songs' }"
            />
            <TabView
              :icon="mdiBook"
              title="章节"
              :active="route.name === 'chapters' || route.name === 'chapter'"
              :to="{ name: 'chapters' }"
            />
            <TabView
              :icon="mdiAccount"
              title="个人"
              :active="route.name === 'profile'"
              :to="{ name: 'profile' }"
              :replace="false"
            />
          </div>
        </div>
      </div>

      <div>
        <RouterView v-slot="{ Component }">
          <Transition name="slide" mode="out-in">
            <KeepAlive include="SongsPage,ChaptersPage">
              <component :is="Component" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>
