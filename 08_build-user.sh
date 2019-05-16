#!/bin/bash

docker build -f user.Dockerfile -t user-app . && docker tag user-app ikopyl/user-app && docker push ikopyl/user-app