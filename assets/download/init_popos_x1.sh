# Thinkpad X1 Extream Development Computer
TITLE="\n\n >>> Battery Charging Tools"
LINK="https://askubuntu.com/questions/1411483/battery-full-indicator-22-04"
GITHUB="https://github.com/tshakalekholoane/bat"
# sudo tlp-stat -b
# upower -e | grep -i "batt"
# upower -i /org/freedesktop/UPower/devices/battery_BAT0
echo ${TITLE}"\n ::"${LINK}"\n GitHub :"${GITHUB}
sudo apt install make -y
sudo apt install tlp tlp-rdw
sudo snap install go --classic
sudo wget -qO /usr/local/bin/bat https://github.com/tshakalekholoane/bat/releases/download/0.13/bat
sudo chmod a+rx /usr/local/bin/bat
bat threshold
sudo bat threshold 78
sudo bat persist


TITLE="\n\n >>> Kakao Repo Change Need ..."
LINK="https://wnw1005.tistory.com/26"
# http://mirror.kakao.com/
#cd /etc/apt && sudo cp sources.list sources_original.list
#sudo vi sources.list
#:%s/kr.archive.ubuntu.com/mirror.kakao.com/
#:%s/security.ubuntu.com/mirror.kakao.com/
echo ${TITLE}"\n ::"${LINK}
sudo add-apt-repository --yes universe


TITLE="\n\n >>> Snap"
echo $TITLE
sudo apt-get install snapd -y
sudo snap install imgcat


TITLE="\n\n >>> Pacman (for ArchLinux)"
LINK="https://www.cyberithub.com/how-to-install-pacman-package-manager-on-ubuntu-20-04-lts"
COMMENT="For :: https://pypi.org/project/pdf-bookmark"
echo ${TITLE}"\n ::"${LINK}"\n"${COMMENT}
wget https://gitlab.com/trivoxel-utils/deb-pacman/uploads/460d83f8711c1ab5e16065e57e7eeabc/deb-pacman-2.0-0.deb
sudo dpkg -i deb-pacman-2.0-0.deb
sudo pacman -S pdftk -y
sudo pacman -S ghostscript -y
pacman --version


TITLE="\n\n >>> flatpak (Package Manager)"
LINK="https://flathub.org/apps/details/com.mattjakeman.ExtensionManager"
COMMENT="https://flatpak.org/setup/Ubuntu"
echo ${TITLE}"\n ::"${LINK}"\n"${COMMENT}
sudo add-apt-repository ppa:flatpak/stable
sudo apt update
sudo apt install flatpak
sudo apt install gnome-software-plugin-flatpak


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


TITLE="\n\n >>> Tools 1 - Tilda, Neovim, Peek, Sticky Notes, NetTools, UnRAR"
LINK="https://linuxconfig.org/how-to-autostart-applications-on-ubuntu-22-04-jammy-jellyfish-linux"
echo ${TITLE}"\n ::"${LINK}
sudo add-apt-repository ppa:neovim-ppa/stable 
sudo add-apt-repository ppa:umang/indicator-stickynotes
sudo apt update && sudo apt upgrade -y
sudo apt -y install unrar 
sudo apt -y install neovim tilda peek indicator-stickynotes
sudo apt -y install gnome-startup-applications
sudo apt-get -y install net-tools
sudo apt-get -y install redis-server


TITLE="\n\n >>> Tools 2 - KIME Hangul"
LINK1="https://www.clien.net/service/board/cm_linux/17302877"
LINK2="https://shanepark.tistory.com/318"
LINK3="https://velog.io/@nal-d/Manjaro-%EC%84%B8%ED%8C%85"
LINK3="https://github.com/Riey/kime/issues/471#issuecomment-829975769"
echo ${TITLE}"\n ::"${LINK1}"\n ::"${LINK2}"\n ::"${LINK3}
wget https://github.com/Riey/kime/releases/download/v3.0.2/kime_ubuntu-22.04_v3.0.2_amd64.deb
sudo dpkg -i kime_ubuntu-22.04_v3.0.2_amd64.deb
rm kime_ubuntu-22.04_v3.0.2_amd64.deb
cd /etc/xdg/
sudo mkdir kime
sudo cp /usr/share/doc/kime/default_config.yaml /etc/xdg/kime/config.yaml


