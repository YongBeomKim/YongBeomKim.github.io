---
title : Beautiful Soup Tutorial 한글
last_modified_at: 2019-08-03T10:45:06-05:00
header:
  overlay_image: /assets/images/photo/facebook-office.jpg
categories:
  - python  
tags: 
    - python
    - crawling
    - bs4
---

문서의 원본 내용을 확인하기 위해선 [문서 원문 Site](https://web.archive.org/web/20150319200824/http://coreapython.hosting.paran.com/etc/beautifulsoup4.html) 를 참고하면 됩니다

<br></br>
# 뷰티플수프 문서 

[뷰티플수프 4.0.0 문서](http://www.crummy.com/software/BeautifulSoup/bs4/doc/#)

뷰티플수프는 HTML과 XML 파일로부터 데이터를 뽑아내기 위한 파이썬 라이브러리이다. 여러분이 선호하는 해석기와 함께 사용하여 일반적인 방식으로 해석 트리를 항해, 검색, 변경할 수 있다. 주로 프로그래머의 수고를 덜어준다.

이 지도서에서는 뷰티플수프 4의 중요한 특징들을 예제와 함께 모두 보여준다. 이 라이브러리가 어느 곳에 유용한지, 어떻게 작동하는지, 또 어떻게 사용하는지, 어떻게 원하는대로 바꿀 수 있는지, 예상을 빗나갔을 때 어떻게 해야 하는지를 보여준다.

이 문서의 예제들은 파이썬 2.7과 Python 3.2에서 똑 같이 작동한다.

혹시 뷰티플수프 3에 관한 문서를 찾고 계신다면 뷰티플수프 3는 더 이상 개발되지 않는다는 사실을 꼭 아셔야겠다. 새로 프로젝트를 시작한다면 뷰티플수프 4를 적극 추천한다. 뷰티플수프 3와 뷰티플수프 4의 차이점은 BS4 코드 이식하기를 참조하자.

## 도움 얻기

뷰피플수프에 의문이 있거나, 문제에 봉착하면 [토론그룹](https://web.archive.org/web/20150319200824/http://groups.google.com/group/beautifulsoup/) 에 메일을 보내자.


<br></br>
## 바로 시작

다음은 이 문서에서 예제로 사용할 HTML 문서이다. 이상한 나라의 앨리스 이야기의 일부이다

```python
html_doc = """
<html><head><title>The Dormouse's story</title></head>
<p class="title"><b>The Dormouse's story</b></p>
<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>
<p class="story">...</p>
"""
```

“three sisters” 문서를 뷰피플수프에 넣으면 BeautifulSoup 객체가 나오는데, 이 객체는 문서를 내포된 데이터 구조로 나타낸다.

```python
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc)
print(soup.prettify())

# <html>
#  <head>
#   <title>
#    ....
#   <p class="story"> ...... </p>
#  </body>
# </html>
```

다음은 간단하게 데이터 구조를 항해하는 몇 가지 방법이다

```python
soup.title
# <title>The Dormouse's story</title>

soup.title.name
# u'title'

soup.title.string
# u'The Dormouse's story'

soup.title.parent.name
# u'head'

soup.p
# <p class="title"><b>The Dormouse's story</b></p>

soup.p['class']
# u'title'

soup.a
# <a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>

soup.find_all('a')
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>,
#  <a class="sister" href="http://example.com/lacie" id="link2">Lacie</a>,
#  <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>]

soup.find(id="link3")
# <a class="sister" href="http://example.com/tillie" id="link3">Tillie</a>
```

일반적인 과업으로 한 페이지에서 <a> 태그에 존재하는 모든 URL을 뽑아 낼 일이 많다:

```python
for link in soup.find_all('a'):
    print(link.get('href'))
# http://example.com/elsie
# http://example.com/lacie
# http://example.com/tillie
```

또 다른 과업으로 페이지에서 텍스트를 모두 뽑아낼 일이 많다

```python
print(soup.get_text())
# The Dormouse's story
# The Dormouse's story
# Once upon a time there were three little sisters; and their names were
# Elsie,
# Lacie and
# Tillie;
# and they lived at the bottom of a well ...
```

<br></br>
## 뷰티플 수프 설치하기

데비안이나 우분투 리눅스 최신 버전을 사용중이라면, 시스템 꾸러미 관리자로 뷰티플수프를 설치하자:

```r
$ apt-get install python-bs4
```

뷰티블수프 4는 PyPi를 통하여도 출간되어 있으므로, 시스템 꾸러미 관리자로 설치할 수 없을 경우, easy_install로 설치하거나 pip로 설치할 수 있다. 꾸러미 이름은 beautifulsoup4이며, 같은 꾸러미로 파이썬 2 그리고 파이썬 3에 작동한다.

```r
$ easy_install beautifulsoup4
$ pip install beautifulsoup4
```

(이 BeautifulSoup 꾸러미가 혹시 원하는 것이 아니라면. 이전 버전으로 뷰티플수프 3가 있다. 많은 소프트웨에서 BS3를 사용하고 있으므로, 여전히 사용할 수 있다. 그러나 새로 코드를 작성할 생각이라면 beautifulsoup4를 설치하시기 바란다.)

easy_install도 pip도 설치되어 있지 않다면, 뷰티플수프 4 소스를 내려 받아 setup.py로 설치하실 수 있다.

```r
$ python setup.py install
```

다른 모든 것이 실패하더라도, 뷰티플수프 라이센스는 여러분의 어플리케이션에 통채로 꾸려 넣는 것을 허용하므로 전혀 설치할 필요없이 소스를 내려받아 bs4 디렉토리를 통채로 코드베이스에 복사해서 사용하셔도 된다.

본인은 파이썬 2.7과 파이썬 3.2에서 뷰티플수프를 개발하였지만, 다른 최신 버전에도 작동하리라 믿는 바이다.
설치 이후의 문제로 뷰티플 수프는 파이썬 2 코드로 꾸려 넣어져 있다. 파이썬 3에 사용하기 위해 설치하면, 파이썬 3 코드로 자동으로 변환된다. 꾸러미가 설치되어 있지 않다면, 당연히 변환되지 않는다. 또한 윈도우즈 머신이라면 잘못된 버전이 설치되어 있다고 보고된다.

“No module named HTMLParser”와 같은 ImportError 에러가 일어나면, 파이썬 3 아래에서 파이썬 2 버전의 코드를 실행하고 있기 때문이다.

“No module named html.parser”와 같은 ImportError 에러라면, 파이썬 3 버전의 코드를 파이썬 2 아래에서 실행하고 있기 때문이다.

두 경우 모두 최선의 선택은 시스템에서 (압축파일을 풀 때 만들어진 디렉토리를 모두 포함하여) 뷰티플수프를 제거하고 다시 설치하는 것이다.

다음 ROOT_TAG_NAME = u'[document]' 줄에서 SyntaxError “Invalid syntax”를 맞이한다면, 파이썬 2 코드를 파이썬 3 코드로 변환할 필요가 있다. 이렇게 하려면 다음과 같이 패키지를 설치하거나:

```r
$ python3 setup.py install
```

아니면 직접 파이썬의 2to3 변환 스크립트를 bs4 디렉토리에 실행하면 된다:

```
$ 2to3-3.2 -w bs4
```

## 해석기 설치하기

뷰티플수프는 파이썬 표준 라이브러리에 포함된 HTML 해석기를 지원하지만, 또 수 많은 제-삼자 파이썬 해석기도 지원한다. 그 중 하나는 lxml 해석기이다. 설정에 따라, 다음 명령어들 중 하나로 lxml을 설치하는 편이 좋을 경우가 있다:

```r
$ apt-get install python-lxml
$ easy_install lxml
$ pip install lxml
```

파이썬 2를 사용중이라면, 또다른 대안은 순수-파이썬 html5lib 해석기를 사용하는 것인데, 이 해석기는 HTML을 웹 브라우저가 해석하는 방식으로 해석한다. 설정에 따라 다음 명령어중 하나로 html5lib를 설치하는 것이 좋을 때가 있다:

$ apt-get install python-html5lib

$ easy_install html5lib

$ pip install html5lib

다음 표에 각 해석 라이브러리의 장점과 단점을 요약해 놓았다:


<body>
    <!-- BEGIN WAYBACK TOOLBAR INSERT -->
    <style type="text/css">
    body {
        margin-top: 0 !important;
        padding-top: 0 !important;
        /*min-width:800px !important;*/
    }
    .wb-autocomplete-suggestions {
        text-align: left;
        cursor: default;
        border: 1px solid #ccc;
        border-top: 0;
        background: #fff;
        box-shadow: -1px 1px 3px rgba(0, 0, 0, .1);
        position: absolute;
        display: none;
        z-index: 2147483647;
        max-height: 254px;
        overflow: hidden;
        overflow-y: auto;
        box-sizing: border-box;
    }
    .wb-autocomplete-suggestion {
        position: relative;
        padding: 0 .6em;
        line-height: 23px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.02em;
        color: #333;
    }
    .wb-autocomplete-suggestion b {
        font-weight: bold;
    }
    .wb-autocomplete-suggestion.selected {
        background: #f0f0f0;
    }
    </style>
    <div id="wm-ipp-base" lang="en" style="display:none;direction:ltr;">
        <div id="wm-ipp" style="position:fixed;left:0;top:0;right:0;">
            <div id="wm-ipp-inside">
                <div style="position:relative;">
                    <div id="wm-logo" style="float:left;width:130px;padding-top:10px;">
                        <a href="/web/" title="Wayback Machine home page"><img src="/_static/images/toolbar/wayback-toolbar-logo.png" alt="Wayback Machine" width="110" height="39" border="0" /></a>
                    </div>
                    <div class="r" style="float:right;">
                        <div id="wm-btns" style="text-align:right;height:25px;">
                            <div id="wm-save-snapshot-success">success</div>
                            <div id="wm-save-snapshot-fail">fail</div>
                            <a href="#" onclick="__wm.saveSnapshot('http://coreapython.hosting.paran.com/etc/beautifulsoup4.html', '20150319200824')" title="Share via My Web Archive" id="wm-save-snapshot-open">
                                <span class="iconochive-web"></span>
                            </a>
                            <a href="https://archive.org/account/login.php" title="Sign In" id="wm-sign-in">
                                <span class="iconochive-person"></span>
                            </a>
                            <span id="wm-save-snapshot-in-progress" class="iconochive-web"></span>
                            <a href="http://faq.web.archive.org/" title="Get some help using the Wayback Machine" style="top:-6px;"><span class="iconochive-question" style="color:rgb(87,186,244);font-size:160%;"></span></a>
                            <a id="wm-tb-close" href="#close" onclick="__wm.h(event);return false;" style="top:-2px;" title="Close the toolbar"><span class="iconochive-remove-circle" style="color:#888888;font-size:240%;"></span></a>
                        </div>
                        <div id="wm-share" style="text-align:right;">
                            <a href="#" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=https://web.archive.org/web/20150319200824/http://coreapython.hosting.paran.com:80/etc/beautifulsoup4.html', '', 'height=400,width=600'); return false;" title="Share on Facebook" style="margin-right:5px;" target="_blank"><span class="iconochive-facebook" style="color:#3b5998;font-size:160%;"></span></a>
                            <a href="#" onclick="window.open('https://twitter.com/intent/tweet?text=https://web.archive.org/web/20150319200824/http://coreapython.hosting.paran.com:80/etc/beautifulsoup4.html&amp;via=internetarchive', '', 'height=400,width=600'); return false;" title="Share on Twitter" style="margin-right:5px;" target="_blank"><span class="iconochive-twitter" style="color:#1dcaff;font-size:160%;"></span></a>
                        </div>
                    </div>
                    <table class="c" style="">
                        <tbody>
                            <tr>
                                <td class="u" colspan="2">
                                    <form target="_top" method="get" action="/web/submit" name="wmtb" id="wmtb"><input type="text" name="url" id="wmtbURL" value="http://coreapython.hosting.paran.com/etc/beautifulsoup4.html" onfocus="this.focus();this.select();" /><input type="hidden" name="type" value="replay" /><input type="hidden" name="date" value="20150319200824" /><input type="submit" value="Go" /></form>
                                </td>
                                <td class="n" rowspan="2" style="width:110px;">
                                    <table>
                                        <tbody>
                                            <!-- NEXT/PREV MONTH NAV AND MONTH INDICATOR -->
                                            <tr class="m">
                                                <td class="b" nowrap="nowrap"><a href="https://web.archive.org/web/20150213231333/http://coreapython.hosting.paran.com/etc/beautifulsoup4.html" title="13 Feb 2015"><strong>Feb</strong></a></td>
                                                <td class="c" id="displayMonthEl" title="You are here: 20:08:24 Mar 19, 2015">MAR</td>
                                                <td class="f" nowrap="nowrap"><a href="https://web.archive.org/web/20160322112544/http://coreapython.hosting.paran.com/etc/beautifulsoup4.html" title="22 Mar 2016"><strong>Mar</strong></a></td>
                                            </tr>
                                            <!-- NEXT/PREV CAPTURE NAV AND DAY OF MONTH INDICATOR -->
                                            <tr class="d">
                                                <td class="b" nowrap="nowrap"><a href="https://web.archive.org/web/20150213231333/http://coreapython.hosting.paran.com/etc/beautifulsoup4.html" title="23:13:33 Feb 13, 2015"><img src="/_static/images/toolbar/wm_tb_prv_on.png" alt="Previous capture" width="14" height="16" border="0" /></a></td>
                                                <td class="c" id="displayDayEl" style="width:34px;font-size:24px;white-space:nowrap;" title="You are here: 20:08:24 Mar 19, 2015">19</td>
                                                <td class="f" nowrap="nowrap"><a href="https://web.archive.org/web/20150406072620/http://coreapython.hosting.paran.com/etc/beautifulsoup4.html" title="07:26:20 Apr 06, 2015"><img src="/_static/images/toolbar/wm_tb_nxt_on.png" alt="Next capture" width="14" height="16" border="0" /></a></td>
                                            </tr>
                                            <!-- NEXT/PREV YEAR NAV AND YEAR INDICATOR -->
                                            <tr class="y">
                                                <td class="b" nowrap="nowrap"><a href="https://web.archive.org/web/20130903222729/http://coreapython.hosting.paran.com:80/etc/beautifulsoup4.html" title="03 Sep 2013"><strong>2013</strong></a></td>
                                                <td class="c" id="displayYearEl" title="You are here: 20:08:24 Mar 19, 2015">2015</td>
                                                <td class="f" nowrap="nowrap"><a href="https://web.archive.org/web/20160322112544/http://coreapython.hosting.paran.com/etc/beautifulsoup4.html" title="22 Mar 2016"><strong>2016</strong></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="s">
                                    <div id="wm-nav-captures">
                                        <a class="t" href="/web/20150319200824*/http://coreapython.hosting.paran.com/etc/beautifulsoup4.html" title="See a list of every capture for this URL">9 captures</a>
                                        <div class="r" title="Timespan for captures of this URL">03 Sep 2013 - 22 Mar 2016</div>
                                    </div>
                                </td>
                                <td class="k">
                                    <a href="" id="wm-graph-anchor">
                                        <div id="wm-ipp-sparkline" title="Explore captures for this URL" style="position: relative">
                                            <canvas id="wm-sparkline-canvas" width="600" height="27" border="0"></canvas>
                                        </div>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="position:absolute;bottom:0;right:2px;text-align:right;">
                        <a id="wm-expand" class="wm-btn wm-closed" href="#expand" onclick="__wm.ex(event);return false;"><span id="wm-expand-icon" class="iconochive-down-solid"></span> <span style="font-size:80%">About this capture</span></a>
                    </div>
                </div>
                <div id="wm-capinfo" style="border-top:1px solid #777;display:none; overflow: hidden">
                    <div style="background-color:#666;color:#fff;font-weight:bold;text-align:center">COLLECTED BY</div>
                    <div style="padding:3px;position:relative" id="wm-collected-by-content">
                        <div style="display:inline-block;vertical-align:top;width:50%;">
                            <span class="c-logo" style="background-image:url(https://archive.org/services/img/alexacrawls);"></span>
                            Organization: <a style="color:#33f;" href="https://archive.org/details/alexacrawls" target="_new"><span class="wm-title">Alexa Crawls</span></a>
                            <div style="max-height:75px;overflow:hidden;position:relative;">
                                <div style="position:absolute;top:0;left:0;width:100%;height:75px;background:linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 90%,rgba(255,255,255,255) 100%);"></div>
                                Starting in 1996, <a href="http://www.alexa.com/">Alexa Internet</a> has been donating their crawl data to the Internet Archive. Flowing in every day, these data are added to the <a href="http://web.archive.org/">Wayback Machine</a> after an embargo period.
                            </div>
                        </div>
                        <div style="display:inline-block;vertical-align:top;width:49%;">
                            <span class="c-logo" style="background-image:url(https://archive.org/services/img/alexacrawls)"></span>
                            <div>Collection: <a style="color:#33f;" href="https://archive.org/details/alexacrawls" target="_new"><span class="wm-title">Alexa Crawls</span></a></div>
                            <div style="max-height:75px;overflow:hidden;position:relative;">
                                <div style="position:absolute;top:0;left:0;width:100%;height:75px;background:linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0) 90%,rgba(255,255,255,255) 100%);"></div>
                                Starting in 1996, <a href="http://www.alexa.com/">Alexa Internet</a> has been donating their crawl data to the Internet Archive. Flowing in every day, these data are added to the <a href="http://web.archive.org/">Wayback Machine</a> after an embargo period.
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#666;color:#fff;font-weight:bold;text-align:center" title="Timestamps for the elements of this page">TIMESTAMPS</div>
                    <div>
                        <div id="wm-capresources" style="margin:0 5px 5px 5px;max-height:250px;overflow-y:scroll !important"></div>
                        <div id="wm-capresources-loading" style="text-align:left;margin:0 20px 5px 5px;display:none"><img src="/_static/images/loading.gif" alt="loading" /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
    __wm.bt(600, 27, 25, 2, "web", "http://coreapython.hosting.paran.com/etc/beautifulsoup4.html", "2015-03-19", 1996, "/_static/", ['css/banner-styles.css', 'css/iconochive.css']);
    </script>
    <!-- END WAYBACK TOOLBAR INSERT -->
    <div class="document">
        <div class="documentwrapper">
            <div class="bodywrapper">
                <div class="body">
                    <div class="section" id="beautiful-soup-documentation">
                        <h1>뷰티플수프 문서<a class="headerlink" href="#beautiful-soup-documentation" title="Permalink to this headline">¶</a></h1> 한글판 johnsonj 2012.11.08 <a href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs4/doc/index.html">원문 위치</a>
                        <img alt="&quot;The Fish-Footman began by producing from under his arm a great letter, nearly as large as himself.&quot;" class="align-right" src="/web/20150319200824im_/http://coreapython.hosting.paran.com/etc/index_files/6.jpg">
                        <p><a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/">뷰티플수프</a>는 HTML과 XML 파일로부터 데이터를 뽑아내기 위한 파이썬 라이브러리이다. 여러분이 선호하는 해석기와 함께 사용하여 일반적인 방식으로 해석 트리를 항해, 검색, 변경할 수 있다. 주로 프로그래머의 수고를 덜어준다.</p>
                        <p>이 지도서에서는 뷰티플수프 4의 중요한 특징들을 예제와 함께 모두 보여준다. 이 라이브러리가 어느 곳에 유용한지, 어떻게 작동하는지, 또 어떻게 사용하는지, 어떻게 원하는대로 바꿀 수 있는지, 예상을 빗나갔을 때 어떻게 해야 하는지를 보여준다.</p>
                        <p>이 문서의 예제들은 파이썬 2.7과 Python 3.2에서 똑 같이 작동한다.</p>
                        <p>혹시 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs3/documentation.html">뷰티플수프 3</a>에 관한 문서를 찾고 계신다면 뷰티플수프 3는 더 이상 개발되지 않는다는 사실을 꼭 아셔야겠다. 새로 프로젝트를 시작한다면 뷰티플수프 4를 적극 추천한다. 뷰티플수프 3와 뷰티플수프 4의 차이점은 <a class="reference internal" href="#porting-code-to-bs4">BS4 코드 이식하기</a>를 참조하자.</p>
                        <div class="section" id="getting-help">
                            <h2>도움 얻기<a class="headerlink" href="#getting-help" title="Permalink to this headline">¶</a></h2>
                            <p>뷰피플수프에 의문이 있거나, 문제에 봉착하면 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://groups.google.com/group/beautifulsoup/">토론 그룹에 메일을 보내자</a>.</p>
                        </div>
                    </div>
                    <div class="section" id="quick-start">
                        <h1>바로 시작<a class="headerlink" href="#quick-start" title="Permalink to this headline">¶</a></h1>
                        <p>다음은 이 문서에서 예제로 사용할 HTML 문서이다. <cite>이상한 나라의 앨리스</cite> 이야기의 일부이다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="n">html_doc</span> <span class="o">=</span> <span class="s">"""</span>
<span class="s">&lt;html&gt;&lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;</span>

<span class="s">&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;Once upon a time there were three little sisters; and their names were</span>
<span class="s">&lt;a href="http://example.com/elsie" class="sister" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="s">&lt;a href="http://example.com/lacie" class="sister" id="link2"&gt;Lacie&lt;/a&gt; and</span>
<span class="s">&lt;a href="http://example.com/tillie" class="sister" id="link3"&gt;Tillie&lt;/a&gt;;</span>
<span class="s">and they lived at the bottom of a well.&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;...&lt;/p&gt;</span>
<span class="s">"""</span>
</pre>
                            </div>
                        </div>
                        <p>“three sisters” 문서를 뷰피플수프에 넣으면 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체가 나오는데, 이 객체는 문서를 내포된 데이터 구조로 나타낸다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html_doc</span><span class="p">)</span>

<span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;head&gt;</span>
<span class="c">#   &lt;title&gt;</span>
<span class="c">#    The Dormouse's story</span>
<span class="c">#   &lt;/title&gt;</span>
<span class="c">#  &lt;/head&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;p class="title"&gt;</span>
<span class="c">#    &lt;b&gt;</span>
<span class="c">#     The Dormouse's story</span>
<span class="c">#    &lt;/b&gt;</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#   &lt;p class="story"&gt;</span>
<span class="c">#    Once upon a time there were three little sisters; and their names were</span>
<span class="c">#    &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;</span>
<span class="c">#     Elsie</span>
<span class="c">#    &lt;/a&gt;</span>
<span class="c">#    ,</span>
<span class="c">#    &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;</span>
<span class="c">#     Lacie</span>
<span class="c">#    &lt;/a&gt;</span>
<span class="c">#    and</span>
<span class="c">#    &lt;a class="sister" href="http://example.com/tillie" id="link2"&gt;</span>
<span class="c">#     Tillie</span>
<span class="c">#    &lt;/a&gt;</span>
<span class="c">#    ; and they lived at the bottom of a well.</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#   &lt;p class="story"&gt;</span>
<span class="c">#    ...</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>
</pre>
                            </div>
                        </div>
                        <p>다음은 간단하게 데이터 구조를 항해하는 몇 가지 방법이다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="n">soup</span><span class="o">.</span><span class="n">title</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>

<span class="n">soup</span><span class="o">.</span><span class="n">title</span><span class="o">.</span><span class="n">name</span>
<span class="c"># u'title'</span>

<span class="n">soup</span><span class="o">.</span><span class="n">title</span><span class="o">.</span><span class="n">string</span>
<span class="c"># u'The Dormouse's story'</span>

<span class="n">soup</span><span class="o">.</span><span class="n">title</span><span class="o">.</span><span class="n">parent</span><span class="o">.</span><span class="n">name</span>
<span class="c"># u'head'</span>

<span class="n">soup</span><span class="o">.</span><span class="n">p</span>
<span class="c"># &lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;</span>

<span class="n">soup</span><span class="o">.</span><span class="n">p</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="c"># u'title'</span>

<span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'a'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="nb">id</span><span class="o">=</span><span class="s">"link3"</span><span class="p">)</span>
<span class="c"># &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;</span>
</pre>
                            </div>
                        </div>
                        <p>일반적인 과업으로 한 페이지에서 &lt;a&gt; 태그에 존재하는 모든 URL을 뽑아 낼 일이 많다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="k">for</span> <span class="n">link</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'a'</span><span class="p">):</span>
    <span class="k">print</span><span class="p">(</span><span class="n">link</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s">'href'</span><span class="p">))</span>
<span class="c"># http://example.com/elsie</span>
<span class="c"># http://example.com/lacie</span>
<span class="c"># http://example.com/tillie</span>
</pre>
                            </div>
                        </div>
                        <p>또 다른 과업으로 페이지에서 텍스트를 모두 뽑아낼 일이 많다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">get_text</span><span class="p">())</span>
<span class="c"># The Dormouse's story</span>
<span class="c">#</span>
<span class="c"># The Dormouse's story</span>
<span class="c">#</span>
<span class="c"># Once upon a time there were three little sisters; and their names were</span>
<span class="c"># Elsie,</span>
<span class="c"># Lacie and</span>
<span class="c"># Tillie;</span>
<span class="c"># and they lived at the bottom of a well.</span>
<span class="c">#</span>
<span class="c"># ...</span>
</pre>
                            </div>
                        </div>
                        <p>이것이 여러분이 필요한 것인가? 그렇다면, 계속 읽어 보자.</p>
                    </div>
                    <div class="section" id="installing-beautiful-soup">
                        <h1>뷰티플 수프 설치하기<a class="headerlink" href="#installing-beautiful-soup" title="Permalink to this headline">¶</a></h1>
                        <p>데비안이나 우분투 리눅스 최신 버전을 사용중이라면, 시스템 꾸러미 관리자로 뷰티플수프를 설치하자:</p>
                        <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">apt-get</span> <span class="pre">install</span> <span class="pre">python-bs4</span></tt></p>
                        <p>
                            뷰티블수프 4는 PyPi를 통하여도 출간되어 있으므로, 시스템 꾸러미 관리자로 설치할 수 없을 경우, <tt class="docutils literal"><span class="pre">easy_install</span></tt>로 설치하거나
                            <tt class="docutils literal"><span class="pre">pip</span></tt>로 설치할 수 있다. 꾸러미 이름은 <tt class="docutils literal"><span class="pre">beautifulsoup4</span></tt>이며, 같은 꾸러미로 파이썬 2 그리고 파이썬 3에 작동한다.</p>
                        <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">easy_install</span> <span class="pre">beautifulsoup4</span></tt></p>
                        <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">pip</span> <span class="pre">install</span> <span class="pre">beautifulsoup4</span></tt></p>
                        <p>(이 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 꾸러미가 혹시 <cite>원하는 것이 아니라면</cite>. 이전 버전으로 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs3/documentation.html">뷰티플수프 3</a>가 있다. 많은 소프트웨에서 BS3를 사용하고 있으므로, 여전히 사용할 수 있다. 그러나 새로 코드를 작성할 생각이라면 <tt class="docutils literal"><span class="pre">beautifulsoup4</span></tt>를 설치하시기 바란다.)</p>
                        <p><tt class="docutils literal"><span class="pre">easy_install</span></tt>도 <tt class="docutils literal"><span class="pre">pip</span></tt>도 설치되어 있지 않다면,
                            <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/download/4.x/">뷰티플수프 4 소스</a>를 내려 받아 <tt class="docutils literal"><span class="pre">setup.py</span></tt>로 설치하실 수 있다.</p>
                        <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">python</span> <span class="pre">setup.py</span> <span class="pre">install</span></tt></p>
                        <p>
                            다른 모든 것이 실패하더라도, 뷰티플수프 라이센스는 여러분의 어플리케이션에 통채로 꾸려 넣는 것을 허용하므로 전혀 설치할 필요없이 소스를 내려받아 <tt class="docutils literal"><span class="pre">bs4</span></tt> 디렉토리를 통채로 코드베이스에 복사해서 사용하셔도 된다.</p>
                        <p>
                            본인은 파이썬 2.7과 파이썬 3.2에서 뷰티플수프를 개발하였지만, 다른 최신 버전에도 작동하리라 믿는 바이다.</p>
                        <div class="section" id="problems-after-installation">
                            <h2>설치 이후의 문제<a class="headerlink" href="#problems-after-installation" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플 수프는 파이썬 2 코드로 꾸려 넣어져 있다. 파이썬 3에 사용하기 위해 설치하면, 파이썬 3 코드로 자동으로 변환된다. 꾸러미가 설치되어 있지 않다면, 당연히 변환되지 않는다. 또한 윈도우즈 머신이라면 잘못된 버전이 설치되어 있다고 보고된다.</p>
                            <p>“No module named HTMLParser”와 같은 <tt class="docutils literal"><span class="pre">ImportError</span></tt> 에러가 일어나면, 파이썬 3 아래에서 파이썬 2 버전의 코드를 실행하고 있기 때문이다.</p>
                            <p>“No module named html.parser”와 같은 <tt class="docutils literal"><span class="pre">ImportError</span></tt> 에러라면, 파이썬 3 버전의 코드를 파이썬 2 아래에서 실행하고 있기 때문이다.</p>
                            <p>두 경우 모두 최선의 선택은 시스템에서 (압축파일을 풀 때 만들어진 디렉토리를 모두 포함하여) 뷰티플수프를 제거하고 다시 설치하는 것이다.</p>
                            <p>다음 <tt class="docutils literal"><span class="pre">ROOT_TAG_NAME</span> <span class="pre">=</span> <span class="pre">u'[document]'</span></tt> 줄에서 <tt class="docutils literal"><span class="pre">SyntaxError</span></tt> “Invalid syntax”를 맞이한다면, 파이썬 2 코드를 파이썬 3 코드로 변환할 필요가 있다. 이렇게 하려면 다음과 같이 패키지를 설치하거나:</p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">python3</span> <span class="pre">setup.py</span> <span class="pre">install</span></tt></p>
                            <p>아니면 직접 파이썬의 <tt class="docutils literal"><span class="pre">2to3</span></tt> 변환 스크립트를
                                <tt class="docutils literal"><span class="pre">bs4</span></tt> 디렉토리에 실행하면 된다:</p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">2to3-3.2</span> <span class="pre">-w</span> <span class="pre">bs4</span></tt></p>
                        </div>
                        <div class="section" id="installing-a-parser">
                            <span id="parser-installation"></span>
                            <h2>해석기 설치하기<a class="headerlink" href="#installing-a-parser" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플수프는 파이썬 표준 라이브러리에 포함된 HTML 해석기를 지원하지만, 또 수 많은 제-삼자 파이썬 해석기도 지원한다. 그 중 하나는 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://lxml.de/">lxml 해석기</a>이다. 설정에 따라, 다음 명령어들 중 하나로 lxml을 설치하는 편이 좋을 경우가 있다:</p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">apt-get</span> <span class="pre">install</span> <span class="pre">python-lxml</span></tt></p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">easy_install</span> <span class="pre">lxml</span></tt></p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">pip</span> <span class="pre">install</span> <span class="pre">lxml</span></tt></p>
                            <p>파이썬 2를 사용중이라면, 또다른 대안은 순수-파이썬 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://code.google.com/p/html5lib/">html5lib 해석기</a>를 사용하는 것인데, 이 해석기는 HTML을 웹 브라우저가 해석하는 방식으로 해석한다. 설정에 따라 다음 명령어중 하나로 html5lib를 설치하는 것이 좋을 때가 있다:</p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">apt-get</span> <span class="pre">install</span> <span class="pre">python-html5lib</span></tt></p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">easy_install</span> <span class="pre">html5lib</span></tt></p>
                            <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">pip</span> <span class="pre">install</span> <span class="pre">html5lib</span></tt></p>
                            <p>다음 표에 각 해석 라이브러리의 장점과 단점을 요약해 놓았다:</p>
                            <table class="docutils" border="1">
                                <colgroup>
                                    <col width="18%">
                                    <col width="35%">
                                    <col width="26%">
                                    <col width="21%">
                                </colgroup>
                                <tbody valign="top">
                                    <tr class="row-odd">
                                        <td>해석기</td>
                                        <td>전형적 사용방법</td>
                                        <td>장점</td>
                                        <td>단점</td>
                                    </tr>
                                    <tr class="row-even">
                                        <td>파이썬의 html.parser</td>
                                        <td><tt class="docutils literal"><span class="pre">BeautifulSoup(markup,</span> <span class="pre">"html.parser")</span></tt></td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>각종 기능 완비</li>
                                                <li>적절한 속도</li>
                                                <li>관대함 (파이썬 2.7.3과 3.2에서.)</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>별로 관대하지 않음
                                                    (파이썬 2.7.3이나 3.2.2 이전 버전에서)</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="row-odd">
                                        <td>lxml의 HTML 해석기</td>
                                        <td><tt class="docutils literal"><span class="pre">BeautifulSoup(markup,</span> <span class="pre">"lxml")</span></tt></td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>아주 빠름</li>
                                                <li>관대함</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>외부 C 라이브러리 의존</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="row-even">
                                        <td>lxml의 XML 해석기</td>
                                        <td><tt class="docutils literal"><span class="pre">BeautifulSoup(markup,</span> <span class="pre">["lxml",</span> <span class="pre">"xml"])</span></tt>
                                            <tt class="docutils literal"><span class="pre">BeautifulSoup(markup,</span> <span class="pre">"xml")</span></tt></td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>아주 빠름</li>
                                                <li>유일하게 XML 해석기 지원</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>외부 C 라이브러리 의존</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr class="row-odd">
                                        <td>html5lib</td>
                                        <td><tt class="docutils literal"><span class="pre">BeautifulSoup(markup,</span> <span class="pre">html5lib)</span></tt></td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>아주 관대함</li>
                                                <li>웹 브라우저의 방식으로 페이지를 해석함</li>
                                                <li>유효한 HTML5를 생성함</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <ul class="first last simple">
                                                <li>아주 느림</li>
                                                <li>외부 파이썬 라이브러리 의존</li>
                                                <li>파이썬 2 전용</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>가능하다면, 속도를 위해 lxml을 설치해 사용하시기를 권장한다. 2.7.3 이전의 파이썬2, 또는3.2.2 이전의 파이썬 3 버전을 사용한다면, lxml을 사용하는 것이 <cite>필수이다</cite>. 그렇지 않고 구형 버전의 파이썬 내장 HTML 해석기 html5lib는 별로 좋지 않다.</p>
                            <p>문서가 유효하지 않을 경우 해석기마다 다른 뷰티플수프 트리를 생산한다는 사실을 주목하자. 자세한 것은 <a class="reference internal" href="#differences-between-parsers">해석기들 사이의 차이점들</a>을 살펴보자.</p>
                        </div>
                    </div>
                    <div class="section" id="making-the-soup">
                        <h1>수프 만들기<a class="headerlink" href="#making-the-soup" title="Permalink to this headline">¶</a></h1>
                        <p>문서를 해석하려면, 문서를 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 건네주자. 문자열 혹은 열린 파일 핸들을 건네면 된다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>

<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="nb">open</span><span class="p">(</span><span class="s">"index.html"</span><span class="p">))</span>

<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;html&gt;data&lt;/html&gt;"</span><span class="p">)</span>
</pre>
                            </div>
                        </div>
                        <p>먼저, 문서는 유니코드로 변환되고 HTML 개체는 유니코드 문자로 변환된다:</p>
                        <div class="highlight-python">
                            <pre>BeautifulSoup("Sacr&amp;eacute; bleu!")
&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;Sacré bleu!&lt;/body&gt;&lt;/html&gt;</pre>
                        </div>
                        <p>다음 뷰티플수프는 문서를 가장 적당한 해석기를 사용하여 해석한다. 특별히 XML 해석기를 사용하라고 지정해 주지 않으면 HTML 해석기를 사용한다. (<a class="reference internal" href="#id11"> XML 해석하기</a> 참조.)</p>
                    </div>
                    <div class="section" id="kinds-of-objects">
                        <h1>객체의 종류<a class="headerlink" href="#kinds-of-objects" title="Permalink to this headline">¶</a></h1>
                        <p>뷰티플수프는 복합적인 HTML 문서를 파이썬 객체로 구성된 복합적인 문서로 변환한다. 그러나
                            <cite>객체의 종류</cite>를 다루는 법만 알면 된다.</p>
                        <div class="section" id="tag">
                            <span id="id1"></span>
                            <h2><tt class="docutils literal"><span class="pre">태그</span></tt><a class="headerlink" href="#tag" title="Permalink to this headline">¶</a></h2>
                            <p> <tt class="docutils literal"><span class="pre">Tag</span></tt> 객체는 원래 문서의 XML 태그 또는 HTML 태그에 상응한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;b class="boldest"&gt;Extremely bold&lt;/b&gt;'</span><span class="p">)</span>
<span class="n">tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">b</span>
<span class="nb">type</span><span class="p">(</span><span class="n">tag</span><span class="p">)</span>
<span class="c"># &lt;class 'bs4.element.Tag'&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>태그는 많은 속성과 메쏘드가 있지만, 그 대부분을 나중에 <a class="reference internal" href="#navigating-the-tree">트리 항해하기</a> 그리고 <a class="reference internal" href="#searching-the-tree">트리 검색하기</a>에서 다룰 생각이다. 지금은 태그의 가장 중요한 특징인 이름과 속성을 설명한다.</p>
                            <div class="section" id="name">
                                <h3>이름<a class="headerlink" href="#name" title="Permalink to this headline">¶</a></h3>
                                <p>태그마다 이름이 있고, 다음 <tt class="docutils literal"><span class="pre">.name</span></tt> 과 같이 접근할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">tag</span><span class="o">.</span><span class="n">name</span>
<span class="c"># u'b'</span>
</pre>
                                    </div>
                                </div>
                                <p>태그의 이름을 바꾸면, 그 변화는 뷰티블수프가 생산한 HTML 조판에 반영된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">tag</span><span class="o">.</span><span class="n">name</span> <span class="o">=</span> <span class="s">"blockquote"</span>
<span class="n">tag</span>
<span class="c"># &lt;blockquote class="boldest"&gt;Extremely bold&lt;/blockquote&gt;</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="attributes">
                                <h3>속성<a class="headerlink" href="#attributes" title="Permalink to this headline">¶</a></h3>
                                <p>태그는 속성을 여러개 가질 수 있다. <tt class="docutils literal"><span class="pre">&lt;b</span>
                                        <span class="pre">class="boldest"&gt;</span></tt> 태그는 속성으로 “class”가 있는데 그 값은
                                    “boldest”이다. 태그의 속성에는 사전처럼 태그를 반복해 접근하면 된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">tag</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="c"># u'boldest'</span>
</pre>
                                    </div>
                                </div>
                                <p>사전에 <tt class="docutils literal"><span class="pre">.attrs</span></tt>와 같이 바로 접근할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">tag</span><span class="o">.</span><span class="n">attrs</span>
<span class="c"># {u'class': u'boldest'}</span>
</pre>
                                    </div>
                                </div>
                                <p>태그의 속성을 추가, 제거, 변경할 수 있다. 역시 태그를 사전처럼 취급해서 처리한다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">tag</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span> <span class="o">=</span> <span class="s">'verybold'</span>
<span class="n">tag</span><span class="p">[</span><span class="s">'id'</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
<span class="n">tag</span>
<span class="c"># &lt;blockquote class="verybold" id="1"&gt;Extremely bold&lt;/blockquote&gt;</span>

<span class="k">del</span> <span class="n">tag</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="k">del</span> <span class="n">tag</span><span class="p">[</span><span class="s">'id'</span><span class="p">]</span>
<span class="n">tag</span>
<span class="c"># &lt;blockquote&gt;Extremely bold&lt;/blockquote&gt;</span>

<span class="n">tag</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="c"># KeyError: 'class'</span>
<span class="k">print</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s">'class'</span><span class="p">))</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                                <div class="section" id="multi-valued-attributes">
                                    <span id="multivalue"></span>
                                    <h4>값이-여럿인 속성<a class="headerlink" href="#multi-valued-attributes" title="Permalink to this headline">¶</a></h4>
                                    <p>HTML 4에서 몇몇 속성은 값을 여러 개 가질 수 있도록 정의된다. HTML 5에서 그 중 2개는 제거되었지만, 몇 가지가 더 정의되었다. 가장 흔한 다중값 속성은 <tt class="docutils literal"><span class="pre">class</span></tt>이다 (다시 말해, 태그가 하나 이상의 CSS 클래스를 가질 수 있다). 다른 것으로는 <tt class="docutils literal"><span class="pre">rel</span></tt>, <tt class="docutils literal"><span class="pre">rev</span></tt>, <tt class="docutils literal"><span class="pre">accept-charset</span></tt>,
                                        <tt class="docutils literal"><span class="pre">headers</span></tt>, 그리고 <tt class="docutils literal"><span class="pre">accesskey</span></tt>가 포함된다. 뷰티플수프는 다중-값 속성의 값들을 리스트로 나타낸다:</p>
                                    <div class="highlight-python">
                                        <div class="highlight">
                                            <pre><span class="n">css_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;p class="body strikeout"&gt;&lt;/p&gt;'</span><span class="p">)</span>
<span class="n">css_soup</span><span class="o">.</span><span class="n">p</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="c"># ["body", "strikeout"]</span>

<span class="n">css_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;p class="body"&gt;&lt;/p&gt;'</span><span class="p">)</span>
<span class="n">css_soup</span><span class="o">.</span><span class="n">p</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="c"># ["body"]</span>
</pre>
                                        </div>
                                    </div>
                                    <p>속성에 <cite>하나 이상의 값이 있는 것처럼 보이지만</cite>, HTML 표준에 정의된 다중-값 속성이 아니라면, 뷰티플수프는 그 속성을 그대로 둔다:</p>
                                    <div class="highlight-python">
                                        <div class="highlight">
                                            <pre><span class="n">id_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;p id="my id"&gt;&lt;/p&gt;'</span><span class="p">)</span>
<span class="n">id_soup</span><span class="o">.</span><span class="n">p</span><span class="p">[</span><span class="s">'id'</span><span class="p">]</span>
<span class="c"># 'my id'</span>
</pre>
                                        </div>
                                    </div>
                                    <p>태그를 다시 문자열로 바꾸면, 다중-값 속성은 합병된다:</p>
                                    <div class="highlight-python">
                                        <div class="highlight">
                                            <pre><span class="n">rel_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;p&gt;Back to the &lt;a rel="index"&gt;homepage&lt;/a&gt;&lt;/p&gt;'</span><span class="p">)</span>
<span class="n">rel_soup</span><span class="o">.</span><span class="n">a</span><span class="p">[</span><span class="s">'rel'</span><span class="p">]</span>
<span class="c"># ['index']</span>
<span class="n">rel_soup</span><span class="o">.</span><span class="n">a</span><span class="p">[</span><span class="s">'rel'</span><span class="p">]</span> <span class="o">=</span> <span class="p">[</span><span class="s">'index'</span><span class="p">,</span> <span class="s">'contents'</span><span class="p">]</span>
<span class="k">print</span><span class="p">(</span><span class="n">rel_soup</span><span class="o">.</span><span class="n">p</span><span class="p">)</span>
<span class="c"># &lt;p&gt;Back to the &lt;a rel="index contents"&gt;homepage&lt;/a&gt;&lt;/p&gt;</span>
</pre>
                                        </div>
                                    </div>
                                    <p>문서를 XML로 해석하면, 다중-값 속성은 없다:</p>
                                    <div class="highlight-python">
                                        <div class="highlight">
                                            <pre><span class="n">xml_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;p class="body strikeout"&gt;&lt;/p&gt;'</span><span class="p">,</span> <span class="s">'xml'</span><span class="p">)</span>
<span class="n">xml_soup</span><span class="o">.</span><span class="n">p</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="c"># u'body strikeout'</span>
</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="navigablestring">
                            <h2><tt class="docutils literal"><span class="pre">NavigableString</span></tt><a class="headerlink" href="#navigablestring" title="Permalink to this headline">¶</a></h2>
                            <p>문자열은 태그 안에 있는 일군의 텍스트에 상응한다. 뷰티플수프는 <tt class="docutils literal"><span class="pre">NavigableString</span></tt> 클래스 안에다 이런 텍스트를 보관한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">tag</span><span class="o">.</span><span class="n">string</span>
<span class="c"># u'Extremely bold'</span>
<span class="nb">type</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">string</span><span class="p">)</span>
<span class="c"># &lt;class 'bs4.element.NavigableString'&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>
                                <tt class="docutils literal"><span class="pre">NavigableString</span></tt>은 파이썬의 유니코드 문자열과 똑 같은데, 단 <a class="reference internal" href="#navigating-the-tree">트리 항해하기</a>와 <a class="reference internal" href="#searching-the-tree">트리 탐색하기</a>에 기술된 특징들도 지원한다는 점이 다르다.
                                <tt class="docutils literal"><span class="pre">NavigableString</span></tt>을 유니코드 문자열로 변환하려면 <tt class="docutils literal"><span class="pre">unicode()</span></tt>를 사용한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">unicode_string</span> <span class="o">=</span> <span class="nb">unicode</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">string</span><span class="p">)</span>
<span class="n">unicode_string</span>
<span class="c"># u'Extremely bold'</span>
<span class="nb">type</span><span class="p">(</span><span class="n">unicode_string</span><span class="p">)</span>
<span class="c"># &lt;type 'unicode'&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>문자열을 바로바로 편집할 수는 없지만, <a class="reference internal" href="#replace-with"><em>replace_with()</em></a>을 사용하면 한 문자열을 또다른 문자열로 바꿀 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">tag</span><span class="o">.</span><span class="n">string</span><span class="o">.</span><span class="n">replace_with</span><span class="p">(</span><span class="s">"No longer bold"</span><span class="p">)</span>
<span class="n">tag</span>
<span class="c"># &lt;blockquote&gt;No longer bold&lt;/blockquote&gt;</span>
</pre>
                                </div>
                            </div>
                            <p><tt class="docutils literal"><span class="pre">NavigableString</span></tt>은 <a class="reference internal" href="#navigating-the-tree">트리 항해하기</a>와 <a class="reference internal" href="#searching-the-tree">트리 탐색하기</a>에 기술된 특징들을 모두는 아니지만, 대부분 지원한다. 특히, (태그에는 다른 문자열이나 또다른 태그가 담길 수 있지만) 문자열에는 다른 어떤 것도 담길 수 없기 때문에, 문자열은 <tt class="docutils literal"><span class="pre">.contents</span></tt>나 <tt class="docutils literal"><span class="pre">.string</span></tt> 속성, 또는 <tt class="docutils literal"><span class="pre">find()</span></tt> 메쏘드를 지원하지 않는다.</p>
                        </div>
                        <div class="section" id="beautifulsoup">
                            <h2><tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt><a class="headerlink" href="#beautifulsoup" title="Permalink to this headline">¶</a></h2>
                            <p>
                                <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체 자신은 문서 전체를 대표한다. 대부분의 목적에, 그것을 <a class="reference internal" href="#tag"><em>Tag</em></a> 객체로 취급해도 좋다. 이것은 곧 <a class="reference internal" href="#navigating-the-tree">트리 항해하기</a>와 <a class="reference internal" href="#searching-the-tree">트리 검색하기</a>에 기술된 메쏘드들을 지원한다는 뜻이다.</p>
                            <p>
                                <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체는 실제 HTML 태그나 XML 태그에 상응하지 않기 때문에, 이름도 속성도 없다. 그러나 가끔 그의 이름 <tt class="docutils literal"><span class="pre">.name</span></tt>을 살펴보는 것이 유용할 경우가 있다. 그래서 특별히
                                <tt class="docutils literal"><span class="pre">.name</span></tt>에 “[document]”라는 이름이 주어졌다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">name</span>
<span class="c"># u'[document]'</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="comments-and-other-special-strings">
                            <h2>주석과 기타 특수 문자열들<a class="headerlink" href="#comments-and-other-special-strings" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">Tag</span></tt>, <tt class="docutils literal"><span class="pre">NavigableString</span></tt>, 그리고 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 정도면 HTML이나 XML 파일에서 보게될 거의 모든 것들을 망라한다. 그러나 몇 가지 남은 것들이 있다. 아마도 신경쓸 필요가 있는 것이 유일하게 있다면 바로 주석이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">"&lt;b&gt;&lt;!--Hey, buddy. Want to buy a used parser?--&gt;&lt;/b&gt;"</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">comment</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">string</span>
<span class="nb">type</span><span class="p">(</span><span class="n">comment</span><span class="p">)</span>
<span class="c"># &lt;class 'bs4.element.Comment'&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>
                                <tt class="docutils literal"><span class="pre">Comment</span></tt> 객체는 그냥 특별한 유형의 <tt class="docutils literal"><span class="pre">NavigableString</span></tt>이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">comment</span>
<span class="c"># u'Hey, buddy. Want to buy a used parser'</span>
</pre>
                                </div>
                            </div>
                            <p>그러나 HTML 문서의 일부에 나타나면, <tt class="docutils literal"><span class="pre">Comment</span></tt>는 특별한 형태로 화면에 표시된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;b&gt;</span>
<span class="c">#  &lt;!--Hey, buddy. Want to buy a used parser?--&gt;</span>
<span class="c"># &lt;/b&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>뷰티플수프는 XML 문서에 나올만한 것들을 모두 클래스에다 정의한다: <tt class="docutils literal"><span class="pre">CData</span></tt>, <tt class="docutils literal"><span class="pre">ProcessingInstruction</span></tt>,
                                <tt class="docutils literal"><span class="pre">Declaration</span></tt>, 그리고 <tt class="docutils literal"><span class="pre">Doctype</span></tt>이 그것이다. <tt class="docutils literal"><span class="pre">Comment</span></tt>와 똑같이, 이런 클래스들은 <tt class="docutils literal"><span class="pre">NavigableString</span></tt>의 하위클래스로서 자신의 문자열에 다른 어떤것들을 추가한다. 다음은 주석을 CDATA 블록으로 교체하는 예이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">CData</span>
<span class="n">cdata</span> <span class="o">=</span> <span class="n">CData</span><span class="p">(</span><span class="s">"A CDATA block"</span><span class="p">)</span>
<span class="n">comment</span><span class="o">.</span><span class="n">replace_with</span><span class="p">(</span><span class="n">cdata</span><span class="p">)</span>

<span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;b&gt;</span>
<span class="c">#  &lt;![CDATA[A CDATA block]]&gt;</span>
<span class="c"># &lt;/b&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" id="navigating-the-tree">
                        <h1>트리 항해하기<a class="headerlink" href="#navigating-the-tree" title="Permalink to this headline">¶</a></h1>
                        <p>다시 또 “Three sisters” HTML 문서를 보자:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="n">html_doc</span> <span class="o">=</span> <span class="s">"""</span>
<span class="s">&lt;html&gt;&lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;</span>

<span class="s">&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;Once upon a time there were three little sisters; and their names were</span>
<span class="s">&lt;a href="http://example.com/elsie" class="sister" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="s">&lt;a href="http://example.com/lacie" class="sister" id="link2"&gt;Lacie&lt;/a&gt; and</span>
<span class="s">&lt;a href="http://example.com/tillie" class="sister" id="link3"&gt;Tillie&lt;/a&gt;;</span>
<span class="s">and they lived at the bottom of a well.&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;...&lt;/p&gt;</span>
<span class="s">"""</span>

<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html_doc</span><span class="p">)</span>
</pre>
                            </div>
                        </div>
                        <p>이 예제로 한 문서에서 일부를 다른 곳으로 이동하는 법을 보여주겠다.</p>
                        <div class="section" id="going-down">
                            <h2>내려가기<a class="headerlink" href="#going-down" title="Permalink to this headline">¶</a></h2>
                            <p>태그에는 또다른 태그가 담길 수 있다. 이런 요소들은 그 태그의 자손(<cite>children</cite>)이라고 부른다. 뷰티플수프는 한 태그의 자손을 항해하고 반복하기 위한 속성을 다양하게 제공한다.</p>
                            <p>뷰티플수프의 문자열은 이런 속성들을 제공하지 않음에 유의하자. 왜냐하면 문자열은 자손을 가질 수 없기 때문이다.</p>
                            <div class="section" id="navigating-using-tag-names">
                                <h3>태그 이름을 사용하여 항해하기<a class="headerlink" href="#navigating-using-tag-names" title="Permalink to this headline">¶</a></h3>
                                <p>가장 단순하게 해석 트리를 항해하는 방법은 원하는 태그의 이름을 지정해 주는 것이다. &lt;head&gt; 태그를 원한다면, 그냥 <tt class="docutils literal"><span class="pre">soup.head</span></tt>라고 지정하면 된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">head</span>
