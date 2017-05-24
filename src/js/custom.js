$(document).ready(function() {

//костыльный велосипед для ковер эффекта имжей
function coverImg (argument) {
	
	argument.parent().innerHeight(argument.parents().innerWidth());

	for (var i = 0; i < argument.length; i++) {	

		var imgTarg = argument.eq(i).find('img');
		
		argument.eq(i).css({'backgroundImage': 'url('+imgTarg.attr('src')+')'});
		imgTarg.hide();
	};
}
coverImg($('.ourWork__workListAnchor'));



//Для таблетки 8 слайдов на главной, для мобильника 4

function workListCountFunc() {

	var workListCount = $('.ourWork__gallery').children('.ourWork__workList').length;

	if ($(window).innerWidth() <= 992) {
		 $('.ourWork__gallery').children('.ourWork__workList').eq(workListCount-1).hide();
	}

	if ($(window).innerWidth() <= 375) {	

		var picCount = 4;
		while (picCount < workListCount) {		
			$('.ourWork__gallery').children('.ourWork__workList').eq(+picCount).hide();
			picCount++;
		}
	}

	if ($(window).innerWidth() > 992) {
		 $('.ourWork__gallery').children('.ourWork__workList').show();
	}

	if ($(window).innerWidth() > 375 && $(window).innerWidth() < 992) {
		 $('.ourWork__gallery').children('.ourWork__workList').show();
		 $('.ourWork__gallery').children('.ourWork__workList').eq(workListCount-1).hide();
	}
};

workListCountFunc();


//подключаем lazyload
/*$(".portfolio__slideImg").lazyload({
    effect : "fadeIn"
});*/

/*$(".ourWork__workListImg").lazyload({
    effect : "fadeIn"
});*/


/*НАЧАЛО - СЛАЙДЕР - http://fotorama.io*/
var imgArray = [],
	imgList = $('.portfolio__slide');

for (var i = 0; i < imgList.length; i++) {
	var someObj = new Object();
	someObj.img = imgList.eq(i).find('img').attr('src');
	someObj.thumb = someObj.img;
	imgArray.push(someObj);
}

$('.main__portfolio').on('click', '.portfolio__slide', function(event) {
	event.preventDefault();

	var imgNumber = $(this).index();

	$('body').append('<div class="slider slider__show"> <div class="fotorama"></div> </div>');

	$('.fotorama').fotorama({
		width: 700,
		maxwidth: '100%',
		allowfullscreen: true,
		nav: 'thumbs',
		loop: true,
		data: imgArray
	});

	$('.fotorama').on('fotorama:ready', function (e, fotorama) {
		fotorama.requestFullScreen();
		fotorama.show(imgNumber);
	});

	$('.fotorama').on('fotorama:fullscreenexit', function (e, fotorama) {
		$('.slider').removeClass('slider__show');
	});
});

/*КОНЕЦ - СЛАЙДЕР - http://fotorama.io*/


//menu button
$('.menu-button').on('click', function(event) {
	event.preventDefault();
	$(this).toggleClass('active');
	$('.sidebar').toggleClass('active');
	$('.main').toggleClass('active');
});

$('#callbackForm textarea, #callbackFormIndex textarea').on('focus', function(event) {
	event.preventDefault();
	$(this).addClass('active');
});

$('#callbackForm textarea, #callbackFormIndex textarea').on('blur', function(event) {
	event.preventDefault();
	$(this).removeClass('active');
});


//resize event
$(window).resize(function(event) {

	if ( $(window).innerWidth() > 768 && $('.sidebar').hasClass('active') ) {
		$('.sidebar, .main, .menu-button').removeClass('active');
	}

	setContactWrapperContentWidth();
	workListCountFunc();	
});


function setContactWrapperContentWidth () {
	if($('.main__contact').innerWidth()<905) {
		$('.main__contact').addClass('active');
	};
	if($('.main__contact').innerWidth()>905) {
		$('.main__contact').removeClass('active');
	}
}
setContactWrapperContentWidth();

/*НАЧАЛО freewall*/
var portfolioWall = new freewall(".main__portfolio");
portfolioWall.reset({
	selector: ".portfolio__slide",
	animate: true,
	cellW: 150,
	cellH: "auto",
	gutterX : 5,
	gutterY : 5,
	onResize: function() {
		portfolioWall.fitWidth();
	}
});

portfolioWall.fitWidth();

var portfolioImages = portfolioWall.container.find(".portfolio__slide");
portfolioImages.find("img").load(function() {
	portfolioWall.fitWidth();
});

// $(".filter-label").click(function() {
// 	$(".filter-label").removeClass("active");
// 	var filter = $(this).addClass("active").data("filter");
// 	wall.filter(filter);
// 	setTimeout(function() {
// 		$(window).resize();
// 		wall.fitWidth();
// 	}, 400);
// });

/*КОНЕЦ freewall*/

});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");
	portfolioWall.fitWidth();
	$(window).scrollTop(0);
});