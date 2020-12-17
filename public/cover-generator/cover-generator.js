(function ($) {
	'use strict';

	// 'consts'
	var IMAGETYPE_SHAPES = 0;

	// variables
	var images = [];

	var $output = $('#output');
	var $btnGenerate = $('#btnGenerate');
	var $btnDownload = $('#btnDownload');
	var $btnClear = $('#btnClear');
	var $_canvas = $('<canvas />');
	var ctx = $_canvas[0].getContext('2d');
	var $inpW = $('#inpImgWidth');
	var $inpH = $('#inpImgHeight');
	var $inpA = $('#inpImgAmount');
  var $inpS = $('#inpShapeDensity');
	var $inpTxtDraw = $('#inpTxtDrawOverlay');
	var $inpTxtSize = $('#inpTxtFontSize');
	var $inpTxtContent = $('#inpTxtContent');
	var options = {
		width: 300,
		height: 250,
		amount: 100,
		type: IMAGETYPE_SHAPES,
		colorsBack: ['#f1c40f', '#ecf0f1', '#9b59b6'],
		colorsMain: ['#d35400', '#c0392b', '#2980b9', '#2c3e50', '#27ae60', '#7f8c8d', '#34495e'],
		shapeDensity: 3,
	    shapeSpread: 0.5,
	    textOverlay: true,
	    textOverlayContent: '{width} x {height}',
	    textFontSize: 32
	};

	var getRandomInt = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

  var useRandomBg;
  var selectedColor;

	// generator function
	var generateImages = function () {
    useRandomBg =  $('.chk-bg-random').prop('checked');
    selectedColor = $('.inp-color').val();

		options.width = (parseInt($inpW.val())) ? parseInt($inpW.val()) : options.width;
		options.height = (parseInt($inpH.val())) ? parseInt($inpH.val()) : options.height;
		options.amount = (parseInt($inpA.val())) ? parseInt($inpA.val()) : options.amount;
    options.shapeDensity = (parseInt($inpS.val())) ? parseInt($inpS.val()) : options.shapeDensity

		options.textOverlay = $inpTxtDraw.prop('checked');
		options.textOverlayContent = $inpTxtContent.val() ? $inpTxtContent.val() : options.textOverlayContent;
		options.textFontSize = $inpTxtSize.val() ? $inpTxtSize.val() : options.textFontSize;

		$_canvas[0].width = options.width;
		$_canvas[0].height = options.height;

		for (var i=0; i<options.amount; i++) {
			drawImage(ctx, options);
			var $_newImageContainer = $('<div />');
			var $_newImage = $('<img />');
			var imgData = $_canvas[0].toDataURL('image/png');
			$_newImage.attr('src', imgData).appendTo('#output');
			images.push(imgData);
		}
	}


	var drawImage = function (ctx, settings) {
		// pick background color

		var bgCol = (useRandomBg) ?
        settings.colorsBack[Math.floor(Math.random() * settings.colorsBack.length)] :
        selectedColor;

		ctx.fillStyle = bgCol;
		ctx.fillRect(0, 0, settings.width, settings.height);

		if (settings.type == IMAGETYPE_SHAPES) {
			// draw shapes
			var _shapeFunctions = [
		        __drawTriangle,
				__drawCircle
			];
			for (var i=0, l=settings.shapeDensity; i<l; i++) {
				// get three random points on the canvas
				_shapeFunctions[getRandomInt(0, _shapeFunctions.length-1)](ctx, settings);
			}
			if (settings.textOverlay) {
				__drawText(ctx, settings);
			}
		}
	}

	var __drawText = function (ctx, settings) {
		// parse the text string
		var textContent = settings.textOverlayContent;
		// parse options
		for (var p in settings) {
			if (settings.hasOwnProperty(p)) {
				var rgx = new RegExp('\\{' + p + '\\}', 'g');
				textContent = textContent.replace(rgx, settings[p]);
			}
		};

		// get text coordinates
		var tX = settings.width / 2;
		var tY = settings.height / 2 + settings.textFontSize / 2;

		// draw text
		ctx.textAlign = 'center';
		ctx.font = settings.textFontSize + 'px serif';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2;
		ctx.strokeText(textContent, tX, tY);
		ctx.fillStyle = 'white';
		ctx.fillText(textContent, tX, tY);

	}

	var __drawTriangle = function (ctx, settings) {
		// get random triangle points
		var pts = [];
		for (var j=0; j<3; j++) {
			var pX = getRandomInt((-settings.width/2)*settings.shapeSpread, settings.width+(settings.width/2)*settings.shapeSpread);
			var pY = getRandomInt((-settings.height/2)*settings.shapeSpread, settings.height+(settings.height/2)*settings.shapeSpread);
			pts[j] = { x: pX, y: pY };
		}

		// draw triangle
		ctx.fillStyle = settings.colorsMain[Math.floor(Math.random() * settings.colorsMain.length)];
		ctx.beginPath();
		ctx.moveTo(pts[0].x, pts[0].y);
		ctx.lineTo(pts[1].x, pts[1].y);
		ctx.lineTo(pts[2].x, pts[2].y);
		ctx.fill();
	}

	var __drawCircle = function (ctx, settings) {
		// get circle coordinates and radius
		var pX = getRandomInt(0, settings.width);
		var pY = getRandomInt(0, settings.height);
		var pR = getRandomInt(1, Math.min(settings.width, settings.height));

		// draw circle
		ctx.fillStyle = settings.colorsMain[getRandomInt(0, settings.colorsMain.length-1)];
		ctx.beginPath();
		ctx.arc(pX, pY, pR, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();

	}

	// EVENT LISTENERS
	$btnGenerate.click(function () {
		generateImages();
	});

	$btnDownload.click(function () {
		if (images.length) {
			var zip = new JSZip();
			for (var i=0, l=images.length; i<l; i++) {
        var imgData = images[i].substr(images[i].indexOf(',')+1);
				zip.file('img' + i + '.png', imgData, { base64: true });
			}
			var content = zip.generate({ type: 'blob' });
			saveAs(content, "example.zip");
		}
	});

	$btnClear.click(function () {
		$output.empty();
		images = [];
	});

})(jQuery);
