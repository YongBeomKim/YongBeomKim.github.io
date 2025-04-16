// JavaScript Document



// GNB 컨트롤
// 현재 스크롤바의 위치를 저장하는 변수 (px)
var currentScrollTop = 0;
// 비동기식 jQuery이므로 window load 후 jQuery를 실행해야 함
window.onload = function () {
	// 새로고침 했을 경우를 대비한 메소드 실행
	scrollController();
	// 스크롤을 하는 경우에만 실행됨
	$(window).on('scroll', function () {
		scrollController();
	});
}

// 메인 메뉴의 위치를 제어하는 함수
function scrollController() {
	currentScrollTop = $(window).scrollTop();
	if (currentScrollTop < 5) {
		$('h1')
		if ($('h1').removeClass('ssize')) {
		}
		$('#container')
		if ($('#container').removeClass('ssize')) {
		}

		$('nav').css('top', 0 - (currentScrollTop));
		$('header').css('top', 0 - (currentScrollTop));
		$('#gnb').css('top', 0 - (currentScrollTop));
		$('#main_search_area').css('top', 129 - (currentScrollTop));
		$('.lnb').css('top', 92 - (currentScrollTop));
		if ($('#gnb').hasClass('fixed')) {
			$('#gnb').removeClass('fixed');
			$('#gnb').removeClass('menu_ssize');
		}
	} else {
		if (!$('header').hasClass('fixed')) {
			$('h1').addClass('ssize');
			$('nav').css('top', -36);
			$('header').css('top', -36);
			$('#gnb').css('top', 45);
			$('#gnb').addClass('fixed');
			$('#gnb').addClass('default');
			$('#gnb').addClass('menu_ssize');
			$('#main_search_area').css('top', 54);
			$('#main_search_area').addClass('fixed');
			$('.lnb').css('top', -120);
			$('#container').addClass('ssize');
		}
	}
}








// 메인 프로모션 슬라이드 마우스 오버 버튼
function view_hover() {
	var i, p, v, obj, args = view_hover.arguments;
	for (i = 0; i < (args.length - 2); i += 3)
		with (document) if (getElementById && ((obj = getElementById(args[i])) != null)) {
			v = args[i + 2];
			if (obj.style) { obj = obj.style; v = (v == 'show') ? 'block' : (v == 'hide') ? 'none' : v; }
			obj.display = v;
		}
}









// 메인 책 리스트
$(document).ready(function () {

	$("#touchSlider1").touchSlider({
		flexible: true,
		btn_prev: $("#touchSlider1").next().find(".btn_prev1"),
		btn_next: $("#touchSlider1").next().find(".btn_next1"),
		counter: function (e) {
			$("#count").html("current : " + e.current + ", total : " + e.total);
		}
	});

	$("#touchSlider1").touchSlider({
		flexible: true,
		paging: $("#touchSlider1").next().find(".btn_page1"),
		initComplete: function (e) {
			$("#touchSlider1").next().find(".btn_page1").each(function (i, el) {
				$(this).text("page " + (i + 1));
			});
		},
		counter: function (e) {
			$("#touchSlider1").next().find(".btn_page1").removeClass("on").eq(e.current - 1).addClass("on");
		}
	});




	$("#touchSlider2").touchSlider({
		flexible: true,
		btn_prev: $("#touchSlider2").next().find(".btn_prev2"),
		btn_next: $("#touchSlider2").next().find(".btn_next2"),
		counter: function (e) {
			$("#count").html("current : " + e.current + ", total : " + e.total);
		}
	});

	$("#touchSlider2").touchSlider({
		flexible: true,
		paging: $("#touchSlider2").next().find(".btn_page2"),
		initComplete: function (e) {
			$("#touchSlider2").next().find(".btn_page2").each(function (i, el) {
				$(this).text("page " + (i + 1));
			});
		},
		counter: function (e) {
			$("#touchSlider2").next().find(".btn_page2").removeClass("on").eq(e.current - 1).addClass("on");
		}
	});


});









