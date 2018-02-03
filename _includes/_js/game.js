/* Game state as function of old state*/
var State = function(old) {
    /*initialize new state*/
    this.turn = "";
    this.oMovesCount = 0;
    this.result = "still running";
    this.board = [];

    /*If state is contructed from old state*/
    if(typeof old !== "undefined") {
        var len = old.board.length;
        this.board = new Array(len);
        for(var position = 0 ; position < len ; position++) {
            this.board[position] = old.board[position];
        }
        this.oMovesCount = old.oMovesCount;
        this.result = old.result;
        this.turn = old.turn;
    }

    /*Advance turn*/
    this.advanceTurn = function() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    /*Identify empty cells on board*/
    this.emptyCells = function() {
        var indxs = [];
        for(var position = 0; position < 9 ; position++) {
            if(this.board[position] === "E") {
                indxs.push(position);
            }
        }
        return indxs;
    }

    /*Checks for end game state and updates result*/
    this.isTerminal = function() {
        var B = this.board;

        /*rows*/
        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        /*columns*/
        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        /*diagonals*/
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        /*draw*/
        var available = this.emptyCells();
        if(available.length == 0) {
            this.result = "draw";
            return true;
        }
        else {
            return false;
        }
    };

};

/*Initializes game with AI*/
var Game = function(AILevel) {
    this.ai = AILevel;
    this.currentState = new State();

    /*Intialize empty board*/
    this.currentState.board = ["E", "E", "E",
                               "E", "E", "E",
                               "E", "E", "E"];
    /*X makes first move*/
    this.currentState.turn = "X";
    this.status = "beginning";

    /*Advance to a new state*/
    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.isTerminal()) {
            this.status = "ended";

            if(_state.result === "X-won") {
                ui.switchViewTo("won");
              }
            else if(_state.result === "O-won") {
                ui.switchViewTo("lost");
              }
            else {
                ui.switchViewTo("draw");
              }
            $(".reset").css("display", "inline");
        }
        else {
            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
            }
            else {
                ui.switchViewTo("robot");

                /*Notify AI to take turn*/
                this.ai.notify("O");
            }
        }
    };

    /*Starts the game*/
    this.start = function() {
        if(this.status = "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

};

/*Determine score of final state*/
Game.score = function(_state) {
    if(_state.result === "X-won"){
        return 10 - _state.oMovesCount;
    }
    else if(_state.result === "O-won") {
        return - 10 + _state.oMovesCount;
    }
    else {
        /*Draw*/
        return 0;
    }
}
