/*The MIT License (MIT)
Copyright © 2012 Blaine Bublitz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
define([
  './utils',
  'dojo/_base/declare',
  'dojo/_base/connect',
  'dojo/_base/event',
  'dojox/gfx/matrix',
  'dojox/gfx/Mover'
], function(utils, declare, connect, evt, matrix, Mover){

  var StretchMover = declare('StretchMover', Mover, {
    centerPoint: {},
    lastDistance: 0,
    onFirstMove: function(e){
      // summary: it is meant to be called only once
      var transformedPoints = this.host.shape.getTransformedBoundingBox();
      var totalX = 0, totalY = 0;
      for(var i = 0; i < transformedPoints.length; i++){
        totalX += transformedPoints[i].x;
        totalY += transformedPoints[i].y;
      }
      this.centerPoint.x = totalX / 4;
      this.centerPoint.y = totalY / 4;
      var mousePoint = utils.getRelativePoint(this.host.shape.parent._parent, e);
      this.lastDistance = utils.getDistance(mousePoint, this.centerPoint);
      this.host.onFirstMove(this);
      connect.disconnect(this.events.pop());
    }
  });

  return {
    Horizontal: declare('StretchMover.Horizontal', StretchMover, {
      onMouseMove: function(e){
        // summary: event processor for onmousemove
        // e: Event: mouse event
        var x = e.clientX;
        var y = e.clientY;
        if(this.host.shape.parent && this.host.shape.parent._parent){
          var mousePoint = utils.getRelativePoint(this.host.shape.parent._parent, e);
          var currentDistance = utils.getDistance(mousePoint, this.centerPoint);
          var percentChange = currentDistance / this.lastDistance;
          var horizontalScale = matrix.scaleAt(percentChange, 1, this.centerPoint);
          this.host.onMove(this, horizontalScale);
          this.lastDistance = currentDistance;
        }
        this.lastX = x;
        this.lastY = y;
        evt.stop(e);
      }
    }),
    Vertical: declare('StretchMover.Vertical', StretchMover, {
      onMouseMove: function(e){
        // summary: event processor for onmousemove
        // e: Event: mouse event
        var x = e.clientX;
        var y = e.clientY;
        if(this.host.shape.parent && this.host.shape.parent._parent){
          var mousePoint = utils.getRelativePoint(this.host.shape.parent._parent, e);
          var currentDistance = utils.getDistance(mousePoint, this.centerPoint);
          var percentChange = currentDistance / this.lastDistance;
          var horizontalScale = matrix.scaleAt(1, percentChange, this.centerPoint);
          this.host.onMove(this, horizontalScale);
          this.lastDistance = currentDistance;
        }
        this.lastX = x;
        this.lastY = y;
        evt.stop(e);
      }
    })
  };

});