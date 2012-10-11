define(['act'], function(act){
    
    var constant = function(v) { return function(){ return v;}; };
    
    return {
        'module': "On Tests",
        'tests': [
            ["Simple opt",
            function(){
                var f = act.opt(constant);
                assert.deepEqual(f(1), 1);
                assert.deepEqual(f(2), 2);
            }],
            ["Select opt",
            function(){
                var even = function(v){
                    if (v % 2 == 0) return constant(true);
                    return constant(false)
                };
                
                var f = act.opt(even);
                assert.deepEqual(f(10), true);
                assert.deepEqual(f(11), false);
            }],
            ["fib opt",
            function(){
                function fib(v) {
                    if (v === 0) return constant(0);
                    else if (v === 1) return constant(1);
                    return function() { return fib(v - 1)() + fib(v - 2)(); } 
                };
                
                var f = act.opt(fib);
                assert.deepEqual(f(0), 0);
                assert.deepEqual(f(1), 1);
                assert.deepEqual(f(2), 1);
                assert.deepEqual(f(3), 2);
                assert.deepEqual(f(4), 3);
                assert.deepEqual(f(5), 5);
                assert.deepEqual(f(0), 0);
            }],
        ],
    };
});
