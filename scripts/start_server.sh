#!/bin/bash
SERVER_NAME=flow-task
FILE=/home/ubuntu/flow/.npm

cd flow/

if ! test -e $FILE; then
    echo "file does not Exist"
    sudo ln -s /home/ubuntu/.nvm/versions/node/v18.17.0/bin/npm
else
    echo "file Exist"
fi

/home/ubuntu/.nvm/versions/node/v18.17.0/bin/pm2 restart $SERVER_NAME

/home/ubuntu/.nvm/versions/node/v18.17.0/bin/pm2 list