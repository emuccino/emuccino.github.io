/*Estimate of total good/bad sentiment tokens in dictionaries*/
totalbad = 160000;
totalgood = 160000;

/*Naive Bayes probability of finding word in negative sentiment*/
var probbad = function(word) {
	var b = bad1[word]
	var g = good1[word]
	if (isNaN(bad1[word])) {
		b = 0;
	}
	if (isNaN(good1[word])) {
		g = 0;
	}
	return (.5 * ((1 + b)/(2 + totalbad))) / ((.5 * ((1 + b)/(2 + totalbad))) + (.5 * ((1 + g)/(2 + totalgood))))
};

/*Naive Bayes probability of finding word in positive sentiment*/
var probgood = function(word) {
	var b = bad1[word]
	var g = good1[word]
	if (isNaN(bad1[word])) {
		b = 0;
	}
	if (isNaN(good1[word])) {
		g = 0;
	}
	return (.5 * ((1 + g)/(2 + totalgood))) / ((.5 * ((1 + b)/(2 + totalbad))) + (.5 * ((1 + g)/(2 + totalgood))))
};

/*Turns text input into list of words*/
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

/*Takes list of words and finds total probabilites*/
var prob = function(words) {
	bprob = 0;
	gprob = 0;
	for (var word in words) {
		bprob+=Math.log(probbad(words[word]));
		gprob+=Math.log(probgood(words[word]));
	};

	return [Math.exp(bprob), Math.exp(gprob), words.length]
}

/*Click button executes good/bad sentiment comparison and displayes results*/
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

