/*Canavs object*/
var canvas;
var pixelData = [];
var PIXELS = 120;
var NN_PIXELS = 20;
var SCREEN_MULTIPLIER = 3;
var PIXELS_PER_NN_PIXEL = PIXELS / NN_PIXELS;

var isDrawing;

var lastX = -1, lastY = -1;

var brush9x9 = [
	[0,     0, 200, 255, 255, 255, 200,   0,  0],
	[0,   200, 255, 255, 255, 255, 255, 200,  0],
	[0,   255, 255, 255, 255, 255, 255, 255,  0],
	[255, 255, 255, 255, 255, 255, 255, 255, 255],
	[255, 255, 255, 255, 255, 255, 255, 255, 255],
	[255, 255, 255, 255, 255, 255, 255, 255, 255],
	[0,   255, 255, 255, 255, 255, 255, 255,  0],
	[0,   200, 255, 255, 255, 255, 255, 200,  0],
	[0,     0, 200, 255, 255, 255, 200,   0,  0]];

var brush7x7 = [
	[0,     0, 100, 255, 100,   0,  0],
	[0,   100, 255, 255, 255, 100,  0],
	[100, 255, 255, 255, 255, 255, 100],
	[255, 255, 255, 255, 255, 255, 255],
	[100, 255, 255, 255, 255, 255, 100],
	[0,   100, 255, 255, 255, 100,  0],
	[0,     0, 100, 255, 100, 0,    0]];

var brush5x5 = [
	[0,   200, 255, 200,  0],
	[200, 255, 255, 255, 200],
	[255, 255, 255, 255, 255],
	[200, 255, 255, 255, 200],
	[0,   200, 255, 200,  0]];

var brush3x3 = [
	[10,  200, 255],
	[200, 255, 0],
	[10,  2, 0]];

var brush2x2 = [
	[250, 250],
	[5, 5]];

var brush1x1 = [[255]];

/*Get canvas X position*/
function canvasRelativeX(pageX) {
	var rect = canvas.getBoundingClientRect();
	return pageX - rect.left - window.scrollX;
}

/*Get canvas Y position*/
function canvasRelativeY(pageY) {
	var rect = canvas.getBoundingClientRect();
	return pageY - rect.top - window.scrollY;
}

/*Get pixel X from canvas position*/
function getPixelXFromPageX(pageX) {
	var canvasWidth = canvas.getBoundingClientRect().width;
	var multiplier = canvasWidth / PIXELS;
	return Math.floor(canvasRelativeX(pageX) / multiplier);
}

/*Get pixel Y from canvas position*/
function getPixelYFromPageY(pageY) {
	var canvasHeight = canvas.getBoundingClientRect().height;
	var multiplier = canvasHeight / PIXELS;
	return Math.floor(canvasRelativeY(pageY) / multiplier);
}


function drawMouseStart(evt) {
	isDrawing = true;
	lastX = getPixelXFromPageX(evt.pageX) -1;
	lastY = getPixelYFromPageY(evt.pageY);
	return drawMouse(evt);
}

function drawEnd(evt) {
	isDrawing = false;
	run_network();
	return true;
}

function drawMouse(evt) {
	var x = getPixelXFromPageX(evt.pageX);
	var y = getPixelYFromPageY(evt.pageY);

	return draw(x, y);
}

/*Drawing on touchscreen*/
function drawTouchStart(evt) {
	isDrawing = true;
	var touch = evt.touches.item(0);

	lastX = getPixelXFromPageX(touch.pageX) - 1;
	lastY = getPixelYFromPageY(touch.pageY);

	return drawTouch(evt);
}

function drawTouch(evt) {
	var touch = evt.touches.item(0);

	var x = getPixelXFromPageX(touch.pageX);
	var y = getPixelYFromPageY(touch.pageY);

	evt.preventDefault();

	return draw(x, y);
}

/*Adjust canvas based on screen screen dimension*/
function sizeCanvas() {
	var multiplier;
	var portraitOrientation;
	if(window.innerHeight > window.innerWidth) {
		portraitOrientation = true;
		SCREEN_MULTIPLIER = Math.floor(window.innerWidth / PIXELS);
	} else {
		portraitOrientation = false;
		SCREEN_MULTIPLIER = Math.floor((window.innerHeight - 100)/ PIXELS);
	}
	SCREEN_MULTIPLIER = Math.min(SCREEN_MULTIPLIER, 4);
	canvas.width = PIXELS * SCREEN_MULTIPLIER;
	canvas.height = PIXELS * SCREEN_MULTIPLIER;
	return portraitOrientation;
}

