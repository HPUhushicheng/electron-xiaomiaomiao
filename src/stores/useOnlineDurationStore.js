// // src/stores/useOnlineDurationStore.js
// import { defineStore } from 'pinia';

// export const useOnlineDurationStore = defineStore('onlineDuration', {
//   state: () => ({
//     onlineDuration: 0,
//     timer: null
//   }),
//   actions: {
//     startTimer() {
//       if (this.timer) clearInterval(this.timer);
//       this.timer = setInterval(() => {
//         this.onlineDuration += 1;
//         console.log('当前在线时长:', this.onlineDuration);
//       }, 1000);
//     },
//     stopTimer() {
//       if (this.timer) {
//         clearInterval(this.timer);
//         this.timer = null;
//       }
//     },
//     resetTimer() {
//       this.onlineDuration = 0;
//     }
//   }
// });





// src/stores/useOnlineDurationStore.js
import { defineStore } from 'pinia';

export const useOnlineDurationStore = defineStore('onlineDuration', {
  state: () => ({
    onlineDuration: 0, // 总在线时长（秒）
    timer: null,
    sendTimer: null, // 用于定期发送数据的计时器
    studentId: '', // 全局用户ID
  }),
  actions: {
    setStudentId(id) {
      this.studentId = id;
      console.log('设置 studentId:', id); // 添加日志
    },
    startTimer() {
      if (this.timer || this.sendTimer) {
        console.log('计时器已在运行中');
        return;
      }

      if (!this.studentId) {
        console.error('studentId 未设置，无法启动计时器');
        return;
      }

      console.log('启动计时器');

      const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0]; // 格式: YYYY-MM-DD
        const hour = now.getHours(); // 0-23
        const daytime = hour; // 例如 11 代表 11:00-12:00
        return { date, daytime };
      };

      this.timer = setInterval(() => {
        this.onlineDuration += 1;
        console.log('当前在线时长（秒）:', this.onlineDuration);
      }, 1000);

      // 每60秒发送一次数据
      this.sendTimer = setInterval(async () => {
        const { date, daytime } = getCurrentDateTime();
        const hourtime = Math.floor(this.onlineDuration / 60); // 将秒转换为分钟

        console.log('准备发送数据:', { date, daytime, hourtime });

        try {
          const response = await fetch(`http://localhost:666/api/time/add?id=${this.studentId}&date=${date}&daytime=${daytime}&hourtime=${hourtime}`, {
            method: 'GET', // 根据您的接口调整方法
          });

          if (!response.ok) {
            throw new Error('网络错误');
          }

          console.log('在线时长已发送:', { date, daytime, hourtime });
          this.onlineDuration = 0; // 重置在线时长
        } catch (error) {
          console.error('发送在线时长失败:', error);
        }
      }, 1800000); // 1800000 毫秒 = 30 分钟
    },
    stopTimer() {
      console.log('停止计时器');
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.sendTimer) {
        clearInterval(this.sendTimer);
        this.sendTimer = null;
      }
    },
    resetTimer() {
      this.onlineDuration = 0;
      console.log('重置在线时长');
    }
  }
});