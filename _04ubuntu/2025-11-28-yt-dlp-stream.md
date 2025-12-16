---
layout: blog
title: (yt-dlp) youtube 동영상 다운로드
tags:
- youtube
---

유투브를 보려면 `로그인 Session` 정보를 확인한 뒤 가능하도록 변경 되었습니다.

```bash
yt-dlp --ignore-config --live-from-start --cookies-from-browser firefox -F https://www.youtube.com/watch\?v\=g123123
```

