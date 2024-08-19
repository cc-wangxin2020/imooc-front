## Vue 3 + TailWindCSS + Vite 实现适配移动端和PC端个人博客项目

##### 通用组件：
`popup`、`popover`、`search`、`menu`、`waterfall`、`infinite-list`、`confirm`
* 通用瀑布流组件——`waterfall`
  * 瀑布流的核心就是：通过 relative  和 absolute 定位的方式，来控制每个 item 的位置 
  * 影响瀑布流高度的主要元素，通常都是 img 标签
  * 有些服务端会返回 关键 img 的高度，有些不会，所以需要分别处理： 
    a. 当服务端 不返回 高度时：需要等待 img 加载完成之后，再来计算高度，然后通过得到的高度计算定位。否则则会出现高度计算不准确导致定位计算不准确的问题。
    b. 当服务端 返回 高度时：开发者则必须利用此高度为 item 进行高度设定。一旦 item 具备指定高度，那么就不需要等待 img 加载的过程，这样效率更高，并且业务的逻辑会变得更加简单。
  * 当进行响应式切换时，同样需要区分对应场景： 
    a. 当服务端 不返回 高度时：需要 重新执行整个渲染流程 ，虽然会耗费一些性能，但是这样可以最大可能的避免出现逻辑错误。让组件拥有更强的普适性。
    b. 当服务端 返回 高度时：同样需要重新计算 列宽 和 定位 ，但是因为 item 具备明确的高度，所以可以直接拿到具体的高度，而无需重复整个渲染流程，从而可以实现更多的交互逻辑。比如：位移动画、将来的图片懒加载占位...
* 长列表组件——`infinite-list`
  * 本质为分页组件
  * 当页面滚动到底部时，加载数据
  * 通过检测页面最底部的元素是否可见来判断页面是否滚动到了最底部 `IntersectionObserver` —— `vueuse 提供了 useIntersectionObserver`；当元素出现或隐藏时`IntersectionObserver`方法会被执行
  * 接收的`props`
    * `loading`: 是否正在加载（双向绑定数据）
    * `finished`: 数据是否加载完成
  * 当元素可见且数据未加载完成时触发数据加载`emits('onLoad')`
  * **注意**：
    当首次加载的数据为占满全屏时，数据会出现无法继续加载的情况
    解决方案：监听`loading`变化来触发数据加载，当`loading`变化时触发数据加载
* 确认框组件——`confirm`
  * 实现通过函数调用的方式实现组件调用
  * 定义数据`props`+定义模板
  * 定义`confirm`函数返回一个`promise`，点击“确定”执行成功的回调，点击“取消”执行失败的回调
  * 通过`h`函数生成虚拟`dom`
  * 通过`renderer`函数将虚拟`dom`转换成真实`dom`
  * **注意：** 在onMounted中执行`show`方法并且延迟一段时间执行`close`方法，否则出现消失动画不生效
* 提示框组件——`message`
  * 通过函数调用的方式实现组件调用
  * 定义数据`props`+定义模板
  * 与`confirm`组件不同，提示框组件不需要用户操作因此不用返回`promise`
  * 动画结束后进行组件销毁——执行`renderer(null, document.body)`
##### 业务相关：
`header`、响应式`navigationBar`、主题切换(`dark`、`light`、跟随系统)、瀑布流组件、功能引导、图片下载、全屏
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
* 首页采用长列表+瀑布流进行数据展示
  * 封装通用长列表组件——实现**数据懒加载**，当页面划到底端时加载数据
  * 封装通用瀑布流组件——实现`item`项根据内容宽高进行展示
  * 自定义指令实现图片懒加载(`IntersectionObserver`)
* `searchBar`相关功能完善
  * 搜索提示、提示高亮
  * 搜索历史处理
    * 搜索历史保存在`vuex`中并做持久化处理
    * 实现删除历史记录、自动添加搜索历史功能
  * 主题推荐
* `navigationBar`与`list` 、`search`与`list`联动
  * 将共享数据保存在 `vuex`中统一管理
* 功能引导——`diver.js`
* 图片下载
  * 小文件下载——`file-saver`
  * 大文件下载——`streamsaver`
* 全屏——`useFullScreen`(`Element.requestFullscreen()`——进入全屏；`Document.exitFullscreen()`——退出全屏)
* 点击`item`实现到详情页的路由效果过渡
  * 问题：`transition`只能针对元素和组件的切换产生过渡效果，对于路由变化导致页面切换无法实现过渡效果
  * 解决：通过`history.pushState()`方法改变路由但不切换页面，并将`item`详情页以**组件**的形式展示
  * 采用`GSAP`动画库来实现过渡动画效果
* 用户登录
  * 表单验证——`vee-validator`
  * 人类行为验证
  * 登录、注册、退出
  * 登录鉴权
  * 第三方登录
* 图片裁剪与上传
  * 图片裁剪——`cropper.js`
  * 图片上传——`OSS`
* 移动端路由切换效果
  * 过度动效
  * 组件缓存
  * 虚拟任务栈
#### 框架相关
* 自动注册组件
  * `import.mate.glob`
  * `app.component`
* 自动注册指令
  * `import.mate.glob`
  * `app.directive`
