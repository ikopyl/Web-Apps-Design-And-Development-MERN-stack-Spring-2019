#!/bin/bash

docker build -f devops/frontend.Dockerfile -t react-frontend . && docker tag react-frontend ikopyl/react-frontend && docker push ikopyl/react-frontend