TITLE="\n\n >>> Dev 1 - Python 3.10"
LINK="https://www.linuxcapable.com/how-to-install-python-3-10-on-ubuntu-22-04-lts"
# sudo apt install libpq-dev       # PostgreSQL
# sudo pip3.10 install mycli pgsql pgcli psycopg2
echo ${TITLE}"\n ::"${LINK}
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt-get install python3.10 -Y
sudo apt install python3-pip -y
sudo apt install python3.10-dev libpq-dev -y
sudo apt install python3.10-venv -y
sudo apt install python3.10 -y
sudo apt install python3.10-lib2to3 -y
sudo apt install python3.10-gdbm -y
sudo apt install python3.10-tk -y
sudo apt install python3-pip -y
sudo apt install libmariadb-dev  # MariaDB
sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev pkg-config make -y
rm -rf /var/lib/apt/lists/lock


TITLE="\n\n >>> Dev 2 - MariaDB & Redis Server"
LINK="https://hayden-archive.tistory.com/429"
echo ${TITLE}"\n ::"${LINK}
sudo apt-get install redis-server -y
sudo apt install net-tools -y
sudo apt-get -y install mariadb-server mariadb-client
sudo pip3 install mycli
redis-server --version


TITLE="\n\n >>> Dev 3 - Node.js & Yarn"
LINK="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04"
LINK="https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions"
# https://github.com/nvm-sh/nvm
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | zsh
# sudo npm install --location=global yarn --force
echo ${TITLE}"\n ::"${LINK}
sudo apt install curl
sudo apt-get install -y build-essential libssl-dev
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y
npm install -g yarn


TITLE="\n\n >>> Dev 4 - Tesseract OCR & Go"
LINK="https://techviewleo.com/how-to-install-tesseract-ocr-on-ubuntu"
echo ${TITLE}"\n ::"${LINK}
sudo add-apt-repository ppa:alex-p/tesseract-ocr-devel
sudo apt update
sudo apt install -y tesseract-ocr-script-hang tesseract-ocr-script-hang-vert


TITLE="\n\n >>> Dev 3 - React Native (with Java 11)"
LINK1="https://www.knowledgehut.com/blog/web-development/install-react-native-on-ubuntu"
LINK2="http://reactnative.dev/docs/getting-started.html#content"
COMMENT="https://linuxhint.com/install-android-studio-ubuntu22-04"
README="https://reactnative.dev/docs/environment-setup"
echo ${TITLE}"\n ::"${LINK1}"\n ::"${LINK2}"\n"${COMMENT}"\n"${README}
sudo apt-get install -y build-essential
sudo add-apt-repository -y ppa:openjdk-r/ppa 
sudo apt-get update 
sudo apt install openjdk-11-jdk
sudo add-apt-repository -y ppa:maarten-fonville/android-studio
sudo apt update
sudo apt install android-studio -y


TITLE="\n\n >>> IDE 1 - Sublime Text"
LINK="https://www.itzgeek.com/how-tos/linux/ubuntu-how-tos/how-to-install-sublime-text-on-ubuntu-22-04.html"
echo ${TITLE}"\n ::"${LINK}
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo gpg --dearmor -o /usr/share/keyrings/sublimetext-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/sublimetext-keyring.gpg] https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt update
sudo apt install -y sublime-text


