# Vue 3 + TypeScript + Vite

pnpm create vite@latest electron-vue
pnpm i
pnpm run dev
pnpm add electron -D    // 添加electron依赖,这一步经常出错，终归问题是网络问题
pnpm add concurrently






解决electron安装失败问题
● 报错信息

可以看出connect timeout ,显示超时
● 在项目下新建.npmrc文件
touch .npmrc
● 添加如下内容
# 将pnpm变成扁平化架构，pnpm专用
node-linker=hoisted
# 设置阿里仓库源
registry="https://registry.npmmirror.com"
# 在国内使用pnpm安装electron需要配置一下electron的下载路径
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
● 安装
pnpm add electron -D

解决方案来自https://juejin.cn/post/7263483823773351993