// 인풋 히든 메시지
jQuery(function () {
	var i_text = $('.i_label strong').next('.i_text');
	$('.i_label strong').css('position', 'absolute');
	i_text
		.focus(function () {
			$(this).prev('.i_label strong').css('visibility', 'hidden');
		})
		.blur(function () {
			if ($(this).val() == '') {
				$(this).prev('.i_label strong').css('visibility', 'visible');
			} else {
				$(this).prev('.i_label strong').css('visibility', 'hidden');
			}
		})
});










/// 레이어 팝업 - 카트 담기	
function add_cart_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.add_cart_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.add_cart_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}









/// 레이어 팝업 - 리뷰 쓰기	
function review_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.review_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.review_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.btn_white').click(function (e) {	//btn_white의 클래스 버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.review_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}









/// 레이어 팝업 - 오탈자 등록	
function misprint_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.misprint_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.misprint_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.btn_white').click(function (e) {	//btn_white의 클래스 버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.misprint_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}



/// 레이어 팝업 - 도서인증	
function certification_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.certification_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.certification_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.btn_white').click(function (e) {	//btn_white의 클래스 버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.certification_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}





/// 레이어 팝업 - 마일리지 전환	
function mileage1_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.mileage1_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.mileage1_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}




/// 레이어 팝업 - 마일리지 적립 기준	
function mileage_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.mileage_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.mileage_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}



/// 레이어 팝업 - 배송지 주소록	
function addr_book_layer_open(el) {
	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.addr_book_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	//$("body").css("overflow-y","hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.addr_book_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
		//alert("test");
	});
}



/// 레이어 팝업 - 배송지 주소록	신규등록
function addr_new_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.addr_new_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.addr_new_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.btn_white2').click(function (e) {	//버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.addr_new_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}


/// 레이어 팝업 - 배송지 변경
function addr_change_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.addr_change_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.addr_change_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.btn_white2').click(function (e) {	//버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.addr_change_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}

/// 레이어 팝업 - 주문취소 규정
function cancel_rule_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.cancel_rule_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.cancel_rule_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();
	});

	$('.cancel_rule_layer .bg').click(function (e) {	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.cancel_rule_layer').fadeOut(200);
		e.preventDefault();
	});

}


/// 레이어 팝업 - 주문취소 안내
function cancel_infor_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.cancel_infor_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.cancel_infor_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();
	});

	$('.cancel_infor_layer .bg').click(function (e) {	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.cancel_infor_layer').fadeOut(200);
		e.preventDefault();
	});

}



/// 레이어 팝업 - 주문취소	
function cancel_order_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.cancel_order_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.cancel_order_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('a.btn_2').click(function (e) {	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.cancel_order_layer').fadeOut(200);
		e.preventDefault();
		$("body").css("overflow-y", "auto");
	});

}



/// 레이어 팝업 - 쿠폰
function coupon_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.coupon_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.coupon_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}


/// 레이어 팝업 - 수강보류
function lecture_defer_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.lecture_defer_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.lecture_defer_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.cancel_btn').click(function (e) {	//cancel_btn 버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.lecture_defer_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}


/// 레이어 팝업 - 수강재개
function lecture_resume_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.lecture_resume_layer').fadeIn(200);	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn(200);
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.lecture_resume_layer').fadeOut(200); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut(200);
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.cancel_btn').click(function (e) {	//cancel_btn 버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.lecture_resume_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}



/// 아코디언 형식 - 마이페이지
jQuery(function () {
	var article = $('.acodian_area .article');
	article.addClass('hide');
	//article.find('.aco_view').slideUp(100);
	article.find('.aco_view').slideUp(0);

	$('.acodian_area .article .trigger').click(function () {
		var myArticle = $(this).parents('.article:first');
		if (myArticle.hasClass('hide')) {
			article.addClass('hide').removeClass('show'); // 아코디언 효과를 원치 않으면 이 라인을 지우세요
			article.find('.aco_view').slideUp(100); // 아코디언 효과를 원치 않으면 이 라인을 지우세요
			myArticle.removeClass('hide').addClass('show');
			myArticle.find('.aco_view').slideDown(100);
		} else {
			myArticle.removeClass('show').addClass('hide');
			myArticle.find('.aco_view').slideUp(100);
		}
	});
});