<span class="c"># &lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;</span>

<span class="n">soup</span><span class="o">.</span><span class="n">title</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>
</pre>
                                    </div>
                                </div>
                                <p>이 트릭을 반복해 사용하면 해석 트리의 특정 부분을 확대해 볼 수 있다. 다음 코드는 &lt;body&gt; 태그 아래에서 첫 번째 &lt;b&gt; 태그를 얻는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">body</span><span class="o">.</span><span class="n">b</span>
<span class="c"># &lt;b&gt;The Dormouse's story&lt;/b&gt;</span>
</pre>
                                    </div>
                                </div>
                                <p>태그 이름을 속성으로 사용하면 오직 그 이름으로 <cite>첫 번째</cite> 태그만 얻는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    &lt;a&gt; 태그를 <cite>모두</cite> 얻거나, 특정이름으로 첫 번째 태그 말고 좀 더 복잡한 어떤 것을 얻고 싶다면, <a class="reference internal" href="#searching-the-tree">트리 탐색하기</a>에 기술된 메쏘드들을 사용해야 한다. 예를 들어, <cite>find_all()</cite>과 같은 메쏘드를 사용하면 된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'a'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="contents-and-children">
                                <h3><tt class="docutils literal"><span class="pre">.contents</span></tt> 그리고 <tt class="docutils literal"><span class="pre">.children</span></tt><a class="headerlink" href="#contents-and-children" title="Permalink to this headline">¶</a></h3>
                                <p>태그의 자손은 <tt class="docutils literal"><span class="pre">.contents</span></tt>라고 부르는 리스트로 얻을 수 있다:</p>
                                <div class="highlight-python">
                                    <pre>head_tag = soup.head
head_tag
# &lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;

