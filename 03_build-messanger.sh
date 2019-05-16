#!/bin/bash

docker build -f devops/messanger.Dockerfile -t messanger-app . && docker tag messanger-app ikopyl/messanger-app && docker push ikopyl/messanger-app