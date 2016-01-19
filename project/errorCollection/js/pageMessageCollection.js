(function (win, doc) {
  var globalMessage = {
    href: location.href,
    timeStamp: new Date().getTime(),
    page: {
      init: new Date().getTime()
    },
    errors: []
  };



  /**
   * @param {String}  errorMessage   错误信息
   * @param {String}  scriptURI      出错的文件
   * @param {Long}    lineNumber     出错代码的行号
   * @param {Long}    columnNumber   出错代码的列号
   * @param {Object}  errorObj       错误的详细信息，Anything
   */
  window.onerror = function(
    errorMessage,
    scriptURI,
    lineNumber,
    columnNumber,
    error
  ) {
    var errorMsg = {
      errorMessage: errorMessage,
      scriptURI: scriptURI,
      lineNumber: lineNumber,
      columnNumber: columnNumber,
      error: error
    };
    reportError(errorMsg);
  }

  function reportError (error) {
    //输出
    console.log("错误信息：" , error.errorMessage);
    console.log("出错文件：" , error.scriptURI);
    console.log("出错行号：" , error.lineNumber);
    console.log("出错列号：" , error.columnNumber);
    console.log("错误详情：" , error.errorObj);
    //在此处理错误信息，收集或者提交
    globalMessage.errors.push(error);
  }

  function DOMContentLoadedFn (event) {
    console.log("DOMContentLoaded: DOM fully loaded and parsed");
    globalMessage.page.DOMContentLoaded = event.timeStamp;
    console.log(event.timeStamp)
  }

  //判断ie6-8的DOM是否加载完成
  function doScroll(){
    try{
      document.documentElement.doScroll('left');
    }
    catch(error){
      return setTimeout(doScroll,20);
    };
    DOMContentLoadedFn({
      timeStamp: new Date().getTime()
    });
  };


  //当DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。
  //现代浏览器通过addEvListener绑定DOMContentLoaded,包括ie9+
  //ie6-8通过判断doScroll判断DOM是否加载完毕
  if (window.addEventListener) {
    document.addEventListener('DOMContentLoaded', DOMContentLoadedFn, false);
  } else if (window.attachEvent) {
    doScroll();
  };

  //onload 事件会在页面或图像加载完成后立即发生。
  //页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
  window.onload = function(event) {
    event = event ? event : {
      timeStamp: new Date().getTime()
    };
    console.log("load: DOM style,js,img,flash loaded");
    globalMessage.page.load = event.timeStamp;
    console.log(event.timeStamp)
  };

  //在页面关闭之前，“同步”上传收集数据
  window.onbeforeunload = function(event) {
    event = event ? event : {
      timeStamp: new Date().getTime()
    };
    globalMessage.page.beforeunload = event.timeStamp;
    localStorage.beforeunload = event.timeStamp;
  };
  //跟beforeunload相差时间很小，可以两者取其一
  window.onunload = function(event) {
    event = event ? event : {
      timeStamp: new Date().getTime()
    };
    globalMessage.page.unload = event.timeStamp;
    localStorage.unload = event.timeStamp;
  };
})(window, document)