/**
 * @version 1.0.2
 * @link https://github.com/gajus/orientationchangeend for the canonical source repository
 * @license https://github.com/gajus/orientationchangeend/blob/master/LICENSE BSD 3-Clause
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
* @link https://github.com/gajus/sister for the canonical source repository
* @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
*/
function Sister () {
    var sister = {},
        events = {};

    /**
     * @name handler
     * @function
     * @param {Object} data Event data.
     */

    /**
     * @param {String} name Event name.
     * @param {handler} handler
     * @return {listener}
     */
    sister.on = function (name, handler) {
        var listener = {name: name, handler: handler};
        events[name] = events[name] || [];
        events[name].unshift(listener);
        return listener;
    };

    /**
     * @param {listener}
     */
    sister.off = function (listener) {
        var index = events[listener.name].indexOf(listener);

        if (index != -1) {
            events[listener.name].splice(index, 1);
        }
    };

    /**
     * @param {String} name Event name.
     * @param {Object} data Event data.
     */
    sister.trigger = function (name, data) {
        var listeners = events[name],
            i;

        if (listeners) {
            i = listeners.length;
            while (i--) {
                listeners[i].handler(data);
            }
        }
    };

    return sister;
}

global.gajus = global.gajus || {};
global.gajus.Sister = Sister;

module.exports = Sister;
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
var Event,
    Sister = require('sister');

Event = function Event (config) {
    var event,
        lastEnd,
        eventEmitter;

    if (!(this instanceof Event)) {
        return new Event(config);
    }

    eventEmitter = Sister();

    event.on = eventEmitter.on;

    config = config || {};

    /**
     * @var {Number} Number of iterations the subject of interval inspection must not mutate to fire "orientationchangeend".
     */
    config.noChangeCountToEnd = config.noChangeCountToEnd || 100;
    /**
     * @var {Number} Number of milliseconds after which fire the "orientationchangeend" if interval inspection did not do it before.
     */
    config.noEndTimeout = 1000 || config.noEndTimeout;
    /**
     * @var {Boolean} Enables logging of the events.
     */
    config.debug = config.debug || false;

    global
        .addEventListener('orientationchange', function () {
            var interval,
                timeout,
                end,
                lastInnerWidth,
                lastInnerHeight,
                noChangeCount;

            end = function (dispatchEvent) {
                clearInterval(interval);
                clearTimeout(timeout);

                interval = null;
                timeout = null;

                if (dispatchEvent) {
                    eventEmitter.trigger('orientationchangeend');
                }
            };

            // If there is a series of orientationchange events fired one after another,
            // where n event orientationchangeend event has not been fired before the n+2 orientationchange,
            // then orientationchangeend will fire only for the last orientationchange event in the series.
            if (lastEnd) {
                lastEnd(false);
            }

            lastEnd = end;

            interval = setInterval(function () {
                console.log(global.innerWidth, global.innerHeight);
                
                if (global.innerWidth === lastInnerWidth && global.innerHeight === lastInnerHeight) {
                    noChangeCount++;

                    if (noChangeCount === config.noChangeCountToEnd) {
                        if (config.debug) {
                            console.debug('setInterval');
                        }

                        end(true);
                    }
                } else {
                    lastInnerWidth = global.innerWidth;
                    lastInnerHeight = global.innerHeight;
                    noChangeCount = 0;
                }
            });
            timeout = setTimeout(function () {
                if (config.debug) {
                    console.debug('setTimeout');
                }

                end(true);
            }, config.noEndTimeout);
        });
}

global.gajus = global.gajus || {};
global.gajus.orientationchangeend = Event;

module.exports = orientationchangeend;
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"sister":1}]},{},[2])