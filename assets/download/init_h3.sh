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
sudo apt install build-essential
tar -xf r8125-9.012.03.tar.bz2
cd r8125-9.012.03
sudo ./autorun.sh
cd ..


TITLE="\n\n >>> Odroid H3 WOL setting"
LINK="https://wiki.archlinux.org/title/Wake-on-LAN"
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
echo ${TITLE}"\n"${LINK}
sudo apt update && sudo apt full-upgrade
sudo apt install build-essential libelf-dev ethtool
#sudo systemctl enable wol@enp1s0
#sudo systemctl enable wol@enp2s0
#sudo systemctl start wol@enp1s0
#sudo systemctl start wol@enp2s0
#sudo ethtool -s enp1s0 wol g
#sudo ethtool -s enp2s0 wol g
#sudo ethtool enp2s0 | grep Wake


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

