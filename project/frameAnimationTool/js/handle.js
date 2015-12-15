(function(W, D) {
    //顶部菜单按钮事件
    D.getElementById('toggle').addEventListener('click', function(e) {
        D.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
        D.getElementById('toggle').classList.toggle('x');
    });
    //初始化设置
    var frameInit = {
        minFrame: 1,
        maxFrame: 8,
        useMusic: false
    };
    var frameObj = {};

    //帧内容：选择填写路径或上传
    var $form = $('.pure-form'),
          $submit = $('.submit-button'),
          $clear = $form.find('.clear-button'),
          $name = $form.find('#name'),
          $bgMusic = $form.find('input[name=chooseBgMusic]'),
          $bgMusicPath = $form.find('input[name=backgroundMusicPath]'),
          $bgMusicUpload = $form.find('input[name=uploadBgMusic]'),
          $frames = $form.find('.frames');
    $form.on('click', 'input[type=radio]', function(e){
        var $this = $(this),
              $box = $this.parents('.choose-box'),
              val = $this.attr('value');
        $box.find('.data-' + val).show().siblings('.choose-data').hide();
        $box.attr('data-choose', val);
    })
    //清除内容
    $clear.on('click', function (e) {
        e.preventDefault();
        frameObj = {};   //清空对象
        $name.val('');
        $bgMusicPath.val('');
        $bgMusicUpload.val('');
    })
    //生成
    $submit.on('click', function (e) {
       e.preventDefault();
       var name = $name.val(),
             bgMusic = $bgMusic.val() == 'path' ? $bgMusicPath.val() : $bgMusicUpload.val(),
             $frameList = $frames.find('.frame'),
             frameLength =  $frameList.length,
             frame = {},
             $frame, $frameImage, $frameMedia, $frameHtml, $frameEdge, $frameEdgeAction,
             srcPatt = new RegExp(/[a-zA-z]+://[^\s]*/);
        //名称和背景音乐预处理
        //背景音乐为空或者非法，则取消背景音乐
        frameObj.name = name ? name : 'Bumps 全屏动画';
        frameObj.bgMusic = srcPatt.test(bgMusic) ? bgMusic : false; 
        frameObj.frames = [];
       for(var i = 0; i < frameLength; i++){
            frame = {};
            $frame = $frameList.eq(i);
            $frameImage = $frame.find('input[name=chooseImagePath_'+ i +']');
            $frameMedia = $frame.find('input[name=chooseMediaPath_'+ i +']');
            $frameHtml = $frame.find('textarea[name=frame_html_'+ i +']');
            $frameEdge = $frame.find('textarea[name=frame_edge_js_'+ i +']');
            $frameEdgeAction = $frame.find('textarea[name=frame_edgeAction_js_'+ i +']');
            frame.frameImage = $frameImage.val() == 'path' ? 
                $frame.find('input[name=imagePath_'+ i +']').val() 
                : $frame.find('input[name=imageUpload_'+ i +']').val(); 
            frame.frameMedia = $frameMedia.val() == 'path' ? 
                $frame.find('input[name=mediaPath_'+ i +']').val() 
                : $frame.find('input[name=mediaUpload_'+ i +']').val(); 
            frame.frameHtml = $frameHtml.val().replace(/[\r\n]/g, '').match(/<script>(.+)<\/script>/)[1];
            frame.frameEdge = $frameEdge.val();
            frame.frameEdgeAction = $frameEdgeAction.val().replace(/\(function\(symbolName\)\s\{/g, codeFragment.edgeAction(i));
            frame.id = frame.frameHtml.match(/EDGE-(\d+)/)[1];
            frame.name = frame.frameHtml.match(/'(\w+)', 'EDGE-/)[1];
            frameObj.frames[i] = frame;
            //保存name_edge.js
             saveAs(
                new Blob(
                    [frame.frameEdge], {
                        type: "text/html;charset=" + document.characterSet
                    }
                ), frame.name + '_edge.js'
             );
            //保存name_edgeAction.js
             saveAs(
                new Blob(
                    [frame.frameEdgeAction], {
                        type: "text/html;charset=" + document.characterSet
                    }
                ), frame.name + '_edgeActions.js'
             );
       }
        console.log(codeFragment.handleJS(frameObj))
        console.log(codeFragment.indexHtml(frameObj))
        //保存index.html
        saveAs(
            new Blob(
                [codeFragment.indexHtml(frameObj)], {
                    type: "text/html;charset=" + document.characterSet
                }
            ), "index.html"
         );
        //保存handle.js
        saveAs(
            new Blob(
                [codeFragment.handleJS(frameObj)], {
                    type: "text/html;charset=" + document.characterSet
                }
            ), "handle.js"
         );
    })

    var frameAnimation = {};

})(window, document);
//.match(/<script>(.+)<\/script>/)