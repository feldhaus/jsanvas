# JSanvas
A simple Javascript canvas framework to draw in HTML5 Canvas.

## Usage
Download file:
```html
<script src="jsanvas.min.js"></script>
```
or:
```html
<script src="https://rawgit.com/feldhaus/jsanvas/master/jsanvas.min.js"></script>
```
## Reference
First, you need to setup the canvas.
```javascript
jsanvas.canvasID = 'myCanvas';
```

### Properties
- center: Returns canvas center position (Vector2).
```javascript
var center = jsanvas.center;
```

- width: Returns canvas widht.
```javascript
var w = jsanvas.width;
```

- height: Returns canvas height.
```javascript
var h = jsanvas.height;
```

### render()
Render display objects.
```javascript
jsanvas.render();
```

### remove(displayObject)
Removing a display object.
```javascript
jsanvas.remove(displayObject);
```

### Display Objects
#### Rectangle
Creates a rectangle object.
```javascript
var r = new Rect(x, y, width, height);
```
Properties (default):
```
r.visible = true;
r.fillStyle = 'white'
r.lineWidth = 1
r.strokeStyle = 'black'
r.rotation = 0;
```

#### Circle
Creates a circle object.
```javascript
var c = new Circle(x, y, radius);
```
Properties (default):
```javascript
c.visible = true;
c.fillStyle = 'white'
c.lineWidth = 1
c.strokeStyle = 'black'
c.rotation = 0;
```

#### Line
Draw a line from one point to another. Optionally, you may append points to the end of the line to create outline shapes or paths.
```javascript
var l = new Line(x1,y1, x2,y2, ...);
```
Properties (default):
```javascript
l.visible = true;
l.fillStyle = null
l.lineWidth = 1
l.strokeStyle = 'black'
```

##### append(args)
Append new points.
```javascript
l.append(x1,y1, x2,y2, ...)
```

#### Image
Displays an image on the screen from a file.
```javascript
var i = new Image(url, x, y, width, height);
```
Properties (default):
```javascript
i.visible = true;
i.rotation = 0;
```

## License
Copyright (c) 2016 Maicon Feldhaus

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
