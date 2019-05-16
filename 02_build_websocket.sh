#!/bin/bash

docker build -f devops/websocket.Dockerfile -t websocket-app . && docker tag websocket-app ikopyl/websocket-app && docker push ikopyl/websocket-app