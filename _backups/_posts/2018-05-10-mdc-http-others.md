---
title : django 다른 content 들 
last_modified_at: 2018-05-10T10:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - pyton
toc: true    
---

# Mastering Django Core

**HttpResponse** 클래스토 외부 파일을 연결하면서 **content_type** 인수에 따라 다양한 유형의 데이터와 연결이 가능하다



## MIME 유형을 사용하여 파일을 연결한다


|확장자  |    문서 종류     |  MIME 타입 |
|-------:|-----------------:|-----------:|
|.csv   | Comma-separated values (CSV) |    text/csv     |
|.epub  | Electronic publication (EPUB) | application/epub+zip |
|.pdf   | Adobe Portable Document Format (PDF) |   application/pdf |
|.xls   | Microsoft Excel   |  application/vnd.ms-excel |
|.zip   | ZIP archive     | application/zip |
|.mp3   | Audio mpeg2 file (MP3) | audio/mpeg3 |

[전체목록 보기](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)


### Image 파일의 연결

```python
from django.http import HttpResponse

def my_image(request):
    image_data = open("./static/images/image.jpeg", "rb").read()
    return HttpResponse(image_data, content_type="image/png")
```

파일경로는 **project folder**를 기준으로 **./ : 상대경로** 로 정의한다
{: .notice--info}


### CSV 파일의 연결

```python
import csv

def some_view(request):
    # 적절한 CSV 헤더를 사용하여 HttpResponse 객체를 생성한다
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = \
        'attachment; filename="somefilename.csv"'

    writer = csv.writer(response)
    writer.writerow(['First row', 'Foo', 'Bar', 'Baz'])
    writer.writerow(['Second row', 'A', 'B', 'C', '"Testing"'])
    return response
```

**response** 로 생성할 객체를 정의 -->  **writer (인스턴스 객체)** 로 객체를 생성 -->  **response** 최종 객체를 출력한다
{: .notice--info}

**MIME 타입**을 정의하고, **response['Content-Disposition']** 헤더를 지정하면 웹브라우저 기본 객체가 아닌 사용자 임의의 포맷을 호출한다(**csv** 객체를 생성) HttpResponse를 통해서 객체를 **download** 한다 
{: .notice--info}


### 대용량 CSV 파일 스트리밍

대용량 csv 처리시 전송을 효율적으로 처리하기 위해 **StreamingHttpResponse** 를 사용한다 



<br>

## 기타 텍스트 기반 형식

csv 파일형식을 다루는 내용을 바탕으로, PDF 객체를 생성한다

### PDF 생성하기

`$ pip install reportlab` 모듈을 설치한다

```python
from reportlab.pdfgen import canvas

def some_pdf_view(request):
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = \
        'attachment; filename="testpdf.pdf"'
    p = canvas.Canvas(response)
    p.drawString(100, 100, "Test Creating PDF format data.")
    p.showPage()
    p.save()
    return response
```

**response** 객체의 타입을 정의 -->  **p (인스턴스 객체)** 로 객체를 생성 및 저장(.save) -->  **response** 최종 객체를 출력한다
{: .notice--info}



### 복잡한 PDF

`from io import BytesIO` 객체를 활용한다

```python
from io import BytesIO

def some_view(request):
    # PDF 머리글을 사용하여 HttpResponse 객체를 생성한다
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = \
        'attachment; filename="somefilename.pdf"'

    # pdf 인스턴스 객체를 BytesIO()로 생성한다
    buffer = BytesIO()
    p = canvas.Canvas(buffer)
    p.drawString(100, 100, "Hello world.")
    p.showPage()
    p.save()

    # BytesIO() 버퍼값을 응답쓰기로 실행한다
    pdf = buffer.getvalue()
    buffer.close()
    response.write(pdf)
    return response
```



### Zipfiles 압축파일 생성 및 추출하기 

[Python Source 출처](https://stackoverflow.com/questions/12881294/django-create-a-zip-of-multiple-files-and-make-it-downloadable)

```python
import os, zipfile, StringIO
from django.http import HttpResponse

def getfiles(request):
    # [압축 대상파일 목록] 과 '입축파일이름' 을 정의한다
    filenames    = ["/tmp/file1.txt", "/tmp/file2.txt"]
    zip_subdir   = "zipfile"
    zip_filename = "%s.zip" % zip_subdir
    s = StringIO.StringIO()

    # 압축파일 인스턴스를 생성한다
    zf = zipfile.ZipFile(s, "w")
    for fpath in filenames:
        fdir, fname = os.path.split(fpath)
        zip_path = os.path.join(zip_subdir, fname)
        zf.write(fpath, zip_path)   # 압축파일의 경로를 지정한다
    zf.close()

    # ZIP 인스턴스 객체를 MIME-typed 으로 변환한다
    response = HttpResponse(s.getvalue(), 
                        mimetype = "application/x-zip-compressed")
    response['Content-Disposition'] = \
        'attachment; filename=%s' % zip_filename
    return response
```



### Pillow 이미지 썸네일 만들기

```python
def webimage_thumb(img_url, img_size):
    import os, requests
    from PIL import Image
    image  = requests.get(img_url).content # content : RawData
    file   = os.path.basename(img_url)     # URL에서 파일명 추출
    thumb  = file.split(".")[0] + '_thumb.' + file.split(".")[1]
    result = thumb
    with open(file, 'wb') as f:            # 'wb' 쓰기권한 저장
        f.write(image)
    with Image.open(file) as im:
        im.thumbnail(img_size)  # 원본의 크기를 변경
        im.save(thumb) # 여기서 이미지 파일 '인스턴스'가 날라간다
    return result

url = "http://image.chosun.com/sitedata/image/201709/14/2017091401592_0.jpg"
web_thumb = webimage_thumb(url, (150,150))

from IPython.display import Image as Ipy_Image
Ipy_Image(filename=web_thumb)    
```

**from PIL import Image** 이 모듈 하나만 있으면 작동이 된다. jpeg도 최신버젼을 사용하니까 무난하게 실행됨. 단 **thumbnail 모듈**인만큼 크기를 키워도 늘어나진 않고, 줄여도 원본 비율을 유지한다
{: .notice--info} 