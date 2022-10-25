FROM lscr.io/linuxserver/code-server:latest

WORKDIR /repos/group1
RUN apt update; apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

COPY . ./
RUN chmod 777 /repos/* -R
RUN apt install -y nodejs
RUN npm install
RUN npm install ts-node jest

RUN cp -r /repos/group1/ /repos/group2
RUN cp -r /repos/group1/ /repos/group3
RUN cp -r /repos/group1/ /repos/group4

