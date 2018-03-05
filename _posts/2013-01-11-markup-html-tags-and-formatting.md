---
title: "Markup: HTML Tags"
header:
  teaser: "assets/images/markup-syntax-highlighting-teaser.jpg"
categories:
  - Markup
tags:
  - content
  - css
  - formatting
  - html
  - markup
toc: true
---


### Tags

Link [link](http://apple.com "Apple").
The abbreviation CSS stands for "Cascading Style Sheets".

*[CSS]: Cascading Style Sheets

Cite Tag         : <cite>Automattic</cite>

Strike Tag       : <strike>strikeout text</strike>.

Emphasize Tag    : _italicize_ 

Insert Tag       : <ins>inserted</ins>

Quote Tag        : <q>Developers&#8230;</q> &#8211;Steve Ballmer

Strong Tag       : **bold text**.

Subscript Tag    : H<sub>2</sub>O

Superscript Tag  : E = MC<sup>2</sup>

Preformatted Tag :

<pre>
.post-title {margin: 0 0 5px;}
</pre>


### Alignment

*italics* and  **bold**.

This is a paragraph. It should not have any alignment of any kind.

This is a paragraph. It should not have any alignment of any kind.{: style="text-align: left;"}

This is a paragraph. It should not have any alignment of any kind.{: style="text-align: center;"}

This is a paragraph. It should not have any alignment of any kind.{: style="text-align: right;"}

This is a paragraph. It should not have any alignment of any kind.{: style="text-align: justify;"}



A variety of common markup showing how the theme styles them.

## Header two

### Header three

#### Header four

##### Header five

###### Header six


Single line blockquote:

> Stay hungry. Stay foolish.

<cite>Steve Jobs</cite> --- Apple Worldwide Developers' Conference, 1997
{: .small}

## Tables

| Employee         | Salary |                                                              |
| --------         | ------ | ------------------------------------------------------------ |
| [John Doe](#)    | $1     | Because that's all Steve Jobs needed for a salary.           |

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |

## Definition Lists

Definition List Title
:   Definition list division.

#dowork
:   Coined by Rob Dyrdek and his personal body guard Christopher "Big Black" Boykins, "Do Work" works as a self motivator, to motivating your friends.

Do It Live
:   I'll let Bill O'Reilly [explain](https://www.youtube.com/watch?v=O_HyZ5aW76c "We'll Do It Live") this one.

## Unordered Lists (Nested)

  * List item one 
      * List item one 
          * List item one

## Ordered List (Nested)

  1. List item one 
      1. List item one 
          1. List item one

## Forms

<form>
  <fieldset>
    <legend>Personalia:</legend>
    Name: <input type="text" size="30"><br>
  </fieldset>
</form>

## Buttons

Make any link standout more when applying the `.btn` class.

```html
<a href="#" class="btn--success">Success Button</a>
```

[Default Button](#){: .btn}
[Primary Button](#){: .btn .btn--primary}
[Success Button](#){: .btn .btn--success}
[Warning Button](#){: .btn .btn--warning}
[Danger Button](#){: .btn .btn--danger}
[Info Button](#){: .btn .btn--info}
[Inverse Button](#){: .btn .btn--inverse}
[Light Outline Button](#){: .btn .btn--light-outline}
[X-Large Button](#){: .btn .btn--primary .btn--x-large}
[Large Button](#){: .btn .btn--primary .btn--large}
[Default Button](#){: .btn .btn--primary }
[Small Button](#){: .btn .btn--primary .btn--small}


## Notices

**Watch out!** This [emphasized](#) with the `{: .notice}` class.
{: .notice}

**Watch out!** This [emphasized](#) with the `{: .notice--primary}` class.
{: .notice--primary}

**Watch out!** This [emphasized](#) with the `{: .notice--info}` class.
{: .notice--info}

**Watch out!** This [emphasized](#) with the `{: .notice--warning}` class.
{: .notice--warning}

**Watch out!** This been [emphasized](#) with the `{: .notice--success}` class.
{: .notice--success}

**Watch out!** This been [emphasized](#) with the `{: .notice--danger}` class.
{: .notice--danger}

### Address Tag

<address>
  1 Infinite Loop<br /> Cupertino, CA 95014<br /> United States
</address>

