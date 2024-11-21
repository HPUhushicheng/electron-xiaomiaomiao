<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useOnlineDurationStore } from './stores/useOnlineDurationStore';

const onlineDurationStore = useOnlineDurationStore();

onMounted(() => {
  const savedStudentId = localStorage.getItem('studentId');
  if (savedStudentId) {
    onlineDurationStore.setStudentId(savedStudentId);
    onlineDurationStore.startTimer();
  }
});

const stopTimerOnExit = () => {
  console.log('应用卸载，停止计时器');
  onlineDurationStore.stopTimer();
};

onBeforeUnmount(() => {
  stopTimerOnExit();
});

window.addEventListener('beforeunload', stopTimerOnExit);
</script>