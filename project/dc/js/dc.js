(function (W, D) {
  'use strict';
  if(W.DC){
    return
  }
  /*
   * 通用库
  */
  var Util = {
    /*是否 ie*/
    ie: W.attachEvent && !W.opera,
    /*Copy properties from one object to another. Overwrites allowed.*/
    extend: function(to, from, whitelist) {
      for (var property in from) {
        if (whitelist) {
          var type = $.type(whitelist);

          if (whitelist === "own" && !from.hasOwnProperty(property) ||
            type === "array" && whitelist.indexOf(property) === -1 ||
            type === "regexp" && !whitelist.test(property) ||
            type === "function" && !whitelist.call(from, property)) {
            continue;
          }
        }

        // To copy gettters/setters, preserve flags etc
        var descriptor = Object.getOwnPropertyDescriptor(from, property);

        if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
          delete to[property];
          Object.defineProperty(to, property, descriptor);
        }
        else {
          to[property] = from[property];
        }
      }

      return to;
    },
    /*获取cookie*/
    getCookie: function(cookie_name){
      var cookie_start, cookie_end;
      if (D.cookie.length > 0){  
        cookie_start = D.cookie.indexOf(cookie_name + '=')
        if (cookie_start != -1){ 
          cookie_start = cookie_start + cookie_name.length + 1; 
          cookie_end = D.cookie.indexOf(';', cookie_start);
          if (cookie_end == -1) cookie_end = D.cookie.length;
          return unescape(D.cookie.substring(cookie_start,cookie_end))
        } 
      }
      return ''
    },
    /*获取平台,区分PC和移动*/
    getPlatform: function () {
      if(navigator.userAgent.indexOf('Mobile') > -1){
        return 'wap'
      }else{
        return 'web'
      }
    },
    /*创建UUID*/
    createUUID: function () {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
    },
    /**
     * JS对象转URL参数
     * param 将要转为URL参数字符串的对象
     * key URL参数字符串的前缀
     * encode true/false 是否进行URL编码,默认为true
     * 
     * return URL参数字符串
     */
    urlEncode: function (param, key, encode) {
      if(param==null) return '';
      var paramStr = '';
      var t = typeof (param);
      if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
      } else {
        for (var i in param) {
          var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += urlEncode(param[i], k, encode);
        }
      }
      //替换首个&为?
      return paramStr.replace('&', '?');
    },
    /**
     * 原生ajax请求，支持GET、POST
     * obj          ajax参数
     * obj.type     请求方式
     * obj.url      请求链接
     * obj.data     请求内容，get请求可省略，直接加在url上
     * obj.success  请求成功回调
     * obj.fail     请求失败回调
     * 
     * return       请求返回数据或失败信息
     */
    sendAjax: function (obj) {
      if(!obj || !obj.url){ return};
      var xmlHttp, 
          sendObj = obj;
      var createxmlHttpRequest = function() { 
        if (window.ActiveXObject) { 
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
        } else if (window.XMLHttpRequest) { 
          xmlHttp = new XMLHttpRequest(); 
        } 
      };
      //默认请求方式
      sendObj.type = obj.type? obj.type : 'GET';
      //处理GET请求发送的参数，组合为完整GET请求链接
      if(sendObj.type == 'GET' && sendObj.data){
        sendObj.url += this.urlEncode(sendObj.data);
      }
      // 注意在传参数值的时候最好使用encodeURI处理一下，以防出现乱码 
      createxmlHttpRequest();
      xmlHttp.open(sendObj.type, sendObj.url);
      if(sendObj.type == 'GET'){
        xmlHttp.send(null);
      }else{
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.send(sendObj.data);
      }
      xmlHttp.onreadystatechange = function() {
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
          console.log(xmlHttp.responseText)
          sendObj.success && sendObj.success(xmlHttp.responseText);
        } else {
          sendObj.fail && sendObj.fail(xmlHttp.responseText);
        }
      }
    },
    /**
     * 绑定事件
     *
     * @param {HTMLElement=} element 页面元素
     * @param {string} eventName 事件名
     * @param {Function} callback 回调函数
     */
    on: function (element, eventName, callback) {
      if (!element) {
        return;
      }
      try {
        if (element.addEventListener) {
          element.addEventListener(eventName, callback, false);
        }
        else if (element.attachEvent) {
          element.attachEvent('on' + eventName, callback);
        }
      }
      catch (ex) {}
    },
    /*发送地址*/
    serviceUrl: function () {
      var plat = Util.getPlatform() == 'web' ? 'w' : 'm',
          host = location.host.replace('www.', 'dc.').replace('m.', 'dc.');
      return 'http://' + host + '/' + plat + '/dc';
    },
    /*获取服务器时间地址*/
    serviceTimeUrl: function () {
      var host = location.host.replace('m.', 'www.');
      return 'http://' + host + '/time.json';
    }
  };
  /*公用数据*/
  var serviceUrl = Util.serviceUrl();
  var serviceTimeUrl = Util.serviceTimeUrl();
  var defaults = {
    header: {
      /* wap或web,根据网页被访问的平台来设置*/
      plat: Util.getPlatform(), 
      /* 渠道，从cookie读取channel字段*/
      channel: Util.getCookie('channel'), 
      /* 从cookie读取BUMPS_UUID字段*/
      uuid: Util.getCookie('BUMPS_UUID'), 
      /*读取$CONFIG['userinfo']，或者通过/w/user.json获取，需考虑性能*/
      userId: Util.getCookie('BUMPS_UID'), 
      /* 屏幕尺寸*/
      screen: W.screen.width + '*' + W.screen.height, 
      /* 时间戳，服务器时间*/
      ts: '',
      /*页面uuid，刷新算新的*/
      pageId: Util.createUUID(),
      /*dc.js的版本，避免对方是用旧的js发的日志*/
      vs: '1.0.0', 
      /* 来源页，需严格encode*/
      ref: encodeURI(D.referrer), 
      /* 随机数*/
      rnd: new Date().getTime(), 
      /* cookieEnable是否禁用cookie*/
      ce: navigator.cookieEnabled, 
      /* 是否支持localStorage*/
      ls: W.localStorage ? true : false
    },
    clickJsLinkTime: null,
    closing: false
  };
  /*定义*/
  var DC = {
    init: function (argument) {
      //初始获取服务器时间并发送
      getServiceTime(function (res) {
        defaults.header.ts = res.code == 0 ? res.data.time : '';
        console.log(res)
        console.log('defaults.header.ts:' + defaults.header.ts)
        sendImage({
          body: [
            {
              type: 1,
              content: {
                st: defaults.header.ts
              }
            }
          ]
        });
      });
      /*针对ie的处理*/
      if (Util.ie) {
        Util.on(D, 'mouseup', function (e) {
          var target = e.target || e.srcElement;
          if (target.nodeType === 1 && /^ajavascript:/i.test(target.tagName + target.href)) {
            defaults.clickJsLinkTime = new Date();
          }
        });
      }
      //页面关闭监控
      Util.on(W, 'beforeunload', unloadHandler);
      Util.on(W, 'unload', unloadHandler);
    }
  };

  //私有方法
  /*获取服务器时间*/
  function getServiceTime (cb) {
    Util.sendAjax({
      type: 'GET',
      url: serviceTimeUrl,
      success: function (res) {
        cb && cb(res);
      },
      fail: function (err) {
        //即使获取不到时间，也需要返回
        cb && cb(err);
      }
    });
  }
  /*发送请求*/
  function sendImage (data) {
    var obj = {};
    obj.header = defaults.header;
    obj.header.rnd = new Date().getTime();
    obj.body = data.body;
    new Image().src = serviceUrl + '?data=' + JSON.stringify(obj);
  }
  /*页面关闭时处理方法*/
  function unloadHandler (event) {
    /*<ie>*/
    // @see http://msdn.microsoft.com/en-us/library/ms536907(VS.85).aspx
    // Click an anchor that refers to another document.
    // 修复 IE 中点击 `<a href="javascript:">...</a>` 也会触发 beforeunload 事件的问题
    if (Util.ie && (new Date() - defaults.clickJsLinkTime < 50)) {
        return;
    }
    /*</ie>*/
    if (defaults.closing) {
        return;
    }
    defaults.closing = true;
    event = event ? event : {
      timeStamp: new Date().getTime()
    };
    sendImage({
      body: [
        {
          type: 2,
          content: {
            st: defaults.header.ts,
            et: event.timeStamp
          }
        }
      ]
    });
  }

  W.DC = DC;
  DC.init();
  
})(window, document);