import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import ZhuYe from '../components/ZhuYe.vue';
import Register from '../components/Register.vue';
import TodayTime from '../components/TodayTime.vue';
import WeekTime from '../components/WeekTime.vue';

// 定义路由
const routes = [
  { path: '/', component: Login },
  { path: '/zy', component: ZhuYe },
  {path:'/register', component: Register},
  {path:'/todaytime',component:TodayTime},
  {path:'/weektime',component:WeekTime}
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
