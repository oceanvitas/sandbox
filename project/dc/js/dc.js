(function (W, D) {
  var objectName = W.dcObjectName || 'bumpsDC';
  var oldObject = W[objectName];
  if (oldObject) { // 避免重复加载
    return;
  }
  /*固定项*/
  var staticData = {
    dcObjectName: 'bumpsDC',
    link: 'http://dc.fourb.info/w/dc',
    header: {
      /*公共字段*/
      plat: staticFun.getPlatform(), /* wap或web,根据网页被访问的平台来设置*/
      channel: staticFun.getCookie('channel'), /* 渠道，从cookie读取channel字段*/
      uuid: staticFun.getCookie('BUMPS_UUID'), /* 从cookie读取BUMPS_UUID字段*/
      userId: staticFun.getCookie('BUMPS_UID'), /*读取$CONFIG['userinfo']，或者通过/w/user.json获取，需考虑性能*/
      screen: W.screen.width + '*' + W.screen.height, /* 屏幕尺寸*/
      ts: staticFun.serviceTime(),/* 时间戳，服务器时间*/
      /*公共字段*/
      pageId: staticFun.createUUID(),/*页面uuid，刷新算新的*/
      vs: '1.0.0', /*dc.js的版本，避免对方是用旧的js发的日志*/
      ref: encodeURI(document.referrer), /* 来源页，需严格encode*/
      rnd: new Date().getTime(), /* 随机数*/
      ce: navigator.cookieEnabled, /* cookieEnable是否禁用cookie*/
      ls: W.localStorage /* 是否支持localStorage*/
    },
    body: []
  };
  var staticFun = {
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
    /*获取服务器时间*/
    getServiceTime: function () {
      // body...
    },
    /*创建UUID*/
    createUUID: function () {
      // body...
    },
    /*发送请求*/
    sendImage: function (data) {
      new Image().src = staticData.link + '?data=' + JSON.stringify(data);
    }
  };
  /*初始化*/
  var init = function () {
    console.log(staticData)
  };
  init();
})(window, document);