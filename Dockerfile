FROM resin/rpi-raspbian:wheezy
MAINTAINER Julio César <julioc255io@gmail.com>

RUN apt-get update
RUN apt-get install -y curl
# Install nodejs from adafruit
RUN curl -sLS https://apt.adafruit.com/add | sudo bash
RUN apt-get install -y node

# Install arduino
RUN apt-get install -y arduino
