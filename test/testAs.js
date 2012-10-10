define(['act'], function(act){
    
    var constant = function(n) { return function(){ return n; }; };
    var add = function(n) { return function(v, x){ return n * v + x; }; };

    return {
        'module': "As Tests",
        'tests': [
            ["Simple As",
            function(){
                var f = act.as(constant(1));
                assert.deepEqual(f(), 1);
                
                f.become(constant(2))
                assert.deepEqual(f(), 2);
            }],
            ["Chained As",
            function(){
                var f;
                assert.deepEqual((f = act.as(constant(1)))(), 1);
                assert.deepEqual(f.become(constant(2))(), 2);
            }],
                ["Multiple As",
            function(){
                var f = act.as(constant(1));
                f.become(constant(10))
                f.become(constant(3))
                
                assert.deepEqual(f(), 3);
            }],
            ["This As",
            function(){
                var g = function(){ return this.a; };
                var f = act.as(g, {a: 1});
                assert.deepEqual(f(), 1);
                
                f.become(g, {a: 2})
                assert.deepEqual(f(), 2);
            }],
            ["This As non override impl",
            function(){
                var f = act.as(function(){ return this.a; }, {a: 1});
                assert.deepEqual(f(), 1);
                
                f.become(undefined, {a: 2})
                assert.deepEqual(f(), 2);
            }],
            ["This As become non override",
            function(){
                var f = act.as(function(){ return this.a; }, {a: 1, b: 2});
                assert.deepEqual(f(), 1);
                
                f.become(function(){ return this.b; })
                assert.deepEqual(f(), 2);
            }],
            ["Bound As",
            function(){
                var f = act.as(add(1), undefined, 10);
                assert.deepEqual(f(5), 15);
                
                f.become(add(2), undefined, 10)
                assert.deepEqual(f(5), 25);
            }],
            ["Override bound ",
            function(){
                var f = act.as(add(1), undefined, 10);
                assert.deepEqual(f(5), 15);
                
                f.become(undefined, undefined, 20)
                assert.deepEqual(f(5), 25);
            }],
        ],
    };
});
