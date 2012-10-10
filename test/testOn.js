define(['act'], function(act){
    
    var count = function(n) {
        return function(){
            this.become(count(n + 1));
            return n;
        };
    };
    
    return {
        'module': "On Tests",
        'tests': [
            ["Simple On",
            function(){
                var f = act.on(function(){ return 1; });
                assert.deepEqual(f(), 1);
                assert.deepEqual(f.become, undefined);
            }],
            ["Simple Become On",
            function(){
                var f = act.on(count(1));
                assert.deepEqual(f(), 1);
                assert.deepEqual(f(), 2);
                assert.deepEqual(f(), 3);
            }],
            ["Chained On",
            function(){
                var f;
                assert.deepEqual((f = act.on(count(1)))(), 1);
                assert.deepEqual(f(), 2);
            }],
            ["This On",
            function(){
                function fib(){
                    this.become(fib, {x: this.y, y: this.x + this.y});
                    return this.x;
                };
                
                var f = act.on(fib, {x: 0, y: 1});
                assert.deepEqual(f(), 0);
                assert.deepEqual(f(), 1);
                assert.deepEqual(f(), 1);
                assert.deepEqual(f(), 2);
                assert.deepEqual(f(), 3);
                assert.deepEqual(f(), 5);
            }],
            ["Bound On",
            function(){
                function fib(x, y){
                    this.become(undefined, undefined, y, x + y);
                    return x;
                };
                
                var f = act.on(fib, undefined, 0, 1);
                assert.deepEqual(f(), 0);
                assert.deepEqual(f(), 1);
                assert.deepEqual(f(), 1);
                assert.deepEqual(f(), 2);
                assert.deepEqual(f(), 3);
                assert.deepEqual(f(), 5);
            }],
        ],
    };
});
