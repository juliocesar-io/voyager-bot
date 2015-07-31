FROM resin/rpi-raspbian:wheezy
MAINTAINER Julio César <julioc255io@gmail.com>

RUN apt-get update
RUN apt-get install -y curl

# Install Nodejs from adafruit
RUN curl -sLS https://apt.adafruit.com/add | sudo bash
RUN apt-get install -y --force-yes node

# Install Arduino
RUN apt-get install -y --force-yes arduino

# Install node modules
WORKDIR /usr/src/voyager-bot/
COPY . /usr/src/voyager-bot/
RUN npm install