/// 레이어 팝업 - 일정보기	
function schedule_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.schedule_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.schedule_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

	$('.cancel_btn').click(function (e) {	//btn_white의 클래스 버튼을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		$('.schedule_layer').fadeOut(200);
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}




/// 레이어 팝업 - 신용카드결제	
function creditcard_layer_open(el) {

	var temp = $('#' + el);
	var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	if (bg) {
		$('.creditcard_layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다. 
	} else {
		temp.fadeIn();
	}

	$("body").css("overflow-y", "hidden");  // 레이어 팝업시 배경 안움직이게

	// 화면의 중앙에 레이어를 띄운다.
	if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
	else temp.css('top', '0px');
	if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
	else temp.css('left', '0px');

	temp.find('a.cbtn').click(function (e) {
		if (bg) {
			$('.creditcard_layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다. 
		} else {
			temp.fadeOut();
		}
		e.preventDefault();

		$("body").css("overflow-y", "auto");  // 레이어 팝업시 배경 안움직이게 해제
	});

}



/// 아코디언 형식 - 상세페이지 리뷰
jQuery(function () {

	var article = $('.detail_review_area .article');
	article.addClass('hide');
	article.find('.review_view').slideUp(100);

	$('.detail_review_area .article .trigger').click(function () {
		var myArticle = $(this).parents('.article:first');
		if (myArticle.hasClass('hide')) {
			article.addClass('hide').removeClass('show'); // 아코디언 효과를 원치 않으면 이 라인을 지우세요
			article.find('.review_view').slideUp(100); // 아코디언 효과를 원치 않으면 이 라인을 지우세요
			myArticle.removeClass('hide').addClass('show');
			myArticle.find('.review_view').slideDown(100);
		} else {
			myArticle.removeClass('show').addClass('hide');
			myArticle.find('.review_view').slideUp(100);
		}
	});

});


/// 아코디언 형식 - 마이강의
jQuery(function () {

	var article = $('.lecture_list_area .article');
	article.addClass('hide');
	article.find('.lecture_view').slideUp(100);

	$('.lecture_list_area .article .trigger').click(function () {
		var myArticle = $(this).parents('.article:first');
		if (myArticle.hasClass('hide')) {
			article.addClass('hide').removeClass('show'); // 아코디언 효과를 원치 않으면 이 라인을 지우세요
			article.find('.lecture_view').slideUp(100); // 아코디언 효과를 원치 않으면 이 라인을 지우세요
			myArticle.removeClass('hide').addClass('show');
			myArticle.find('.lecture_view').slideDown(100);
		} else {
			myArticle.removeClass('show').addClass('hide');
			myArticle.find('.lecture_view').slideUp(100);
		}
	});

});



////////////////////////////////////
// 개발영역
/////////////////////////////////////


///////////////////////
// 카트 담기
///////////////////////
function addCart(p_code, m_idx, ea, opt) {
	//if(m_idx =="") {
	//alert('로그인이 필요한 서비스 입니다.');
	//return;
	//}
	var cart_opt = p_code.substring(0, 1);

	$.ajax({
		type: "post",
		url: "/store/ajax.addCart.php",
		data: { "p_code": p_code, "m_idx": m_idx, "ea": ea, "opt": cart_opt },
		dataType: "text",
		success: function (result, status) {
			if (result == 1) {
				$('#cartmsg').show();
				$('#cartmsg2').hide();
				add_cart_layer_open('layer_add_cart');
			} else if (result == 0) {
				$('#cartmsg2').show();
				$('#cartmsg').hide();
				add_cart_layer_open('layer_add_cart');
				return;
			}
		}
	});
}


// 위시리스트 담기
function addWishlist(p_code, m_idx, ea, opt) {

	if (m_idx == "") {
		alert('로그인이 필요한 서비스 입니다.');
		document.location.href = '/member/login.html';
		return;
	}

	$.ajax({
		type: "post",
		url: "/store/ajax.addWishlist.php",
		data: { "p_code": p_code, "m_idx": m_idx, "ea": ea, "opt": opt },
		dataType: "text",
		success: function (result, status) {
			if (result == 1) {
				alert("해당 상품을 위시리스트에 담았습니다");
				return;
			} else if (result == 0) {
				alert("이미 위시리스트에 추가된 상품입니다.");
				return;
			}
		}
	});
}


// 재판매 조르기
function addSalePush(p_code, m_idx) {

	if (m_idx == "") {
		alert('로그인이 필요한 서비스 입니다.');
		document.location.href = '/member/login.html';
		return;
	}

	$.ajax({
		type: "post",
		url: "/store/ajax.addSalePush.php",
		data: { "p_code": p_code, "m_idx": m_idx },
		dataType: "text",
		success: function (result, status) {

			if (result == 1) {
				alert("해당 상품에 대한 재판매 조르기 되었습니다.");
				return;
			} else if (result == 0) {
				alert("이미 조르기된 상품입니다.");
				return;
			}
		}
	});
}



//좋아요
function setLike(p_code, m_idx) {
	/*
	if(m_idx =="") {
		alert('로그인이 필요한 서비스 입니다.');
		document.location.href='/member/login.html';
		return;
	}
	*/

	//if(confirm("해당 상품에 “좋아요”를 설정합니다")) { 
	$.ajax({
		type: "post",
		url: "/store/ajax.setLike.php",
		data: { "p_code": p_code, "m_idx": m_idx },
		dataType: "text",
		success: function (result, status) {
			if (result == 0) {
				//alert("이미 “좋아요”를 눌러 주셨습니다.");
				//return;
				$("#likescore").html(result);
			} else {
				//좋아요 누른후 버튼 색상 변경(2016-04-25)
				$(".btn_like").addClass("btn_like_ok");
				$("#likescore").html(result);
			}
		}
	});
	//}
}


//미리보기
function bookPreview(preview_id) {
	window.open(preview_id, 'preview', 'scrollbars=yes,toolbar=yes,resizable=yes ,width=700,height=600,left=0,top=0');
}


//쿠키 설정
function setCookie(name, value, expiredays) {
	var today = new Date();
	today.setDate(today.getDate() + expiredays);

	document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toGMTString() + ';'
}

function getCookie(name) {
	var cName = name + "=";
	var x = 0;
	while (i <= document.cookie.length) {
		var y = (x + cName.length);
		if (document.cookie.substring(x, y) == cName) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

//This is not production quality, its just demo code.
var cookieList = function (cookieName, expires) {
	//When the cookie is saved the items will be a comma seperated string
	//So we will split the cookie by comma to get the original array
	var cookie = $.cookie(cookieName);
	//Load the items or a new array if null.
	var items = cookie ? cookie.split(/,/) : new Array();

	//Return a object that we can use to access the array.
	//while hiding direct access to the declared items array
	//this is called closures see http://www.jibbering.com/faq/faq_notes/closures.html
	return {
		"add": function (val) {
			//Add to the items.
			items.push(val);
			//Save the items to a cookie.
			//EDIT: Modified from linked answer by Nick see 
			//      http://stackoverflow.com/questions/3387251/how-to-store-array-in-jquery-cookie
			$.cookie(cookieName, items.join(','), { expires: expires, path: '/' });
		},
		"remove": function (val) {
			//EDIT: Thx to Assef and luke for remove.
			indx = items.indexOf(val);
			if (indx != -1) items.splice(indx, 1);
			$.cookie(cookieName, items.join(','));
		},
		"clear": function () {
			items = null;
			//clear the cookie.
			$.cookie(cookieName, null);
		},
		"items": function () {
			//Get all the items.
			return items;
		}
	}
}

// jwt decoding
const parseJwt = (token) => {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
};

// html 특수 문자 디코딩 처리
function decodeHTMLEntities (str) {
	if(str !== undefined && str !== null && str !== '') {
		str = String(str);

		str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
		str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
		var element = document.createElement('div');
		element.innerHTML = str;
		str = element.textContent;
		element.textContent = '';
	}

	return str;
}