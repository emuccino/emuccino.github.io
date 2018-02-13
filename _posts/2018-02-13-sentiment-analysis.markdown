---
layout: post
title:  "Senti"
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
        <p>
        Text: <input type="text" id="input" rows="3" cols="80"/><br><br>
        <input type="submit" value="Submit" id="submit"/>
        <div id="elements">
            <div class="bar"><b>Good  </b><div class="meter"><span style="width: 50%" class="good"></span></div></div>

            <div class="bar"><b>Bad  </b><div class="meter"><span style="width: 50%" class="bad"></span></div></div>
        </div>
        <div><p id = "result"></p></div>

        <script src="bad.json"></script>
        <script src="good.json"></script>
        <script src="sentiment.js"></script>
    </body>
</html>
