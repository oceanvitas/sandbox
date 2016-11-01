# reactjs 源码发分析

[icepy](https://icepy.gitbooks.io/react/content/)

目录结构
========

#### src


+ isomorphic 日常编程能使用的东西，比如ReactComponet 你在使用ES2015写组件时 class Hello extends React.Componet
+ renderers 关于如何渲染的逻辑，有两个版本分别是浏览器和Native
+ shared 共享类，大家都能用到的一些工具函数
+ addons 比如做简单动画时用到的 ReactCSSTransitionGroup 都放置在此

#### isomorphic

+ React.js
>全局定义：__DEV__, Object.assign

渲染
========

#### Virtual DOM（虚拟DOM）

#### 如何处理React元素对象

+ CreateElement (src/isomorphic/classic/element/ReactElement.js)
> ReactElement.createElement = function(type, config. children){
>
> }
> 