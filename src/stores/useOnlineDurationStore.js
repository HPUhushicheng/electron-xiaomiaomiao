// src/stores/useOnlineDurationStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useOnlineDurationStore = defineStore('onlineDuration', () => {
  const studentId = ref(localStorage.getItem('studentid') || '1');
  const onlineDuration = ref(0);
  let timer = null;
  let sendTimer = null;

  // 日志存储到 localStorage
  const logToLocalStorage = (message) => {
    const logMessage = `${new Date().toISOString()} - ${message}`;
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    logs.push(logMessage);
    localStorage.setItem('logs', JSON.stringify(logs));
  };

  const setStudentId = (id) => {
    studentId.value = id;
    localStorage.setItem('studentid', id); // 同步到 localStorage
    onlineDuration.value = 0; // 重置在线时长
    logToLocalStorage(`设置 studentId: ${id}`);
    
    // 可以选择在设置 studentId 时重新启动计时器或进行其他操作
  };

  const startTimer = () => {
    // 启动计时器前清除 localStorage 中的相关数据
    localStorage.removeItem('logs');
    localStorage.removeItem('onlineDuration');

    if (timer || sendTimer) {
      logToLocalStorage('计时器已在运行中');
      return;
    }

    if (!studentId.value) {
      logToLocalStorage('studentId 未设置，无法启动计时器');
      return;
    }

    logToLocalStorage('启动计时器');

    // 每秒增加在线时长
    timer = setInterval(() => {
      onlineDuration.value += 1;
      logToLocalStorage(`当前在线时长（秒）: ${onlineDuration.value}`);
    }, 1000);

    // 每1分钟发送一次数据
    sendTimer = setInterval(async () => {
      if (onlineDuration.value < 60) {
        logToLocalStorage('在线时长不足60秒，不发送数据');
        return;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const date = `${year}-${month}-${day}`;

      const hourtime = onlineDuration.value;

      logToLocalStorage(`准备发送数据: { date: ${date}, hourtime: ${hourtime} }`);

      try {
        const response = await fetch('http://localhost:666/api/time/record', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: studentId.value,
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
          onlineDuration.value = 0;
        } else {
          logToLocalStorage(`更新失败: ${data.message}`);
        }
      } catch (error) {
        logToLocalStorage(`发送在线时长失败: ${error}`);
      }
    }, 60000);
  };

  const stopTimer = () => {
    logToLocalStorage('停止计时器');
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (sendTimer) {
      clearInterval(sendTimer);
      sendTimer = null;
    }

    // 清除 localStorage 中的相关数据，但保留 studentid
    localStorage.removeItem('logs');
    localStorage.removeItem('onlineDuration');
  };

  const resetTimer = () => {
    onlineDuration.value = 0;
    logToLocalStorage('重置在线时长');
  };

  return {
    studentId,
    onlineDuration,
    setStudentId,
    startTimer,
    stopTimer,
    resetTimer,
    logToLocalStorage
  };
});