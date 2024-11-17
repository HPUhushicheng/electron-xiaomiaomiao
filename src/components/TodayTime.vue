<template>
  <div>
    <el-card class="dashboard-card">
      <h3>今日工作时长</h3>
      <div ref="chartRef" style="height: 300px; width: 600px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);

onMounted(() => {
  const chart = echarts.init(chartRef.value);

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '工作时长',
        type: 'line',
        data: Array.from({ length: 2000 }, () => Math.floor(Math.random() * 60)), // 示例数据
      },
    ],
  };

  chart.setOption(option);
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