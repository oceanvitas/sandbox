$(function() {
    window.globalSym = {};
    var queue = new createjs.LoadQueue();
    queue.on("complete", handleComplete, this);
    queue.loadManifest([{
        "id": "WU_FILE_0",
        "src": "http://image3.fourb.info/item/56/34/b2580e96b0029bcab32ecca748c9dead_640x316.png"
    }, {
        "id": "WU_FILE_1",
        "src": "http://image2.fourb.info/item/19/60/4fc31eb46130db47b52182315d1a22d2_640x133.png"
    }, {
        "id": "WU_FILE_2",
        "src": "http://image3.fourb.info/item/91/7/8783f8136d06acf9d933179357794352_640x133.png"
    }, {
        "id": "WU_FILE_3",
        "src": "http://image3.fourb.info/item/61/19/86397417e0341701221f06e5e2841216_96x85.png"
    }, {
        "id": "WU_FILE_4",
        "src": "http://image.fourb.info/item/87/51/0bab44f3e53520231aa0859d9d48a732_90x85.png"
    }, {
        "id": "WU_FILE_5",
        "src": "http://image2.fourb.info/item/13/35/dd2519232c5eb9f18a3eb47f9c82ef4b_97x89.png"
    }, {
        "id": "WU_FILE_6",
        "src": "http://image3.fourb.info/item/91/36/bdcf7fe0b3318a20f712c02ce4c4ca29_124x15.png"
    }, {
        "id": "WU_FILE_7",
        "src": "http://image.fourb.info/item/41/39/cae5823ba9b7e70148e1da106ad2d5a8_640x1008.jpg"
    }]);

    function handleComplete() {
        $(".loading").hide();
        if (useMusic) {
            createjs.Sound.play(soundId);
            $("body").append("<span class='music play'></span>");
            $(".music").on("tap", function() {
                if (!$(".music").hasClass("play")) {
                    createjs.Sound.play(soundId);
                } else {
                    createjs.Sound.stop(soundId);
                }
                $(this).toggleClass("play");
            });
        }
        AdobeEdge.loadComposition('Antest', 'EDGE-109228010', {
            scaleToFit: "width",
            centerStage: "horizontal",
            minW: "0px",
            maxW: "undefined",
            width: window.innerWidth + "px",
            height: window.innerHeight + "px"
        }, {
            "dom": []
        }, {
            "dom": []
        });
        H5FullscreenPage.init({
            type: 1,
            useArrow: true,
            pageShow: function(dom) {
                var index = dom.getAttribute("data-id");
                if (index == 0) {
                    globalSym[0].playAll();
                }
                if (index == 1) {
                    if (globalSym[1] != undefined) {
                        globalSym[1].playAll();
                    } else {
                        AdobeEdge.loadComposition('testAn', 'EDGE-21786146', {
                            scaleToFit: "width",
                            centerStage: "horizontal",
                            minW: "0px",
                            maxW: "undefined",
                            width: window.innerWidth + "px",
                            height: window.innerHeight + "px"
                        }, {
                            dom: []
                        }, {
                            dom: []
                        });
                    }
                }
            }
        })
    }
})
