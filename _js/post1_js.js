$(document).ready(function() { $('div.x').click(function() {
    $(this).removeClass("hidden");

    let board = [
    	[0, 0, 0],
    	[0, 0, 0],
    	[0, 0, 0],
    ];

    let corners = [1,3,7,9];

    for (let i = 0; i < 9; i++) {
    	if (!$(`div.x.${i+1}`).hasClass("hidden") && $(`div.o.${i+1}`).hasClass("none")) {
    		board[Math.floor(i/3)][i%3] = -1;
    	}

    	if ($(`div.x.${i+1}`).hasClass("hidden") && !$(`div.o.${i+1}`).hasClass("none")) {
    		board[Math.floor(i/3)][i%3] = 1;
    	}
    }
    
 
    let num = Math.floor((Math.random() * 9) + 1);
    let k = 0;
    let j = 0;
    let foo = 0; let bar = 0;
    
    for (let p = 0; p < 3; p++;) {
    	if (my_array.indexOf(‘find_this_value’) != -1)
    }


	if ($(`div.x.${5}`).hasClass("hidden") && $(`div.o.${5}`).hasClass("none")) {
		console.log(true);
		$(`div.o.${5}`).removeClass("none");
		$(`div.x.${5}`).addClass("none");

	} else if ($(this).hasClass("5")) {
		while (foo === 0 && bar < 30) {
			let corner = corners[Math.floor(Math.random()*corners.length)];
			if ($(`div.x.${corner}`).hasClass("hidden") && $(`div.o.${corner}`).hasClass("none")) {
				$(`div.o.${corner}`).removeClass("none");
				$(`div.x.${corner}`).addClass("none");
				foo = 1;
			}
			bar+= 1;
		}

	} else if ($(this).hasClass("1") && $(`div.x.${9}`).hasClass("hidden") && $(`div.o.${9}`).hasClass("none")) {
		$(`div.o.${9}`).removeClass("none");
		$(`div.x.${9}`).addClass("none");

	} else if ($(this).hasClass("3") && $(`div.x.${7}`).hasClass("hidden") && $(`div.o.${7}`).hasClass("none")) {
		$(`div.o.${7}`).removeClass("none");
		$(`div.x.${7}`).addClass("none");

	} else if ($(this).hasClass("9") && $(`div.x.${1}`).hasClass("hidden") && $(`div.o.${1}`).hasClass("none")) {
		$(`div.o.${1}`).removeClass("none");
		$(`div.x.${1}`).addClass("none");

	} else if ($(this).hasClass("7") && $(`div.x.${3}`).hasClass("hidden") && $(`div.o.${3}`).hasClass("none")) {
		$(`div.o.${3}`).removeClass("none");
		$(`div.x.${3}`).addClass("none");

	} else {
		while (k===0 && j<100) {
	    	let num = Math.floor((Math.random() * 9) + 1);
	    	console.log(num);
	    	if ($(`div.x.${num}`).hasClass("hidden") && $(`div.o.${num}`).hasClass("none")) {
	    		$(`div.o.${num}`).removeClass("none");
	    		$(`div.x.${num}`).addClass("none");
	    		k=1;
	    	}
	    	j+=1;
    	}
	}

	});
});
