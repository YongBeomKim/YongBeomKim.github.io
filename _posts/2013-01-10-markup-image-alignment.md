---
title: "Markup: Image Alignment"
categories:
  - Markup
tags:
  - alignment
  - captions
  - content
  - css
  - image
  - markup
---

![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-580x300.jpg){: .align-center}

The image above happens to be **centered**.

![image-left]({{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-150x150.jpg){: .align-left} 
The rest of this paragraph is wrap around the 150×150 image **left aligned**.

And now for a **massively large image**. It also has **no alignment**.

![no-alignment]({{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-1200x4002.jpg)


![image-right]({{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-300x200.jpg){: .align-right}

And now we're going to shift things to the **right align**. Again, there should be plenty of room above, below, and to the left of the image. 

<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-580x300.jpg" alt="">
  <figcaption>Look at 580 x 300 getting some love.</figcaption>
</figure> 

The figure above happens to be **centered**. The caption also has a link in it, just to see if it does anything funky.

<figure style="width: 150px" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-150x150.jpg" alt="">
  <figcaption>Itty-bitty caption.</figcaption>
</figure> 

The rest of this paragraph is filler for the sake of seeing the text wrap around the 150×150 image, which is **left aligned**.

And now for a **massively large image**. It also has **no alignment**.

<figure style="width: 1200px">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-1200x4002.jpg" alt="">
  <figcaption>Massive image comment for your eyeballs.</figcaption>
</figure> 

The figure element above has an inline style of `width: 1200px` set which should break it outside of the normal content flow.

<figure style="width: 300px" class="align-right">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/image-alignment-300x200.jpg" alt="">
  <figcaption>Feels good to be right all the time.</figcaption>
</figure> 

And now we're going to shift things to the **right align**. Again, there should be plenty of room above, below, and to the left of the image. 