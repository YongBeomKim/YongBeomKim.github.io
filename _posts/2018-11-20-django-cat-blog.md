---
title : 파이썬 웹 프로그래밍 (실전편) (계층 블로그)
last_modified_at: 2018-11-21T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - python
toc: true 
---


# 계층적 Blog <small>[참고 Site](https://simpleisbetterthancomplex.com/tutorial/2016/08/03/how-to-paginate-with-django.html)</small>

상위 카테고리를 정의하여 블로그를 제작해 보자

```python
# blog/models.py

# 상위 카테고리 Model을 정의한다
class Category(models.Model):
  title = models.CharField(db_index=True)
  slug  = models.SlugField(db_index=True)
  def get_absolute_url(self):
    return reverse('blogs:category', args=(self.slug,))

# Blog Model 객체를 정의한다
class Blog(models.Model):
  category = models.ForeignKey('blogs.Category', on_delete=models.CASCADE)
  title    = models.CharField()
  content  = models.TextField()
  posted   = models.DateTimeField(db_index=True, auto_now_add=True)
  slug     = models.SlugField()

  class Meta:
    ordering = ('-posted',) # 내림차순 정렬 (최신날짜 우선)

  def __str__(self):
    return self.title

  def get_absolute_url(self):
    return reverse('blogs:post', args=(self.id,))
```



  # <외래키 연결>  (1) on_delete = models.PROTECT (외래키 독립)
  #                (2) on_delete = models.CASCADE (외래키 의존)
  # author   = models.ForeignKey('auth.User',      on_delete=models.CASCADE )

