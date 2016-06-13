# 基于React & webpack 搭建的后台界面

---

使用React，将前端界面模块化，实现数据和界面的分离

总结经验：
1. 使用less可以有效的提升CSS的开发效率
2. 使用eslint可以很好的规范书写规范，并且减少Bug数量
3. CSS使用flex布局页面，更加方便，代码更简洁

---

##### 环境

 1. node v5.10.1
 2. npm 3.9.0
 3. less 2.7.1
 4. eslint 2.12.0

##### 技术栈

> [webpack](http://webpack.github.io/docs/)

> [React](http://docs.reactjs-china.com/react/docs/getting-started.zh-CN.html)

> [less](http://lesscss.cn/)

> [flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

---
### 截图

---

![print](./print/demo.jpg)

---

### 启动测试

npm start

### 本地测试地址

http://localhost:9090/webpack-dev-server/

### 编译打包

npm run build


### 目录结构
<pre>
.
├── README.md           
├── dist                     // 项目build目录
├── print                    // 项目截图目录
├── package.json             // node.js项目配置文件
├── .eslintrc.js             // eslintrc配置文件
├── webpack.config           // webpack配置文件
├── src                      // 生产目录
│   ├── css
│   ├── js
│   ├── images
│   ├── fonts
│   └── entry.js             // webpack入口文件
.
</pre>
