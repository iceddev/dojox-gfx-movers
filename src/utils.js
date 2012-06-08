/*The MIT License (MIT)
Copyright © 2012 Blaine Bublitz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
define([
  'dojo/dom-geometry'
], function(domGeom){

  var getDegrees = function(center, pt){
    //same point
    if(center.x === pt.x && center.y === pt.y){
      return 0;
    } else if(center.x === pt.x){
      if(center.y < pt.y){
        return 180;
      }else{
        return 0;
      }
    } else if(center.y === pt.y){
      if(center.x > pt.x){
        return 270;
      } else {
        return 90;
      }
    } else if(center.x < pt.x && center.y > pt.y){
      //quadrant 1
      return Math.atan((pt.x - center.x)/(center.y - pt.y)) * (180 / Math.PI);
    } else if((center.x < pt.x) && (center.y < pt.y)){
      //quadrant 2
      return 90 + Math.atan((pt.y - center.y)/(pt.x - center.x)) * (180 / Math.PI);
    } else if((center.x > pt.x) && (center.y < pt.y)){
      //quadrant 3
      return 180 + Math.atan((center.x - pt.x)/(pt.y - center.y)) * (180 / Math.PI);
    } else{
      //quadrant 4
      return 270 + Math.atan((center.y - pt.y)/(center.x - pt.x)) * (180 / Math.PI);
    }
  };

  var radiansToDegrees = function(radians){
    return (180 / Math.PI) * radians;
  };

  var getDistance = function(a, b){
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
  };

  var getRelativePoint = function(element, evt){
    var surfaceCoords = domGeom.position(element);
    return {
      x: Math.round(evt.clientX - surfaceCoords.x),
      y: Math.round(evt.clientY - surfaceCoords.y)
    };
  };

  return {
    getDegrees: getDegrees,
    radiansToDegrees: radiansToDegrees,
    getDistance: getDistance,
    getRelativePoint: getRelativePoint
  };

});