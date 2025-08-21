#!/bin/bash
git pull
npm run update
sudo rm -rf /var/www/html.bak/*
sudo mv /var/www/html/* /var/www/html.bak/
sudo cp -r ./public/* /var/www/html/