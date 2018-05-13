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
<pre>
Generator:
_________________________________________________________________
Layer                        Output Shape              Param #   
=================================================================
Input Layer                  (None, 64)                0         
_________________________________________________________________
Reshape                      (None, 1, 1, 64)          0         
_________________________________________________________________
Convolutional 2D Transpose   (None, 2, 4, 256)         131328    
_________________________________________________________________
Batch Normalization          (None, 2, 4, 256)         1024      
_________________________________________________________________
ReLU                         (None, 2, 4, 256)         0         
_________________________________________________________________
Convolutional 2D Transpose   (None, 4, 8, 128)         819328    
_________________________________________________________________
Batch Normalization          (None, 4, 8, 128)         512       
_________________________________________________________________
ReLU                         (None, 4, 8, 128)         0         
_________________________________________________________________
Convolutional 2D Transpose   (None, 8, 16, 64)         204864    
_________________________________________________________________
Batch Normalization          (None, 8, 16, 64)         256       
_________________________________________________________________
ReLU                         (None, 8, 16, 64)         0         
_________________________________________________________________
Convolutional 2D Transpose   (None, 16, 32, 32)        51232     
_________________________________________________________________
Batch Normalization          (None, 16, 32, 32)        128       
_________________________________________________________________
ReLU                         (None, 16, 32, 32)        0         
_________________________________________________________________
Conv 2D Transpose (Tanh)     (None, 32, 64, 1)         801       
=================================================================
Total params: 1,209,473
Trainable params: 1,208,513
Non-trainable params: 960


Discriminator:
_________________________________________________________________
Layer                        Output Shape              Param #   
=================================================================
Input Layer                  (None, 32, 64, 1)         0         
_________________________________________________________________
Convolutional 2D             (None, 16, 16, 16)        416       
_________________________________________________________________
Batch Normalization          (None, 16, 16, 16)        64        
_________________________________________________________________
Leaky ReLU                   (None, 16, 16, 16)        0         
_________________________________________________________________
Convolutional 2D             (None, 8, 8, 32)          12832     
_________________________________________________________________
Batch Normalization          (None, 8, 8, 32)          128       
_________________________________________________________________
Leaky ReLU                   (None, 8, 8, 32)          0         
_________________________________________________________________
Convolutional 2D             (None, 4, 4, 64)          51264     
_________________________________________________________________
Batch Normalization          (None, 4, 4, 64)          256       
_________________________________________________________________
Leaky ReLU                   (None, 4, 4, 64)          0         
_________________________________________________________________
Convolutional 2D             (None, 2, 2, 128)         73856     
_________________________________________________________________
Batch Normalization          (None, 2, 2, 128)         512       
_________________________________________________________________
Leaky ReLU                   (None, 2, 2, 128)         0         
_________________________________________________________________
Convolutional 2D             (None, 1, 1, 256)         295168    
_________________________________________________________________
Batch Normalization          (None, 1, 1, 256)         1024      
_________________________________________________________________
Leaky ReLU                   (None, 1, 1, 256)         0         
_________________________________________________________________
Convolutional 2D (Sigmoid)   (None, 1, 1, 1)           257       
_________________________________________________________________
Flatten                      (None, 1)                 0         
=================================================================
Total params: 435,777
Trainable params: 434,785
Non-trainable params: 992


GAN:
_________________________________________________________________
Layer                        Output Shape              Param #   
=================================================================
Input Layer                  (None, 64)                0         
_________________________________________________________________
generator (Model)            (None, 32, 64, 1)         1209473   
_________________________________________________________________
discriminator (Model)        (None, 1)                 435777    
=================================================================
Total params: 1,645,250<br>
Trainable params: 1,208,513<br>
Non-trainable params: 436,737<br>
_________________________________________________________________</pre>
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
