#!/bin/bash

docker build -f devops/gateway.Dockerfile -t gateway . && docker tag gateway ikopyl/gateway && docker push ikopyl/gateway