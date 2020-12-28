# RPi Remote Switch Client
Client application for Raspberry Pi Remote Switch

## Node.js
#### For Raspberry Pi 2 and newer:

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt install -y nodejs
```

#### For old Raspberry Pi (ARMv6 based):
```
apt-get remove nodejs
wget https://nodejs.org/dist/v6.5.0/node-v6.5.0-linux-armv6l.tar.xz
tar xf node-v6.5.0-linux-armv6l.tar.xz
cd cd node-v6.5.0-linux-armv6l/
cp -R * /usr/local/
export PATH=$PATH:/usr/local/bin/node
export PATH=$PATH:/usr/local/bin/npm
```



## Installation
1. Create .env file with configuration
```
SERVER_URL=http://localhost:8080
AUTH_TOKEN=token 
```
2. Trigger installation
```
npm i && npm run build && npm run start 
```

