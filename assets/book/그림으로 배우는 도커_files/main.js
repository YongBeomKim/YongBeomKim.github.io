var promoTick;
var promoTick2;
var _INTERVAL_TIME = 5000;

$(document).ready(function() {


// ---------------- 통합메인

	// 메인 프로모션
	$("#touchSlider_prm").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_prm").next().find(".btn_prm_prev"),
		btn_next : $("#touchSlider_prm").next().find(".btn_prm_next"),
		paging : $("#touchSlider_prm").next().next().find(".btn_prm_page"),
		counter : function (e) {

			if(promoTick)
				clearTimeout(promoTick);
			promoTick = setTimeout(function(){
					$(".btn_prm_next").click();
			}, _INTERVAL_TIME);

			$("#touchSlider_prm").next().next().find(".btn_prm_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});

	$("#touchSlider_promo").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_promo").next().find(".btn_promo_prev"),
		btn_next : $("#touchSlider_promo").next().find(".btn_promo_next"),
		paging : $("#touchSlider_promo").next().next().find(".btn_promo_page"),
		counter : function (e) {

			if(promoTick)
				clearTimeout(promoTick);
			promoTick = setTimeout(function(){
					$(".btn_promo_next").click();
			}, _INTERVAL_TIME);

			$("#touchSlider_promo").next().next().find(".btn_promo_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
		
	// 메인 상단배너 네트워크
	$("#touchSlider_top_network").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_top_network").next().find(".btn_top_network_prev"),
		btn_next : $("#touchSlider_top_network").next().find(".btn_top_network_next"),
		paging : $("#touchSlider_top_network").next().next().find(".btn_top_network_page"),
		counter : function (e) {
			$("#touchSlider_top_network").next().next().find(".btn_top_network_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 책
	$("#touchSlider_book").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book").next().find(".btn_book_next"),
		paging : $("#touchSlider_book").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	
	
	// 메인 새로나온 책-통합
	$("#touchSlider_book_new_HBIT").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_HBIT").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_HBIT").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_HBIT").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_HBIT").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 새로나온 책-한빛미디어
	$("#touchSlider_book_new_HM").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_HM").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_HM").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_HM").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_HM").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	
	// 메인 새로나온 책-한빛아카데미
	$("#touchSlider_book_new_HA").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_HA").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_HA").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_HA").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_HA").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	
	// 메인 새로나온 책-한빛비즈
	$("#touchSlider_book_new_HB").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_HB").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_HB").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_HB").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_HB").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 새로나온 책-한빛라이프
	$("#touchSlider_book_new_HL").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_HL").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_HL").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_HL").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_HL").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 새로나온 책-리얼타임
	$("#touchSlider_book_new_HR").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_HR").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_HR").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_HR").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_HR").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 새로나온 책-메이크
	$("#touchSlider_book_new_MK").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_MK").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_MK").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_MK").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_MK").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 새로나온 책-한빛에듀
	$("#touchSlider_book_new_HE").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_new_HE").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_new_HE").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_new_HE").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_new_HE").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	
	
	// 메인 베스트 책-통합
	$("#touchSlider_book_best_HBIT").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_HBIT").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_HBIT").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_HBIT").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_HBIT").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 베스트 책-한빛미디어
	$("#touchSlider_book_best_HM").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_HM").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_HM").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_HM").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_HM").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	
	// 메인 베스트 책-한빛아카데미
	$("#touchSlider_book_best_HA").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_HA").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_HA").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_HA").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_HA").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	
	// 메인 베스트 책-한빛비즈
	$("#touchSlider_book_best_HB").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_HB").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_HB").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_HB").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_HB").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 베스트 책-한빛라이프
	$("#touchSlider_book_best_HL").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_HL").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_HL").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_HL").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_HL").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 베스트 책-리얼타임
	$("#touchSlider_book_best_HR").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_HR").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_HR").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_HR").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_HR").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 베스트 책-메이크
	$("#touchSlider_book_best_MK").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_MK").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_MK").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_MK").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_MK").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 메인 베스트 책-한빛에듀
	$("#touchSlider_book_best_HE").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best_HE").next().find(".btn_book_prev"),
		btn_next : $("#touchSlider_book_best_HE").next().find(".btn_book_next"),
		paging : $("#touchSlider_book_best_HE").next().next().find(".btn_book_page"),
		counter : function (e) {
			$("#touchSlider_book_best_HE").next().next().find(".btn_book_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	
	
	
	
	

	
	// 메인 네트워크
	$("#touchSlider_network").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_network").next().find(".btn_network_prev"),
		btn_next : $("#touchSlider_network").next().find(".btn_network_next"),
		paging : $("#touchSlider_network").next().next().find(".btn_network_page"),
		counter : function (e) {
			$("#touchSlider_network").next().next().find(".btn_network_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});







// ---------------- 각 브랜드

	// 브랜드 메인 프로모션
	$("#touchSlider_brand_media_promo").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_brand_media_promo").next().find(".btn_promo_prev"),
		btn_next : $("#touchSlider_brand_media_promo").next().find(".btn_promo_next"),
		paging : $("#touchSlider_brand_media_promo").next().next().find(".btn_promo_page"),
		counter : function (e) {

			if(promoTick)
				clearTimeout(promoTick);
			promoTick = setTimeout(function(){
					$(".btn_promo_next").click();
			}, _INTERVAL_TIME);

			$("#touchSlider_brand_media_promo").next().next().find(".btn_promo_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
		
	// 브랜드 메인 상단배너 네트워크
	$("#touchSlider_brand_top_network").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_brand_top_network").next().find(".btn_brand_top_network_prev"),
		btn_next : $("#touchSlider_brand_top_network").next().find(".btn_brand_top_network_next"),
		paging : $("#touchSlider_brand_top_network").next().next().find(".btn_brand_top_network_page"),
		counter : function (e) {
			$("#touchSlider_brand_top_network").next().next().find(".btn_brand_top_network_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 브랜드 메인 상단배너 베스트셀러
	$("#touchSlider_book_best").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_best").next().find(".btn_book_best_prev"),
		btn_next : $("#touchSlider_book_best").next().find(".btn_book_best_next"),
	});
	
	// 브랜드 메인 상단배너 시리즈
	$("#touchSlider_book_series").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_book_series").next().find(".btn_book_best_prev"),
		btn_next : $("#touchSlider_book_series").next().find(".btn_book_best_next"),
	});
	
	// 아카데미 교수전용
	$("#touchSlider_academy_professor").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_academy_professor").next().find(".btn_promo_prev"),
		btn_next : $("#touchSlider_academy_professor").next().find(".btn_promo_next"),
		paging : $("#touchSlider_academy_professor").next().next().find(".btn_promo_page"),
		counter : function (e) {

			if(promoTick)
				clearTimeout(promoTick);
			promoTick = setTimeout(function(){
					$(".btn_promo_next").click();
			}, _INTERVAL_TIME);

			$("#touchSlider_academy_professor").next().next().find(".btn_promo_page").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	
	// 아카데미 교수전용 배너
	$("#touchSlider_academy_professor_banner").touchSlider({
		speed : 250,
		flexible : true,
		btn_prev : $("#touchSlider_academy_professor_banner").next().find(".btn_promo_prev2"),
		btn_next : $("#touchSlider_academy_professor_banner").next().find(".btn_promo_next2"),
	});
	
});














//부가정보입력시 일반전화 숫자 체크 
function CheckPass_num(obj){			
	var reg = /^\d+$/;					
	obj_val_result =  reg.test($("#"+obj).val());				
	if(obj_val_result == false){
		alert("숫자만 입력할수 있습니다.");
		$("#"+obj).val('');
		$("#"+obj).focus();			
	}
}