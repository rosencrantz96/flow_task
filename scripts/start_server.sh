#!/bin/bash
SERVER_NAME=flow
FILE=/home/ubuntu/last-flow/.npm

cd last-flow/

if ! test -e $FILE; then
    echo "file does not Exist"
    sudo ln -s /home/ubuntu/.nvm/versions/node/v18.17.0/bin/npm
else
    echo "file Exist"
fi

/home/ubuntu/.npm-global/bin/pm2 restart $SERVER_NAME

/home/ubuntu/.npm-global/bin/pm2 list