---
layout: blog
title: Streamlit Mini Cource 01
tags:
- python
---

기본적인 화면 랜더링에 대하여 알아보겠습니다.

```python
# ./main.py
import os
import streamlit as st

# Functions ...
def intro():
    r"""화면에 출력할 내용을 함수형태로 정리"""

    # bookmark 기능까지 구현되는 `타이틀`
    st.title('.title: 환영합니다')
    st.header(".header: 제목")
    st.subheader(".subheader: 소제목")

    # 일반적인 텍스트
    st.markdown(".markdown: **_Mark Down_** is working...")
    st.write(".write: Normal Text Size")
    st.caption(".caption: 주석내용")

    # Code 및 다양한 포맷형태를 화면에 표시
    code_python = """
      def print(text:any):
        return text"""
    st.code(code_python, language='python')
    st.divider() # 화면 분할기준

    # If 조건문을 활용한  `Button (True / False)` 기능 활용
    press = st.button('버튼을 누르세요') # cf) default : False -`click`-> True
    print(f"{press} Click button")    # print() 는 log 로 출력 (화면 X)
    st.write(("Hello World" if press else "Clicked Button"))


# Side Bar ...
# dict {} 객체를 (페이지 구성요소 정리)
page_names = {
    "Home": intro,
}

# (st.sidebar.selectbox) : Navigation Box
selected_page = st.sidebar.selectbox(
    "페이지를 선택하세요",
    options=page_names.keys(),
)

# Page randering
# (Side Bar) 에서 Selected 된 페이지 내용 랜더링
page_names[selected_page]()
```
