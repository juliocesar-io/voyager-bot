FROM resin/rpi-raspbian:wheezy
MAINTAINER Julio César <julioc255io@gmail.com>

RUN apt-get update
# Install Node.js (from tarball)
ENV NODE_VERSION 0.12.0
ADD http://assets.hypriot.com/node-v${NODE_VERSION}-linux-armv6hf.tar.gz /
RUN \
  cd /usr/local/ && \
  tar --strip-components 1 -xzf /node-v${NODE_VERSION}-linux-armv6hf.tar.gz && \
  rm -f node-v${NODE_VERSION}-linux-armv6hf.tar.gz

# Install Arduino

RUN apt-get install -y arduino

# Install dependencies

WORKDIR /usr/src/voyager-bot/
COPY . /usr/src/voyager-bot/
RUN npm install
