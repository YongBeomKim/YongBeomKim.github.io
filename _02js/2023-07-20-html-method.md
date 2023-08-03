---
layout: blog
title: Http Method 란? (GET, POST, PUT, DELETE)
tags:
- HTML
---

[Http Method 란? (GET, POST, PUT, DELETE)](https://velog.io/@yh20studio/CS-Http-Method-%EB%9E%80-GET-POST-PUT-DELETE) 와 [Making HTTP Requests using Html Forms](https://medium.com/@codeyourthoughts48/allhttp-requests-using-html-forms-fdb09a49258f) 내용을 정리 하였습니다.

정리를 하게된 계기는 `Django API` 서버작업을 진행하면서 였습니다. 어떤 작업에 어떤 Method 를 적용하는지 정확하게 인지하지 않은채 작업을 진항하게 되었는데, 파라미터와 Method 조합에 따라 성공 또는 오류를 출력하는 서버를 보면서 보다 정확하게 내용을 이해하고 진행해야 겠다는 생각을 하게 되었습니다.

<figure class="align-center">
  <img src="{{site.baseurl}}/assets/web/html_method.png">
  <figcaption>HTTP Requests</figcaption>
</figure>

<br/>

# REST
HTML Method 를 이해하기에 앞서, 먼저 정의되는 것이 REST 또는 REST API 입니다.

`Representational State Transfer` 약자로 **로이 필딩 (Roy Fielding)** 이 정의한 것으로, 웹의 장점을 최대한 활용할 수 있는 아키텍처를 발표 했습니다. Rest API 를 구성하는 요소를 살펴보면 다음과 같습니다.

- 자원(Resource): **URI**
- 행위(Verb): **HTTP Method**
- 표현(Representations)

<br/>

# HTML Method
`HTML Method` 는 **Rest API** 를 지키면서 행위를 전달하는 방법 입니다. HTTP Method는 크게 GET, POST, PUT, DELETE 가 있습니다. 각각의 역활은 다음과 같습니다.
- **<span style="color:mediumblue">GET</span>** : **조회**
- **<span style="color:green">POST</span>** : **등록**
- **<span style="color:darkorange">PUT</span>** : **수정**
- **<span style="color:firebrick">DELETE</span>** : **삭제**

중요한 4개를 먼저 살펴보았습니다. HTML Method 전체 갯수는 총 8개가 존재하고 각각의 설명은 다음과 같습니다.

- GET: 서버로 부터 데이터를 취득
- POST: 서버에 데이터를 추가, 작성 등
- PUT: 서버의 데이터를 갱신, 작성 등
- DELETE: 서버의 데이터를 삭제
- HEAD: 서버 리소스의 헤더(메타 데이터의 취득)
- OPTIONS: 리소스가 지원하고 있는 메소드의 취득
- PATCH: 리소스의 일부분을 수정
- CONNECT: 프록시 동작의 터널 접속을 변경

<br/>

# HTML Method Detail
중요한 4개의 메서드를 살펴보겠습니다. 상세내용을 원어로 살펴보다 보면 **idempotent** 단어를 자주 마주치게 됩니다. 한국어로는 **멱등성(冪等性)** 이라고 번역되는데, 연산을 여러번 적용하더라도 값이 변하지 않는 성질을 의미합니다. React 에서 **불변성** 과 비슷한 개념으로 생각하시면 됩니다.

## **GET**
데이터를 **읽거나(Read) 검색(Retrieve)** 할 때에 사용되는 메소드이다. GET요청이 성공적으로 이루어 지면 `200 (Ok) HTTP` 응답 코드를 리턴하고, 에러가 발생하면 `404 (Not found), 400 (Bad request)` 에러를 리턴 합니다. GET 요청은 **idempotent** 속성이 가장 강해서 같은 요청을 여러 번 하더라도 항상 같은 값을 응답 합니다. 때문에 데이터를 변경하는 연산에 사용지 않습니다.

GET은 캐싱이 가능하여 같은 데이터를 한번 더 조회할 경우에 저장한 값을 사용하여 조회 속도가 빨라 집니다.

```bash
GET /user/1
```

## POST
새로운 리소스를 생성(create)할 때 사용된다. 구체적으로 POST는 하위 리소스(부모 리소스의 하위 리소스)들을 생성하는데 사용 됩니다. 성공적으로 완료하면 `201 (Created) HTTP` 응답을 합니다. GET 과는 다르게 POST 요청은 idempotent 하지 않습니다. 이는 같은 POST 요청을 반복해서 했을 때 항상 같은 결과물이 나오는 것을 보장하지 않는다는 것으로 두 개의 같은 POST 요청을 보내면, 두 개의 다른 resource 를 반환할 가능성이 높습니다.

```bash
POST /user
body : {date : "example"}
Content-Type : "application/json"
```

예시를 살펴보면, 데이터를 생성하는 것이기 때문에 요청을 할 때, **Body** 값과 **Content-Type** 값을 필요로 합니다. 데이터 조회에 성공한다면 Body 값에 저장한 데이터 값을 저장하여 성공 응답을 내보냅니다.

## **PUT**
리소스를 **생성 / 업데이트** 하기 위해 서버로 데이터를 전달하는데 사용 합니다. PUT 요청은 **idempotent** 속성을 갖습니다. 때문에 동일한 PUT 요청을 여러 번 호출하면 항상 동일한 결과가 생성됩니다.

```bash
PUT /user/1
body : {date : "update example"}
Content-Type : "application/json"
```

데이터를 수정(생성/업데이트) 하는 작업으로, 요청할 때 **Body** 값과 **Content-Type 값** 을 필요로 합니다. URL을 통해서 어떠한 데이터를 수정할지 정보를 전달 받습니다. 그리고 수정에 필요한 데이터를 Body 값을 통해서 전달 받습니다.

## DELETE
지정된 리소스를 삭제 합니다. URL을 통해서 어떠한 데이터를 삭제할지 파라메터를 전달 받습니다. 때문에 별도 Body 값과 Content-Type 값을 필요로 하지 않습니다. 데이터 삭제에 성공하면 성공 응답만 내보냅니다.

```bash
DELETE /user/1
```

<br/>

# 참고할 내용
## POST방식이 GET방식보다 보안측면에서 더 좋다?
GET과 비교하여 URL에 데이터의 정보가 들어 있지 않으므로 조금 더 안전하다고 볼 수 있다.

## GET방식이 POST방식보다 속도가 빠르다?
GET 방식은 캐싱을 하기 때문에 여러번 요청시 저장된 데이터를 활용하므로 조금 더 빠를 수 있다.

## POST vs PUT 차이는 ?
POST와 PUT은 구분해서 사용 되어야 합니다. POST는 **새로운 데이터를 계속 생성** 하지만, PUT은 **사용자가 데이터를 지정하고 수정** 하는 것이기 때문에 같은 요청을 계속하더라도 데이터가 계속 생성되지는 않는다.

## PUT vs PATCH 차이는 ?
PATCH는 이 포스트에서 다루지 않았지만, 정보를 수정할 수 있는 HTTP Method가 있습니다. 하지만 PUT 과는 조금 다릅니다. **PUT 은 지정한 데이터를 전부 수정** 하는 Method 이고, **PATCH 는 정보의 일부분만 변경** 합니다. 따라서 PUT은 멱등하다고 볼 수 있지만, PATCH는 멱등하다고 볼 수 없습니다.

<br/>

# 참고사이트
- [Making HTTP Requests using Html Forms](https://medium.com/@codeyourthoughts48/allhttp-requests-using-html-forms-fdb09a49258f)
