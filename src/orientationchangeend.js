var Event,
    orientationchangeend = new CustomEvent('orientationchangeend');

Event = function (config) {
    var lastEnd;

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
                    global.dispatchEvent(orientationchangeend);
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