/***********************************************************************************
  Global Javascript Engine by Coffin
************************************************************************************/
/***********************************************************************************
  정해진 숫자만큼 문자(영숫자)를 입력하면 자동으로 다음 필드로 포커스 이동
  입력 항목 
            - thisTab : 작업중인 필드 객체
            - nextTab: 다음 포커스 대상
            - thisTabSize: 작업중인 입력필드의 size 값
   관련 이벤트 : onKeyUp          
***********************************************************************************/
function tabOrder(thisTab,nextTab, thisTabSize) {
  if((event.keyCode == 37) ||  // ← key
     (event.keyCode == 38) ||  // ↑ key
     (event.keyCode == 39) ||  // → key
     (event.keyCode == 40) ||  // ↓ key
     (event.keyCode == 35) ||  // HOME key
     (event.keyCode == 36) ||  // END key
     (event.keyCode == 13) ||  // Enter key
     (event.keyCode == 229) || // mouse double click
     (window.document.selection.createRange().text.length == thisTabSize)) { 
    return;
  } 
  if (thisTab.value.length == thisTabSize) {
    nextTab.select();
    nextTab.focus();
    return;
  }
}

/***********************************************************************************
  입력필드에 숫자만 입력받을수 있도록 제어
***********************************************************************************/
function isNumber(){
  
  if ( (event.keyCode == 46) ||  // DEL
       (event.keyCode == 8)  ||  // backspace
       (event.keyCode == 9)  ||  // tab
       (event.keyCode == 37) ||  // ← key
       (event.keyCode == 38) ||  // ↑ key
       (event.keyCode == 39) ||  // → key
       (event.keyCode == 40) ||  // ↓ key
       (event.keyCode == 35) ||  // HOME key
       (event.keyCode == 36) ||  // END key
       (event.keyCode == 13) ||  // Enter key       
       ((event.keyCode >= 48) && (event.keyCode <= 57 )) || // 0 ~ 9
       ((event.keyCode >= 96) && (event.keyCode <= 105 ))||   // 0 ~ 9 in 숫자패드
		 !isNaN(String.fromCharCode(event.keyCode))
     )
  {

		event.returnValue=true;
 
  }
  else{
		event.returnValue=false;
  }
}

function isNumber2(formName, fieldName, fieldAlt)
{
	var form = eval(formName + "." + fieldName);

	if ( !(/^\d+$/.test(form.value)) )
	{
		alert(fieldAlt + "을 숫자로 입력하세요");
		form.value = "1";
		form.focus();
		return false;
	}
	else
	{
		if (parseInt(form.value) <= 0 )
		{
			alert(fieldAlt + "은 0 보다 커야합니다.");
			form.value = "1";
			form.focus();
			return false;
		}
		else
		{
			form.value = parseInt(form.value);
		}
	}
}


function isNumeric(s) {
	for (i=0; i<s.length; i++) {
		c = s.substr(i, 1);
		if (c < "0" || c > "9") return false;
	}
	return true;
}

/***************************************************************************
   Input type="Text"를 돈에 관련된 내용으로 사용
   돈에 '100,000'과 같이 ','을 추가 시켜준다.
  
   Event Handlers : onBlur  
   관련 함수 : removeFormattedMoney(), isNumber(), util.js::reverse()
   사용 방법 : onBlur="formattedMoney(this)"
***************************************************************************/
function formattedMoney(v) {
  var format = "";
  var a=removeFormat(v.toString(),',');
  a = parseInt10(a);
  var money =a.toString();

  money = reverse(money);
  
  for(var i = money.length-1; i > -1; i--) {
    if((i+1)%3 == 0 && money.length-1 != i) format += ",";
    format += money.charAt(i);
  }
  return format;
}


/**************************************************************************
   String을 꺼꾸로 만들어 준다.
**************************************************************************/
function reverse(s) {
  var rev = "";
  
  for(var i = s.length-1; i >= 0 ; i--) {
    rev += s.charAt(i);
  }
  
  return rev;
}

