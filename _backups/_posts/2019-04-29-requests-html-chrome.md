---
title : requests-html 에서 Chrome 연결
last_modified_at: 2019-04-29T12:45:06-05:00
header:
  overlay_image: /assets/images/code/server.jpg
categories:
  - python
tags: 
    - python
    - django
    - pythonanywhere
toc: true 
---

chrome 의 headless 를 실행하는 **pyppeteer** 모듈이 **ARM** 에서 지원 안하지만, **Chromium** 에서는 **ARM** 환경을 지원하고, 모듈에는 반영되어 있지 않아서, 사용자가 해당 내용 수정해야 합니다.

<br/>
# requests-html

자바스크립트로 랜더링 된 페이지를 크롤링 하기 위해, 주로 사용했던 도구가 selenium 입니다. 하지만 이는 렌더링 후 개별 설정들을 사용자가 지정해야 되는 것에 비해, **requests-html** 은 기본 설정만으로도 대부분의 작업이 가능한 장점이 있습니다. 그런데 이 작업을 **ARM** 환경에서 실행하다가 오류가 생겼고 이를 수정하는데 4시간이 걸렸습니다. 

## chrome & pyppeteer

이번 정리를 하면서 알게된 내용인데, 예전에는 head-less 브라우저로 PhantomJS 를 많이들 거론했었습니다. 그러다가 보다 가벼운 firefox 등을 활용하는 경우가 대부분인데, **Chrome** 을 활용한 **pyppeteer** 모듈이 작년부터 부상했습니다. [requests-html 과 pyppeteer 설명 예제](https://beenje.github.io/blog/posts/parsing-javascript-rendered-pages-in-python-with-pyppeteer/) 


## ARM CPU & Chrome

문제가 발생한건 **raspberry Pi** 와 같은 ARM 프로세서에서 chrome 브라우저가 호환의 문제가 일으키는 점에서 시작되었습니다. x86 에서는 기본 설정만으로도 제대로 작동이 되는데 반해, **ARM** 프로세서 에서는 별도의 설정 없이는 `[Errno 8] Exec format error: '/home/python/.local/share/pyppeteer/local-chromium/575458/chrome-linux/chrome` 과 같은 오류를 출력합니다.

## chromium

```php
$ sudo apt install chromium-browser chromium-codecs-ffmpeg
```
ARM 환경에서 크로미움 브라우저를 설치합니다. [GitIssue](https://github.com/GoogleChrome/puppeteer/issues/550) 그러면 해당 환경에 적합한 브라우저를 설치하고 해당 브라우저는 `/usr/bin/chromium-browser` 의 경로를 갖습니다. 위 오류와 다르죠? 

## pyppeteer

그럼 설정을 바꾸면 제대로 작동하는지 확인해 보겠습니다. 브라우저 설정값을 바꿔서 적용하니 제대로 결과가 출력됨을 알 수 있습니다. 이제 끝이냐구요? 설마.. 네! 이제 조금 더 복잡해 집니다. 하지만 원인과 내용을 알았으니 여기만 넘어가면 모든게 해결 됩니다.

```python
import asyncio
import pandas as pd
from pyppeteer import launch

async def main():
    browser = await launch(
        executablePath='/usr/bin/chromium-browser')
    page = await browser.newPage()
    await page.goto('http://results.neptron.se/#/lundaloppet2018/?sortOrder=Place&raceId=99&page=0&pageSize=25')
    await page.waitForSelector('td.res-startNo')
    table = await page.querySelectorEval('table', '(element) => element.outerHTML')
    await browser.close()
    return pd.read_html(table)[0]

  df = asyncio.get_event_loop().run_until_complete(main())
  df
```

## requests-html

아래의 오류내용을 살펴보니 `requests_html.py` 파일에서 `pyppeteer.launch()` 부분에 위에서 찾은 내용을 입력만 하면 됩니다.  [라즈베리파이에서 오류시](https://teratail.com/questions/166849)

```python
~/python/django/lib/python3.6/site-packages/requests_html.py in browser(self)
    712     async def browser(self):
    713         if not hasattr(self, "_browser"):
--> 714             self._browser = await pyppeteer.launch(
    ignoreHTTPSErrors=not(self.verify), headless=True, args=self.__browser_args)
    715 
    716         return self._browser

~/python/django/lib/python3.6/site-packages/pyppeteer/launcher.py in launch(options, **kwargs)
    309         option with extreme caution.
    310     """
--> 311     return await Launcher(options, **kwargs).launch()
```

위에서 해당 내용이 포함된 부분을 찾았습니다. 그러면 [GitHub](https://github.com/kennethreitz/requests-html/blob/afa7eb5d53ceb87cc988f70c11320a6d67659db1/requests_html.py) 에서 해당 소스코드 전체를 살펴 보겠습니다. `HTMLSession()` 에서 상속받는 `BaseSession()` 에 해당 오류의 원인이 존재합니다. 

```python
class BaseSession(requests.Session):

    @property
    async def browser(self):
        if not hasattr(self, "_browser"):
            self._browser = await pyppeteer.launch(
                ignoreHTTPSErrors=not(self.verify)..)

    return self._browser


class HTMLSession(BaseSession):

    def __init__(self, **kwargs):
        super(HTMLSession, self).__init__(**kwargs)
```

오류가 발생한 파일을 찾아서 내용을 수정합니다. 위에서 본대로 `~/python/django/lib/python3.6/site-packages/requests_html.py` 의 파일을 찾아서 연 뒤  다음과 같이 수정 합니다.이를 작업하고 나면 **ARM** 환경에서도 **requests-html** 이 제대로 작동됨을 확인할 수 있습니다.

```python
    @property
    async def browser(self):
        if not hasattr(self, "_browser"):
            self._browser = await pyppeteer.launch(
                executablePath='/usr/bin/chromium-browser', 
                ignoreHTTPSErrors=not(self.verify), 
                headless=True, args=self.__browser_args)
        return self._browser
```
