/**
 * @version 1.0.1
 * @link https://github.com/gajus/orientationchangeend for the canonical source repository
 * @license https://github.com/gajus/orientationchangeend/blob/master/LICENSE BSD 3-Clause
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var orientationchangeend = new CustomEvent('orientationchangeend'),
    noChangeCountEnd = 100;

global
    .addEventListener('orientationchange', function () {
        var interval,
            timeout,
            end,
            lastInnerWidth,
            lastInnerHeight,
            noChangeCount;

        end = function () {
            clearInterval(interval);
            clearTimeout(timeout);

            delete interval;
            delete timeout;

            global.dispatchEvent(orientationchangeend);
        };

        interval = setInterval(function () {
            if (global.innerWidth === lastInnerWidth && global.innerHeight === lastInnerHeight) {
                noChangeCount++;

                if (noChangeCount === noChangeCountEnd) {
                    console.debug('setInterval');

                    end();
                }
            } else {
                lastInnerWidth = global.innerWidth;
                lastInnerHeight = global.innerHeight;
                noChangeCount = 0;
            }
        });
        timeout = setTimeout(function () {
            console.debug('setTimeout');

            end();
        }, 1000);
    });
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])