/*********************************************************************
    INPUT elements의 NULL여부 체크
**********************************************************************/
function isNull(form_field, msg)
{
  if ( form_field.type == "text" || form_field.type == "textarea" || form_field.type =="password")  {
    if ( (form_field.value == "") || (form_field.value == null) )  {
      alert('[' + msg + ']를(을) 입력하시기 바랍니다.');
      form_field.focus();
      return true;
    }
  }
  else if ( form_field.type == "select-one" ) {
    if ( form_field.selectedIndex == 0 ) {
      alert('[' + msg + ']를(을) 선택하시기 바랍니다!');
      return true;
    }
  }
  else if ( form_field[0].type == "radio" )  {
    var cn = 0;
    var r_cn = 0;

    for(var k=0; k<(document.forms.length); k++)  {
      for(var l=0; l<(document.forms[k].length); l++)  {
        if ( document.forms[k].elements[l].name == form_field[0].name )
        r_cn++;
      }
    }

    for(var n=0; n < r_cn; n++)   {
      if ( form_field[n].checked )
      cn++;
    }
    if ( cn == 0 )  {
      alert('[' + msg + ']를(을) 선택하시기 바랍니다!');
      return true;
    }
  }
  else
  {}

  return false;
}


/*************post 방식으로 Submit해주는 method****************/
function submit(form, target, action) {
  eval(form).method = "post";
  eval(form).action = action;
  eval(form).target = target;
  eval(form).submit();
}



/*************************************************************************
  새로운 윈도우를 만들어 준다.

  파라메터 : 링크정보, 윈도우이, 윈도우 높이
*************************************************************************/
function centerNewWin(url, winName, width, height) {
  var wi = screen.width - width;
  var hi = screen.height - height;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
  var info = 'left=' + (wi/2) + ',top=' + (hi/2) + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=yes,menubars=no,status=yes';
  var newwin = window.open(url, winName, info);
  newwin.focus();
  return newwin;
}  

function centerNewWin2(url, winName, width, height) {
  var wi = screen.width - width;
  var hi = screen.height - height;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
  var info = 'left=' + (wi/2) + ',top=' + (hi/2) + ',width='  + width + ',height=' + height + ',resizable=no,scrollbars=yes,menubars=no,status=no';
  var newwin = window.open(url, winName, info);
  newwin.focus();
  return newwin;
}  

function centerNewWin3(url, winName, width, height) {
  var wi = screen.width - width;
  var hi = screen.height - height;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
  var info = 'left=' + (wi/2) + ',top=' + (hi/2) + ',width='  + width + ',height=' + height + ',resizable=no,scrollbars=no,menubars=no,status=no';
  var newwin = window.open(url, winName, info);
  newwin.focus();
  return newwin;
}  

function centerNewWin4(url, winName) {
  var wi = screen.availwidth;
  var hi = screen.availheight;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
  var info = 'left=' + (wi/2) + ',top=' + (hi/2) + ',width='  + wi + ',height=' + hi + ',resizable=no,scrollbars=no,menubars=no,status=no';
  var newwin = window.open(url, winName, info);
  newwin.focus();
  return newwin;
}  

function openPreviewFlip(url, winName) {
  var wi = screen.availwidth;
  var hi = screen.availheight;
  var c = 0;
  var d = 0;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
	if (screen.width >= screen.height) {
	  if (screen.width <= 1024 || screen.height <= 768) {
      wi = screen.availWidth - 100;
      hi = screen.availHeight - 60;
      c = 50;
      d = 30;
    } else {
      wi = screen.availWidth - 200;
      hi = screen.availHeight - 160;
      c = 100;
      d = 30;
    }
  } else {
      wi = screen.availWidth - 60;
      hi = screen.availHeight - 160;
      c = 30;
      d = 50;
  }
  var info = 'left=' + c + ',top=' + d + ',width='  + wi + ',height=' + hi + ',resizable=no,scrollbars=no,menubars=no,status=no';
  var newwin = window.open(url, winName, info);
  newwin.focus();
  return newwin;
}


/*************************************************************************
  새로운 윈도우를 만들어 준다.

  파라메터 : 링크정보, 윈도우이름, 윈도우이, 윈도우 높이
*************************************************************************/ 
function rightNewWin(url,winName, width,height) {
  var wi = screen.width - width;
  var hi = 0;
  
  if( wi < 0 ) wi = 0;   
  if( hi < 0 ) hi = 0;
  
  var info = 'left=' + wi + ',top=' + hi + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=auto,menubars=no,status=no';
  var newwin = window.open(url, winName,info);
  newwin.focus();
  return newwin;
} 

