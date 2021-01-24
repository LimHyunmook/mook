// JavaScript Document
/* 효과 메서드(slideDown( ), slideUp( ))를 사용하지 않고 드랍다운 메뉴를 구현 */

var timeout = 500; /* 메인메뉴에서 마우스 아웃시 서브메뉴 대기시간을 설정 */
var closetimer = 0; /* 서브메뉴를 숨길 때 설정된 대기시간을 삭제 */
var ddmenuitem = 0; /* 메인 메뉴에 마우스 오버시 해당되는 서브메뉴 */

function dropdown_open( ) { /* 현재 실행중인 메인메뉴의 서브메뉴를 보여준다. */
	dropdown_canceltimer( ); /* 함수호출: 서브메뉴의 대기시간을 삭제 */
	dropdown_close( ); /* 함수호출: 노출된 서브메뉴를 숨김 */
	ddmenuitem = $(this).find('ul').css('display', 'block');
	/* 마우스 오버한 메인메뉴에 해당하는 서브메뉴를 보여지게 한다. */
}

function dropdown_canceltimer( ) { /* 함수: 서브메뉴를 숨길 때 설정된 대기시간을 삭제 */
	if(closetimer) {
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

function dropdown_close( ) { /* 함수: 노출된 서브메뉴를 숨김 */
	if(ddmenuitem)  ddmenuitem.css('display', 'none');
}

function dropdown_timer( ) {
	closetimer = window.setTimeout(dropdown_close, timeout);
}
/* window 내장객체의 메서드 setTimeout(호출함수, 간격): 일정한 간격으로 함수를 호출하여 수행한다.
window 내장객체의 메서드 clearTimeout(변수): setTimeout( ) 메서드에 의해 일정한 간격으로 수행하는 함수를 중지하기 위해 사용한다.*/


$(document).ready(function( ) {
	$('#dropdown > li').bind('mouseover', dropdown_open);
	/* 메인메뉴에 마우스 오버시 서브메뉴를 보여지게 한다. */
	$('#dropdown > li').bind('mouseout', dropdown_timer);
	/* 메인메뉴에 마우스 아웃시 서브메뉴를 시간(0.5초)을 두고 숨긴다. */
});










