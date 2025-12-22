---
layout: blog
title: Ollama 에서 GGUF 모델 활용하기
tags:
- ollama
---

ollama 에서 Model 들을 바로 사용하는 방법이 있고, 추가로 `Huggingface` 에서 제공하는 모델들을 양자화 한 `GGUF` 파일들을 별도로 제공하는 내용들을 확인할 수 있습니다. 이렇게 제공하는 파일을 `Dockerfile` 처럼 빌드를 하여 사용할 수 있습니다.

<br/>

# A.X-4.0-Light
- [우리말 잘하는 LLM : A.X-4.0-Light-gguf](https://wikidocs.net/291059)
- [huggingface GGUF / A.X-4.0-Light](https://huggingface.co/mykor/A.X-4.0-Light-gguf/blob/main/A.X-4.0-Light-Q5_K_M.gguf)

## GGUF 모델을 Ollama 로 빌드하기
```bash
$ wget https://huggingface.co/mykor/A.X-4.0-Light-gguf/resolve/main/A.X-4.0-Light-Q5_K_M.gguf

$ touch Modelfile             
$ ls
Modelfile

$ cat Modelfile             
# https://huggingface.co/mykor/A.X-4.0-Light-gguf/blob/main/A.X-4.0-Light-Q5_K_M.gguf
FROM ./A.X-4.0-Light-Q5_K_M.gguf

PARAMETER temperature 0.7
PARAMETER top_p 0.9

$ ollama create ax4-light -f Modelfile
```