---
layout: post
title:  "Natural Language Processing: Sentiment Analysis"
date:   2018-02-13 02:40:08 +0000
categories: machine learning, game
jsarr:
- _js/jquery-1.10.1.min.js
- _js/goodset.json
- _js/badset.json
- _js/sentiment.js
---

<html>
    <body class = "post3">
    <p>Here is a program that uses a Naive Bayes algorithm on a albeled sentiment dataset that can be found <a href="https://archive.ics.uci.edu/ml/datasets/Sentiment+Labelled+Sentences" target="_blank">here</a>.</p>
    <p>Enter a sentimentally charged line of English text in the textbox to have it classified.</p>
        <div>
            <p>
            Text: <input type="text" id="input" rows="3" cols="80"/></p>
            <input type="submit" value="Submit" id="submit"/>
        </div>
        <div id="elements">
            <div class="bar"><b>Good  </b><div class="meter"><span style="width: 50%" class="good"></span></div></div>
            <div class="bar"><b>Bad  </b><div class="meter"><span style="width: 50%" class="bad"></span></div></div>
        </div>
        <div><p id = "result"></p></div>
    </body>
</html>
