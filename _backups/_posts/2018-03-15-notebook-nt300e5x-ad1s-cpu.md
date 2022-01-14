---
title : 노트북 CPU 교체 - NT300E5X-AD1S
last_modified_at: 2018-03-14T18:45:06-05:00
tags: 
    - nt300e5x
    - notebook
toc: true
---


## 삼성 노트북AS센터 들르기 

사무실 노트북이 간헐적으로 꺼진다고 하셔서<br> 
'케이블이 문제겠구나'라고 생각했지만..<br>
서비스센터 점검결과 SSD는 정삭적으로 인식되어서<br>
결국은 OS 문제가 가장 유력하다는 진단을 받았다<strike>돈은 굳혔으니까 다행이다 --;;</strike>

해당 노트북 관련해서 검색을 해본결과<br> 
CPU를 i3-2350로 교체 가능한 내용이 있었고[링크](https://blog.naver.com/geumneung119/220775490311) 

이왕에 바꿀 수 있는건 다 바꿔보는걸로<br>
웹질을 시작했다


## Documents

우선 정식 메뉴얼 찾기 [link](http://www.samsung.com/sec/support/model/NT300E5X-AD1S)

노트북 CPU 교체시 주의할 점 [링크](http://koreatech.tistory.com/entry/%EB%85%B8%ED%8A%B8%EB%B6%81-cpu-%EA%B5%90%EC%B2%B4%EC%97%90-%EB%8C%80%ED%95%9C-%EC%98%AC%EB%B0%94%EB%A5%B8-%EC%9D%B4%ED%95%B4)


## 작업 시작하기 

우선 노트북의 메인보드 type을 찾아보았다<br>
Document 에서 HM65 타입임을 명시하고 있었고<strike>(가장 낮은것)</strike>
B820 cpu 소켓을 검색[링크](http://www.cpu-world.com/CPUs/Celeron_Dual-Core/Intel-Mobile%20Celeron%20B820.html)<br>
2세대 Socket G2 / rPGA988B (PGA: pin grid array) 방식으로<br>
Core i7-2640M 최대 지원 가능하고 중고물건도 찾았다[링크](http://itempage3.auction.co.kr/DetailView.aspx?itemno=B511930740&frm3=V2)

최종적으로 BIOS 나 Chipset 제한을 확인할 필요가 있다
<strike>귀찮으면 우선 질러보고 결정하자 반품여부를..</strike>

찾아보니 5세대 cpu는 BIOS 에서 30분 마다 꺼진다고 한다 [뽐뿌](http://m.ppomppu.co.kr/new/bbs_view.php?id=computer&no=191417)

결국은 3세대로 안전하게 가기로 결정 
[링크](http://itempage3.auction.co.kr/DetailView.aspx?itemno=B403325355&frm3=V2)

이제 등장하는건 구글질..

**Note:**
{: .notice--info}

**Please Note:**
{: .notice--danger}
