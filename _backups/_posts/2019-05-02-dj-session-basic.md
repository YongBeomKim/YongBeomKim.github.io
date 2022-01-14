---
title : Django Session 의 활용
last_modified_at: 2019-05-02T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - modal
    - django
toc: true 
---

**베프의 파이썬 웹 프로그래밍** 의 장바구니 부분에 서술된 **Session** 활용 예제 내용을 간단히 정리해 보겠습니다.

Session 이라는 DataBase 에 필요한 내용을 저장 및 호출하는 방식으로 간단하게 활용이 가능합니다.

<br/>
# Django 에서 Session 의 활용

```python
from django.shortcuts import render
from django.http import HttpResponseRedirect
from .forms import BookForm
from .models import Book

# Create your views here.

from django.http import HttpResponse


def home(request):
    request.session.set_expiry(10)    # 10초 뒤 해당 세션을 삭제
    cart = request.session['temp'] = {}
    # 1번 id를 지정
    cart[1] = {}
    cart[1]['pc'] = 'Desktop'
    cart[1]['price'] = 500
    # 2번 id를 지정
    cart[2] = {}
    cart[2]['pc'] = 'NoteBook'
    cart[2]['price'] = 1000
    print(cart)
    return HttpResponse(cart[2]['pc'])

def home_(request):
    print(request.session)
    # print(dir(request.session))
    request.session.set_expiry(10)    # 10초 뒤 해당 세션을 삭제
    print(request.session.session_key)
    request.session['first_name'] = 'Kim'    # 임의의 Key 값을 사용해서 입력
    request.session['first_name'] = 'Lee'    # 임의의 Key 값을 사용해서 입력
    'session_key', 'set_expiry'
    print(request.session.get("first_name")) # 다른 함수에서 호출해도 동일한 결과값 도출
    return HttpResponse(dir(request.session))


def book(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        if form.is_valid():
            booking = form.save()
            request.session['pk'] = booking.pk
            return HttpResponseRedirect('book:detail')
        else:
            form = BookForm()
        content = {'form' : form }
        return render(request, 'book/list.html', content)

def detail(request):
    book_form_id = request.session.get('pk')
    booking = Book.objects.get(id=book_form_id)
    content = {'booking':booking}
    return render(request, 'book/detail.html', content)
```