/*************************************************************************
  새로운 윈도우를 만들어 준다.

  파라메터 : 링크정보, 윈도우이, 윈도우 높이
*************************************************************************/
function leftNewWin(url, winName, width, height) {
  var wi = 0;
  var hi = 0;
  
  var info = 'left=' + wi + ',top=' + hi + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=auto,menubars=no,status=no';
  var newwin = window.open(url,winName,info);
  newwin.focus();
  return newwin;
}

function leftNewWin1(url, winName, width, height) {
  var wi = 0;
  var hi = 0;
  
  var info = 'left=' + wi + ',top=' + hi + ',width='  + width + ',height=' + height + ',resizable=yes,scrollbars=yes,menubars=yes,status=no';
  var newwin = window.open(url,winName,info);
  newwin.focus();
  return newwin;
}


/*************************************************************************
   형식화된 내용의 심볼들을 없애고 원래의 내용만을 보여준다.
   
   ex)
   var str = "31,000";
   var res = removeFormat(str, ",");
   
   result : res -> 31000
*************************************************************************/
function removeFormat(content, sep) {
  var real = "";
  var contents = content.split(sep);
  
  for(var i = 0; i < contents.length; i++) {
    real += contents[i];
  }
  
  return real;
}

function parseInt10(data){
	return parseInt(data, 10);
}


/***************************************************************************
  주민번호 체크
  입력항목: 
           preNoRes : 주민번호앞 6자리 필드
           postNoRes:주민번호뒤7자리필드
***************************************************************************/
function checkNoRes(preNoRes, postNoRes){
  if (preNoRes.value.length != 6){
    alert("올바른 주민등록번호를 입력해주세요.");
    preNoRes.focus();
    return false;
  }
  else if (postNoRes.value.length != 7){
    alert("올바른 주민등록번호를 입력해주세요.");
    postNoRes.focus();
    return false;
  }
  else {
    var str_serial1 = preNoRes.value;
    var str_serial2 = postNoRes.value;

    var digit=0
    for (var i=0;i<str_serial1.length;i++){
      var str_dig=str_serial1.substring(i,i+1);
      if (str_dig<'0' || str_dig>'9'){ 
          digit=digit+1 
      }
    }

    if ((str_serial1 == '') || ( digit != 0 )){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      preNoRes.focus();
      return false;   
    }

    var digit1=0
    for (var i=0;i<str_serial2.length;i++){
      var str_dig1=str_serial2.substring(i,i+1);
      if (str_dig1<'0' || str_dig1>'9'){ 
          digit1=digit1+1 
      }
    }

    if ((str_serial2 == '') || ( digit1 != 0 )){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      postNoRes.focus();
      return false;   
    }

    if (str_serial1.substring(2,3) > 1){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      preNoRes.focus();
      return false;   
    }

    if (str_serial1.substring(4,5) > 3){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      preNoRes.focus();
      return false;   
    } 

    if (str_serial2.substring(0,1) > 4 || str_serial2.substring(0,1) == 0){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      postNoRes.focus();
      return false;   
    }

    var a1=str_serial1.substring(0,1)
    var a2=str_serial1.substring(1,2)
    var a3=str_serial1.substring(2,3)
    var a4=str_serial1.substring(3,4)
    var a5=str_serial1.substring(4,5)
    var a6=str_serial1.substring(5,6)
    
    var check_digit=a1*2+a2*3+a3*4+a4*5+a5*6+a6*7

    var b1=str_serial2.substring(0,1)
    var b2=str_serial2.substring(1,2)
    var b3=str_serial2.substring(2,3)
    var b4=str_serial2.substring(3,4)
    var b5=str_serial2.substring(4,5)
    var b6=str_serial2.substring(5,6)
    var b7=str_serial2.substring(6,7)
    
    var check_digit=check_digit+b1*8+b2*9+b3*2+b4*3+b5*4+b6*5 
    
    check_digit = check_digit%11
    check_digit = 11 - check_digit
    check_digit = check_digit%10

    if (check_digit != b7){
      alert('잘못된 주민등록번호입니다.\n\n다시 확인하시고 입력해 주세요.');
      postNoRes.focus();
      return false;   
    }
  }
  return true;
}


