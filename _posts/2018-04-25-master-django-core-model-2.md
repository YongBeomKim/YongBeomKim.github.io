---
title : Master Django | model Access
last_modified_at: 2018-04-27T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
tags: 
    - django
    - pyton
toc: true    
---


## 데이터 생성 및 호출 

1. .save() : SQL INSERT
2. .objects() : SQL SELECT
3. .create() : 단일객체로 DB에 바로 저장한다

```python
# DataBase와 상호작용 모델 class 를 호출한다
from books.models import Publisher

p1 = Publisher(name='Apress', address='2855 Telegraph Ave', 
               city='Berkeley', state_province='CA', 
               country='USA', website='http://www.apress.com/')

p2 = Publisher(name='OReilly', address='10 Fawcett St', 
               city='Cambridge', state_province='MA', 
               country='USA', website='http://www.oreilly.com/')
p1.save()
p2.save()
```


```python
publisher_list = Publisher.objects.all()
publisher_list

<QuerySet [<Publisher: Publisher object (1)>, <Publisher: Publisher object (2)>]>
```



## Model의 문자열 표현 추가

DataBase QuerySet 결과를 출력하면 `<QuerySet [<Publisher: Publisher object (1)>, <Publisher: Publisher object (2)>]>` 와 같이 해석이 어려워서, 이름을 표현할 대표 컬럼을 지정한다 

```python
# models.py

class Publisher(models.Model):
    name           = models.CharField(max_length=30)

    def __str__(self):
        return self.name
```


```python
from books.models import Publisher
publisher_list = Publisher.objects.all()
publisher_list

<QuerySet [<Publisher: Apress>, <Publisher: OReilly>]>
```

**__str__:** 유일한 제약조건은 문자열만 반환가능하고, 숫자등은 오류가 발행한다 
{: .notice--danger}



## 데이터 삽입 및 업데이트

```python
p = Publisher(name='Apress', address='2855 Telegraph Ave', 
            city='Berkeley', state_province='CA', 
            country='USA', website='http://www.apress.com/')
p.save()
p.id

3
```


개별 컬럼만 변경도 가능하다

```python
p.name = 'Apress Publishing'  
p.save()

publisher_list = Publisher.objects.all()
publisher_list

<QuerySet [<Publisher: Apress>, <Publisher: OReilly>, 
<Publisher: Apress Publishing>]>
```


.update() 메소드를 활용하면 여러 쿼리를 단일데이터로 변경한다 

```python
Publisher.objects.all().update(country='U.S.A')
3  # 변환된 레코드의 수를 출력한다

Publisher.objects.filter(country='U.S.A')
<QuerySet [<Publisher: Apress>, <Publisher: OReilly>, <Publisher: Apress Publishing>]>
```



## 전체 데이터 필터링

.filter() : [list]처럼 취급 가능한 QuerySet 결과를 반환한다

```python
Publisher.objects.filter(name='Apress')
<QuerySet [<Publisher: Apress>]>
```


여러 인수는 SQL 의 AND 로 연결된다

```python
Publisher.objects.filter(country='USA', state_province='CA')
<QuerySet [<Publisher: Apress>, <Publisher: Apress Publishing>]>
```



## 단일 객체 검색 

.get() : 단일 객체만 추출한다

```python
Publisher.objects.get(name='Apress')
<Publisher: Apress>

# 대상 객체가 여럿이면 오류를 출력한다 
Publisher.objects.get(country='USA')
MultipleObjectsReturned: get() returned more than one Publisher 

# 대상 객체가 없어도 오류를 출력한다
Publisher.objects.get(country='Korea')
DoesNotExist Traceback (most recent call last)
```


.get() 작업에는 Publisher.DoesNotExist 를 활용하여 예외처리를 한다 

```python
search_name = 'Apression'

try:
    p = Publisher.objects.get(name = search_name)
except Publisher.DoesNotExist:
    print(search_name, 'is not in the DataBase')
else:
    print(search_name, 'is in the DataBase')

Apression is not in the DataBase    
```



## 데이터 정렬 

.order_by() : 알파벳 순서에 따라 결과값을 정렬한다 

```python
Publisher.objects.order_by("name")

<QuerySet [<Publisher: Apress>, <Publisher: Apress Publishing>, <Publisher: OReilly>]>
```


여러필드를 기준으로 정렬한다

```python
Publisher.objects.order_by("state_province", 'address')

<QuerySet [<Publisher: Apress>, <Publisher: Apress Publishing>, <Publisher: OReilly>]>

```


'-' 접두사를 활용하면, **내림차순** 으로 정렬한다 

```python
Publisher.objects.order_by("-name")

<QuerySet [<Publisher: OReilly>, <Publisher: Apress Publishing>, <Publisher: Apress>]>
```


하지만 이는 불필요한 반복을 요구하므로, 모델의 정의할때 기본 순서를 지정한다 

```python
# models.py

class Publisher(models.Model):
    name           = models.CharField(max_length=30)

    class Meta:
        ordering = ['name']
```



## Chaining Lookup (여러 조건을 함께 적용)

```python
Publisher.objects.filter(country='USA').order_by("-name")

<QuerySet [<Publisher: OReilly>, <Publisher: Apress Publishing>, <Publisher: Apress>]>
```



## 데이터 Slicing

QuerySet 객체중 일부만 추출하기 

```python
Publisher.objects.order_by('name')[0]
<Publisher: Apress>

Publisher.objects.order_by('name')[0:2]
<QuerySet [<Publisher: Apress>, <Publisher: Apress Publishing>]>
```

**[-1]:** 음수를 이용한 자르기는 지원하지 않는다 `[-1] AsertionError를 출력`
{: .notice--danger}



## 객체의 삭제

인스턴스 객체를 사용하여 지우기

```python
p = Publisher.objects.get(name='OReilly')
p.delete()

(1, {'books.Publisher': 1})
```


.filter() 등을 활용하여 특정 내용 지우기

```python
Publisher.objects.filter(country='U.S.A').delete()
(2, {'books.Publisher': 2})

Publisher.objects.all()
<QuerySet []>
```
