---
layout: post
title:  "LSTM vs GRU: Experimental Comparison"
date:   2019-03-6 11:36:12 +0000
categories: machine learning, recurrent nerual network, lstm, gru
---

<html>
    <body>
        <p>
    A Recurrent Neural Network is a type of Artificial Neural Network that contains shared neuron layers between its inputs through time. This allows us to model temporal data such as video sequences, weather patterns or stock prices. There are many ways to design a recurrent cell, which controls the flow of information from one time-step to another. A recurrent cell can be designed to provide a functioning memory for the neural network. Two of the most popular recurrent cell designs are the Long Short-Term Memory cell (LSTM) and the Gated Recurrent Unit cell (GRU).</p>
      <p>
    In this post, we will take a brief look at the design of these cells, then run a simple experiment to compare their performance on a toy data set. I recommend visiting <a href="http://colah.github.io/posts/2015-08-Understanding-LSTMs/">Colah’s blog</a> for a more in depth look at the inner-working of the LSTM and GRU cells.</p>
<h1>Long Short-term Memory</h1>
<p>The LSTM cell maintains a cell state that is read from and written to. There are 4 gates that regulate the reading, writing, and outputting values to and from the cell state, dependent upon the input and cell state values. The first gate determines what the hidden state forgets. The next gate is responsible for determining what part of the cell state is written to. The third gate decides the contents that are written. Finally, the last gate reads from the cell state to produce an output.</p>
<img src="/assets/images/post8_fig1.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
    <center>LSTM cell, source: Colah’s blog</center>
        <br>
<h1>Gated Recurrent Unit</h1>
<p>The GRU cell is similar to the LSTM cell but with a few important differences. First, there is no hidden state. The cell state adopts the functionality of the hidden state from the LSTM cell design. Next, the processes of determining what the cell states forgets and what part of the cell state is written to are consolidated into a single gate. Only the portion of the cell state that has been erased is written to. Finally, the entire cell state is given as an output. This is different from the LSTM cell which chooses what to read from the cell state to produce an output. All of these changes together provides a simpler design with less parameters than the LSTM. Less parameters, however, may come at the cost of decreased expressibility.</p>
<img src="/assets/images/post8_fig2.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
    <center>GRU cell, source: Colah’s blog</center>
        <br>
<h1>Experimental Comparison</h1>
<p>To test the performance of the LSTM and GRU cells, I have trained two models, each with identical hyper-parameters, but one with an LSTM cell and the other with a GRU cell. The data is generated using an approach described in a previous post: <a href="https://medium.com/mindboard/training-recurrent-neural-networks-on-long-sequences-b7a3f2079d49">Training Recurrent Neural Networks on Long Sequences</a>. The models are trained on 40 sequences, each containing 20,000 time-steps. The data is provided to the models as a single batch. The LSTM and GRU cells are implemented using the default settings of the CuDNNLSTM and CuDNNGRU layers in Keras with Tensorflow 1.12.0 as the back end. Each model contains a single cell with 16 neurons. The Adam optimizer is used with a constant learning rate of 0.001 and clipnorm set to 1. Here are the loss curves after 1000 epochs:</p>
<img src="/assets/images/post8_fig3.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
    <center>Blue: LSTM, Orange: GRU</center>
        <br>

<h1>Conclusion and Future Work</h1>
<p>Despite having fewer parameters, the GRU model was able to achieve a lower loss after 1000 epochs. The LSTM model displays much greater volatility throughout its gradient descent compared to the GRU model. This may be due to the fact that there are more gates for the gradients to flow through, causing steady progress to be more difficult to maintain after many epochs. Additionally, the GRU model was able to train 3.84% faster than the LSTM model. For future work, different kernel and recurrent initializers could be explored for each cell type.</p>
        </body></html>

