/*Global object contains all functions*/
var globals = {};

$(".reset").click(function() {
    $(".cell").html('');
    $(".cell").removeClass('occupied');
    ui.intialControlsVisible = true;
    ui.currentView = "";
    $('.intial').fadeIn({
        duration : "slow"
    };
    $(".level").addClass('not-selected');
    $(".level").removeClass('selected');
    $(".reset").css("display", "none");
});

/*Chose difficulty setting*/
$(".level").each(function() {
     $(this).click(function() {
        $('.selected').toggleClass('not-selected');
        $('.selected').toggleClass('selected');
        $(this).toggleClass('not-selected');
        $(this).toggleClass('selected');

        ai.level = $(this).attr("id");
    });
});

/*Start button*/
$(".start").click(function() {
    var selectedDiffeculty = $('.selected').attr("id");
    if(typeof selectedDiffeculty !== "undefined") {
        var aiPlayer = new AI(selectedDiffeculty);
        globals.game = new Game(aiPlayer);

        aiPlayer.plays(globals.game);

        globals.game.start();
    }
});

/*CLick on cell to place letter, advance game */
 $(".cell").each(function() {
     var $this = $(this);
     $this.click(function() {
         if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
             var indx = parseInt($this.data("indx"));

             var next = new State(globals.game.currentState);
             next.board[indx] = "X";

             ui.insertAt(indx, "X");

             next.advanceTurn();

             globals.game.advanceTo(next);

         }
     })
 });
