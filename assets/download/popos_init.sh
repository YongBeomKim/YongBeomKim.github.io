## 우분투 사용자 관리
# https://jjeongil.tistory.com/2040

## Node.js
# https://github.com/nodesource/distributions
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E zsh - &&\
sudo apt-get install -y nodejs

## Python 3.10
# https://3months.tistory.com/497
# https://www.linuxcapable.com/how-to-install-python-3-10-on-ubuntu-22-04-lts/
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install python3-pip -y
sudo apt install python3.10 -y
sudo apt install python3.10-dev libpq-dev -y
sudo apt install python3.10-venv -y
sudo apt install python3.10-distutils -y
sudo apt install python3.10-gdbm -y
sudo apt install python3.10-tk -y
sudo apt install libmariadb-dev
sudo apt install python3-tk python3-dev tk-dev -y
sudo rm -rf /var/lib/apt/lists/lock

# Snap 설치
sudo apt-get install snapd -y
sudo snap install imgcat

# Java 11
sudo add-apt-repository -y ppa:openjdk-r/ppa 
sudo apt-get update 
sudo apt install openjdk-11-jdk

## Tilda, Neovim, Peek, Sticky Notes, NetTools, UnRAR
# https://www.youtube.com/watch?v=dYGnDh9n6-8
# https://linuxconfig.org/how-to-autostart-applications-on-ubuntu-22-04-jammy-jellyfish-linux
sudo add-apt-repository ppa:umang/indicator-stickynotes
sudo apt update && sudo apt upgrade -y
sudo apt -y install neovim tilda peek indicator-stickynotes unrar
sudo apt -y install gnome-startup-applications

## 한글설치
# https://dawoum.ddns.net/wiki/%ED%95%9C%EA%B8%80_%EC%9E%85%EB%A0%A5%EA%B8%B0
# https://github.com/Riey/kime
# https://shanepark.tistory.com/318
# https://velog.io/@nal-d/Manjaro-%EC%84%B8%ED%8C%85
wget https://github.com/Riey/kime/releases/download/v3.0.2/kime_ubuntu-22.04_v3.0.2_amd64.deb
sudo dpkg -i kime_ubuntu-22.04_v3.0.2_amd64.deb
rm kime_ubuntu-22.04_v3.0.2_amd64.deb
cd /etc/xdg/
sudo mkdir kime
sudo cp /usr/share/doc/kime/default_config.yaml /etc/xdg/kime/config.yaml

## Conky manager
# https://wiki.manjaro.org/index.php/Basic_Tips_for_conky
# https://linuxconfig.org/ubuntu-22-04-system-monitoring-with-conky-widgets
# https://connectwww.com/how-to-install-conky-on-ubuntu/2334
# https://github.com/brndnmtthws/conky/wiki/Configs
# wget https://github.com/brndnmtthws/conky/releases/download/v1.12.2/conky-x86_64.AppImage
# $ fc-list 로 설치된 폰트 이름을 확인한 뒤 설정에서 추가 합니다
sudo apt-get install fonts-nanum fonts-nanum-coding fonts-nanum-extra
sudo apt install conky-all
cp /etc/conky/conky.conf ~/.conkyrc_bak
wget https://raw.githubusercontent.com/MarkMcCoskey/ZorinConky/main/conky.config  
cp conky.config ~/.conkyrc
rm conkr.config

## Oh My Zshell
# https://linuxips.com/how-to-install-zsh-on-ubuntu/
sudo apt install zsh
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
# git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

## Add wisely, as too many plugins slow down shell startup.
#plugins=(
#        git
#        zsh-autosuggestions
#        zsh-syntax-highlighting
#)

# 한컴오피스 파일 설치 
# https://www.bada-ie.com/board/view/?page=1&uid=4366&category_code=uELK%7C%7CIXXn%7C%7C&code=all&key=&keyfield=
# 설치 후
# sudo ln -sf /usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/libqt5im-tian.so /opt/hnc/hoffice11/Bin/qt/plugins/platforminputcontexts/libqt5im-tian.so

