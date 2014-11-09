# `orientationchangeend`

<!--[![Build Status](https://travis-ci.org/gajus/orientationchangeend.png?branch=master)](https://travis-ci.org/gajus/orientationchangeend)-->
[![NPM version](https://badge.fury.io/js/orientationchangeend.svg)](http://badge.fury.io/js/orientationchangeend)
[![Bower version](https://badge.fury.io/bo/orientationchangeend.svg)](http://badge.fury.io/bo/orientationchangeend)

The `orientationchangeend` event is fired when the orientation of the device has changed and the associated rotation animation has been complete. `orientationchangeend` allows to capture dimensions of the elements in the after rotation change event state.

## The Underlying Implementation

A listener is attached to the `orientationchange`. Invoking the listener starts an interval. The interval is tracking the state of `window.innerWidth` and `window.innerHeight`. The `orientationchangeend` event fire when 100 consequent iterations cannot detect value mutation or after 600ms, whichever happens first.


If both do not change for at least 500 iterations, the `orientationchangeend` event is fired.

If interval mechanism cannot detect a change or the the values continue to mutate, the `orientationchangeend` event is fired 600ms after the occurrence of the `orientationchange` event.

If there is a series of `orientationchange` events fired one after another, where `n` event `orientationchangeend` event has not been fired before the `n+2` `orientationchange`, then `orientationchangeend` will fire only for the last `orientationchange` event in the series.

## Usage

```js
screen.addEventListener('orientationchangeend', function () {
    console.log('The orientation of the device is now ' + screen.orientation);
});
```

## Download

Using [Bower](http://bower.io/):

```sh
bower install orientationchangeend
```

Using [NPM](https://www.npmjs.org/):

```sh
npm install orientationchangeend
```

The old-fashioned way, download either of the following files:

* https://raw.githubusercontent.com/gajus/orientationchangeend/master/dist/orientationchangeend.js
* https://raw.githubusercontent.com/gajus/orientationchangeend/master/dist/orientationchangeend.min.js