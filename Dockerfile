FROM resin/rpi-raspbian:jessie
MAINTAINER Julio César <julioc255io@gmail.com>
RUN apt-get update
RUN apt-get install -y wget dialog

# Build latest version of Node.js

RUN wget http://nodejs.org/dist/v0.10.2/node-v0.10.2.tar.gz \
    && tar -xzf node-v0.10.2.tar.gz \
    && cd node-v0.10.2 \
    && ./configure \
    && make \
    && make install

# Install dependencies

WORKDIR /usr/src/voyager-bot/
COPY . /usr/src/voyager-bot/
RUN npm install