head_tag.contents
[&lt;title&gt;The Dormouse's story&lt;/title&gt;]

title_tag = head_tag.contents[0]
title_tag
# &lt;title&gt;The Dormouse's story&lt;/title&gt;
title_tag.contents
# [u'The Dormouse's story']</pre>
                                </div>
                                <p><tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체 자체에 자손이 있다. 이 경우, &lt;html&gt; 태그가 바로 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체의 자손이다.:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="nb">len</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">contents</span><span class="p">)</span>
<span class="c"># 1</span>
<span class="n">soup</span><span class="o">.</span><span class="n">contents</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span><span class="o">.</span><span class="n">name</span>
<span class="c"># u'html'</span>
</pre>
                                    </div>
                                </div>
                                <p>문자열은 <tt class="docutils literal"><span class="pre">.contents</span></tt>를 가질 수 없는데, 왜냐하면 문자열 안에는 아무것도 담을 수 없기 때문이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">text</span> <span class="o">=</span> <span class="n">title_tag</span><span class="o">.</span><span class="n">contents</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span>
<span class="n">text</span><span class="o">.</span><span class="n">contents</span>
<span class="c"># AttributeError: 'NavigableString' object has no attribute 'contents'</span>
</pre>
                                    </div>
                                </div>
                                <p>자손을 리스트로 얻는 대신에, <tt class="docutils literal"><span class="pre">.children</span></tt> 발생자를 사용하면 태그의 자손을 반복할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">child</span> <span class="ow">in</span> <span class="n">title_tag</span><span class="o">.</span><span class="n">children</span><span class="p">:</span>
    <span class="k">print</span><span class="p">(</span><span class="n">child</span><span class="p">)</span>
<span class="c"># The Dormouse's story</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="descendants">
                                <h3><tt class="docutils literal"><span class="pre">.descendants</span></tt><a class="headerlink" href="#descendants" title="Permalink to this headline">¶</a></h3>
                                <p>
                                    내용물(<tt class="docutils literal"><span class="pre">.contents</span></tt>)과 자손(<tt class="docutils literal"><span class="pre">.children</span></tt>) 속성은 오직 한 태그의 직계(
                                    <cite>direct</cite>) 자손만 고려한다. 예를 들면, &lt;head&gt; 태그는 오직 한 개의 직계 자손으로 &lt;title&gt; 태그가 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">head_tag</span><span class="o">.</span><span class="n">contents</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>그러나 &lt;title&gt; 태그 자체에 자손이 하나 있다: 문자열 “The Dormouse’s
                                    story”가 그것이다. 그 문자열도 역시 &lt;head&gt; 태그의 자손이다. <tt class="docutils literal"><span class="pre">.descendants</span></tt> 속성은 한 태그의 자손들을 <cite>모두</cite> 재귀적으로, 반복할 수 있도록 해준다: 그의 직계 자손, 그 직계 자손의 자손, 등등:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">child</span> <span class="ow">in</span> <span class="n">head_tag</span><span class="o">.</span><span class="n">descendants</span><span class="p">:</span>
    <span class="k">print</span><span class="p">(</span><span class="n">child</span><span class="p">)</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>
<span class="c"># The Dormouse's story</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    &lt;head&gt; 태그는 오직 자손이 하나이지만, 후손은 둘이다:
                                    &lt;title&gt; 태그와 &lt;title&gt; 태그의 자손이 그것이다. <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체는 오직 하나의 직계 자손(&lt;html&gt; 태그)만 있지만, 수 많은 후손을 가진다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="nb">len</span><span class="p">(</span><span class="nb">list</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">children</span><span class="p">))</span>
<span class="c"># 1</span>
<span class="nb">len</span><span class="p">(</span><span class="nb">list</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">descendants</span><span class="p">))</span>
<span class="c"># 25</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="string">
                                <span id="id2"></span>
                                <h3><tt class="docutils literal"><span class="pre">.string</span></tt><a class="headerlink" href="#string" title="Permalink to this headline">¶</a></h3>
                                <p>태그에 오직 자손이 하나라면, 그리고 그 자손이 <tt class="docutils literal"><span class="pre">NavigableString</span></tt>이라면, 그 자손은 <tt class="docutils literal"><span class="pre">.string</span></tt>으로 얻을 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">title_tag</span><span class="o">.</span><span class="n">string</span>
<span class="c"># u'The Dormouse's story'</span>
</pre>
                                    </div>
                                </div>
                                <p>태그의 유일한 자손이 또다른 태그라면, 그리고 <cite>그</cite> 태그가
                                    <tt class="docutils literal"><span class="pre">.string</span></tt>을 가진다면, 그 부모 태그는 같은 <tt class="docutils literal"><span class="pre">.string</span></tt>을 그의 자손으로 가진다고 간주된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">head_tag</span><span class="o">.</span><span class="n">contents</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>

<span class="n">head_tag</span><span class="o">.</span><span class="n">string</span>
<span class="c"># u'The Dormouse's story'</span>
</pre>
                                    </div>
                                </div>
                                <p>태그에 하나 이상의 태그가 있다면, <tt class="docutils literal"><span class="pre">.string</span></tt>이 무엇을 가리킬지 확실하지 않다. 그래서 그럴 경우 <tt class="docutils literal"><span class="pre">.string</span></tt>은 <tt class="docutils literal"><span class="pre">None</span></tt>으로 정의된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">html</span><span class="o">.</span><span class="n">string</span><span class="p">)</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="strings-and-stripped-strings">
                                <span id="string-generators"></span>
                                <h3><tt class="docutils literal"><span class="pre">.strings</span></tt> 그리고 <tt class="docutils literal"><span class="pre">stripped_strings</span></tt><a class="headerlink" href="#strings-and-stripped-strings" title="Permalink to this headline">¶</a></h3>
                                <p>한 태그 안에 여러개의 태그가 있더라도 여전히 문자열을 볼 수 있다. <tt class="docutils literal"><span class="pre">.strings</span></tt> 발생자를 사용하자:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">string</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">strings</span><span class="p">:</span>
    <span class="k">print</span><span class="p">(</span><span class="nb">repr</span><span class="p">(</span><span class="n">string</span><span class="p">))</span>
<span class="c"># u"The Dormouse's story"</span>
<span class="c"># u'\n\n'</span>
<span class="c"># u"The Dormouse's story"</span>
<span class="c"># u'\n\n'</span>
<span class="c"># u'Once upon a time there were three little sisters; and their names were\n'</span>
<span class="c"># u'Elsie'</span>
<span class="c"># u',\n'</span>
<span class="c"># u'Lacie'</span>
<span class="c"># u' and\n'</span>
<span class="c"># u'Tillie'</span>
<span class="c"># u';\nand they lived at the bottom of a well.'</span>
<span class="c"># u'\n\n'</span>
<span class="c"># u'...'</span>
<span class="c"># u'\n'</span>
</pre>
                                    </div>
                                </div>
                                <p>이런 문자열들은 공백이 쓸데 없이 많은 경향이 있으므로, 대신에 <tt class="docutils literal"><span class="pre">.stripped_strings</span></tt> 발생자를 사용해 제거해 버릴 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">string</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">stripped_strings</span><span class="p">:</span>
    <span class="k">print</span><span class="p">(</span><span class="nb">repr</span><span class="p">(</span><span class="n">string</span><span class="p">))</span>
<span class="c"># u"The Dormouse's story"</span>
<span class="c"># u"The Dormouse's story"</span>
<span class="c"># u'Once upon a time there were three little sisters; and their names were'</span>
<span class="c"># u'Elsie'</span>
<span class="c"># u','</span>
<span class="c"># u'Lacie'</span>
<span class="c"># u'and'</span>
<span class="c"># u'Tillie'</span>
<span class="c"># u';\nand they lived at the bottom of a well.'</span>
<span class="c"># u'...'</span>
</pre>
                                    </div>
                                </div>
                                <p>여기에서, 전적으로 공백만으로 구성된 문자열은 무시되고 문자열 앞과 뒤의 공백은 제거된다.</p>
                            </div>
                        </div>
                        <div class="section" id="going-up">
                            <h2>올라가기<a class="headerlink" href="#going-up" title="Permalink to this headline">¶</a></h2>
                            <p>“가족 트리” 비유를 계속 사용해 보자. 태그마다 그리고 문자열마다 부모(
                                <cite>parent</cite>)가 있다: 즉 자신을 담고 있는 태그가 있다.</p>
                            <div class="section" id="parent">
                                <span id="id3"></span>
                                <h3><tt class="docutils literal"><span class="pre">.parent</span></tt><a class="headerlink" href="#parent" title="Permalink to this headline">¶</a></h3>
                                <p>한 요소의 부모는 <tt class="docutils literal"><span class="pre">.parent</span></tt> 속성으로 접근한다. 예제 “three sisters”문서에서, &lt;head&gt; 태그는 &lt;title&gt; 태그의 부모이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">title_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">title</span>
<span class="n">title_tag</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>
<span class="n">title_tag</span><span class="o">.</span><span class="n">parent</span>
<span class="c"># &lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;</span>
</pre>
                                    </div>
                                </div>
                                <p>title 문자열 자체로 부모가 있다: 그 문자열을 담고 있는 &lt;title&gt; 태그가 그것이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">title_tag</span><span class="o">.</span><span class="n">string</span><span class="o">.</span><span class="n">parent</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>
</pre>
                                    </div>
                                </div>
                                <p>&lt;html&gt; 태그와 같은 최상위 태그의 부모는 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체 자신이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">html_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">html</span>
<span class="nb">type</span><span class="p">(</span><span class="n">html_tag</span><span class="o">.</span><span class="n">parent</span><span class="p">)</span>
<span class="c"># &lt;class 'bs4.BeautifulSoup'&gt;</span>
</pre>
                                    </div>
                                </div>
                                <p><tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체의 <tt class="docutils literal"><span class="pre">.parent</span></tt>는 None으로 정의된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">parent</span><span class="p">)</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="parents">
                                <span id="id4"></span>
                                <h3><tt class="docutils literal"><span class="pre">.parents</span></tt><a class="headerlink" href="#parents" title="Permalink to this headline">¶</a></h3>
                                <p> <tt class="docutils literal"><span class="pre">.parents</span></tt>로 한 요소의 부모들을 모두 다 반복할 수 있다.
                                    다음 예제는 <tt class="docutils literal"><span class="pre">.parents</span></tt>를 사용하여 문서 깊숙히 묻힌 &lt;a&gt; 태그로부터 시작하여, 문서의 최상단까지 순회한다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">link</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="n">link</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>
<span class="k">for</span> <span class="n">parent</span> <span class="ow">in</span> <span class="n">link</span><span class="o">.</span><span class="n">parents</span><span class="p">:</span>
    <span class="k">if</span> <span class="n">parent</span> <span class="ow">is</span> <span class="bp">None</span><span class="p">:</span>
        <span class="k">print</span><span class="p">(</span><span class="n">parent</span><span class="p">)</span>
    <span class="k">else</span><span class="p">:</span>
        <span class="k">print</span><span class="p">(</span><span class="n">parent</span><span class="o">.</span><span class="n">name</span><span class="p">)</span>
<span class="c"># p</span>
<span class="c"># body</span>
<span class="c"># html</span>
<span class="c"># [document]</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="going-sideways">
                            <h2>옆으로 가기<a class="headerlink" href="#going-sideways" title="Permalink to this headline">¶</a></h2>
                            <p>다음과 같은 간단한 문서를 생각해 보자:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">sibling_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;a&gt;&lt;b&gt;text1&lt;/b&gt;&lt;c&gt;text2&lt;/c&gt;&lt;/b&gt;&lt;/a&gt;"</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="n">sibling_soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;a&gt;</span>
<span class="c">#    &lt;b&gt;</span>
<span class="c">#     text1</span>
<span class="c">#    &lt;/b&gt;</span>
<span class="c">#    &lt;c&gt;</span>
<span class="c">#     text2</span>
<span class="c">#    &lt;/c&gt;</span>
<span class="c">#   &lt;/a&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>&lt;b&gt; 태그와 &lt;c&gt; 태그는 같은 수준에 있다: 둘 다 같은 태그의 직계 자손이다. 이를 형제들(<cite>siblings</cite>)이라고 부른다. 문서가 pretty-printed로 출력되면, 형제들은 같은 들여쓰기 수준에서 나타난다. 이런 관계를 코드 작성에도 이용할 수 있다.</p>
                            <div class="section" id="next-sibling-and-previous-sibling">
                                <h3><tt class="docutils literal"><span class="pre">.next_sibling</span></tt> 그리고 <tt class="docutils literal"><span class="pre">.previous_sibling</span></tt><a class="headerlink" href="#next-sibling-and-previous-sibling" title="Permalink to this headline">¶</a></h3>
                                <p>
                                    <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>과 <tt class="docutils literal"><span class="pre">.previous_sibling</span></tt>를 사용하면 해석 트리에서 같은 수준에 있는 페이지 요소들 사이를 항해할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">sibling_soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">next_sibling</span>
<span class="c"># &lt;c&gt;text2&lt;/c&gt;</span>

<span class="n">sibling_soup</span><span class="o">.</span><span class="n">c</span><span class="o">.</span><span class="n">previous_sibling</span>
<span class="c"># &lt;b&gt;text1&lt;/b&gt;</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    &lt;b&gt; 태그는 <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>이 있지만, <tt class="docutils literal"><span class="pre">.previous_sibling</span></tt>은 없는데,
                                    그 이유는 &lt;b&gt; 태그 앞에 <cite>트리에서 같은 수준에</cite> 아무것도 없기 때문이다. 같은 이유로, &lt;c&gt; 태그는 <tt class="docutils literal"><span class="pre">.previous_sibling</span></tt>은 있지만 <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>은 없다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">print</span><span class="p">(</span><span class="n">sibling_soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">previous_sibling</span><span class="p">)</span>
<span class="c"># None</span>
<span class="k">print</span><span class="p">(</span><span class="n">sibling_soup</span><span class="o">.</span><span class="n">c</span><span class="o">.</span><span class="n">next_sibling</span><span class="p">)</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    문자열“text1”과 “text2”는 <cite>형제 사이가 아니다</cite>. 왜냐하면 부모가 같지 않기 때문이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">sibling_soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">string</span>
<span class="c"># u'text1'</span>

<span class="k">print</span><span class="p">(</span><span class="n">sibling_soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">string</span><span class="o">.</span><span class="n">next_sibling</span><span class="p">)</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                                <p>실제 문서에서, 한 태그의 <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>이나 <tt class="docutils literal"><span class="pre">.previous_sibling</span></tt>은 보통 공백이 포함된 문자열이다.
                                    “three sisters” 문서로 되돌아 가보자:</p>
                                <div class="highlight-python">
                                    <pre>&lt;a href="http://example.com/elsie" class="sister" id="link1"&gt;Elsie&lt;/a&gt;
&lt;a href="http://example.com/lacie" class="sister" id="link2"&gt;Lacie&lt;/a&gt;
&lt;a href="http://example.com/tillie" class="sister" id="link3"&gt;Tillie&lt;/a&gt;</pre>
                                </div>
                                <p>
                                    첫번째 &lt;a&gt; 태그의 <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>이 두 번째 &lt;a&gt; 태그가 될 것이라고 생각하실지 모르겠다. 그러나 실제로는 문자열이 다음 형제이다: 즉, 첫 번째 &lt;a&gt; 태그와 두 번째 태그를 가르는 쉼표와 새줄 문자가 그것이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">link</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="n">link</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>

<span class="n">link</span><span class="o">.</span><span class="n">next_sibling</span>
<span class="c"># u',\n'</span>
</pre>
                                    </div>
                                </div>
                                <p>두 번째 &lt;a&gt; 태그는 실제로는 그 쉼표의 <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">link</span><span class="o">.</span><span class="n">next_sibling</span><span class="o">.</span><span class="n">next_sibling</span>
<span class="c"># &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="next-siblings-and-previous-siblings">
                                <span id="sibling-generators"></span>
                                <h3><tt class="docutils literal"><span class="pre">.next_siblings</span></tt> 그리고 <tt class="docutils literal"><span class="pre">.previous_siblings</span></tt><a class="headerlink" href="#next-siblings-and-previous-siblings" title="Permalink to this headline">¶</a></h3>
                                <p>
                                    태그의 형제들은 <tt class="docutils literal"><span class="pre">.next_siblings</span></tt>이나
                                    <tt class="docutils literal"><span class="pre">.previous_siblings</span></tt>로 반복할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">sibling</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">next_siblings</span><span class="p">:</span>
    <span class="k">print</span><span class="p">(</span><span class="nb">repr</span><span class="p">(</span><span class="n">sibling</span><span class="p">))</span>
<span class="c"># u',\n'</span>
<span class="c"># &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;</span>
<span class="c"># u' and\n'</span>
<span class="c"># &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;</span>
<span class="c"># u'; and they lived at the bottom of a well.'</span>
<span class="c"># None</span>

<span class="k">for</span> <span class="n">sibling</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="nb">id</span><span class="o">=</span><span class="s">"link3"</span><span class="p">)</span><span class="o">.</span><span class="n">previous_siblings</span><span class="p">:</span>
    <span class="k">print</span><span class="p">(</span><span class="nb">repr</span><span class="p">(</span><span class="n">sibling</span><span class="p">))</span>
<span class="c"># ' and\n'</span>
<span class="c"># &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;</span>
<span class="c"># u',\n'</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>
<span class="c"># u'Once upon a time there were three little sisters; and their names were\n'</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="going-back-and-forth">
                            <h2>앞뒤로 가기<a class="headerlink" href="#going-back-and-forth" title="Permalink to this headline">¶</a></h2>
                            <p>“three sisters” 문서의 앞부분을 살펴보자:</p>
                            <div class="highlight-python">
                                <pre>&lt;html&gt;&lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;
&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;</pre>
                            </div>
                            <p>
                                HTML 해석기는 이 문자열들을 취해서 일련의 이벤트로 변환한다: “&lt;html&gt; 태그 열기”, “&lt;head&gt; 태그 열기”, “
                                &lt;title&gt; 태그 열기”, “문자열 추가”, “&lt;title&gt; 태그 닫기”, “&lt;p&gt; 태그 열기”, 등등. 뷰티플수프는 문서의 최초 해석 상태를 재구성하는 도구들을 제공한다.</p>
                            <div class="section" id="next-element-and-previous-element">
                                <span id="element-generators"></span>
                                <h3><tt class="docutils literal"><span class="pre">.next_element</span></tt> 그리고 <tt class="docutils literal"><span class="pre">.previous_element</span></tt><a class="headerlink" href="#next-element-and-previous-element" title="Permalink to this headline">¶</a></h3>
                                <p>
                                    문자열이나 태그의 <tt class="docutils literal"><span class="pre">.next_element</span></tt> 속성은 바로 다음에 해석된 것을 가리킨다.
                                    <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>과 같을 것 같지만, 보통 완전히 다르다.</p>
                                <p>
                                    다음은 “three sisters”문서에서 마지막 &lt;a&gt; 태그이다. 그의 <tt class="docutils literal"><span class="pre">.next_sibling</span></tt>은 문자열이다: &lt;a&gt; 태그가 시작되어 중단되었던 문장의 끝부분이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">last_a_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">"a"</span><span class="p">,</span> <span class="nb">id</span><span class="o">=</span><span class="s">"link3"</span><span class="p">)</span>
<span class="n">last_a_tag</span>
<span class="c"># &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;</span>

<span class="n">last_a_tag</span><span class="o">.</span><span class="n">next_sibling</span>
<span class="c"># '; and they lived at the bottom of a well.'</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    그러나 &lt;a&gt; 태그의 <tt class="docutils literal"><span class="pre">.next_element</span></tt>는, 다시 말해 &lt;a&gt; 태그 바로 다음에 해석된 것은, 나머지 문장이 <cite>아니다</cite>: 그것은 단어 “Tillie”이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">last_a_tag</span><span class="o">.</span><span class="n">next_element</span>
<span class="c"># u'Tillie'</span>
</pre>
                                    </div>
                                </div>
                                <p>그 이유는 원래의 조판에서 단어“Tillie”가 쌍반점보다 먼저 나타나기 때문이다. 해석기는 &lt;a&gt; 태그를 맞이하고, 다음으로 단어 “Tillie”, 그 다음 닫는 &lt;/a&gt; 태그, 그 다음에 쌍반점과 나머지 문장을 맞이한다. 쌍반점은 &lt;a&gt; 태그와 같은 수준에 있지만, 단어 “Tillie”를 먼저 만난다.</p>
                                <p><tt class="docutils literal"><span class="pre">.previous_element</span></tt> 속성은 <tt class="docutils literal"><span class="pre">.next_element</span></tt>와 정반대이다. 바로 앞에 해석된 요소를 가리킨다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">last_a_tag</span><span class="o">.</span><span class="n">previous_element</span>
<span class="c"># u' and\n'</span>
<span class="n">last_a_tag</span><span class="o">.</span><span class="n">previous_element</span><span class="o">.</span><span class="n">next_element</span>
<span class="c"># &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="next-elements-and-previous-elements">
                                <h3><tt class="docutils literal"><span class="pre">.next_elements</span></tt> 그리고 <tt class="docutils literal"><span class="pre">.previous_elements</span></tt><a class="headerlink" href="#next-elements-and-previous-elements" title="Permalink to this headline">¶</a></h3>
                                <p>이제 이해가 가셨으리라 믿는다. 이런 반복자들을 사용하면 문서에서 해석하는 동안 앞 뒤로 이동할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">element</span> <span class="ow">in</span> <span class="n">last_a_tag</span><span class="o">.</span><span class="n">next_elements</span><span class="p">:</span>
    <span class="k">print</span><span class="p">(</span><span class="nb">repr</span><span class="p">(</span><span class="n">element</span><span class="p">))</span>
<span class="c"># u'Tillie'</span>
<span class="c"># u';\nand they lived at the bottom of a well.'</span>
<span class="c"># u'\n\n'</span>
<span class="c"># &lt;p class="story"&gt;...&lt;/p&gt;</span>
<span class="c"># u'...'</span>
<span class="c"># u'\n'</span>
<span class="c"># None</span>
</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" id="searching-the-tree">
                        <h1>트리 탐색하기<a class="headerlink" href="#searching-the-tree" title="Permalink to this headline">¶</a></h1>
                        <p>뷰티플수프에는 해석 트리를 탐색하기 위한 메쏘드들이 많이 정의되어 있지만, 모두 다 거의 비슷하다. 가장 많이 사용되는 두 가지 메쏘드를 설명하는데 시간을 많이 할애할 생각이다: <tt class="docutils literal"><span class="pre">find()</span></tt>와 <tt class="docutils literal"><span class="pre">find_all()</span></tt>이 그것이다. 다른 메쏘드는 거의 똑 같은 인자를 취한다. 그래서 그것들은 그냥 간략하게 다루겠다.</p>
                        <p>다시 또, “three sisters” 문서를 예제로 사용하자:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="n">html_doc</span> <span class="o">=</span> <span class="s">"""</span>
<span class="s">&lt;html&gt;&lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;</span>

<span class="s">&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;Once upon a time there were three little sisters; and their names were</span>
<span class="s">&lt;a href="http://example.com/elsie" class="sister" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="s">&lt;a href="http://example.com/lacie" class="sister" id="link2"&gt;Lacie&lt;/a&gt; and</span>
<span class="s">&lt;a href="http://example.com/tillie" class="sister" id="link3"&gt;Tillie&lt;/a&gt;;</span>
<span class="s">and they lived at the bottom of a well.&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;...&lt;/p&gt;</span>
<span class="s">"""</span>

<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html_doc</span><span class="p">)</span>
</pre>
                            </div>
                        </div>
                        <p><tt class="docutils literal"><span class="pre">find_all()</span></tt>과 같이 인자에 여과기를 건네면, 얼마든지 문서에서 관심있는 부분을 뜯어낼 수 있다.</p>
                        <div class="section" id="kinds-of-filters">
                            <h2>여과기의 종류<a class="headerlink" href="#kinds-of-filters" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">find_all()</span></tt>과 유사 메쏘드들에 관하여 자세히 설명하기 전에 먼저, 이런 메쏘드들에 건넬 수 있는 다양한 여과기의 예제들을 보여주고 싶다. 이런 여과기들은
                                탐색 API 전체에 걸쳐서 나타나고 또 나타난다. 태그의 이름, 그의 속성, 문자열 텍스트, 또는 이런 것들을 조합하여 여과할 수 있다.</p>
                            <div class="section" id="a-string">
                                <span id="id5"></span>
                                <h3>문자열<a class="headerlink" href="#a-string" title="Permalink to this headline">¶</a></h3>
                                <p>
                                    가장 단순한 여과기는 문자열이다. 문자열을 탐색 메쏘드에 건네면 뷰티플수프는 그 정확한 문자열에 맞게 부합을 수행한다. 다음 코드는 문서에서 &lt;b&gt; 태그를 모두 찾는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'b'</span><span class="p">)</span>
<span class="c"># [&lt;b&gt;The Dormouse's story&lt;/b&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>바이트 문자열을 건네면, 뷰티플수프는 그 문자열이 UTF-8로 인코드되어 있다고 간주한다. 이를 피하려면 대신에 유니코드 문자열을 건네면 된다.</p>
                            </div>
                            <div class="section" id="a-regular-expression">
                                <span id="id6"></span>
                                <h3>정규 표현식<a class="headerlink" href="#a-regular-expression" title="Permalink to this headline">¶</a></h3>
                                <p>정규 표현식 객체를 건네면, 뷰티플수프는 <tt class="docutils literal"><span class="pre">match()</span></tt> 메쏘드를 사용하여 그 정규 표현식에 맞게 여과한다. 다음 코드는 이름이 “b”로 시작하는 태그를 모두 찾는다; 이 경우, &lt;body&gt; 태그와 &lt;b&gt; 태그를 찾을 것이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="kn">import</span> <span class="nn">re</span>
<span class="k">for</span> <span class="n">tag</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"^b"</span><span class="p">)):</span>
    <span class="k">print</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">name</span><span class="p">)</span>
<span class="c"># body</span>
<span class="c"># b</span>
</pre>
                                    </div>
                                </div>
                                <p>다음 코드는 이름에 ‘t’가 포함된 태그를 모두 찾는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">tag</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"t"</span><span class="p">)):</span>
    <span class="k">print</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">name</span><span class="p">)</span>
<span class="c"># html</span>
<span class="c"># title</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="a-list">
                                <span id="id7"></span>
                                <h3>리스트<a class="headerlink" href="#a-list" title="Permalink to this headline">¶</a></h3>
                                <p>리스트를 건네면, 뷰티플수프는 그 리스트에 담긴 <cite>항목마다</cite> 문자열 부합을 수행한다. 다음 코드는 모든 &lt;a&gt; 태그 <cite>그리고 </cite> 모든 &lt;b&gt; 태그를 찾는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">([</span><span class="s">"a"</span><span class="p">,</span> <span class="s">"b"</span><span class="p">])</span>
<span class="c"># [&lt;b&gt;The Dormouse's story&lt;/b&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="true">
                                <span id="the-value-true"></span>
                                <h3><tt class="docutils literal"><span class="pre">True</span></tt><a class="headerlink" href="#true" title="Permalink to this headline">¶</a></h3>
                                <p> <tt class="docutils literal"><span class="pre">True</span></tt> 값은 참이면 모두 부합시킨다.
                                    다음 코드는 문서에서 태그를 <cite>모두</cite> 찾지만, 텍스트 문자열은 전혀 찾지 않는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">tag</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="bp">True</span><span class="p">):</span>
    <span class="k">print</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">name</span><span class="p">)</span>
<span class="c"># html</span>
<span class="c"># head</span>
<span class="c"># title</span>
<span class="c"># body</span>
<span class="c"># p</span>
<span class="c"># b</span>
<span class="c"># p</span>
<span class="c"># a</span>
<span class="c"># a</span>
<span class="c"># a</span>
<span class="c"># p</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="a-function">
                                <h3>함수<a class="headerlink" href="#a-function" title="Permalink to this headline">¶</a></h3>
                                <p>다른 어떤 부합 기준도 마음에 안든다면, 요소를 그의 유일한 인자로 취하는 함수를 정의하면 된다. 함수는 인자가 부합하면
                                    <tt class="docutils literal"><span class="pre">True</span></tt>를 돌려주고, 그렇지 않으면 <tt class="docutils literal"><span class="pre">False</span></tt>를 돌려주어야 한다.</p>
                                <p>다음은 태그에 “class”속성이 정의되어 있지만 “id” 속성은 없으면 <tt class="docutils literal"><span class="pre">True</span></tt> 를 돌려주는 함수이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">def</span> <span class="nf">has_class_but_no_id</span><span class="p">(</span><span class="n">tag</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">tag</span><span class="o">.</span><span class="n">has_key</span><span class="p">(</span><span class="s">'class'</span><span class="p">)</span> <span class="ow">and</span> <span class="ow">not</span> <span class="n">tag</span><span class="o">.</span><span class="n">has_key</span><span class="p">(</span><span class="s">'id'</span><span class="p">)</span>
