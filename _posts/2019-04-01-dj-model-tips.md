---
title : Django Project - Model
last_modified_at: 2019-01-14T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django_pro.png
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

filter, Signals, per_post, ordering..

# **Filter**

내가 필요한 값을 호출하는 경우 기본적인 메소드가 **.filter** 입니다.
모델 객체의 값을 가져오는 경우, 또는 상속받는 **부모의 값**을 가져오는 경우로 나뉠 수 있습니다. 주의할 점은 `.get()` 은 1개의 값을 가져오지만, `.filter()` 는 **배열 객체를 호출 (python [list])** 하는 점에 유의 합니다

```python
>> from books.models import Books, Author
>> Books.objects.filter(name="장고 마스터 북")
>> Books.objects.filter(name="장고", date="2019-04-01")
>> Books.objects.filter(name__icontains="장고")
>> Books.objects.filter(author__name__icontains="김")

>> a = Author.object.get(name="홍길동")
>> a.books_set.all()
```
`Books.objects.filter(author__name__icontains="김")` 에서 **author** 와 **name** 은 테이블의 **필드 이름**을 활용합니다.

Author 기본키 테이블을 상속받는 Books 테이블을 조회시, `a.books_set.all()` 에서 **books** 는 **테이블의 이름**을 활용하는 차이에 유의합니다.

위의 `books_set` 역직렬화 메소드 이름은, `models.ForeignKet(Author, related_name='bookauthor') 와 같이, 사용자가 임의로 정의할 수 있습니다.

그리고 조회조건은 `(name="장고", date="2019-04-01")` 에서처럼 2가지 이상을 활용한 검색을 활용하면 훨씬 유용합니다.

<br/>
# **Signals & Save**
모델 클래스의 필드에 추가할 내용들을 정리해 보겠습니다. 검색결과 `pre_save, post_save, save` 어떤게 좋은가 에 대한 답 [post_save vs pre_save vs override save method](https://www.codingforentrepreneurs.com/blog/post-save-vs-pre-save-vs-override-save-method/)

위 내용의 결론은 `.save()` 에 내용 추가 보다는, 초기 실행조건을 활용한 `Signals` 의 `post_save, pre_save, post_delete, pre_delete` 방법을 활용하는 것을 추천하고 있습니다.

## **Property**
[(stackflow)](https://stackoverflow.com/questions/17682567/how-to-add-a-calculated-field-to-a-django-model) 같은 튜플의 값을 재활용 하는 경우에는 `property` 데코레이터를 활용합니다.

```python
class Python(models.Model):
    name = models.CharField()

    @property
    def test(self):
        return self.name + 'Python'
```

## **Signals 기초**
JustDjango 에서 소개된 Signals 내용을 살펴 봅니다 <small><strike>예제가 대부분 User 를 사용한 내용만 있는게 아쉽습니다</strike></small>
<iframe width="560" height="315" src="https://www.youtube.com/embed/T6PyDm79PFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## **Signals & Post_save**
[(StackOverFlow)](https://stackoverflow.com/questions/13014411/django-post-save-signal-implementation) 내용 중 Signals 를 외래키를 활용한 내용 중 가장 추천이 많은 내용은 다음과 같습니다

```python
class Product(models.Model):
     name = models.CharField(max_length=255)
     stock = models.IntegerField(default=0)

class Detail(models.Model):
    product = models.ForeignKey(Product)
    amount = models.IntegerField(default=0) # <== 값을 자동저장

from django.db.models.signals import post_save
from django.dispatch import receiver

# 업데이트 전용 메소드를 정의합니다
@receiver(post_save, sender=Detail, dispatch_uid="update_stock_count")
def update_stock(sender, instance, **kwargs):
    if instance.product.stock == 0:
        instance.product.stock += 1 
        instance.save() # 인스턴스 객체를 저장합니다
    else:
        pass
```

주의할 점은 위의 `post_save` 를 **실행하는 조건을 함께 정의해야** 합니다. 그렇지 않으면 해당 수식을 반복하여 `RecursionError: maximum recursion depth exceeded while calling a Python object` 등의 오류가 출력 됩니다.
{: .notice--info} 

## **save**
[Django ORM Cookbook](https://django-orm-cookbook-ko.readthedocs.io/en/latest/update_denormalized_fields.html?highlight=signals) 위의 복잡한 내용을 활용하기 보다는 Django 의 기본적인 **save()** 메소드를 활용합니다

```python
class Category(models.Model):
    name = models.CharField(max_length=100)
    hero_count = models.PositiveIntegerField()
    villain_count = models.PositiveIntegerField()

class Hero(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, 
        on_delete = models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:
            Category.objects.filter(pk=self.category_id).\
                update(hero_count=Fs('hero_count')+1)
        super().save(*args, **kwargs)
```

## **ordering**
**ForeignKey()** 필드를 정렬하는 경우에는, **Primary Key Field** 의 정렬에 영향을 받기 때문에 주의를 해야 합니다. <small><strike>즉 배열의 순서까지 모두 상속 받습니다..</strike></small>

<br/>
# SQLITE3 
[(WEB)](https://stackoverflow.com/questions/48549068/django-db-utils-notsupportederror-in-sqlite-why-not-supported-in-sqlite)
Django 2.1 에서 Migration 결과 `(automatically created in migrations directory after makemigrations command) and add atomic = False to the Migration class. Migration(migrations.Migration)` 를 출력하는 경우가 있습니다.

이 경우에는 개별 app 에 종속되는 **Migration** 폴더 내 작업파일을 다음과 같이 수정합니다.

```python
from django.db import migrations

class Migration(migrations.Migration):
    atomic = False # <<<< 이 내용을 추가합니다
```

## one to many 관계는 ForeignKey() 를 활용 
[(Web)](https://stackoverflow.com/questions/6928692/how-to-express-a-one-to-many-relationship-in-django) 관계용 모듈함수로는 `models.ForeignKey()`, `models.ManyToManyField()` 를 활용합니다.
