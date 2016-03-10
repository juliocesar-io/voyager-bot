Objetivos
=============


General
-------

- Documentar el desarrollo un sistema ubicuo utilizando micro-controladores que pueda ser controlado a través de una interfaz HTTP con fines educativos.

Especificos
-----------

- Prototipar hardware utilizando Arduino que permita comunicación serial en tiempo real utilizando el protocolo firmata y lectura de sensores.

- Codificar una aplicación que reciba peticiones HTTPvia web socket y las transforme a señales digitales utilizando Nodejs con la libreria Jhonny five.

- Desplegar la aplicación en un container de Linux(LXC) compatible con ARM utilizando Docker bajo una Raspberry pi B+ 2 que permita comunicación serial con un Arduino e integre periféricos.
 
- Diseñar una interfaz web que capte los eventos del navegador para controlar el robot y presente información en streaming de sensores y/o periféricos.
