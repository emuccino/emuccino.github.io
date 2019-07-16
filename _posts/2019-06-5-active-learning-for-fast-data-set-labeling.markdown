---
layout: post
title:  "Active Learning for Fast Data Set Labeling"
date:   2019-06-5 11:40:30 +0000
categories: machine learning, active learning, semi-supervised learning
---

<html>
    <body>
        <p>
    Active learning is a special case of machine learning where a model can query a user for input. In this post, we will see how we can use active learning to label large data sets. For most machine learning tasks, large amounts of labeled data is needed is need for model training. However, the process of labeling data can be extremely time consuming and/or expensive. Using active learning, we can leverage a classification model to do most of the labeling for us, so that we only need to label samples when it is most needed.</p>
      <p>
    There are many different strategies that can be implemented for active learning labeling. Our experiments will use the following algorithm:</p>
<ol>
  <li>Hand label a small portion of the data set.</li>
  <li>Using our labeled data, train a classifier that returns classification probabilities.</li>
  <li>Use the trained classifier to predict class probabilities for all unlabeled data.</li>
  <li>Assume that all classifications are accurate if they have a probability above set threshold. Add these sample along with their predicted classes to the training set.</li>
  <li>Hand label some portion of the unlabeled data with the lowest predicted class probabilities.</li>
  <li>Repeat steps 2–5 until a small portion of unlabeled data remains.</li>
  <li>Hand label the remaining data.</li>
</ol>
<p>Using this method, we can obtain a labeled data set while only having to handle label a fraction of samples. The drawback is that there is no guarantee that all of the model predicted labels will be accurate. However, we can decrease the number of mislabeled data by increasing the number of hand labeled samples in steps 1 and 5, as well as increasing the probability threshold in step 4. A small amount of mislabeled data will have negligible effects on a classifier, assuming classes are well represented in the data.</p>
<h1>Experiment</h1>
<p>To test the productivity of this data labeling method, we will use it on the MNIST data set with 60,000 samples. Since the MNIST data set comes with labels, no actual hand labeling is required. We will be simulating hand labeling by using the true labels whenever we need samples hand labeled. For this experiment, we halt the process when there are fewer than 1% of unlabeled samples.</p>
<script src="https://gist.github.com/emuccino/960fdf978abdd979edd25c7a7a23d16a.js"></script>
<p>Here are the results from several trials with different hyper parameters.</p>
<img src="/assets/images/post10_fig1.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
        <br>
<ul>
  <li>Initial hand label: The proportion of data initially hand labeled in step 1</li>
  <li>Upper probability threshold: The minimum classification probability that the classifier must predict for a sample to be auto labeled</li>
  <li>Lower probability proportion: The percentage of unlabeled data with lowest classification probabilities that are hand labeled in step 5</li>
  <li>Number of iterations: The number of times steps 2–5 are repeated</li>
</ul>
<p>We can see that there is a trade off between number of hand labeled data samples and proportion of mislabeled samples. An upper probability threshold of 0.999999 produced the least number of mislabeled samples but took the most iterations to complete.</p>
<h1>Future Work</h1>
<p>There are many altercations we could make to the presented active learning algorithm for label sampling. For example, instead of auto-labeling samples with a class probability above a certain threshold, we can set a fixed number of samples to auto-label during step 4. Also, we could auto label the remaining labels in step 7 instead of hand labeling them. Experimenting with other variations may results in a more ultimate algorithm. Additionally, we can explore the results of active learning on more complex data sets or data sets with unbalanced classes.</p>
        </body></html>

