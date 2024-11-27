<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useOnlineDurationStore } from './stores/useOnlineDurationStore';

const store = useOnlineDurationStore();

const stopTimerOnExit = () => {
  console.log('应用卸载，停止计时器');
  store.stopTimer();
};

onBeforeUnmount(() => {
  stopTimerOnExit();
});

window.addEventListener('beforeunload', stopTimerOnExit);
</script>