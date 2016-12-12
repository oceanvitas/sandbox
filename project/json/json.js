/**
 * @module: 序列化JSON
 * @author: shaoli
 * @contributors: shaolizheng <shaolizheng@tencent.com>
 * @create: 2016-12-1
 * @update: 2016-12-1
 * @version: 0.0.1
 * @requires: jQuery|zepto
 */

;(function ($) {

	'use strict';



	var EditJson = {

		$target: null,

		config: {
			defaultJson: []
		},

		show: function (target, options) {
			var _this = this,
					config = _this.config,
					json = _this.safelyParseJSON(target.val()),
					type = _this.typeof(json);

			_this.$target = target;
			config = $.extend(config, options || {});
			if (type === 'object' || type === 'array') {
				config.json = json;
			} else {
				config.json = config.defaultJson;
				$('.ej-dialog-tips').html('非正确JSON格式，请重新输入：');
			}
			
			$('.ej-dialog-mod').removeClass('ej-dialog-hide');
			$('.ej-keyvalue').html(_this.renderObject(config.json, ''));
		},

		hide: function () {
			$('.ej-dialog-mod').addClass('ej-dialog-hide');
		},

		init: function () {
			var _this = this;
			_this.renderWrap();
			_this.event();
		},

		renderWrap: function () {
			var _html = '<div class="ej-dialog-mod ej-dialog-hide">' + 
										'<div class="ej-dialog-mask"></div>' + 
										'<div class="ej-dialog">' + 
											'<div class="ej-dialog-hd">' + 
												'<div class="ej-dialog-close">X</div>' + 
											'</div>' + 
											'<div class="ej-dialog-bd">' + 
												'<p class="ej-dialog-tips"></p>' + 
												'<div class="ej-keyvalue"></div>' + 
											'</div>' + 
											'<div class="ej-dialog-ft">' + 
												'<button class="ej-dialog-btn ej-dialog-save">保存</button>' + 
											'</div>' + 
										'</div>' + 
									'</div>';
			$('body').append(_html);
		},

		renderObject: function (obj, tag, key) {
			var _this = this,
					_type = _this.typeof(obj),
					_html = '';

			_html += ' <div class="keyvalue-wrap keyvalue-'+ _type +'">' +
					        '<div class="keyvalue-control">' +
					          '<span class="keyvalue-control_item keyvalue-control_object"' +
					                'data-tag="'+ tag +'"' +
					                'data-ctrl="add.object"' +
					                'data-key="'+ key +'">{+}</span>' +
					            '<span class="keyvalue-control_item keyvalue-control_array"' +
					                  'data-tag="'+ tag +'"' +
					                  'data-ctrl="add.array"' +
					                  'data-key="'+ key +'">[+]</span>' +
					            '<span class="keyvalue-control_item keyvalue-control_string"' +
					                  'data-tag="'+ tag +'"' +
					                  'data-ctrl="add.string"' +
					                  'data-key="'+ key +'"> + </span>' +
					        '</div>';

			Object.keys(obj).map(function (key) {
				var item = obj[key],
            itemType = _this.typeof(item);

        _html += '<div class="keyvalue-item">' + 
		                '<div class="keyvalue-control">' + 
		                  '<span class="keyvalue-control_item keyvalue-control_minus" ' + 
		                        'data-tag="'+ tag +'"' + 
		                        'data-ctrl="minus"' + 
		                        'data-key="'+ key +'">-</span>' + 
		                '</div>' + 
		                '<span class="keyvalue-key">' + 
		                	(_type === 'object' ? '<input type="text" class="keyvalue-input" value="'+ key +'" data-tag="'+ tag +'.'+ key +'" data-ctrl="edit.key" data-key="'+ key +'" data-type="'+ itemType +'" />' : '') +
		                '</span>' + 
		                '<div class="keyvalue-value">' + 
		                (itemType === 'object' || itemType === 'array' ?
		                	_this.renderObject(item, tag + '.' + key, key) : 
		                	'<input type="text" class="keyvalue-input" value="'+ item +'" data-tag="'+ tag +'.'+ key +'" data-ctrl="edit.value" data-key="'+ key +'" />'
		                ) + 
		                '</div>' + 
		              '</div>';
				});

			_html += '</div>';
			return _html;
		},

		event: function () {
			var _this = this,
					$dialog = $('.ej-dialog-mod'),
					$close = $dialog.find('.ej-dialog-close'),
					$save = $dialog.find('.ej-dialog-save'),
					$input = $dialog.find('.keyvalue-input');

			$close.on('click', function () {
				_this.hide();
			});

			$save.on('click', function () {
				_this.hide();
				_this.$target.html(JSON.stringify(_this.config.json));
			});

			$dialog.on('click', '.keyvalue-control_item', function (event) {
				_this.handleKeyvalue(event);
			});

			$dialog.on('change', '.keyvalue-input', function (event) {
				_this.handleKeyvalue(event);
			});

		},

		handleKeyvalue: function (event) {
			var _this = this,
					ctrl = event.target.getAttribute('data-ctrl').split('.'),
	        key = event.target.getAttribute('data-key'),
	        randomKey = Math.floor(Math.random() * (100)),  //返回1-100内随机整数
	        targetObj = _this.returnKeyvalueObj(event.target.getAttribute('data-tag')),
	        target = targetObj.last,
	        type = _this.typeof(target),
	        valueType = event.target.getAttribute('data-type');

	    if (ctrl[0] === 'add') {

        var addType = ctrl[1];

        if (type === 'object') {

            switch (addType) {
                case 'object':
                    target[randomKey] = {};
                    break;
                case 'array':
                    target[randomKey] = [];
                    break;
                case 'string':
                    target[randomKey] = ' ';
                    break;
                default:
                    break;
            }

        } else if (type === 'array') {

          switch (addType) {
              case 'object':
                  target.push({});
                  break;
              case 'array':
                  target.push([]);
                  break;
              case 'string':
                  target.push('');
                  break;
              default:
                  break;
        	}

      	}

	    } else if (ctrl[0] === 'minus') {
	      
	      if(type === 'array') {
	        target.splice(key, 1);
	      } else {
	        delete target[key];
	      }
	      
	    } else if (ctrl[0] === 'edit') {

	      if (ctrl[1] === 'key') {

	          if (valueType === 'string') {
	              target[event.target.value] = target[key];
	              delete target[key];
	          } else {
	              targetObj.prev[event.target.value] = target;
	              delete targetObj.prev[key]
	          }

	      } else if (ctrl[1] === 'value') {
	        target[key] = event.target.value;

	      }

	    }

	    console.log(_this.config.json);
	    $('.ej-keyvalue').html(_this.renderObject(_this.config.json, ''));
	    
		},

		returnKeyvalueObj: function (tag) {
	    var _this = this,
	        _tag = tag ? tag.split('.') : [],
	        _obj = _this.config.json,
	        returnObj = {
	          prev: _obj,
	          last: _obj
	        };  

	    for(var i = 1, tagLength = _tag.length; i < tagLength; i++) {
	      var item = returnObj.last[_tag[i]],
	          type = _this.typeof(item);

	      if (type === 'object' || type === 'array') {
	        returnObj.prev = returnObj.last;
	        returnObj.last = item;
	      } 
	    }

	    return returnObj
	  },

		typeof: function (obj) {
			var class2type = {} ;
	    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(e,i){
	      class2type[ '[object ' + e + ']' ] = e.toLowerCase();
	    }) ;
	    if ( obj == null ){
	      return String( obj );
	    }

	    return typeof obj === 'object' || typeof obj === 'function' ?
	      class2type[ class2type.toString.call(obj) ] || 'object' :
	      typeof obj;
		},

		safelyParseJSON: function (json) {
		  var parsed;

		  try {
		    parsed = JSON.parse(json)
		  } catch (e) {
		    // Oh well, but whatever...
		  }

		  return parsed // Could be undefined!
		}
	};

	$.fn.editJson = function(options){
		var EJ = EditJson,
				$ej = $('.ej-dialog-mod');

		$ej.length === 0 && EJ.init();

	  return this.each(function () {
	    var $this = $(this);
	    
	    $this.on('click', function () {
	    	EJ.show($this, options);
	    });
	  })

	};

})($);