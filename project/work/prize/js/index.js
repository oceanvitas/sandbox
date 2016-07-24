(function () {
	
	var medalsControl = function () {
		var $box = $('.box'),
				$medals = $box.find('.item'),			
				isMoving = false;

		$box.swipeLeft(function () {
			console.log('left')
			if (isMoving) {
				return
			}
			isMoving = true;
			$medals.each(function (index) {
				var $this = $(this),
						old = parseInt($this.attr('data-old')),
						now = parseInt($this.attr('data-now')),
						newNo = now === 0 ? 2 : now - 1;
				$this.addClass('item__' + now + '-' + newNo)
						 .removeClass('item__' + old + '-' + now)
						 .attr('data-old', now)
						 .attr('data-now', newNo);
			});
			isMoving = false;
		});

		$box.swipeRight(function () {
			console.log('right')
			if (isMoving) {
				return
			}
			isMoving = true;
			$medals.each(function (index) {
				var $this = $(this),
						old = parseInt($this.attr('data-old')),
						now = parseInt($this.attr('data-now')),
						newNo = now === 2 ? 0 : now + 1;
				$this.addClass('item__' + now + '-' + newNo)
						 .removeClass('item__' + old + '-' + now)
						 .attr('data-old', now)
						 .attr('data-now', newNo);
			});
			isMoving = false;
		});

		$medals.on('click', function () {
			var $this = $(this),
					animateClass = 'item__animate';
			if ($this.hasClass('item__active') && !$this.hasClass(animateClass)) {
				$this.addClass(animateClass);
				setTimeout(function () {
					$this.removeClass(animateClass);
				}, 2000);
			}
		});
		
	};

	medalsControl();
})();