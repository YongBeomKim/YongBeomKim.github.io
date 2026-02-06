---
layout: blog
title: HuggingFace 사용자 Token
tags:
- ollama
- huggingface
---

LLM 를 LocalHost 에서 실행하는 경우, ollama 에서 필요한 모델을 찾아서 다운받아 사용하고 있습니다. Ollama 에서 직접 제공하지 않은 등록되어 있지 않은 모델을 사용할 때에는 [huggingface.co](https://huggingface.co/docs/huggingface_hub/main/ko/package_reference/environment_variables) 에서 필요한 모델을 찾은 뒤 `ollama build` 옵션을 선택하여 명령어를 확인할 수 있습니다. 해당 명령어를 `Ubuntu 24 Cli` 에 입력하면 설치를 진행합니다.

```bash
ollama run hf.co/mradermacher/Llama3.3-8B-Instruct-Thinking-Claude-4.5-Opus-High-Reasoning-i1-GGUF:Q4_K_M
```

<br/>

# HuggingFace 의 Build 모델의 설치
## Python 으로 활용하기
`Ollama` 는 `OpenAI-style REST API` 방식도 제공 합니다. 따라서 아래의 예제처럼 이미지 파일을 첨부하여 전달하는 방식으로도 구현이 가능 합니다. 반면 `Whisper` 와 같은 음성 (실시간 음성) 은 지원하지 않습니다.

```python
import requests

res = requests.post(
    "http://localhost:11434/v1/chat/completions",
    json={
        "model": "llama4:scout",
        "messages": [{"role": "user", "content": "Describe this image"}],
        "images": ["./test.png"]
    }
)
print(res.json())
```

## Error: pull model
용량이 큰 모델들을 설치 진행하다가 다음과 같은 오류가 발생하여 작업이 중단 되었습니다.
```bash
$ ollama run hf.co/microsoft/phi-4-gguf:Q4_K_S                

pulling manifest 
Error: pull model manifest: 429: {
  "error":"We had to rate limit your IP (1.0.100.111). 
  To continue using our service, create a HF account or login 
  to your existing account, and make sure you pass a HF_TOKEN 
  if you're using the API."
}
```

## `SSH` 사용자 정보 등록
Huggingface 의 모델을 사용하기 위한 사용자 설정방법에 대하여 살펴보겠습니다. 참고로 별도의 요금부과는 없으니 안심하고 절차를 진행하면 됩니다. 우선 사용자 PC를 등록절차를 진행합니다. 현재 작업하는 시스템의 고유값인 `ssh` 암호값을 생성한 뒤 이를 Huggingface 의 사용자 정보게 등록합니다. 

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/llm/hugging_setting_01.jpg">
  </p>
  <figcaption>ssh 등록</figcaption>
</figure>

## `HuggingFace Token` 생성 후 서비스 연결
huggingface 를 어떠한 용도로 사용할 것인지를 지정하고, 해당 용도에 맞게 사용할 서비스를 연결하는 작업 입니다. 여기에서는 `Ollama` 로 해당 모델들을 `Build` 하는 용도로써 사용하는 과정에 대하여 살펴보겠습니다. 아래의 그림과 같이 용도와 Huggingface Token 값을 생성 합니다.

<figure class="align-center">
  <p style="text-align: center">
  <img width="820px" src="{{site.baseurl}}/assets/llm/hugging_setting_02.jpg">
  </p>
  <figcaption>Token값 생성</figcaption>
</figure>

이렇게 생성한 Token 값을 `Ollama` 의 설정파일에 `OLLAMA_HF_TOKEN` 내용으로 추가 합니다.

```bash
$ cat /etc/systemd/system/ollama.service.d/override.conf

[Service]
# 사용자님의 24코어를 강제로 지정하여 오버헤드 방지 (16)
Environment="OMP_NUM_THREADS=24" 
# 모델을 메모리에 상주시켜 응답 속도 향상 (예: 1시간 상주)
Environment="OLLAMA_KEEP_ALIVE=300m"
# Docker Container 에서도 접속 가능하도록 환경변수 추가
Environment="OLLAMA_HOST=0.0.0.0"

# 동시 실행 모델 수 제한 (메모리 파편화 방지)
Environment="OLLAMA_MAX_LOADED_MODELS=1"
# 병렬 요청 처리 제한
Environment="OLLAMA_NUM_PARALLEL=1"
# 무한정 요청을 쌓아두지 않고 거절하게 하여 프로세스 과부하를 막습니다.
Environment="OLLAMA_MAX_QUEUE=256"
# 큰 컨텍스트를 요구로 메모리 오류를 방지합니다.
Environment="OLLAMA_CONTEXT_LENGTH=6144"

# GPU 혼합 offload 안정성
Environment="OLLAMA_FLASH_ATTENTION=1"

# 프로세스가 멈췄을 때 systemd가 강제로 재시작하도록 유도
Restart=on-failure

# 파일 열기 제한 및 프로세스 제한 확장 (대규모 모델 구동 시 안정성 확보)
LimitNOFILE=65535
LimitNPROC=65535

# Huggingface Token
Environment="OLLAMA_HF_TOKEN=hf_ABC1234!@#$%!@%....."
```

## 그럼에도 위와 같은 오류가 발생한다.
해당 기기에서 과도한 용량의 서비스를 계속적으로 진행하다보니, 일시적인 제한이 걸리게 된 것입니다. 이때 빈번하게 실행하면 마지막 실행명령의 시점을 기준으로 일정시간이 지나야 절차가 진행가능하게 되어 있어서 대락 1시간 ~ 2시간 이후에 다시 시도를 하면 진행되는 경우가 대부분 입니다. 보다 안정적으로 진행하려면 반나절 정도 지나서 진행하면 거의 문제가 없이 진행되는 것을 알 수 있었습니다.

참고로 Huggingface 에 존재하지 않는 버젼을 진행하는 경우에도 위와같은 상황이 발생합니다. 저같은 경우에도 존재하지 않는 특정 양자화 버젼을 다운받아보려고 진행을 하려다가 위와 같은 오류가 발생하였고 일정 시간이 지난 뒤 공식적으로 지원하는 모델을 다운 받을 수 있었습니다.

이렇게 현재까지 설치되어있는 모델들 목록을 출력하면 다음과 같습니다.

```bash
➜  ~ ollama ls | sort -k2
# Multi Modal
gemma3:latest                                                     3.3 GB

# lama3.3 Model
lama3.3-8B-Instruct-Thinking-Claude-4.5-Opus-High-Reasoning-i1-GGUF:Q6_K
=>                                                                6.6 GB 

# Phi4
phi4-mini:latest                                                  2.5 GB
phi4-mini-reasoning:latest                                        3.2 GB
microsoft/phi-4-gguf:Q4_K_S                                       8.4 GB

# Qwen Coder
qwen2.5-coder:1.5b                                                986 MB
kirito1/qwen3-coder:latest                                        2.6 GB
freehuntx/qwen3-coder:8b                                          5.2 GB

# Qwen3
qwen3:4b                                                          2.5 GB
TeichAI/Qwen3-8B-GPT-5-Codex-Distill-GGUF:Q4_K_M                  5.0 GB
TeichAI/Qwen3-8B-DeepSeek-v3.2-Speciale-Distill-GGUF:Q4_K_M       5.0 GB
TeichAI/Qwen3-14B-Claude-Sonnet-4.5-Reasoning-Distill-GGUF:Q4_K_M 9.0 GB
TeichAI/Qwen3-14B-GPT-5.2-High-Reasoning-Distill-GGUF:Q4_K_M      9.0 GB

# NemoTraon by Nvidia
bartowski/nvidia_Nemotron-Cascade-14B-Thinking-GGUF:Q4_K_M        9.0 GB
```

<br/>

# 모델의 활용
**RTX 5070 Ti Mobile · VRAM 12GB** 환경에서는 *“작은 모델 여러 개를 역할별로 굴리는 전략”*을 추천합니다. 아래는 **VS Code + Opencode 기준**으로 **Autocomplete / Edit / Chat** 역할별로 **실전 모델을 추천**하는 내용 입니다.

## Autocomplete (가장 중요 ⚡)
* ✨ 목표: *0.2~0.4초 응답 / 끊김 없음*

### 1순위 -🥇 **qwen3-coder:4b  VRAM: ~2.6GB** ⭐⭐⭐⭐⭐
* 토큰 예측 정확도 매우 높음
* 짧은 코드 완성에 최적
* GPU 캐시 유지 쉬움
* VS Code 타이핑 흐름 안 끊김

👉 **Autocomplete 1순위 (정답)**


### 2순위 -🥈 kirito1/qwen3-coder:latest (≈ 4B)
* 4B 계열 중 문맥 유지 조금 더 좋음
* 체감 속도는 qwen3-coder:4b와 거의 동일

## ❌ 제외 모델들
| 모델             | 이유               |
| -------------- | ---------------- |
| qwen3-coder:8b | Autocomplete엔 과함 |
| phi-4 / llama  | 코드 completion 약함 |
| thinking 계열    | latency 폭증       |

---

## Edit / Refactor / Fix (Ctrl+I, Apply Edit)
* ✨ 목표: *코드 이해 + 안정적 수정*

### 1순위 - 🥇 **Qwen3-8B-GPT-5-Codex-Distill (Q4_K_M)  VRAM: ~5GB** ⭐⭐⭐⭐⭐
* Codex 계열 → **edit 정확도 최고**
* diff / patch / refactor 강함
* Python / TS / Shell 모두 안정적

👉 **Edit 작업 최적 모델**

### 2순위 - 🥈 qwen3-coder:8b
* Edit도 잘함
* 다만 Codex 계열보다 수정 안정성은 약간 ↓

### 3순위 - 🥉 phi-4 (Q4_K_S)
* 코드 *설명 + 간단 수정*엔 좋음
* 대규모 refactor는 비추천

---

## Chat / 설계 / 디버깅 / 리뷰 (Thinking 필요)
* ✨ 목표: *설계·추론·원인 분석*

### 1순위 -🥇 **Qwen3-14B-Claude-Sonnet-4.5-Reasoning VRAM: ~9GB** ⭐⭐⭐⭐⭐
* Claude 계열 reasoning 스타일
* 코드 리뷰, 설계, 버그 원인 분석 매우 강함
* Opencode Chat에 **가장 잘 맞음**

👉 **Chat 메인 모델 (강력 추천)**

### 2순위 - 🥈 Nemotron-Cascade-14B-Thinking
* 논리 깊이 좋음
* 다만:
  * 응답이 다소 verbose
  * 코딩 감각은 Qwen보다 ↓

### 3순위 -🥉 Llama3.3-8B-Thinking
* 추론은 좋음
* CPU/GPU 대비 효율 낮음
* Chat 보조용 정도

---

## 빠른 Chat (Thinking OFF)
* 가볍게 질문 / 간단 설명

### ✅ phi-4 (Q4_K_S)
* 빠름
* 기술 설명 깔끔
* GPU 8GB 이하 환경에서도 안정

👉 *Quick Chat 용*

---

## 🧠 최종 추천 조합 (이대로 쓰면 끝)
- VS Code / Opencode 권장 세팅
```text
Autocomplete → qwen3-coder:4b
Edit / Fix   → Qwen3-8B-GPT-5-Codex-Distill
Chat (Main)  → Qwen3-14B-Claude-Sonnet-Reasoning
Chat (Quick) → phi-4
```

- VRAM 사용:
  * Autocomplete: ~3GB
  * Edit: ~5GB
  * Chat: ~9GB
  👉 **동시 로딩 OK (12GB)**

---

## ❌ 굳이 안 써도 되는 모델
* qwen3-14b-gpt5 (Chat 중복)
* Llama Thinking (효율 ↓)
* Nemotron 일반 버전 (Cascade만 유지)

<br/>

# 빌드한 학습모델 Python 활용하기 
## `diffusion(diffusers)`** 과 **`stable_diffusion_cpp` 비교
학습모델을 `Python` 에서 활용하는 예시들을 보면 크게 [diffusion](https://github.com/huggingface/diffusers) 과 [stable_diffusion_cpp](https://github.com/leejet/stable-diffusion.cpp) 으로 나눠지는 것을 확인 할 수 있습니다.

| 항목        | diffusers | stable_diffusion_cpp |
| ---------- | --------- | -------------------- |
| 언어        | Python    | C++                  |
| 백엔드      | PyTorch   | GGML / GGUF           |
| GPU 활용    | 매우 강력   | 제한적                 |
| CPU-only   | ❌ 느림    | ✅ 실용적              |
| SDXL       | ✅ 완벽    | ⚠ 부분                 |
| ControlNet | ✅        | ❌                    |
| LoRA       | ✅        | ⚠ 제한                 |
| 커스터마이징  | 최고       | 낮음                   |
| 배포 용이성   | 보통       | 매우 좋음               |
| 메모리 사용   | 큼        | 작음                   |

## [diffusers](https://github.com/huggingface/diffusers)
개발작업에 사용하는 패키지 입니다. `Pytorch` 를 주요한 엔진으로 사용하고 있습니다. 때문에 `커스터마이징, 생성품질, 생태계`에서 최신 기능을 지원합니다. 최근에는 `GGML / GGUF` 포맷의 학습 데이터도 활용 가능해져서 `stable_diffusion_cpp` 의 상당 부분을 대체하고 있습니다.
```yaml
Python
 └─ PyTorch
     └─ CUDA / ROCm / CPU
```

## [stable_diffusion_cpp](https://github.com/leejet/stable-diffusion.cpp)
배포시에 적합한 패키지 입니다. `C++` 를 기반으로 운영되어 상대적으로 저사항 모델에 적합합니다. 컨버팅이 필요한 만큼 `커스터마이징, 생성품질, 생태계` 등에 대하여 상대적으로 늦게 지원하는 단점이 있습니다.
```yaml
Python (thin wrapper)
 └─ C++ (stable-diffusion.cpp)
     └─ CPU / Metal / Vulkan
```

## 결론
Python 에 대한 자유도가 높고, 양자화 모델도 지원하는 [diffusers](https://github.com/huggingface/diffusers) 를 활용해 보겠습니다.

<br/>

# Vision
## Z-Image-Turbo
이미지를 생성하는 모델로써 최적화가 잘 되어있는 `Z-Image-Turbo` 에 대하여 살펴보겠습니다. [Tongyi-MAI/Z-Image-Turbo](https://huggingface.co/Tongyi-MAI/Z-Image-Turbo) 기본모델이 있고, 이를 양자화로 최적화된  [jayn7/Z-Image-Turbo-GGUF](https://huggingface.co/jayn7/Z-Image-Turbo-GGUF) 이 있습니다.

| 구분            | 기본 모델 (Tongyi-MAI)      | GGUF 모델 (jayn7)                         |
| -------------- | ------------------------- | ---------------------------------------- |
| **파일 형식**    | `.safetensors` 또는 `.bin` | `.gguf`                                  |
| **데이터 정밀도** | FP16 또는 FP32 (고정밀도)    | Q4, Q5, Q8 등 (양자화/Quantized)           |
| **파일 용량**    | 매우 크고 무거움              | 상대적으로 훨씬 작음                         |
| **필요 메모리(VRAM)** | 높음 (고성능 그래픽카드 필수) | 낮음 (낮은 VRAM 또는 일반 RAM으로도 가능)    |
| **실행 환경**    | PyTorch, Diffusers, 전문 WebUI 등 | `llama.cpp` 기반 로더, GGUF 지원 UI 등 |

## GGUF를 사용하는 이유 (양자화의 개념)
**양자화란?** 모델이 계산할 때 사용하는 숫자의 정밀도를 낮추는 것입니다. 예를 들어, 소수점 아래 열 번째 자리까지 계산하던 것을 첫 번째 자리까지만 계산하게 만드는 식입니다. **장점:** 모델의 용량이 1/2에서 1/4까지 줄어들며, 그래픽카드의 메모리(VRAM)가 부족하더라도 시스템 메모리(RAM)를 빌려와 실행할 수 있습니다. **단점:** 정밀도를 낮추기 때문에 아주 미세하게 이미지의 디테일이나 품질이 원본보다 떨어질 수 있습니다 (하지만 육안으로는 구분하기 힘든 경우가 많습니다).

## 결론
**GGUF (주로 Q8_0 또는 Q5_K_M 버전)**이 속도와 품질 사이의 균형이 가장 좋기 때문에 먼저 사용해 보겠습니다.
