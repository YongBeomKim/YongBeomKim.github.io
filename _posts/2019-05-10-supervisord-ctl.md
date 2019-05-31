---
title : supervisord 모니터링
last_modified_at: 2019-05-10T12:45:06-05:00
header:
  overlay_image: /assets/images/code/supervisord.png
categories:
  - django
tags: 
    - django 
    - supervisord
toc: true 
---

앞에서 Django 의 Celery 모듈의 진행과정을 확인하는 용도로써 **[SuperVisord](http://supervisord.org/)** 을 설치 및 활용하였습니다. 이러한 모니터링의 활용도는 많은 방법으로도 적용이 가능한 만큼 간단한 파이썬 모듈의 모니터링 연결 방법을 통해 보다 자세한 내용을 살펴보도록 하겠습니다.

이번 작업을 통해 확인하고 싶은 내용들은 다음과 같습니다.
1. **현재 실행중인 작업을** 확인
2. **작업의 상태를** 확인
3. 오류가 발생하면 **로그 파일의 확인** 
4. 작업이 완료되면 이메일 등으로 알림 

## Install 
supervisor 의 설치 및 재실행 방법을 정리해 보겠습니다. [Github](https://github.com/Supervisor/supervisor)  를 보면 **Python**으로 제작된 것임을 알 수 있습니다. <strike>youtube-dl, mycli, neovim, supervisor 모두 python이네..</strike>

```r
$ sudo apt-get install supervisor
$ sudo supervisord

# supervisor 의 실행상태를 확인 합니다
$ sudo service supervisor status

# supervisor 를 실행 합니다
$ sudo service supervisor start

# supervisor 를 멈춘 뒤 재실행 합니다
$ sudo service supervisor stop
$ sudo service supervisor restart
```

## Configuration

앞에서 살펴본 대로 실행에 필요한 설정파일들은 `/etc/supervisor/conf.d/` 에 저장을 하고, 실행은 개별 파일에 포함된 `[program:test_process]` 내용과 일치하는 이름으로 실행 합니다. 이번 예제에서는 간단한 Python 파일을 모니터링 해보겠습니다.

`/home/my_username/test.py` 을 생성합니다.
```python
import time
count = 0
while True:
    count +=  1
    print(str(count) + ". This prints once every 5secs.")
    time.sleep(5)
```

`/etc/supervisor/conf.d/test_process.conf` 을 생성한 뒤 실행내용을 정의 합니다.
```python
[program:test_process]
command=python -u test.py
directory=/home/my_username
stdout_logfile=/home/my_username/test_process_output.txt
redirect_stderr=true
```
위에서 실행파일을 root 에 저장해서, 이를 그대로 실행 가능한 명령인 `$ python -u test.py` 내용을 추가 하였습니다.
{: .notice--info}

## supervisorctl 의 실행

실행 명령어를 살펴보면
1. **reread** : conf 파일을 다시 불러 옵니다.
2. **add <program>** : Adds a newly created conf file and starts the process
3. **status** : 실행중인 모든 status 상태를 출력 합니다
4. **start** <program> : 시작하는 명령
5. **restart** <program> : 재시작 명령
6. **tail** -f <program> : log file 내용을 출력 합니다
7. **exit** : supervisorctl 을 종료 합니다
8. **help** : commands 목록을 출력 합니다

```r
$ sudo supervisorctl
supervisor > reread
supervisor > add test_process
supervisor > status
```

## Web Interface

`/etc/supervisor/supervisord.conf` 파일을 수정하여 웹 인터페이스 설정을 변경 가능합니다.

```r
[inet_http_server]
port=*:9001
username=testuser
password=testpass
```

https://medium.com/@jayden.chua/use-supervisor-to-run-your-python-tests-13e91171d6d3



https://pinoylearnpython.com/supervisor-installation-and-configuration-on-ubuntu-18-04-lts/



http://doc.okbase.net/doclist/archive/257866.html
