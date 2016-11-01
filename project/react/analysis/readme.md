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
> 全局定义：__DEV__, Object.assign

渲染
========

#### Virtual DOM（虚拟DOM）

#### 如何处理React元素对象

+ CreateElement (src/isomorphic/classic/element/ReactElement.js)


	ReactElement.createElement = function(type, config. children){

	}

接收三个参数，分别是type, config, children。在这个方法的顶部分别定义了一些变量，不过这些都不重要，继续往下阅读，第一个`if`判断当`config`参数不等于null时候执行，在这一部分分别处理了一些比如`ref`,`props`等。

接着剔除前两个参数来获取所有的子节点对象`var childrenLength = arguments.length - 2;`,并且将其装载到`props.children`中，有意思的是它根据childrenLength的长度来生成一个空数组，然后将子节点添加到这个数组中，最后赋值给`props.children`。最后开始处理`defaultProps`并装载到`props`对象中，最后return出来一个`ReactElement`.

> 注明：*DEV*中的一些处理主要是辅助开发阶段，可以得到一些有用的信息。warning在fbjs中，有兴趣的可以到node_modules中查找。

+ ReactElement

在`CreactElement`中我们可以知道它return了一个`ReactElement`,那它又是什么呢？

	var ReactElement = function(type, key, ref, self, source, owner, props){

	}

第一眼看去`ReactElement`比`CreactElement`多了很多参数，不过不要紧，从初始化的角度来看，其实很多参数都是`null`,比如`owner`描述的是当前节点，初始化时从`ReactCurrentOwner`读取，阅读`src/isomorphic/classic/element/ReactCurrentOwner.js`其实它只定义了一个current等于null的模块。

    var ReactCurrentOwner = {
        
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null,
        
    };
    
    module.exports = ReactCurrentOwner;

`__DEV__`部分如果你不想阅读的话，整个`ReactElement`只是存在了一个`element`对象，并将其return了出来。

	var element = {
		// This tag allow us to uniquely identity this as a React Element
		$$typeof: REACT_ELEMENT_TYPE,
		// Built-in properties that belong on the element
		type: type,
		key: key,
		ref: ref,
		props: props,
		// Record the component responsible for creating this element.
		_owner: owner,
	};

`REACT_ELEMENT_TYPE`这个常量使用`Symbol`来判断是否为`React`元素类型

+ render


	/**
	 * Mounting is the process of initializing a React component by creating its
	 * representative DOM elements and inserting them into a supplied `container`.
	 * Any prior content inside `container` is destroyed in the process.
	 *
	 *   ReactMount.render(
	 *     component,
	 *     document.getElementById('container')
	 *   );
	 *
	 *   <div id="container">                   <-- Supplied `container`.
	 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
	 *       // ...                                 component.
	 *     </div>
	 *   </div>
	 *
	 * Inside of `container`, the first element rendered is the "reactRoot".
	 */

从`CreactElement`和`ReactElement`来看其实这是一个非常简单的对象组合的过程，最后你应该可以得到如下的一个对象：

	{
		$$typeof: (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) ||
							0xeac7,
		type: 'div',
		key: null,
		ref: null,
		props: {
			className: 'css',
			children: [
				{
					$$typeof: (typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element')) ||
										0xeac7,
					key: null,
					ref: null,
					props: {
						className: 'item-label',
						children: [] || object //如果你的子节点只有一个，children将不是数组而是一个对象
					}，
					_owner: null
				}
			]
		},
		_owner: null
	}

有了它我们还并不能直接在浏览器中访问，因为你还需要一个`render`的过程，这个`render`方法存在着两个入口，我比较喜欢将其称为`初始化入口`和`元素入口`。
> 初始化入口 src/renderers/dom/stack/client/ReactMount.js

其实`元素入口`什么事情都没有做，只不过是帮助你调用了一下render方法，然后return出来`React.CreactElement`。

当你在初始化入口写render时，实际上是进入了如下的一个方法中：

	render: function(nextElement, container, callback){
		
	}

根据其调用栈你可以看见这个render方法又调用了`_renderSubtreeIntoContainer`方法，看起来这才是重头戏。

	_renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {

	}

在经过一系列的处理，包括`container`对象，最后调用`_renderNewRootComponent`来生成一个`compontent`并返回。当然这其中还经历一些比如`DOMCompontent`的创建，`batchedUpdates`批量更新等。


#### ReactElement对象如何转化成了DOMComponent对象

在上一小节中我们明白了如何创建ReactElement对象，并且知晓`render`方法开始执行的步骤，在这小节中我们将要寻找如何将ReactElement对象转化成一个DOMComponent。

	/**
	 * Creates a new React class that is idempotent and capable of containing other
	 * React components. It accepts event listeners and DOM properties that are
	 * valid according to `DOMProperty`.
	 *
	 *  - Event listeners: `onClick`, `onMouseDown`, etc.
	 *  - DOM properties: `className`, `name`, `title`, etc.
	 *
	 * The `style` property functions differently from the DOM API. It accepts an
	 * object mapping of style properties to values.
	 *
	 * @constructor ReactDOMComponent
	 * @extends ReactMultiChild
	 */

> src/renderers/dom/stack/client/ReactDOMComponents.js

当`render`的过程开始执行到`_renderNewRootComponent`时，在这个方法中除了




