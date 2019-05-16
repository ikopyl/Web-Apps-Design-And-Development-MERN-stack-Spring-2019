#!/bin/bash

docker build -f devops/lookupmusicband.Dockerfile -t lookupmusicband-app . && docker tag lookupmusicband-app ikopyl/lookupmusicband-app && docker push ikopyl/lookupmusicband-app