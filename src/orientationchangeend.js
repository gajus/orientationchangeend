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