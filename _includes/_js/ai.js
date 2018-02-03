/*Action that AI could make*/
var AIAction = function(pos) {
    this.movePosition = pos;
    /*Initializes minimax value*/
    this.minimaxVal = 0;

    /*Get next state*/
    this.applyTo = function(state) {
        var next = new State(state);
        next.board[this.movePosition] = state.turn;
        if(state.turn === "O")
            next.oMovesCount++;
        next.advanceTurn();
        return next;
    }
};

/*Sorts AIActions in ascending order*/
AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}

/*Sorts AIActions in descending order*/
AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}


/*AI player construction with selected difficulty*/
var AI = function(level) {
    var levelOfIntelligence = level;
    var game = {};

    /*Find minimax value of state*/
    function minimaxValue(state) {
        if(state.isTerminal()) {
            return Game.score(state);
        }
        else {
            var stateScore;
            if(state.turn === "X")
                stateScore = -1000;
            else
                stateScore = 1000;

            var availablePositions = state.emptyCells();

            /*List possible next states based on avaialble positions*/
            var availableNextStates = availablePositions.map(function(pos) {
                var action = new AIAction(pos);
                var nextState = action.applyTo(state);
                return nextState;
            });

            /*Find minimax value of possible next states*/
            availableNextStates.forEach(function(nextState) {
                var nextScore = minimaxValue(nextState);
                if(state.turn === "X") {
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });
            return stateScore;
        }
    }

    /*AI makes random move*/
    function takeABlindMove(turn) {
        var available = game.currentState.emptyCells();
        var randomCell = available[Math.floor(Math.random() * available.length)];
        var action = new AIAction(randomCell);
        var next = action.applyTo(game.currentState);
        ui.insertAt(randomCell, turn);
        game.advanceTo(next);
    }

    /*Take a move that is sometime mnimaxed and sometimes random*/
    function takeANoviceMove(turn) {
        var available = game.currentState.emptyCells();

        /*Find score of all avaialble moves*/
        var availableActions = available.map(function(pos) {
            var action =  new AIAction(pos);
            var nextState = action.applyTo(game.currentState);
            action.minimaxVal = minimaxValue(nextState);
            return action;
        });

        if(turn === "X")
            availableActions.sort(AIAction.DESCENDING);
        else
            availableActions.sort(AIAction.ASCENDING);

        /*Take the optimal action 60% of the time and take the first suboptimal action 40% of the time*/
        var chosenAction;
        if(Math.random()*100 <= 60) {
            chosenAction = availableActions[0];
        }
        else {
            if(availableActions.length >= 2) {
                chosenAction = availableActions[1];
            }
            else {
                chosenAction = availableActions[0];
            }
        }
        var next = chosenAction.applyTo(game.currentState);
        ui.insertAt(chosenAction.movePosition, turn);
        game.advanceTo(next);
    };

    /*Make a move that has the best score*/
    function takeAMasterMove(turn) {
        var available = game.currentState.emptyCells();
        var availableActions = available.map(function(pos) {
            var action =  new AIAction(pos);
            var next = action.applyTo(game.currentState);
            action.minimaxVal = minimaxValue(next);
            return action;
        });
        if(turn === "X")
            availableActions.sort(AIAction.DESCENDING);
        else
            availableActions.sort(AIAction.ASCENDING);
            
        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(game.currentState);
        ui.insertAt(chosenAction.movePosition, turn);
        game.advanceTo(next);
    }


    /*Specifies game that AI plays*/
    this.plays = function(_game){
        game = _game;
    };

    /*Notifies AI to take turn*/
    this.notify = function(turn) {
        switch(levelOfIntelligence) {
            case "easy": takeABlindMove(turn); break;
            case "medium": takeANoviceMove(turn); break;
            case "hard": takeAMasterMove(turn); break;
        }
    };
};
