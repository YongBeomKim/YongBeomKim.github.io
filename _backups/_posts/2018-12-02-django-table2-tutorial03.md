---
title : Tutorial / django-table2 Meta 속성 3/3
last_modified_at: 2018-11-20T12:45:06-05:00
header:
  overlay_image: /assets/images/book/django-tutorial.png
categories:
  - django
tags: 
    - django
    - python
toc: true 
---

django-table2 기본개념 및 필드별, 수정에 대해 알아봤습니다. 이번에는 **테이블 인스턴스 클래스** 내부에서 `class Meta:` 객체를 활용하여 테이블 전체에 변형을 주는 방법들을 익힙니다.

<br/>
# **1 Meta 클래스 수정하기**
## **class Meta:**
1. **attrs :** table 테그의 스타일 추가
2. **sequence :** 출력 필드들의 순서를 재정의 한다
3. **template_name :** 테이블 스타일을 적용하는 템플릿을 정의한다
```python
class PersonTable(tables.Table):
    selection = tables.CheckBoxColumn(accessor='pk', orderable=False)
    class Meta:
        model = Person
        attrs = {'class': 'paleblue', 'width': '50%' }
        sequence = ('필드1', '필드2', '필드3')
        template_name = 'django_tables2/bootstrap-responsive.html'
```

### **Paginate** 페이지별 출력 인덱스 갯수를 정의
**views.py** 에서 **request.GET.get()**  
```python
def people_listing(request):
    table = PeopleTable(Person.objects.all())
    table.paginate(page=request.GET.get('page', 1), per_page=25)
    return render(request, 'people_listing.html', {'table': table})
```
**views.py** 에서 **RequestConfig()**
```python
def people_listing(request):
    table = PeopleTable(Person.objects.all())
    RequestConfig(request, paginate={'per_page': 25}).configure(table)
    return render(request, 'people_listing.html', {'table': table})
```
**views.py** 에서 **SingleTableView** (기본값을 사용한다)
```python
class PeopleListView(SingleTableView):
    table = PeopleTable
```
별도의 내용이 없으면 기본값을 적용하고, 적용을 비활성화 하는 경우에는 `SingleTableView.table_pagination = False` 를 입력하면 됩니다.
{: .notice--info}


<br/>
# 2 다양한 포맷으로 출력하기
테이블 데이터를 **xls, csv, json** 등 다양한 포맷으로 외부 출력 link를 생성할 수 있습니다. 
> **$ pip install tablib**

## **views.py**
탬플릿 출력 함수에서 두번째 코드에 추가된 내용을 사용하면, 해당 출력 Url에 **Get Query** 로써 `url/?_출력Query=포맷` 을 추가하면 해당 데이터를 `파일이름.포맷` 파일로 다운로드 받을 수 있습니다

#### 변경 전 (기본내용)
```python
def output_table(request):
    table = SimpleCountryTable(People.objects.all(), orderable=True)
    RequestConfig(request).configure(table)
    return render(request, "app/template.html", {"table": table})
```

#### 변경 후 (내용추가)
```python
from django_tables2.export.export import TableExport

def output_table(request):
    table = SimpleCountryTable(People.objects.all(), orderable=True)
    RequestConfig(request).configure(table)

    export_format = request.GET.get('_출력Query', None)
    if TableExport.is_valid_format(export_format):
        exporter = TableExport(export_format, table,
                               exclude_columns=('name', '참고자료'))
        return exporter.response('파일이름.{}'.format(export_format))
    return render(request, "app/template.html", {"table": table})
```

추가할 내용..

테이블 내용을 filer input box 생성과, 예제에는 나와 있는데 해당 필드내 공통된 데이터를 클릭하면 해당 내용으로 filtering 된 테이블을 출력하는 내용, 즉 출력 테이블의 필터링 부분을 추후에 보완하자

# 참고사이트
[django table2](https://django-tables2.readthedocs.io/en/latest/pages/filtering.html)