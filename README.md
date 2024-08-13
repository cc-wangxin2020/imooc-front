## Vue 3 + TailWindCSS + Vite 实现适配移动端和PC端个人博客项目

##### 通用组件：
`popup`、`popover`、`search`、`menu`

##### 业务相关：
`header`、响应式`navigationBar`、主题切换(`dark`、`light`、跟随系统)、瀑布流
* 路由逻辑
  * 移动端——一级路由
  * PC端
    * 一级路由：`App.vue`中定义路由出口
    * 二级路由：`/layout/components/main.vue`中定义路由出口
* 响应式`navigationBar`
  * 抽离公用逻辑：采用`vuex`保存公有数据`categorys`
  * 封装私有逻辑：分别定义 移动端、PC端视图逻辑和路由逻辑
* 主题切换
  * 通过在根元素中添加不同的`className`实现主题切换
  * 将`themeType`存储在`store`全局状态中
  * 根据全局状态为根元素`html`添加`class`
  * 跟随系统主题：通过`window.matchMedia('(prefers-color-scheme: dark)')`返回的`onChange`方法监听系统主题变化
* 
