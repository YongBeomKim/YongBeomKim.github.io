## AWS Ubuntu 22.04 LST init
TITLE="\n\n >>> Neovim"
echo $TITLE
sudo add-apt-repository ppa:neovim-ppa/stable 
sudo apt-get update -y
sudo apt-get install neovim -y


TITLE="\n\n >>> Korea LocalTime Setting"
echo $TITLE
sudo ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
sudo apt-get install language-pack-ko -y


TITLE="\n\n >>> Nginx 서버 추가"
LINK="https://prohannah.tistory.com/84"
echo ${TITLE}"\n ::"${LINK}
sudo apt install -y curl gnupg2 ca-certificates lsb-release
echo "deb http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
sudo apt-get -y install nginx
sudo service nginx start
sudo service nginx status


TITLE="\n\n >>> Node.js"
LINK="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04"
LINK="https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions"
echo ${TITLE}"\n ::"${LINK}
sudo apt install curl
sudo apt-get install build-essential libssl-dev
# curl -s https://deb.nodesource.com/setup_18.x | sudo bash
# sudo apt install nodejs -y
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y


TITLE="\n\n >>> Redis Server"
LINK="https://hayden-archive.tistory.com/429"
echo ${TITLE}"\n ::"${LINK}
sudo apt-get install redis-server -y
sudo apt install net-tools -y
redis-server --version


TITLE="\n\n >>> MariaDB"
echo ${TITLE}
apt-get -y install mariadb-server mariadb-client
pip3 install mycli


TITLE="\n\n >>> MariaDB Setting Port Change"
echo ${TITLE}" \n Port :"${PORT}
sed 's/"port = 3306"/"port = 15505"/g' < "/etc/mysql/mariadb.cnf" > "/etc/mysql/mariadb.cnf"
sed 's/"bind-address"/"#bind-address"/g' < "/etc/mysql/mariadb.conf.d/50-server.cnf" > "/etc/mysql/mariadb.conf.d/50-server.cnf"


TITLE="\n\n >>> Python 3.10 DEV"
LINK="https://www.itsupportwale.com/blog/how-to-upgrade-to-python-3-11-on-ubuntu-20-04-and-22-04-lts"
echo ${TITLE}"\n ::"${LINK}
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
apt install libmariadb-dev  # MariaDB
apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev pkg-config make -y
# apt install libpq-dev       # PostgreSQL
# pip3.10 install pgcli psycopg2
rm -rf /var/lib/apt/lists/lock

