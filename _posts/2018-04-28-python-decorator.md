---
title : Python 데코레이터
last_modified_at: 2018-04-28T20:45:06-05:00
header:
  overlay_image: /assets/images/book/django.jpg
tags: 
    - django
    - pyton
toc: true    
---

메르스 위기시절 503의 유명한 사진인 `살려야 한다!!` 와 같은 심정으로 매번 내용을 공부해 보지만, 결국에는 실제로 쓰질 않다보니 매번 잊어버려서 가물가물한 상태로 있는 경우가 많다..

[blog](http://whatisthenext.tistory.com/113)

[nbview-jupyter](http://nbviewer.jupyter.org/github/YongBeomKim/Tutorials/blob/master/Python/Decorator.ipynb)

**GitBlog* 에서도 생각난 김에 정리해 볼까 한다 <strike>언제까지 정리만 할건가.. ㅠㅠ</strike>

[blog2](http://bluese05.tistory.com/30) [blog3](http://trowind.tistory.com/72)맨 위의 Blog 내용을 따라서 정리를 했지만, 너무 기계적이고 추상적인 개념으로만 열거되어 학습뒤에는 파편적으로만 남는 바람에 정리가 잘 안되는 문제가 많았다..

이번 Blog 글에서는 조금 다르게 정리가 된거 같아서 요약을 다시 해보려고 한다
<strike>아마 안될거야 이번에도.. 정말로..</strike>


## 용도

전처리 함수를 복잡하게 적용하는 방법이 있지만, **Decorator** 를 사용하면 직관적이고 깔끔한 함수간의 연결이 가능하다 (flask 에서 여러 설정을 @ 하나로 직관적 연결하는 부분이 대표적이다)


**Info Notice:** 
{: .notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}