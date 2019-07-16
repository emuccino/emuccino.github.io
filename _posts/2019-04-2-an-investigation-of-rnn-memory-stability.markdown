---
layout: post
title:  "An Investigation of RNN Memory Stability"
date:   2019-04-2 7:22:23 +0000
categories: machine learning, recurrent neural network, lstm, gru
---

<html>
    <body>
        <p>
    A Recurrent Neural Networks (RNN) is a class of Artificial Neural Network that contains connections along a temporal axis, producing a functioning memory of prior network inferences that influences the network’s output. Two of the most common types of RNN are the Long Short-Term Memory (LSTM) and Gated Recurrent Unit (GRU) cells. LSTMs and GRUs are designed for long-term memory capability. In both cases, the RNN cell maintains a hidden memory state that undergoes an alteration after every inference call.</p>
      <p>
    In this post, we conduct an experiment to investigate an inference call’s duration of influence on the memory of LSTM and GRU cells. In other words, we want to know how many time-steps an RNN can “remember.”</p>
<h1>Experiment</h1>
<p>For this experiment, we will generate a neural network that contains a single RNN layer (either LSTM or GRU), with Glorot Uniform weight initialization. We will call inference on the network using two different sequences of 100,000 time-steps each. The values of our sequences will be randomly generated from a normal distribution. The first 1,000 time-steps of each sequence will be unique. The remaining 99,000 time-steps, however, will be identical for both sequences. We want to see how many time-steps it takes for the networks to produce identical outputs following the 1,000th time-step where both input sequences become identical.</p>
<p>We hypothesize that the outcome of this experiment is dependent on the input size as well as number of neurons in our RNN layer. For this reason, the experiment is run for various input and RNN layer sizes, for both LSTM and GRU configurations. For every permutation of hyperparameters, the experiment is run 10 times, with randomized network weights and input sequence values for each run. Finally, we average the ten results for each hyperparameter permutation.</p>
<h1>Results</h1>
<p>The following table show the average number of time-steps it takes for the two sequences to converge to the same output values for each combination of input size and output size.</p>
<img src="/assets/images/post9_fig1.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
        <br>
<p>For the LSTM layer, as the output size increases, the LSTM is able to retain more long-term information. As the input size increases, however, the LSTM cell forgets past inputs more quickly.</p>
<img src="/assets/images/post9_fig2.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
        <br>
<p>Similarly to the LSTM layer, the GRU cell is able to retain more long-term information as the output size increases. As the input size increases, however, there is no clear effect on memory duration.</p>
<h1>Future Work</h1>
<p>For future work, a similar experiment could be run for deep RNN networks, with multiple LSTM or RNN layers. Also, it would be a good idea to analyze a trained network, rather than a a randomly initiated network, to see if there is a difference in memory dynamics.</p>
        </body></html>
