$(document).ready(function() { $('div.x').click(function() {
    $(this).removeClass("hidden");
    let i = 0;
    let j = 0;
    while (i===0 && j<100) {
    	let num = Math.floor((Math.random() * 9) + 1);
    	console.log(num);
    	if ($(`div.x.${num}`).hasClass("hidden") && $(`div.o.${num}`).hasClass("none")) {
    		$(`div.o.${num}`).removeClass("none");
    		$(`div.x.${num}`).addClass("none");
    		i=1;
    	}
    	j+=1;
    }
	});
});
