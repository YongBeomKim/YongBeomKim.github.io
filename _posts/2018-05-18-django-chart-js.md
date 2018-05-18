---
title : django Charts 1
last_modified_at: 2018-05-15T22:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
categories:
  - django
tags: 
    - django
    - d3
toc: true    
---


## Javascript 시각화

<figure class="align-center">
  <img src="http://datadrivenjournalism.net/uploads/teasers/skoli.png" alt="">
  <figcaption>Django & families</figcaption>
</figure>

django 에서 **content 로 객체를 정의**하고 이를 받아서 시각화 하는 방식으로 작업을 진행하자

```python
import json
def your_view(request):
    poll_results = [4, 6, 7, 1]
    poll_as_json = json.dumps(poll_results)
    # Gives you a string '[4, 6, 7, 1]'
    return render_or_whatever(context={'poll_as_json': poll_as_json})
```


And in your template

```html
<script ...>
   var data = { { poll_as_json } };
</script>
```

[javascript 모듈들 안내 page](https://www.pixine.fr/notre-top-10-des-librairies-javascript-essentielles-et-incontournables/)

### Morris.js 

[github Document](http://morrisjs.github.io/morris.js/#license)

<figure class="align-center">
  <img src="http://datadrivenjournalism.net/uploads/teasers/skoli.png" alt="">
  <figcaption>Django & families</figcaption>
</figure>


**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}   