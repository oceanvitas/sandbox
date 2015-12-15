/*
    代码块
*/
(function(W, D) {
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
                                         '$("body").append("<span class=\"music play\"></span>");'+
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
                        '})';     //end H5FullscreenPage.init
                    '})';         //end $
                return str;
        },
        indexHtml: function (frameObj) {
            var str = '',
                  tempStr = '',
                  frames = frameObj.frames,
                  frameLength = frames.length;
            for(var i = 0; i < frameLength; i++){
                tempStr += '<div class="item item'+ (i + 1) +'" data-id='+ (i + 1) +'>'+
                                        '<div class="EDGE-'+ frames[i].id +'"></div>'+
                                    '</div>';
            }
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
        }
    };

    W.codeFragment = codeFragment;
})(window, document);
