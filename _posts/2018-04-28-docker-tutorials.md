---
title : Docker Addresses
last_modified_at: 2018-04-28T12:45:06-05:00
header:
  overlay_image: /assets/images/book/docker.png
tags: 
    - docker
    - ubuntu
toc: true    
---


## Docker Settings

[Github](https://github.com/IronicBadger/til/blob/master/docker/change-docker-root.md)

```
$ docker info 

erdos@tacademy:~$ docker info
Server Version: 18.04.0-ce
Operating System: Ubuntu 14.04.5 LTS
Architecture: x86_64
CPUs: 32
Total Memory: 62.89GiB
Docker Root Dir: /var/lib/docker
```

설치폴더가 /var/lib/docker 로 고정되어 있는데 여유공간이 3Gb에 불과하다. 가능하면 /home 경로로 전환해서 설치가능 용량을 늘려보자 


/lib/systemd/system/docker.service  파일을 수정한다 (새로운 경로는 /home/share/docker 이다)
```
$ nano /etc/systemd/system/docker.service.d/docker.root.conf

[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -g /home/share/docker -H fd://
```


설정변경 확인하기

```
$ systemctl daemon-reload
$ systemctl restart docker
$ docker info 
```



## Docer 간단 명령어 정리 [blog](https://subicura.com/2017/01/19/docker-guide-for-beginners-2.html)

```
$ docker images
$ docker run 실행 프로세스
```


실행중이 프로세스 확인하기

```
$ docker ps -a   
```


```
$ docker stop  컨테이너 id
$ docker rm    컨테이너 id 
```

**stop 과 rm:** 동작중인 컨테이너를 stop 하고 나면, 해당 container 를 창고로 옮겨놔야 한다. rm을 하지 않으면 계속 길목을 막아서 삭제작업이 안된다
{: .notice--info}


```
$ docker images
$ docker rmi  이미지 id 
```



## Docker 실행 명령어들 모음

저장된 이미지가 없으면 dockerhub 에서 다운로드를 한 뒤에 실행한다


### Ubuntu 실행

`docker run --rm -it ubuntu:16.04 /bin/bash`


### Jupyterhub 실행 [document](https://hub.docker.com/r/jupyterhub/jupyterhub/)

`docker run -p 8000:8000 -d --name jupyterhub jupyterhub/jupyterhub jupyterhub`


### Zeppline 실행 [document](https://zeppelin.apache.org/download.html)

`docker run -p 8080:8080 --rm -v $PWD/logs:/logs -v $PWD/notebook:/notebook -e ZEPPELIN_LOG_DIR='/logs' -e ZEPPELIN_NOTEBOOK_DIR='/notebook' --name zeppelin apache/zeppelin:0.7.3`


**Info Notice:**
{: .notice--info}

**Warning Notice:**
{: .notice--warning} 

**Danger Notice:**
{: .notice--danger}

**Success Notice:**
{: .notice--success}