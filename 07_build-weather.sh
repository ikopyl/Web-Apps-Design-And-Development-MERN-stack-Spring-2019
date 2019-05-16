#!/bin/bash

docker build -f weather.Dockerfile -t weather-app . && docker tag weather-app ikopyl/weather-app && docker push ikopyl/weather-app