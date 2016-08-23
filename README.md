A simple Javascript canvas framework to draw in HTML5 Canvas.

## API
Download file:
```html
<script src="jsanvas.min.js"></script>
```
or:
```html
<script src="https://rawgit.com/feldhaus/jsanvas/master/jsanvas.min.js"></script>
```

### JSanvas

#### Define canvas
```javascript
jsanvas.canvasID = 'myCanvas';
```

#### Render display objects 
```javascript
jsanvas.render();
```

#### Removing a display object
```javascript
jsanvas.remove(displayObject);
```

#### Get canvas center position (Vector2)
```javascript
var center = jsanvas.center;
```

#### Get canvas widht
```javascript
var w = jsanvas.width;
```

#### Get canvas height
```javascript
var h = jsanvas.height;
```

### Rectangle
Creates a rectangle object.

#### New rectangle
```javascript
var r = new Rect(x, y, width, height);
```

#### Other options (default)
```
r.visible = true;
r.fillStyle = 'white'
r.lineWidth = 1
r.strokeStyle = 'black'
r.rotation = 0;
```

### Circle
Creates a circle object.

#### New circle
```javascript
var c = new Circle(x, y, radius);
```

#### Other options (default)
```javascript
c.visible = true;
c.fillStyle = 'white'
c.lineWidth = 1
c.strokeStyle = 'black'
c.rotation = 0;
```

### Line
Draw a line from one point to another. Optionally, you may append points to the end of the line to create outline shapes or paths.

#### New line
```javascript
var l = new Line(x1,y1, x2,y2, ...);
```

#### Append new points
```javascript
l.append(x1,y1, x2,y2, ...)
```

#### Other options (default)
```javascript
l.visible = true;
l.fillStyle = null
l.lineWidth = 1
l.strokeStyle = 'black'
```

### Image
Displays an image on the screen from a file.

#### New image
```javascript
var i = new Image(url, x, y, width, height);
```

#### Other options (default)
```javascript
i.visible = true;
i.rotation = 0;
```
## Examples

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            body{
                padding: 0;
                margin: 0;
            }
        </style>
    </head>
    
<body onload="init()">
    <canvas id="myCanvas" width="800" height="600">
        Your browser does not support the HTML5 canvas tag.
    </canvas>

    <script src="jsanvas.js"></script>
    <script>
        // get canvas and context
        jsanvas.canvasID = 'myCanvas';
        
        // init
        function init() {
            // get canvas center position (Vector2)
            var center = jsanvas.center;
            
            // create a rectangle 1 (background)
            var r1 = new Rect(center.x, center.y, jsanvas.width, jsanvas.height);
            r1.fillStyle = '#E84A5F';
            r1.lineWidth = 50;
            r1.strokeStyle = '#2A363B';
            
            // create a rectangle 2 (rotated)
            var r2 = new Rect(center.x, center.y, 300, 300);
            r2.fillStyle = '#2A363B';
            r2.lineWidth = 0;
            r2.rotation = 45;
            
            // create a circle 1 - filled
            var c1 = new Circle(center.x, center.y, 50);
            c1.fillStyle = '#E84A5F';
            c1.lineWidth = 0;
            
            // create a circle 2 - just stroke
            var c2 = new Circle(center.x, center.y, 100);
            c2.fillStyle = 'rgba(0,0,0,0)';
            c2.lineWidth = 5;
            c2.strokeStyle = '#E84A5F';
            
            // render objects
            jsanvas.render();
        }
    </script>
</body>
</html>
```

## License
Copyright (c) 2016 Maicon Feldhaus

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
