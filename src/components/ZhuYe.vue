<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();


function todaytime(){
    router.push({path:'/todaytime'})
};
function weektime(){
  router.push({path:'/weektime'})
}
</script>

<template>
  <div>
    <el-row :gutter="24" class="dashboard-row">
      <el-col :span="12">
        <el-card class="dashboard-card1" @click="todaytime">今天的工作时长细则
          <div ref="chartRef" style="height: 300px;">
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="dashboard-card2" @click="todaycourse">今日课程
        </el-card>
      </el-col>
    </el-row>

    <!-- 第四行 -->
    <el-row :gutter="24" class="dashboard-row">
      <el-col :span="12">
        <el-card class="dashboard-card3" @click="weektime">一周工作时间折线图
        
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="dashboard-card4" @click="gengxin">更新动态</el-card>
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>

.dashboard-row + .dashboard-row {
  margin-top: 20px; /* 设置行间距 */
}

.dashboard-card1 {
  width:300px;
  height: 200px; /* 设置个别板块的高度 */
  border-radius: 10px; /* 设置圆角效果 */
  background-image: url('../assets/001.png'); /* 添加图片背景 */
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease-in-out; /* 平滑过渡效果 */
}
.dashboard-card1:hover{
  transform: scale(0.9); /* 放大图片 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}
.dashboard-card2 {
  width:300px;
  height: 200px; /* 设置个别板块的高度 */
  border-radius: 10px; /* 设置圆角效果 */
  background-image: url('../assets/002.png'); /* 添加图片背景 */
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease-in-out; /* 平滑过渡效果 */
}
.dashboard-card2:hover{
  transform: scale(0.9); /* 放大图片 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}
.dashboard-card3 {
  width:300px;
  height: 200px; /* 设置个别板块的高度 */
  border-radius: 10px; /* 设置圆角效果 */
  background-image: url('../assets/003.png'); /* 添加图片背景 */
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease-in-out; /* 平滑过渡效果 */
}
.dashboard-card3:hover{
  transform: scale(0.9); /* 放大图片 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}
.dashboard-card4 {
  width:300px;
  height: 200px; /* 设置个别板块的高度 */
  border-radius: 10px; /* 设置圆角效果 */
  background-image: url('../assets/004.png'); /* 添加图片背景 */
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease-in-out; /* 平滑过渡效果 */
}
.dashboard-card4:hover{
  transform: scale(0.9); /* 放大图片 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}
</style>


<!-- 
 绿色渐变色背景 background-image: linear-gradient(to right, #a6e2b9 0%, #eceab7 100%);
 蓝色渐变色背景 background-image: linear-gradient(to right,#EBEAFF, #B6D4FF,#CAEFF6);
 
 -->