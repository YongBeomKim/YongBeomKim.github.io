---
title : 웹표준 Html - FORM
last_modified_at: 2018-07-03T10:45:06-05:00
header:
  overlay_image: /assets/images/book/html.jpg
categories:
  - html
tags: 
    - html
toc: true 
---

<br>
# 웹표준을 위한 HTML5 with CSS JS


<br>
## Style 의 선언
<br>
스타일 선언 방법으로는 
1. **link**(외부연결)
2. **embedding**(HTML 내부에 직접입력)
3. **inline**(태그에 직접입력) 3가지가 있다 


### link

```html
<link rel="stylesheet" type="text/css" href="css/style.css">
```

### embedding 외부파일 연결 / 직접입력

```html
<style type="text/css">
  @import url("csstyle.css");
</style>

<style type="text/css">
  #연결id {
    속성명 : 속성값;
  }
</style>
```

### inline 

```html
<a href="" style="속성명:속성값; 속성명:속성값;">
```

<br>
## Table 

**\<ul\>** : 순서가 없는 목록 UnOrdered List<br>
**\<ol\>** : 순서가 있는 목록 Ordered List<br>
**\<dl\>** : 정의 목록 Definition List


<br>
## 여백의 설정

1. **Padding** : content 내부충전 여백
2. **Border** : content 외부 여백 
3. **margin** : 가장자리 의미로, 객체 밖 여백

.
<br>
## Html FORM 

Django 에서 **Form** 객체를 다양하게 다루는 방법이 있지만, 객관적인 개념 및 용도를 잘 몰라서 우왕 좌왕 한 측면이 적지않았다. 이번기회에 기본이 되는 **HTML** 에서의 **Form**객체의 기능과 버튼 들을 잘 정리해 보도록 하자.

<br>
## BOX Form

<br>
### 입력상자

1. **input** : **입력상자로 type='password'는 노출하지 않는다
2. **label** : label은 **input 이름표**로 'for 클래스'는 **input 'id'**로 연결
3.  **submit** 버튼 : 버튼을 누르면 **action="http://media.daum.net" ** 으로 이동

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form id="frm" name="frm" action="http://media.daum.net">
    <label for="userid">아이디 : </label>
    <input type="text" id="userid" name="userid">
    <label for="userpwd">암호 : </label>
    <input type="password" id="userpwd" name="userpwd">
    <input type="submit" value="로그인">
    <input type="reset"  value="최소">
</form>
</body>
</html>

<br>

```html
<form id="frm" name="frm" action="http://media.daum.net">
    <label for="userid">아이디 : </label>
    <input type="text" id="userid" name="userid">

    <label for="userpwd">암호 : </label>
    <input type="password" id="userpwd" name="userpwd">

    <input type="submit" value="로그인">
    <input type="reset"  value="최소">
</form>
```



<br><br>
### 글상자

1. row="12" cols="70" 로 크기를 정의한다
2. name="content" 텍스트 영역을 구분 -->

<br>

```html
<h3> 가입인사 </h3><br>
<form>
    <textarea id="content" name="content" row="12" cols="70">
    가입인사를 간단하게 입력하세요</textarea>

    <input type="submit" value="전송">
</form>
```

<br>
### 글상자

1. 체크박스 : input type="checkbox" 원하는 내용 선택
2. checked 속성 값이 true/ false 로 구분하여 출력

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form id="frm">
    <input type="checkbox" name="interest" value='생두'>생두
    <input type="checkbox" name="interest" value='원두'>원두
    <input type="checkbox" name="interest" value='로스팅'>로스팅
    <input type="checkbox" name="interest" value='핸드드립'>핸드드립
    <br>
    <input type="submit" value="전송">
</form>
</body>
</html>

<br>

