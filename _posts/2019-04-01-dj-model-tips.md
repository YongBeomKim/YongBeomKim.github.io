---
title : Django Model - Model
last_modified_at: 2019-05-03T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

서비스를 구축하는 첫단계는 모델의 설계 입니다. Django 에 대한 이해도가 판가름 되는 부분으로, 여기에서 다양한 내용을 정의를 하면, 이후의 단계들은 GenericView, Plugin 등을 활용하여 빠르게 구현이 가능합니다.

> **filter, Signals, per_post, ordering, sqlite3, GenericView**..

이번 단계는 1. **models.py** 에서 모델의 정의, 2. **Django Shell** 을 활용한 모델의 검정, 3. **Admin 페이지를** 통한 내용의 확인 과정으로 진행을 합니다

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/images/code/dj-admin.png" style="width:500" align="center">
  <figcaption>Django 의 Admin 페이지</figcaption>
</figure>

<br/>
# **속성 Over Writing**

**GenericView** 내부에서 정의된 속성들을 개발자가 변경하여 사용할 수 있습니다. 아래에 설명되는 속성들은 **View, TemplateView, RedirectView** 를 제외한 모든 Genericview 에 포함된 속성 입니다.

## **model, queryset**
사용할 model 객체를 정의 합니다. 두 속성은 동일한 의미로 둘 중 한가지만 지정하면 됩니다. 모두 사용한 경우 **queryset** 이 우선 적용 됩니다. 

```python
def modelview(ListView):
    model = Bookmark
    queryset = Bookmark.objects.all()
```

## **context_object_name**
템플릿에서 `{ { object } }, { {object_list} }` 기본 객체명 대신에, 사용자가 **context 변수 명** 을 임의로 지정 합니다.

## **paginate_by**
페이지 속성이 활성화된 경우, 한 페이지에 몇 개의 항목을 표시할 지를 정수로 지정 합니다.

## **success url**
**FormView, CreateView, UpdateView, DeleteView** 에서만 사용되는 속성으로 해당 기능이 성공한 뒤, **redirect** 되는 Url 을 지정 합니다.

## **form 객체**
**FormView, CreateView, UpdateView** 에서만 사용되는 속성들을 알아 보겠습니다.

### **form_class**
해당 기능에 활용할 **form 클래스 객체** 를 지정 합니다.

### **initial**
해당 form 초기값을 **initial** 에서 `{'필드명':'초기값'}` 와 같은 방식으로 지정 합니다.

### **fields**
해당 form 에서 사용할 필드 들을 지정 합니다. `class Meta: field=[]` 와 동일한 기능을 합니다.

## **form_valid()**
Form 객체를 다루는 view 함수에서, 아래의 **get_success_url()** 메소드와 동일한 기능으로 URL redirect 경로를 정의 합니다.

## **GenericView Function Method Overwriting**
지금까지 살펴본 내용들은 속성으로, 해당되는 값을 지정만 하면 되지만, 다음의 **Method** 들은 개별 기능이 존재하기 때문에, 해당 내용에 대한 개별 변수들을 

**GenericView** 를 잘 활용하면, 짧은 코드로도 명확한 기능의 구현이 가능합니다. 세부적인 설정변화를 위한 다양한 내부함수를 지원 합니다. 

