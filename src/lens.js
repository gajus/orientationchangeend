var Scream,
    Platform = require('platform');

Scream = function Scream (config) {
    var scream;

    if (!(this instanceof Scream)) {
        return new Scream(config);
    }

    scream = this;

    config = config || {};

    /**
     * 
     * @see http://stackoverflow.com/questions/26827822/how-is-the-window-innerheight-derived-of-the-minimal-view/26827842
     * @see http://stackoverflow.com/questions/26801943/how-to-get-the-window-size-of-fullscream-view-when-not-in-fullscream
     */
    scream.getMinimalViewHeight = function () {
        var portrait = Math.round((scream.getViewportWidth() * 4228) / 2560),
            landscape = scream.getViewportHeight();

        return scream.getOrientation() === 'portrait' ? portrait : landscape;
    };

    /**
     * @return {String} portrait|landscape
     */
    scream.getOrientation = function () {
        return global.orientation === 0 ? 'portrait' : 'landscape';
    };

    /**
     * Screen width relative to the device orientation.
     */
    scream.getScreenWidth = function () {
        return global.screen[scream.getOrientation() === 'portrait' ? 'width' : 'height'];
    };

    /**
     * Screen width relative to the device orientation.
     */
    scream.getScreenHeight = function () {
        return global.screen[scream.getOrientation() === 'portrait' ? 'height' : 'width'];
    };

    /**
     * The ration between screen width and viewport width.
     *
     * @return {Number}
     */
    scream.getScale = function () {
        return scream.getScreenWidth()/scream.getViewportWidth();
    };

    /**
     * 
     */
    scream.updateViewport = function () {
        var oldViewport,
            viewport,
            width,
            scale,
            content;

        width = scream.getViewportWidth();
        scale = scream.getScale();

        content = 
             'width=' + width +
            ', initial-scale=' + scale +
            ', minimum-scale=' + scale +
            ', maximum-scale=' + scale +
            ', user-scalable=0';
        
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = content;

        oldViewport = global.window.document.head.querySelector('meta[name="viewport"]');

        if (oldViewport) {
            oldViewport.parentNode.removeChild(oldViewport);
        }

        global.window.document.head.appendChild(viewport);
    };

    /**
     * Viewport width relative to the device orientation.
     */
    scream.getViewportWidth = function () {
        return config.width[scream.getOrientation()];
    };

    /**
     * Viewport height relative to the device orientation and to scale with the viewport width.
     */
    scream.getViewportHeight = function () {
        return Math.round(scream.getScreenHeight() / scream.getScale());
    };

    /**
     * @return {Object}
     */
    scream.getMinimalViewSize = function () {
        var width = scream.getViewportWidth(),
            height = scream.getMinimalViewHeight();

        return {
            width: width,
            height: height
        };
    };

    /**
     * When checking if view is in minimal state, it is enough to check the height,
     * because the viewport is width based.
     * 
     * @return {Boolean}
     */
    scream.isMinimalView = function () {
        var isMinimalView;

        if (scream.getOrientation() === 'portrait') {
            isMinimalView = global.innerHeight == scream.getMinimalViewSize().height;
        } else {
            // It takes time (about 500ms) until the global.innerHeight is reflected after scream.updateViewport().
            // In the mean time, window.innerHeight is equal to the innerHeight without the effect of scale (, which is eq. to screen.width)
            // This does not seem to affect orientation from landscape to portrait.

            /*
            global.addEventListener('orientationchange', function () {
                setTimeout(function () {
                    console.log( scream.getOrientation(), global.innerHeight );
                }, 500);
            });
            */

            isMinimalView = global.innerHeight === screen.width || global.innerHeight == scream.getMinimalViewSize().height;
        }

        return isMinimalView;
    };

    /*scream._onOrientationChange = (function () {
        var lastOrientation;

        return function () {
            var currentOrientation = scream.getOrientation();

            if (lastOrientation === currentOrientation) {
                return;
            }

            lastOrientation = currentOrientation;

            console.log('_onOrientationChange', lastOrientation);
        };
    } ());

    scream._onOrientationChange();

    global.addEventListener('resize', function () {
        console.log('resize');
        scream._onOrientationChange();
    });

    

*/

    global
        .matchMedia('(orientation: portrait)')
        .addListener(function (m) {
            global.document.body.style.transform = 'scale(1)';

            console.log( 'A', global.innerWidth, global.innerHeight, scream.getOrientation() );

            setInterval(function () {
                console.log('B', global.innerWidth, global.innerHeight, scream.getOrientation());
            });

            /*setTimeout(function () {
                console.log( 'B', global.innerHeight, scream.getOrientation() );
            }, 600);*/
        });
    //global.addEventListener('orientationchange', function () {
    //    console.log('orientationchange');
    //});

    //scream.updateViewport();

    /*(function () {
        var lastOrientation;

        global.addEventListener('resize', function () {
            var currentOrientation = scream.getOrientation();

            if (lastOrientation === currentOrientation) {
                return;
            }

            lastOrientation = currentOrientation;

            console.log( new Date(), 'resize', scream.getOrientation() );

            console.log( 'resize (with scale)', global.innerHeight / scream.getScale() );
            setTimeout(function () {
                console.log( 'resize', global.innerHeight );
            }, 600);
        });
    } ());*/

    /*
    global.addEventListener('orientationchange', function () {
        scream.updateViewport();
        return;

        console.log( new Date(), 'orientationchange', scream.getOrientation() );

        console.log( 'orientationchange', global.innerWidth, global.innerHeight );

        setTimeout(function () {
            console.log( 'orientationchange', global.innerWidth, global.innerHeight );
        }, 600);

        //console.log( new Date() );
        //console.log( 'window.innerHeight', global.innerHeight );
        //console.log( 'scream.getMinimalViewSize().height', scream.getMinimalViewSize().height );
        //console.log( 'scream.isMinimalView()', scream.isMinimalView() );
    });*/
};

global.gajus = global.gajus || {};
global.gajus.Scream = Scream;

module.exports = Scream;