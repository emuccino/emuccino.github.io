---
layout: post
title:  "Tic-Tac-Toe: Try to Win!"
date:   2018-01-17 02:40:08 +0000
categories: machine learning, game
jsarr:
- _js/jquery-1.10.1.min.js
- _js/ui.js
- _js/game.js
- _js/ai.js
- _js/control.js
---

<html>
    <body>
    <p style="text-align: center">A program has learned how to play tic-tac-toe using 'Machine Learning'.</p>
    <p>Chose a difficulty setting and click "Start" to begin.</p>
        <div class = 'game'>
            <div class = 'board'>
                <div class='cell' data-indx = "0" ></div>
                <div class='cell' data-indx = "1" ></div>
                <div class='cell' data-indx = "2" ></div>
                <div class='cell' data-indx = "3" ></div>
                <div class='cell' data-indx = "4" ></div>
                <div class='cell' data-indx = "5" ></div>
                <div class='cell' data-indx = "6" ></div>
                <div class='cell' data-indx = "7" ></div>
                <div class='cell' data-indx = "8" ></div>
            </div>

            <div class = 'control'>
                <div class = 'intial'>
                    <div class = 'difficulty'>
                        <span class = 'level not-selected' id = "easy">Easy</span>
                        <span class = 'level not-selected' id = "medium">Medium</span>
                        <span class = 'level not-selected' id = "hard">Hard</span>
                    </div>

                    <div class='start'> Start </div>
                </div>

                <div class = 'ingame' id="human">It's your turn ...</div>
                <div class = 'ingame' id="won">You won !</div>
                <div class = 'ingame' id="lost">You lost !</div>
                <div class = 'ingame' id="draw">It's a Draw</div>
                <div class='reset'> Reset </div>
            </div>
        </div>
    </body>
</html>