1. **get_queryset() :** 기본 뷰 **View, TemplateView, RedirectView** 를 제외한 뷰에서 모델의 **Method를 추가**
2. **get_context_data() :** 기본 뷰 **TemplateView** 를 포함한 모든 뷰에서 모델의 **[특정 데이터를 호출](https://kimdoky.github.io/django/2018/03/26/django-cbv-get-context-data.html)**
3. **get_absolute_url() :** 모델의 URL 처리와 관련된 **상위 레벨 이전코드**
4. **get_object() :** 객체를 검사하는 메서드로 간단히 재정의 후 호출을 래핑

이들을 잘 활용하면 별도의 Jquery 의 Ajax 구조설계 없이도 다양한 기능을 덧붙일 수 있습니다. 이처럼 **[StackOverFlow (Master Django p336, p339)](https://stackoverflow.com/questions/33350362/django-listview-form-to-filter-and-sort)** 

```python
class MyView(ListView):
    model = Update

    def get_queryset(self):
        filter_val = self.request.GET.get('filter',\
             'give-default-value')
        return Update.objects.filter(state=filter_val)

    def get_context_data(self, **kwargs):
        context = super(MyView,\
             self).get_context_data(**kwargs)
        context['filter'] = self.request.GET.get(
            'filter', 'give-default-value')
        return context
```

{% raw %}
```html
<form method="get" action="{% url 'list' %}">
    <p>필터링: <input type="text" 
        value={{filter}} name="filter"/></p>
    <p><input type="submit" 
        name="submit" value="submit"/></p>
</form>
```
{% endraw %}

<br/>
# **날짜의 표시**
`DataTimeField` 에서 사용되는 데이터들은 Python 의 `datetime` 객체들로 출력이 된다. 이를 한글로 바꿔주는 지역화 내용은 못찾고, 개별 함수에서 바꿔주는 내용들을 정리해 보려고 합니다.[(한글 블로그)](https://oddly.tistory.com/64) [Django Doc](https://docs.djangoproject.com/en/2.2/ref/templates/builtins/#date)

```python
# 날짜별 요일의 출력
from calendar import day_abbr
list(day_abbr) # ['Mon', 'Tue',..]

@property
def date_txt(self):
    days = ["월","화","수","목","금","토","일"]
    return days[self.date.weekday()]
```

{% raw %}
```html
<!-- 템플릿에서 출력형식의 변화 -->
<p>{{menu.date|date:"m월.d일.Y"}}</p>
```
{% endraw %}

<br/>
# **데이터 입력하기**

## CSV 를 활용한 데이터 입력

로그인 사용자 입장에서 데이터를 입력하는 방법은 뒤에서 자세히 살펴 보았습니다. [admin csv upload](https://yongbeomkim.github.io/django/dj-admin-csv/) 하지만 해당 필드별 내용을 그대로 입력해서 **ORM** 구조를 사용하는 경우에는 부적합 합니다.

```python
 csv_file = request.FILES['file']
 data_set = csv_file.read().decode('UTF-8')
 io_string = StringIO(data_set)
 next(io_string)

 for column in csv.reader(io_string,\
         delimiter=',', quotechar="|"):
     Contact.objects.update_or_create(
         first_name = column[0],
         last_name = column[1],
     )
```

## Foreign Key 를 활용한 입력

원하는 목록을 생성 또는 호출한 뒤, 객체 인스턴스를 활용하여 foreignKey 필드를 입력 합니다. 아래처럼 순차적으로 접근하여 데이터를 입력 및 호출하는 방식으로 접근을 합니다.

```python
# Key 테이블을 호출 합니다.
from stock.models import Contact
new = Contact(first_name='kim', last_name='ju')
new.save()

# Key 를 사용한 ForeignKey 필드를 입력 합니다.
from stock.models import Board
Board.objects.update_or_create(
    name = new_item,\
    text = 'new one update')
```

<br/>
# **튜플 데이터의 삭제**
해당 객체를 삭제하기 위해선 **DeleteView**를 제공합니다. 다른 기능과 비교시 삭제자체는 간단하고, 오히려 GenericView 에서 **모델_confirm_view.html** 을 요구하는 등 더 까다롭게 삭제요건을 필요로 합니다. 다음을 추가하면 별도의 조건없이 바로 삭제를 진행합니다 [stackoverflow](https://stackoverflow.com/questions/17475324/django-deleteview-without-confirmation-template)

```python
class CafeListDeleteView(DeleteView):
    model = 모델
    success_url = reverse_lazy("url연결")

    def get(self, request, *args, **kwargs):
        return self.post(request, *args, **kwargs)
```

템플릿에서 **Jquery** 를 활용하여 확인 메세지를 추가합니다. 이러면 별도의 template 없이 삭제작업을 진행합니다.

```javascript
$(document).ready(function(){
  $("#delete").click(function(){
    if (!confirm("데이터를 삭제합니다!")){
      return false;
    }
  });
});
```

<br/>
# **Filter**
내가 필요한 값을 호출하는 경우 기본적인 메소드가 **.filter** 입니다.
모델 객체의 값을 가져오는 경우, 또는 상속받는 **부모의 값**을 가져오는 경우로 나뉠 수 있습니다. 주의할 점은 `.get()` 은 1개의 값을 가져오지만, `.filter()` 는 **배열 객체를 호출 (python [list])** 하는 점에 유의 합니다

```python
# Django Shell
>> from books.models import Books, Author
>> Books.objects.filter(name="장고 마스터 북")
>> Books.objects.filter(name="장고", date="2019-04-01")
>> Books.objects.filter(name__icontains="장고")
>> Books.objects.filter(author__name__icontains="김")
>> Books.objects.filter(author__name__isnull=True)

>> a = Author.object.get(name="홍길동")
>> a.books_set.all()
```

`Books.objects.filter(author__name__icontains="김")` 에서 **author** 와 **name** 은 테이블의 **필드 이름**을 활용합니다.

Author 기본키 테이블을 상속받는 Books 테이블을 조회시, `a.books_set.all()` 에서 **books** 는 **테이블의 이름**을 활용하는 차이에 유의합니다.

`books_set` **역직렬화 메소드** 이름은, `models.ForeignKet(Author, related_name='call')` 와 같이, 사용자가 임의로 정의한 경우에는 `call_set` 을 사용하여 호출을 합니다.

그리고 조회조건은 `(name="장고", date="2019-04-01")` 에서처럼 2가지 이상을 활용한 검색을 활용하면 훨씬 유용합니다.

`__isnull=True` 을 사용하면, 누락된 데이터로 전체적인 오류 없이 **비어있는 값으로 처리를 합니다**

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
        instance.save() # 인스턴스를 저장
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

## **GroupBy**
**models.ForeignKey()** 객체에서 상속시 제한된 객체를 호출하는 방법으로는 다음과 같은 내용을 활용할 수 있습니다. 다음의 예제는 사용자 필터링 결과를 출력하는 예제 입니다 [stackoverflow](https://stackoverflow.com/questions/44036138/django-admin-limiting-foreignkey-fields-choices#)

[ManytoMany](https://www.revsys.com/tidbits/tips-using-djangos-manytomanyfield/) 내용을 활용하면 보다 다양한 예제를 구현할 수 있습니다
```python
 class RestrictedFormAdmin(admin.ModelAdmin):
    def render_change_form(self, request, context, *args, **kwargs):
        context['adminform'].form.fields['Form'].queryset = \
            Form.objects.filter(user=request.user)
        return super(RestrictedFormAdmin, self).render_change_form(
            request, context, args, kwargs) 
```

<br/>
# GenericView
일반적인 결과물을 구현에 용이하도록 `GenericView` 를 제공합니다. 대표적인 것이 `ListView, DetailView` 를 자세히 알아보도록 합니다.

## **ListView**
```python
from django.views.generic import ListView
from .models import School

class SchoolListView(ListView):
    model = School
    # queryset = School.objects.order_by('age')
    # queryset = School.objects.filter(class__name='star')

    paginate_by = 2
    # context_object_name = 'school_list' 
    # template_name = "menus/school_list.html"

    # 추가로 전달할 내용 : 템플릿에서 {{student}} 호출
    def get_context_data(self, **kwargs):
        data = [
            {"year": '2018', "student": 200},
            {"year": '2019', "student": 150},
        ]
        context = super(SchoolListView, self).get_context_data(**kwargs)
        context["student"] = json.dumps(data) 
        return context
```

## **DetailView**
`DetailView` 경우에는 `views.py` 에서 추가적인 설정을 필요로 합니다
```python
from django.views.generic import  DetailView
class ClassListView(DetailView):
    models = Student
```

그리고 개별 `pk` 값에 대응하는 `urls.py` 내용에 다음을 추가합니다.
```python
from .views import ClassListView

urlpatterns = [
    path('class/<int:pk>/', ClassListView.as_view(), name='detail'),
]
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
