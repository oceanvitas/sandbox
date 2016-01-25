(function (W, D) {
  var objectName = W.dcObjectName || 'bumpsDC';
  var oldObject = W[objectName];
  if (oldObject) { // 避免重复加载
    return;
  }
  /*固定项*/
  var staticData = {
    header: {
      /*公共字段*/
      plat: 'wap', /* wap或web,根据网页被访问的平台来设置*/
      channel: 'wap', /* 渠道，从cookie读取channel字段*/
      uuid: 'xxx', /* 从cookie读取BUMPS_UUID字段*/
      userId: 123123, /*读取$CONFIG['userinfo']，或者通过/w/user.json获取，需考虑性能*/
      screen: '1280*1024', /* 屏幕尺寸*/
      ts: '1452751034228'，/* 时间戳，服务器时间*/
      lon: '10'，/* 经度,先不记*/
      lat: '20'，/* 纬度,先不记*/
      /*公共字段*/
      pageId: 'xxx',/*页面uuid，刷新算新的*/
      vs: '1.0.0', /*dc.js的版本，避免对方是用旧的js发的日志*/
      ref: 'http://www.baidu.com/', /* 来源页，需严格encode*/
      rnd: '1577286614', /* 随机数*/
      ce: '1', /* cookieEnable是否禁用cookie*/
      ls: '1', /* 是否支持localStorage*/
    },
    body: []
  };
  /*初始化*/
  var init = function () {
    // body...
  };
  init();
})(window, document);