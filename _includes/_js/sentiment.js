totalbad = 18000;
totalgood = 18000;

var probbad = function(word) {
	var b = bad[word]
	var g = good[word]
	if (isNaN(bad[word])) {
		b = 0;
	}
	if (isNaN(good[word])) {
		g = 0;
	}
	return (.5 * ((1 + b)/(2 + totalbad))) / ((.5 * ((1 + b)/(2 + totalbad))) + (.5 * ((1 + g)/(2 + totalgood))))
};

var probgood = function(word) {
	var b = bad[word]
	var g = good[word]
	if (isNaN(bad[word])) {
		b = 0;
	}
	if (isNaN(good[word])) {
		g = 0;
	}
	return (.5 * ((1 + g)/(2 + totalgood))) / ((.5 * ((1 + b)/(2 + totalbad))) + (.5 * ((1 + g)/(2 + totalgood))))
};

var filter = function(sentence) {

	string = sentence.toLowerCase().split("");
	for (var char in string) {
		if (string[char] === '\'') {
			string[char] = '';
		} else {
			string[char] = string[char].replace(/[^a-zA-Z0-9]/g, ' ');
		};
	};
	string = string.join("").trim()
	string = string.split(/[ ,]+/)
	return string
}

var prob = function(words) {
	bprob = 0;
	gprob = 0;
	for (var word in words) {
		console.log([probbad(words[word]),probgood(words[word])])
		bprob+=Math.log(probbad(words[word]));
		gprob+=Math.log(probgood(words[word]));
	};

	return [Math.exp(bprob), Math.exp(gprob), words.length]
}

$("#submit").click(function() {
	var sentence = document.getElementById("input").value;
	var results = prob(filter(sentence))
	console.log(prob(filter(sentence)));
	if (results[0] > results[1]) {
		var sent='Negative';
	} else if (results[0] < results[1]) {
		var sent='Positive';
	} else {
		var sent='Neutral';
	}

	$('#result').html('I detect <b>'+ sent + '</b> sentiment.')

	$(".good").css("width", String(100*results[1]/(results[0]+results[1])) + "%");
	$(".bad").css("width", String(100*results[0]/(results[0]+results[1])) + "%");


});

