// src/stores/useOnlineDurationStore.js
import { defineStore } from 'pinia';

export const useOnlineDurationStore = defineStore('onlineDuration', {
  state: () => ({
    onlineDuration: 0,
    timer: null
  }),
  actions: {
    startTimer() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.onlineDuration += 1;
        console.log('当前在线时长:', this.onlineDuration);
      }, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    resetTimer() {
      this.onlineDuration = 0;
    }
  }
});