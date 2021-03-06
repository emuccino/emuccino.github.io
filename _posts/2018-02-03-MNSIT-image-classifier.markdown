---
layout: post
title:  "MNIST Image Classifier"
date:   2018-02-03 02:40:08 +0000
categories: machine learning, game
jsarr:
- _js/mnist_network.js
- _js/mnist_weights_0.json
- _js/mnist_weights_1.json
- _js/canvas.js
---

<html>
<body class = 'post2'>
    	<p>A feed-forward Neural Network was trained to classify a 28x28 pixel grid as a digit from 0-9. The network has an input layer of 784 neurons, one hidden layer of 200 neurons, and an output layer of 10 neurons (one for each digit). It was trained with the MNIST database of handwritten digits which can be found <a href="http://yann.lecun.com/exdb/mnist/" target="_blank">here</a>.</p>
	<p>Draw a number from 0-9 on the canvas below. USe the full height of the canvas for the best results.</p>
	<div style="position: relative; width:900px; float:left;">
		<div style="height:540; display: inline-block; width: 484px; float:inherit; margin-top: 30px; ">
			<canvas id="canvas"></canvas>
			<div id="bottom">
				<p class="guess">Guess: <span id="guess"></span><button id="clearbutton">Clear</button></p>
			</div>
		</div>
		<div id="elements">
			<div class="bar" style="margin-top: 0px"><b>Neuron Activations</b></div>
			<div class="bar"><b>0 </b><div class="meter"><span style="width: 25%" class="0"></span></div></div>
			<div class="bar"><b>1 </b><div class="meter"><span style="width: 25%" class="1"></span></div></div>
			<div class="bar"><b>2 </b><div class="meter"><span style="width: 25%" class="2"></span></div></div>
			<div class="bar"><b>3 </b><div class="meter"><span style="width: 25%" class="3"></span></div></div>
			<div class="bar"><b>4 </b><div class="meter"><span style="width: 25%" class="4"></span></div></div>
			<div class="bar"><b>5 </b><div class="meter"><span style="width: 25%" class="5"></span></div></div>
			<div class="bar"><b>6 </b><div class="meter"><span style="width: 25%" class="6"></span></div></div>
			<div class="bar"><b>7 </b><div class="meter"><span style="width: 25%" class="7"></span></div></div>
			<div class="bar"><b>8 </b><div class="meter"><span style="width: 25%" class="8"></span></div></div>
			<div class="bar"><b>9 </b><div class="meter"><span style="width: 25%" class="9"></span></div></div>
		</div>
	</div>
</body>
</html>
