# `orientationchangeend`

<!--[![Build Status](https://travis-ci.org/gajus/orientationchangeend.png?branch=master)](https://travis-ci.org/gajus/orientationchangeend)-->
[![NPM version](https://badge.fury.io/js/orientationchangeend.svg)](http://badge.fury.io/js/orientationchangeend)
[![Bower version](https://badge.fury.io/bo/orientationchangeend.svg)](http://badge.fury.io/bo/orientationchangeend)

The `orientationchangeend` event is fired when the orientation of the device has changed and the associated rotation animation has been complete. `orientationchangeend` enables you to [capture dimensions](http://stackoverflow.com/questions/12452349/mobile-viewport-height-after-orientation-change) of the element in the state after the rotation change.

## The Underlying Implementation

There is no way to capture the end of the orientation change event because handling of the orientation change varies from browser to browser. Drawing a balance between the most reliable and the fastest way to detect the end of orientation change requires racing interval and timeout.

A listener is attached to the `orientationchange`. Invoking the listener starts an interval. The interval is tracking the state of `window.innerWidth` and `window.innerHeight`. The `orientationchangeend` event is fired when `config.noChangeCountToEnd` number of consequent iterations do not detect a value mutation or after `config.noEndTimeout` milliseconds, whichever happens first.

If there is a series of `orientationchange` events fired one after another, where `n` event `orientationchangeend` event has not been fired before the `n+2` `orientationchange`, then `orientationchangeend` will fire only for the last `orientationchange` event in the series.

## Usage

```js
var config = {},
    OCE;

/**
 * Start tracking the orientation change.
 */
OCE = gajus.orientationchangeend(config);

OCE.on('orientationchangeend', function () {
    // The orientation have changed.
});
```

To make the `orientationchangeend` event available to the `window`, re-emit the event using a [custom event](https://developer.mozilla.org/en/docs/Web/API/CustomEvent):

```
var orientationchangeend;

if ('onorientationchangeend' in window) {
    window.onorientationchangeend = true;

    orientationchangeend = = new CustomEvent('orientationchangeend');

    eventEmitter.on('orientationchangeend', function () {
        window.dispatchEvent(orientationchangeend);
    })
}

// Attach a listener to the "orientationchangeend" event.
window.addEventListener('orientationchangeend', function () {
    console.log('The orientation of the device is now ' + screen.orientation);
});
```

## Configuration

| Name | Value | Default |
| --- | --- | --- |
| `noChangeCountToEnd` | Number of iterations the subject of interval inspection must not mutate to fire `orientationchangeend`. | `100` |
| `noEndTimeout` | Number of milliseconds after which fire the `orientationchangeend` if interval inspection did not do it before. | `1000` |
| `debug` | Enables logging of the events | `false` |

All of the configuration parameters are optional.

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