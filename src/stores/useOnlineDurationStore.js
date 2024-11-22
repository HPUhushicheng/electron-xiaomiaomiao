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

      // 每秒增加在线时长
      this.timer = setInterval(() => {
        this.onlineDuration += 1;
        console.log('当前在线时长（秒）:', this.onlineDuration);
      }, 1000);

      // 每1分钟发送一次数据
      this.sendTimer = setInterval(async () => {
        if (this.onlineDuration < 60) {
          console.log('在线时长不足60秒，不发送数据');
          return;
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
        const day = String(now.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`; // 格式: YYYY-MM-DD

        const hourtime = Math.floor(this.onlineDuration / 60); // 将秒转换为分钟

        if (hourtime > 0) {
          console.log('准备发送数据:', { date, hourtime });

          try {
            const response = await fetch('http://localhost:666/api/time/record', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: this.studentId,
                date: date,
                hourtime: hourtime
              })
            });

            // 处理非 JSON 响应
            const contentType = response.headers.get('content-type');
            let data;
            if (contentType && contentType.includes('application/json')) {
              data = await response.json();
            } else {
              const text = await response.text();
              throw new SyntaxError(`无效的 JSON 响应: ${text}`);
            }

            if (data.status === 200) {
              console.log('在线时长已发送:', data.message);
              this.onlineDuration = 0; // 重置在线时长
            } else {
              console.error('更新失败:', data.message);
            }
          } catch (error) {
            console.error('发送在线时长失败:', error);
          }
        } else {
          console.log('计算后的 hourtime 为 0，不发送数据');
        }
      }, 60000); // 60000 毫秒 = 1 分钟
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