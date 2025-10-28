---
layout: blog
title: (Docker) Certbot & Nginx - 인증서 발급
tags:
- certbot
- nginx
---

서비스를 도메인과 연결할 때, 보안 등의 여러 이유로 `https://` 인증서 발급과정을 필요로 하는 경우가 많습니다. `docker` 를 활용하는 서비스인 경우에는 `certbot` 을 활용하여 [Let's Encrypt](https://letsencrypt.org/ko) 의 `https://` 인증서를 발급하는 대중적으로 잘 알려져 있습니다.

일반적인 클라우드를 활용하여 작업을 하는 경우에는 [Certbot으로 SSL 인증서 발급받기](https://ratatou2.tistory.com/85) 등의 작업관련 문서들을 참고하면 기본적인 작업이 가능합니다. 

이번에 추가로 정리하게된 내용은 `iptime` 의 `DNS` 주소를 활용할 떄 주의할 점에 대하여 간단히 정리해 보겠습니다.

<br/>

# IPTime 공유기를 활용할 때, 주의할 점
## certbot 인증서 발급내용 살펴보기
`https:\\` 인증서를 발급받을 때, 가장 중요한 내용은 `도메인 주소값` 과 `해당 도메인 소유자` 확인 입니다. 발급할 때 도메인과 사용자 정보(email) 값을 입력하는데 해당값이 고유값인지를 확인하고 인증서를 발급해 줍니다.
```bash
docker run --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  --email {이메일} \
  --agree-tos \
  --no-eff-email \
  --staging \
  -d {DNS 주소}
```

## `IPTIME.DNS` 주소를 활용한 도메인 등록
변동식 ip 주소를 사용하는 경우는 특정 ip 주소가 일정기간 계속 사용 가능합니다. 하지만 서비스 제공업체의 여러가지 사정으로 ip 주소가 변경 될 때마다 해당 주소를 사용했었던 설정값들을 수동으로 모두 바꿔줘야 하는 문제가 발생합니다.

이러한 번거로움을 해결하는 방법으로 아래와 같이 공유기에서 사용하는 `DNS` 주소값을 도메인 서비스 업체의 설정값에 다음과 같이 추가해 주면 됩니다.
<div style="text-align: center;">
  <figure class="align-center">
    <img width="550" src="{{site.baseurl}}/assets/linux/iptime_dns.png">
    <figcaption></figcaption>
  </figure>
</div>

## 인증서 발급시 문제점
결론부터 이야기 하면 `고정 IP` 주소로 도메인을 발급 받은 뒤, 해당 도메인으로 발급하면 가능합니다. 

반면 앞에서 살펴본 것처럼 `<name_>.iptime.org` 주소를 중간에 `CNAME` 으로 입력한 경우에는 발급이 거부되는 경우가 많고, `<name_>.iptime.org` 주소로는 발급이 불가능 하다고 합니다. [ipTime 공유기 시스템에서 SSL 인증서 발급하기 (Let's Encrypt)](https://yogyui.tistory.com/entry/ipTime-%EA%B3%B5%EC%9C%A0%EA%B8%B0-SSL-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EB%B0%9C%EA%B8%89-Lets-Encrypt)

최초에 `고정 ip`로 도메인을 발급한 뒤, 도메인별 정보를 확인하면 다음과 같습니다.
```bash
$ dig +short <name_01>.iptime.org

$ dig +short <name_02>.kr        
111.123.111.33

$ dig +short www.<name_02>.kr
<domain_name>.iptime.org.
111.123.111.33
```

특히 `www.<name_02>.kr` 도메인의 정보를 보면 `iptime DNS` 주소값과 `ip` 주소 2개의 값을 포함하는 것을 볼 수 있습니다. 해당 도메인을 인증할 때에는 `iptime DNS` 주소의 소유자도 동일한지 확인 합니다. 때문에 `iptime DNS` 소유자로 인증을 하지 않은 경우에는 오류가 발생하게 됩니다.

<br/>

# 결론
인증서 발급이 꼭 필요한 경우에는, `고정 ip` 를 활용하여 Host 서비스와 도메인을 연결한 뒤 인증서를 발급 받으면 됩니다. 인증서를 발급 받은 뒤 `iptime DNS` 주소값으로 변경한 상태로 운영을 합니다.

기간이 지나서 인증서를 재 발급할 때에는 다시 `고정 IP`로 다시 도메인 설정값을 연결한 뒤 인증서를 갱신한 뒤 다시 `iptime DNS`로 변경하는 과정으로 진행하면 됩니다.

<br/>

# 참고사이트
- [Setting Up NGINX with Let's Encrypt for HTTPS in Docker Compose](https://ecostack.dev/posts/nginx-lets-encrypt-certificate-https-docker-compose/)
- [Docker Compose 환경에서 Certbot으로 Nginx SSL 설정하기](https://inas.kr/2025/04/16/docker-compose-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-certbot%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-nginx-ssl-%EC%9D%B8%EC%A6%9D%EC%84%9C-%EC%84%A4%EC%A0%95-%EA%B0%80%EC%9D%B4%EB%93%9C/)
- [Certbot으로 SSL 인증서 발급받기](https://ratatou2.tistory.com/85)