```html
<form>
    <input type="checkbox" name="interest" value='생두'>생두
    <input type="checkbox" name="interest" value='원두'>원두
    <input type="checkbox" name="interest" value='로스팅'>로스팅
    <input type="checkbox" name="interest" value='핸드드립'>핸드드립
    <br>
    <input type="submit" value="전송">
</form>
```

<br>
### 라디오 버튼 : 배타적으로 1개만 선택

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form id="frm">
    <label for="gender"> 성별 : </label>
    <input type="radio" id="gender" name="gender" value="남자" checked="">남자
    <input type="radio" id="gender" name="gender" value="여자">여자
    <br><br>
    <label for="chk_mail"> 메일 정보 수신 여부 : </label>
    <input type="radio" id="chk_mail" name="chk_mail" value="yes" checked="">수신
    <input type="radio" id="chk_mail" name="chk_mail" value="no"> 거부
</form>
</body>
</html>

<br>

```html
<form id="frm">
    <label for="gender"> 성별 : </label>
    <input type="radio" id="gender" name="gender" value="남자" checked="">남자
    <input type="radio" id="gender" name="gender" value="여자">여자

    <label for="chk_mail"> 메일 정보 수신 여부 : </label>
    <input type="radio" id="chk_mail" name="chk_mail" value="yes" checked="">수신
    <input type="radio" id="chk_mail" name="chk_mail" value="no"> 거부
    <div class="clear"></div>

    <input type="submit" value="전송">
    <input type="reset" value="취소">
</form>
```


<br>
### 목록상자 

1. multiple="multiple" : 다중선택 가능

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<select name="job" size="1">
    <option value="#">선택하세요</option>
    <option value="학생">학생</option>
    <option value="컴퓨터">컴퓨터</option>
    <option value="언론">언론</option>
</select>
</body>
</html>

<br>

```html
<select name="job" size="1">
    <option value="#">선택하세요</option>
    <option value="학생">학생</option>
    <option value="컴퓨터">컴퓨터</option>
    <option value="언론">언론</option>
</select>
```

<br>
### 파일 업로드 버튼

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form>
    <label for="filename">업로드 파일 이름을 선택하세요</label>
    <div class="clear"></div>
    <br><br>
    <input type="file" id="filename" name="filename">
</form>
</body>
</html>

<br>

```html
<form>
    <label for="filename">업로드 파일 이름을 선택하세요</label>
    <div class="clear"></div>
    <br><br>
    <input type="file" id="filename" name="filename">
</form>
```

<br>
### 입력양식 종합예제

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form id="frm">
    <label for="usermail">이메일 :</label>
    <input type="email"  id="usermail"  name="usermail"><br>
    <label for="homepage">홈페이지 주소 :</label>
    <input type="url"    id="homepage"  name="homepage"><br>
    <label for="newsearch">검색 :</label>
    <input type="search" id="newsearch" name="newsearch">
    <input type="submit" value="전송"/>
</form>
</body>
</html>

<br>

```html
<form id="frm">
    <label for="usermail">이메일 :</label>
    <input type="email"  id="usermail"  name="usermail">

    <label for="homepage">홈페이지 주소 :</label>
    <input type="url"    id="homepage"  name="homepage">

    <label for="newsearch">검색 :</label>
    <input type="search" id="newsearch" name="newsearch">

    <input type="submit" value="전송"/>
</form>
```


<br>
### 입력버튼 예제

1. \<label for="newnumber"\> 숫자 중 선택
2. \<label for="newrange"\> 범위 바 선택

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form id="frm">
    <label for="newnumber"> 숫자 : </label>
    <input type="number" id="newnumber" name="newnumber" 
        value="0" min="0" max="100" step="1">
    <label for="newrange"> 범위 : </label>
    <input type="range" id="newrange" name="newnumber" 
        value="0" min="0" max="100" step="1">
    <input type="submit" value="전송">
</form></body>
</html>

<br>

