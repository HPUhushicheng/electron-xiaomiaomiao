<template>
  <div>
    <el-card class="dashboard-card">
      <h3>今日在线时长</h3>
      <div ref="chartRef" style="height: 300px; width: 600px;"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
const studentid = 1; // 假设这是当前用户的 studentid
const date = '2024-10-06'; // 假设这是要查询的日期

const fetchOnlineDuration = async () => {
  const url = `http://localhost:666/api/time/get?id=${studentid}&date=${date}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取在线时长失败:', error);
    return [];
  }
};

const renderChart = (data) => {
  const daytime = data.map(item => item.daytime);
  const hourtime = data.map(item => item.hourtime);

  const chart = echarts.init(chartRef.value);
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: daytime.map(d => `${d}:00`), // 将时间段格式化为字符串
    },
    yAxis: {
      type: 'value',
      name: '在线时长（秒）',
    },
    series: [
      {
        name: '在线时长',
        type: 'line',
        data: hourtime,
      },
    ],
  };

  chart.setOption(option);
};

onMounted(async () => {
  const onlineDurationData = await fetchOnlineDuration();
  renderChart(onlineDurationData);
});
</script>

<style scoped>
.dashboard-card {
  width: 100%;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>