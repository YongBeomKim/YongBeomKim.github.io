## AWS Ubuntu 22.04 LST init
sudo passwd root
# sudo adduser `사용자이름`
# sudo usermod -aG sudo `사용자이름`

# Neovim Install
sudo add-apt-repository ppa:neovim-ppa/stable 
sudo apt-get update -y
sudo apt-get install neovim -y

# Korea LocalTime Setting
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo apt-get install language-pack-ko -y

## Nginx 서버 추가
# https://prohannah.tistory.com/84
sudo apt install -y curl gnupg2 ca-certificates lsb-release
echo "deb http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
sudo apt-get -y install nginx
sudo service nginx start
sudo service nginx status

## Node.js
# https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04
#cd ~ && curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
#source nodesource_setup.sh
#apt-get install -y nodejs
#curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | zsh
#npm install --location=global yarn --force
sudo apt-get update
sudo apt-get install build-essential
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -- 
sudo apt-get install nodejs


## Python DEV
# install Python3.10
# https://www.itsupportwale.com/blog/how-to-upgrade-to-python-3-11-on-ubuntu-20-04-and-22-04-lts/
apt install software-properties-common -y
add-apt-repository ppa:deadsnakes/ppa -y
apt update
apt-get install python3.10 -Y
apt install python3-pip -y
apt install python3.10-dev libpq-dev -y
apt install python3.10-venv -y
apt install python3.10 -y
apt install python3.10-lib2to3 -y
apt install python3.10-gdbm -y
apt install python3.10-tk -y
apt install python3-pip -y
# apt install libpq-dev       # PostgreSQL
apt install libmariadb-dev  # MariaDB
apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev pkg-config make -y
rm -rf /var/lib/apt/lists/lock
# pip3.10 install pgcli psycopg2

## Redis Server
# https://hayden-archive.tistory.com/429
sudo apt-get install redis-server -y
sudo apt install net-tools -y
redis-server --version

## MariaDB
apt-get -y install mariadb-server mariadb-client
pip3 install mycli

## Oh My Zshell
# https://linuxips.com/how-to-install-zsh-on-ubuntu/
apt -y install git
apt -y install zsh
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
## Add wisely, as too many plugins slow down shell startup.
#plugins=(
#        git
#        zsh-autosuggestions
#        zsh-syntax-highlighting
#)

