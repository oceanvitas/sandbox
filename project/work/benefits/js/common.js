(function () {
  var bumpsCommon = {

  };
  var bumpsTool = {
    getVerCode: function(cb){
      Hybrid.goPrototcal('bbweb://get/userAgent',{},function(res){
        bumpsCommon.verCode = res.verCode;
        bumpsCommon.plat = res.plat.toLowerCase();
        setTimeout(function(){
            cb && cb();
        },0);
      });
    },
    parseQueryString: function() {
      var str = window.location.search;
      var objURL = {};

      str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
          objURL[$1] = $3;
        }
      );
      return objURL;
    }
  };

  window.bumpsCommon = bumpsCommon;
  window.bumpsTool = bumpsTool;
})();