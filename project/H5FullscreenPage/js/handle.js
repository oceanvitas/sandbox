$(function() {
	window.globalSym = {};
	var mediaSrc = 'media/FadeAway.mp3';
	var soundId = 'sound';
	var useMusic = true;

	//预加载
	var queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	queue.on("complete", handleComplete, this);
	queue.loadFile({id: soundId, src:mediaSrc});
	queue.loadManifest([
	    // {id: "myImage", src:"path/to/myImage.jpg"}
	]);
	function handleComplete() {
	    if (useMusic) {
	    	createjs.Sound.play(soundId);
	             $('body').append('<span class="music play"></span>');
	             $('.music').on('tap',function(){
	                if (!$('.music').hasClass('play')) {
	                    createjs.Sound.play(soundId);
	                } else {
	                    createjs.Sound.stop(soundId);
	                }
	                 $(this).toggleClass('play');
	             });
	    }
	 }
	

	//第一个动画
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
			var index = dom.getAttribute('data-id');
			console.log(index)
			if (index == 1) {
				//globalSym.one.playAll();
				console.log('one replay')
			}
			if (index == 2) {
				if (globalSym.two != undefined) {
					//globalSym.two.playAll();
					console.log('two replay')
				} else {
					//第二个动画
					AdobeEdge.loadComposition('edgeTest', 'EDGE-16882217', {
						scaleToFit: "width",
						centerStage: "horizontal",
						minW: "0px",
						maxW: "undefined",
						width: window.innerWidth + "px",
						height: window.innerHeight + "px"
					}, {
						dom: [{
							id: 'Ellipse',
							type: 'ellipse',
							rect: ['153px', '111px', '143px', '141px', 'auto', 'auto'],
							borderRadius: ["50%", "50%", "50%", "50%"],
							fill: ["rgba(207,58,58,1.00)"],
							stroke: [0, "rgba(0,0,0,1)", "none"]
						}, {
							id: 'Rectangle',
							type: 'rect',
							rect: ['33px', '245px', '131px', '112px', 'auto', 'auto'],
							fill: ["rgba(207,58,58,1)"],
							stroke: [0, "rgb(0, 0, 0)", "none"]
						}]
					}, {
						dom: []
					});
				}

			}
		}
	});

})