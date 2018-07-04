---
title : 웹표준 Html 5 
last_modified_at: 2018-07-03T10:45:06-05:00
header:
  overlay_image: /assets/images/book/html.jpg
categories:
  - 
tags: 
    - html
toc: true 
---

<br>
# 웹표준을 위한 HTML5 with CSS JS

<br>
스타일 선언 방법으로는 **link**(외부연결), **embedding**(HTML 내부에 직접입력), **inline**(태그에 직접입력) 3가지가 있다 

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

**\<ul\>**