# Voyager-bot

A cam-streaming carbot controlling from a web browser using socket.io & J5

## Hardware

- Raspberry pi
    - Camera board
    - Usb Wifi dongle
- Arduino
    - DC Motors
    - H bridge
    - Sensors

## Software dependencies

- Firmata (Arduino)
- Nodejs
    - Jhonny-five
    - Socket.io


## Getting started


The first thing we need to do is flash an Arduino board with the Firmata protocol. For this "experiment" we use a modified sketch for the Firmata that's woks well with proximity sensors and servo.

In `src/sketch.ino` is the file ready for upload to the board. To archive this yo can use the `ino` command line tool.

Install the `Arduino IDE distribution`

```bash
$ yum install arduino
```

Download the source code for `picocom` which helps with serial communication.

Get the [picocom repo ](https://code.google.com/p/picocom/downloads/list) extract it and:

```bash
$ sudo make
$ sudo make install

```

Once you installed all the dependencies above, install `ino` using `pip` or `easy_install`


```bash
$ pip install ino
```

#### Setting up your board

Edit the file `ino.ini` with the specs of your board and the serial port.

```yaml
[build]
board-model = mega2560

[upload]
board-model = mega2560
serial-port = /dev/ttyACM0

[serial]
serial-port = /dev/ttyACM0

```

#### Installing the Firmata protocol
