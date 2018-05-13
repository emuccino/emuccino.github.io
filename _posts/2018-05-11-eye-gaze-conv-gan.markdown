---
layout: post
title:  "Convolutional Generative Adversarial Network: Eye Gaze Image Generator"
date:   2018-05-11 02:40:08 +0000
categories: machine learning, gan
---

<html>
    <body>
        <p>
    A generative adversarial network (GAN) is a system composed of two neural networks: a generator and a discriminator. The discriminator takes a data instance as input, and classifies it as 'Real' or 'Fake' with respect to a training data set. The generator takes gaussian noise and transforms it into a a fake data instance with the goal of fooling the discriminator. The discriminator learns from errors when training on inputs from a data set and inputs created by the generater. The generater learns from errors in failed attempts at fooling the discriminator.</p>
        <p>    
    In an attempt to better understand the mechanics of generative adversarial networks, I developed a GAN model in Keras that uses convolutional neural networks to generate and discriminate images of human eyes with size 35 by 55 pixels. The project can be viewed     on Kaggle. Click <a href="https://www.kaggle.com/emuccino/eyegaze-convolutional-gan/code">here</a> to access the kernel.<br>
<br>    
Model architecture:<br>
<br>
Generator:<br>
_________________________________________________________________<br>
Layer                        Output Shape              Param #   <br>
=================================================================<br>
Input Layer                  (None, 64)                0         <br>
_________________________________________________________________<br>
Reshape                      (None, 1, 1, 64)          0         <br>
_________________________________________________________________<br>
Convolutional 2D Transpose   (None, 2, 4, 256)         131328    <br>
_________________________________________________________________<br>
Batch Normalization          (None, 2, 4, 256)         1024      <br>
_________________________________________________________________<br>
ReLU                         (None, 2, 4, 256)         0         <br>
_________________________________________________________________<br>
Convolutional 2D Transpose   (None, 4, 8, 128)         819328    <br>
_________________________________________________________________<br>
Batch Normalization          (None, 4, 8, 128)         512       <br>
_________________________________________________________________<br>
ReLU                         (None, 4, 8, 128)         0         <br>
_________________________________________________________________<br>
Convolutional 2D Transpose   (None, 8, 16, 64)         204864    <br>
_________________________________________________________________<br>
Batch Normalization          (None, 8, 16, 64)         256       <br>
_________________________________________________________________<br>
ReLU                         (None, 8, 16, 64)         0         <br>
_________________________________________________________________<br>
Convolutional 2D Transpose   (None, 16, 32, 32)        51232     <br>
_________________________________________________________________<br>
Batch Normalization          (None, 16, 32, 32)        128       <br>
_________________________________________________________________<br>
ReLU                         (None, 16, 32, 32)        0         <br>
_________________________________________________________________<br>
Conv 2D Transpose (Tanh)     (None, 32, 64, 1)         801       <br>
=================================================================<br>
Total params: 1,209,473<br>
Trainable params: 1,208,513<br>
Non-trainable params: 960<br>
<br>
<br>
Discriminator:<br>
_________________________________________________________________<br>
Layer                        Output Shape              Param #   <br>
=================================================================<br>
Input Layer                  (None, 32, 64, 1)         0         <br>
_________________________________________________________________<br>
Convolutional 2D             (None, 16, 16, 16)        416       <br>
_________________________________________________________________<br>
Batch Normalization          (None, 16, 16, 16)        64        <br>
_________________________________________________________________<br>
Leaky ReLU                   (None, 16, 16, 16)        0         <br>
_________________________________________________________________<br>
Convolutional 2D             (None, 8, 8, 32)          12832     <br>
_________________________________________________________________<br>
Batch Normalization          (None, 8, 8, 32)          128       <br>
_________________________________________________________________<br>
Leaky ReLU                   (None, 8, 8, 32)          0         <br>
_________________________________________________________________<br>
Convolutional 2D             (None, 4, 4, 64)          51264     <br>
_________________________________________________________________<br>
Batch Normalization          (None, 4, 4, 64)          256       <br>
_________________________________________________________________<br>
Leaky ReLU                   (None, 4, 4, 64)          0         <br>
_________________________________________________________________<br>
Convolutional 2D             (None, 2, 2, 128)         73856     <br>
_________________________________________________________________<br>
Batch Normalization          (None, 2, 2, 128)         512       <br>
_________________________________________________________________<br>
Leaky ReLU                   (None, 2, 2, 128)         0         <br>
_________________________________________________________________<br>
Convolutional 2D             (None, 1, 1, 256)         295168    <br>
_________________________________________________________________<br>
Batch Normalization          (None, 1, 1, 256)         1024      <br>
_________________________________________________________________<br>
Leaky ReLU                   (None, 1, 1, 256)         0         <br>
_________________________________________________________________<br>
Convolutional 2D (Sigmoid)   (None, 1, 1, 1)           257       <br>
_________________________________________________________________<br>
Flatten                      (None, 1)                 0         <br>
=================================================================<br>
Total params: 435,777<br>
Trainable params: 434,785<br>
Non-trainable params: 992<br>
<br>
<br>
GAN:<br>
_________________________________________________________________<br>
Layer                        Output Shape              Param #   <br>
=================================================================<br>
Input Layer                  (None, 64)                0         <br>
_________________________________________________________________<br>
generator (Model)            (None, 32, 64, 1)         1209473   <br>
_________________________________________________________________<br>
discriminator (Model)        (None, 1)                 435777    <br>
=================================================================<br>
Total params: 1,645,250<br>
Trainable params: 1,208,513<br>
Non-trainable params: 436,737<br>
_________________________________________________________________<br>
<br>
Key takeaways:<br>
- Batch normalization is necassary of convergence.
- In order for batch normalization to behave properly, the discriminator needs to use seperate batches for the real and fake data sets. 
- Setting the Adam optimization beta 1 hyperparamter to 0.5 produced better convergence than the default value of 0.9.
- The generator needs to be trained more often and requires a significantly smaler learning rate compared to the discriminator. My
  suspicion is that this is because my generator and discriminator have equally deep architectures. This gives the discriminator the
  advantage since it has significantly less outputs to learn.

Results:
The model had the best results with a generator learning rate of 0.00005 and discriminator learning rate of 0.02, training the generator five times and the discriminator once per batch.
        </p>
        <img src="/assets/gifs/eye_gan_generator2.gif">
    </body>
</html>
