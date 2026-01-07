---
layout: blog
title: Ollama Local 모델 활용하기
tags:
- ollama
---

TPU로 인하여 Nvidia 의 위치가 위협받는 가운데
[Nvidia/nemotron-3-nano](https://build.nvidia.com/nvidia/nemotron-3-nano-30b-a3b/modelcard) 모델을 발표했습니다. `ollama Library` 에서 설치를 진행하면 다음과 같은 오류와 함께 중단 되었습니다.

```bash
$ ollama pull nemotron-3-nano:30b
pulling manifest 
Error: pull model manifest: 412: 

The model you are attempting to pull requires a newer version of Ollama.
Please download the latest version at:
	https://ollama.com/download
```

이번에 `Ollama` 설치 및 업데이트, 그리고 설정에 대하여 살펴보도록 하겠습니다.

<br/>

## Install & Update
화면에서 보여주는 [Download Ollama](https://ollama.com/download) 페이지로 이동하면 설치 명령어만 보이는 것을 알 수 있습니다. 운영체계별 설치관련 상세페이지 [Documentation Linux](https://docs.ollama.com/linux)를 보면 기존의 설치된 패키지를 삭제하고 설치하는 것을 권장하고 있습니다.

이들을 조합하면 다음의 명령을 실행하면 최신 업데이트된 버젼으로 설치되는 것을 확인할 수 있습니다.
```bash
$ sudo rm -rf /usr/lib/ollama
$ curl -fsSL https://ollama.com/install.sh | sh
```

만약 업데이트 후 반영이 되지 않았다면, 시스템을 재 실행하거나 다음의 명령어로 서비스를 수동으로 재 실행 하면 됩니다.
```bash
sudo systemctl restart ollama
```

## Setting
`/etc/systemd/system/ollama.service.d/override.conf` 에서 사용자 설정값을 입력 및 수정할 수 있습니다. 이 내용을 반영한 전체 설정내용을 확인하는 방법은 `sudo systemctl edit ollama.service` 입니다. 설정내용이 변경 되었다면 `$ sudo systemctl daemon-reload && sudo systemctl restart ollama` 를 실행하는 방법으로 `Ollama` 를 재실행 하여야 합니다.

```bash
$ sudo nvim /etc/systemd/system/ollama.service.d/override.conf
[Service]
# 사용자님의 24코어를 강제로 지정하여 오버헤드 방지
Environment="OMP_NUM_THREADS=16"
# 모델을 메모리에 상주시켜 응답 속도 향상 (예: 1시간 상주)
Environment="OLLAMA_KEEP_ALIVE=60m"
# Docker Container 에서도 접속 가능하도록 환경변수 추가
Environment="OLLAMA_HOST=0.0.0.0"
# 동시 실행 모델 수 제한 (메모리 파편화 방지)
Environment="OLLAMA_MAX_LOADED_MODELS=1"
# 병렬 요청 처리 제한
Environment="OLLAMA_NUM_PARALLEL=1"
# 무한정 요청을 쌓아두지 않고 거절하게 하여 프로세스 과부하를 막습니다.
Environment="OLLAMA_MAX_QUEUE=512"
# 큰 컨텍스트를 요구로 메모리 오류를 방지합니다.
Environment="OLLAMA_CONTEXT_LENGTH=4096"

$ sudo systemctl edit ollama.service
... <전체 설정내용의 확인>

$ sudo systemctl daemon-reload && sudo systemctl restart ollama
... 변경된 내용 서비스에 적용하기
```

## Models
Ollama 서비스는 `root` 계정으로 설치 및 관리되고 있습니다. 모델들을 확인하고 저장되는 폴더를 살펴보면 다음과 같습니다.
```bash
$ ollama ls
NAME                  ID              SIZE      MODIFIED     
qwen3:4b              359d7dd4bcda    2.5 GB    2 months ago    
qwen2.5-coder:1.5b    d7372fd82851    986 MB    2 months ago

$ sudo du -h --max-depth=1 /usr/share/ollama 
113M	/usr/share/ollama/.nv
3.3G	/usr/share/ollama/.ollama
3.4G	/usr/share/ollama
```

## Ollama 실행하기
CLI 터미널과 Python 을 활용하여 
```bash
# 번역내용 확인
$ cat input.txt | ollama run nemotron-3-nano:30b --prompt "Translate the following text into Korean:"

# 번역내용 파일로 저장
$ cat input.txt | ollama run nemotron-3-nano:30b --prompt "Translate the following text into Korean:" > input_ko.txt
```

```python
import requests

# 파일 읽기
with open("input.txt", "r", encoding="utf-8") as f:
  text = f.read()

# Ollama API 호출
response = requests.post(
  "http://localhost:11434/api/generate",
  json={
    "model": "nemotron-3-nano:30b",
    "prompt": f"Translate the following text into Korean:\n\n{text}"
  }
)

for line in response.iter_lines():
  if line:
    print(line.decode("utf-8"))
```

## 모델 빌드하여 활용하기
(ollama.com/library)[https://ollama.com/library] 에서 `Ollama` 에서 직접 모델을 활용 가능한 내용들을 확인할 수 있습니다. 

`huggingface` 에서 `GGUF` 학습모델이 있을 때에는  [Use Ollama with any GGUF Model on Hugging Face Hub](https://huggingface.co/docs/hub/ollama) 에서 안내하는 것 처럼 모델을 설치 및 활용할 수 있습니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="910px" src="{{site.baseurl}}/assets/linux/ollama-modelpage-light.gif">
  </p>
  <figcaption><a href="https://huggingface.co/docs/hub/ollama">Use Ollama with GGUF</a></figcaption>
</figure>

<br/>

# 참고사이트
[1]: https://github.com/ollama/ollama/issues/11243?utm_source=chatgpt.com "Multi-Modal Support · Issue #11243 · ollama/ollama · GitHub"
[2]: https://ollama.com/blog/multimodal-models?utm_source=chatgpt.com "Ollama's new engine for multimodal models · Ollama Blog"
[3]: https://github.com/ollama/ollama/issues/11798?utm_source=chatgpt.com "Feature Request: Add Audio Input Support for Multimodal Models · Issue #11798 · ollama/ollama · GitHub"
[4]: https://toolerific.ai/ai-tools/opensource/Leon-Sander-Local-Multimodal-AI-Chat?utm_source=chatgpt.com "github- Local-Multimodal-AI-Chat :Features,Alternatives | Toolerific"
[5]: https://itlab.tistory.com/159?utm_source=chatgpt.com "LangChain에서 Ollama 사용하는 법 :: IT Lab"
