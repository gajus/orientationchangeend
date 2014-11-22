<!--
This file has been generated using GitDown (https://github.com/gajus/gitdown).
Direct edits to this will be be overwritten. Look for GitDown markup file under ./.gitdown/ path.
-->
<h1 id="orientationchangeend">orientationchangeend</h1>

[![NPM version](http://img.shields.io/npm/v/orientationchangeend.svg?style=flat)](https://www.npmjs.org/package/orientationchangeend)
[![Bower version](http://img.shields.io/bower/v/orientationchangeend.svg?style=flat)](http://bower.io/search/?q=orientationchangeend)

The `orientationchangeend` event is fired when the orientation of the device has changed and the associated rotation animation has been complete.

<h2 id="orientationchangeend-the-issue">The Issue</h2>

> `orientationchange` event is fired when the orientation of the device has changed.

– https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange

This definition neglects to mention that the event is fired after `window.orientation` property has changed, but before the orientation is reflected in the UI. Inspecting dimensions of elements (e.g. `window.innerWidth` or `window.innerHeight`) gives the dimensions of the elements in the pre-orientation change state.

`orientationchangeend` is triggered at the end of the screen rotation animation that follows the orientation change event.

This has been developed for use with the mobile Safari, though the nature of the implementation makes it safe to use with other vendors.

<h2 id="orientationchangeend-the-underlying-implementation">The Underlying Implementation</h2>

There is no way to capture the end of the orientation change event because handling of the orientation change varies from browser to browser. Drawing a balance between the most reliable and the fastest way to detect the end of orientation change requires racing interval and timeout.

A listener is attached to the `orientationchange`. Invoking the listener starts an interval. The interval is tracking the state of the [Rotation Indication Variable](#rotation-indication-variable). The `orientationchangeend` event is fired when `config.noChangeCountToEnd` number of consequent iterations do not detect a value mutation or after `config.noEndTimeout` milliseconds, whichever happens first.

If you have suggestions for better strategy to detect the end of the `orientationchange` event, please [raise an issue](https://github.com/gajus/orientationchangeend/issues).

<h2 id="orientationchangeend-rotation-indication-variable">Rotation Indication Variable</h2>

The variable used to track the state of the rotation is a collection of `window.innerWidth` and `window.innerHeight`. This is a workaround until the [Screen Orientation API](http://www.w3.org/TR/screen-orientation/) becomes available in the iOS.

I realize that this is not a bullet-proof implementation. If you have suggestions for better variables to track the state of the rotation, please contribute to the [Stack Overflow question](http://stackoverflow.com/questions/26829517/how-to-detect-the-state-of-the-screen-rotation) or [raise an issue](https://github.com/gajus/orientationchangeend/issues).

<h3 id="orientationchangeend-rotation-indication-variable-series-of-events">Series of Events</h3>

If there is a series of `orientationchange` events fired one after another, where `n` event `orientationchangeend` event has not been fired before the `n+2` `orientationchange`, then `orientationchangeend` will fire only for the last `orientationchange` event in the series.

<h2 id="orientationchangeend-usage">Usage</h2>

```js
var config = {},
    OCE;

// Start tracking the orientation change.
OCE = gajus.orientationchangeend(config);

// Attach event listener to the "orientationchangeend" event.
OCE.on('orientationchangeend', function () {
    // The orientation have changed.
});
```

<h3 id="orientationchangeend-usage-configuration">Configuration</h3>

| Name | Value | Default |
| --- | --- | --- |
| `noChangeCountToEnd` | Number of iterations the subject of interval inspection must not mutate to fire `orientationchangeend`. | `100` |
| `noEndTimeout` | Number of milliseconds after which fire the `orientationchangeend` if interval inspection did not do it before. | `1000` |
| `debug` | Enables logging of the events | `false` |

All of the configuration parameters are optional.

<h3 id="orientationchangeend-usage-dom-events">DOM Events</h3>

I did not make the event available to the `window` to avoid polluting the global scope and possible future conflicts.

To make the `orientationchangeend` event available to the `window`, re-emit the event using a [custom event](https://developer.mozilla.org/en/docs/Web/API/CustomEvent):

```js
var orientationchangeend;

// Make sure that you are not adding event emitter more than once.
if ('onorientationchangeend' in window) {
    orientationchangeend = new CustomEvent('orientationchangeend');

    window.onorientationchangeend = OCE.on('orientationchangeend', function () {
        window.dispatchEvent(orientationchangeend);
    });    
}

// Attach a listener to the "orientationchangeend" event.
window.addEventListener('orientationchangeend', function () {
    console.log('The orientation of the device is now ' + window.orientation);
});
```

<h2 id="orientationchangeend-download">Download</h2>

Using [Bower](http://bower.io/):

```sh
bower install orientationchangeend
```

Using [NPM](https://www.npmjs.org/):

```sh
npm install orientationchangeend
```