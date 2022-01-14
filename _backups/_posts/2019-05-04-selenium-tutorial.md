---
title : selenium 내용정리
last_modified_at: 2019-05-04T10:45:06-05:00
header:
  overlay_image: /assets/images/code/python.jpg
categories:
  - python
tags: 
    - python
    - crawling
toc: true 
---

python 에서 **Selenium** 의 최근 경향은 Chrome 브라우저를 headless 로 사용하는 방법을 추천하고 있습니다. 이에대해 사용하는 방법을 정리해 보겠습니다.

# Install Selenium & Chromdriver

## chromium

기본 **chrome** 이 아닌 **chromium** 드라이버를 활용한 selenium 작동을 구현해 봅니다. 현재 서버로 동작중인 **ARM** 프로세서의 경우 설치와 운영을 위해 앞에서 **requests-html** 의 활용을 위한 **chromium** 을 설치 했었습니다.

```php
$ sudo apt install chromium-browser chromium-codecs-ffmpeg
$ sudo apt-get install chromium-chromedriver
```

설치된 모듈의 내용과 버젼을 확인 합니다

```php
root :: ~ » dpkg -l | grep chromium  
chromium-browser  73.0.3683.86-0ubuntu0.16.04.1  armhf Chromium web browser
chromium-browser-l10n  73.0.3683.86-0ubuntu0.16.04.1  chromium-browser language packages
chromium-chromedriver  73.0.3683.86-0ubuntu0.16.04.1  armhf  WebDriver driver
chromium-codecs-ffmpeg  73.0.3683.86-0ubuntu0.16.04.1  armhf  Free ffmpeg codecs
```

