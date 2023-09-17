# Odroid H3 "DEL" key while booting
# https://wiki.odroid.com/odroid-h2/hardware/h2_bios_update

TITLE="\n\n >>> Mirror 사이트 변경 (Kakao) and Locale Setting"
echo ${TITLE}"\n ::"${LINK}
ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo apt-get install language-pack-ko
sudo sed -i 's/kr.archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
sudo apt update && sudo apt upgrade
sudo apt-get install iputils-ping -y
sudo snap install nvim --classic
sudo snap install imgcat


TITLE="\n\n >>> Start job is running for wait for network to be configured"
LINK="https://askubuntu.com/questions/972215/a-start-job-is-running-for-wait-for-network-to-be-configured-ubuntu-server-17-1"
# $ ip addr
echo ${TITLE}"\n ::"${LINK}
sudo systemctl disable systemd-networkd-wait-online.service
sudo systemctl mask systemd-networkd-wait-online.service


TITLE="\n\n >>> Install the Ethernet Driver"
LINK1="https://wiki.odroid.com/odroid-h3/hardware/install_ethernet_driver_on_h3plus"
LINK2="https://www.realtek.com/en/component/zoo/category/network-interface-controllers-10-100-1000m-gigabit-ethernet-pci-express-software"
# lsmod | grep r8
echo ${TITLE}"\n"${LINK1}"\n"${LINK2}
sudo apt install software-properties-common
sudo add-apt-repository ppa:hardkernel/ppa
sudo apt update
sudo apt install realtek-r8125-dkms
echo "blacklist r8169" | sudo tee /etc/modprobe.d/blacklist-odroidh3.conf
sudo update-initramfs -u
sudo reboot


TITLE="\n\n >>> Odroid H3 WOL setting"
LINK="https://wiki.odroid.com/odroid-h3/application_note/wake_on_lan"
# sudo vi /etc/systemd/system/wol@.service
#[Unit]
#Description=Wake-on-LAN for %i
#Requires=network.target
#After=network.target
 
#[Service]
#ExecStart=/bin/sh -c "ethtool -s %i wol g"
#Type=oneshot
 
#[Install]
#WantedBy=multi-user.target
#sudo systemctl enable wol@enp1s0
#sudo systemctl enable wol@enp2s0
#sudo systemctl start wol@enp1s0
#sudo systemctl start wol@enp2s0
echo ${TITLE}"\n"${LINK}
sudo apt update && sudo apt full-upgrade
sudo apt install build-essential libelf-dev ethtool
sudo ethtool -s enp1s0 wol g
sudo ethtool -s enp2s0 wol g
sudo ethtool enp2s0 | grep Wake


TITLE="\n\n >>> openssh-server"
LINK="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=webpioneer&logNo=221572167889"
# $ sudo nvim /etc/ssh/sshd_config
## GSSAPIAuthentocation no (활성화)
# $ sudo service sshd restart
# $ ip a
echo ${TITLE}"\n"${LINK}
sudo apt install openssh-server -y
sudo apt install openssh-client
sudo systemctl status ssh
sudo ufw allow ssh


TITLE="\n\n >>> FTP Server"
LINK="https://webnautes.tistory.com/1678"
# sudo nvim /etc/vsftpd.conf
## listen_ipv6=YES
## anonymous_enable=NO
## local_enable=YES
## chroot_local_user=YES
## allow_writeable_chroot=YES
## write_enable=YES
## local_umask=022
## dirmessage_enable=YES
echo ${TITLE}"\n"${LINK}
sudo apt-get install vsftpd
sudo systemctl restart vsftpd
sudo systemctl status vsftpd


TITLE="\n\n >>> Transmission Torrent"
LINK="https://velog.io/@chch1213/build-home-server-10"
LINK='https://ossmalta.eu/set-up-transmission-daemon-to-turn-ubuntu-22-04-as-remote-download-server'
## 토렌트 작업 완료 후 삭제 스크립트
# https://gist.github.com/ffcruz85/6c9fb792fce4af0c4cb561fd653c86b6
# sudo apt-get purge --auto-remove transmission-daemon
#sudo nvim /etc/init.d/transmission-daemon
# USER=사용자계정
#sudo vi /etc/init/transmission-daemon.conf
# setuid 실행사용자
# setgid 실행사용자
#sudo systemctl daemon-reload
## 다음의 내용을 실행하면 다음의 경로로 소유자 및 파일이 변경 
# /home/username/.config/transmission-daemon/setting.json
# sudo chown -R 사용자계정:사용자계정 /var/lib/transmission-daemon/info
# sudo chown -R 사용자계정:사용자계정 /etc/transmission-daemon/settings.json
# sudo chown -R 사용자계정:사용자계정 /다운로드폴더
# https://velog.io/@chch1213/build-home-server-10
#sudo nvim /etc/transmission-daemon/settings.json
#{
#    "blocklist-enabled": true,
#    # https://gist.github.com/shmup/29566c5268569069c256
#    "blocklist-url": "https://github.com/Naunter/BT_BlockLists/raw/master/bt_blocklists.gz",
#    "download-dir": "/home/user/Downloads",
#    "download-queue-enabled": true, 
#    "rpc-authentication-required": false,
#    "rpc-host-whitelist": "*.*.*.*",
#    "rpc-host-whitelist-enabled": true,    # 모든 IP에 대해서 접속 허가
#    "rpc-password": "[Transmission 비밀번호]",
#    "rpc-port": 9091,
#    "rpc-username": "[Transmission 계정명]",
#    "script-torrent-done-enabled": true,
#    "script-torrent-done-filename": "/etc/transmission-daemon/AutoRemove.sh",
#    "speed-limit-up": 0,
#    "speed-limit-up-enabled": true,
#    "trash-original-torrent-files": true,   # 다운로드 시작 시 토렌트 파일 자동 삭제
#    "umask": 2,
#}
echo ${TITLE}"\n"${LINK}
sudo apt-get install transmission-daemon
sudo service transmission-daemon stop


TITLE="\n\n >>> Korean LocalTime Setting"
LINK="https://www.dante2k.com/500"
# echo 'LC_COLLATE="ko_KR.UTF-8"' >> /etc/environment # Permission Error
echo ${TITLE}"\n ::"${LINK}
ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo apt-get install language-pack-ko -y
echo 'LC_COLLATE="ko_KR.UTF-8"' | sudo tee -a /etc/environment
sudo localedef -f EUC-KR -ci ko_KR /usr/lib/locale/ko_KR.EUC-KR 
sudo localedef -f UTF-8 -ci ko_KR /usr/lib/locale/ko_KR.UTF-8
sudo dpkg-reconfigure locales


TITLE="\n\n >>> Next : Nginx Node.js MariaDB Redis Python & Oh My Zshell"
COMMENT="$ source init_ubuntu22.sh"
echo ${TITLE}"\n"${COMMENT}

