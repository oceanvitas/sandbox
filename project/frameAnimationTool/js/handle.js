(function(W, D) {
    //顶部菜单按钮事件
    D.getElementById('toggle').addEventListener('click', function(e) {
        D.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
        D.getElementById('toggle').classList.toggle('x');
    });
    //初始化帧动画
    FrameAnimation.init({

    });

})(window, document);
//.match(/<script>(.+)<\/script>/)