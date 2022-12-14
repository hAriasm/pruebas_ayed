var fs = require("fs"),
    assert = require("assert"),
    canvas = require("canvas");
    hog = require("../hog");

var canvas = drawImgToCanvasSync(__dirname + "/beachball.jpg");

var descriptor;

console.time("test");

for (var i = 0; i < 10000; i++) {
  descriptor = hog.extractHOG(canvas, {
    cellSize: 4,
    blockSize: 2,
    blockStride: 1,
    bins: 4,
    norm: "L1"
  });
}

console.timeEnd("test")

assert.deepEqual(descriptor, require("./expected.json"));


function dataToCanvas(imagedata) {
  img = new canvas.Image();
  img.src = new Buffer(imagedata, 'binary');

  var canvas = new canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  ctx.patternQuality = "best";

  ctx.drawImage(img, 0, 0, img.width, img.height,
    0, 0, img.width, img.height);
  return canvas;
}

function drawImgToCanvasSync(file) {
  var data = fs.readFileSync(file)
  var canvas = dataToCanvas(data);
  return canvas;
}
