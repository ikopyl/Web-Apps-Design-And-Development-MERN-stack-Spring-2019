FROM nginx

COPY ./devops/nginx.conf /etc/nginx/nginx.conf
COPY ./client/build /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

EXPOSE 6379
EXPOSE 9000