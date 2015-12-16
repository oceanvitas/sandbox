/*
    帧动画
    Base on jquery
*/
(function(W, D) {
    var frameObj = {};
    var $form = $('.pure-form');  
    var frameNum = 0;   
    var opt = {
        minFrame: 1,
        maxFrame: 8,
        useMusic: false
    };
    window.FrameAnimation = {
        init : function(option){
            $.extend(opt,option);
            initDom(opt);
            initEvent(opt);
        }
     };

    //帧内容：选择填写路径或上传
    function toggleRadioPath($this){
        var $box = $this.parents('.choose-box'),
              val = $this.attr('value');
        $box.find('.data-' + val).show().siblings('.choose-data').hide();
        $box.attr('data-choose', val);
    }
    //清除内容
    function clearData(){
        //清空对象
        frameObj = {};   
        //清除帧
        frameNum = 0;
        $form.find('#name').val('');
        $form.find('input[name=backgroundMusicPath]').val('');
        $form.find('input[name=uploadBgMusic]').val('');
        $('.frames').html(codeFragment.createFrame());
    }
    //添加帧
    function addFrame (opt) {
         if(frameNum == opt.maxFrame) {
            return
        }
        $('.frames').append(codeFragment.createFrame())
    }
    //删除帧
    function deleteFrame (opt) {
        if(frameNum == opt.minFrame) {
            return
        }
        $('.frames').find('.frame-' + (frameNum - 1)).remove();
        if(frameNum != 2){
            $('.frames').find('.frame-' + (frameNum - 2)).find('.control-frame').before(codeFragment.deleteFrame());
        }
        frameNum--;
    }
    //展开收起帧
    function toggleFrame ($this) {
        var $parent = $this.parents('.frame'),
              $frame = $parent.find('.frame-content');
        if($this.hasClass('hide-frame')){
            $this.removeClass('hide-frame').html('<i class="fa fa-chevron-up"></i> <span>收起帧</span>');
            $frame.show();
        }else{
            $this.addClass('hide-frame').html('<i class="fa fa-chevron-down"></i> <span>显示帧</span>');
            $frame.hide();
        }
    }
    //生成文件下载
    function createDocument (content, filename) {
         saveAs(
            new Blob(
                [content], {
                    type: "text/html;charset=" + document.characterSet
                }
            ), filename
         );
    }
    //submit
    function submitData() {
         var $name = $form.find('#name'),
             $bgMusic = $form.find('input[name=chooseBgMusic]'),
             $bgMusicPath = $form.find('input[name=backgroundMusicPath]'),
             $bgMusicUpload = $form.find('input[name=uploadBgMusic]'),
             $frames = $form.find('.frames'),
             name = $name.val(),
             bgMusic = $bgMusic.val() == 'path' ? $bgMusicPath.val() : $bgMusicUpload.val(),
             $frameList = $frames.find('.frame'),
             frameLength = $frameList.length,
             frame = {},
             $frame, $frameImage, $frameMedia, $frameHtml, $frameEdge, $frameEdgeAction,
             httpPatt = new RegExp(/[a-zA-z]+:\/\/[^\s]*/);
         //动画名称检测
         if (!name) {
             tip('请输入动画名');
             return
         }
         //背景音乐检测
         if (bgMusic && $bgMusic.val() == 'path' && !httpPatt.test(bgMusic)) {
             tip('背景音乐链接输入有误，请输入正确格式的链接或者为空');
             return
         }
         //通过检测，确认动画名和背景音乐
         frameObj.name = name ? name : 'Bumps 全屏动画';
         frameObj.bgMusic = httpPatt.test(bgMusic) ? bgMusic : false;
         frameObj.frames = [];
         //循环帧，检测并获取数据
         console.log('frameLength: ' + frameLength)
         for (var i = 0; i < frameLength; i++) {
             var whichFrame = '第' + (i + 1) + '帧';
             frame = {};
             $frame = $frameList.eq(i);
             $frameImage = $frame.find('input[name=chooseImagePath_' + i + ']');
             $frameMedia = $frame.find('input[name=chooseMediaPath_' + i + ']');
             $frameHtml = $frame.find('textarea[name=frame_html_' + i + ']');
             $frameEdge = $frame.find('textarea[name=frame_edge_js_' + i + ']');
             $frameEdgeAction = $frame.find('textarea[name=frame_edgeAction_js_' + i + ']');
             //图片地址或上传数据
             frame.frameImage = $frameImage.val() == 'path' ?
                 //图片地址
                 (function() {
                     var val = $frame.find('input[name=imagePath_' + i + ']').val();
                     if (val && !httpPatt.test(val)) {
                         tip(whichFrame + '的图片地址格式错误，请重新输入')
                         return ''
                     }
                     return val
                 })()
                 //上传图片，暂未实现
                 : (function() {
                     return $frame.find('input[name=imageUpload_' + i + ']').val()
                 })();
             //媒体音乐地址或上传数据
             frame.frameMedia = $frameMedia.val() == 'path' ?
                 //媒体地址
                 (function() {
                     var val = $frame.find('input[name=mediaPath_' + i + ']').val();
                     if (val && !httpPatt.test(val)) {
                         tip(whichFrame + '的媒体地址格式错误，请重新输入')
                         return ''
                     }
                     return val
                 })()
                 //上传图片，暂未实现
                 : (function() {
                     return $frame.find('input[name=mediaUpload_' + i + ']').val()
                 })();
             //html页面edge方法调用抽取
             if (!$frameHtml.val()) {
                 tip(whichFrame + '的“调用html”不能为空，请输入完整');
                 return
             } else {
                 frame.frameHtml = $frameHtml.val().replace(/[\r\n]/g, '').match(/<script>(.+)<\/script>/)[1];
                 frame.id = frame.frameHtml.match(/EDGE-(\d+)/)[1];
                 frame.name = frame.frameHtml.match(/'(\w+)', 'EDGE-/)[1];
             }
             //edge.js内容
             if (!$frameEdge.val()) {
                 tip(whichFrame + '的“帧js”不能为空，请输入完整');
                 return
             } else {
                 frame.frameEdge = $frameEdge.val();
             }
             //edgeAction.js内容
             if (!$frameEdgeAction.val()) {
                 tip(whichFrame + '的“帧动画js”不能为空，请输入完整');
                 return
             } else {
                 frame.frameEdgeAction = $frameEdgeAction.val().replace(/\(function\(symbolName\)\s\{/g, codeFragment.edgeAction(i));
             }
             frameObj.frames[i] = frame;
         }

         console.log(frameObj)
         //完成frameObj，生成文件
         //index.html
         createDocument(codeFragment.indexHtml(frameObj), 'index.html');
         //handle.js
         createDocument(codeFragment.handleJS(frameObj), 'handle.js');
         //循环生成edge.js和edgeActions.js
         for(var i = 0, len = frameObj.frames.length; i < len; i++){
            var curFrame = frameObj.frames[i];
            createDocument(curFrame.frameEdge, curFrame.name + '_edge.js');
            createDocument(curFrame.frameEdgeAction, curFrame.name + '_edgeActions.js');
         }
     }

    

    //Dom渲染
    function initDom(opt){
        $('.max-frame').html(opt.maxFrame);
        $('.frames').html(codeFragment.createFrame())
    }
    //事件绑定
    function initEvent(opt){
        var $submit = $('.submit-button'),
              $addFrame = $form.find('.add-frame'),
              $clear = $form.find('.clear-button');
         //toggle radio
         $form.on('click', 'input[type=radio]', function () {
            toggleRadioPath($(this));
         });
         //clear data & obj
         $clear.on('click', function (e) {
             e.preventDefault();
             clearData();
         });
         //add frame
         $addFrame.on('click', function (e) {
            e.preventDefault();
            addFrame(opt);
         });
         //delete frame
         $form.on('click', '.delete-frame', function (e) {
            e.preventDefault();
             deleteFrame(opt);
         })
         //toggle frame
         $form.on('click', '.control-frame', function (e) {
            e.preventDefault();
             toggleFrame($(this));
         });
         //submit
         $submit.on('click', function (e) {
             e.preventDefault();
             submitData();
         })
    }

    //tip 提示
    function tip (txt) {
        console.log(txt)
    }

    //代码片段 
    var codeFragment = {
        edgeAction: function(i) {
            var i = i ? i : 0;
            return '(function(symbolName) {' +
                            'Symbol.bindTimelineAction(compId, symbolName, "Default Timeline", "complete", function(sym, e) {' +
                                'globalSym[' + i + '] = sym; ' +
                            '});'
        },
        handleJS: function(frameObj) {
            var str = '',
                  frames = frameObj.frames,
                  frameLength = frames.length,
                  useMusic = false;
            str += '$(function() {'+
                            'window.globalSym = {};'+
                             'var queue = new createjs.LoadQueue();';
            if(frameObj.bgMusic){
                useMusic = true;
                str +=  'var mediaSrc = '+ frameObj.bgMusic +';'+
                            'var soundId = "sound";'+
                            'var useMusic = '+ useMusic +';'+
                            'queue.installPlugin(createjs.Sound);'+
                            'queue.loadFile({id: soundId, src:mediaSrc});';
            }
            str +=  'queue.on("complete", handleComplete, this);'+
                        'queue.loadManifest(['+
                            // {id: "myImage", src:"path/to/myImage.jpg"}
                        ']);'+
                        'function handleComplete() {'+
                            'if (useMusic) {'+
                                'createjs.Sound.play(soundId);'+
                                     '$("body").append("<span class=\'music play\'></span>");'+
                                     '$(".music").on("tap",function(){'+
                                        'if (!$(".music").hasClass("play")) {'+
                                            'createjs.Sound.play(soundId);'+
                                        '} else {'+
                                            'createjs.Sound.stop(soundId);'+
                                        '}'+
                                         '$(this).toggleClass("play");'+
                                     '});'+
                            '}'+
                         '}';

            //第一个动画
            if(frameLength > 0){
                 str += frames[0].frameHtml;
                 str += 'H5FullscreenPage.init({'+
                                'type: 1,'+
                                'useArrow: true,'+
                                'pageShow: function(dom) {'+
                                    'var index = dom.getAttribute("data-id");'+
                                    'if (index == 0) {'+
                                       'globalSym[0].playAll();'+
                                    '}';
            }
            if(frameLength > 1){
                 for(var i = 1; i < frameLength; i++){
                    str += 'if (index == '+ i +') {'+
                                    'if (globalSym['+ i +'] != undefined) {'+
                                        'globalSym['+ i +'].playAll();'+
                                    '} else {'+
                                        frames[i].frameHtml + 
                                    '}'+
                                '}';
                }
            }
            str += '}'+   //end pageShow
                    '})'+     //end H5FullscreenPage.init
                '})';         //end $
            return str;
        },
        indexHtml: function (frameObj) {
            var str = '',
                  tempStr = '',
                  tempStyle = '<style>',
                  frames = frameObj.frames,
                  frameLength = frames.length;
            for(var i = 0; i < frameLength; i++){
                tempStr += '<div class="item item'+ (i + 1) +'" data-id='+ i +'>'+
                                        '<div class="EDGE-'+ frames[i].id +'"></div>'+
                                    '</div>';
                tempStyle += '.edgeLoad-EDGE-'+ frames[i].id +' { visibility:hidden; }';
            }
            tempStyle += '</style>';
            str += '<!DOCTYPE html>'+
                            '<html class=" js-no-overflow-scrolling">'+
                            '<head>'+
                                '<meta charset="utf-8">'+
                                '<meta http-equiv="cache-control" content="max-age=0" />'+
                                '<meta http-equiv="cache-control" content="no-cache" />'+
                                '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">'+
                                '<title>'+ frameObj.name +'</title>'+
                                '<link rel="stylesheet" type="text/css" href="http://10.18.20.143/project/H5FullscreenPage/css/H5FullscreenPage.css">'+
                                '<link rel="stylesheet" type="text/css" href="http://10.18.20.143/project/H5FullscreenPage/css/page-animation.css">'+
                                '<link rel="stylesheet" type="text/css" href="http://10.18.20.143/project/H5FullscreenPage/css/handle.css">'+
                                tempStyle + 
                            '</head>'+
                            '<body class="H5FullscreenPage">'+
                                '<div class="H5FullscreenPage-wrap">'+
                                   tempStr +
                                '</div>'+
                                '<script type="text/javascript" src="http://10.18.20.143/project/H5FullscreenPage/js/createjs-2015.11.26.min.js"></script>'+
                                '<script type="text/javascript" src="http://10.18.20.143/project/H5FullscreenPage/js/edge.6.0.0.min.js"></script>'+
                                '<script type="text/javascript" src="http://10.18.20.143/project/H5FullscreenPage/js/zepto.min.js"></script>'+
                                '<script type="text/javascript" src="http://10.18.20.143/project/H5FullscreenPage/js/H5FullscreenPage.js"></script>'+
                                '<script type="text/javascript" src="handle.js"></script>'+
                            '</body>'+
                            '</html>';
            return str
        },
        deleteFrame: function () {
            return '<button class="button-error pure-button button-xsmall delete-frame">'+
                            '<i class="fa fa-close"></i> 删除帧'+
                        '</button> ' 
        },
        createFrame: function () {
            var i = frameNum;
            var str = '';
            str += '<div class="frame frame-'+ i +'">'+
                        '<p class="frame-title">'+
                            '第'+ (i + 1) +'帧：'+
                            (i != 0 ? (
                            '<button class="button-error pure-button button-xsmall delete-frame">'+
                                '<i class="fa fa-close"></i> 删除帧'+
                            '</button> ' ) : '') +
                            '<button class="button-secondary pure-button button-xsmall control-frame">'+
                                '<i class="fa fa-chevron-up"></i> <span>收起帧</span>'+
                            '</button>'+
                        '</p>'+
                        '<div class="frame-content">'+                        
                            '<div class="choose-box" data-choose="path">'+
                                '<div class="pure-control-group choose-radio">'+
                                    '<label>图片路径</label>'+
                                    '<input type="radio" name="chooseImagePath_'+ i +'" value="path" checked> 路径 '+
                                    '<input type="radio" name="chooseImagePath_'+ i +'" value="upload"> 上传'+
                                '</div>'+
                                '<div class="pure-control-group choose-data data-path">'+
                                    '<label for="imagePath_'+ i +'"></label>'+
                                    '<input class="pure-input-2-3" id="imagePath_'+ i +'" name="imagePath_'+ i +'" type="text" placeholder="请填入路径">'+
                                '</div>'+
                                '<div class="pure-control-group choose-data data-upload">'+
                                    '<label for="imageUpload_'+ i +'"></label>'+
                                    '<input type="file" id="imageUpload_'+ i +'" name="imageUpload_'+ i +'">'+
                                '</div>'+
                            '</div>'+
                            '<div class="choose-box" data-choose="path">'+
                               '<div class="pure-control-group choose-radio">'+
                                    '<label>动画声音路径</label>'+
                                    '<input type="radio" name="chooseMediaPath_'+ i +'" value="path" checked> 路径'+
                                    '<input type="radio" name="chooseMediaPath_'+ i +'" value="upload"> 上传'+
                                '</div>'+
                                '<div class="pure-control-group choose-data data-path">'+
                                    '<label for="mediaPath_'+ i +'"></label>'+
                                    '<input class="pure-input-2-3" id="mediaPath_'+ i +'" name="mediaPath_'+ i +'" type="text" placeholder="请填入路径">'+
                                '</div>'+
                                '<div class="pure-control-group choose-data data-upload">'+
                                    '<label for="mediaUpload_'+ i +'"></label>'+
                                    '<input type="file" id="mediaUpload_'+ i +'" name="mediaUpload_'+ i +'">'+
                                '</div>'+
                            '</div>'+
                            '<div class="pure-control-group">'+
                                '<label for="frame_html_'+ i +'">调用html<span class="red">*</span></label>'+
                                '<textarea class="pure-input-2-3" id="frame_html_'+ i +'" name="frame_html_'+ i +'" rows="3" cols="20" placeholder="请将文件后缀为.html的文件内容拷贝到此处"></textarea>'+
                            '</div>'+
                            '<div class="pure-control-group">'+
                                '<label for="frame_edge_js_'+ i +'">帧js<span class="red">*</span></label>'+
                                '<textarea class="pure-input-2-3" id="frame_edge_js_'+ i +'" name="frame_edge_js_'+ i +'" rows="3" cols="20" placeholder="请将文件名后面为_edge.js的文件内容拷贝到此处"></textarea>'+
                            '</div>'+
                            '<div class="pure-control-group">'+
                                '<label for="frame_edgeAction_js_'+ i +'">帧动画js<span class="red">*</span></label>'+
                                '<textarea class="pure-input-2-3" id="frame_edgeAction_js_'+ i +'" name="frame_edgeAction_js_'+ i +'"rows="3" cols="20" placeholder="请将文件名后面为_edgeAction.js的文件内容拷贝到此处"></textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
            frameNum++;
            $form.find('.delete-frame').remove();
            return str
        }
    };
})(window, document);