TITLE="\n\n >>> IDE 2 - Atom IDE"
LINK="https://stackoverflow.com/questions/74837424/atom-certificate-has-expired"
echo ${TITLE}"\n ::"${LINK}
sudo snap install atom --classic
git clone https://github.com/platformio/platformio-atom-ide-terminal ~/.atom/packages/platformio-ide-terminal
cd ~/.atom/packages/platformio-ide-terminal
apm install
cd ~


TITLE="\n\n >>> Docker"
LINK="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04"
echo ${TITLE}"\n ::"${LINK}
sudo apt -y install apt-port-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
apt-cache policy docker-ce
sudo apt -y install docker-ce


TITLE="\n\n >>> Youtube Downloader"
LINK="https://github.com/yt-dlp/yt-dlp#release-files"
COMMENT="https://lindevs.com/install-yt-dlp-on-ubuntu"
echo ${TITLE}"\n ::"${LINK}"\n"${COMMENT}
sudo wget -qO /usr/local/bin/yt-dlp https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
sudo yt-dlp -U


TITLE="\n\n >>> MultiMedia - smplayer, audacious, GIMP"
LINK="https://linux-packages.com/ubuntu-focal-fossa/package/audacious"
# ffmpeg Tips : https://vesselor.tistory.com/73
echo ${TITLE}"\n ::"${LINK}
sudo add-apt-repository ppa:rvm/smplayer 
sudo apt-get update 
sudo apt install audacious gimp smplayer smplayer-themes -y


TITLE="\n\n >>> Conky manager"
GITHUB="https://github.com/brndnmtthws/conky"
CONFIGS="https://github.com/brndnmtthws/conky/wiki/Configs"
LINK1="https://wiki.manjaro.org/index.php/Basic_Tips_for_conky"
LINK2="https://linuxconfig.org/ubuntu-22-04-system-monitoring-with-conky-widgets"
LINK3="https://connectwww.com/how-to-install-conky-on-ubuntu/2334"
# wget https://github.com/brndnmtthws/conky/releases/download/v1.19.4/conky-x86_64.AppImage
# $ fc-list 로 설치된 폰트 이름을 확인한 뒤 설정에서 추가 합니다
echo ${TITLE}"\n github : "${GITHUB}"\n Configs : "${CONFIGS}
sudo apt-get install fonts-nanum fonts-nanum-coding fonts-nanum-extra
sudo apt install conky-all
cp /etc/conky/conky.conf ~/.conkyrc_bak
wget https://raw.githubusercontent.com/MarkMcCoskey/ZorinConky/main/conky.config  
cp conky.config ~/.conkyrc
rm conkr.config


TITLE="\n\n >>> Gnome Tweaks"
LINK="https://wnw1005.tistory.com/290"
FIREFOX="https://addons.mozilla.org/ko/firefox/addon/gnome-shell-integration/"
POPTOOLS="https://support.system76.com/articles/customize-gnome/"
## Gnome Extensions
# Dash to Dock for COSMIC
# Hide Top Bar
# OpenWeather
# System76 Power
# Wallpaper Switcher
## Gnome Extensions Used Names
# Extension Manager : Gnome API UPdate
# Gnome Installed Extensions
# Cosmic Dock, Cosmic WorkSpace, Cosmic X11 Gesture
# Dash to Dock for Cosmic, Desktop icons NG
# Hide Top Bar, Open Weather
# Pop COSMIC, Pop shell, Sysrtem76 power
# Ubuntu AppIndicators, Wallpaper Switcher
echo ${TITLE}"\n :: "${LINK}"\n Pop-os Tools : "${POPTOOLS}"\n FireFox : "${FIREFOX}
sudo apt -y install gnome-tweaks
gsettings set org.gnome.desktop.interface text-scaling-factor 1.3


TITLE="\n\n >>> Fixed of `Gnome Not support following APIs: v6`"
LINK="https://askubuntu.com/questions/1418937/your-native-host-connector-do-not-support-following-apis-v6"
echo ${TITLE}"\n ::"${LINK}
sudo apt-get install chrome-gnome-shell
gsettings set org.gnome.shell disable-extension-version-validation true
gsettings reset org.gnome.shell disable-extension-version-validation
flatpak install flathub com.mattjakeman.ExtensionManager
flatpak run com.mattjakeman.ExtensionManager