function sizeElements() {
	var portraitOrientation = sizeCanvas();
	var elements = document.getElementById("elements");
	var canvasRect = canvas.getBoundingClientRect();

	if(portraitOrientation) {
		elements.style.left = canvasRect.left + 'px';
		elements.style.top = canvasRect.bottom + 10 + 'px';
	} else {
		elements.style.left = canvasRect.right + 10 + 'px';
		elements.style.top = canvasRect.top + 'px';
	}
}

/*Initialize canvas with size and drawing functions*/
function init() {
	canvas = document.getElementById("canvas"); 
	sizeElements();
	for(var i = 0; i < PIXELS * PIXELS; i++) {
		pixelData.push(255);
	}
	isDrawing = false;
	canvas.addEventListener("mousedown", drawMouseStart);
	canvas.addEventListener("mousemove", drawMouse);
	canvas.addEventListener("mouseup", drawEnd);
	canvas.addEventListener("touchstart", drawTouchStart);
	canvas.addEventListener("touchmove", drawTouch);
	canvas.addEventListener("touchend", drawEnd);
	document.getElementById("clearbutton").addEventListener("click", clear);
}

function updatePixel(ctx, x, y, val) {
	if(x < 0 || x >= PIXELS || y < 0 || y >= PIXELS)
		return;

	pixelData[(y * PIXELS) + x] = val;

	var preciseX = x * SCREEN_MULTIPLIER;
	var preciseY = y * SCREEN_MULTIPLIER;
	var colour = -pixelData[(y * PIXELS) + x] + 255;

	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;

	ctx.fillStyle = 'rgba(' + colour + ',' + colour + ',' + colour + ',255)';
	ctx.fillRect(preciseX, preciseY, SCREEN_MULTIPLIER, SCREEN_MULTIPLIER);

	ctx.imageSmoothingEnabled = true;
	ctx.mozImageSmoothingEnabled = true;
}

function getPixel(x, y) {
	return pixelData[y * PIXELS + x];
}

function putBrush(ctx, centreX, centreY, brush) {
	var startX = Math.ceil(centreX - (brush[0].length / 2));
	var startY = Math.ceil(centreY - (brush.length / 2));

	for(var brushY = 0; brushY < brush.length; brushY++) {
		for(var brushX = 0; brushX < brush[brushY].length; brushX++) {
			var pixel = getPixel(brushX + startX, brushY + startY);
			pixel = Math.max(pixel - brush[brushY][brushX], 0);
			updatePixel(ctx, brushX + startX, brushY + startY, pixel);
		}
	}
}

function line(ctx, x1, y1, x2, y2, brush) {
	var dx = Math.abs(x2 - x1);
	var dy = Math.abs(y2 - y1);
	var sx = (x1 < x2) ? 1 : -1;
	var sy = (y1 < y2) ? 1 : -1;
	var err = dx - dy;
	putBrush(ctx, x1, y1, brush);
	while (!((x1 == x2) && (y1 == y2))) {
		var e2 = err << 1;
		if (e2 > -dy) {
			err -= dy;
			x1 += sx;
		}
		if (e2 < dx) {
			err += dx;
			y1 += sy;
		}
		putBrush(ctx, x1, y1, brush);
	}
}

function draw(x, y) {
	if(x < 0 || x >= PIXELS || y < 0 || y >= PIXELS) 
		isDrawing = false;

	if(isDrawing) {
		if (x != lastX || y != lastY) {
			var ctx = canvas.getContext("2d");

			line(ctx, lastX, lastY, x, y, brush9x9);
		}
	}

	lastX = x; lastY = y;
	return false;
}

/*Clear canavs*/
function clear(evt) {
	for(var i = 0; i < (PIXELS * PIXELS); i++) {
		pixelData[i] = 255;
	}
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, SCREEN_MULTIPLIER * PIXELS, SCREEN_MULTIPLIER * PIXELS);
}

