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
 * Factory for function that can have its behavior changed externally.
 * 
 * @param {function(...[*]): *} initialImpl 
 * @param [initialT]
 * 
 * @return function(...[*]): *} 
 */
var as = function(initialImpl, initialT /*, ...*/) {
    // internal state
    var behavior, impl, t; 
   
    var f = function(/*...*/) {
        return behavior.apply(undefined, arguments);
    };
    var become = function(newImpl, newT /*, ...*/) {
        impl = (newImpl || impl);
        t = (newT || t || {});
        Object.defineProperty(t, 'become', {
            'value':  become.bind(this),
            'writable': true
        });
        behavior = (arguments.length <= 2 ? impl.bind(t) :
            bind.apply(impl, concat.apply([t], slice.call(arguments, 2))));
        return this;
    };
    f.become = become;
    return become.apply(f, arguments);
};

/**
 * Factory for function that can modify its own behavior internally and does
 * not support external modification. 
 * 
 * @param {function(...[*]): *} impl 
 * @param [t]
 * 
 * @return function(...[*]): *} 
 */
var on = function(initialImpl, initialT /*, ...*/) {
    var f = as.apply(undefined, arguments);
    delete f.become;
    return f;
};


/* Export
 ******************************************************************************/
return {
    'as': as,
    'on': on
};

});

}(
    typeof define !== 'undefined' ? define : function(factory) { be = factory(); }
));