FROM node:latest
MAINTAINER malaohu <malaohu@live.com>

RUN apt-get clean all
RUN apt-get update
RUN apt-get -y install git
RUN git clone https://github.com/malaohu/forsaken-mail.git /forsaken-mail

WORKDIR /forsaken-mail

RUN npm install

EXPOSE 25
EXPOSE 3000
CMD npm start