function get_nn_pixel(nnX, nnY) {
	var count = 0;
	var imageStartX = nnX * PIXELS_PER_NN_PIXEL, imageStartY = nnY * PIXELS_PER_NN_PIXEL;

	for(var imageY = 0; imageY < PIXELS_PER_NN_PIXEL; imageY ++) {
		for(var imageX = 0; imageX < PIXELS_PER_NN_PIXEL; imageX ++) {
			count += getPixel(imageStartX + imageX, imageStartY + imageY);
		}
	}

	return count / (PIXELS_PER_NN_PIXEL * PIXELS_PER_NN_PIXEL);
}

function get_image_centre_of_mass() {
	var xcoords = 0;
	var ycoords = 0;

	var nsamples = 0;

	for(var y = 0; y < PIXELS; y++) {
		for(var x = 0; x < PIXELS; x++) {
			if(getPixel(x, y) != 255) {
				xcoords += x;
				ycoords += y;
				nsamples += 1;
			}
		}
	}

	return {"x": xcoords / nsamples, "y": ycoords / nsamples};
}

function get_image_for_nn() {

	centre_of_mass = get_image_centre_of_mass();
	nn_centre_x = centre_of_mass['x'] / PIXELS_PER_NN_PIXEL;
	nn_centre_y = centre_of_mass['y'] / PIXELS_PER_NN_PIXEL;

	padOffsetLeft = Math.max(Math.min(4 + Math.floor((NN_PIXELS / 2) - nn_centre_x), 8), 0);
	padOffsetRight = 8 - padOffsetLeft;

	padOffsetTop  = Math.max(Math.min(4 + Math.floor((NN_PIXELS / 2) - nn_centre_y), 8), 0);
	padOffsetBottom = 8 - padOffsetTop;

	var sample = [];

	function add_zero_rows(rows) {
		for(var row = 0; row < rows; row++) {
			for(var i = 0; i < 28; i++)
				sample.push(0);
		}
	}

	add_zero_rows(padOffsetTop);

	for(var y = 0; y < NN_PIXELS; y++) {
		
		for(var pad = 0; pad < padOffsetLeft; pad++) {
			sample.push(0);
		}

		for(var x = 0; x < NN_PIXELS; x++) {

			var pixel = 255 - get_nn_pixel(x, y);
			sample.push(pixel / 255.0);
		}

		for(var pad = 0; pad < padOffsetRight; pad++) {
			sample.push(0);
		}
	}
	add_zero_rows(padOffsetBottom);

	var nn_x = [sample];
	return nn_x;
}

function softmax(array) {
	var new = []
	var total = 0
	for (var i = 0; i < array.length; ++i) {
		total += Math.exp(array[i])
	}
	for (var i = 0; i < array.length; ++i) {
		new.push((Math.exp(array[i]))/total)
	}
	return new
}

/*Pass pixels through Neural Net*/
function run_network() {
	var layer0 = appendones(get_image_for_nn());
	
	var layer1 = appendones(relu(matmult(layer0, weights0)));

	var layer2 = softmax(matmult(layer1, weights1));

	var max_idx = 0;
	for(var i = 0; i < 10; i++) {
		if(layer2[0][i] > layer2[0][max_idx])
			max_idx = i;
	}
	
	document.getElementById("guess").innerHTML = "<b>" + max_idx + "</b>";
	/*Set Neuron activation bars*/
	$(".0").css("width", String(layer2[0][0]*100) + "%");
	$(".1").css("width", String(layer2[0][1]*100) + "%");
	$(".2").css("width", String(layer2[0][2]*100) + "%");
	$(".3").css("width", String(layer2[0][3]*100) + "%");
	$(".4").css("width", String(layer2[0][4]*100) + "%");
	$(".5").css("width", String(layer2[0][5]*100) + "%");
	$(".6").css("width", String(layer2[0][6]*100) + "%");
	$(".7").css("width", String(layer2[0][7]*100) + "%");
	$(".8").css("width", String(layer2[0][8]*100) + "%");
	$(".9").css("width", String(layer2[0][9]*100) + "%");
	$("."+String(max_idx)+"").css("background-color", "rgb(43,194,83)");
}

document.addEventListener("DOMContentLoaded", init, false);
