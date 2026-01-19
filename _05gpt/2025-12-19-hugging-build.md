---
layout: blog
title: HuggingFace 활용방법 - Vision
tags:
- ollama
- huggingface
---

앞에서 살펴본 `Ollama` 는 설치 및 활용이 비교적 간단합니다. 별도의 서비스 서버를 운영하고, 사용자가 원하는 파라미터를 `requests.post` 로 전달하고 받을 수 있어서 `LLM` 모델을 쉽게 활용할 수 있습니다. 

Diffusion 또는 Whisper 등을 활용하여 이미지 및 사운드를 활용하기에는 어려워서 별도의 학습모델 빌드 도구를 필요로 합니다. 오픈소스 학습 모델을 직접 활용하는 빌드 모델에 대하여 살펴보면 다음과 같습니다.

| 기능          | Ollama | 보완 도구                    |
|--------------| ------ | ---------------------------|
| 텍스트 LLM    | ✅    | —                          |
| 이미지 분석    | ✅    | —                          |
| 이미지 생성    | ❌    | Stable Diffusion / ComfyUI |
| 음성 입력(STT) | ❌    | Whisper, Vosk, Coqui STT   |
| 음성 출력(TTS) | ❌    | Coqui TTS, Mozilla TTS     |
| 멀티모달 챗     | 부분   | 여러 모델 + 툴 연결           |


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

<br/>

# Sound
## Whisper/tiny




