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
* 移动端路由切换效果 —— `transition-router-view`组件
  * 过渡动效
    * 指定`routerType`表示是进入还是退出路由，根据不同状态指定不同动画效果
    * 将`routerType`保存在`store`中
    * 在`router.push()`前修改`routerType`为进入状态
    * 在`router.back()`前修改`routerType`为退出状态
  * 组件缓存
    * 用`keep-alive`组件包裹动态组件，进行组件缓存
    * 组件缓存当前虚拟任务栈中的所有组件
    * 虚拟任务栈——用一个`array`数组模拟栈，栈中保存当前需要缓存的组件列表，栈底为主页面
    * 在路由前置守卫中判断路由操作将组件入栈或出栈
      * `routerType`为进入状态时，将当前组件入栈
      * `routerType`为退出状态时，栈顶出栈
      * 当进入主页时清空栈
* 第三方登录
  * 步骤：
    * `window.open`打开第三方平台
    * 新窗口拿到第三方登录数据
    * 将第三方登录数据跨页面传输到原窗口（同源窗口跨页面传输数据）
      * `BroadcastChannel` —— 会有兼容性问题
      * `localStorage` + `window.onStorage` —— 当`localStorage`或`sessionStorage`中的值被修改时会触发`storage`事件
    * 获取登录数据后触发登录，根据返回`code`判断是否注册
      * 如果已存在账号直接进入首页
      * 如果不存在则跳转到注册页（此时将第三方登录数据通过`query`的形式进行传递）
  * 注意：移动端下不需要进行页面数据传输操作，直接在当前页面操作
* 问题反馈
* 分享功能对接
* 支付功能对接
* 打包与发布
  * 申请云服务器、域名
  * 安装nginx、ssl模块
  * nginx.conf中配置
    ``` server {
    # 端口
    listen       80;
    # 域名
    server_name  www.ccwangxin.com;
    # 资源地址
    root   /nginx/dist/;
    # 目录浏览
    autoindex on;
    # 缓存处理
    add_header Cache-Control "no-cache, must-revalidate";
    # 请求配置
    location / {
        # 跨域
        add_header Access-Control-Allow-Origin *;
        # 返回 index.html
        try_files $uri $uri/ /index.html;
    }
    location /prod-api/ {
            proxy_pass api.imooc-front.lgdsunday.club;
            # $host 变量，Host 为变量名 
            proxy_set_header   Host              $host; #域名转发
            proxy_set_header   X-Real-IP         $remote_addr; #IP转发						
            proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header   Cookie            $http_cookie; # cookie 配置
        }
    }
#### 框架相关
* 自动注册组件
  * `import.mate.glob`
  * `app.component`
* 自动注册指令
  * `import.mate.glob`
  * `app.directive`
