# Voyager-bot

A cam-streaming carbot controlling from a web browser using Nodejs with Raspberry pi and Arduino.

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

#### Install the Arduino IDE

Yo can installed with `yum` or `apt-get`.

```bash
$ yum install arduino
```

#### Install picocom

The `picocom` command line tool will helps us with serial communication.


```bash
$ wget https://picocom.googlecode.com/files/picocom-1.7.tar.gz
$ tar -xvzf picocom-1.7.tar.gz
$ cd picocom-1.7
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

Build the file in `src/sketch.ino`

```bash
$ ino build
```

Upload

```bash
$ ino upload
```

#### Installing the node modules

The Arduino board is ready now to use Nodejs with Jhonny-five. Make sure you have the latest build of `nodejs` and `npm` in the Raspberry pi.

```bash
$ npm install
```
Connect the arduino to the rpi then run:

```bash
$ node app.js
```

You should see this:

![](http://40.media.tumblr.com/e41ff9a259a2eafafe7774530c9debdd/tumblr_nr50tvIen01tp6kj3o1_r1_500.png)


#### Controlling from a web browser

Setup a static http server in `app.js`

```js
app.listen(8000, function () {
    console.log('Http server listening on port %d', 8000);
});
```

That will serve the `index.html` which hold the Socket client.


For handle browser events we use jQuery and keypress in order to detect when a key is pressed then and do a socket emit.

```js
"keys": "up",
"on_keydown": function() {
    console.log("Client: Going forward");
    socket.emit('goForward');
```

The server in listens up

```js
socket.on('goForward', function(){
    console.log("Server: Going forward! ");
    // Do something
});
```

#### Running in a Docker container

Containers are a really good idea for Iot projects because we can isolate our app on a kernel level and that means portability across machines, rapid application deployment,  those are crucial processes for Iot projects.

..
