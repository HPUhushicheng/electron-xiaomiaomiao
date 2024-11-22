// src/stores/useOnlineDurationStore.js
import { defineStore } from 'pinia';

function logToLocalStorage(message) {
  const logMessage = `${new Date().toISOString()} - ${message}`;
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push(logMessage);
  localStorage.setItem('logs', JSON.stringify(logs));
}

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
      logToLocalStorage(`设置 studentId: ${id}`); // 使用 logToLocalStorage 记录日志
    },
    startTimer() {
      if (this.timer || this.sendTimer) {
        logToLocalStorage('计时器已在运行中');
        return;
      }

      if (!this.studentId) {
        logToLocalStorage('studentId 未设置，无法启动计时器');
        return;
      }

      logToLocalStorage('启动计时器');

      // 每秒增加在线时长
      this.timer = setInterval(() => {
        this.onlineDuration += 1;
        logToLocalStorage(`当前在线时长（秒）: ${this.onlineDuration}`);
      }, 1000);

      // 每1分钟发送一次数据
      this.sendTimer = setInterval(async () => {
        if (this.onlineDuration < 60) {
          logToLocalStorage('在线时长不足60秒，不发送数据');
          return;
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;

        // 直接使用在线时长（秒）而不是转换为分钟
        const hourtime = this.onlineDuration;

        logToLocalStorage(`准备发送数据: { date: ${date}, hourtime: ${hourtime} }`);

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

          const contentType = response.headers.get('content-type');
          let data;
          if (contentType && contentType.includes('application/json')) {
            data = await response.json();
          } else {
            const text = await response.text();
            throw new SyntaxError(`无效的 JSON 响应: ${text}`);
          }

          if (data.status === 200) {
            logToLocalStorage(`在线时长已发送: ${data.message}`);
            this.onlineDuration = 0;
          } else {
            logToLocalStorage(`更新失败: ${data.message}`);
          }
        } catch (error) {
          logToLocalStorage(`发送在线时长失败: ${error}`);
        }
      }, 60000);
    },
    stopTimer() {
      logToLocalStorage('停止计时器');
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
      logToLocalStorage('重置在线时长');
    }
  }
});