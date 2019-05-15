#!/bin/bash

if ! [ -d /data/db ]; then
    echo "No /data/db directory found, creating it..."
    sudo mkdir -p /data/db
    echo "...success"
fi

echo "Setting /data/db permissions to 755"
sudo chmod 0755 /data/db
echo "...success"

echo "Setting ${USER} as owner of /data/db"
sudo chown $USER /data/db
echo "...success"