</pre>
                                    </div>
                                </div>
                                <p>이 함수를 <tt class="docutils literal"><span class="pre">find_all()</span></tt>에 건네면 &lt;p&gt; 태그를 모두 얻게 된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">has_class_but_no_id</span><span class="p">)</span>
<span class="c"># [&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;,</span>
<span class="c">#  &lt;p class="story"&gt;Once upon a time there were...&lt;/p&gt;,</span>
<span class="c">#  &lt;p class="story"&gt;...&lt;/p&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>이 함수는 &lt;p&gt; 태그만 얻는다. &lt;a&gt; 태그는 획득하지 않는데, 왜냐하면 “class”와 “id”가 모두 정의되어 있기 때문이다. &lt;html&gt;과 &lt;title&gt;도 얻지 않는데, 왜냐하면 “class”가 정의되어 있지 않기 때문이다.</p>
                                <p>
                                    다음은 태그가 문자열 객체로 둘러 싸여 있으면 <tt class="docutils literal"><span class="pre">True</span></tt>를 돌려주는 함수이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">NavigableString</span>
<span class="k">def</span> <span class="nf">surrounded_by_strings</span><span class="p">(</span><span class="n">tag</span><span class="p">):</span>
    <span class="k">return</span> <span class="p">(</span><span class="nb">isinstance</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">next_element</span><span class="p">,</span> <span class="n">NavigableString</span><span class="p">)</span>
            <span class="ow">and</span> <span class="nb">isinstance</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">previous_element</span><span class="p">,</span> <span class="n">NavigableString</span><span class="p">))</span>

<span class="k">for</span> <span class="n">tag</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">surrounded_by_strings</span><span class="p">):</span>
    <span class="k">print</span> <span class="n">tag</span><span class="o">.</span><span class="n">name</span>
<span class="c"># p</span>
<span class="c"># a</span>
<span class="c"># a</span>
<span class="c"># a</span>
<span class="c"># p</span>
</pre>
                                    </div>
                                </div>
                                <p>이제 탐색 메쏘드들을 자세하게 살펴볼 준비가 되었다.</p>
                            </div>
                        </div>
                        <div class="section" id="find-all">
                            <h2><tt class="docutils literal"><span class="pre">find_all()</span></tt><a class="headerlink" href="#find-all" title="Permalink to this headline">¶</a></h2>
                            <p>서명: find_all(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#recursive"><em>recursive</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#limit"><em>limit</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>
                                <tt class="docutils literal"><span class="pre">find_all()</span></tt> 메쏘드는 태그의 후손들을 찾아서 지정한 여과기에 부합하면 <cite>모두</cite> 추출한다. <a class="reference internal" href="#kinds-of-filters">몇 가지 여과기</a>에서 예제들을 제시했지만, 여기에 몇 가지 더 보여주겠다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"title"</span><span class="p">)</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="s">"title"</span><span class="p">)</span>
<span class="c"># [&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"a"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="nb">id</span><span class="o">=</span><span class="s">"link2"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;]</span>

<span class="kn">import</span> <span class="nn">re</span>
<span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"sisters"</span><span class="p">))</span>
<span class="c"># u'Once upon a time there were three little sisters; and their names were\n'</span>
</pre>
                                </div>
                            </div>
                            <p>어떤 것은 익숙하지만, 다른 것들은 새로울 것이다. <tt class="docutils literal"><span class="pre">text</span></tt> 혹은 <tt class="docutils literal"><span class="pre">id</span></tt>에 값을 건넨다는 것이 무슨 뜻인가? 왜 다음
                                <tt class="docutils literal"><span class="pre">find_all("p",</span> <span class="pre">"title")</span></tt>은 CSS 클래스가 “title”인 &lt;p&gt; 태그를 찾는가?
                                <tt class="docutils literal"><span class="pre">find_all()</span></tt>에 건넨 인자들을 살펴보자.</p>
                            <div class="section" id="the-name-argument">
                                <span id="id8"></span>
                                <h3> <tt class="docutils literal"><span class="pre">name</span></tt> 인자<a class="headerlink" href="#the-name-argument" title="Permalink to this headline">¶</a></h3>
                                <p>인자를 <tt class="docutils literal"><span class="pre">name</span></tt>에 건네면 뷰티플수프는 특정 이름을 가진 태그에만 관심을 가진다. 이름이 부합되지 않는 태그와 마찬가지로, 텍스트 문자열은 무시된다.</p>
                                <p>다음은 가장 단순한 사용법이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"title"</span><span class="p">)</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p><a class="reference internal" href="#kinds-of-filters">여과기의 종류</a>에서 보았듯이 <tt class="docutils literal"><span class="pre">name</span></tt>에 건넨 값이 <a class="reference internal" href="#a-string">문자열</a>, <a class="reference internal" href="#a-regular-expression">정규 표현식</a>, <a class="reference internal" href="#a-list">리스트</a>, <a class="reference internal" href="#a-function">함수</a>, 또는 <a class="reference internal" href="#the-value-true">True</a> 값일 수 있다는 사실을 기억하자.</p>
                            </div>
                            <div class="section" id="the-keyword-arguments">
                                <span id="kwargs"></span>
                                <h3>키워드 인자<a class="headerlink" href="#the-keyword-arguments" title="Permalink to this headline">¶</a></h3>
                                <p>인지되지 않는 인자는 한 태그의 속성중 하나에 대한 여과기로 변환된다.
                                    <tt class="docutils literal"><span class="pre">id</span></tt>라는 인자에 대하여 값을 하나 건네면, 뷰티플수프는 각 태그의 ‘id’속성에 대하여 걸러낸다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="nb">id</span><span class="o">=</span><span class="s">'link2'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p><tt class="docutils literal"><span class="pre">href</span></tt>에 대하여 값을 건네면, 뷰티플수프는 각 태그의 ‘href’속성에 대하여 걸러낸다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">href</span><span class="o">=</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"elsie"</span><span class="p">))</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p><a class="reference internal" href="#a-string">문자열</a>, <a class="reference internal" href="#a-regular-expression">정규 표현식</a>, <a class="reference internal" href="#a-list">리스트</a>, <a class="reference internal" href="#a-function">함수</a>, 또는 <a class="reference internal" href="#the-value-true">True 값</a>에 기반하여 속성을 걸러낼 수 있다.</p>
                                <p>다음 코드는 그 값이 무엇이든 상관없이, <tt class="docutils literal"><span class="pre">id</span></tt> 속성을 가진 태그를 모두 찾는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="nb">id</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>하나 이상의 키워드 인자를 건네면 한 번에 여러 값들을 걸러낼 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">href</span><span class="o">=</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"elsie"</span><span class="p">),</span> <span class="nb">id</span><span class="o">=</span><span class="s">'link1'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;three&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="searching-by-css-class">
                                <span id="attrs"></span>
                                <h3>CSS 클래스로 탐색하기<a class="headerlink" href="#searching-by-css-class" title="Permalink to this headline">¶</a></h3>
                                <p>특정 CSS 클래스를 가진 태그를 탐색하면 아주 유용하지만, CSS 속성의 이름인 “class”는 파이썬에서 예약어이다. 키워드 인자로 <tt class="docutils literal"><span class="pre">class</span></tt>를 사용하면 구문 에러를 만나게 된다. 뷰티플 4.1.2 부터, CSS 클래스로 검색할 수 있는데 <tt class="docutils literal"><span class="pre">class_</span></tt> 키워드 인자를 사용하면 된다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"a"</span><span class="p">,</span> <span class="n">class_</span><span class="o">=</span><span class="s">"sister"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>다른 키워드 인자와 마찬가지로, <tt class="docutils literal"><span class="pre">class_</span></tt>에 문자열, 정규 표현식, 함수, 또는 <tt class="docutils literal"><span class="pre">True</span></tt>를 건넬 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">class_</span><span class="o">=</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"itl"</span><span class="p">))</span>
<span class="c"># [&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;]</span>

<span class="k">def</span> <span class="nf">has_six_characters</span><span class="p">(</span><span class="n">css_class</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">css_class</span> <span class="ow">is</span> <span class="ow">not</span> <span class="bp">None</span> <span class="ow">and</span> <span class="nb">len</span><span class="p">(</span><span class="n">css_class</span><span class="p">)</span> <span class="o">==</span> <span class="mi">6</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">class_</span><span class="o">=</span><span class="n">has_six_characters</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p><a class="reference internal" href="#multivalue"><em>기억하자</em></a>. 하나의 태그에 그의 “class” 속성에 대하여 값이 여러개 있을 수 있다. 특정 CSS 클래스에 부합하는 태그를 탐색할 때, 그의 CSS 클래스들 <cite>모두</cite>에 대하여 부합을 수행하는 것이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">css_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;p class="body strikeout"&gt;&lt;/p&gt;'</span><span class="p">)</span>
<span class="n">css_soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="n">class_</span><span class="o">=</span><span class="s">"strikeout"</span><span class="p">)</span>
<span class="c"># [&lt;p class="body strikeout"&gt;&lt;/p&gt;]</span>

<span class="n">css_soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="n">class_</span><span class="o">=</span><span class="s">"body"</span><span class="p">)</span>
<span class="c"># [&lt;p class="body strikeout"&gt;&lt;/p&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    <tt class="docutils literal"><span class="pre">class</span></tt> 속성의 정확한 문자열 값을 탐색할 수도 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">css_soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="n">class_</span><span class="o">=</span><span class="s">"body strikeout"</span><span class="p">)</span>
<span class="c"># [&lt;p class="body strikeout"&gt;&lt;/p&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    그러나 문자열 값을 변형해서 탐색하면 작동하지 않는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">css_soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="n">class_</span><span class="o">=</span><span class="s">"strikeout body"</span><span class="p">)</span>
<span class="c"># []</span>
</pre>
                                    </div>
                                </div>
                                <p><tt class="docutils literal"><span class="pre">class_</span></tt>를 위한 간편한 방법이 뷰티플수프 모든 버전에 존재한다. <tt class="docutils literal"><span class="pre">find()</span></tt>-유형의 메쏘드에 건네는 두 번째 인자는 <tt class="docutils literal"><span class="pre">attrs</span></tt>인데, 문자열을 <tt class="docutils literal"><span class="pre">attrs</span></tt>에 건네면 그 문자열을 CSS 클래스처럼 탐색한다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"a"</span><span class="p">,</span> <span class="s">"sister"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>정규 표현식, 함수 또는 사전을 제외하고 True–유형으로도 건넬 수 있다. 무엇을 건네든지 그 CSS 클래스를 탐색하는데 사용된다. <tt class="docutils literal"><span class="pre">class_</span></tt> 키워드 인자에 건넬 때와 똑같다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"itl"</span><span class="p">))</span>
<span class="c"># [&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;]</span>
</pre>
                                    </div>
                                </div>
                                <p>사전을 <tt class="docutils literal"><span class="pre">attrs</span></tt>에 건네면, 단지 그 CSS 클래스만 아니라 한번에 많은 HTML 속성을 탐색할 수 있다. 다음 코드 두 줄은 동등하다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">href</span><span class="o">=</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"elsie"</span><span class="p">),</span> <span class="nb">id</span><span class="o">=</span><span class="s">'link1'</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">attrs</span><span class="o">=</span><span class="p">{</span><span class="s">'href'</span> <span class="p">:</span> <span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"elsie"</span><span class="p">),</span> <span class="s">'id'</span><span class="p">:</span> <span class="s">'link1'</span><span class="p">})</span>
</pre>
                                    </div>
                                </div>
                                <p>이것은 별로 유용한 특징은 아니다. 왜냐하면 보통 키워드 인자를 사용하는 편이 더 쉽기 때문이다.</p>
                            </div>
                            <div class="section" id="the-text-argument">
                                <span id="text"></span>
                                <h3> <tt class="docutils literal"><span class="pre">text</span></tt> 인자<a class="headerlink" href="#the-text-argument" title="Permalink to this headline">¶</a></h3>
                                <p>
                                    <tt class="docutils literal"><span class="pre">text</span></tt> 인자로 태그 대신 문자열을 탐색할 수 있다. <tt class="docutils literal"><span class="pre">name</span></tt>과 키워드 인자에서처럼, <a class="reference internal" href="#a-string">문자열</a>, <a class="reference internal" href="#a-regular-expression">정규 표현식</a>, <a class="reference internal" href="#a-list">리스트</a>, <a class="reference internal" href="#a-function">함수</a>, 또는 <a class="reference internal" href="#the-value-true">True 값</a>을 건넬 수 있다.
                                    다음은 몇 가지 예이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="s">"Elsie"</span><span class="p">)</span>
<span class="c"># [u'Elsie']</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="p">[</span><span class="s">"Tillie"</span><span class="p">,</span> <span class="s">"Elsie"</span><span class="p">,</span> <span class="s">"Lacie"</span><span class="p">])</span>
<span class="c"># [u'Elsie', u'Lacie', u'Tillie']</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="n">re</span><span class="o">.</span><span class="n">compile</span><span class="p">(</span><span class="s">"Dormouse"</span><span class="p">))</span>
<span class="p">[</span><span class="s">u"The Dormouse's story"</span><span class="p">,</span> <span class="s">u"The Dormouse's story"</span><span class="p">]</span>

<span class="k">def</span> <span class="nf">is_the_only_string_within_a_tag</span><span class="p">(</span><span class="n">s</span><span class="p">):</span>
    <span class="sd">"""Return True if this string is the only child of its parent tag."""</span>
    <span class="k">return</span> <span class="p">(</span><span class="n">s</span> <span class="o">==</span> <span class="n">s</span><span class="o">.</span><span class="n">parent</span><span class="o">.</span><span class="n">string</span><span class="p">)</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="n">is_the_only_string_within_a_tag</span><span class="p">)</span>
<span class="c"># [u"The Dormouse's story", u"The Dormouse's story", u'Elsie', u'Lacie', u'Tillie', u'...']</span>
</pre>
                                    </div>
                                </div>
                                <p>
                                    <tt class="docutils literal"><span class="pre">text</span></tt>가 문자열 찾기에 사용되지만, 태그를 찾는 인자와 결합해 사용할 수 있다: 뷰티플수프는 <tt class="docutils literal"><span class="pre">text</span></tt>에 대한 값에 자신의 <tt class="docutils literal"><span class="pre">.string</span></tt>이 부합하는 태그를 모두 찾는다.
                                    다음 코드는 자신의 <tt class="docutils literal"><span class="pre">.string</span></tt>이 “Elsie”인 &lt;a&gt; 태그를 찾는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"a"</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="s">"Elsie"</span><span class="p">)</span>
<span class="c"># [&lt;a href="http://example.com/elsie" class="sister" id="link1"&gt;Elsie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="the-limit-argument">
                                <span id="limit"></span>
                                <h3><tt class="docutils literal"><span class="pre">limit</span></tt> 인자<a class="headerlink" href="#the-limit-argument" title="Permalink to this headline">¶</a></h3>
                                <p><tt class="docutils literal"><span class="pre">find_all()</span></tt> 메쏘드는 여과기에 부합하는 문자열과 태그를 모두 돌려준다. 이런 방법은 문서가 방대하면 시간이 좀 걸릴 수 있다. 결과가 <cite>모조리</cite> 필요한 것은 아니라면, <tt class="docutils literal"><span class="pre">limit</span></tt>에 숫자를 건넬 수 있다. 이 방법은 SQL에서의 LIMIT 키워드와 정확히 똑같이 작동한다. 뷰티플수프에게 특정 횟수를 넘어서면 결과 수집을 중지하라고 명령한다.</p>
                                <p>“three sisters” 문서에 링크가 세 개 있지만, 다음 코드는 앞의 두 링크만 찾는다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"a"</span><span class="p">,</span> <span class="n">limit</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;]</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="the-recursive-argument">
                                <span id="recursive"></span>
                                <h3> <tt class="docutils literal"><span class="pre">recursive</span></tt> 인자<a class="headerlink" href="#the-recursive-argument" title="Permalink to this headline">¶</a></h3>
                                <p><tt class="docutils literal"><span class="pre">mytag.find_all()</span></tt>를 호출하면, 뷰티플수프는 <tt class="docutils literal"><span class="pre">mytag</span></tt>의 후손을 모두 조사한다: 그의 자손, 그 자손의 자손, 그리고 등등. 뷰티플수프에게 직계 자손만 신경쓰라고 시키고 싶다면, <tt class="docutils literal"><span class="pre">recursive=False</span></tt>를 건네면 된다. 다음에 차이점을 살펴보자:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">soup</span><span class="o">.</span><span class="n">html</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"title"</span><span class="p">)</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">html</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"title"</span><span class="p">,</span> <span class="n">recursive</span><span class="o">=</span><span class="bp">False</span><span class="p">)</span>
<span class="c"># []</span>
</pre>
                                    </div>
                                </div>
                                <p>다음은 예제 문서의 일부이다:</p>
                                <div class="highlight-python">
                                    <pre>&lt;html&gt;
 &lt;head&gt;
  &lt;title&gt;
   The Dormouse's story
  &lt;/title&gt;
 &lt;/head&gt;
...</pre>
                                </div>
                                <p>
                                    &lt;title&gt; 태그는 &lt;html&gt; 태그 아래에 있지만, &lt;html&gt; 태그 <cite>바로 아래에 있는 것은 아니다</cite>: &lt;head&gt; 태그가 사이에 있다. 뷰티플수프는 &lt;html&gt; 태그의 모든 후손을 찾아 보도록 허용해야만 &lt;title&gt; 태그를 발견한다. 그러나 <tt class="docutils literal"><span class="pre">recursive=False</span></tt>가 검색을
                                    &lt;html&gt; 태그의 직접 자손으로 제한하기 때문에, 아무것도 찾지 못한다.</p>
                                <p>뷰티플수프는 트리-탐색 메쏘드들을 다양하게 제공한다 (아래에 다룸). 대부분 <tt class="docutils literal"><span class="pre">find_all()</span></tt>과 같은 인자를 취한다: <tt class="docutils literal"><span class="pre">name</span></tt>,
                                    <tt class="docutils literal"><span class="pre">attrs</span></tt>, <tt class="docutils literal"><span class="pre">text</span></tt>, <tt class="docutils literal"><span class="pre">limit</span></tt>, 그리고 키워드 인자를 취한다. 그러나 <tt class="docutils literal"><span class="pre">recursive</span></tt> 인자는 다르다: <tt class="docutils literal"><span class="pre">find_all()</span></tt>과 <tt class="docutils literal"><span class="pre">find()</span></tt>만 유일하게 지원한다. <tt class="docutils literal"><span class="pre">recursive=False</span></tt>를 <tt class="docutils literal"><span class="pre">find_parents()</span></tt> 같은 인자에 건네면 별로 유용하지 않을 것이다.</p>
                            </div>
                        </div>
                        <div class="section" id="calling-a-tag-is-like-calling-find-all">
                            <h2>태그를 호출하는 것은 <tt class="docutils literal"><span class="pre">find_all()</span></tt>을 호출하는 것과 똑같다<a class="headerlink" href="#calling-a-tag-is-like-calling-find-all" title="Permalink to this headline">¶</a></h2>
                            <p>
                                <tt class="docutils literal"><span class="pre">find_all()</span></tt>는 뷰티플수프 탐색 API에서 가장 많이 사용되므로, 그에 대한 간편 방법을 사용할 수 있다. <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체나 <tt class="docutils literal"><span class="pre">Tag</span></tt> 객체를 마치 함수처럼 다루면, 그 객체에 대하여 <tt class="docutils literal"><span class="pre">find_all()</span></tt>를 호출하는 것과 똑같다. 다음 코드 두 줄은 동등하다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">"a"</span><span class="p">)</span>