실행시 [의존성 문제가](https://cinnamonapple.tistory.com/18) 생길 수 있으므로 다음의 모듈들을 추가로 설치합니다.

```php
$ sudo apt-get install xvfb
$ pip3 install xvfbwrapper
```

라즈베리파이 [블로그](https://notejb.blogspot.com/2019/01/blog-post_2.html) 들은,  우분투 14용  **chromium 65** 를 사용하도록 설명되어 있는데, 2019-05 의존성 문제로 설치가 제대로 되지 않습니다. github 에서 검색한 결과 [gitIssue](https://github.com/heroku/heroku-buildpack-google-chrome/issues/46) 위 설치한 브라우저의 cromium driver 를 활용하여 **headless** 설정을 추가하면 잘 작동 되었습니다. [참고내용](https://github.com/timgrossmann/InstaPy/issues/4033)

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')  # Last I checked this was necessary.
driver = webdriver.Chrome(executable_path='/usr/lib/chromium-browser/chromedriver', options=options)
```

## firefox

64비트 환경에서는 기본 설치된 firefox를 활용해도 잘 작동됩니다. 대신 해당 Pop-up 이 다음의 내용 중 어떤것에 해당하는 지를 확인해서 적용합니다.

```python
# adapted from http://stackoverflow.com/a/25251803
from selenium import webdriver
profile = webdriver.FirefoxProfile()
mime_types = [
    'text/plain',
    'text/vcard',
    'application/vnd.ms-excel', 
    'text/csv', 
    'application/csv', 
    'text/comma-separated-values', 
    'application/download', 
    'application/octet-stream', 
    'binary/octet-stream', 
    'application/binary', 
    'application/x-unknown',
    'application/x-msdownload',
]
profile.set_preference("browser.helperApps.neverAsk.saveToDisk", ",".join(mime_types))

from selenium.webdriver.firefox.options import Options
options = Options()
options.headless = True
browser = webdriver.Firefox(firefox_profile=profile, options=options)
browser.get("http://www.daum.net")
browser.find_element_by_xpath('//a[@title="javascript"]').click()
browser.implicitly_wait(3)
```


<br/>
# **파이썬 웹 크롤러 내용 간단정리**
정보문화사 2018 1

# **Requests**
예외처리

```python
# 예외처리
import requests

url = "http://media.daum.net"
url = "media.daum.net"

try:
    rsp = requests.get(url)
except requests.exceptions.HTTPError:
    print("http 에러가 발생")
except requests.exceptions.Timeout:
    print("Tim Out 에러가 발생")
except requests.exceptions.MissingSchema:
    print("http, https 를 추가해 주세요")
```

    http, https 를 추가해 주세요


# **Selenium**
## **1 객체 접근하기**
가상 DOM 접근 및 다루기는 **개별 속성값 추출 함수** 로 제공됩니다
- find_element_by_**id** : id 추출은 1개만 수집합니다
- find_element(s)_by_**xpath/ link_text/ name/ partial_link_text/ tag_name/ css_selector/ class_name**
- 이들 중, **xapth, id, tag_name, class_name, css_selector** 만 알면 대부분 커버가 된다 <strike>어자피 이들이 모두 다 아닌감?</strike>

```html
<a href="/login/ext/help_ip3.html" target="_blank" 
 onclick="window.open(this.href, 'IPGUIDE', 'titlebar=1, 
    resizable=1, scrollbars=yes, width=537, height=750'); 
 return false;" title="">IP보안</a>
```

```python
from selenium import webdriver
url = 'https://nid.naver.com/nidlogin.login'

# 가상 브라우저를 활성화
driver = webdriver.PhantomJS()
driver.get(url)  # 특정 사이트에 접속
select_id = driver.find_element_by_id('id')
print("session정보 : \n{}\ntag 이름 : {}\ntetxt 내용 : {}".format(
    select_id,  select_id.tag_name, select_id.text))
```

    /home/markbaum/Python/django/lib/python3.6/site-packages/selenium/webdriver/phantomjs/webdriver.py:49: UserWarning: Selenium support for PhantomJS has been deprecated, please use headless versions of Chrome or Firefox instead
      warnings.warn('Selenium support for PhantomJS has been deprecated, please use headless '

    session정보 : 
    <selenium.webdriver.remote.webelement.WebElement (session="bbc79320-7211-11e9-aa4c-b3e3d1e27634", element=":wdc:1557375611045")>
    tag 이름 : input
    tetxt 내용 : 

```python
# 해당 페이지 소스보기로 Javascript는 랜더링 전의 내용을 출력합니다
driver.page_source[:500]
```
    '<!DOCTYPE html><html lang="ko"><head>\n\t<meta charset="UTF-8">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">\n\t<title>네이버 : 로그인</title>\n\t<link rel="stylesheet" type="text/css" href="/login/css/global/desktop/w_20181218.css?dt=20181218">\n</head>\n<body class="safari">\n<div class="theme_txt" id="theme_txt_message">\n\t<p><strong>안전한 네이버 로그인을 위해 주소창의 URL과 자물쇠 마크를 확인하세요'

- 아래 내용을 바로 실행시 다음의 오류가 자주 발생해서 예외처리로 안전성 강화
- PhantomJS 의 문제일 수도 있어서 이를 변경하면 보다 낳을 듯
- selenium 보다 pytetsser 로 바꾸는게 보다 좋을 듯

```json
NoSuchWindowException: Message: {"request":{"headers":{"Accept":"application/json",
"Accept-Encoding":"identity","Connection":"close","Content-Length":"96",
"Content-Type":"application/json;charset=UTF-8","Host":"127.0.0.1:58243",
"User-Agent":"Python http auth"},"httpVersion":"1.1","method":"POST",
"post":"{\"using\": \"partial link text\", \"value\": \"\",
         \"sessionId\": \"b7c7fe80-71fe-11e9-a445-f1910e072617\"}","url":"/element","urlParsed":{"anchor":"","query":"","file":"element","directory":"/",          "path":"/element","relative":"/element","port":"","host":"","password":"","user":"","userInfo":"",
         "authority":"","protocol":"","source":"/element","queryKey":{},"chunks":["element"]},
         "urlOriginal":"/session/b7c7fe80-71fe-11e9-a445-f1910e072617/element"}}
Screenshot: available via screen
```

```python
driver.set_window_size(1920,1080)
try:
    select_tag = driver.find_element_by_partial_link_text('javascript')
    print(select_tag)
except:
    driver.save_screenshot('screenshot.png')
```

```python
driver.set_window_size(1920,1080)
try:
    select_tag = driver.find_element_by_css_selector('span.ip_check')
except:
    driver.save_screenshot('screenshot.png')

print("Session : {}\n태그 포함내용 : {}".format(select_tag, select_tag.text))
```

    Session : <selenium.webdriver.remote.webelement.WebElement (session="bbc79320-7211-11e9-aa4c-b3e3d1e27634", element=":wdc:1557375611046")>
    태그 포함내용 : IP보안
    on

## **2 객체 다루기**
**웹의 제거** 가 주된 목으로 **마우스 클릭, 키보드 입력, javascript 추가** 등이 있습니다
- **.click() :** 마우스 클릭
- **.send_key() :** 키보드 내용 입력
- **.execute_script() :** 자바스크립트 내용 추가

```python
# 키보드 내용 입력하기
select_name = driver.find_element_by_id('id')
select_name.send_keys('myidname')
```

```python
# 특수키 입력
from selenium.webdriver.common.keys import Keys

select_pass = driver.find_element_by_id('pw')
select_pass.send_keys('myidname')
select_pass.send_keys(Keys.ENTER)
driver.save_screenshot('screenshot.png')
```

    True

```python
# 특정한 버튼 누르기
select_label = driver.find_element_by_css_selector("label.sp")
select_label.click()
driver.save_screenshot('screenshot.png')
```

    True

```python
# JavaScript 내용 추가하기
driver.execute_script('alert("python test")')
driver.save_screenshot('screenshot.png')
driver.close()
```

