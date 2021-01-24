(function($){
	$.fn.bjqs = function(options) {
		
	var settings = { };
		
	var defaults = { // 기본 옵션 값
		width: 900, // 슬라이드 이미지의 가로 크기
		height: 496, // 슬라이드 이미지의 세로 크기
		animation: 'slide', // 애니메이션 효과를 변경(fade/slide)
		animationDuration: 450, // 슬라이드 애니메이션의 속도 설정
		automatic: true, // 슬라이드 애니메이션 자동시작여부 설정
		rotationSpeed: 4000, // 슬라이드 이미지 정지 시간
		hoverPause: true, // 슬라이드 이미지에 마우스 오버할 때 슬라이더 일시정지여부
		showControls: true,
		centerControls: true,
		nextText: '>', 
		prevText: '<',
		showMarkers: true, // 블릿 표시 여부
		centerMarkers: true, // 블릿 중앙 표시 여부
		keyboardNav: true, // 슬라이드 이미지 방향키로 컨트롤 여부
		useCaptions: true
	}	
	// 기본 옵션 값을 제공된 옵션값으로 덮어쓰기
	settings = $.extend({}, defaults, options);
	// 변수 선언
	var	$container = this;
		$slider = $('ul.bjqs'),
		slides = $slider.children('li'),
		slideCount = slides.length,
		animating = false,
		paused = false,
		current = 0,
		slidePosition = 1,
		next = 0,
		$active = slides.eq(current),
		forward = 'forward',
		back = 'backward'	
	// 슬라이드 애니메이션의 일관된 크기로 설정
	slides.css({'height':settings.height,'width':settings.width});
	$slider.css({'height':settings.height,'width':settings.width});
	$container.css({'height':settings.height,'width':settings.width});
	// 슬라이드 콘텐츠 목록 요소와 구별하기 위해 슬라이드 항목 요소에 고유 클래스를 추가
	slides.addClass('bjqs-slide');	
	// 컨트롤러(다음, 이전 버튼)
	if(settings.showControls && slideCount > 1) {
		// 다음, 이전 버튼 요소 생성			
		$controlContainer = $('<ul class="bjqs-controls"></ul>');
		$next = $('<li><a href="#" class="bjqs-next" class="controls">'+settings.nextText+'</a></li>');
		$previous = $('<li><a href="#" class="bjqs-prev" class="controls">'+settings.prevText+'</a></li>');		
		// 클릭 이벤트가 발생하면 다음, 이전 버튼에 연결시킴
		$next.click(function(e){
			e.preventDefault();
			if(!animating)
				bjqsGo(forward,false);
		});
		
		$previous.click(function(e){
			e.preventDefault();
			if(!animating)
				bjqsGo(back, false);
		});		
		
		$next.appendTo($controlContainer);
		$previous.appendTo($controlContainer);
		$controlContainer.appendTo($container);		
		// 컨트롤러를 수직으로 중앙에 배치
		if(settings.centerControls) {
			$control = $next.children('a');
			offset = ($container.height() -$control.height()) / 2;
			$next.children('a').css('top', offset).show();
			$previous.children('a').css('top', offset).show();
		}
	}	
	// 블릿
	if(settings.showMarkers && slideCount > 1) {		
		$markerContainer = $('<ol class="bjqs-markers"></ul>');		
		// 슬라이드 이미지에 대한 각각의 블릿을 만들어 추가한다.
		$.each(slides,function(key,value) {
			if(settings.animType == 'slide'){
				if(key != 0 && key != slideCount-1)
					$marker = $('<li><a href="#">'+key+'</a></li>');
			}else {
				key++
				$marker = $('<li><a href="#">'+key+'</a></li>');
			}
			// 블릿을 클릭했을 경우 해당 슬라이드이미지를 연결시킴
			$marker.click(function(e){
				e.preventDefault();
				if(!$(this).hasClass('active-marker') && !animating)
					bjqsGo(false,key);
			});
			
			$marker.appendTo($markerContainer);			
		});
		// 활성화된 슬라이드 이미지의 블릿을 활성화 시킴
		markers = $markerContainer.children('li');
		markers.eq(current).addClass('active-marker');
		$markerContainer.appendTo($container);
		// 블릿을 수평으로 중앙에 배치
		if(settings.centerMarkers) {
			offset = (settings.width - $markerContainer.width() )/2;
			$markerContainer.css('left', offset);
		}
	}	
	// 키보드 사용 활성화
	if(settings.keyboardNav && slideCount > 1) {		
		$(document).keyup(function(event) {			
			if(!paused) {
				clearInterval(bjqsInterval);
				paused=true;
			}
			
			if(!animating) {
				if(event.keyCode == 39) { // 키보드 오른쪽 방향 키
					event.preventDefault();
					bjqsGo(forward, false);
				}else if(event.keyCode == 37) { // 키보드 왼쪽 방향 키
					event.preventDefault();
					bjqsGo(back,false);
				}
			}
			
			if(paused & settings.automatic) {
				bjqsInterval = setInterval(function(){ bjqsGo(forward) }, settings.rotationSpeed);
				paused=false;
			}			
		});
	}	
	// 캡션(이미지에대한 설명 텍스트) 표시
	if(settings.useCaptions) {		
		$.each(slides, function(key, value){
			
			var $slide = $(value);
			var $slideChild = $slide.children('a').children('img:first-child');
			var title = $slideChild.attr('title');
			
			if(title) {
				var $caption = $('<p class="bjqs-caption">'+title+'</p>');
				$caption.appendTo($slide);
			}
		});		
	}	
	// 슬라이드 이미지에 마우스 오버할 때 일시정지 설정이 있으면
	if(settings.hoverPause && settings.automatic) {			
		$container.hover(function() {
			if(!paused) {
				clearInterval(bjqsInterval);
				paused=true;
			}
		},function(){
			if(paused) {
				bjqsInterval = setInterval(function(){ bjqsGo(forward) }, settings.rotationSpeed);
				paused=false;
			}
		});		
	}
	// 슬라이드 애니메이션으로 slide 설정이 있으면
	if(settings.animation == 'slide' && slideCount > 1) {		
		$first = slides.eq(0);
		$last = slides.eq(slideCount-1);
		
		$first.clone().addClass('clone').removeClass('slide').appendTo($slider);
		$last.clone().addClass('clone').removeClass('slide').prependTo($slider);
		
		slides = $slider.children('li');
		slideCount = slides.length;
		
		$wrapper = $('<div class="bjqs-wrapper"></div>').css({
			'width' : settings.width,
			'height' : settings.height,
			'overflow' : 'hidden',
			'position' : 'relative'
		});
		
		$slider.css({
			'width' : settings.width*slideCount,
			'left' : -settings.width
		});
		
		slides.css({
			'float': 'left',
			'position': 'relative',
			'display' : 'list-item'
		});
		
		$wrapper.prependTo($container);
		$slider.appendTo($wrapper);		
	}	
	// 첫번째 또는 마지막 슬라이드 이미지에 있는지 확인하여 그에 따라 다음 슬라이드 이미지로 이동
	var checkPosition = function(direction) {
		if(settings.animation == 'fade') {			
			if(direction == forward) {
				!$active.next().length ? next = 0 : next++
			}else if(direction == back) {
				!$active.prev().length ? next = slideCount-1 : next--
			}			
		}
		
		if(settings.animation == 'slide') {			
			if(direction == forward) {
				next = slidePosition + 1;
			}
						
			if(direction == back) {
				next = slidePosition - 1;
			}
		}
		
		return next;
	}	
	
	if(settings.automatic && slideCount > 1) {
		var bjqsInterval = setInterval(function(){ bjqsGo(forward,false) }, settings.rotationSpeed);
	}	
	// 첫번째 슬라이드 표시
	slides.eq(current).show();
	$slider.show();	
	// 슬라이드 이미지에 애니메이션 효과 적용
	var bjqsGo =  function(direction,position) {		
		if(!animating) {			
			if(direction) {
				next = checkPosition(direction);
			}else if(position && settings.animation == 'fade') {
				next = position-1;
			}else {
				next = position;
			}
			
			animating = true;
			
			if(settings.animation == 'fade') {				
				if(settings.showMarkers) {
					markers.eq(current).removeClass('active-marker');
					markers.eq(next).addClass('active-marker');
				}
				
				$next = slides.eq(next);
				
				$active.fadeOut(settings.animationDuration);
				$next.fadeIn(settings.animationDuration, function() {
					$active.hide();
					current = next;
					$active = $next;
					animating = false;
				});
			}else if(settings.animation == 'slide') {				
				if(settings.showMarkers) {					
					markers.eq(slidePosition-1).removeClass('active-marker');
					
					if(next==slideCount-1) {
						markers.eq(0).addClass('active-marker');
					}else if(next==0) {
						markers.eq(slideCount-3).addClass('active-marker');
					}else {
						markers.eq(next-1).addClass('active-marker');
					}					
				}
				
				$slider.animate({'left': -next*settings.width}, settings.animationDuration, function() {					
					if(next==0) {
						slidePosition=slideCount-2;
						$slider.css({'left' : -slidePosition*settings.width});
					}else if(next==slideCount-1) {
						slidePosition=1;
						$slider.css({'left' : -settings.width});
					}else {
						slidePosition=next;
					}
					
					animating=false;					
				});				
			}			
		}		
	}
		
	return this;	
	}
})(jQuery);