FROM resin/rpi-raspbian:wheezy
MAINTAINER Julio César <julioc255io@gmail.com>

# Install nodejs from adafruit
RUN apt-get update \
    && curl -sLS https://apt.adafruit.com/add | sudo bash \
    && apt-get install -y node \

# Install arduino
RUN apt-get install -y arduino
