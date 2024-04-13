<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { push } from 'notivue';

import { MButton, MInput } from '@/m';
import { usePrefs } from '@/misc';
import { useUIState } from '@/ui';

const router = useRouter();

const ui = useUIState();
ui.breadcumbs = [];

const prefs = usePrefs();
const token = ref(prefs.accessToken || ''),
  tokenError = ref<string>();
watch(token, () => (tokenError.value = undefined));
function saveToken() {
  let t = token.value;
  if (!/^[a-z0-9]{25}$/.test(t)) {
    tokenError.value = '必须为 25 位小写字母和数字组合';
    return;
  }
  prefs.accessToken = t;
  prefs.save();
  router.back();
  push.success('登录成功');
}
</script>

<template>
  <div class="w-full flex">
    <div class="mt-2 flex flex-col lg:w-3/5 mx-auto">
      <h1 class="text-5xl font-poppins font-extrabold">登录</h1>
      <p class="mt-2 text-gray-400 max-w-screen-md">
        为什么，为什么会是登录呢？密码、用户名什么的都没有的话，还怎么能叫登录呢？ 如果记下 token
        也能算登录的话，那么写作业是否是一种登录呢？
        登录、登陆，到底是谁才对呢？录？录取？录音？录像？录音带？……
      </p>
      <div class="mt-8">
        <p class="text-sm text-gray-400">这里👇输入 Access Token</p>
        <MInput
          variant="flat"
          @enter="saveToken"
          :error="!!tokenError"
          autofocus
          v-model="token"
        ></MInput>
        <p v-if="tokenError" class="text-red-600 text-sm">{{ tokenError }}</p>
        <MButton class="mt-2 w-full" @click="saveToken">登录</MButton>
      </div>
    </div>
  </div>
</template>
