<template>
  <router-view />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useOnlineDurationStore } from './stores/useOnlineDurationStore';

const onlineDurationStore = useOnlineDurationStore();

onMounted(() => {
  onlineDurationStore.startTimer();
});

onBeforeUnmount(() => {
  onlineDurationStore.stopTimer();
});
</script>

<style scoped>
/* 这里可以添加全局样式 */
</style>
