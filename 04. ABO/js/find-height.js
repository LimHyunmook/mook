// JavaScript Document

var mfh = 1000;  // FHD main 페이지 높이
var introfh = 2000;  // FHD introduction 페이지 높이
var recfh = 1000;  // FHD recommend 페이지 높이
var expfh = 1700;  // FHD experience 페이지 높이
var searchfh = 1000;  // FHD search 페이지 높이

var mh = 1000;  // HD main 페이지 높이
var introh = 1880;  // HD introduction 페이지 높이
var rech = 1000;  // HD recommend 페이지 높이
var exph = 1594;  // HD experience 페이지 높이
var searchh = 1000;  // HD search 페이지 높이

var mt = 1000;  // TABLET main 페이지 높이
var introt = 1880;  // TABLET introduction 페이지 높이
var rect = 1000;  // TABLET recommend 페이지 높이
var expt = 1636;  // TABLET experience 페이지 높이
var searcht = 1000;  // TABLET search 페이지 높이

var ms = 800;  // SMART main 페이지 높이
var intros = 1810;  // SMART introduction 페이지 높이
var recs = 800;  // SMART recommend 페이지 높이
var exps = 1810;  // SMART experience 페이지 높이
var searchs = 800;  // SMART search 페이지 높이

var fhb1 = mfh;
var fhb2 = fhb1 + introfh;
var fhb3 = fhb2 + recfh;
var fhb4 = fhb3 + expfh;

var hb1 = mh;
var hb2 = hb1 + introh;
var hb3 = hb2 + rech;
var hb4 = hb3 + exph;

var tb1 = mt;
var tb2 = tb1 + introt;
var tb3 = tb2 + rect;
var tb4 = tb3 + expt;

var sb1 = ms;
var sb2 = sb1 + intros;
var sb3 = sb2 + recs;
var sb4 = sb3 + exps;


function findHeight() {
	var windowWidth = $(window).width();
	var scrollHeight = $(window).scrollTop();
	
	if(windowWidth >= 1450) {
		$('aside .bar').removeClass('current');
		
		if(scrollHeight<fhb1) {
			$('aside .bar-main').addClass('current');
		}else if(scrollHeight >= fhb1 && scrollHeight < fhb2) {
			$('aside .bar-intro').addClass('current');
		}else if(scrollHeight >= fhb2 && scrollHeight < fhb3) {
			$('aside .bar-rec').addClass('current');
		}else if(scrollHeight >= fhb3 && scrollHeight < fhb4) {
			$('aside .bar-exp').addClass('current');
		}else if(scrollHeight >= fhb4) {
			$('aside .bar-search').addClass('current');
		}
	}else if(windowWidth >= 1050) {
		$('aside .bullet, aside ul li').removeClass('current');
		
		if(scrollHeight<hb1) {
			$('aside .bullet-main, aside ul li:nth-child(1)').addClass('current');
		}else if(scrollHeight >= tb1 && scrollHeight < tb2) {
			$('aside .bullet-intro, aside ul li:nth-child(2)').addClass('current');
		}else if(scrollHeight >= tb2 && scrollHeight < tb3) {
			$('aside .bullet-rec, aside ul li:nth-child(3)').addClass('current');
		}else if(scrollHeight >= tb3 && scrollHeight < tb4) {
			$('aside .bullet-exp, aside ul li:nth-child(4)').addClass('current');
		}else if(scrollHeight >= tb4) {
			$('aside .bullet-search, aside ul li:nth-child(5)').addClass('current');
		}
	}else if(windowWidth >= 700) {
		$('aside .bullet, aside ul li').removeClass('current');
		
		if(scrollHeight<hb1) {
			$('aside .bullet-main, aside ul li:nth-child(1)').addClass('current');
		}else if(scrollHeight >= tb1 && scrollHeight < tb2) {
			$('aside .bullet-intro, aside ul li:nth-child(2)').addClass('current');
		}else if(scrollHeight >= tb2 && scrollHeight < tb3) {
			$('aside .bullet-rec, aside ul li:nth-child(3)').addClass('current');
		}else if(scrollHeight >= tb3 && scrollHeight < tb4) {
			$('aside .bullet-exp, aside ul li:nth-child(4)').addClass('current');
		}else if(scrollHeight >= tb4) {
			$('aside .bullet-search, aside ul li:nth-child(5)').addClass('current');
		}
	}else if(windowWidth < 700) {
		$('aside .bullet, aside ul li').removeClass('current');
		
		if(scrollHeight<sb1) {
			$('aside .bullet-main, aside ul li:nth-child(1)').addClass('current');
		}else if(scrollHeight >= sb1 && scrollHeight < sb2) {
			$('aside .bullet-intro, aside ul li:nth-child(2)').addClass('current');
		}else if(scrollHeight >= sb2 && scrollHeight < sb3) {
			$('aside .bullet-rec, aside ul li:nth-child(3)').addClass('current');
		}else if(scrollHeight >= sb3 && scrollHeight < sb4) {
			$('aside .bullet-exp, aside ul li:nth-child(4)').addClass('current');
		}else if(scrollHeight >= sb4) {
			$('aside .bullet-search, aside ul li:nth-child(5)').addClass('current');
		}
	} // if(windowWidth)문 : end
} // findHeight() : end