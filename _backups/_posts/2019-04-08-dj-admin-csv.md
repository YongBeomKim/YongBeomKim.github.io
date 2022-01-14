---
title : Django Admin CSV upload
last_modified_at: 2019-04-08T10:45:06-05:00
header:
  overlay_image: /assets/images/code/django.jpg
categories:
  - django
tags: 
    - model
    - django
toc: true 
---

정기적으로 자료를 갱신할 필요가 있는경우 활용합니다. 이번 페이지는 단일한 model 에 필드별 내용을 입력합니다. 추후에 개별 field 가 **ForeignKey()** 또는 **ManytoMany** 로 구성된 경우, 어떻게 구조화를 추가하는 지에 대한 부가적인 설명을 덧붙이도록 하겠습니다.

<br/>
# **DataBase 자료 올리기**

<iframe width="560" height="315" src="https://www.youtube.com/embed/BppyfPye8eo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
</iframe>

## **Model 의 정의**

작업에 활용할 Model 은 다음과 같습니다. 그리고 추가된 모델을 DataBase 에 반영하도록 **makemigrate, migrations** 를 실행합니다.

```python
class Contact(models.Model):
    first_name = models.CharField(max_length=20)
    last_name  = models.CharField(max_length=20)
    email      = models.EmailField()
    ip_address = models.GenericIPAddressField(null=True)
    msg        = models.TextField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
```

## **views.py** 에 함수 정의하기

**Post** 방식으로 **.csv** 파일을 전달받고, 필드별로 구분하여 Model 에 저장을 합니다.

1. 예외처리1 에서 **Post** 방식의 전달을 확인하고, 
2. 예외처리2 에서 **확장자가 .csv** 를 확인합니다.
3. **try, except** 에서 모델입력의 오류시 error message 를 출력합니다.

```python
from django.contrib.auth.decorators import permission_required
from django.contrib import messages
from .models import Contact

# login 상태에서만 실행되도록 정의를 합니다.
@permission_required('admin.can_add_log_entry')
def csv_upload(request):
    # 해당 내용을 실행할 template를 지정 합니다.
    template = 'stock/toptrader_upload.html'
    
    # 오류처리1 : GET 방식으로 입력시 오류처리
    prompt = {
        'order':'상위 거래원 CSV 자료 올리기'
    }
    if request.method == "GET":
        return render(request, template, prompt)

    # 오류처리2 : CSV 파일이 아닌경우 오류처리
    csv_file = request.FILES['file']
    if not csv_file.name.endswith('.csv'):
        messages.error(request, 'CSV 가 아닙니다.')
        return None

    # 오류처리1, 2를 통과한 경우 내용의 적용
    data_set = csv_file.read().decode('UTF-8')
    io_string = StringIO(data_set)
    next(io_string) # io_string 내용을 차례로 호출

    try:
        for column in csv.reader(io_string,\
             delimiter=',', quotechar="|"):
            _, c = Contact.objects.update_or_create(
                first_name = column[0],
                last_name  = column[1],
                email      = column[2],
                ip_address = column[3],
                msg        = column[4]
            )
    except:
        messages.error(request,'데이터 입력오류')
        return redirect(reverse("list"))
        
    context = {} # 빈 {dict} 이라도 채웁니다
    return render(request, template, context)
```

