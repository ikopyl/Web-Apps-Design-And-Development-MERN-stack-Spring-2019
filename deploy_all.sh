#!/bin/bash

docker-compose -f devops/docker-compose.yml pull && docker stack deploy -c devops/docker-compose.yml final-project-demo