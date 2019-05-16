#!/bin/bash

docker build -f location.Dockerfile -t location-app . && docker tag location-app ikopyl/location-app && docker push ikopyl/location-app