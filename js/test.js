$(function() {
    window.globalSym = {};
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
        }
    })
})
