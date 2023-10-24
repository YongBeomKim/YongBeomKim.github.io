## System 
# Setting
ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
apt install zip unzip

## Tools
# NeoVim
add-apt-repository ppa:neovim-ppa/unstable
apt-get update
apt-get -y install neovim

# Nginx
# https://www.nginx.com/resources/wiki/start/topics/tutorials/install/
sudo -s
nginx=stable # use nginx=development for latest development version
add-apt-repository ppa:nginx/$nginx
apt update
apt-get -y install nginx
service nginx start
service nginx status

# Node.js (22/10/25 v18 LTS)
# https://github.com/nodesource/distributions/blob/master/README.md
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs


## Python
# Dependancy Modules
apt install openssl -y
apt install libssl1.0-dev -y
apt install libssl1.0 -y
apt install apt-transport-https -y
apt-get -y install libbz2-dev
apt-get -y install build-essential libssl-dev
apt-get -y install --reinstall build-essential zlib1g-dev dpkg-dev libffi-dev libsqlite3-dev
apt-get -y install python3-pip
apt-get -y install libpq-dev python3.8-dev
apt -y install python3.8-venv
apt -y install python3-pip
apt -y update && apt -y upgrade
apt -y autoremove

# ZSH
# https://linuxips.com/how-to-install-zsh-on-ubuntu/
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


# ZSH Script Edit
cp .zshrc  zshrc.txt

cat << EOF > script.py
# ZSH script Edit
file_name = "zshrc.txt"
add_new = ["plugins=(\n", "git\n", "zsh-autosuggestions\n", "zsh-syntax-highlighting\n", ")\n"]

with open(file_name, "r") as f:
    data = f.readlines()

new_text = []
for _ in data:
    if _.find("plugins=(git)") != -1:
    	new_text += add_new
    else:
	new_text.append(_)

with open(file_name, 'w') as f:
    f.write(new_text)
EOF

python ./script.py
cp zshrc.txt .zshrc
rm script.py zshrc.txt
source .zshrc

## After Python & ZSH
## Postgresql
# https://www.postgresql.org/download/linux/ubuntu/
sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'  
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -  
apt-get -y update  
apt-get -y install postgres  
pip install pgcli psycopg2  

## NVM
# https://github.com/nvm-sh/nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | zsh

