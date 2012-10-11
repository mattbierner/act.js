(function(define){

define(function() {
"use strict";

/* Prototypes
 ******************************************************************************/
var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var bind = Function.prototype.bind;

/* Exported Objects
 ******************************************************************************/
/**
 * Factory for function that can have its behavior changed externally and
 * internally.
 * 
 * @param {function(...[*]): *} initialImpl 
 * @param [initialT] Initial scope object for function behavior.
 * @param {Array} [initialBound] Initial bound arguments for the function
 *     behavior.
 * 
 * @return function(...[*]): *} 
 */
var as = function(initialImpl, initialT, initialBound) {
    // internal state
    var behavior, impl, t, boundArgs; 
   
    var f = function(/*...*/) {
        return behavior.apply(undefined, arguments);
    };
    var become = function(newImpl, newT, newBoundArgs) {
        impl = (newImpl || impl);
        t = (newT || t || {});
        boundArgs = (newBoundArgs !== undefined ? newBoundArgs : boundArgs);
        Object.defineProperty(t, 'become', {
            'value':  become.bind(this),
            'writable': true
        });
        behavior = bind.apply(impl, concat.apply([t], boundArgs));
        return this;
    };
    f.become = become;
    return become.call(f, initialImpl, initialT, initialBound);
};

/**
 * Factory for function that can modify its own behavior internally and does
 * not support external modification. 
 * 
 * @param {function(...[*]): *} initialImpl 
 * @param [initialT] Initial scope object for function behavior.
 * @param {Array} [initialBound] Initial bound arguments for the function
 *     behavior.
 * 
 * @return function(...[*]): *} 
 */
var on = function(initialImpl, initialT, initialBound) {
    var f = as(initialImpl, initialT, initialBound);
    delete f.become;
    return f;
};

/**
 * Factory for function that selects its behavior when called.
 */
var opt = function(selector, selectorScope) {
    return function(/*...*/) {
        return selector.apply(selectorScope, arguments).apply(undefined, arguments);
    };
};


/* Export
 ******************************************************************************/
return {
    'as': as,
    'on': on,
    'opt': opt
};

});

}(
    typeof define !== 'undefined' ? define : function(factory) { be = factory(); }
));