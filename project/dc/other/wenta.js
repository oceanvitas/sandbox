;try{
;(function(window, undefined){

	var document = window.document,
		location = window.location,
		navigator = window.navigator;

	function UUID(){ 
	    this.id = this.createUUID(); 
	}
	UUID.prototype.valueOf = function(){ return this.id; } 
	UUID.prototype.toString = function(){ return this.id; } 
	UUID.prototype.createUUID = function(){ 
	    var dg = new Date(1582, 10, 15, 0, 0, 0, 0); 
	    var dc = new Date(); 
	    var t = dc.getTime() - dg.getTime(); 
	    var tl = UUID.getIntegerBits(t,0,31); 
	    var tm = UUID.getIntegerBits(t,32,47); 
	    var thv = UUID.getIntegerBits(t,48,59) + '1'; 
	    var csar = UUID.getIntegerBits(UUID.rand(4095),0,7); 
	    var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);
	    var n = UUID.getIntegerBits(UUID.rand(8191),0,7) + 
	            UUID.getIntegerBits(UUID.rand(8191),8,15) + 
	            UUID.getIntegerBits(UUID.rand(8191),0,7) + 
	            UUID.getIntegerBits(UUID.rand(8191),8,15) + 
	            UUID.getIntegerBits(UUID.rand(8191),0,15); 
	    return tl + tm  + thv  + csar + csl + n; 
	}
	UUID.getIntegerBits = function(val,start,end){ 
	    var base16 = UUID.returnBase(val,16); 
	    var quadArray = new Array(); 
	    var quadString = ''; 
	    var i = 0; 
	    for(i=0;i<base16.length;i++){ 
	        quadArray.push(base16.substring(i,i+1));    
	    } 
	    for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){ 
	        if(!quadArray[i] || quadArray[i] == '') quadString += '0'; 
	        else quadString += quadArray[i]; 
	    } 
	    return quadString; 
	}
	UUID.returnBase = function(number, base){ 
	    return (number).toString(base).toUpperCase(); 
	}
	UUID.rand = function(max){ 
	    return Math.floor(Math.random() * (max + 1)); 
	}

	;var MobileAgent = (function(){
		var userAgent = (navigator.userAgent).toLowerCase(),
			agentArr = userAgent.split("_");
		function _getPlatform(){
			var platform = userAgent.substr(0,7),
				platform1 = userAgent.substr(0,3);
			if( platform == "android"){return "android";}
			if( platform1 == "ios"){return "ios";}
			return null;
		}
		function _getVersion(){
			if( null == _getPlatform())return null;
			return agentArr[2];
		}
		/*
		 *获取平台信息，如果不是移动平台，则直接返回 "pc",否则返回"ios","android" 或 "other"
		 */
		function _getPlatformNormal(){
			if(userAgent.indexOf("android") > -1){
		 		return "android";
		 	}else{
		 		return "ios";
		 	}
		}
		return {
			getPlatform:_getPlatform,/* 获取平台 return "ios" or "android" or null*/
			getVersion:_getVersion,  /* 获取版本号 return int or null */
			getPlatformNormal:_getPlatformNormal /* 获取平台 return "ios" or "android" */
		}
	})();
	window.DC_MobileAgent = MobileAgent;

	var _DC = {
		util : {
			_bindEvent : function(elem, event, handler){
				if (elem.addEventListener) {
					elem.addEventListener(event, handler ,false);
				}else if (elem.attachEvent) {
					elem.attachEvent("on" + event, handler);
				}else {
					elem["on" + event] = handler;
				}
			},			
			cookie : function(key, value, options) {
			    if (arguments.length > 1 && String(value) !== "[object Object]") {
			        if (value === null || value === undefined) {
			            options.expires = -1;
			        }
			        if (typeof options.expires === 'number') {
			            var days = options.expires, t = options.expires = new Date();
			            t.setDate(t.getDate() + days);
			        }
			        value = String(value);
			        return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
			    }
			    options = value || {};
			    var result, decode = options.raw ? function(s) {
			        return s;
			    } : decodeURIComponent;
			    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
			},
			getRandom : function(){
				return Math.round(Math.random() * 2147483647);
			},
			json2str : function(o){
				var arr = [];
				var f = function(s) {
					if (typeof s == 'object' && s != null) return _DC.util.json2str(s);
					return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
				}
				for (var i in o) arr.push("'" + i + "':" + f(o[i]));
				return '{' + arr.join(',') + '}';
			}
		},
		rcv : 'http://dc.7wenta.com/web?',
		all : ["st", "et", "sc", "uid", "cc", "ref"], /*6个参数*/
		startTime : new Date().getTime(),
		latestTime : new Date().getTime(),
		clickCount : 0,
		cks : {},
		ext : {},
		once : {},
		vs : '20140902', //dc.js版本号，以时间命名
		src : window.DCsrc?window.DCsrc:"web"
	};

	function DC(){
		this.tags = {};
		this.dcType = 0; //dcType 0:载入时 1:退出时 2:过程中
		this.init();
	}
	DC.prototype = {
		postData : function(dcType){
			this.dcType = dcType;
			this.getParam();
			var dcParam = "data=" + encodeURIComponent(_DC.util.json2str(this.tags)) + "&rnd=" + _DC.util.getRandom();
			var dcLink = _DC.rcv + dcParam;
			
			var submitURL = new Image();
			submitURL.src = dcLink;

			if (dcType == 2) {
				for (var i = 0; i < 400; i++) {
					window.console && console.log('sending dc....');
				};
			};

			/*if (window.localStorage) {
				var dcType_2 = window.localStorage.getItem("dcType_2");
				if (_DC.src == 'wap' && dcType == 2) {
					if (!dcType_2) {
						window.localStorage.setItem("dcType_2",dcLink);
					};
				}else{
					var submitURL = new Image();
					submitURL.src = dcLink;
				}

				if (dcType_2) {
					window.localStorage.removeItem("dcType_2");
					var submitURL = new Image();
					submitURL.src = dcType_2;
				}
			}else{
				var submitURL = new Image();
				submitURL.src = dcLink;
			}*/
		},
		getVersion : function(){
			this.tags.vs = _DC.vs;
		},		
		/*Build Tags Begin*/
		getStartTime : function(){
			if (this.dcType == 2 || ( this.dcType == 1 && _DC.src == 'wap')) {
				this.tags.st = _DC.latestTime;
				return;
			};
			this.tags.st = _DC.startTime;
		},
		getEndTime : function(){
			var now = new Date().getTime();
			if (this.dcType) {
				this.tags.et = now;
			};
			_DC.latestTime = now;
		},
		getScreenInfo : function(){
			this.tags.sc = screen.width + "*"  + screen.height;
		},
		getUserid : function(init){
			var _self = this;
			_self.tags.uid = window.userId || _DC.util.cookie("UserId");
			// 初始化的时候如果没有userId，则再发请求一次userId，解决某些页面没有设置全局变量userId的问题。不过只能在页面关闭或过程中加，载入的时候暂时不支持
			if (init && !DC.hasGetUserid) {
				DC.hasGetUserid = true;
				if (typeof window.userId == 'undefined' && document.domain == "www.7wenta.com") {
					var userInfo_url = 'http://www.7wenta.com/myinfo.json' + "?" +(new Date().getTime()+Math.floor(Math.random()*1000));
					$.post(userInfo_url,{},function(data){
						if(data.resultCode.code == 0){
							window.userId = data.value.uinfo.userId;
							DC.hasLogin = true;
						}else if (data.resultCode.code == -7) {
							DC.hasLogin = false;
						};
					});
				};
			};
		},
		getRnd: function() {
			this.rnd = _DC.util.getRandom();
		},
		getUUID : function(){
			if (!_DC.util.cookie("uuid")) {
				var uuid = new UUID().id;
				var d = new Date();
	        	d.setDate(d.getDate() + 365*100);
	        	_DC.util.cookie("uuid",uuid,{path:"/",domain:".7wenta.com",expires:d});
	        	this.tags.fuuid = 1;
			};
		},
		getClickCount : function(){
			if (this.dcType) {
				this.tags.cc = _DC.clickCount;
			};
		},
		getType : function(){
			this.tags.type = this.dcType;
		},
		getSource : function(){
			this.tags.src = _DC.src;
		},
		getUrl : function(){
			try{
				this.tags.url = decodeURI(document.location.href).replace(/#/g, '@');
			}catch(e){};
		},
		getRefUrl : function(){
			try{
				this.tags.ref = decodeURI(document.referrer).replace(/'|"|\n/g,'');
			}catch(e){};
		},
		getBrowserInfo : function(){
			// this.tags.ua = navigator.userAgent;
			if (_DC.src.indexOf('wap') != -1) {
				this.tags.ua = MobileAgent.getPlatformNormal();
			};
		},
		/*wenta*/
		getCks : function(){
			var self = this;
			$.each(_DC.cks,function(k,v){
				if (v.tp != 0 && v.nm != 0) {
					if (self.dcType) {
						self.tags[k] = v.nm;
					};
				};
			})
		},
		getExt : function(){
			var self = this;
			$.each(_DC.ext,function(k,v){
				self.tags[k] = v;
			})
		},
		getOnce : function(){
			var self = this;
			$.each(_DC.once,function(k,v){
				if (v != null) {
					self.tags[k] = v;
				};
				_DC.once[k] = null;
			})
		},
		/*Build Tags END*/

		eventHandler : function(){
			var that = this;
			return function(){
				_DC.clickCount ++;
			}
		},
		addDocEvent : function(){
			var _self = this;
			_DC.util._bindEvent(document, "click", this.eventHandler());
		},
		tagsToString : function(){
			var _arr = [];
			var _all = _DC.all;
			for (var i = 0; i < _all.length; i++) {
				var _attr = _all[i];
				if (this.tags[_attr]) {
					_arr.push(_attr + "=" + this.tags[_attr]);
				};
			};
			return _arr.join("&");
		},
		getParam : function(){
			this.getType();
			this.getVersion();
			this.getStartTime();
			this.getEndTime();
			this.getScreenInfo();
			this.getUserid();
			this.getClickCount();
			this.getRefUrl();
			this.getBrowserInfo();
			this.getUUID();
			this.getSource();
			this.getCks(); //点击数收集
			this.getExt(); //外部push进来的字段
			this.getOnce(); //只用一次的字段
		},
		init : function(){
			this.addDocEvent();
			this.getUserid(true);
		}
	}

	function DCError(){
		this.tags = {};
	}
	DCError.prototype = {
		postData : function(error){
			this.getParam(error);
			var submitURL = new Image();
			var submitData = "data=" + _DC.util.json2str(this.tags) + "&rnd=" + _DC.util.getRandom();
			submitURL.src = 'http://dc.7wenta.com/weberror?error=' + submitData;
		},
		getParam : function(error){
			if (error) {
				this.tags.error = error + '';
			};
			
			try{
				this.tags.url = decodeURI(document.location.href).replace(/#/g, '@');
			}catch(e){};
			this.tags.ts = new Date().getTime();
		}
	}
	window.DCError = DCError;

	if (window.dataCollection) {
	  return ;
	}
	
	window.DC = DC;
	var dataCollection = window.dataCollection = {
		add2Cks : function(objs){
			$.each(objs,function(k, v){
				if(_DC.cks[k]) return;
				_DC.cks[k] = v;
				if (v.tp == 1) {
					var eventType = 'click';
					if (_DC.src.indexOf('wap') != -1 && MobileAgent.getPlatformNormal() == 'ios') {
						eventType = 'touchend';
					};
					// 给统计按钮对象增加ev属性，强制重写默认的事件
					eventType = v.ev || eventType;
					$("body").on(eventType,v.em,function(){
						v.nm += 1;
						//alert(v.nm);
						if (_DC.src.indexOf('wap') != -1) {
							new DC().postData(2);
							v.nm = 0;
						};
					});
				};
			});
		},
		upload : function(){
			new DC().postData(2);
		},
		_DC : _DC
	}

	var dc = new DC();
	window.onload = function(){
		dc.postData(0);
		
		/*if (_DC.src == 'wap' && window.DCin) {
			// setInterval(function(){
			// 	dc.postData(2);
			// },10000);
			function rePostData(){
				dc.postData(2);
				setTimeout(function(){
					rePostData();
				}, 10000);
			}
			rePostData();
		};*/
	}
	
	window.onbeforeunload = function(){
		if (_DC.src.indexOf('wap') == -1) {
			dc.postData(1);
			setTimeout(function(){}, 1000);
		};
	}
	/*$(window).on('pagehide',function(){
		dc.postData(1);
	});*/
})(window);

}catch(e){
};

// var dcConfig = {
// 	'act20130114_01_13' : {tp:1,nm:0,em:".search_btn"}
// }
// dataCollection.add2Cks(dcConfig)