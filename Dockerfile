FROM lscr.io/linuxserver/code-server:latest

WORKDIR /config/workspace
RUN apt update; apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

RUN git clone https://github.com/huferry/code-smells-exercise.git ./group1
RUN git clone https://github.com/huferry/code-smells-exercise.git ./group2
RUN git clone https://github.com/huferry/code-smells-exercise.git ./group3
RUN git clone https://github.com/huferry/code-smells-exercise.git ./group4
RUN git config --global --add safe.directory /config/workspace/group1
RUN git config --global --add safe.directory /config/workspace/group2
RUN git config --global --add safe.directory /config/workspace/group3
RUN git config --global --add safe.directory /config/workspace/group4
RUN chown -R abc:abc *
RUN chmod -R 474 *

RUN apt install -y nodejs

RUN cd /config/workspace/group1; npm install; npm install ts-node jest
RUN cd /config/workspace/group2; npm install; npm install ts-node jest
RUN cd /config/workspace/group3; npm install; npm install ts-node jest
RUN cd /config/workspace/group4; npm install; npm install ts-node jest
