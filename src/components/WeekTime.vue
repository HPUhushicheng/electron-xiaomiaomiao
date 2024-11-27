<template>
    <div>
      <el-card class="dashboard-card">
        <h3>一周内在线用户时长分布</h3>
        <div class="ringChartRef" ref="ringChartRef" style="height: 400px;"></div>
      </el-card>
      <el-card class="dashboard-card">
      <h3>在线时长排行榜</h3>
      <div class="barChartRef" ref="barChartRef" style="height: 400px;"></div>
    </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  const ringChartRef = ref(null);
  const barChartRef = ref(null);

  onMounted(() => {
    // 圆角环形图
    const ringChart = echarts.init(ringChartRef.value);
    const ringOption = {
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: '李华' },
            { value: 310, name: '张三' },
            { value: 234, name: '王五' },
            { value: 135, name: '赵六' },
            { value: 1548, name: '孙七' }
          ],
          itemStyle: {
            borderRadius: 10, // 圆角
            borderColor: '#fff',
            borderWidth: 2
          }
        }
      ]
    };
    ringChart.setOption(ringOption);
  
    // 柱状图
    const barChart = echarts.init(barChartRef.value);

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
  },
  yAxis: {
    type: 'category',
    data: ['李华', '张三', '王五', '赵六', '孙七'],
  },
  series: [
    {
      name: '在线时长',
      type: 'bar',
        data: [120, 200, 150, 80, 70], // 示例数据
    },
  ],
};

    barChart.setOption(option);
  });
  </script>
  
  <style scoped>
  .dashboard-card {
    width:500px;
    height: 500px; /* 设置个别板块的高度 */
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  .dashboard-card:hover{
  transform: scale(0.9); /* 放大图片 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

  </style>