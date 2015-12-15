/*
    内容验证
*/
(function (W, D) {
    var detectFunc = function (frameObj) {
       var srcPatt = new RegExp(/[a-zA-z]+://[^\s]*/);
    }
    W.detectFunc = detectFunc;
})(window, document);