```html
<form id="frm">
    <label for="newnumber"> 숫자 : </label>
    <input type="number" id="newnumber" name="newnumber" 
        value="0" min="0" max="100" step="1">

    <label for="newrange"> 범위 : </label>
    <input type="range" id="newrange" name="newnumber" 
        value="0" min="0" max="100" step="1">

    <input type="submit" value="전송">
</form>
```

<br>
### 날짜 예제

[참고 사이트](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<input type="date" id="start" name="trip"
    value="2017-07-22" 
    min="2017-01-01" max="2018-12-31"/></body>
</html>

<br>

```html
<input type="date" id="start" name="trip"
    value="2017-07-22" 
    min="2017-01-01" max="2018-12-31"/>
```

<br>
### 색상 입력양식

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<label for="start">Choose Color : </label>
    <input type="color" id="newcolor"/>
</body>
</html>

<br>

```html
<label for="start">Choose Color : </label>
    <input type="color" id="newcolor"/>
```

<br>
### 날짜와 색상선택 예제

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form id="frm">
    <label for="newdate"> 날짜 : </label>
    <input type="date" id="newdate" name="newdate"
        min="2012-09-01" max="2012-12-31" value="2012-10-22">
    <label for="newcolor"> color : </label>
    <br>
    <input type="color" id="newcolor" na accept="" me="newcolor">
    <div class="clear"></div>
    <br>
    <input type="submit" value="전송"/>
</form>
</body>
</html>

<br>

```html
<form id="frm">
    <label for="newdate"> 날짜 : </label>
    <input type="date" id="newdate" name="newdate"
        min="2012-09-01" max="2012-12-31" value="2012-10-22">
    <label for="newcolor"> color : </label>

    <input type="color" id="newcolor" name="newcolor">
    <div class="clear"></div>

    <input type="submit" value="전송"/>
</form>
```

<br>
### 검색창 만들기 예제

HTML 기본 속성클래스를 사용한 새로운 속성값 사용

<br>

<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
    content="width=device-width, initial-scale=1, 
    minimum-scale=1, maximum-scale=1, user-scalable=no">
    <title>html form style</title>
    <style type="text/css">
    label {
        display: block;
        float: left;
        width: 180px;
        text-align: right;
    }
    #frm {
        width: 480px;
        text-align: center;}
    </style>
</head>
<body>
<form id="frm">
    <label for="newsearch"> 검색 : </label>
    <input type="search" id="newsearch" name="newsearch" 
        placeholder="검색어를 입력하세요"/><br>
    <label for="userid"> 아이디(자동포커스) : </label>
    <input type="text" id="userid" name="userid" autofocus/><br>
    <label for="userpwd"> 암호 (빈값검사) : </label>
    <input type="password" id="userpwd" name="userpwd" required/><br>
    <label for="usertel"> 전화번호 (정규식)</label>
    <input type="tel" id="usertel" name="usertel" 
        pattern="(010|011)-\d{3,4}-\d{4}"/><br>
<input type="submit" value="전송">
</form>
</body>
</html>

<br>

```html
<form id="frm">
    <!-- 1) 힌트를 위한 placeholder -->
    <label for="newsearch"> 검색 : </label>
    <input type="search" id="newsearch" name="newsearch" 
        placeholder="검색어를 입력하세요"/>

    <!-- 2) 자동 포커싱 autofocus : 페이징 최우선 활성화-->
    <label for="userid"> 아이디(자동포커스) : </label>
    <input type="text" id="userid" name="userid" autofocus/>

    <!-- 3) 필수 입력을 위한 required -->
    <label for="userpwd"> 암호 (빈값검사) : </label>
    <input type="password" id="userpwd" name="userpwd" required/>

    <!-- 4) 정규식을 사용한 유효성 검사 -->
    <label for="usertel"> 전화번호 (정규식)</label>
    <input type="tel" id="usertel" name="usertel" 
        pattern="(010|011)-\d{3,4}-\d{4}"/>

<input type="submit" value="전송">
</form>
```