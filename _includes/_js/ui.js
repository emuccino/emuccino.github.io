/*UI object holds current UI state properties*/
var ui = {};
ui.intialControlsVisible = true;
ui.currentView = "";

/*Switches UI view*/
ui.switchViewTo = function(turn) {
    function _switch(_turn) {
        ui.currentView = "#" + _turn;
        $(ui.currentView).fadeIn("fast");

    }
    /*Removes control options upon game start*/
    if(ui.intialControlsVisible) {
        ui.intialControlsVisible = false;
        $('.intial').fadeOut({
            duration : "slow",
            done : function() {
                _switch(turn);
            }
        });
    }
    else {
        $(ui.currentView).fadeOut({
            duration: "fast",
            done: function() {
                _switch(turn);
            }
        });
    }
};

/*Place X or O on board*/
ui.insertAt = function(indx, symbol) {
    var board = $('.cell');
    var targetCell = $(board[indx]);

    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color : symbol == "X" ? "white" : "black"
        });
        targetCell.addClass('occupied');
    }
}
