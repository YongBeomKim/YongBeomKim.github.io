---
layout: blog
title: MariaDB from 10.6 to 11.4
tags:
- sql
---

Ubuntu 22.04 에서 MariaDB 를 일반적인 설치방법으로 진행하면 2025년 2월 현재까지도 `MariaDB 10.6.12`버젼이 설치 됩니다. [MraiaDB Currently maintained long-term releases](https://mariadb.org/about/#maintenance-policy ) 표를 보면 `10.5, 10.6, 10.11, 11.4` 까지 LTS 로 지정이 되어 있고 올해에는 `11.8` 버젼이 새로운 LTS 버젼으로 지정될 예정 입니다.

이번에는 `MariaDB 11.4` 를 설치하고, 지원하는 알고리즘을 `PlugIn` 방식으로 설치하고 데이터베이스에 적용하는 내용까지 정리해 보겠습니다.

<br/>

# MariaDB 특정버젼 설치하기
## Ubuntu 기본 설치과정으로 진행하기
Ubuntu 에서 기본으로 제공하는 설치 주소를 활용하여 진행하면, 2026년도에 종료되는 `MariaDB 10.6` 버젼을 설치 합니다.
```bash
# 우분투 기본으로 제공하는 저장소 활용하여 설치
$ sudo apt update && sudo apt upgrade                                                         
$ sudo apt-get install wget software-properties-common dirmngr ca-certificates apt-transport-https -y
$ sudo apt install mariadb-server mariadb-client
$ sudo pip install mycli


$ sudo -u mysql mariadb              
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Server version: 10.6.12-MariaDB-0ubuntu0.22.04.1 Ubuntu 22.04

MariaDB [(none)]>
```

## 사용자가 원하는 버젼 설치하기
2025년 현재, LTS 버젼 중 가장 최신인 `11.4` 를 설치해 보겠습니다. 우선 설치프로그램 주소를 업데이트 합니다. 아랫 내용 중 `--mariadb-server-version="mariadb-11.4"` 부분에서 버젼 내용을 사용자가 원하는 버젼으로 수정하면 됩니다. 진행된 내용을 보면 설치에 관련된 주소값이 기존내용이 `.old_1` 로 백업이 되고, 새로운 주소값이 생성된 것을 확이할 수 있습니다. 만약 새로운 주소가 분제가 있으면 기존의 주소값 파일을 사용하면 쉽게 해결 가능합니다
```bash
$ sudo apt install software-properties-common dirmngr curl ca-certificates apt-transport-https
curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | \
sudo bash -s -- --mariadb-server-version="mariadb-11.4"

......
Reading package lists... Done
[warning] Found existing file at 
/etc/apt/sources.list.d/mariadb.list. 
Moving to 
/etc/apt/sources.list.d/mariadb.list.old_1
```

현재 사용중인 서버에 업데이트를 해야하는 [Upgrading MariaDB](https://mariadb.com/kb/en/upgrading/)등의 내용을 참고하여 조금 더 살펴볼 부분이 많겠지만, 여기에서는 아직 사용하지 않은 데이터베이스를 사용자가 원한 버젼으로 새롭게 설치하는 과정으로 진행하겠습니다. 그러면 기존에 설치된 내용을 제거해 보도록 하겠습니다.
```bash
$ sudo systemctl stop mariadb
sudo apt remove --purge mariadb-server mariadb-client mariadb-common -y
sudo apt-get purge "mariadb-*"
sudo rm -rf /var/lib/mysql /etc/mysql
sudo apt autoremove -y --purge

......
N: Ignoring file 'mariadb.list.old_1' in directory 
'/etc/apt/sources.list.d/' as it has an 
invalid filename extension
```

버젼변경으로 인하여 백업을 진행한 주소값이 계속 메세지로 출력되고 있음을 볼 수 있습니다. 이 부분은 아랫 설치과정이 정상적으로 진행을 하고나면 해결해 보도록 하겠습니다. 이제 제대로 삭제되었는지 확인해 보겠습니다.
```bash
$ mariadb -v
bash: command not found: mariadb

$ sources.list.d sudo systemctl status mariadb                 
[sudo] password for username: 
Unit mariadb.service could not be found.
```

삭제를 확인 했으면, 앞서서 진행된 새롭게 추가된 설치경로를 활용하여 설치과정을 진행 합니다. 설치작업이 성공적으로 진행되었으면 재부팅 후 확인하면 됩니다.
```bash
sudo apt update && sudo apt upgrade                                                         
sudo apt-get install wget software-properties-common dirmngr ca-certificates apt-transport-https -y
sudo apt install mariadb-server mariadb-client
sudo pip install mycli
```

## Algorithm PlugIns
압축 알고리즘으로는 `zlib, lz4, lzma` 등이 있습니다. `zlib`알고리즘이 가장 범용으로 활용하기 적합하고, `lzma` 이 성능은 좋지만, 서버연산 비용이 커집니다.

`MariaDB 11.4` 에서 압축 알고리즘을 서버에 설치하는 방법은 다음과 같습니다
```bash
$ sudo apt-get install mariadb-plugin-provider-lz4 
$ sudo apt-get install mariadb-plugin-provider-lzma
```

설치가 완료된 뒤, MariaDB 에 적용하는 방법은 다음과 같습니다.
```sql
INSTALL SONAME 'provider_lzma';

SHOW GLOBAL STATUS WHERE Variable_name IN (
   'Innodb_have_lz4', 
   'Innodb_have_lzo', 
   'Innodb_have_lzma', 
);
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| Innodb_have_lz4    | OFF   |
| Innodb_have_lzo    | OFF   |
| Innodb_have_lzma   | ON    |
+--------------------+-------+
```

# 참고사이트
- [MySQL 데이터 압축](https://hoing.io/archives/1420)
- [Installing MariaDB 11 on Ubuntu 22.04/Ubuntu 20.04](https://kifarunix.com/install-mariadb-11-on-ubuntu/#installing-maria-db-11-on-ubuntu-22-04-ubuntu-20-04-1)
- [MariaDB Server 11.4 will be LTS](https://mariadb.org/11-4-lts/)
- [About MariaDB Server](https://mariadb.org/about/#maintenance-policy)