<span class="n">soup</span><span class="p">(</span><span class="s">"a"</span><span class="p">)</span>
</pre>
                                </div>
                            </div>
                            <p>다음 두 줄도 역시 동등하다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">title</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">title</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="find">
                            <h2><tt class="docutils literal"><span class="pre">find()</span></tt><a class="headerlink" href="#find" title="Permalink to this headline">¶</a></h2>
                            <p>서명: find(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#recursive"><em>recursive</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>
                                <tt class="docutils literal"><span class="pre">find_all()</span></tt> 메쏘드는 전체 문서를 훓어서 결과를 찾지만, 어떤 경우는 결과 하나만 원할 수도 있다. 문서에 오직 &lt;body&gt; 태그가 하나 뿐임을 안다면, 전체 문서를 훓어 가면서 더 찾는 것은 시간 낭비이다. <tt class="docutils literal"><span class="pre">find_all</span></tt> 메쏘드를 호출할 때마다, <tt class="docutils literal"><span class="pre">limit=1</span></tt>을 건네기 보다는 <tt class="docutils literal"><span class="pre">find()</span></tt> 메쏘드를 사용하는 편이 좋다. 다음 코드 두 줄은 <cite>거의 동등하다</cite>:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'title'</span><span class="p">,</span> <span class="n">limit</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">'title'</span><span class="p">)</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>유일한 차이점은 <tt class="docutils literal"><span class="pre">find_all()</span></tt> 메쏘드가 단 한개의 결과만 담고 있는 리스트를 돌려주고, <tt class="docutils literal"><span class="pre">find()</span></tt>는 그냥 그 결과를 돌려준다는 점이다.</p>
                            <p><tt class="docutils literal"><span class="pre">find_all()</span></tt>이 아무것도 찾을 수 없다면, 빈 리스트를 돌려준다. <tt class="docutils literal"><span class="pre">find()</span></tt>가 아무것도 찾을 수 없다면, <tt class="docutils literal"><span class="pre">None</span></tt>을 돌려준다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">"nosuchtag"</span><span class="p">))</span>
<span class="c"># None</span>
</pre>
                                </div>
                            </div>
                            <p>
                                <a class="reference internal" href="#navigating-using-tag-names">태그 이름을 사용하여 항해하기</a>에서 <tt class="docutils literal"><span class="pre">soup.head.title</span></tt> 트릭을 기억하시는지? 그 트릭은 반복적으로 <tt class="docutils literal"><span class="pre">find()</span></tt> 를 호출해서 작동한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">head</span><span class="o">.</span><span class="n">title</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>

<span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">"head"</span><span class="p">)</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">"title"</span><span class="p">)</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="find-parents-and-find-parent">
                            <h2><tt class="docutils literal"><span class="pre">find_parents()</span></tt> 그리고 <tt class="docutils literal"><span class="pre">find_parent()</span></tt><a class="headerlink" href="#find-parents-and-find-parent" title="Permalink to this headline">¶</a></h2>
                            <p>서명: find_parents(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#limit"><em>limit</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>서명: find_parent(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>
                                많은 시간을 할애해 <tt class="docutils literal"><span class="pre">find_all()</span></tt>과
                                <tt class="docutils literal"><span class="pre">find()</span></tt>를 다루었다. 뷰티플수프 API에는 트리 탐색을 위해 다른 메쏘드가 열가지 정의되어 있지만, 걱정하지 말자. 이런 메쏘드중 다섯가지는 기본적으로 <tt class="docutils literal"><span class="pre">find_all()</span></tt>과 똑같고, 다른 다섯가지는 기본적으로 <tt class="docutils literal"><span class="pre">find()</span></tt>와 똑같다. 유일한 차이점은 트리의 어떤 부분을 검색할 것인가에 있다.</p>
                            <p>
                                먼저 <tt class="docutils literal"><span class="pre">find_parents()</span></tt>와
                                <tt class="docutils literal"><span class="pre">find_parent()</span></tt>를 살펴보자. <tt class="docutils literal"><span class="pre">find_all()</span></tt>과 <tt class="docutils literal"><span class="pre">find()</span></tt>는 트리를 내려 오면서, 태그의 후손들을 찾음을 기억하자. 다음 메쏘드들은 정 반대로 일을 한다: 트리를 <cite>위로</cite> 올라가며, 한 태그의 (또는 문자열의) 부모를 찾는다. 시험해 보자.“three daughters” 문서 깊숙히 묻힌 문자열부터 시작해 보자:</p>
                            <div class="highlight-python">
                                <pre>a_string = soup.find(text="Lacie")
a_string
# u'Lacie'

a_string.find_parents("a")
# [&lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;]

a_string.find_parent("p")
# &lt;p class="story"&gt;Once upon a time there were three little sisters; and their names were
#  &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,
#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt; and
#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;;
#  and they lived at the bottom of a well.&lt;/p&gt;

a_string.find_parents("p", class="title")
# []</pre>
                            </div>
                            <p>세가지 &lt;a&gt; 태그 중 하나는 해당 문자열의 직계 부모이다. 그래서 탐색해서 그것을 찾는다. 세가지 &lt;p&gt; 태그 중 하나는 그 문자열의 방계 부모이고, 그것도 역시 잘 탐색한다. CSS 클래스가“title”인 &lt;p&gt; 태그가 문서 <cite>어딘가에</cite> 존재하지만, 그것은 이 문자열의 부모가 아니므로, <tt class="docutils literal"><span class="pre">find_parents()</span></tt>로 부모를 찾을 수 없다.</p>
                            <p>아마도 <tt class="docutils literal"><span class="pre">find_parent()</span></tt>와 <tt class="docutils literal"><span class="pre">find_parents()</span></tt>, 그리고 앞서 언급한 <a class="reference internal" href="#parent">.parent</a>와 <a class="reference internal" href="#parents">.parents</a> 속성 사이에 관련이 있으리라 짐작했을 것이다. 이 관련은 매우 강력하다. 이 탐색 메쏘드들은 실제로 <tt class="docutils literal"><span class="pre">.parents</span></tt>로 부모들을 모두 찾아서, 제공된 여과기준에 부합하는지 하나씩 점검한다.</p>
                        </div>
                        <div class="section" id="find-next-siblings-and-find-next-sibling">
                            <h2><tt class="docutils literal"><span class="pre">find_next_siblings()</span></tt> 그리고 <tt class="docutils literal"><span class="pre">find_next_sibling()</span></tt><a class="headerlink" href="#find-next-siblings-and-find-next-sibling" title="Permalink to this headline">¶</a></h2>
                            <p>서명: find_next_siblings(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#limit"><em>limit</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>서명: find_next_sibling(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>이 메쏘드들은 <a class="reference internal" href="#sibling-generators"><em>.next_siblings</em></a>을 사용하여 트리에서 한 요소의 나머지 형제들을 반복한다. <tt class="docutils literal"><span class="pre">find_next_siblings()</span></tt> 메쏘드는 부합하는 형제들을 모두 돌려주고, <tt class="docutils literal"><span class="pre">find_next_sibling()</span></tt> 메쏘드는 그 중 첫 째만 돌려준다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">first_link</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="n">first_link</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>

<span class="n">first_link</span><span class="o">.</span><span class="n">find_next_siblings</span><span class="p">(</span><span class="s">"a"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">first_story_paragraph</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="s">"story"</span><span class="p">)</span>
<span class="n">first_story_paragraph</span><span class="o">.</span><span class="n">find_next_sibling</span><span class="p">(</span><span class="s">"p"</span><span class="p">)</span>
<span class="c"># &lt;p class="story"&gt;...&lt;/p&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="find-previous-siblings-and-find-previous-sibling">
                            <h2><tt class="docutils literal"><span class="pre">find_previous_siblings()</span></tt> 그리고 <tt class="docutils literal"><span class="pre">find_previous_sibling()</span></tt><a class="headerlink" href="#find-previous-siblings-and-find-previous-sibling" title="Permalink to this headline">¶</a></h2>
                            <p>서명: find_previous_siblings(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#limit"><em>limit</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>서명: find_previous_sibling(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>
                                이 메쏘드들은 <a class="reference internal" href="#sibling-generators"><em>.previous_siblings</em></a>를 사용하여 트리에서 한 원소의 앞에 나오는 형제들을 반복한다. <tt class="docutils literal"><span class="pre">find_previous_siblings()</span></tt> 메쏘는 부합하는 형제들을 모두 돌려주고, <tt class="docutils literal"><span class="pre">find_previous_sibling()</span></tt>는 첫 째만 돌려준다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">last_link</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">"a"</span><span class="p">,</span> <span class="nb">id</span><span class="o">=</span><span class="s">"link3"</span><span class="p">)</span>
<span class="n">last_link</span>
<span class="c"># &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;</span>

<span class="n">last_link</span><span class="o">.</span><span class="n">find_previous_siblings</span><span class="p">(</span><span class="s">"a"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;]</span>

<span class="n">first_story_paragraph</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">"p"</span><span class="p">,</span> <span class="s">"story"</span><span class="p">)</span>
<span class="n">first_story_paragraph</span><span class="o">.</span><span class="n">find_previous_sibling</span><span class="p">(</span><span class="s">"p"</span><span class="p">)</span>
<span class="c"># &lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="find-all-next-and-find-next">
                            <h2><tt class="docutils literal"><span class="pre">find_all_next()</span></tt> 그리고 <tt class="docutils literal"><span class="pre">find_next()</span></tt><a class="headerlink" href="#find-all-next-and-find-next" title="Permalink to this headline">¶</a></h2>
                            <p>서명: find_all_next(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#limit"><em>limit</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>서명: find_next(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>
                                이 메쏘드들은 <a class="reference internal" href="#element-generators"><em>.next_elements</em></a>를 사용하여 문서에서 한 태그의 뒤에 오는 태그이든 문자열이든 무엇이든지 반복한다. <tt class="docutils literal"><span class="pre">find_all_next()</span></tt> 메쏘드는 부합하는 것들을 모두 돌려주고, <tt class="docutils literal"><span class="pre">find_next()</span></tt>는 첫 번째 부합하는 것만 돌려준다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">first_link</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="n">first_link</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>

<span class="n">first_link</span><span class="o">.</span><span class="n">find_all_next</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="bp">True</span><span class="p">)</span>
<span class="c"># [u'Elsie', u',\n', u'Lacie', u' and\n', u'Tillie',</span>
<span class="c">#  u';\nand they lived at the bottom of a well.', u'\n\n', u'...', u'\n']</span>

<span class="n">first_link</span><span class="o">.</span><span class="n">find_next</span><span class="p">(</span><span class="s">"p"</span><span class="p">)</span>
<span class="c"># &lt;p class="story"&gt;...&lt;/p&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>첫 예제에서, 문자열 “Elsie”가 나타났다. 물론 그 안에 우리가 시작했던 &lt;a&gt; 태그 안에 포함되어 있음에도 불구하고 말이다.
                                두 번째 예제를 보면, 문서의 마지막 &lt;p&gt; 태그가 나타났다. 물론 트리에서 우리가 시작했던 &lt;a&gt; 태그와 같은 부분에 있지 않음에도 불구하고 말이다. 이런 메쏘드들에게, 유일한 관심 사항은 원소가 여과 기준에 부합하는가 그리고 시작 원소 말고 나중에 문서에 나타나는가이다.</p>
                        </div>
                        <div class="section" id="find-all-previous-and-find-previous">
                            <h2><tt class="docutils literal"><span class="pre">find_all_previous()</span></tt> 그리고 <tt class="docutils literal"><span class="pre">find_previous()</span></tt><a class="headerlink" href="#find-all-previous-and-find-previous" title="Permalink to this headline">¶</a></h2>
                            <p>서명: find_all_previous(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#limit"><em>limit</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>서명: find_previous(<a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>)</p>
                            <p>
                                이 메쏘드들은 <a class="reference internal" href="#element-generators"><em>.previous_elements</em></a>를 사용하여 문서에서 앞에 오는 태그나 문자열들을 반복한다. <tt class="docutils literal"><span class="pre">find_all_previous()</span></tt> 메쏘드는 부합하는 모든 것을 돌려주고,
                                <tt class="docutils literal"><span class="pre">find_previous()</span></tt>는 첫 번째 부합만 돌려준다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">first_link</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="n">first_link</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;</span>

<span class="n">first_link</span><span class="o">.</span><span class="n">find_all_previous</span><span class="p">(</span><span class="s">"p"</span><span class="p">)</span>
<span class="c"># [&lt;p class="story"&gt;Once upon a time there were three little sisters; ...&lt;/p&gt;,</span>
<span class="c">#  &lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;]</span>

<span class="n">first_link</span><span class="o">.</span><span class="n">find_previous</span><span class="p">(</span><span class="s">"title"</span><span class="p">)</span>
<span class="c"># &lt;title&gt;The Dormouse's story&lt;/title&gt;</span>
</pre>
                                </div>
                            </div>
                            <p><tt class="docutils literal"><span class="pre">find_all_previous("p")</span></tt>를 호출하면 문서에서 첫 번째 문단(class=”title”)을 찾지만, 두 번째 문단 &lt;p&gt; 태그도 찾는다. 이 안에 우리가 시작한 &lt;a&gt; 태그가 들어 있다. 이것은 그렇게 놀랄 일이 아니다: 시작한 위치보다 더 앞에 나타나는 태그들을 모두 찾고 있는 중이다.
                                &lt;a&gt; 태그가 포함된 &lt;p&gt; 태그는 자신 안에 든 &lt;a&gt; 태그보다 먼저 나타나는 것이 당연하다.</p>
                        </div>
                        <div class="section" id="css-selectors">
                            <h2>CSS 선택자<a class="headerlink" href="#css-selectors" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플수프는 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.w3.org/TR/CSS2/selector.html">CSS 선택자 표준</a>의 부분집합을 지원한다. 그냥 문자열로 선택자를 구성하고 그것을 <tt class="docutils literal"><span class="pre">Tag</span></tt>의 <tt class="docutils literal"><span class="pre">.select()</span></tt> 메쏘드 또는 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체 자체에 건네면 된다.</p>
                            <p>다음과 같이 태그를 검색할 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"title"</span><span class="p">)</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>
</pre>
                                </div>
                            </div>
                            <p>다른 태그 아래의 태그를 찾을 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"body a"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie"  id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"html head title"</span><span class="p">)</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>
</pre>
                                </div>
                            </div>
                            <p>다른 태그 <cite>바로 아래에 있는</cite> 태그를 찾을 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"head &gt; title"</span><span class="p">)</span>
<span class="c"># [&lt;title&gt;The Dormouse's story&lt;/title&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"p &gt; a"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie"  id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"body &gt; a"</span><span class="p">)</span>
<span class="c"># []</span>
</pre>
                                </div>
                            </div>
                            <p>CSS 클래스로 태그를 찾는다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">".sister"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"[class~=sister]"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                </div>
                            </div>
                            <p>ID로 태그를 찾는다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"#link1"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">"a#link2"</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;]</span>
</pre>
                                </div>
                            </div>
                            <p>속성이 존재하는지 테스트 한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">'a[href]'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>
</pre>
                                </div>
                            </div>
                            <p>속성 값으로 태그를 찾는다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">'a[href="http://example.com/elsie"]'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">'a[href^="http://example.com/"]'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;Lacie&lt;/a&gt;,</span>
<span class="c">#  &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">'a[href$="tillie"]'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;Tillie&lt;/a&gt;]</span>

<span class="n">soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">'a[href*=".com/el"]'</span><span class="p">)</span>
<span class="c"># [&lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;Elsie&lt;/a&gt;]</span>
</pre>
                                </div>
                            </div>
                            <p>언어 코덱을 일치 시킨다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">multilingual_markup</span> <span class="o">=</span> <span class="s">"""</span>
<span class="s"> &lt;p lang="en"&gt;Hello&lt;/p&gt;</span>
<span class="s"> &lt;p lang="en-us"&gt;Howdy, y'all&lt;/p&gt;</span>
<span class="s"> &lt;p lang="en-gb"&gt;Pip-pip, old fruit&lt;/p&gt;</span>
<span class="s"> &lt;p lang="fr"&gt;Bonjour mes amis&lt;/p&gt;</span>
<span class="s">"""</span>
<span class="n">multilingual_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">multilingual_markup</span><span class="p">)</span>
<span class="n">multilingual_soup</span><span class="o">.</span><span class="n">select</span><span class="p">(</span><span class="s">'p[lang|=en]'</span><span class="p">)</span>
<span class="c"># [&lt;p lang="en"&gt;Hello&lt;/p&gt;,</span>
<span class="c">#  &lt;p lang="en-us"&gt;Howdy, y'all&lt;/p&gt;,</span>
<span class="c">#  &lt;p lang="en-gb"&gt;Pip-pip, old fruit&lt;/p&gt;]</span>
</pre>
                                </div>
                            </div>
                            <p>이것은 CSS 선택자 구문을 알고 있는 사용자에게 유용하다. 이 모든 일들을 뷰티플수프 API로 할 수 있다. CSS 선택자만 필요하다면, lxml을 직접 사용하는 편이 좋을 것이다. 왜냐하면, 더 빠르기 때문이다. 그러나 이렇게 하면 간단한 CSS 선택자들을 뷰티플수프 API와 <cite>조합해 사용할 수 있다</cite>.</p>
                        </div>
                    </div>
                    <div class="section" id="modifying-the-tree">
                        <h1>트리 변형하기<a class="headerlink" href="#modifying-the-tree" title="Permalink to this headline">¶</a></h1>
                        <p>뷰티플수프의 강점은 해석 트리를 검색 하는데에 있다. 그러나 또한 해석 트리를 변형해서 새로운 HTML 또는 XML 문서로 저장할 수도 있다.</p>
                        <div class="section" id="changing-tag-names-and-attributes">
                            <h2>태그 이름과 속성 바꾸기<a class="headerlink" href="#changing-tag-names-and-attributes" title="Permalink to this headline">¶</a></h2>
                            <p>이에 관해서는 <a class="reference internal" href="#attributes">속성</a> 부분에서 다룬 바 있지만, 다시 반복할 가치가 있다. 태그 이름을 바꾸고 그의 속성 값들을 바꾸며, 속성을 새로 추가하고, 속성을 삭제할 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;b class="boldest"&gt;Extremely bold&lt;/b&gt;'</span><span class="p">)</span>
<span class="n">tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">b</span>

<span class="n">tag</span><span class="o">.</span><span class="n">name</span> <span class="o">=</span> <span class="s">"blockquote"</span>
<span class="n">tag</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span> <span class="o">=</span> <span class="s">'verybold'</span>
<span class="n">tag</span><span class="p">[</span><span class="s">'id'</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
<span class="n">tag</span>
<span class="c"># &lt;blockquote class="verybold" id="1"&gt;Extremely bold&lt;/blockquote&gt;</span>

<span class="k">del</span> <span class="n">tag</span><span class="p">[</span><span class="s">'class'</span><span class="p">]</span>
<span class="k">del</span> <span class="n">tag</span><span class="p">[</span><span class="s">'id'</span><span class="p">]</span>
<span class="n">tag</span>
<span class="c"># &lt;blockquote&gt;Extremely bold&lt;/blockquote&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="modifying-string">
                            <h2><tt class="docutils literal"><span class="pre">.string</span></tt> 변경하기<a class="headerlink" href="#modifying-string" title="Permalink to this headline">¶</a></h2>
                            <p>태그의 <tt class="docutils literal"><span class="pre">.string</span></tt> 속성을 설정하면, 태그의 내용이 주어진 문자열로 교체된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>

<span class="n">tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="n">tag</span><span class="o">.</span><span class="n">string</span> <span class="o">=</span> <span class="s">"New link text."</span>
<span class="n">tag</span>
<span class="c"># &lt;a href="http://example.com/"&gt;New link text.&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>주의하자: 태그에 또 다른 태그가 들어 있다면, 그 태그는 물론 모든 내용이 사라진다.</p>
                        </div>
                        <div class="section" id="append">
                            <h2><tt class="docutils literal"><span class="pre">append()</span></tt><a class="headerlink" href="#append" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">Tag.append()</span></tt>로 태그에 내용을 추가할 수 있다. 파이썬 리스트에 <tt class="docutils literal"><span class="pre">.append()</span></tt>를 호출한 것과 똑같이 작동한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;a&gt;Foo&lt;/a&gt;"</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="s">"Bar"</span><span class="p">)</span>

<span class="n">soup</span>
<span class="c"># &lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;a&gt;FooBar&lt;/a&gt;&lt;/body&gt;&lt;/html&gt;</span>
<span class="n">soup</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">contents</span>
<span class="c"># [u'Foo', u'Bar']</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="beautifulsoup-new-string-and-new-tag">
                            <h2><tt class="docutils literal"><span class="pre">BeautifulSoup.new_string()</span></tt> 그리고 <tt class="docutils literal"><span class="pre">.new_tag()</span></tt><a class="headerlink" href="#beautifulsoup-new-string-and-new-tag" title="Permalink to this headline">¶</a></h2>
                            <p>문자열을 문서에 추가하고 싶다면, 파이썬 문자열을 <tt class="docutils literal"><span class="pre">append()</span></tt>에 건네기만 하면 된다. 아니면
                                <tt class="docutils literal"><span class="pre">BeautifulSoup.new_string()</span></tt> 공장 메쏘드를 호출하면 된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;b&gt;&lt;/b&gt;"</span><span class="p">)</span>
<span class="n">tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">b</span>
<span class="n">tag</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="s">"Hello"</span><span class="p">)</span>
<span class="n">new_string</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">new_string</span><span class="p">(</span><span class="s">" there"</span><span class="p">)</span>
<span class="n">tag</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">new_string</span><span class="p">)</span>
<span class="n">tag</span>
<span class="c"># &lt;b&gt;Hello there.&lt;/b&gt;</span>
<span class="n">tag</span><span class="o">.</span><span class="n">contents</span>
<span class="c"># [u'Hello', u' there']</span>
</pre>
                                </div>
                            </div>
                            <p>완전히 새로 태그를 만들어야 한다면 어떻게 할까? 최선의 해결책은 <tt class="docutils literal"><span class="pre">BeautifulSoup.new_tag()</span></tt> 공장 메쏘드를 호출하는 것이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;b&gt;&lt;/b&gt;"</span><span class="p">)</span>
<span class="n">original_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">b</span>

<span class="n">new_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">new_tag</span><span class="p">(</span><span class="s">"a"</span><span class="p">,</span> <span class="n">href</span><span class="o">=</span><span class="s">"http://www.example.com"</span><span class="p">)</span>
<span class="n">original_tag</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">new_tag</span><span class="p">)</span>
<span class="n">original_tag</span>
<span class="c"># &lt;b&gt;&lt;a href="http://www.example.com"&gt;&lt;/a&gt;&lt;/b&gt;</span>

<span class="n">new_tag</span><span class="o">.</span><span class="n">string</span> <span class="o">=</span> <span class="s">"Link text."</span>
<span class="n">original_tag</span>
<span class="c"># &lt;b&gt;&lt;a href="http://www.example.com"&gt;Link text.&lt;/a&gt;&lt;/b&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>오직 첫 번째 인자, 즉 태그 이름만 있으면 된다.</p>
                        </div>
                        <div class="section" id="insert">
                            <h2><tt class="docutils literal"><span class="pre">insert()</span></tt><a class="headerlink" href="#insert" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">Tag.insert()</span></tt>는 <tt class="docutils literal"><span class="pre">Tag.append()</span></tt>와 거의 같은데, 단, 새 요소가 반드시 그의 부모의 <tt class="docutils literal"><span class="pre">.contents</span></tt> 끝에 갈 필요는 없다. 원하는 위치 어디든지 삽입된다. 파이썬 리스트의 <tt class="docutils literal"><span class="pre">.insert()</span></tt>와 똑같이 작동한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>

<span class="n">tag</span><span class="o">.</span><span class="n">insert</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="s">"but did not endorse "</span><span class="p">)</span>
<span class="n">tag</span>
<span class="c"># &lt;a href="http://example.com/"&gt;I linked to but did not endorse &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;</span>
<span class="n">tag</span><span class="o">.</span><span class="n">contents</span>
<span class="c"># [u'I linked to ', u'but did not endorse', &lt;i&gt;example.com&lt;/i&gt;]</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="insert-before-and-insert-after">
                            <h2><tt class="docutils literal"><span class="pre">insert_before()</span></tt> 그리고 <tt class="docutils literal"><span class="pre">insert_after()</span></tt><a class="headerlink" href="#insert-before-and-insert-after" title="Permalink to this headline">¶</a></h2>
                            <p>
                                <tt class="docutils literal"><span class="pre">insert_before()</span></tt> 메쏘드는 태그나 문자열을 해석 트리에서 어떤 것 바로 앞에 삽입한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;b&gt;stop&lt;/b&gt;"</span><span class="p">)</span>
<span class="n">tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">new_tag</span><span class="p">(</span><span class="s">"i"</span><span class="p">)</span>
<span class="n">tag</span><span class="o">.</span><span class="n">string</span> <span class="o">=</span> <span class="s">"Don't"</span>
<span class="n">soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">string</span><span class="o">.</span><span class="n">insert_before</span><span class="p">(</span><span class="n">tag</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">b</span>
<span class="c"># &lt;b&gt;&lt;i&gt;Don't&lt;/i&gt;stop&lt;/b&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>
                                <tt class="docutils literal"><span class="pre">insert_after()</span></tt> 메쏘드는 해석 트리에서 다른 어떤 것 바로 뒤에 나오도록 태그나 문자열을 이동시킨다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">i</span><span class="o">.</span><span class="n">insert_after</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">new_string</span><span class="p">(</span><span class="s">" ever "</span><span class="p">))</span>
<span class="n">soup</span><span class="o">.</span><span class="n">b</span>
<span class="c"># &lt;b&gt;&lt;i&gt;Don't&lt;/i&gt; ever stop&lt;/b&gt;</span>
<span class="n">soup</span><span class="o">.</span><span class="n">b</span><span class="o">.</span><span class="n">contents</span>
<span class="c"># [&lt;i&gt;Don't&lt;/i&gt;, u' ever ', u'stop']</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="clear">
                            <h2><tt class="docutils literal"><span class="pre">clear()</span></tt><a class="headerlink" href="#clear" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">Tag.clear()</span></tt>은 태그의 내용을 제거한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>

<span class="n">tag</span><span class="o">.</span><span class="n">clear</span><span class="p">()</span>
<span class="n">tag</span>
<span class="c"># &lt;a href="http://example.com/"&gt;&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="extract">
                            <h2><tt class="docutils literal"><span class="pre">extract()</span></tt><a class="headerlink" href="#extract" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">PageElement.extract()</span></tt>는 해석 트리에서 태그나 문자열을 제거한다. 추출하고 남은 태그나 문자열을 돌려준다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">a_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>

<span class="n">i_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">i</span><span class="o">.</span><span class="n">extract</span><span class="p">()</span>

<span class="n">a_tag</span>
<span class="c"># &lt;a href="http://example.com/"&gt;I linked to&lt;/a&gt;</span>

<span class="n">i_tag</span>
<span class="c"># &lt;i&gt;example.com&lt;/i&gt;</span>

<span class="k">print</span><span class="p">(</span><span class="n">i_tag</span><span class="o">.</span><span class="n">parent</span><span class="p">)</span>
<span class="bp">None</span>
</pre>
                                </div>
                            </div>
                            <p>이 시점에서 두 가지 해석 트리를 가지는 효과가 있다: 하나는 문서를 해석하는데 사용된 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체에 뿌리를 두고, 또 하나는 추출된 그 태그에 뿌리를 둔다. 더 나아가 추출한 요소의 자손들에다 <tt class="docutils literal"><span class="pre">extract</span></tt>를 호출할 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">my_string</span> <span class="o">=</span> <span class="n">i_tag</span><span class="o">.</span><span class="n">string</span><span class="o">.</span><span class="n">extract</span><span class="p">()</span>
<span class="n">my_string</span>
<span class="c"># u'example.com'</span>

<span class="k">print</span><span class="p">(</span><span class="n">my_string</span><span class="o">.</span><span class="n">parent</span><span class="p">)</span>
<span class="c"># None</span>
<span class="n">i_tag</span>
<span class="c"># &lt;i&gt;&lt;/i&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="decompose">
                            <h2><tt class="docutils literal"><span class="pre">decompose()</span></tt><a class="headerlink" href="#decompose" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">Tag.decompose()</span></tt>는 태그를 트리에서 제거한 다음, 그와 그의 내용물을 <cite>완전히 파괴한다</cite>:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">a_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>

<span class="n">soup</span><span class="o">.</span><span class="n">i</span><span class="o">.</span><span class="n">decompose</span><span class="p">()</span>

<span class="n">a_tag</span>
<span class="c"># &lt;a href="http://example.com/"&gt;I linked to&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="replace-with">
                            <span id="id9"></span>
                            <h2><tt class="docutils literal"><span class="pre">replace_with()</span></tt><a class="headerlink" href="#replace-with" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">PageElement.replace_with()</span></tt>는 트리에서 태그나 문자열을 제거하고 그것을 지정한 태그나 문자열로 교체한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">a_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>

<span class="n">new_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">new_tag</span><span class="p">(</span><span class="s">"b"</span><span class="p">)</span>
<span class="n">new_tag</span><span class="o">.</span><span class="n">string</span> <span class="o">=</span> <span class="s">"example.net"</span>
<span class="n">a_tag</span><span class="o">.</span><span class="n">i</span><span class="o">.</span><span class="n">replace_with</span><span class="p">(</span><span class="n">new_tag</span><span class="p">)</span>

<span class="n">a_tag</span>
<span class="c"># &lt;a href="http://example.com/"&gt;I linked to &lt;b&gt;example.net&lt;/b&gt;&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p><tt class="docutils literal"><span class="pre">replace_with()</span></tt>는 교체된 후의 태그나 문자열을 돌려준다. 그래서 검사해 보거나 다시 트리의 다른 부분에 추가할 수 있다.</p>
                        </div>
                        <div class="section" id="wrap">
                            <h2><tt class="docutils literal"><span class="pre">wrap()</span></tt><a class="headerlink" href="#wrap" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">PageElement.wrap()</span></tt>는 지정한 태그에 요소를 둘러싸서 새로운 포장자를 돌려준다:</p>
                            <div class="highlight-python">
                                <pre>soup = BeautifulSoup("&lt;p&gt;I wish I was bold.&lt;/p&gt;")
soup.p.string.wrap(soup.new_tag("b"))
# &lt;b&gt;I wish I was bold.&lt;/b&gt;

soup.p.wrap(soup.new_tag("div")
# &lt;div&gt;&lt;p&gt;&lt;b&gt;I wish I was bold.&lt;/b&gt;&lt;/p&gt;&lt;/div&gt;</pre>
                            </div>
                            <p>다음 메쏘드는 뷰티플수프 4.0.5에 새로 추가되었다.</p>
                        </div>
                        <div class="section" id="unwrap">
                            <h2><tt class="docutils literal"><span class="pre">unwrap()</span></tt><a class="headerlink" href="#unwrap" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">Tag.unwrap()</span></tt>은 <tt class="docutils literal"><span class="pre">wrap()</span></tt>의 반대이다. 태그를 그 태그 안에 있는 것들로 교체한다. 조판을 걷어내 버릴 때 좋다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">a_tag</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">a</span>

<span class="n">a_tag</span><span class="o">.</span><span class="n">i</span><span class="o">.</span><span class="n">unwrap</span><span class="p">()</span>
<span class="n">a_tag</span>
<span class="c"># &lt;a href="http://example.com/"&gt;I linked to example.com&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p><tt class="docutils literal"><span class="pre">replace_with()</span></tt>처럼, <tt class="docutils literal"><span class="pre">unwrap()</span></tt>은 교체된 후의 태그를 돌려준다.</p>
                            <p>(이전 뷰티플수프 버전에서, <tt class="docutils literal"><span class="pre">unwrap()</span></tt>는 <tt class="docutils literal"><span class="pre">replace_with_children()</span></tt>이라고 불리웠으며, 그 이름은 여전히 작동한다.)</p>
                        </div>
                    </div>
                    <div class="section" id="output">
                        <h1>출력<a class="headerlink" href="#output" title="Permalink to this headline">¶</a></h1>
                        <div class="section" id="pretty-printing">
                            <span id="prettyprinting"></span>
                            <h2>예쁘게-인쇄하기<a class="headerlink" href="#pretty-printing" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">prettify()</span></tt> 메쏘드는 뷰티플수프 해석 트리를 멋지게 모양을 낸 유니코드 문자열로 변환한다. HTML/XML 태그마다 따로따로 한 줄에 표시된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">()</span>
<span class="c"># '&lt;html&gt;\n &lt;head&gt;\n &lt;/head&gt;\n &lt;body&gt;\n  &lt;a href="http://example.com/"&gt;\n...'</span>

<span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;head&gt;</span>
<span class="c">#  &lt;/head&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;a href="http://example.com/"&gt;</span>
<span class="c">#    I linked to</span>
<span class="c">#    &lt;i&gt;</span>
<span class="c">#     example.com</span>
<span class="c">#    &lt;/i&gt;</span>
<span class="c">#   &lt;/a&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>최상위 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체에 <tt class="docutils literal"><span class="pre">prettify()</span></tt>를 호출할 수 있으며, 또는 <tt class="docutils literal"><span class="pre">Tag</span></tt> 객체에 얼마든지 호출할 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;a href="http://example.com/"&gt;</span>
<span class="c">#  I linked to</span>
<span class="c">#  &lt;i&gt;</span>
<span class="c">#   example.com</span>
<span class="c">#  &lt;/i&gt;</span>
<span class="c"># &lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="non-pretty-printing">
                            <h2>있는-그대로 인쇄하기<a class="headerlink" href="#non-pretty-printing" title="Permalink to this headline">¶</a></h2>
                            <p>멋진 모양 말고 그냥 문자열을 원한다면, <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체, 또는 그 안의 <tt class="docutils literal"><span class="pre">Tag</span></tt>에 <tt class="docutils literal"><span class="pre">unicode()</span></tt> 또는 <tt class="docutils literal"><span class="pre">str()</span></tt>을 호출하면 된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="nb">str</span><span class="p">(</span><span class="n">soup</span><span class="p">)</span>
<span class="c"># '&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;&lt;/body&gt;&lt;/html&gt;'</span>

<span class="nb">unicode</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">a</span><span class="p">)</span>
<span class="c"># u'&lt;a href="http://example.com/"&gt;I linked to &lt;i&gt;example.com&lt;/i&gt;&lt;/a&gt;'</span>
</pre>
                                </div>
                            </div>
                            <p><tt class="docutils literal"><span class="pre">str()</span></tt> 함수는 UTF-8로 인코드된 문자열을 돌려준다. 다른 옵션은 <a class="reference internal" href="#encodings">인코딩</a>을 살펴보자.</p>
                            <p>또 <tt class="docutils literal"><span class="pre">encode()</span></tt>를 호출하면 bytestring을 얻을 수 있고, <tt class="docutils literal"><span class="pre">decode()</span></tt>로는 유니코드를 얻는다.</p>
                        </div>
                        <div class="section" id="output-formatters">
                            <span id="id10"></span>
                            <h2>출력 포맷터<a class="headerlink" href="#output-formatters" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플수프 문서에 “&amp;lquot;”와 같은 HTML 개체가 들어 있다면, 그 개체들은 유니코드 문자로 변환된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&amp;ldquo;Dammit!&amp;rdquo; he said."</span><span class="p">)</span>
<span class="nb">unicode</span><span class="p">(</span><span class="n">soup</span><span class="p">)</span>
<span class="c"># u'&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;\u201cDammit!\u201d he said.&lt;/body&gt;&lt;/html&gt;'</span>
</pre>
                                </div>
                            </div>
                            <p>문서를 문자열로 변환하면, 유니코드 문자들은 UTF-8로 인코드된다. HTML 개체는 다시 복구할 수 없다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="nb">str</span><span class="p">(</span><span class="n">soup</span><span class="p">)</span>
<span class="c"># '&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;\xe2\x80\x9cDammit!\xe2\x80\x9d he said.&lt;/body&gt;&lt;/html&gt;'</span>
</pre>
                                </div>
                            </div>
                            <p>기본 값으로, 출력에서 피신 처리가 되는 유일한 문자들은 앰퍼센드와 옆꺽쇠 문자들이다. 이런 문자들은 “&amp;amp;”, “&amp;lt;”, 그리고 “&amp;gt;”로 변환된다. 그래서 뷰티플수프는 무효한 HTML이나 XML을 생성하는 실수를 하지 않게 된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;p&gt;The law firm of Dewey, Cheatem, &amp; Howe&lt;/p&gt;"</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">p</span>
<span class="c"># &lt;p&gt;The law firm of Dewey, Cheatem, &amp;amp; Howe&lt;/p&gt;</span>

<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;a href="http://example.com/?foo=val1&amp;bar=val2"&gt;A link&lt;/a&gt;'</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">a</span>
<span class="c"># &lt;a href="http://example.com/?foo=val1&amp;amp;bar=val2"&gt;A link&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>이 행위를 바꾸려면 <tt class="docutils literal"><span class="pre">formatter</span></tt> 인자용 값을 <tt class="docutils literal"><span class="pre">prettify()</span></tt>, <tt class="docutils literal"><span class="pre">encode()</span></tt>, 또는 <tt class="docutils literal"><span class="pre">decode()</span></tt>에 제공하면 된다.
                                뷰티플수프는 <tt class="docutils literal"><span class="pre">formatter</span></tt>에 대하여 가능한 네 가지 값을 인지한다.</p>
                            <p>기본값은 <tt class="docutils literal"><span class="pre">formatter="minimal"</span></tt>이다. 문자열은 뷰티플수프가 유효한 HTML/XML을 생산한다고 확신할 만큼 처리된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">french</span> <span class="o">=</span> <span class="s">"&lt;p&gt;Il a dit &amp;lt;&amp;lt;Sacr&amp;eacute; bleu!&amp;gt;&amp;gt;&lt;/p&gt;"</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">french</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">(</span><span class="n">formatter</span><span class="o">=</span><span class="s">"minimal"</span><span class="p">))</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;p&gt;</span>
<span class="c">#    Il a dit &amp;lt;&amp;lt;Sacré bleu!&amp;gt;&amp;gt;</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>
                                <tt class="docutils literal"><span class="pre">formatter="html"</span></tt>을 건네면, 뷰티플수프는 유니코드 문자를 가능한한 HTML 개체로 변환한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">(</span><span class="n">formatter</span><span class="o">=</span><span class="s">"html"</span><span class="p">))</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;p&gt;</span>
<span class="c">#    Il a dit &amp;lt;&amp;lt;Sacr&amp;eacute; bleu!&amp;gt;&amp;gt;</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p><tt class="docutils literal"><span class="pre">formatter=None</span></tt>을 건네면, 뷰티플수프는 출력시 전혀 문자열을 건드리지 않는다. 이것이 가장 빠른 선택이지만, 다음 예제에서와 같이 잘못해서 뷰티플수프가 무효한 HTML/XML을 생산할 가능성이 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">(</span><span class="n">formatter</span><span class="o">=</span><span class="bp">None</span><span class="p">))</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;p&gt;</span>
<span class="c">#    Il a dit &lt;&lt;Sacré bleu!&gt;&gt;</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>

<span class="n">link_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">'&lt;a href="http://example.com/?foo=val1&amp;bar=val2"&gt;A link&lt;/a&gt;'</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="n">link_soup</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="n">formatter</span><span class="o">=</span><span class="bp">None</span><span class="p">))</span>
<span class="c"># &lt;a href="http://example.com/?foo=val1&amp;bar=val2"&gt;A link&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>
                                마지막으로, <tt class="docutils literal"><span class="pre">formatter</span></tt>에 함수를 건네면, 뷰티플수프는 문서에서 문자열과 속성 값에 대하여 하나하나 그 함수를 한 번 호출한다. 이 함수에서 무엇이든 할 수 있다. 다음은 문자열을 대문자로 바꾸고 다른 일은 절대로 하지 않는 포맷터이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">def</span> <span class="nf">uppercase</span><span class="p">(</span><span class="nb">str</span><span class="p">):</span>
    <span class="k">return</span> <span class="nb">str</span><span class="o">.</span><span class="n">upper</span><span class="p">()</span>

<span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">(</span><span class="n">formatter</span><span class="o">=</span><span class="n">uppercase</span><span class="p">))</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;p&gt;</span>
<span class="c">#    IL A DIT &lt;&lt;SACRÉ BLEU!&gt;&gt;</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>

<span class="k">print</span><span class="p">(</span><span class="n">link_soup</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">prettify</span><span class="p">(</span><span class="n">formatter</span><span class="o">=</span><span class="n">uppercase</span><span class="p">))</span>
<span class="c"># &lt;a href="HTTP://EXAMPLE.COM/?FOO=VAL1&amp;BAR=VAL2"&gt;</span>
<span class="c">#  A LINK</span>
<span class="c"># &lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>따로 함수를 작성하고 있다면, <tt class="docutils literal"><span class="pre">bs4.dammit</span></tt> 모듈에 있는 <tt class="docutils literal"><span class="pre">EntitySubstitution</span></tt> 클래스에 관하여 알아야 한다. 이 클래스는 뷰티플수프의 표준 포맷터를 클래스 메쏘드로 구현한다:
                                “html”포맷터는 <tt class="docutils literal"><span class="pre">EntitySubstitution.substitute_html</span></tt>이고, “minimal” 포맷터는 <tt class="docutils literal"><span class="pre">EntitySubstitution.substitute_xml</span></tt>이다. 이 함수들을 사용하면 <tt class="docutils literal"><span class="pre">formatter=html</span></tt>나
                                <tt class="docutils literal"><span class="pre">formatter==minimal</span></tt>를 흉내낼 수 있지만, 더 처리해야할 일이 있다.</p>
                            <p>다음은 가능하면 유니코드 문자를 HTML 개체로 교체하는 예제이다. 그러나 <cite>또한</cite> 모든 문자열을 대문자로 바꾼다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="kn">from</span> <span class="nn">bs4.dammit</span> <span class="kn">import</span> <span class="n">EntitySubstitution</span>
<span class="k">def</span> <span class="nf">uppercase_and_substitute_html_entities</span><span class="p">(</span><span class="nb">str</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">EntitySubstitution</span><span class="o">.</span><span class="n">substitute_html</span><span class="p">(</span><span class="nb">str</span><span class="o">.</span><span class="n">upper</span><span class="p">())</span>

<span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">(</span><span class="n">formatter</span><span class="o">=</span><span class="n">uppercase_and_substitute_html_entities</span><span class="p">))</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;p&gt;</span>
<span class="c">#    IL A DIT &amp;lt;&amp;lt;SACR&amp;Eacute; BLEU!&amp;gt;&amp;gt;</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>마지막 단점: <tt class="docutils literal"><span class="pre">CData</span></tt> 객체를 만들면, 그 객체 안의 텍스트는 언제나 <cite>포맷팅 없이도, 정확하게 똑같이 나타난다</cite>. 문서에서 문자열 같은 것들을 세는 메쏘드를 손수 만들 경우, 뷰티플수프는 포맷터 메쏘드를 호출한다. 그러나 반환 값은 무시된다.</p>
                            <blockquote>
                                <div>from bs4.element import CData
                                    soup = BeautifulSoup(“&lt;a&gt;&lt;/a&gt;”)
                                    soup.a.string = CData(“one &lt; three”)
                                    print(soup.a.prettify(formatter=”xml”))
                                    # &lt;a&gt;
                                    # &lt;![CDATA[one &lt; three]]&gt;
                                    # &lt;/a&gt;</div>
                            </blockquote>
                        </div>
                        <div class="section" id="get-text">
                            <h2><tt class="docutils literal"><span class="pre">get_text()</span></tt><a class="headerlink" href="#get-text" title="Permalink to this headline">¶</a></h2>
                            <p>문서나 태그에서 텍스트 부분만 추출하고 싶다면, <tt class="docutils literal"><span class="pre">get_text()</span></tt> 메쏘드를 사용할 수 있다. 이 메쏘드는 문서나 태그 아래의 텍스트를, 유니코드 문자열 하나로 모두 돌려준다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">'&lt;a href="http://example.com/"&gt;</span><span class="se">\n</span><span class="s">I linked to &lt;i&gt;example.com&lt;/i&gt;</span><span class="se">\n</span><span class="s">&lt;/a&gt;'</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>

<span class="n">soup</span><span class="o">.</span><span class="n">get_text</span><span class="p">()</span>
<span class="s">u'</span><span class="se">\n</span><span class="s">I linked to example.com</span><span class="se">\n</span><span class="s">'</span>
<span class="n">soup</span><span class="o">.</span><span class="n">i</span><span class="o">.</span><span class="n">get_text</span><span class="p">()</span>
<span class="s">u'example.com'</span>
</pre>
                                </div>
                            </div>
                            <p>텍스트를 합칠 때 사용될 문자열을 지정해 줄 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="c"># soup.get_text("|")</span>
<span class="s">u'</span><span class="se">\n</span><span class="s">I linked to |example.com|</span><span class="se">\n</span><span class="s">'</span>
</pre>
                                </div>
                            </div>
                            <p>뷰티플수프에게 각 테스트의 앞과 뒤에 있는 공백을 걷어내라고 알려줄 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="c"># soup.get_text("|", strip=True)</span>
<span class="s">u'I linked to|example.com'</span>
</pre>
                                </div>
                            </div>
                            <p>그러나 이 시점에서 대신에 <a class="reference internal" href="#string-generators"><em>.stripped_strings</em></a> 발생자를 사용해서, 텍스트를 손수 처리하고 싶을 수 있겠다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="p">[</span><span class="n">text</span> <span class="k">for</span> <span class="n">text</span> <span class="ow">in</span> <span class="n">soup</span><span class="o">.</span><span class="n">stripped_strings</span><span class="p">]</span>
<span class="c"># [u'I linked to', u'example.com']</span>
</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" id="specifying-the-parser-to-use">
                        <h1>사용할 해석기 지정하기<a class="headerlink" href="#specifying-the-parser-to-use" title="Permalink to this headline">¶</a></h1>
                        <p>단지 HTML만 해석하고 싶을 경우, 조판을 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 넣기만 하면, 아마도 잘 처리될 것이다. 뷰티플수프는 해석기를 여러분 대신 선택해 데이터를 해석한다. 그러나 어느 해석기를 사용할지 바꾸기 위해 구성자에 건넬 수 있는 인자가 몇 가지 더 있다.</p>
                        <p><tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 건네는 첫 번째 인자는 문자열이나 열린 파일핸들-즉 해석하기를 원하는 조판이 첫 번째 인자이다. 두 번째 인자는 그 조판이 <cite>어떻게</cite> 해석되기를 바라는지 지정한다.</p>
                        <p>아무것도 지정하지 않으면, 설치된 해석기중 최적의 HTML 해석기가 배당된다. 뷰티플수프는 lxml 해석기를 최선으로 취급하고, 다음에 html5lib 해석기, 그 다음이 파이썬의 내장 해석기를 선택한다. 이것은 다음 중 하나로 덮어쓸 수 있다:</p>
                        <ul class="simple">
                            <li>해석하고 싶은 조판의 종류. 현재 “html”, “xml”, 그리고 “html5”가 지원된다.</li>
                            <li>사용하고 싶은 해석기의 이름. 현재 선택은 “lxml”, “html5lib”, 그리고 “html.parser” (파이썬의 내장 HTML 해석기)이다.</li>
                        </ul>
                        <p><a class="reference internal" href="#installing-a-parser">해석기 설치하기</a> 섹션에 지원 해석기들을 비교해 놓았다.</p>
                        <p>적절한 해석기가 설치되어 있지 않다면, 뷰티플수프는 여러분의 요구를 무시하고 다른 해석기를 선택한다. 지금 유일하게 지원되는 XML 해석기는 lxml이다. lxml 해석기가 설치되어 있지 않으면, XML 해석기를 요구할 경우 아무것도 얻을 수 없고, “lxml”을 요구하더라도 얻을 수 없다.</p>
                        <div class="section" id="differences-between-parsers">
                            <h2>해석기 사이의 차이점들<a class="headerlink" href="#differences-between-parsers" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플수프는 다양한 해석기에 대하여 인터페이스가 같다. 그러나 각 해석기는 다르다. 해석기마다 같은 문서에서 다른 해석 트리를 만들어낸다. 가장 큰 차이점은 HTML 해석기와 XML 해석기 사이에 있다. 다음은 HTML로 해석된 짧은 문서이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;a&gt;&lt;b /&gt;&lt;/a&gt;"</span><span class="p">)</span>
<span class="c"># &lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;a&gt;&lt;b&gt;&lt;/b&gt;&lt;/a&gt;&lt;/body&gt;&lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>빈 &lt;b /&gt; 태그는 유효한 HTML이 아니므로, 해석기는 그것을 &lt;b&gt;&lt;/b&gt; 태그 쌍으로 변환한다.</p>
                            <p>다음 똑같은 문서를 XML로 해석한 것이다 (이를 실행하려면 lxml이 설치되어 있어야 한다). 빈 &lt;b /&gt; 태그가 홀로 남았음에 유의하자. 그리고 &lt;html&gt; 태그를 출력하는 대신에 XML 선언이 주어졌음을 주목하자:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;a&gt;&lt;b /&gt;&lt;/a&gt;"</span><span class="p">,</span> <span class="s">"xml"</span><span class="p">)</span>
<span class="c"># &lt;?xml version="1.0" encoding="utf-8"?&gt;</span>
<span class="c"># &lt;a&gt;&lt;b /&gt;&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>
                                HTML 해석기 사이에서도 차이가 있다. 뷰티플수프에 완벽하게 모양을 갖춘 HTML 문서를 주면, 이 차이는 문제가 되지 않는다. 비록 해석기마다 속도에 차이가 있기는 하지만, 모두 원래의 HTML 문서와 정확하게 똑같이 보이는 데이터 구조를 돌려준다.</p>
                            <p>그러나 문서가 불완전하게 모양을 갖추었다면, 해석기마다 결과가 다르다. 다음은 짧은 무효한 문서를 lxml의 HTML 해석기로 해석한 것이다. 나홀로 &lt;/p&gt; 태그는 그냥 무시된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;a&gt;&lt;/p&gt;"</span><span class="p">,</span> <span class="s">"lxml"</span><span class="p">)</span>
<span class="c"># &lt;html&gt;&lt;body&gt;&lt;a&gt;&lt;/a&gt;&lt;/body&gt;&lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>다음은 같은 문서를 html5lib로 해석하였다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;a&gt;&lt;/p&gt;"</span><span class="p">,</span> <span class="s">"html5lib"</span><span class="p">)</span>
<span class="c"># &lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;a&gt;&lt;p&gt;&lt;/p&gt;&lt;/a&gt;&lt;/body&gt;&lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>나홀로 &lt;/p&gt; 태그를 무시하는 대신에, html5lib는 여는 &lt;p&gt; 태그로 짝을 맞추어 준다. 이 해석기는 또한 빈 &lt;head&gt; 태그를 문서에 추가한다.</p>
                            <p>다음은 같은 문서를 파이썬 내장 HTML 해석기로 해석한 것이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">BeautifulSoup</span><span class="p">(</span><span class="s">"&lt;a&gt;&lt;/p&gt;"</span><span class="p">,</span> <span class="s">"html.parser"</span><span class="p">)</span>
<span class="c"># &lt;a&gt;&lt;/a&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>html5lib처럼, 이 해석기는 닫는 &lt;/p&gt; 태그를 무시한다. html5lib와 다르게, 이 해석기는 &lt;body&gt; 태그를 추가해서 모양을 갖춘 HTML 문서를 생성하려고 아무 시도도 하지 않는다. lxml과 다르게, 심지어 &lt;html&gt; 태그를 추가하는 것에도 신경쓰지 않는다.</p>
                            <p>문서 “&lt;a&gt;&lt;/p&gt;”는 무효하므로, 이 테크닉중 어느 것도 “올바른” 처리 방법이 아니다. html5lib 해석기는 HTML5 표준에 있는 테크닉을 사용하므로, 아무래도 “가장 올바른” 방법이라고 주장할 수 있지만, 세 가지 테크닉 모두 같은 주장을 할 수 있다.</p>
                            <p>해석기 사이의 차이점 때문에 스크립트가 영향을 받을 수 있다. 스크립트를 다른 사람들에게 나누어 줄 계획이 있다면, 또는 여러 머신에서 실행할 생각이라면, <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 해석기를 지정해 주는 편이 좋다. 그렇게 해야 여러분이 해석한 방식과 다르게 사용자가 문서를 해석할 위험성이 감소한다.</p>
                        </div>
                    </div>
                    <div class="section" id="encodings">
                        <h1>인코딩<a class="headerlink" href="#encodings" title="Permalink to this headline">¶</a></h1>
                        <p>HTML이든 XML이든 문서는 ASCII나 UTF-8 같은 특정한 인코딩으로 작성된다. 그러나 문서를 뷰티플수프에 적재하면, 문서가 유니코드로 변환되었음을 알게 될 것이다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">"&lt;h1&gt;Sacr</span><span class="se">\xc3\xa9</span><span class="s"> bleu!&lt;/h1&gt;"</span>
<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">h1</span>
<span class="c"># &lt;h1&gt;Sacré bleu!&lt;/h1&gt;</span>
<span class="n">soup</span><span class="o">.</span><span class="n">h1</span><span class="o">.</span><span class="n">string</span>
<span class="c"># u'Sacr\xe9 bleu!'</span>
</pre>
                            </div>
                        </div>
                        <p>마법이 아니다(확실히 좋은 것이다.). 뷰티플수프는 <a class="reference internal" href="#unicode-dammit">Unicode, Dammit</a>라는 하위 라이브러리를 사용하여 문서의 인코딩을 탐지하고 유니코드로 변환한다. 자동 인코딩 탐지는 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체의 <tt class="docutils literal"><span class="pre">.original_encoding</span></tt> 속성으로 얻을 수 있다:</p>
                        <div class="highlight-python">
                            <div class="highlight">
                                <pre><span class="n">soup</span><span class="o">.</span><span class="n">original_encoding</span>
<span class="s">'utf-8'</span>
</pre>
                            </div>
                        </div>
                        <p>Unicode, Dammit은 대부분 올바르게 추측하지만, 가끔은 실수가 있다. 가끔 올바르게 추측하지만, 문서를 바이트 하나 하나 오랫동안 탐색한 후에야 그렇다. 혹시 문서의 인코딩을 미리 안다면, 그 인코딩을 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 <tt class="docutils literal"><span class="pre">from_encoding</span></tt>로 건네면 실수를 피하고 시간을 절약할 수 있다.</p>
                        <p>다음은 ISO-8859-8로 작성된 문서이다. 이 문서는 Unicode, Dammit이 충분히 살펴보기에는 너무 짧아서, ISO-8859-7로 잘못 인식한다:</p>
                        <div class="highlight-python">
                            <pre>markup = b"&lt;h1&gt;\xed\xe5\xec\xf9&lt;/h1&gt;"
soup = BeautifulSoup(markup)
soup.h1
&lt;h1&gt;νεμω&lt;/h1&gt;
soup.original_encoding
'ISO-8859-7'</pre>
                        </div>
                        <p>이를 해결하려면 올바른 <tt class="docutils literal"><span class="pre">from_encoding</span></tt>을 건네면 된다:</p>
                        <div class="highlight-python">
                            <pre>soup = BeautifulSoup(markup, from_encoding="iso-8859-8")
soup.h1
&lt;h1&gt;םולש&lt;/h1&gt;
soup.original_encoding
'iso8859-8'</pre>
                        </div>
                        <p>아주 드물게 (보통 UTF-8 문서 안에 텍스트가 완전히 다른 인코딩으로 작성되어 있을 경우), 유일하게 유니코드를 얻는 방법은 몇 가지 문자를 특별한 유니코드 문자 “REPLACEMENT CHARACTER” (U+FFFD, �)로 교체하는 것이다 . Unicode, Dammit이 이를 필요로 하면, <tt class="docutils literal"><span class="pre">UnicodeDammit</span></tt>이나 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체에 대하여 <tt class="docutils literal"><span class="pre">.contains_replacement_characters</span></tt> 속성에 <tt class="docutils literal"><span class="pre">True</span></tt>를 설정할 것이다.
                            이렇게 하면 유니코드 표현이 원래의 정확한 표현이 아니라는 사실을 알 수 있다. 약간 데이터가 손실된다. 문서에 �가 있지만, <tt class="docutils literal"><span class="pre">.contains_replacement_characters</span></tt>가 <tt class="docutils literal"><span class="pre">False</span></tt>라면, 원래부터 거기에 있었고 데이터 손실을 감내하지 않는다는 사실을 알게 될 것이다.</p>
                        <div class="section" id="output-encoding">
                            <h2>출력 인코딩<a class="headerlink" href="#output-encoding" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플수프로 문서를 작성할 때, UTF-8 문서를 얻는다. 그 문서가 처음에는 UTF-8이 아니었다고 할지라도 말이다. 다음은 Latin-1 인코딩으로 작성된 문서이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="n">b</span><span class="s">'''</span>
<span class="s"> &lt;html&gt;</span>
<span class="s">  &lt;head&gt;</span>
<span class="s">   &lt;meta content="text/html; charset=ISO-Latin-1" http-equiv="Content-type" /&gt;</span>
<span class="s">  &lt;/head&gt;</span>
<span class="s">  &lt;body&gt;</span>
<span class="s">   &lt;p&gt;Sacr</span><span class="se">\xe9</span><span class="s"> bleu!&lt;/p&gt;</span>
<span class="s">  &lt;/body&gt;</span>
<span class="s"> &lt;/html&gt;</span>
<span class="s">'''</span>

<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;head&gt;</span>
<span class="c">#   &lt;meta content="text/html; charset=utf-8" http-equiv="Content-type" /&gt;</span>
<span class="c">#  &lt;/head&gt;</span>
<span class="c">#  &lt;body&gt;</span>
<span class="c">#   &lt;p&gt;</span>
<span class="c">#    Sacré bleu!</span>
<span class="c">#   &lt;/p&gt;</span>
<span class="c">#  &lt;/body&gt;</span>
<span class="c"># &lt;/html&gt;</span>
</pre>
                                </div>
                            </div>
                            <p>
                                &lt;meta&gt; 태그가 재작성되어 문서가 이제 UTF-8이라는 사실을 반영하고 있음을 주목하자.</p>
                            <p>UTF-8이 싫으면, 인코딩을 <tt class="docutils literal"><span class="pre">prettify()</span></tt>에 건넬 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">print</span><span class="p">(</span><span class="n">soup</span><span class="o">.</span><span class="n">prettify</span><span class="p">(</span><span class="s">"latin-1"</span><span class="p">))</span>
<span class="c"># &lt;html&gt;</span>
<span class="c">#  &lt;head&gt;</span>
<span class="c">#   &lt;meta content="text/html; charset=latin-1" http-equiv="Content-type" /&gt;</span>
<span class="c"># ...</span>
</pre>
                                </div>
                            </div>
                            <p>또 encode()를 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 객체, 또는 수프의 다른 어떤 요소에라도 호출할 수 있다. 마치 파이썬 문자열처럼 말이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span><span class="o">.</span><span class="n">p</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s">"latin-1"</span><span class="p">)</span>
<span class="c"># '&lt;p&gt;Sacr\xe9 bleu!&lt;/p&gt;'</span>

<span class="n">soup</span><span class="o">.</span><span class="n">p</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s">"utf-8"</span><span class="p">)</span>
<span class="c"># '&lt;p&gt;Sacr\xc3\xa9 bleu!&lt;/p&gt;'</span>
</pre>
                                </div>
                            </div>
                            <p>선택한 인코딩에서 표현이 불가능한 문자는 숫자의 XML 개체 참조로 변환된다. 다음은 유니코드 문자 SNOWMAN이 포함된 문자이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">markup</span> <span class="o">=</span> <span class="s">u"&lt;b&gt;</span><span class="se">\N{SNOWMAN}</span><span class="s">&lt;/b&gt;"</span>
<span class="n">snowman_soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">)</span>
<span class="n">tag</span> <span class="o">=</span> <span class="n">snowman_soup</span><span class="o">.</span><span class="n">b</span>
</pre>
                                </div>
                            </div>
                            <p>눈사람 문자는 UTF-8 문서에 포함될 수 있지만 (☃처럼 생김), ISO-Latin-1이나 ASCII에 그 문자에 대한 표현이 없다. 그래서 “&amp;#9731”으로 변환된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="k">print</span><span class="p">(</span><span class="n">tag</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s">"utf-8"</span><span class="p">))</span>
<span class="c"># &lt;b&gt;☃&lt;/b&gt;</span>

<span class="k">print</span> <span class="n">tag</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s">"latin-1"</span><span class="p">)</span>
<span class="c"># &lt;b&gt;&amp;#9731;&lt;/b&gt;</span>

<span class="k">print</span> <span class="n">tag</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s">"ascii"</span><span class="p">)</span>
<span class="c"># &lt;b&gt;&amp;#9731;&lt;/b&gt;</span>
</pre>
                                </div>
                            </div>
                        </div>
                        <div class="section" id="unicode-dammit">
                            <h2>이런, 유니코드군<a class="headerlink" href="#unicode-dammit" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플수프를 사용하지 않더라도 유니코드를 사용할 수 있다. 인코딩을 알 수 없는 데이터가 있을 때마다 그냥 유니코드가 되어 주었으면 하고 바라기만 하면 된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">UnicodeDammit</span>
<span class="n">dammit</span> <span class="o">=</span> <span class="n">UnicodeDammit</span><span class="p">(</span><span class="s">"Sacr</span><span class="se">\xc3\xa9</span><span class="s"> bleu!"</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="n">dammit</span><span class="o">.</span><span class="n">unicode_markup</span><span class="p">)</span>
<span class="c"># Sacré bleu!</span>
<span class="n">dammit</span><span class="o">.</span><span class="n">original_encoding</span>
<span class="c"># 'utf-8'</span>
</pre>
                                </div>
                            </div>
                            <p>
                                유니코드에 더 많은 데이터를 줄 수록, Dammit은 더 정확하게 추측할 것이다. 나름대로 어떤 인코딩일지 짐작이 간다면, 그것들을 리스트로 건넬 수 있다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">dammit</span> <span class="o">=</span> <span class="n">UnicodeDammit</span><span class="p">(</span><span class="s">"Sacr</span><span class="se">\xe9</span><span class="s"> bleu!"</span><span class="p">,</span> <span class="p">[</span><span class="s">"latin-1"</span><span class="p">,</span> <span class="s">"iso-8859-1"</span><span class="p">])</span>
<span class="k">print</span><span class="p">(</span><span class="n">dammit</span><span class="o">.</span><span class="n">unicode_markup</span><span class="p">)</span>
<span class="c"># Sacré bleu!</span>
<span class="n">dammit</span><span class="o">.</span><span class="n">original_encoding</span>
<span class="c"># 'latin-1'</span>
</pre>
                                </div>
                            </div>
                            <p>Unicode, Dammit는 뷰티플수프가 사용하지 않는 특별한 특징이 두 가지 있다.</p>
                            <div class="section" id="smart-quotes">
                                <h3>지능형 따옴표<a class="headerlink" href="#smart-quotes" title="Permalink to this headline">¶</a></h3>
                                <p>Unicode, Dammit을 사용하여 마이크로소프트 지능형 따옴표를 HTML이나 XML 개체로 변환할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">markup</span> <span class="o">=</span> <span class="n">b</span><span class="s">"&lt;p&gt;I just </span><span class="se">\x93</span><span class="s">love</span><span class="se">\x94</span><span class="s"> Microsoft Word</span><span class="se">\x92</span><span class="s">s smart quotes&lt;/p&gt;"</span>

<span class="n">UnicodeDammit</span><span class="p">(</span><span class="n">markup</span><span class="p">,</span> <span class="p">[</span><span class="s">"windows-1252"</span><span class="p">],</span> <span class="n">smart_quotes_to</span><span class="o">=</span><span class="s">"html"</span><span class="p">)</span><span class="o">.</span><span class="n">unicode_markup</span>
<span class="c"># u'&lt;p&gt;I just &amp;ldquo;love&amp;rdquo; Microsoft Word&amp;rsquo;s smart quotes&lt;/p&gt;'</span>

<span class="n">UnicodeDammit</span><span class="p">(</span><span class="n">markup</span><span class="p">,</span> <span class="p">[</span><span class="s">"windows-1252"</span><span class="p">],</span> <span class="n">smart_quotes_to</span><span class="o">=</span><span class="s">"xml"</span><span class="p">)</span><span class="o">.</span><span class="n">unicode_markup</span>
<span class="c"># u'&lt;p&gt;I just &amp;#x201C;love&amp;#x201D; Microsoft Word&amp;#x2019;s smart quotes&lt;/p&gt;'</span>
</pre>
                                    </div>
                                </div>
                                <p>또 마이크로소프트 지능형 따옴표를 ASCII 따옴표로 변환할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">UnicodeDammit</span><span class="p">(</span><span class="n">markup</span><span class="p">,</span> <span class="p">[</span><span class="s">"windows-1252"</span><span class="p">],</span> <span class="n">smart_quotes_to</span><span class="o">=</span><span class="s">"ascii"</span><span class="p">)</span><span class="o">.</span><span class="n">unicode_markup</span>
<span class="c"># u'&lt;p&gt;I just "love" Microsoft Word\'s smart quotes&lt;/p&gt;'</span>
</pre>
                                    </div>
                                </div>
                                <p>모쪼록 이 특징이 쓸모가 있기를 바라지만, 뷰티플수프는 사용하지 않는다. 뷰티플수프는 기본 행위를 선호하는데, 기본적으로 마이크로소프트 지능형 따옴표를 다른 모든 것과 함께 유니코드 문자로 변환한다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">UnicodeDammit</span><span class="p">(</span><span class="n">markup</span><span class="p">,</span> <span class="p">[</span><span class="s">"windows-1252"</span><span class="p">])</span><span class="o">.</span><span class="n">unicode_markup</span>
<span class="c"># u'&lt;p&gt;I just \u201clove\u201d Microsoft Word\u2019s smart quotes&lt;/p&gt;'</span>
</pre>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="inconsistent-encodings">
                                <h3>비 일관적인 인코딩<a class="headerlink" href="#inconsistent-encodings" title="Permalink to this headline">¶</a></h3>
                                <p>어떤 경우 문서 대부분이 UTF-8이지만, 안에 (역시) 마이크로소프트 지능형 따옴표와 같이 Windows-1252 문자가 들어 있는 경우가 있다. 한 웹 사이트에 여러 소스로 부터 데이터가 포함될 경우에 이런 일이 일어날 수 있다.
                                    <tt class="docutils literal"><span class="pre">UnicodeDammit.detwingle()</span></tt>을 사용하여 그런 문서를 순수한 UTF-8 문서로 변환할 수 있다. 다음은 간단한 예이다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">snowmen</span> <span class="o">=</span> <span class="p">(</span><span class="s">u"</span><span class="se">\N{SNOWMAN}</span><span class="s">"</span> <span class="o">*</span> <span class="mi">3</span><span class="p">)</span>
<span class="n">quote</span> <span class="o">=</span> <span class="p">(</span><span class="s">u"</span><span class="se">\N{LEFT DOUBLE QUOTATION MARK}</span><span class="s">I like snowmen!</span><span class="se">\N{RIGHT DOUBLE QUOTATION MARK}</span><span class="s">"</span><span class="p">)</span>
<span class="n">doc</span> <span class="o">=</span> <span class="n">snowmen</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s">"utf8"</span><span class="p">)</span> <span class="o">+</span> <span class="n">quote</span><span class="o">.</span><span class="n">encode</span><span class="p">(</span><span class="s">"windows_1252"</span><span class="p">)</span>
</pre>
                                    </div>
                                </div>
                                <p>이 문서는 뒤죽박죽이다. 눈사람은 UTF-8인데 따옴표는 Windows-1252이다. 눈사람 아니면 따옴표를 화면에 나타낼 수 있지만, 둘 다 나타낼 수는 없다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">print</span><span class="p">(</span><span class="n">doc</span><span class="p">)</span>
<span class="c"># ☃☃☃�I like snowmen!�</span>

<span class="k">print</span><span class="p">(</span><span class="n">doc</span><span class="o">.</span><span class="n">decode</span><span class="p">(</span><span class="s">"windows-1252"</span><span class="p">))</span>
<span class="c"># â˜ƒâ˜ƒâ˜ƒ“I like snowmen!”</span>
</pre>
                                    </div>
                                </div>
                                <p>문서를 UTF-8로 디코딩하면 <tt class="docutils literal"><span class="pre">UnicodeDecodeError</span></tt>가 일어나고, Windows-1252로 디코딩하면 알 수 없는 글자들이 출력된다. 다행스럽게도, <tt class="docutils literal"><span class="pre">UnicodeDammit.detwingle()</span></tt>는 그 문자열을 순수 UTF-8로 변환해 주므로, 유니코드로 디코드하면 눈사람과 따옴표를 동시에 화면에 보여줄 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="n">new_doc</span> <span class="o">=</span> <span class="n">UnicodeDammit</span><span class="o">.</span><span class="n">detwingle</span><span class="p">(</span><span class="n">doc</span><span class="p">)</span>
<span class="k">print</span><span class="p">(</span><span class="n">new_doc</span><span class="o">.</span><span class="n">decode</span><span class="p">(</span><span class="s">"utf8"</span><span class="p">))</span>
<span class="c"># ☃☃☃“I like snowmen!”</span>
</pre>
                                    </div>
                                </div>
                                <p><tt class="docutils literal"><span class="pre">UnicodeDammit.detwingle()</span></tt>는 오직 UTF-8에 임베드된 (또는 그 반대일 수도 있지만) Windows-1252을 다루는 법만 아는데, 이것이 가장 일반적인 사례이다.</p>
                                <p><tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt>이나 <tt class="docutils literal"><span class="pre">UnicodeDammit</span></tt> 구성자에 건네기 전에 먼저 데이터에 <tt class="docutils literal"><span class="pre">UnicodeDammit.detwingle()</span></tt>을 호출하는 법을 반드시 알아야 한다. 뷰티플수프는 문서에 하나의 인코딩만 있다고 간주한다. 그것이 무엇이든 상관없이 말이다. UTF-8과 Windows-1252를 모두 포함한 문서를 건네면, 전체 문서가 Windows-1252라고 생각할 가능성이 높고, 그 문서는 다음 ` â˜ƒâ˜ƒâ˜ƒ“I like snowmen!”`처럼 보일 것이다.</p>
                                <p><tt class="docutils literal"><span class="pre">UnicodeDammit.detwingle()</span></tt>은 뷰티플수프 4.1.0에서 새로 추가되었다.</p>
                            </div>
                        </div>
                    </div>
                    <div class="section" id="parsing-only-part-of-a-document">
                        <h1>문서의 일부만을 해석하기<a class="headerlink" href="#parsing-only-part-of-a-document" title="Permalink to this headline">¶</a></h1>
                        <p>뷰티플수프를 사용하여 문서에서 &lt;a&gt; 태그를 살펴보고 싶다고 해보자. 전체 문서를 해석해서 훓어가며 &lt;a&gt; 태그를 찾는 일은 시간 낭비이자 메모리 낭비이다. 처음부터 &lt;a&gt; 태그가 아닌 것들을 무시하는 편이 더 빠를 것이 분명하다. <tt class="docutils literal"><span class="pre">SoupStrainer</span></tt> 클래스는 문서에 어느 부분을 해석할지 고르도록 해준다. 그냥 <tt class="docutils literal"><span class="pre">SoupStrainer</span></tt>를 만들고 그것을 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 <tt class="docutils literal"><span class="pre">parse_only</span></tt> 인자로 건네면 된다.</p>
                        <p>(<em>이 특징은 html5lib 해석기를 사용중이라면 작동하지 않음을 주목하자</em>. html5lib을 사용한다면, 어쨋거나 문서 전체가 해석된다. 이것은 html5lib가 작업하면서 항상 해석 트리를 재정렬하기 때문이다. 문서의 일부가 실제로 해석 트리에 맞지 않을 경우, 충돌을 일으킨다. 혼란을 피하기 위해, 아래의 예제에서 뷰티플수프에게 파이썬의 내장 해석기를 사용하라고 강제하겠다.)</p>
                        <div class="section" id="soupstrainer">
                            <h2><tt class="docutils literal"><span class="pre">SoupStrainer</span></tt><a class="headerlink" href="#soupstrainer" title="Permalink to this headline">¶</a></h2>
                            <p><tt class="docutils literal"><span class="pre">SoupStrainer</span></tt> 클래스는 <a class="reference internal" href="#searching-the-tree">트리 탐색하기</a>의 전형적인 메쏘드와 같은 인자들을 취한다: <a class="reference internal" href="#id8"><em>name</em></a>, <a class="reference internal" href="#attrs"><em>attrs</em></a>, <a class="reference internal" href="#text"><em>text</em></a>, 그리고 <a class="reference internal" href="#kwargs"><em>**kwargs</em></a>이 그 인자들이다. 다음은 세 가지 <tt class="docutils literal"><span class="pre">SoupStrainer</span></tt> 객체이다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">SoupStrainer</span>

<span class="n">only_a_tags</span> <span class="o">=</span> <span class="n">SoupStrainer</span><span class="p">(</span><span class="s">"a"</span><span class="p">)</span>

<span class="n">only_tags_with_id_link2</span> <span class="o">=</span> <span class="n">SoupStrainer</span><span class="p">(</span><span class="nb">id</span><span class="o">=</span><span class="s">"link2"</span><span class="p">)</span>

<span class="k">def</span> <span class="nf">is_short_string</span><span class="p">(</span><span class="n">string</span><span class="p">):</span>
    <span class="k">return</span> <span class="nb">len</span><span class="p">(</span><span class="n">string</span><span class="p">)</span> <span class="o">&lt;</span> <span class="mi">10</span>

<span class="n">only_short_strings</span> <span class="o">=</span> <span class="n">SoupStrainer</span><span class="p">(</span><span class="n">text</span><span class="o">=</span><span class="n">is_short_string</span><span class="p">)</span>
</pre>
                                </div>
                            </div>
                            <p>다시 한 번 더“three sisters” 문서로 돌아가 보겠다. 문서를 세 가지 <tt class="docutils literal"><span class="pre">SoupStrainer</span></tt> 객체로 해석하면 어떻게 보이는지 살펴보자:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">html_doc</span> <span class="o">=</span> <span class="s">"""</span>
<span class="s">&lt;html&gt;&lt;head&gt;&lt;title&gt;The Dormouse's story&lt;/title&gt;&lt;/head&gt;</span>

<span class="s">&lt;p class="title"&gt;&lt;b&gt;The Dormouse's story&lt;/b&gt;&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;Once upon a time there were three little sisters; and their names were</span>
<span class="s">&lt;a href="http://example.com/elsie" class="sister" id="link1"&gt;Elsie&lt;/a&gt;,</span>
<span class="s">&lt;a href="http://example.com/lacie" class="sister" id="link2"&gt;Lacie&lt;/a&gt; and</span>
<span class="s">&lt;a href="http://example.com/tillie" class="sister" id="link3"&gt;Tillie&lt;/a&gt;;</span>
<span class="s">and they lived at the bottom of a well.&lt;/p&gt;</span>

<span class="s">&lt;p class="story"&gt;...&lt;/p&gt;</span>
<span class="s">"""</span>

<span class="k">print</span><span class="p">(</span><span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html_doc</span><span class="p">,</span> <span class="s">"html.parser"</span><span class="p">,</span> <span class="n">parse_only</span><span class="o">=</span><span class="n">only_a_tags</span><span class="p">)</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;a class="sister" href="http://example.com/elsie" id="link1"&gt;</span>
<span class="c">#  Elsie</span>
<span class="c"># &lt;/a&gt;</span>
<span class="c"># &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;</span>
<span class="c">#  Lacie</span>
<span class="c"># &lt;/a&gt;</span>
<span class="c"># &lt;a class="sister" href="http://example.com/tillie" id="link3"&gt;</span>
<span class="c">#  Tillie</span>
<span class="c"># &lt;/a&gt;</span>

<span class="k">print</span><span class="p">(</span><span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html_doc</span><span class="p">,</span> <span class="s">"html.parser"</span><span class="p">,</span> <span class="n">parse_only</span><span class="o">=</span><span class="n">only_tags_with_id_link2</span><span class="p">)</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># &lt;a class="sister" href="http://example.com/lacie" id="link2"&gt;</span>
<span class="c">#  Lacie</span>
<span class="c"># &lt;/a&gt;</span>

<span class="k">print</span><span class="p">(</span><span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html_doc</span><span class="p">,</span> <span class="s">"html.parser"</span><span class="p">,</span> <span class="n">parse_only</span><span class="o">=</span><span class="n">only_short_strings</span><span class="p">)</span><span class="o">.</span><span class="n">prettify</span><span class="p">())</span>
<span class="c"># Elsie</span>
<span class="c"># ,</span>
<span class="c"># Lacie</span>
<span class="c"># and</span>
<span class="c"># Tillie</span>
<span class="c"># ...</span>
<span class="c">#</span>
</pre>
                                </div>
                            </div>
                            <p>또한 <tt class="docutils literal"><span class="pre">SoupStrainer</span></tt>를 <a class="reference internal" href="#searching-the-tree">트리 탐색하기</a>에서 다룬 메쏘드에 건넬 수 있다. 이는 별로 유용하지는 않지만, 그럼에도 언급해 둔다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">html_doc</span><span class="p">)</span>
<span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="n">only_short_strings</span><span class="p">)</span>
<span class="c"># [u'\n\n', u'\n\n', u'Elsie', u',\n', u'Lacie', u' and\n', u'Tillie',</span>
<span class="c">#  u'\n\n', u'...', u'\n']</span>
</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="section" id="troubleshooting">
                        <h1>문제 해결<a class="headerlink" href="#troubleshooting" title="Permalink to this headline">¶</a></h1>
                        <div class="section" id="version-mismatch-problems">
                            <h2>버전 불일치 문제<a class="headerlink" href="#version-mismatch-problems" title="Permalink to this headline">¶</a></h2>
                            <ul class="simple">
                                <li><tt class="docutils literal"><span class="pre">SyntaxError:</span> <span class="pre">Invalid</span> <span class="pre">syntax</span></tt> (다음 <tt class="docutils literal"><span class="pre">ROOT_TAG_NAME</span> <span class="pre">=</span>
                                        <span class="pre">u'[document]'</span></tt> 줄에서): 코드를 변경하지 않고서, 파이썬 2 버전의 뷰티플수프를 파이썬 3 아래에서 사용하기 때문에 야기된다.</li>
                                <li><tt class="docutils literal"><span class="pre">ImportError:</span> <span class="pre">No</span> <span class="pre">module</span> <span class="pre">named</span> <span class="pre">HTMLParser</span></tt> - 파이썬 2 버전의 뷰티플수프를 파이썬 3 아래에서 사용하기 때문에 야기된다.</li>
                                <li><tt class="docutils literal"><span class="pre">ImportError:</span> <span class="pre">No</span> <span class="pre">module</span> <span class="pre">named</span> <span class="pre">html.parser</span></tt> - 파이썬 3 버전의 뷰티플수프를 파이썬 2에서 실행하기 때문에 야기된다.</li>
                                <li><tt class="docutils literal"><span class="pre">ImportError:</span> <span class="pre">No</span> <span class="pre">module</span> <span class="pre">named</span> <span class="pre">BeautifulSoup</span></tt> - 뷰티플수프 3 코드를 BS3가 설치되어 있지 않은 시스템에서 실행할 때 야기된다. 또는 꾸러미 이름이 <tt class="docutils literal"><span class="pre">bs4</span></tt>로 바뀌었음을 알지 못하고 뷰티플수프 4 코드를 실행하면 야기된다.</li>
                                <li><tt class="docutils literal"><span class="pre">ImportError:</span> <span class="pre">No</span> <span class="pre">module</span> <span class="pre">named</span> <span class="pre">bs4</span></tt> - 뷰티플수프 4 코드를 BS4가 설치되어 있지 않은 시스템에서 실행하면 야기된다.</li>
                            </ul>
                        </div>
                        <div class="section" id="parsing-xml">
                            <span id="id11"></span>
                            <h2>XML 해석하기<a class="headerlink" href="#parsing-xml" title="Permalink to this headline">¶</a></h2>
                            <p>기본값으로, 뷰티플수프는 문서를 HTML로 해석한다. 문서를 XML로 해석하려면, “xml”를 두 번째 인자로 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 건네야 한다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">markup</span><span class="p">,</span> <span class="s">"xml"</span><span class="p">)</span>
</pre>
                                </div>
                            </div>
                            <p><a class="reference internal" href="#parser-installation"><em>lxml이 설치되어 있어야 한다</em></a>.</p>
                        </div>
                        <div class="section" id="other-parser-problems">
                            <h2>기타 해석기 문제<a class="headerlink" href="#other-parser-problems" title="Permalink to this headline">¶</a></h2>
                            <ul class="simple">
                                <li>스크립트가 한 컴퓨터에서는 잘 되는데 다른 컴퓨터에서는 작동하지 않는다면, 아마도 두 컴퓨터가 다른 해석기를 가지고 있기 때문일 것이다. 예를 들어, lxml이 설치된 컴퓨터에서 스크립트를 개발해 놓고, 그것을 html5lib만 설치된 컴퓨터에서 실행하려고 했을 수 있다. 왜 이것이 문제가 되는지는 <a class="reference internal" href="#differences-between-parsers">해석기들 사이의 차이점</a>을 참고하고, <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 특정 라이브러리를 지정해서 문제를 해결하자.</li>
                                <li><tt class="docutils literal"><span class="pre">HTMLParser.HTMLParseError:</span> <span class="pre">malformed</span> <span class="pre">start</span> <span class="pre">tag</span></tt> or
                                    <tt class="docutils literal"><span class="pre">HTMLParser.HTMLParseError:</span> <span class="pre">bad</span> <span class="pre">end</span> <span class="pre">tag</span></tt> - 파이썬의 내장 HTML 해석기에 처리가 불가능한 문서를 건네면 야기된다. 다른 <tt class="docutils literal"><span class="pre">HTMLParseError</span></tt>도 아마 같은 문제일 것이다. 해결책:
                                    <a class="reference internal" href="#parser-installation"><em>lxml이나 html5lib를 설치하자.</em></a></li>
                                <li>알고 있는데 문서에서 그 태그를 발견할 수 없다면 (다시 말해,
                                    <tt class="docutils literal"><span class="pre">find_all()</span></tt>이 <tt class="docutils literal"><span class="pre">[]</span></tt>를 돌려주거나 <tt class="docutils literal"><span class="pre">find()</span></tt>가 <tt class="docutils literal"><span class="pre">None</span></tt>을 돌려줄 경우), 아마도 파이썬의 내장 HTML 해석기를 사용하고 있을 가능성이 높다. 이 해석기는 가끔 이해하지 못하면 그 태그를 무시하고 지나간다. 해결책: <a class="reference internal" href="#parser-installation"><em>lxml이나 html5lib를 설치하자.</em></a></li>
                                <li>
                                    <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.w3.org/TR/html5/syntax.html#syntax">HTML 태그와 속성</a>은 대소문자를 구별하므로, 세가지 HTML 해석기 모두 태그와 속성 이름을 소문자로 변환한다. 다시 말해, 다음 조판 &lt;TAG&gt;&lt;/TAG&gt;는 &lt;tag&gt;&lt;/tag&gt;로 변환된다. 태그와 속성에 대소문자 혼합 또는 대문자를 그대로 유지하고 싶다면, <a class="reference internal" href="#parsing-xml"><em>문서를 XML로 해석할 필요가 있다.</em></a></li>
                            </ul>
                        </div>
                        <div class="section" id="miscellaneous">
                            <h2>기타<a class="headerlink" href="#miscellaneous" title="Permalink to this headline">¶</a></h2>
                            <ul class="simple">
                                <li><tt class="docutils literal"><span class="pre">KeyError:</span> <span class="pre">[attr]</span></tt> - <tt class="docutils literal"><span class="pre">tag['attr']</span></tt>에 접근했는데 해당 태그에 <tt class="docutils literal"><span class="pre">attr</span></tt> 속성이 정의되어 있지 않을 때 야기된다. 가장 흔한 에러는 <tt class="docutils literal"><span class="pre">KeyError:</span> <span class="pre">'href'</span></tt> 그리고 <tt class="docutils literal"><span class="pre">KeyError:</span>
                                        <span class="pre">'class'</span></tt>이다. <tt class="docutils literal"><span class="pre">attr</span></tt>이 정의되어 있는지 잘 모르겠다면, 파이썬 사전에 그렇게 하듯이, <tt class="docutils literal"><span class="pre">tag.get('attr')</span></tt>을 사용하자.</li>
                                <li><tt class="docutils literal"><span class="pre">UnicodeEncodeError:</span> <span class="pre">'charmap'</span> <span class="pre">codec</span> <span class="pre">can't</span> <span class="pre">encode</span> <span class="pre">character</span>
                                        <span class="pre">u'\xfoo'</span> <span class="pre">in</span> <span class="pre">position</span> <span class="pre">bar</span></tt> (또는 그냥 기타 다른 <tt class="docutils literal"><span class="pre">UnicodeEncodeError</span></tt>에 관한 모든 것) - 이 에러는 뷰티플수프에 관련된 문제가 아니다 .이 문제는 두 가지 상황에서 출현한다. 첫 째, 유니코드 문자열을 인쇄했는데 콘솔이 표시할 줄 모를 경우가 있다. (<a class="reference external" href="https://web.archive.org/web/20150319200824/http://wiki.python.org/moin/PrintFails">파이썬 위키에서</a> 도움을 받자.) 둘째, 파일에 쓰는데 기본 인코딩으로 지원되지 않는 유니코드 문자열을 건넬 경우가 있다. 이런 경우, 가장 쉬운 해결책은 <tt class="docutils literal"><span class="pre">u.encode("utf8")</span></tt>을 지정해서 그 유니코드 문자열을 UTF-8로 명시적으로 인코드하는 것이다.</li>
                            </ul>
                        </div>
                        <div class="section" id="improving-performance">
                            <h2>수행성능 개선<a class="headerlink" href="#improving-performance" title="Permalink to this headline">¶</a></h2>
                            <p>뷰티플수프는 그 밑에 깔린 해석기보다 더 빠를 수는 없다. 응답 시간이 중요하다면, 다시 말해, 시간제로 컴퓨터를 쓰고 있거나 아니면 컴퓨터 시간이 프로그래머 시간보다 더 가치가 있는 다른 이유가 조금이라도 있다면, 그렇다면 뷰티플수프는 잊어 버리고 직접 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://lxml.de/">lxml</a> 위에 작업하는 편이 좋을 것이다.</p>
                            <p>그렇지만, 뷰티플수프의 속도를 높일 수 있는 방법이 있다. 아래에 해석기로 lxml을 사용하고 있지 않다면, <a class="reference internal" href="#parser-installation"><em>당장 시작해 보기를</em></a> 조언한다. 뷰티플수프는 html.parser나 html5lib를 사용하는 것보다 lxml을 사용하는 것이 문서를 상당히 더 빠르게 해석한다.</p>
                            <p><a class="reference external" href="https://web.archive.org/web/20150319200824/http://pypi.python.org/pypi/cchardet/">cchardet</a> 라이브러리를 설치하면 인코딩 탐지 속도를 상당히 높일 수 있다.</p>
                            <p>가끔 <a class="reference internal" href="#unicode-dammit">Unicode, Dammit</a>는 바이트별로 파일을 조사해서 인코딩을 탐지할 수 있을 뿐이다. 이 때문에 뷰티플수프가 기어가는 원인이 된다. 본인의 테스트에 의하면 이런 일은 파이썬 2.x 버전대에서만 일어나고, 러시아나 중국어 인코딩을 사용한 문서에 아주 많이 발생했다. 이런 일이 일어나면, cchardet을 설치하거나, 스크립트에 Python 3를 사용하여 문제를 해결할 수 있다. 혹시 문서의 인코딩을 안다면, 그 인코딩을 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 <tt class="docutils literal"><span class="pre">from_encoding</span></tt>로 건네면, 인코딩 탐지를 완전히 건너뛴다.</p>
                            <p><a class="reference internal" href="#parsing-only-part-of-a-document">문서의 일부만 해석하기</a>는 문서를 해석하는 시간을 많이 절약해 주지는 못하겠지만, 메모리가 절약되고, 문서를 훨씬 더 빨리 <cite>탐색할 수 있을 것이다</cite>.</p>
                        </div>
                    </div>
                    <div class="section" id="id12">
                        <h1>뷰티플수프 3<a class="headerlink" href="#id12" title="Permalink to this headline">¶</a></h1>
                        <p>뷰티플수프 3는 이전의 구형으로서, 더 이상 활발하게 개발되지 않는다. 현재는 주요 리눅스 배포본에 모두 함께 꾸려넣어진다:</p>
                        <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">apt-get</span> <span class="pre">install</span> <span class="pre">python-beautifulsoup</span></tt></p>
                        <p>또 PyPi를 통하여 <tt class="docutils literal"><span class="pre">BeautifulSoup</span>로</tt> 출간되어 있다:</p>
                        <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">easy_install</span> <span class="pre">BeautifulSoup</span></tt></p>
                        <p><tt class="kbd docutils literal"><span class="pre">$</span> <span class="pre">pip</span> <span class="pre">install</span> <span class="pre">BeautifulSoup</span></tt></p>
                        <p>
                            또한 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs3/download/3.x/BeautifulSoup-3.2.0.tar.gz">뷰티플수프 3.2.0</a> 압축파일을 내려받을 수 있다.</p>
                        <p><tt class="docutils literal"><span class="pre">easy_install</span> <span class="pre">beautifulsoup</span></tt>이나 <tt class="docutils literal"><span class="pre">easy_install</span> <span class="pre">BeautifulSoup</span></tt>을 실행했는데, 코드가 작동하지 않으면, 실수로 뷰티플수프 3을 설치한 것이다. <tt class="docutils literal"><span class="pre">easy_install</span> <span class="pre">beautifulsoup4</span></tt>을 실행할 필요가 있다.</p>
                        <p><a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs3/documentation.html">뷰티플수프 3 문서는 온라인에 보관되어 있다</a>. 모국어가 중국어라면, <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs3/documentation.zh.html">뷰티플수프 3 문서 중국어 번역본</a>을 보는 것이 더 쉬울 것이다. 그 다음에 이 문서를 읽고 뷰티플수프 4에서 변한 것들을 알아보자.</p>
                        <div class="section" id="porting-code-to-bs4">
                            <h2>BS4로 코드 이식하기<a class="headerlink" href="#porting-code-to-bs4" title="Permalink to this headline">¶</a></h2>
                            <p>
                                뷰티플수프 3용 코드는 하나만 살짝 바꾸면 뷰티플수프 4에도 작동한다. 꾸러미 이름을 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt>에서 <tt class="docutils literal"><span class="pre">bs4</span></tt>로 바꾸기만 하면 된다. 그래서 다음은:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="kn">from</span> <span class="nn">BeautifulSoup</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
</pre>
                                </div>
                            </div>
                            <p>다음과 같이 된다:</p>
                            <div class="highlight-python">
                                <div class="highlight">
                                    <pre><span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
</pre>
                                </div>
                            </div>
                            <ul class="simple">
                                <li>“No module named BeautifulSoup”와 같이 <tt class="docutils literal"><span class="pre">ImportError</span></tt>를 만난다면, 문제는 뷰티플수프 3 코드를 시도하는데 뷰티플수프 4만 설치되어 있기 때문이다.</li>
                                <li>“No module named bs4”와 같은 <tt class="docutils literal"><span class="pre">ImportError</span></tt>를 만난다면, 문제는 뷰티플수프 4 코드를 시도하는데 뷰티플수프 3만 설치되어 있기 때문이다.</li>
                            </ul>
                            <p>BS4는 BS3와 대부분 하위 호환성이 있으므로, 대부분의 메쏘드는 폐기되고 <a class="reference external" href="https://web.archive.org/web/20150319200824/http://www.python.org/dev/peps/pep-0008/">PEP 8을 준수하기 위해</a> 새로운 이름이 주어졌다. 이름바꾸기와 변화가 많이 있지만, 그 중에 몇 가지는 하위 호환성이 깨진다.</p>
                            <p>다음은 BS3 코드를 변환해 BS4에 이식하고자 할 때 알아야 할 것들이다:</p>
                            <div class="section" id="you-need-a-parser">
                                <h3>해석기가 필요해<a class="headerlink" href="#you-need-a-parser" title="Permalink to this headline">¶</a></h3>
                                <p>뷰티플수프 3는 파이썬의 <tt class="docutils literal"><span class="pre">SGMLParser</span></tt>해석기를 사용했다. 이 모듈은 파이썬 3.0에서 제거되었다. 뷰티플수프 4는 기본으로 <tt class="docutils literal"><span class="pre">html.parser</span></tt>을 사용하지만, 대신에 lxml이나 html5lib을 설치해 사용할 수있다. 비교는 <a class="reference internal" href="#installing-a-parser">해석기 설치하기</a>를 참조하자.</p>
                                <p>
                                    <tt class="docutils literal"><span class="pre">html.parser</span></tt>는 <tt class="docutils literal"><span class="pre">SGMLParser</span></tt>와 같은 해석기가 아니기 때문에, 무효한 조판을 다르게 취급한다. 보통 “차이점은” 무효한 조판을 다룰 경우 <tt class="docutils literal"> <span class="pre">html.parser</span></tt>가 해석기가 충돌을 일으키는 것이다. 이런 경우, 또다른 해석기를 설치할 필요가 있다. 그러나 <tt class="docutils literal"><span class="pre">html.parser</span></tt>는 <tt class="docutils literal"><span class="pre">SGMLParser</span></tt>와는 다른 해석 트리를 생성한다. 이런 일이 일어나면, BS3 코드를 업데이트하여 새로운 트리를 다루도록 해야 할 필요가 있다.</p>
                            </div>
                            <div class="section" id="method-names">
                                <h3>메쏘드 이름<a class="headerlink" href="#method-names" title="Permalink to this headline">¶</a></h3>
                                <ul class="simple">
                                    <li><tt class="docutils literal"><span class="pre">renderContents</span></tt> -&gt; <tt class="docutils literal"><span class="pre">encode_contents</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">replaceWith</span></tt> -&gt; <tt class="docutils literal"><span class="pre">replace_with</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">replaceWithChildren</span></tt> -&gt; <tt class="docutils literal"><span class="pre">unwrap</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findAll</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_all</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findAllNext</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_all_next</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findAllPrevious</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_all_previous</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findNext</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_next</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findNextSibling</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_next_sibling</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findNextSiblings</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_next_siblings</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findParent</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_parent</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findParents</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_parents</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findPrevious</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_previous</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findPreviousSibling</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_previous_sibling</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">findPreviousSiblings</span></tt> -&gt; <tt class="docutils literal"><span class="pre">find_previous_siblings</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">nextSibling</span></tt> -&gt; <tt class="docutils literal"><span class="pre">next_sibling</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">previousSibling</span></tt> -&gt; <tt class="docutils literal"><span class="pre">previous_sibling</span></tt></li>
                                </ul>
                                <p>뷰티플수프 구성자에 건네는 인자들 중에서 같은 이유로 이름이 바뀌었다:</p>
                                <ul class="simple">
                                    <li><tt class="docutils literal"><span class="pre">BeautifulSoup(parseOnlyThese=...)</span></tt> -&gt; <tt class="docutils literal"><span class="pre">BeautifulSoup(parse_only=...)</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">BeautifulSoup(fromEncoding=...)</span></tt> -&gt; <tt class="docutils literal"><span class="pre">BeautifulSoup(from_encoding=...)</span></tt></li>
                                </ul>
                                <p>파이썬 3와의 호환을 위해 한 가지 메쏘드 이름을 바꾸었다:</p>
                                <ul class="simple">
                                    <li><tt class="docutils literal"><span class="pre">Tag.has_key()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">Tag.has_attr()</span></tt></li>
                                </ul>
                                <p>더 정확한 용어를 위해 한 속성의 이름을 바꾸었다:</p>
                                <ul class="simple">
                                    <li><tt class="docutils literal"><span class="pre">Tag.isSelfClosing</span></tt> -&gt; <tt class="docutils literal"><span class="pre">Tag.is_empty_element</span></tt></li>
                                </ul>
                                <p>파이썬에서 특별한 의미가 있는 단어들을 피해서 세 가지 속성의 이름을 바꾸었다. 다른 것들과 다르게 이 변경사항은 <em>하위 호환이 되지 않는다.</em> 이런 속성을 BS3에 사용하면, BS4로 이식할 때 코드가 깨질 것이다.</p>
                                <ul class="simple">
                                    <li><tt class="docutils literal"><span class="pre">UnicodeDammit.unicode</span></tt> -&gt; <tt class="docutils literal"><span class="pre">UnicodeDammit.unicode_markup</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">Tag.next</span></tt> -&gt; <tt class="docutils literal"><span class="pre">Tag.next_element</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">Tag.previous</span></tt> -&gt; <tt class="docutils literal"><span class="pre">Tag.previous_element</span></tt></li>
                                </ul>
                            </div>
                            <div class="section" id="generators">
                                <h3>발생자<a class="headerlink" href="#generators" title="Permalink to this headline">¶</a></h3>
                                <p>발생자에 PEP 8을-준수하는 이름을 부여하고, 특성으로 변환하였다:</p>
                                <ul class="simple">
                                    <li><tt class="docutils literal"><span class="pre">childGenerator()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">children</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">nextGenerator()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">next_elements</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">nextSiblingGenerator()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">next_siblings</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">previousGenerator()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">previous_elements</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">previousSiblingGenerator()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">previous_siblings</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">recursiveChildGenerator()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">descendants</span></tt></li>
                                    <li><tt class="docutils literal"><span class="pre">parentGenerator()</span></tt> -&gt; <tt class="docutils literal"><span class="pre">parents</span></tt></li>
                                </ul>
                                <p>그래서 다음과 같이 하는 대신에:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">parent</span> <span class="ow">in</span> <span class="n">tag</span><span class="o">.</span><span class="n">parentGenerator</span><span class="p">():</span>
    <span class="o">...</span>
</pre>
                                    </div>
                                </div>
                                <p>다음과 같이 작성할 수 있다:</p>
                                <div class="highlight-python">
                                    <div class="highlight">
                                        <pre><span class="k">for</span> <span class="n">parent</span> <span class="ow">in</span> <span class="n">tag</span><span class="o">.</span><span class="n">parents</span><span class="p">:</span>
    <span class="o">...</span>
</pre>
                                    </div>
                                </div>
                                <p>(그러나 구형 코드도 여전히 작동한다.)</p>
                                <p>어떤 발생자들은 일이 끝난후 <tt class="docutils literal"><span class="pre">None</span></tt>을 돌려주곤 했다. 그것은 버그였다. 이제 발생자는 그냥 멈춘다.</p>
                                <p>두 가지 발생자가 새로 추가되었는데, <a class="reference internal" href="#string-generators"><em>.strings와 .stripped_strings</em></a>가 그것이다. <tt class="docutils literal"><span class="pre">.strings</span></tt>는 NavigableString 객체를 산출하고, <tt class="docutils literal"><span class="pre">.stripped_strings</span></tt>는 공백이 제거된 파이썬 문자열을 산출한다.</p>
                            </div>
                            <div class="section" id="xml">
                                <h3>XML<a class="headerlink" href="#xml" title="Permalink to this headline">¶</a></h3>
                                <p>이제 XML 해석을 위한 <tt class="docutils literal"><span class="pre">BeautifulStoneSoup</span></tt> 클래스는 더 이상 없다. XML을 해석하려면“xml”을 두번째 인자로 <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자에 건네야 한다. 같은 이유로, <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자는 더 이상 <tt class="docutils literal"><span class="pre">isHTML</span></tt> 인자를 인지하지 못한다.</p>
                                <p>뷰티플수프의 빈-원소 XML 태그 처리 방식이 개선되었다. 전에는 XML을 해석할 때 명시적으로 어느 태그가 빈-원소 태그로 간주되는지 지정해야 했었다. 구성자에 <tt class="docutils literal"><span class="pre">selfClosingTags</span></tt> 인자를 보내 봐야 더 이상 인지하지 못한다. 대신에,
                                    뷰티플수프는 빈 태그를 빈-원소 태그로 간주한다. 빈-원소 태그에 자손을 하나 추가하면, 더 이상 빈-원소 태그가 아니다.</p>
                            </div>
                            <div class="section" id="entities">
                                <h3>개체<a class="headerlink" href="#entities" title="Permalink to this headline">¶</a></h3>
                                <p>
                                    HTML이나 XML 개체가 들어 오면 언제나 그에 상응하는 유니코드 문자로 변환된다. 뷰티플수프 3는 개체들을 다루기 위한 방법이 중첩적으로 많았다. 이제 중복이 제거되었다. <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자는 더 이상
                                    <tt class="docutils literal"><span class="pre">smartQuotesTo</span></tt>이나 <tt class="docutils literal"><span class="pre">convertEntities</span></tt> 인자를 인지하지 않는다. (<a class="reference internal" href="#unicode-dammit">Unicode, Dammit</a>은 여전히 <tt class="docutils literal"><span class="pre">smart_quotes_to</span></tt>가 있지만, 그의 기본값은 이제 지능형 따옴표를 유니코드로 변환하는 것이다.)
                                    <tt class="docutils literal"><span class="pre">HTML_ENTITIES</span></tt>,
                                    <tt class="docutils literal"><span class="pre">XML_ENTITIES</span></tt>, 그리고 <tt class="docutils literal"><span class="pre">XHTML_ENTITIES</span></tt> 상수는 제거되었다. 왜냐하면 이제 더 이상 존재하지 않는 특징을 구성하기 때문이다 (유니코드 문자열을 제대로 모두 변환하지 못했다).</p>
                                <p>유니코드 문자들을 다시 출력시에 HTML 개체로 변환하고 싶다면, 그것들을 UTF-8 문자로 변환하기 보다, <a class="reference internal" href="#output-formatters"><em>출력 포맷터</em></a>를 사용할 필요가 있다.</p>
                            </div>
                            <div class="section" id="id13">
                                <h3>기타<a class="headerlink" href="#id13" title="Permalink to this headline">¶</a></h3>
                                <p><a class="reference internal" href="#string"><em>Tag.string</em></a>은 이제 재귀적으로 작동한다. 태그 A에 태그 B만 달랑 있고 다른 것이 없다면, A.string은 B.string과 똑같다. (이전에서는 None이었다.)</p>
                                <p><a class="reference internal" href="#multi-valued-attributes">다중-값 속성</a>은 <tt class="docutils literal"><span class="pre">class</span></tt>와 같이 문자열이 아니라 문자열 리스트를 그 값으로 가진다. 이 사실은 CSS 클래스로 검색하는 방식에 영향을 미친다.</p>
                                <p>
                                    <tt class="docutils literal"><span class="pre">find*</span></tt> 메쏘드에 <a class="reference internal" href="#text"><em>text</em></a> <cite> 그리고 </cite> <a class="reference internal" href="#id8"><em>name</em></a> 같은 태그-종속적 인자를 모두 건네면, 뷰티플수프는 태그-종속적 기준에 부합하고 그 태그의 <a class="reference internal" href="#string"><em>Tag.string</em></a>이 <a class="reference internal" href="#text"><em>text</em></a> 값에 부합하는 태그들을 탐색한다. 문자열 자체는 <cite>찾지 않는다</cite>. 이전에, 뷰티플수프는 태그-종속적 인자는 무시하고 문자열을 찾았다.</p>
                                <p>
                                    <tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt> 구성자는 더 이상 <cite>markupMassage</cite> 인자를 인지하지 않는다. 이제 조판을 제대로 처리하는 일은 해석기의 책임이다..</p>
                                <p><tt class="docutils literal"><span class="pre">ICantBelieveItsBeautifulSoup</span></tt> 그리고 <tt class="docutils literal"><span class="pre">BeautifulSOAP</span></tt>와 같이 거의-사용되지 않는 해석기 클래스는 제거되었다. 이제 애매모호한 조판을 처리하는 방법은 해석기가 결정한다.</p>
                                <p>
                                    <tt class="docutils literal"><span class="pre">prettify()</span></tt> 메쏘드는 이제, bytestring이 아니라 유니코드 문자열을 돌려준다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sphinxsidebar">
            <div class="sphinxsidebarwrapper">
                <h3><a href="#">목차</a></h3>
                <ul>
                    <li><a class="reference internal" href="#">뷰티플수프 문서</a>
                        <ul>
                            <li><a class="reference internal" href="#getting-help">도움 얻기</a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#quick-start">빨리 시작하기</a></li>
                    <li><a class="reference internal" href="#installing-beautiful-soup">뷰티플수프 설치</a>
                        <ul>
                            <li><a class="reference internal" href="#problems-after-installation">설치 이후의 문제</a></li>
                            <li><a class="reference internal" href="#installing-a-parser">해석기 설치하기</a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#making-the-soup">수프 만들기</a></li>
                    <li><a class="reference internal" href="#kinds-of-objects">객체의 종류</a>
                        <ul>
                            <li><a class="reference internal" href="#tag"><tt class="docutils literal"><span class="pre">태그(Tag)</span></tt></a>
                                <ul>
                                    <li><a class="reference internal" href="#name">이름(Name)</a></li>
                                    <li><a class="reference internal" href="#attributes">속성(Attributes)</a>
                                        <ul>
                                            <li><a class="reference internal" href="#multi-valued-attributes">다중-값 속성(Multi-valued attributes)</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a class="reference internal" href="#navigablestring"><tt class="docutils literal"><span class="pre">NavigableString</span></tt></a></li>
                            <li><a class="reference internal" href="#beautifulsoup"><tt class="docutils literal"><span class="pre">BeautifulSoup</span></tt></a></li>
                            <li><a class="reference internal" href="#comments-and-other-special-strings">주석 그리고 기타 특수 문자들</a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#navigating-the-tree">트리 항해하기</a>
                        <ul>
                            <li><a class="reference internal" href="#going-down">트리 내려가기</a>
                                <ul>
                                    <li><a class="reference internal" href="#navigating-using-tag-names">태그 이름을 사용하여 항해하기</a></li>
                                    <li><a class="reference internal" href="#contents-and-children"><tt class="docutils literal"><span class="pre">.contents</span></tt>와 <tt class="docutils literal"><span class="pre">.children</span></tt></a></li>
                                    <li><a class="reference internal" href="#descendants"><tt class="docutils literal"><span class="pre">.descendants</span></tt></a></li>
                                    <li><a class="reference internal" href="#string"><tt class="docutils literal"><span class="pre">.string</span></tt></a></li>
                                    <li><a class="reference internal" href="#strings-and-stripped-strings"><tt class="docutils literal"><span class="pre">.strings</span></tt>와 <tt class="docutils literal"><span class="pre">stripped_strings</span></tt></a></li>
                                </ul>
                            </li>
                            <li><a class="reference internal" href="#going-up">올라가기</a>
                                <ul>
                                    <li><a class="reference internal" href="#parent"><tt class="docutils literal"><span class="pre">.parent</span></tt></a></li>
                                    <li><a class="reference internal" href="#parents"><tt class="docutils literal"><span class="pre">.parents</span></tt></a></li>
                                </ul>
                            </li>
                            <li><a class="reference internal" href="#going-sideways">옆으로 가기</a>
                                <ul>
                                    <li><a class="reference internal" href="#next-sibling-and-previous-sibling"><tt class="docutils literal"><span class="pre">.next_sibling</span></tt>와 <tt class="docutils literal"><span class="pre">.previous_sibling</span></tt></a></li>
                                    <li><a class="reference internal" href="#next-siblings-and-previous-siblings"><tt class="docutils literal"><span class="pre">.next_siblings</span></tt>와 <tt class="docutils literal"><span class="pre">.previous_siblings</span></tt></a></li>
                                </ul>
                            </li>
                            <li><a class="reference internal" href="#going-back-and-forth">앞뒤로 가기</a>
                                <ul>
                                    <li><a class="reference internal" href="#next-element-and-previous-element"><tt class="docutils literal"><span class="pre">.next_element</span></tt>와 <tt class="docutils literal"><span class="pre">.previous_element</span></tt></a></li>
                                    <li><a class="reference internal" href="#next-elements-and-previous-elements"><tt class="docutils literal"><span class="pre">.next_elements</span></tt>와 <tt class="docutils literal"><span class="pre">.previous_elements</span></tt></a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#searching-the-tree">트리 탐색하기</a>
                        <ul>
                            <li><a class="reference internal" href="#kinds-of-filters">여과기의 종류</a>
                                <ul>
                                    <li><a class="reference internal" href="#a-string">문자열</a></li>
                                    <li><a class="reference internal" href="#a-regular-expression">정규 표현식</a></li>
                                    <li><a class="reference internal" href="#a-list">리스트</a></li>
                                    <li><a class="reference internal" href="#true"><tt class="docutils literal"><span class="pre">True</span></tt></a></li>
                                    <li><a class="reference internal" href="#a-function">함수</a></li>
                                </ul>
                            </li>
                            <li><a class="reference internal" href="#find-all"><tt class="docutils literal"><span class="pre">find_all()</span></tt></a>
                                <ul>
                                    <li><a class="reference internal" href="#the-name-argument"> <tt class="docutils literal"><span class="pre">name</span></tt> 인자</a></li>
                                    <li><a class="reference internal" href="#the-keyword-arguments">키워드 인자</a></li>
                                    <li><a class="reference internal" href="#searching-by-css-class">CSS 클래스로 탐색하기</a></li>
                                    <li><a class="reference internal" href="#the-text-argument"><tt class="docutils literal"><span class="pre">text</span></tt> 인자</a></li>
                                    <li><a class="reference internal" href="#the-limit-argument"><tt class="docutils literal"><span class="pre">limit</span></tt> 인자</a></li>
                                    <li><a class="reference internal" href="#the-recursive-argument"><tt class="docutils literal"><span class="pre">recursive</span></tt> 인자</a></li>
                                </ul>
                            </li>
                            <li><a class="reference internal" href="#calling-a-tag-is-like-calling-find-all">태그를 호출하는 것은 <tt class="docutils literal"><span class="pre">find_all()</span></tt></a>을 호출하는 것과 같다.</li>
                            <li><a class="reference internal" href="#find"><tt class="docutils literal"><span class="pre">find()</span></tt></a></li>
                            <li><a class="reference internal" href="#find-parents-and-find-parent"><tt class="docutils literal"><span class="pre">find_parents()</span></tt>와 <tt class="docutils literal"><span class="pre">find_parent()</span></tt></a></li>
                            <li><a class="reference internal" href="#find-next-siblings-and-find-next-sibling"><tt class="docutils literal"><span class="pre">find_next_siblings()</span></tt>와 <tt class="docutils literal"><span class="pre">find_next_sibling()</span></tt></a></li>
                            <li><a class="reference internal" href="#find-previous-siblings-and-find-previous-sibling"><tt class="docutils literal"><span class="pre">find_previous_siblings()</span></tt>와 <tt class="docutils literal"><span class="pre">find_previous_sibling()</span></tt></a></li>
                            <li><a class="reference internal" href="#find-all-next-and-find-next"><tt class="docutils literal"><span class="pre">find_all_next()</span></tt>와 <tt class="docutils literal"><span class="pre">find_next()</span></tt></a></li>
                            <li><a class="reference internal" href="#find-all-previous-and-find-previous"><tt class="docutils literal"><span class="pre">find_all_previous()</span></tt>와 <tt class="docutils literal"><span class="pre">find_previous()</span></tt></a></li>
                            <li><a class="reference internal" href="#css-selectors">CSS 선택자</a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#modifying-the-tree">트리 변경하기</a>
                        <ul>
                            <li><a class="reference internal" href="#changing-tag-names-and-attributes">태그 이름과 속성을 바꾸기</a></li>
                            <li><a class="reference internal" href="#modifying-string"><tt class="docutils literal"><span class="pre">.string</span></tt></a> 변경하기</li>
                            <li><a class="reference internal" href="#append"><tt class="docutils literal"><span class="pre">append()</span></tt></a></li>
                            <li><a class="reference internal" href="#beautifulsoup-new-string-and-new-tag"><tt class="docutils literal"><span class="pre">BeautifulSoup.new_string()</span></tt>와 <tt class="docutils literal"><span class="pre">.new_tag()</span></tt></a></li>
                            <li><a class="reference internal" href="#insert"><tt class="docutils literal"><span class="pre">insert()</span></tt></a></li>
                            <li><a class="reference internal" href="#insert-before-and-insert-after"><tt class="docutils literal"><span class="pre">insert_before()</span></tt>와 <tt class="docutils literal"><span class="pre">insert_after()</span></tt></a></li>
                            <li><a class="reference internal" href="#clear"><tt class="docutils literal"><span class="pre">clear()</span></tt></a></li>
                            <li><a class="reference internal" href="#extract"><tt class="docutils literal"><span class="pre">extract()</span></tt></a></li>
                            <li><a class="reference internal" href="#decompose"><tt class="docutils literal"><span class="pre">decompose()</span></tt></a></li>
                            <li><a class="reference internal" href="#replace-with"><tt class="docutils literal"><span class="pre">replace_with()</span></tt></a></li>
                            <li><a class="reference internal" href="#wrap"><tt class="docutils literal"><span class="pre">wrap()</span></tt></a></li>
                            <li><a class="reference internal" href="#unwrap"><tt class="docutils literal"><span class="pre">unwrap()</span></tt></a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#output">출력</a>
                        <ul>
                            <li><a class="reference internal" href="#pretty-printing">예쁘게 인쇄하기</a></li>
                            <li><a class="reference internal" href="#non-pretty-printing">있는 그대로 인쇄하기</a></li>
                            <li><a class="reference internal" href="#output-formatters">출력 포맷</a></li>
                            <li><a class="reference internal" href="#get-text"><tt class="docutils literal"><span class="pre">get_text()</span></tt></a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#specifying-the-parser-to-use">해석기 지정하기</a>
                        <ul>
                            <li><a class="reference internal" href="#differences-between-parsers">해석기 사이의 차이점</a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#encodings">인코딩</a>
                        <ul>
                            <li><a class="reference internal" href="#output-encoding">출력 인코딩</a></li>
                            <li><a class="reference internal" href="#unicode-dammit">이런, 유니코드군</a>
                                <ul>
                                    <li><a class="reference internal" href="#smart-quotes">지능형 따옴표</a></li>
                                    <li><a class="reference internal" href="#inconsistent-encodings">비일관적인 인코딩</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#parsing-only-part-of-a-document">문서의 일부만 해석하기</a>
                        <ul>
                            <li><a class="reference internal" href="#soupstrainer"><tt class="docutils literal"><span class="pre">SoupStrainer</span></tt></a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#troubleshooting">문제 해결</a>
                        <ul>
                            <li><a class="reference internal" href="#version-mismatch-problems">버전 불일치 문제</a></li>
                            <li><a class="reference internal" href="#parsing-xml">XML 해석하기</a></li>
                            <li><a class="reference internal" href="#other-parser-problems">기타 해석기 문제</a></li>
                            <li><a class="reference internal" href="#miscellaneous">잡동사니</a></li>
                            <li><a class="reference internal" href="#improving-performance">수행성능 향상하기</a></li>
                        </ul>
                    </li>
                    <li><a class="reference internal" href="#id12">뷰티플수프 3</a>
                        <ul>
                            <li><a class="reference internal" href="#porting-code-to-bs4">BS4로 코드 이식하기</a>
                                <ul>
                                    <li><a class="reference internal" href="#you-need-a-parser">해석기가 필요해</a></li>
                                    <li><a class="reference internal" href="#method-names">메쏘드 이름</a></li>
                                    <li><a class="reference internal" href="#generators">발생자</a></li>
                                    <li><a class="reference internal" href="#xml">XML</a></li>
                                    <li><a class="reference internal" href="#entities">개체</a></li>
                                    <li><a class="reference internal" href="#id13">기타</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h3>이 페이지</h3>
                <ul class="this-page-menu">
                    <li><a href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs4/doc/_sources/index.txt" rel="nofollow">소스 보여주기</a></li>
                </ul>
                <div id="searchbox" style="">
                    <h3>빠른 검색</h3>
                    <form class="search" action="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs4/doc/search.html" method="get">
                        <input name="q" type="text">
                        <input value="Go" type="submit">
                        <input name="check_keywords" value="yes" type="hidden">
                        <input name="area" value="default" type="hidden">
                    </form>
                    <p class="searchtip" style="font-size: 90%;">
                        용어나 모듈, 클래스 또는 함수 이름을 입력하시오.
                    </p>
                </div>
            </div>
        </div>
        <div class="clearer"></div>
    </div>
    <div class="related">
        <h3>항해</h3>
        <ul>
            <li class="right" style="margin-right: 10px;">
                <a href="https://web.archive.org/web/20150319200824/http://www.crummy.com/software/BeautifulSoup/bs4/doc/genindex.html" title="General Index">인덱스</a></li>
            <li><a href="#">뷰티플수프 4.0.0 문서</a> »</li>
        </ul>
    </div>
    <div class="footer">
        © Copyright 2012, Leonard Richardson.
        Created using <a href="https://web.archive.org/web/20150319200824/http://sphinx.pocoo.org/">Sphinx</a> 1.1.3.
    </div>
</body>

</html>
<!--
     FILE ARCHIVED ON 20:08:24 Mar 19, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:34:36 Aug 18, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
-->
<!--
playback timings (ms):
  exclusion.robots.policy: 0.335
  LoadShardBlock: 98.55 (3)
  RedisCDXSource: 6.64
  esindex: 0.012
  exclusion.robots: 0.352
  captures_list: 121.992
  PetaboxLoader3.datanode: 64.6 (4)
  CDXLines.iter: 13.243 (3)
  load_resource: 271.738
  PetaboxLoader3.resolve: 114.677
-->