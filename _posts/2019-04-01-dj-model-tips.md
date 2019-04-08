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

# Modeling
프로젝트 모델을 작업하면서 부족했던 부분들을 정리하는 시간으로 삼겠습니다.

## 기능의 추가
기본적 필드정의 이외에 추가할 내용들을 정리해 보겠습니다

## Property 
[(stackflow)](https://stackoverflow.com/questions/17682567/how-to-add-a-calculated-field-to-a-django-model) 테이블 내 같은 튜플의 값을 재활용 하는 경우에는 `property` 데코레이터를 활용합니다.

```python
class Python(models.Model):
    name = models.CharField()

    @property
    def test(self):
        return self.name + 'Python'
```

## Signals 기초 익히기
JustDjango 에서 소개된 Signals 내용을 살펴보도록 합니다 <strike>예제가 대부분 User 를 사용한 내용만 있는게 아쉽습니다</strike>
<iframe width="560" height="315" src="https://www.youtube.com/embed/T6PyDm79PFo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Signals & Post_save
[(StackOverFlow)](https://stackoverflow.com/questions/13014411/django-post-save-signal-implementation) 내용 중 Signals 를 외래키를 활용한 내용 중 가장 추천이 많은 내용은 다음과 같습니다

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

class Product(models.Model):
     name = models.CharField(max_length=255)
     stock = models.IntegerField(default=0)

class Detail(models.Model):
    product = models.ForeignKey(Product)
    amount = models.IntegerField(default=0) # <== 값을 자동저장

# method for updating
@receiver(post_save, sender=Detail, dispatch_uid="update_stock_count")
def update_stock(sender, instance, **kwargs):
     instance.product.stock -= instance.amount # 
     instance.product.save()
```

## save
[Django ORM Cookbook](https://ko.aliexpress.com/item/Original-Xiaomi-Mi-Max-3-4GB-RAM-64GB-ROM-Mobile-Phone-Snapdragon-636-Octa-Core-6/32897993001.html?spm=a2g12.12010108.addToCart.24.151732281wnQTN&gps-id=pcDetailCartBuyAlsoBuy&scm=1007.12908.99722.0&scm_id=1007.12908.99722.0&scm-url=1007.12908.99722.0&pvid=41af5d8e-5685-4d61-adea-af084254e99b) 위의 복잡한 내용을 활용하기 보다는 Django 의 기본적인 **save()** 메소드를 활용합니다


```python
class Category(models.Model):
    name = models.CharField(max_length=100)
    hero_count = models.PositiveIntegerField()
    villain_count = models.PositiveIntegerField()

    class Meta:
        verbose_name_plural = "Categories"


class Hero(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:
            Category.objects.filter(pk=self.category_id).update(hero_count=F('hero_count')+1)
        super().save(*args, **kwargs)
```

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