---
title: "Markup: Syntax Highlighting"
excerpt: "Post displaying the various ways of highlighting code in Markdown."
last_modified_at: 2018-01-03T09:45:06-05:00
header:
  teaser: "assets/images/markup-syntax-highlighting-teaser.jpg"
tags: 
  - markup
toc: true
---

## Step 1: Remove Theme Files 

Remove `_includes`, `_layouts`, `_sass`, `assets` folders and files within. 

## Step 2: Update `Gemfile`

Replace `gem "github-pages` or `gem "jekyll"` with `gem "jekyll", "~> 3.3.0"`. 

**Please Note:** Paths for image headers, overlays, teasers, [galleries]({{ "/docs/helpers/#gallery" | absolute_url }}), Instead of just `image: filename.jpg` you'll need to use the full path eg: `image: assets/images/filename.jpg`. 
{: .notice--danger}

You'll also needs to:

- [`_data/ui-text.yml`](https://github.com/mmistakes/minimal-mistakes/blob/master/_data/ui-text.yml) - UI text [documentation]({{ "/docs/ui-text/" | absolute_url }})

Syntax highlighting is a feature that displays source code[^1]

[^1]: <http://en.wikipedia.org/wiki/Syntax_highlighting>

### GFM Code Blocks

Markdown [fenced code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) are supported. `/_sass/syntax.scss`.

```css
#container {width: 100%;}
```

{% highlight scss %}
.highlight {margin: 0;}
{% endhighlight %}

```html
{% raw %}<nav class="pagination" role="navigation">
</nav><!-- /.pagination -->{% endraw %}
```


### Jekyll Highlight Tag

An example of a code blocking using [`{% raw %}{% highlight %}{% endraw %}` tag](https://jekyllrb.com/docs/templates/#code-snippet-highlighting).

{% highlight javascript linenos %}
// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips HTML files for production
gulp.task('html', () => {
  return gulp.src(paths.siteFolderName + paths.htmlPattern)
    .pipe(when(argv.prod, gulp.dest(paths.siteFolderName)))
});
{% endhighlight %}

{% highlight wl linenos %}
Module[{},
  Sqrt[2]
  4
]
{% endhighlight %}

### GitHub Gist Embed

An example of a Gist embed below.

<script src="https://gist.github.com/mmistakes/77c68fbb07731a456805a7b473f47841.js"></script>