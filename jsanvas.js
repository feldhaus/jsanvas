/*
Copyright (c) 2016 Maicon Feldhaus

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES 
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

// Public functions
Vector2.prototype = {
    add: function(v) {
        if (v instanceof Vector2) { this.x += v.x; this.y += v.y; } 
        else { this.x += v; this.y += v; }
        return this;
    },
    sub: function(v) {
        if (v instanceof Vector2) { this.x -= v.x; this.y -= v.y; } 
        else { this.x -= v; this.y -= v; }
        return this;
    },
    mult: function(v) {
        if (v instanceof Vector2) { console.log(this.x + "/"+v.x); this.x *= v.x; this.y *= v.y; } 
        else { this.x *= v; this.y *= v; }
        return this;
    },
    div: function(v) {
        if (v instanceof Vector2) { this.x /= v.x; this.y /= v.y; } 
        else { this.x /= v; this.y /= v; }
        return this;
    },
    equals: function(v) {
        return this.x == v.x && this.y == v.y;
    },
    angleTo: function(v) {
        return Math.atan2(v.y - this.y, v.x - this.x);
    },
    sqrDistance: function(v) {
        return Vector2.sub(this, v).sqrMagnitude;
    },
    distance: function(v) {
        return Math.sqrt(this.sqrDistance(v));
    },
    clone: function() {
        return new Vector2(this.x, this.y);
    },
    toString: function() {
        return "Vector2 (" + this.x + ", " + this.y + ") ";
    },
};

// Public variables (Read-only)
Object.defineProperty(Vector2.prototype, 'sqrMagnitude', {
    get: function() {
        return this.x * this.x + this.y * this.y;
    },
});

Object.defineProperty(Vector2.prototype, 'magnitude', {
    get: function() {
        return Math.sqrt(this.sqrMagnitude);
    },
});

Object.defineProperty(Vector2.prototype, 'normalized', {
    get: function() {
        var mag = this.magnitude;
        if (mag > 0)
            return this.clone().div(mag);
        return Vector2.zero;
    },
});

// Static functions
Vector2.add = function(v1, v2) {
    if (v2 instanceof Vector2)
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    else
        return new Vector2(v1.x + v2, v1.y + v2);
};
Vector2.sub = function(v1, v2) {
    if (v2 instanceof Vector2)
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    else
        return new Vector2(v1.x - v2, v1.y - v2);
};
Vector2.mult = function(v1, v2) {
    if (v2 instanceof Vector2)
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    else
        return new Vector2(v1.x * v2, v1.y * v2);
};
Vector2.div = function(v1, v2) {
    if (v2 instanceof Vector2)
        return new Vector2(v1.x / v2.x, v1.y / v2.y);
    else
        return new Vector2(v1.x / v2, v1.y / v2);
};

Vector2.angleBetween = function(a, b) {
    return a.angleTo(b);
};

// Static variables
Object.defineProperty(Vector2, 'zero', {
    get: function() {
        return new Vector2();
    },
});

//http://natureofcode.com/book/chapter-1-vectors/
//https://github.com/jeresig/processing-js/blob/master/processing.js
