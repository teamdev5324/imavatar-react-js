FROM 099391646783.dkr.ecr.us-east-1.amazonaws.com/imavatar-partner-web-marketplace:master_img

COPY build/ /app/build/
 
COPY default /etc/nginx/sites-enabled/

#WORKDIR /app/

#RUN npm install -g yarn 

#RUN yarn install

#RUN yarn build

EXPOSE 8095

#now start the server

CMD ["/bin/bash", "-c", "nginx -g 'daemon off;'"]