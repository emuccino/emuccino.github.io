/*Estimate of total good/bad sentiment tokens in dictionaries*/
totalbad = 153200;
totalgood = 160101;
totalbad2 = 143278;
totalgood2 = 149275;
totalbad3 = 133368;
totalgood3 = 138457;

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
	if (b===0 && g===0) {
		return .5
	} else {
		return (.5 * ((1 + b)/(2 + totalbad))) / ((.5 * ((1 + b)/(2 + totalbad))) + (.5 * ((1 + g)/(2 + totalgood))))
	}
};

/*Naive Bayes probability of finding 2-gram word in negative sentiment*/
var probbad2 = function(word) {
	var b = bad2[word]
	var g = good2[word]
	if (isNaN(bad2[word])) {
		b = 0;
	}
	if (isNaN(good2[word])) {
		g = 0;
	}
	if (b===0 && g===0) {
		return 0.5
	} else {
		return (.5 * ((1 + b)/(2 + totalbad2))) / ((.5 * ((1 + b)/(2 + totalbad2))) + (.5 * ((1 + g)/(2 + totalgood2))))
	}
};

/*Naive Bayes probability of finding 3-gram word in negative sentiment*/
var probbad3 = function(word) {
	var b = bad3[word]
	var g = good3[word]
	if (isNaN(bad3[word])) {
		b = 0;
	}
	if (isNaN(good3[word])) {
		g = 0;
	}
	if (b===0 && g===0) {
		return 0.5
	} else {
		return (.5 * ((1 + b)/(2 + totalbad3))) / ((.5 * ((1 + b)/(2 + totalbad3))) + (.5 * ((1 + g)/(2 + totalgood3))))
	}
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
	if (b===0 && g===0) {
		return 0.5
	} else {
		return (.5 * ((1 + g)/(2 + totalgood))) / ((.5 * ((1 + b)/(2 + totalbad))) + (.5 * ((1 + g)/(2 + totalgood))))
	}
};

/*Naive Bayes probability of finding 2-gram word in positive sentiment*/
var probgood2 = function(word) {
	var b = bad2[word]
	var g = good2[word]
	if (isNaN(bad2[word])) {
		b = 0;
	}
	if (isNaN(good2[word])) {
		g = 0;
	}
	if (b===0 && g===0) {
		return 0.5
	} else {
		return (.5 * ((1 + g)/(2 + totalgood2))) / ((.5 * ((1 + b)/(2 + totalbad2))) + (.5 * ((1 + g)/(2 + totalgood2))))
	}
};

/*Naive Bayes probability of finding 3-gram word in positive sentiment*/
var probgood3 = function(word) {
	var b = bad3[word]
	var g = good3[word]
	if (isNaN(bad3[word])) {
		b = 0;
	}
	if (isNaN(good3[word])) {
		g = 0;
	}
	if (b===0 && g===0) {
		return 0.5
	} else {
		return (.5 * ((1 + g)/(2 + totalgood3))) / ((.5 * ((1 + b)/(2 + totalbad3))) + (.5 * ((1 + g)/(2 + totalgood3))))
	}
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
	bprob2 = 0;
	gprob2 = 0;
	bprob3 = 0;
	gprob3 = 0;
	
	for (var word in words) {
		bprob+=Math.log(probbad(words[word]));
		gprob+=Math.log(probgood(words[word]));
	};
	
	if (words.length > 1) {
		for (var i = 0; i < words.length-1; i++) {
			bprob2+=Math.log(probbad2(words[i]+'-'+words[i+1]));
			gprob2+=Math.log(probgood2(words[i]+'-'+words[i+1]));
		}
	}
	
	if (words.length > 2) {
		for (var i = 0; i < words.length-2; i++) {
			bprob3+=Math.log(probbad3(words[i]+'-'+words[i+1]+'-'+words[i+2]));
			gprob3+=Math.log(probgood3(words[i]+'-'+words[i+1]+'-'+words[i+2]));
		}
	}
	console.log(Math.exp(bprob),Math.exp(bprob2),Math.exp(bprob3),Math.exp(gprob),Math.exp(gprob2),Math.exp(gprob3));
	
	return [Math.exp(bprob)+4*Math.exp(bprob2)+27*Math.exp(bprob3), Math.exp(gprob)+4*Math.exp(gprob2)+27*Math.exp(gprob3), words.length]
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

