React 技术栈系列 http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html
proptypes的意义 http://www.myexception.cn/web/2016594.html
react-redux的connect()方法 http://blog.csdn.net/aa3115386/article/details/52046705
react入门 http://www.ruanyifeng.com/blog/2015/03/react.html
React Router http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
通过npm使用react http://reactjs.cn/react/docs/getting-started-zh-CN.html

建议在react中使用Commonjs模块系统 eg: browserify webpack
使用react 和 react-dom npm包
默认情况下react会在开发模式下 慢 改为生产模式 代码如下:
new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  });
==在JavaScript里xml格式为jsx 转化为标准的javascript 用 <script type="text/babel"></script> 并引入babel
==注意一些浏览器（比如 Chrome ）会在使用 HTTP 以外的协议加载文件时失败。
离线转换

以上引入babel.js可以理解为在线转换 可以通过以下方式改为离线转换
先安装babel命令行工具 需要npm 此就是海靖所曰运行环境、
npm install --global babel-cli
npm install babel-preset-react
然后把jsx转换为标准
babel --presets react src --watch --out-dir build
如果你正在使用 ES2015, 你将需要使用 babel-preset-es2015 包.
注意原生的HTML元素以小写开头，而制定的 React 类以大写开头。
组件类名首字母大写 事件名用小驼峰
使用 props

创建的comment组件，它将依赖于从父级传来的数据 在子组件里作为属性可供使用
这些属性可以通过this.props访问 这里类似于angular组件里的_this
以_this.props.children 访问任何嵌套的元素
remarkable转换评论文本为markdown并输出它 但是react在保护你免受xss攻击的时候在浏览器里只能显示为标签 有简单的解决办法http://reactjs.cn/react/docs/tutorial-zh-CN.html
