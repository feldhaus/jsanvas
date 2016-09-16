/*
MIT License

Copyright (c) 2016 Maicon Feldhaus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

/*******************************************************************************
    JSANVAS
*******************************************************************************/

var jsanvas = {}
jsanvas.displayObjects = [];

Object.defineProperty(jsanvas, 'canvasID', {
    set: function(value) { 
        this.canvas = document.getElementById(value);
        this.context = this.canvas.getContext('2d');
    },
});

// read-only
Object.defineProperty(jsanvas, 'center', {
    get: function() { return new Vector2(this.width / 2, this.height / 2); },
});

// read-only
Object.defineProperty(jsanvas, 'width', {
    get: function() { return this.canvas.width; },
});

// read-only
Object.defineProperty(jsanvas, 'height', {
    get: function() { return this.canvas.height; },
});

jsanvas.render = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    for (var i = 0; i < this.displayObjects.length; i++)
        if (this.displayObjects[i].visible)
            this.displayObjects[i].render();
}

jsanvas.remove = function(obj) {
    var index = this.displayObjects.indexOf(obj);
    if (index != -1)
        this.displayObjects.splice(index, 1);
}

/*******************************************************************************
    VECTOR2
*******************************************************************************/

function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

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

// read-only
Object.defineProperty(Vector2.prototype, 'sqrMagnitude', {
    get: function() {
        return this.x * this.x + this.y * this.y;
    },
});

// read-only
Object.defineProperty(Vector2.prototype, 'magnitude', {
    get: function() {
        return Math.sqrt(this.sqrMagnitude);
    },
});

// read-only
Object.defineProperty(Vector2.prototype, 'normalized', {
    get: function() {
        var mag = this.magnitude;
        if (mag > 0)
            return this.clone().div(mag);
        return Vector2.zero;
    },
});

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

Object.defineProperty(Vector2, 'zero', {
    get: function() {
        return new Vector2();
    },
});

/*******************************************************************************
    DISPLAY OBJECT
*******************************************************************************/

function DisplayObject(x, y) {
    Vector2.call(this, x || 0, y || 0);
    this.visible = true;
    this.rotation = 0;
    jsanvas.displayObjects.push(this);
}
DisplayObject.prototype = Object.create(Vector2.prototype);

DisplayObject.prototype.removeSelf = function() {
    jsanvas.remove(this);
}

DisplayObject.prototype.toBack = function() {
    this.removeSelf();
    jsanvas.displayObjects.unshift(this);
}

DisplayObject.prototype.toFront = function() {
    this.removeSelf();
    jsanvas.displayObjects.push(this);
}

DisplayObject.prototype.render = function() {}

/*******************************************************************************
    SHAPE OBJECT
*******************************************************************************/

function ShapeObject(x, y) {
    DisplayObject.call(this, x, y);
    this.fillStyle = 'white';
    this.strokeStyle = 'black';
    this.lineWidth = 1;
}
ShapeObject.prototype = Object.create(DisplayObject.prototype);

ShapeObject.prototype.draw = function() {
    // set fill style and fill it
    if (this.fillStyle) {
        jsanvas.context.fillStyle = this.fillStyle;
        jsanvas.context.fill();
    }
    // set stroke width and style and draw it
    if (this.lineWidth > 0) {
        jsanvas.context.lineWidth = this.lineWidth;
        jsanvas.context.strokeStyle = this.strokeStyle;
        jsanvas.context.stroke();
    }
}

/*******************************************************************************
    GROUP
*******************************************************************************/

function Group(x, y) {
    this.children = [];
    DisplayObject.call(this, x, y);
    this._x = x || 0;
    this._y = y || 0;
    this._visible = true;
}
Group.prototype = Object.create(DisplayObject.prototype);

Group.prototype.insert = function(displayObject) {
    if (displayObject instanceof DisplayObject) {
        // insert new children
        this.children.push(displayObject);
        // and set its position
        displayObject.x += this.x;
        displayObject.y += this.y;
    } 
}

Object.defineProperty(Group.prototype, 'x', {
    set: function(value) { 
        this._x = value;
        // set all children x value
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].x += value;
        }
    },
    get: function() {
        return this._y;
    }
});

Object.defineProperty(Group.prototype, 'y', {
    set: function(value) { 
        this._y = value;
        // set all children y value
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].y += value;
        }
    },
    get: function(){
        return this._y;
    },
});

Object.defineProperty(Group.prototype, 'visible', {
    set: function(value) { 
        this._visible = value;
        // set all children visible value
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].visible += value;
        }
    },
});

/*******************************************************************************
    RECT
*******************************************************************************/

function Rect(x, y, width, height) {
    ShapeObject.call(this, x, y);
    this.width = width;
    this.height = height;
}
Rect.prototype = Object.create(ShapeObject.prototype);

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
    jsanvas.context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    // draw it
    this.draw();
    // restore the co-ordinate
    jsanvas.context.restore()
}

/*******************************************************************************
    CIRCLE
*******************************************************************************/

function Circle(x, y, radius) {
    ShapeObject.call(this, x, y);
    this.radius = radius;
}
Circle.prototype = Object.create(ShapeObject.prototype);

Circle.prototype.render = function() {
    // begins a path
    jsanvas.context.beginPath();
    // draw circle
    jsanvas.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    // draw it
    this.draw();
}

/*******************************************************************************
    LINE
*******************************************************************************/

function Line() {
    ShapeObject.call(this);
    this.lineWidth = 1;
    this.fillStyle = null;
    this.points = [];
    for (var i = 0; i < arguments.length; i+=2) {
        this.points.push(new Vector2(arguments[i], arguments[i+1]));
    }
}
Line.prototype = Object.create(ShapeObject.prototype);

Line.prototype.render = function() {
    // begins a path
    jsanvas.context.beginPath();
    // draw lines
    if (this.points.length > 1) {
        jsanvas.context.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            jsanvas.context.lineTo(this.points[i].x, this.points[i].y);
        }
    }
    // draw it
    this.draw();
}

Line.prototype.append = function() {
    for (var i = 0; i < arguments.length; i+=2) {
        this.points.push(new Vector2(arguments[i], arguments[i+1]));
    }
}

/*******************************************************************************
    IMAGE
*******************************************************************************/

function Img(filename, x, y, width, height) {
    DisplayObject.call(this, x, y);
    this.width = width || 0;
    this.height = height || 0;
    parent = this;
    this.img = new Image();
    this.img.src = filename;
    this.img.onload = function() { 
        if (parent.width == 0)
            parent.width = parent.img.width;
        if (parent.height == 0)
            parent.height = parent.img.height;
        parent.render();
    }
}
Img.prototype = Object.create(DisplayObject.prototype);

Img.prototype.render = function() {
    // save the current co-ordinate system before screw it
    jsanvas.context.save();
    // move to position
    jsanvas.context.translate(this.x, this.y);
    // rotate around that point
    jsanvas.context.rotate(this.rotation * DEG2RAD);
    // draw image
    jsanvas.context.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
    // restore the co-ordinate
    jsanvas.context.restore()
}