/***************************************************************************
  년/월/일을 입력하면 나이를 리턴해준다.
***************************************************************************/
function returnAge(yy, mm, dd) {

	days = new Date();
	gdate = days.getDate();
	gmonth = days.getMonth();
	gyear = days.getYear();
	age = gyear - yy;
	if((mm == (gmonth + 1)) && (dd <= parseInt(gdate))) {
		age = age;
	}
	else {
		if(mm <= (gmonth)) {
			age = age;
		}
		else {
			age = age - 1; 
		}
	}
	if(age == 0)
		age = age;
		
	return age;
}


/***************************************************************************
  Modal로 띄어지는 다이얼로그창을 생성한다.
***************************************************************************/
window.hasModal = false;
var modal = null;

function doModal(url, windowStyle)
{
    window.hasModal = true;
    
    var returnValue = showModalDialog(url, window, windowStyle);
    
    window.hasModal = false;
    return returnValue;
}

//날짜 유효성체크
function CheckDateFields(formName, fields)
{
	var objForm = document.forms[formName];
	
	var yy = objForm[fields[1]].value;
	var mm = objForm[fields[2]].value;
	var dd = objForm[fields[3]].value;
		
	if(!IsValidDate(yy+mm+dd))
	{
		alert(fields[0] + "의 날자입력이 잘못되었습니다");
		objForm[fields[1]].focus();
		return false;
	}

	
	return true;
}
	
function IsValidDate(date)
{
	var year, month, day;

	if(date.length<8) return false;
	if(isNaN(date)) return false;
	if(date.length<8) return false;

	year	= date.substring(0,4);
	month	= date.substring(4,6);
	day		= date.substring(6);

	if(month==0 || month>12) return false;

	if(day==0 || day>GetDaysInMonth(year, month)) return false;

	return true;
}


function GetDaysInMonth(year,month)  {
   var days;
   if (month==1 || month==3 || month==5 || month==7 || month==8 ||
	  month==10 || month==12)  days=31;
   else if (month==4 || month==6 || month==9 || month==11) days=30;
   else if (month==2)  {
	  if (LeapYear (year)==1)  days=29;
	  else days=28;
   }
   return (days);
}

function LeapYear (Year) {
		if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0))
				return (1);
		else
				return (0);
}
    
//다음 INPUT박스로 포커스 이동
function moveFocus(num,fromform,toform){
	var str = fromform.value.length;
	if(str == num)
		 toform.focus();
}


function checkEmail(invalue){
	var retval = true;

	// 요런 문자가 들어있으면 안되죠~

	if (invalue.indexOf("/") >= 0)   retval = false;
	if (invalue.indexOf(".@") >= 0)  retval = false;
	if (invalue.indexOf("@.") >= 0)  retval = false;
	if (invalue.indexOf("@@") >= 0)  retval = false;
	if (invalue.indexOf(",") >= 0)   retval = false;
	if (invalue.indexOf(" ") >= 0)   retval = false;
	if (invalue.indexOf("http:") >= 0)   retval = false;
	  
	// 요런 문자가 안 들어있으면 안되죠~
	if (invalue.indexOf("@") == -1)   retval = false;
	if (invalue.indexOf(".") == -1)   retval = false;
	    
	// 요런 문자가 처음 나오면 안되죠~

	if (invalue.indexOf("@") == 0)    retval = false;
	if (invalue.indexOf(".") == 0)    retval = false;
	    
	// 요런 문자가 마지막에 나오면 안되죠~
	if (invalue.charAt(invalue.length-1) == ".")   retval = false;

	return retval;     
}

/***************************************************************************
  목록보기 처리(리뷰 등) 
***************************************************************************/
var z=1
function list(i){
  if(document.getElementById("list"+i).style.display==""){
    document.getElementById("list"+i).style.display="none"
      z=1
  } else{
    document.getElementById("list"+z).style.display="none";
    document.getElementById("list"+i).style.display="";
    z=i
  }
}


/***************************************************************************
  삭제확인
***************************************************************************/
function confirmDelete($href)
{
  if(confirm("정말 삭제하시겠습니까?")){
    document.location.href = $href;
  }
}

/***************************************************************************
  png 파일 투명하게 처리
  home.css의 .png24 참조
***************************************************************************/
function setPng24(obj)
{
  obj.width=obj.height=1; 
  obj.className=obj.className.replace(/\bpng24\b/i,''); 
  obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');" 
  obj.src='';  
  return ''; 
}

function copyUrl(url){
  //if(isIE) {
    window.clipboardData.setData('Text',url);
    window.alert("엮인글 주소가 복사되었습니다.");
  //}
}
