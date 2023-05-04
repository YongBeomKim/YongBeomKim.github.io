---
layout: blog
title: Django for Json
tags:
- django
---

Django 의 Template 문법을 HTML 이 아닌 JavaScript 와 상호작용을 위한 내용을 살펴보겠습니다.

<br />

# **Django 의 View 구분**

## **1 Model View Controller**

- **DB(SQL) Model**, **Template(HTML, JavaScript) View** 그리고 이들을 **Controller 기능을 하는 Django Python Module**

## **2 Django 의 View 기능 구분**

- Presentation View : DB 의 결과값을 보여주기만 하는 View
- Functional View : Client 의 Event 를 반영한 DB 결과값을 보여주는 View
	1. props View : 상수 결과값을 보여주는 View
		- Input : 사용자 입력
	2. state View : 값이 변화하는 View 
		- Form : 선택적 반응 

<br />

# **Django 의 View 변수값**

View 에서 **변수 내용** 에 따라서 다른 결과값을 연산하는 경우, 값을 받는 경로 2가지가 있습니다.

## **1 URL Parametor**

정규식의 **Named Capturing Group (`?P<그룹명>정규식`)** 을 활용하여  **URL** 입력값을 활용하면, **함수의 파라미터** 로 **직접** 받아서 함수를 실행합니다. 

```python
{% raw %}
# Regex 의 Named Capturing Group 을 사용 합니다

urlpatterns = [
	re_path('calender/month/(?P<month>[0-9]{1,2})/$', views.calender),
]

# urls.py 에서 받은 변수값을 바로 적용
def calender(request, month="1"):
	return ...
{% endraw %}
```

## **2 Form GET, POST Parametor**

**Client** 의 Input, TextArea 등으로 입력된 값은 **간접적** 으로 `request` 객체를 거쳐서 활용 가능합니다. React.js 와 Django Template 에서 구분자로 **중괄호 `{}` (curly braces)** 를 사용한 부분을 중심으로 이해 하도록 합니다.
~
```python
# URL GET Parametor 를 활용한 연산
def search(request):
    if 'q' in request.GET:
        query = request.GET['q']
        ...
    return render(request, 'search.html', content)


# Field POST Parametor 를 활용한 연산
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
        	...
    return render(request, 'contact.html', {'form':form})
```

이름을 정하는 작업이 어려운 과정 중 하나인데, 코딩에서는 `_` 를 많이 활용하고 URL 에서는 `-` 을 사용하면 구분이 더 용이 합니다.
{: .notice--success}

<br />

# **Passing Data Python to Template**

## **1 Passing the Data to JavaScript ([GeeksforGeeks](https://www.geeksforgeeks.org/how-to-pass-data-to-javascript-in-django-framework/))**

Python 에서 **JavaScript/JSON** 객체를 생성하고, Template 에서 받아서 적용하는 예제 입니다.

```python
from django.shortcuts import render 
import json

def send_dictionary(request): 
    dataDictionary = { 
        'hello': 'World', 
        'ABC': 123, 
        456: 'abc', 
        14000605: 1, 
        'list': ['geeks', 4, 'geeks'], 
        'dictionary': {'you': 'can', 'send': 'anything', 3: 1} 
    }  
    content = {
        'data': json.dumps(dataDictionary) # dump data
    }
    return render(request, 'landing.html', content) 
```

JavaScript/JSON 객체를 Django Template 에서 받을 때에는 <b style="color:red">[escapejs](https://docs.djangoproject.com/en/3.0/ref/templates/builtins/#escapejs)</b> 필터를 사용 합니다. 

Escapes characters for use in JavaScript strings. This does not make the string safe for use in HTML or JavaScript template literals, but does protect you from syntax errors when using templates to generate JavaScript/JSON.
{: .notice--info}

객체의 Key 값은 숫자와 문자인 경우 모두 "" 를 사용해서 호출 합니다.

```javascript
const data = JSON.parse("{{data|escapejs}}"); 
console.log(data);
console.log(data["ABC"]);
console.log(data["456"]);
console.log(data["dictionary"]);

var dataNode = document.getElementById('alldata'); 
dataNode.innerHTML += "{{data|escapejs}}"; 
dataNode = document.getElementById('neatdata'); 
for(var x in data){ 
    dataNode.innerHTML += x+' : '+data[x]+'<br><br>'; 
} 
```

<br />

## 참고문서들

1. **[Django 공식문서 Template Tag](https://docs.djangoproject.com/ko/3.0/ref/templates/builtins/)**
2. **[Django 맛보기](https://swarf00.github.io/2018/11/23/get-started.html)**
3. **[예제로 배우는 Django](http://pythonstudy.xyz/python/article/310-Django-%EB%AA%A8%EB%8D%B8-API)**
4. **[HTML 에서 React.js 추가](https://ko.reactjs.org/docs/add-react-to-a-website.html)**
5. **[Django ORM Cookbook 한글](https://django-orm-cookbook-ko.readthedocs.io/en/latest/index.html)**
6. **[반드시 알아야 할 ORM 5가지](https://medium.com/@chrisjune_13837/django-%EB%8B%B9%EC%8B%A0%EC%9D%B4-%EB%AA%B0%EB%9E%90%EB%8D%98-orm-%EA%B8%B0%EC%B4%88%EC%99%80-%EC%8B%AC%ED%99%94-592a6017b5f5)**\
7. **[Convert Django Website to a Progressive Web App (Part 1/2)](https://medium.com/beginners-guide-to-mobile-web-development/convert-django-website-to-a-progressive-web-app-3536bc4f2862)**
8. **[React and Django play well together ](https://fractalideas.com/blog/making-react-and-django-play-well-together-hybrid-app-model/)**
9. **[Django 와 React 활용 Progressive Web App](https://www.slideshare.net/jayjin0427/progressive-web-app-feat-react-django-82499585)**  **[Github Source (Dj1.1)](https://github.com/milooy/react-django-pwa-kit)**