/*!
 * @file ScrollMagic GSAP Animation Plugin.
 *
 * requires: GSAP ~1.14
 * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
 * Greensock License info at http://www.greensock.com/licensing/
 */
/**
 * This plugin is meant to be used in conjunction with the Greensock Animation Plattform.  
 * It offers an easy API to trigger Tweens or synchronize them to the scrollbar movement.
 *
 * Both the `lite` and the `max` versions of the GSAP library are supported.  
 * The most basic requirement is `TweenLite`.
 * 
 * To have access to this extension, please include `plugins/animation.gsap.js`.
 * @requires {@link http://greensock.com/gsap|GSAP ~1.14.x}
 * @mixin animation.GSAP
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['ScrollMagic', 'TweenMax', 'TimelineMax'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        // Loads whole gsap package onto global scope.
        require('gsap');
        factory(require('scrollmagic'), TweenMax, TimelineMax);
    } else {
        // Browser globals
        factory(root.ScrollMagic || (root.jQuery && root.jQuery.ScrollMagic), root.TweenMax || root.TweenLite, root.TimelineMax || root.TimelineLite);
    }
}(this, function(ScrollMagic, Tween, Timeline) {
    "use strict";
    var NAMESPACE = "animation.gsap";

    // (BUILD) - REMOVE IN MINIFY - START
    var
        console = window.console || {},
        err = Function.prototype.bind.call(console.error || console.log || function() {}, console);
    if (!ScrollMagic) {
        err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
    }
    if (!Tween) {
        err("(" + NAMESPACE + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.");
    }
    // (BUILD) - REMOVE IN MINIFY - END
    
    /*
     * ----------------------------------------------------------------
     * Extensions for Scene
     * ----------------------------------------------------------------
     */
    /**
     * Every instance of ScrollMagic.Scene now accepts an additional option.  
     * See {@link ScrollMagic.Scene} for a complete list of the standard options.
     * @memberof! animation.GSAP#
     * @method new ScrollMagic.Scene(options)
     * @example
     * var scene = new ScrollMagic.Scene({tweenChanges: true});
     *
     * @param {object} [options] - Options for the Scene. The options can be updated at any time.
     * @param {boolean} [options.tweenChanges=false] - Tweens Animation to the progress target instead of setting it.  
                                                      Does not affect animations where duration is `0`.
     */
    /**
     * **Get** or **Set** the tweenChanges option value.  
     * This only affects scenes with a duration. If `tweenChanges` is `true`, the progress update when scrolling will not be immediate, but instead the animation will smoothly animate to the target state.  
     * For a better understanding, try enabling and disabling this option in the [Scene Manipulation Example](../examples/basic/scene_manipulation.html).
     * @memberof! animation.GSAP#
     * @method Scene.tweenChanges
     * 
     * @example
     * // get the current tweenChanges option
     * var tweenChanges = scene.tweenChanges();
     *
     * // set new tweenChanges option
     * scene.tweenChanges(true);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {boolean} [newTweenChanges] - The new tweenChanges setting of the scene.
     * @returns {boolean} `get` -  Current tweenChanges option value.
     * @returns {Scene} `set` -  Parent object for chaining.
     */
    // add option (TODO: DOC (private for dev))
    ScrollMagic.Scene.addOption(
        "tweenChanges", // name
        false, // default
        function (val) { // validation callback
            return !!val;
        }
    );
    // extend scene
    ScrollMagic.Scene.extend(function () {
        var Scene = this,
        _tween;

        // (BUILD) - REMOVE IN MINIFY - START
        var log = function () {
            if (Scene._log) { // not available, when main source minified
                Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");
                Scene._log.apply(this, arguments);
            }
        };
        // (BUILD) - REMOVE IN MINIFY - END

        // set listeners
        Scene.on("progress.plugin_gsap", function () {
            updateTweenProgress();
        });
        Scene.on("destroy.plugin_gsap", function (e) {
            Scene.removeTween(e.reset);
        });

        /**
         * Update the tween progress to current position.
         * @private
         */
        var updateTweenProgress = function () {
            if (_tween) {
                var
                    progress = Scene.progress(),
                    state = Scene.state();
                if (_tween.repeat && _tween.repeat() === -1) {
                    // infinite loop, so not in relation to progress
                    if (state === 'DURING' && _tween.paused()) {
                        _tween.play();
                    } else if (state !== 'DURING' && !_tween.paused()) {
                        _tween.pause();
                    }
                } else if (progress != _tween.progress()) { // do we even need to update the progress?
                    // no infinite loop - so should we just play or go to a specific point in time?
                    if (Scene.duration() === 0) {
                        // play the animation
                        if (progress > 0) { // play from 0 to 1
                            _tween.play();
                        } else { // play from 1 to 0
                            _tween.reverse();
                        }
                    } else {
                        // go to a specific point in time
                        if (Scene.tweenChanges() && _tween.tweenTo) {
                            // go smooth
                            _tween.tweenTo(progress * _tween.duration());
                        } else {
                            // just hard set it
                            _tween.progress(progress).pause();
                        }
                    }
                }
            }
        };

        /**
         * Add a tween to the scene.  
         * If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).  
         * 
         * If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.  
         * For a scene with a duration of `0`, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.  
         * To gain better understanding, check out the [Simple Tweening example](../examples/basic/simple_tweening.html).
         *
         * Instead of supplying a tween this method can also be used as a shorthand for `TweenMax.to()` (see example below).
         * @memberof! animation.GSAP#
         *
         * @example
         * // add a single tween directly
         * scene.setTween(TweenMax.to("obj"), 1, {x: 100});
         *
         * // add a single tween via variable
         * var tween = TweenMax.to("obj"), 1, {x: 100};
         * scene.setTween(tween);
         *
         * // add multiple tweens, wrapped in a timeline.
         * var timeline = new TimelineMax();
         * var tween1 = TweenMax.from("obj1", 1, {x: 100});
         * var tween2 = TweenMax.to("obj2", 1, {y: 100});
         * timeline
         *      .add(tween1)
         *      .add(tween2);
         * scene.addTween(timeline);
         *
         * // short hand to add a TweenMax.to() tween
         * scene.setTween("obj3", 0.5, {y: 100});
         *
         * // short hand to add a TweenMax.to() tween for 1 second
         * // this is useful, when the scene has a duration and the tween duration isn't important anyway
         * scene.setTween("obj3", {y: 100});
         *
         * @param {(object|string)} TweenObject - A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
         * @param {(number|object)} duration - A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
         * @param {object} params - The parameters for the tween
         * @returns {Scene} Parent object for chaining.
         */
        Scene.setTween = function (TweenObject, duration, params) {
            var newTween;
            if (arguments.length > 1) {
                if ( arguments.length < 3) {
                    params = duration;
                    duration = 1;
                }
                TweenObject = Tween.to(TweenObject, duration, params);
            }
            try {
                // wrap Tween into a Timeline Object if available to include delay and repeats in the duration and standardize methods.
                if (Timeline) {
                    newTween = new Timeline({smoothChildTiming: true})
                        .add(TweenObject);
                } else {
                    newTween = TweenObject;
                }
                newTween.pause();
            } catch (e) {
                log(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject");
                return Scene;
            }
            if (_tween) { // kill old tween?
                Scene.removeTween();
            }
            _tween = newTween;

            // some properties need to be transferred it to the wrapper, otherwise they would get lost.
            if (TweenObject.repeat && TweenObject.repeat() === -1) {// TweenMax or TimelineMax Object?
                _tween.repeat(-1);
                _tween.yoyo(TweenObject.yoyo());
            }
            // (BUILD) - REMOVE IN MINIFY - START
            // Some tween validations and debugging helpers

            if (Scene.tweenChanges() && !_tween.tweenTo) {
                log(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.");
            }

            // check if there are position tweens defined for the trigger and warn about it :)
            if (_tween && Scene.controller()  && Scene.triggerElement() && Scene.loglevel() >= 2) {// controller is needed to know scroll direction.
                var
                    triggerTweens = Tween.getTweensOf(Scene.triggerElement()),
                    vertical = Scene.controller().info("vertical");
                triggerTweens.forEach(function (value, index) {
                    var
                        tweenvars = value.vars.css || value.vars,
                        condition = vertical ? (tweenvars.top !== undefined || tweenvars.bottom !== undefined) : (tweenvars.left !== undefined || tweenvars.right !== undefined);
                    if (condition) {
                        log(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!");
                        return false;
                    }
                });
            }

            // warn about tween overwrites, when an element is tweened multiple times
            if (parseFloat(TweenLite.version) >= 1.14) { // onOverwrite only present since GSAP v1.14.0
                var
                    list = _tween.getChildren ? _tween.getChildren(true, true, false) : [_tween], // get all nested tween objects
                    newCallback = function () {
                        log(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
                    };
                for (var i=0, thisTween, oldCallback; i<list.length; i++) {
                    /*jshint loopfunc: true */
                    thisTween = list[i];
                    if (oldCallback !== newCallback) { // if tweens is added more than once
                        oldCallback = thisTween.vars.onOverwrite;
                        thisTween.vars.onOverwrite = function () {
                            if (oldCallback) {
                                oldCallback.apply(this, arguments);
                            }
                            newCallback.apply(this, arguments);
                        };
                    }
                }
            }
            // (BUILD) - REMOVE IN MINIFY - END
            log(3, "added tween");

            updateTweenProgress();
            return Scene;
        };

        /**
         * Remove the tween from the scene.  
         * This will terminate the control of the Scene over the tween.
         *
         * Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
         * @memberof! animation.GSAP#
         *
         * @example
         * // remove the tween from the scene without resetting it
         * scene.removeTween();
         *
         * // remove the tween from the scene and reset it to initial position
         * scene.removeTween(true);
         *
         * @param {boolean} [reset=false] - If `true` the tween will be reset to its initial values.
         * @returns {Scene} Parent object for chaining.
         */
        Scene.removeTween = function (reset) {
            if (_tween) {
                if (reset) {
                    _tween.progress(0).pause();
                }
                _tween.kill();
                _tween = undefined;
                log(3, "removed tween (reset: " + (reset ? "true" : "false") + ")");
            }
            return Scene;
        };

    });
}));




/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {

    "use strict";

    _gsScope._gsDefine("easing.CustomEase", ["easing.Ease"], function(Ease) {

        var _numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
            _svgPathExp = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
            _scientific = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,
            _needsParsingExp = /[cLlsS]/g,
            _bezierError = "CustomEase only accepts Cubic Bezier data.",
            _bezierToPoints = function (x1, y1, x2, y2, x3, y3, x4, y4, threshold, points, index) {
                var x12 = (x1 + x2) / 2,
                    y12 = (y1 + y2) / 2,
                    x23 = (x2 + x3) / 2,
                    y23 = (y2 + y3) / 2,
                    x34 = (x3 + x4) / 2,
                    y34 = (y3 + y4) / 2,
                    x123 = (x12 + x23) / 2,
                    y123 = (y12 + y23) / 2,
                    x234 = (x23 + x34) / 2,
                    y234 = (y23 + y34) / 2,
                    x1234 = (x123 + x234) / 2,
                    y1234 = (y123 + y234) / 2,
                    dx = x4 - x1,
                    dy = y4 - y1,
                    d2 = Math.abs((x2 - x4) * dy - (y2 - y4) * dx),
                    d3 = Math.abs((x3 - x4) * dy - (y3 - y4) * dx),
                    length;
                if (!points) {
                    points = [{x: x1, y: y1}, {x: x4, y: y4}];
                    index = 1;
                }
                points.splice(index || points.length - 1, 0, {x: x1234, y: y1234});
                if ((d2 + d3) * (d2 + d3) > threshold * (dx * dx + dy * dy)) {
                    length = points.length;
                    _bezierToPoints(x1, y1, x12, y12, x123, y123, x1234, y1234, threshold, points, index);
                    _bezierToPoints(x1234, y1234, x234, y234, x34, y34, x4, y4, threshold, points, index + 1 + (points.length - length));
                }
                return points;
            },

            _pathDataToBezier = function (d) {
                var a = (d + "").replace(_scientific, function (m) {
                            var n = +m;
                            return (n < 0.0001 && n > -0.0001) ? 0 : n;
                        }).match(_svgPathExp) || [], //some authoring programs spit out very small numbers in scientific notation like "1e-5", so make sure we round that down to 0 first.
                    path = [],
                    relativeX = 0,
                    relativeY = 0,
                    elements = a.length,
                    l = 2,
                    i, x, y, command, isRelative, segment, startX, startY, prevCommand, difX, difY;
                for (i = 0; i < elements; i++) {
                    prevCommand = command;
                    if (isNaN(a[i])) {
                        command = a[i].toUpperCase();
                        isRelative = (command !== a[i]); //lower case means relative
                    } else { //commands like "C" can be strung together without any new command characters between.
                        i--;
                    }
                    x = +a[i + 1];
                    y = +a[i + 2];
                    if (isRelative) {
                        x += relativeX;
                        y += relativeY;
                    }
                    if (!i) {
                        startX = x;
                        startY = y;
                    }
                    if (command === "M") {
                        if (segment && segment.length < 8) { //if the path data was funky and just had a M with no actual drawing anywhere, skip it.
                            path.length -= 1;
                            l = 0;
                        }
                        relativeX = startX = x;
                        relativeY = startY = y;
                        segment = [x, y];
                        l = 2;
                        path.push(segment);
                        i += 2;
                        command = "L"; //an "M" with more than 2 values gets interpreted as "lineTo" commands ("L").

                    } else if (command === "C") {
                        if (!segment) {
                            segment = [0, 0];
                        }
                        segment[l++] = x;
                        segment[l++] = y;
                        if (!isRelative) {
                            relativeX = relativeY = 0;
                        }
                        segment[l++] = relativeX + a[i + 3] * 1; //note: "*1" is just a fast/short way to cast the value as a Number. WAAAY faster in Chrome, slightly slower in Firefox.
                        segment[l++] = relativeY + a[i + 4] * 1;
                        segment[l++] = relativeX = relativeX + a[i + 5] * 1;
                        segment[l++] = relativeY = relativeY + a[i + 6] * 1;
                        i += 6;

                    } else if (command === "S") {
                        if (prevCommand === "C" || prevCommand === "S") {
                            difX = relativeX - segment[l - 4];
                            difY = relativeY - segment[l - 3];
                            segment[l++] = relativeX + difX;
                            segment[l++] = relativeY + difY;
                        } else {
                            segment[l++] = relativeX;
                            segment[l++] = relativeY;
                        }
                        segment[l++] = x;
                        segment[l++] = y;
                        if (!isRelative) {
                            relativeX = relativeY = 0;
                        }
                        segment[l++] = relativeX = relativeX + a[i + 3] * 1;
                        segment[l++] = relativeY = relativeY + a[i + 4] * 1;
                        i += 4;

                    } else if (command === "L" || command === "Z") {
                        if (command === "Z") {
                            x = startX;
                            y = startY;
                            segment.closed = true;
                        }
                        if (command === "L" || Math.abs(relativeX - x) > 0.5 || Math.abs(relativeY - y) > 0.5) {
                            segment[l++] = relativeX + (x - relativeX) / 3;
                            segment[l++] = relativeY + (y - relativeY) / 3;
                            segment[l++] = relativeX + (x - relativeX) * 2 / 3;
                            segment[l++] = relativeY + (y - relativeY) * 2 / 3;
                            segment[l++] = x;
                            segment[l++] = y;
                            if (command === "L") {
                                i += 2;
                            }
                        }
                        relativeX = x;
                        relativeY = y;
                    } else {
                        throw _bezierError;
                    }

                }
                return path[0];
            },

            _findMinimum = function (values) {
                var l = values.length,
                    min = 999999999999,
                    i;
                for (i = 1; i < l; i += 6) {
                    if (+values[i] < min) {
                        min = +values[i];
                    }
                }
                return min;
            },

            _normalize = function (values, height, originY) { //takes all the points and translates/scales them so that the x starts at 0 and ends at 1.
                if (!originY && originY !== 0) {
                    originY = Math.max(+values[values.length-1], +values[1]);
                }
                var tx = +values[0] * -1,
                    ty = -originY,
                    l = values.length,
                    sx = 1 / (+values[l - 2] + tx),
                    sy = -height || ((Math.abs(+values[l - 1] - +values[1]) < 0.01 * (+values[l - 2] - +values[0])) ? _findMinimum(values) + ty : +values[l - 1] + ty),
                    i;
                if (sy) { //typically y ends at 1 (so that the end values are reached)
                    sy = 1 / sy;
                } else { //in case the ease returns to its beginning value, scale everything proportionally
                    sy = -sx;
                }
                for (i = 0; i < l; i += 2) {
                    values[i] = (+values[i] + tx) * sx;
                    values[i + 1] = (+values[i + 1] + ty) * sy;
                }
            },

            _getRatio = function (p) {
                var point = this.lookup[(p * this.l) | 0] || this.lookup[this.l - 1];
                if (point.nx < p) {
                    point = point.n;
                }
                return point.y + ((p - point.x) / point.cx) * point.cy;
            },


            CustomEase = function (id, data, config) {
                this._calcEnd = true;
                this.id = id;
                if (id) {
                    Ease.map[id] = this;
                }
                this.getRatio = _getRatio; //speed optimization, faster lookups.
                this.setData(data, config);
            },
            p = CustomEase.prototype = new Ease();

        p.constructor = CustomEase;

        p.setData = function(data, config) {
            data = data || "0,0,1,1";
            var values = data.match(_numbersExp),
                closest = 1,
                points = [],
                l, a1, a2, i, inc, j, point, prevPoint, p, precision;
            config = config || {};
            precision = config.precision || 1;
            this.data = data;
            this.lookup = [];
            this.points = points;
            this.fast = (precision <= 1);
            if (_needsParsingExp.test(data) || (data.indexOf("M") !== -1 && data.indexOf("C") === -1)) {
                values = _pathDataToBezier(data);
            }
            l = values.length;
            if (l === 4) {
                values.unshift(0, 0);
                values.push(1, 1);
                l = 8;
            } else if ((l - 2) % 6) {
                throw _bezierError;
            }
            if (+values[0] !== 0 || +values[l - 2] !== 1) {
                _normalize(values, config.height, config.originY);
            }

            this.rawBezier = values;

            for (i = 2; i < l; i += 6) {
                a1 = {x: +values[i - 2], y: +values[i - 1]};
                a2 = {x: +values[i + 4], y: +values[i + 5]};
                points.push(a1, a2);
                _bezierToPoints(a1.x, a1.y, +values[i], +values[i + 1], +values[i + 2], +values[i + 3], a2.x, a2.y, 1 / (precision * 200000), points, points.length - 1);
            }
            l = points.length;
            for (i = 0; i < l; i++) {
                point = points[i];
                prevPoint = points[i - 1] || point;
                if (point.x > prevPoint.x || (prevPoint.y !== point.y && prevPoint.x === point.x) || point === prevPoint) { //if a point goes BACKWARD in time or is a duplicate, just drop it.
                    prevPoint.cx = point.x - prevPoint.x; //change in x between this point and the next point (performance optimization)
                    prevPoint.cy = point.y - prevPoint.y;
                    prevPoint.n = point;
                    prevPoint.nx = point.x; //next point's x value (performance optimization, making lookups faster in getRatio()). Remember, the lookup will always land on a spot where it's either this point or the very next one (never beyond that)
                    if (this.fast && i > 1 && Math.abs(prevPoint.cy / prevPoint.cx - points[i - 2].cy / points[i - 2].cx) > 2) { //if there's a sudden change in direction, prioritize accuracy over speed. Like a bounce ease - you don't want to risk the sampling chunks landing on each side of the bounce anchor and having it clipped off.
                        this.fast = false;
                    }
                    if (prevPoint.cx < closest) {
                        if (!prevPoint.cx) {
                            prevPoint.cx = 0.001; //avoids math problems in getRatio() (dividing by zero)
                            if (i === l - 1) { //in case the final segment goes vertical RIGHT at the end, make sure we end at the end.
                                prevPoint.x -= 0.001;
                                closest = Math.min(closest, 0.001);
                                this.fast = false;
                            }
                        } else {
                            closest = prevPoint.cx;
                        }
                    }
                } else {
                    points.splice(i--, 1);
                    l--;
                }
            }
            l = (1 / closest + 1) | 0;
            this.l = l; //record for speed optimization
            inc = 1 / l;
            j = 0;
            point = points[0];
            if (this.fast) {
                for (i = 0; i < l; i++) { //for fastest lookups, we just sample along the path at equal x (time) distance. Uses more memory and is slightly less accurate for anchors that don't land on the sampling points, but for the vast majority of eases it's excellent (and fast).
                    p = i * inc;
                    if (point.nx < p) {
                        point = points[++j];
                    }
                    a1 = point.y + ((p - point.x) / point.cx) * point.cy;
                    this.lookup[i] = {x: p, cx: inc, y: a1, cy: 0, nx: 9};
                    if (i) {
                        this.lookup[i - 1].cy = a1 - this.lookup[i - 1].y;
                    }
                }
                this.lookup[l - 1].cy = points[points.length - 1].y - a1;
            } else { //this option is more accurate, ensuring that EVERY anchor is hit perfectly. Clipping across a bounce, for example, would never happen.
                for (i = 0; i < l; i++) { //build a lookup table based on the smallest distance so that we can instantly find the appropriate point (well, it'll either be that point or the very next one). We'll look up based on the linear progress. So it's it's 0.5 and the lookup table has 100 elements, it'd be like lookup[Math.floor(0.5 * 100)]
                    if (point.nx < i * inc) {
                        point = points[++j];
                    }
                    this.lookup[i] = point;
                }

                if (j < points.length - 1) {
                    this.lookup[i-1] = points[points.length-2];
                }
            }
            this._calcEnd = (points[points.length-1].y !== 1 || points[0].y !== 0); //ensures that we don't run into floating point errors. As long as we're starting at 0 and ending at 1, tell GSAP to skip the final calculation and use 0/1 as the factor.
            return this;
        };

        p.getRatio = _getRatio;

        p.getSVGData = function(config) {
            return CustomEase.getSVGData(this, config);
        };

        CustomEase.create = function (id, data, config) {
            return new CustomEase(id, data, config);
        };

        CustomEase.version = "0.2.2";

        CustomEase.bezierToPoints = _bezierToPoints;
        CustomEase.get = function (id) {
            return Ease.map[id];
        };
        CustomEase.getSVGData = function(ease, config) {
            config = config || {};
            var rnd = 1000,
                width = config.width || 100,
                height = config.height || 100,
                x = config.x || 0,
                y = (config.y || 0) + height,
                e = config.path,
                a, slope, i, inc, tx, ty, precision, threshold, prevX, prevY;
            if (config.invert) {
                height = -height;
                y = 0;
            }
            ease = ease.getRatio ? ease : Ease.map[ease] || console.log("No ease found: ", ease);
            if (!ease.rawBezier) {
                a = ["M" + x + "," + y];
                precision = Math.max(5, (config.precision || 1) * 200);
                inc = 1 / precision;
                precision += 2;
                threshold = 5 / precision;
                prevX = (((x + inc * width) * rnd) | 0) / rnd;
                prevY = (((y + ease.getRatio(inc) * -height) * rnd) | 0) / rnd;
                slope = (prevY - y) / (prevX - x);
                for (i = 2; i < precision; i++) {
                    tx = (((x + i * inc * width) * rnd) | 0) / rnd;
                    ty = (((y + ease.getRatio(i * inc) * -height) * rnd) | 0) / rnd;
                    if (Math.abs((ty - prevY) / (tx - prevX) - slope) > threshold || i === precision - 1) { //only add points when the slope changes beyond the threshold
                        a.push(prevX + "," + prevY);
                        slope = (ty - prevY) / (tx - prevX);
                    }
                    prevX = tx;
                    prevY = ty;
                }
            } else {
                a = [];
                precision = ease.rawBezier.length;
                for (i = 0; i < precision; i += 2) {
                    a.push((((x + ease.rawBezier[i] * width) * rnd) | 0) / rnd + "," + (((y + ease.rawBezier[i + 1] * -height) * rnd) | 0) / rnd);
                }
                a[0] = "M" + a[0];
                a[1] = "C" + a[1];
            }
            if (e) {
                (typeof(e) === "string" ? document.querySelector(e) : e).setAttribute("d", a.join(" "));
            }
            return a.join(" ");
        };

        return CustomEase;

    }, true);

}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
    "use strict";
    var getGlobal = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[name];
    };
    if (typeof(module) !== "undefined" && module.exports) { //node
        require("../TweenLite.js");
        module.exports = getGlobal();
    } else if (typeof(define) === "function" && define.amd) { //AMD
        define(["TweenLite"], getGlobal);
    }
}("CustomEase"));