TITLE="\n\n >>> Fixed of `Pop os was not upgrade`"
LINK="https://github.com/pop-os/beta/issues/370"
echo ${TITLE}"\n ::"${LINK}
sudo apt clean
sudo apt update -m
sudo dpkg --configure -a
sudo apt install -f
sudo apt full-upgrade
sudo apt autoremove --purge
sudo apt install pop-desktop gdm3


TITLE="\n\n >>> SSH token"
LINK="https://git-scm.com/book/ko/v2/Git-%EC%84%9C%EB%B2%84-SSH-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EB%A7%8C%EB%93%A4%EA%B8%B0"
COMMENT1="$ cd ~/.ssh\n$ ssh-keygen -t rsa -C name@naver.com\n$ cat ~/.ssh/id_rsa.pub"
COMMENT2='[ssh] Permission denied (publickey) \n$ sudo chmod 644 ~/.ssh/known_hosts'
echo ${TITLE}"\n"${COMMENT1}"\n"${COMMENT2}"\n :: "${LINK}


TITLE="\n\n >>> Oh My Zshell"
LINK="https://linuxips.com/how-to-install-zsh-on-ubuntu"
## Add wisely, as too many plugins slow down shell startup.
#plugins=(
#        git
#        zsh-autosuggestions
#        zsh-syntax-highlighting
#)
echo ${TITLE}"\n ::"${LINK}
sudo apt install zsh
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting


## Appendix
### =======================================================================================================================
### login Background Changer
# https://github.com/thiggy01/change-gdm-background/issues/31
# https://askubuntu.com/questions/1369852/how-to-change-ubuntu-21-10-gdm-background-to-a-image-or-to-a-color/1396066#1396066
# sudo apt install systemd-container
# sudo machinectl shell gdm@ /bin/zsh
# gsettings set com.ubuntu.login-screen background-picture-uri 'file:///usr/share/backgrounds/login.jpg'

## Cuda Cudnn 삭제하기
# lspci | grep -i nvidia
# lshw -numeric -C display
# ubuntu-drivers devices            # 추천 드라이버 확인
# sudo ubuntu-drivers autoinstall
# dkms status                       # 설치내용 확인
# nvidia-smi                        # CUDA 버젼 확인
# sudo rm /etc/apt/sources.list.d/"cuda*" 
# sudo apt remove nvidia-cuda-toolkit
# sudo apt purge "nvidia*"
# sudo apt autoremove
# sudo apt autoclean
# sudo rm -rf /usr/local/"cuda*"

# 한컴오피스 파일 설치 후 Tian 실행링크 추가
# sudo ln -sf /usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/libqt5im-tian.so /opt/hnc/hoffice11/Bin/qt/plugins/platforminputcontexts/libqt5im-tian.so

# Galaxy Studio ... Android Studio Skins
# https://developer.samsung.com/galaxy-emulator-skin/galaxy-s.html?download=/emulatorskin/file/
# https://medium.com/duckuism/galaxy-s10-emulator-profile-%EB%A7%8C%EB%93%A4%EA%B8%B0-adf6ecf3b8ba

## Watchman v2022.11.14.00
# https://github.com/facebook/watchman/releases/tag/v2022.11.14.00
# https://facebook.github.io/watchman/docs/install.html

# 아랫 유투브를 참고하여 KVM 등 모듈 설치하기
# https://www.youtube.com/watch?v=PcbSgSJxIBc

# 한컴오피스 설치
# https://www.bada-ie.com/board/view/?page=1&uid=4366&category_code=uELK%7C%7CIXXn%7C%7C&code=all&key=&keyfield=
# https://dawoum.ddns.net/wiki/Installing_hoffice_2022_beta_on_Debian
