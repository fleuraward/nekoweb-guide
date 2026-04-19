---
title: Getting Around
updated: 2026-03-20
layout: /main.njk
description: The Unofficial Nekoweb Documentaton
---
# Getting started - Elements.css, the sitebox and the postbox
*Last updated: <span class="lastupd">{{updated | formatDate}}</span>*
*Author: <a class="lastupd" href="https://layercake.moe/">June</a> and <a class="lastupd" href="https://nongmotrash.net/">Nongmotrash</a>*

A unique feature of nekoweb is being able to customize the preview of your website on the explore page, this is called the sitebox. You are also able to customize the postbox which holds your RSS posts on [the nekoweb feed](https://nekoweb.org/feed) and the follow iframe which you can add to your site.

<img src="/assets/getting-started/added-image-sitebox.png" alt="a screennshot of my sitebox, in the top right corner it has a logo added onto it">

You do not define the HTML for either of these. Customization is done through a special stylehsheet called **elements.css** which is used for both your sitebox and your postbox, with heavy use of the CSS `content` property to modify the elements that are already there.

<div class="note">

#### Previewing your sitebox and postbox
While you can simply search your name on the explore page and reload everytime you make a change, there is [an unofficial testing space for your elements.css configiration hosted by jb](https://jbc.lol/utils/nekobox/). This let's you see the effects of your changes instantly which is very nice. Be warned though, it doesn't test to check for the image limits (at least as of writing).

</div>

# Restrictions
The biggest restriction with elements.css is that image size is limited to 1MB, please make sure that your images are compressed and/or resized to appropriate sizes so it works in elements.css. If any of your images within your sitebox doesn't load, your css is reversed to default. 

Additionally, there's several CSS features that are restricted:

- any custom fonts (aka `@font-face`)
- animations using `@keyframes`

# Customizing the site box

As mentioned in the file itself, changing aspects in the sitebox must start with using the class `.site-box`.  There is a second alternative method to add a follow link to your site, as well. This is by using an a href link to 'https://nekoweb.org/follow/username.nekoweb.org', which will redirect you to a page asking if you would like to follow that user. If you use a custom domain, you should use that in place of the nekoweb subdomain.

## The preview screenshot
The default sitebox takes a screenshot of your website to use as a preview, selectable with `.site-box .sitefeature`. If desired, you can hide this with the following code:
```css
.site-box .sitefeature {
    display: none;
}
```

## Linking to images
You add images to your sitebox by linking to ones on your site, but the URL looks a little funky:
```css
url("https://USERNAME.nekoweb.org/USERNAME.nekoweb.org/PATH-TO-YOUR-IMAGE.png")
```

If you instead have a custom domain, change the *second* domain in the URL:
```css
url("https://USERNAME.nekoweb.org/YOUR-CUSTOM-DOMAIN/PATH-TO-YOUR-IMAGE.png")
```

(The reason it works like this is because a single account can have multiple websites).

## The follow button
There's two different components to the follow button. `.follow` selects specifically the follow iframe (which can also be used to add a follow button to your site):
```html
<iframe src="https://nekoweb.org/frame/follow" frameborder="0" width="170" height="28"></iframe>
```
Meanwhile, `.site-box .follow` is used to customise the follow symbol on your sitebox, which is shown as a [+] by default.
You can instead make it into an image like so:
```css
.site-box .follow {
    content: url ("image url");
    top: 10px;
    left: 10px;
    padding: 0px;
}
```
The `top` and `left` can be used to adjust the placement of the image.

## Adding extra images

Because we cannot modify the HTML to add new elements, you must instead rely on [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Pseudo-elements) for extra images. Make use of the `::before` and `::after` pseudo-elements, and use the `content` to assign them an image. For example:
```css
.site-box::after {
    content: url("image url");
    position: absolute;
    background-size: contain;
    top: -30px; /* for placement */
    right: 160px;
    width: 10px;
    height: 10px;
    z-index: 1;
}
```

# Customizing the post box

Work in progress section, refer to the default elements.css for guidance.

All aspects changing the postbox must start using the class `.post-box`. For a guide on how to set up an rss feed and thus utilise the postbox, you can see [Joosh's RSS Tutorial](https://help.joo.sh/rss).

# The default elements.css
For your reference.
```css
/*
    Don't use this file to edit your site style! Create a different CSS file for that.
    This file defines how custom elements (like sitebox) will look like.
    Setting CSS that breaks main nekoweb site on purpose is prohibited and may result in ban and site deletion!
*/

/* Must start with ".site-box". Change how your website will appear on main nekoweb site: https://nekoweb.org/assets/siteboxes.png */
.site-box {
    text-align: center;
    background-image: url(/assets/cookiebox.png); /* Only your-username.nekoweb.org URLs allowed, use FULL url to your file like https://your-username.nekoweb.org/your-username.nekoweb.org/bg.png */
    background-repeat: no-repeat;
    color: #b08271;
    font-size: 12px;
}
.site-box > a > p {
    color: var(--darkbrown);
    font-weight: bold;
}
.site-box > a > span {
    color: var(--darkbrown);
}

/* Style for your 'Follow on Nekoweb' button (<iframe src="https://nekoweb.org/frame/follow" frameborder="0" width="170" height="28"></iframe>) */
.follow {

}

/* Style for your post box (must start with ".post-box") */
.post-box {
    background-color: #fff2cc;
    border: 4px solid #ecbfa6;
    padding: 15px;
    border-radius: 5px;
    color: #634c53;
    font-weight: normal;
}

.post-box .post-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 0px;
}
```