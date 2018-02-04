var opac;
$(".cell").mousedown(function() {

    var dat = parseFloat($(this).data("indx"));
    var vals = [dat-28,dat+28,dat-1,dat+1];
    var vals1 = [dat-29,dat+29,dat-27,dat+27];

    $(this).css("opacity", parseFloat($(this).css("opacity")) + 1);

    if (27 > dat < 756) {
        vals.forEach(function(item) {
            $('[data-indx =' + String(item) + ']').css("opacity", parseFloat($('[data-indx =' + String(item) + ']').css("opacity")) + 0.5);
        });

        vals1.forEach(function(item) {
           $('[data-indx =' + String(item) + ']').css("opacity", parseFloat($('[data-indx =' + String(item) + ']').css("opacity")) + 0.25);
        });
    }

    $(".cell").mouseover(function() {
        var dat = parseFloat($(this).data("indx"));
        var vals = [dat-28,dat+28,dat-1,dat+1];
        var vals1 = [dat-29,dat+29,dat-27,dat+27];

        opac = $(this).css("opacity");
        $(this).css("opacity", parseFloat(opac) + 1);

        if (27 > dat < 756) {
            vals.forEach(function(item) {
                $('[data-indx =' + String(item) + ']').css("opacity", parseFloat($('[data-indx =' + String(item) + ']').css("opacity")) + 0.5);
            });

            vals1.forEach(function(item) {
               $('[data-indx =' + String(item) + ']').css("opacity", parseFloat($('[data-indx =' + String(item) + ']').css("opacity")) + 0.25);
            });
        }

    });
}).mouseup(function() {
    $(".cell").unbind('mouseover');
});
