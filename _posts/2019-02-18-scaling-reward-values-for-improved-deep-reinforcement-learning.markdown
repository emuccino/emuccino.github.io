---
layout: post
title:  "Scaling Reward Values for Improved Deep Reinforcement Learning"
date:   2019-02-18 03:53:42 +0000
categories: machine learning, reinforcement learning
---

<html>
    <body>
        <p>
    Deep Reinforcement Learning involves using a neural network as a universal function approximator to learn a value function that maps state-action pairs to their expected future reward given a particular reward function. This can be done many different ways. For example, a Monte Carlo based algorithm will observe total rewards following state-action pairs from a complete episode to make build training data for the neural network. Alternatively, a Temporal Difference approach would use incremental rewards from single time-steps and bootstrap off of predicted future rewards from the latest version of the value function model. However, no matter what approach is taken, it is important that the neural network is being efficiently fitted to the data in order to optimize the learning algorithm. There are many factors that determine a neural networks ability to fit to training data. In this post we will examine how scaling our outputs can affect our rate of convergence.</p>
<h1>Scaling Model Outputs</h1>
<p>For the purposes of Reinforcement Learning, our neural network is learning to model the value function, mapping state-action pairs to future rewards. The rewards are unitless scalar values that are determined by a predefined reward function. The reinforcement agent uses the neural network value function to select actions, picking the action that is associated with the largest value. As the neural network performs a regression on observed state-action pairs and future reward values, the network weights are optimized to achieve minimal loss between network outputs and training data outputs. However, future reward values may be arbitrarily large or small, depending on how the reward function is defined. One reward function might produce of average reward on the order of one one-hundredth, while another could produce average rewards on the order a thousand. If the scale of our networks outputs are significantly different from that of our input features, the neural network will be forced to learn unbalanced distributions of weight and bias values, possibly inhibiting learning. To combat this, we will try scaling our output values to be unit normal before we start training. This does not affect the usability of our value function, because the action that corresponds with the largest future reward value will be the same whether the values are scaled or not.</p>
<h1>Experiment</h1>
<p>For this experiment, I use the same data and neural network architecture I had used in my previous post Training Recurrent Neural Networks on Long Sequences. Due to the reward function I have designed, the future reward values have an average order of magnitude of 100. To compare the effects of output scaling, one model is trained with original outputs, and a second model is trained with outputs scaled to be unit normal. Since the loss values are proportional to the magnitude of the outputs, the training loss curves can not be directly compared. Instead, we will take a look at each model’s accuracy.
    <br>
    <br>
    <img src="/assets/images/post6_fig1.png" style="display:block;margin-left:auto;margin-right: auto;width:auto;">
    <center>Stochastic Gradient Descent, Learning Rate = 0.01</center>        
        </p>

<h1>Conclusion</h1>
<p>Training neural networks can be difficult, particularly in the Deep Reinforcement Learning setting. Carefully structuring our data and neural network architecture is vital for getting the most out of our reinforcement learning algorithms. In this experiment, we conclude that scaling model outputs before training can significantly improve the rate of convergence and increase the final accuracy for our model.</p>
        </body></html>
