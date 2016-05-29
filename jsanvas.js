/*
Copyright (c) 2016 Maicon Feldhaus

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do 
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

/*******************************************************************************
    JSANVAS
*******************************************************************************/

var jsanvas = {}
jsanvas.objects = [];

Object.defineProperty(jsanvas, 'canvasID', {
    set: function(value) { 
        this.canvas = document.getElementById(value);
        this.context = this.canvas.getContext('2d');
    },
});

// Public variables (Read-only)
Object.defineProperty(jsanvas, 'center', {
    get: function() { return new Vector2(this.width / 2, this.height / 2); },
});

Object.defineProperty(jsanvas, 'width', {
    get: function() { return this.canvas.width; },
});

Object.defineProperty(jsanvas, 'height', {
    get: function() { return this.canvas.height; },
});

// Static functions
jsanvas.render = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (var i = 0; i < this.objects.length; i++)
        if (this.objects[i].visible)
            this.objects[i].render();
}

jsanvas.remove = function(obj) {
    var index = this.objects.indexOf(obj);
    if (index != -1)
        this.objects.splice(index, 1);
}

jsanvas.newRect = function(x, y, width, height) {
    var obj = new Rect(x, y, width, height);
    this.objects.push(obj);
    return obj;
}

jsanvas.newCircle = function(x, y, radius) {
    var obj = new Circle(x, y, radius);
    this.objects.push(obj);
    return obj;
}

jsanvas.newImage = function(filename, x, y, width, height) {
    var obj = new Img(filename, x, y, width, height);
    this.objects.push(obj);
    return obj;
}

/*******************************************************************************
    VECTOR2
*******************************************************************************/

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
        if (v instanceof Vector2) { this.x *= v.x; this.y *= v.y; } 
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

/*******************************************************************************
    DISPLAY OBJECT
*******************************************************************************/

function DisplayObject(x, y) {
    this.visible = true;
    this.fillStyle = 'white'
    this.lineWidth = 1
    this.strokeStyle = 'black'
    this.rotation = 0;
    Vector2.call(this, x, y);
}
DisplayObject.prototype = new Vector2();

/*******************************************************************************
    RECT
*******************************************************************************/

function Rect(x, y, width, height) {
    this.width = width;
    this.height = height;
    DisplayObject.call(this, x, y);
}
Rect.prototype = new DisplayObject();

Rect.prototype.render = function() {
    // save the current co-ordinate system before screw it
    jsanvas.context.save();
    // move to position
    jsanvas.context.translate(this.x, this.y);
    // rotate around that point
    jsanvas.context.rotate(this.rotation * DEG2RAD);
    // begins a path
    jsanvas.context.beginPath();
    // draw rect
    jsanvas.context.rect(-this.width/2, -this.height/2, this.width, this.height);
    // set fill style and fill it
    jsanvas.context.fillStyle = this.fillStyle;
    jsanvas.context.fill();
    // set stroke width and style and draw it
    if (this.lineWidth > 0) {
        jsanvas.context.lineWidth = this.lineWidth;
        jsanvas.context.strokeStyle = this.strokeStyle;
        jsanvas.context.stroke();
    }
    
    // restore the co-ordinate
    jsanvas.context.restore()
}

/*******************************************************************************
    CIRCLE
*******************************************************************************/

function Circle(x, y, radius) {
    this.radius = radius;
    DisplayObject.call(this, x, y);
}
Circle.prototype = new DisplayObject();

Circle.prototype.render = function() {
    // begins a path
    jsanvas.context.beginPath();
    // draw circle
    jsanvas.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    // set fill style and fill it
    jsanvas.context.fillStyle = this.fillStyle;
    jsanvas.context.fill();
    // set stroke width and style and draw it
    if (this.lineWidth > 0) {
        jsanvas.context.lineWidth = this.lineWidth;
        jsanvas.context.strokeStyle = this.strokeStyle;
        jsanvas.context.stroke();
    }
}

/*******************************************************************************
    IMAGE
*******************************************************************************/

function Img(filename, x, y, width, height) {
    this.width = width;
    this.height = height;
    parent = this;
    this.img = new Image();
    this.img.src = filename;
    this.img.onload = function() { parent.render(); }
    DisplayObject.call(this, x, y);
}
Img.prototype = new DisplayObject();

Img.prototype.render = function() {
    // save the current co-ordinate system before screw it
    jsanvas.context.save();
    // move to position
    jsanvas.context.translate(this.x, this.y);
    // rotate around that point
    jsanvas.context.rotate(this.rotation * DEG2RAD);
    // draw image
    jsanvas.context.drawImage(this.img, 0, 0, this.width, this.height);
    // restore the co-ordinate
    jsanvas.context.restore()
}
