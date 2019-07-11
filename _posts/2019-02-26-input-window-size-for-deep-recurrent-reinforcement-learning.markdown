---
layout: post
title:  "Input Window Size for Deep Recurrent Reinforcement Learning"
date:   2019-02-26 09:01:56 +0000
categories: machine learning, reinforcement learning
---

<html>
    <body>
        <p>
    Deep Recurrent Reinforcement Learning makes use of a Recurrent Neural Network (RNN), such as Long Short-Term Memory (LSTM) or Gated Recurrent Unit (GRU) based networks, for learning a value function that maps environment states to action values. Recurrent Neural Networks are useful for modeling time-series data since the network maintains a memory, learning to retain useful information from inputs of prior model inferences. Every time the model is called, the memory is updated in correspondence with the current inputs.</p>
      <p>
    RNN memory states can be highly effective, but problems may arise when input data is missing information or contains noise. A single time-step of input data that is particularly corrupt can cause faulty alterations to the network’s memory, possibly erasing vital information that is needed for future time-steps. In this post, we will look at widening our model input window as an attempt to combat the fragility of RNN hidden memory against noisy inputs.</p>
<h1>Time-series Input Windows</h1>
<p>One noisy input can severely corrupt a RNN’s memory. In order to give our model inputs more stability, we will include previous time-steps as part of our model input. For example, an input window of size 4 will include our current time-step along with the 3 previous time-steps. The intuition for this is that the noise contained in a single time-step may be tamed by the context of the other time-steps within the window. We will look at the results of using inputs with time-series windows of 1, 4, 8, 16, and 32 in a Deep Recurrent Reinforcement Learning Setting.</p>
<h1>Data and Model</h1>
<p>For this test, we will use pseudo-randomly generated data as described in a previous post <a href="https://emuccino.github.io/machine/learning,/lstm,/recurrent/nerual/network/2019/02/11/training-recurrent-neural-networks-on-long-sequences.html">Training Recurrent Neural Networks on Long Sequences</a>. The data is generated from an underlying wave function with stochastically varying amplitudes and additional Gaussian noise. The generated data will be treated as if it were Price data for a commodity that we can buy or sell. Our model will learn a value function, predicting the future returns of buying or selling the commodity at each time-step. The training data outputs are calculated using Bellman’s Q-Value equation as discussed by Gayatri Vadali in her post <a href="https://medium.com/mindboard/q-matrix-update-to-train-deep-recurrent-q-network-more-effectively-de616e7c72fa">Q Matrix Update to train Deep Recurrent Q Networks More Effectively</a>. We generate 20 sequences, using 15 sequences for training and 5 for testing.</p>
<p>Our model consists of a single GRU layer with 16 neurons. After training our network to map current Price values to future action-reward values, we use our network to decide actions during a trading simulation with our training and testing data. We train each model for 300 epochs and test every 50 epochs through trading simulation.</p>
<h1>Results</h1>
      <p>First, we examine simulation profit for each model using training data.</p>
    <img src="/assets/images/post7_fig1.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
    <center>Input Window Size: Dark Blue=1, Pink=4, Green=8, Red=16, Light Blue=32</center>
        <br>
<p>We see that the larger our input window is, the better the model performs. This is not surprising since more inputs provides the model with more unique input signatures, making the mapping of inputs to outputs of the training data an easier task. A input window of 1 can barely learn a profitable value function because the noise within the data is too substantial. However, providing our model with an input window of 32 allows us to effortlessly learn an accurate value function.</p>
<h1>Test Data Results (Profit v Epoch)</h1>
<p>Let’s examine the performance of each model over the test data.</p>
    <img src="/assets/images/post7_fig2.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
    <center>Input Window Size: Dark Blue=1, Pink=4, Green=8, Red=16, Light Blue=32</center>
        <br>
<p>Unsurprisingly, a window of size 1 does not produce a profit. As we increase the window size to 4 and 8, our model is able to learn a value function that profits over the test data. However, further increasing the window size to 16 causes a decline in performance. A window size 32 is not capable of profiting at all. For this particular combination of data and neural network model, an input window size of 8 has the best performance on our validation data out of the 5 window sizes that were tested.</p>
<h1>Conclusion and Future Work</h1>
<p>In this post, we have explored the effects of increasing the time-series input window to help manage the impact of noisy data on RNN memory states in the Deep Recurrent Reinforcement Learning setting. An experiment has shown that increasing the input window can benefit model performance. A window that is too large, however, can potentially lead to over-fitting, degrading model performance.</p>
<p>Appropriate window size will certainly vary from problem to problem, depending on the data and model being used. For future work, window size could be examined in conjunction with model regularization, which was not used in this experiment. Model regularization such as L2-norm or dropout may allow the use of larger window sizes that otherwise would cause over-fitting.</p>
        </body></html>
