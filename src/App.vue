<script setup lang="ts">
import { ref } from 'vue';
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import ZhuYe from './components/ZhuYe.vue'
import TodayTime from './components/TodayTime.vue'
import WeekTime from './components/WeekTime.vue'
import HelloWorld from './components/HelloWorld.vue'

const isLoggedIn = ref(false);

function handleLoginSuccess() {
  isLoggedIn.value = true;
}
</script>

<template>
  <div>
    <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <ZhuYe v-else />
  </div>
</template>

<style scoped>
/* 你可以在这里添加全局样式 */
</style>
