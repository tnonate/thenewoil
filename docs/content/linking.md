# Linking

## Linking in regular pages

For the following examples we will be referencing the following project structure:

```console
/src
    /public
        /research-paper.pdf
        /linked-image.png
        /images
            /nested-image.png
    /pages
        /en
            /index.mdx
            /about.mdx
        /nl
            /index.mdx
            /about.mdx
```

### Inter-language linking

If we wanted to links to `/src/pages/en/about.mdx` from `/src/pages/en/index.mdx` we would want to do the following:

```md
<!-- Content of /src/pages/en/index.mdx -->
[About us](/about)
```

In the rendered HTML this link will become:

```html
<!-- Output HTML of /src/pages/en/index.mdx  -->
<a href="/en/about" hreflang="en">About us</a>
```

The same would count for the Dutch version.

```md
<!-- Content of /src/pages/nl/index.mdx -->
[Over ons](/about)
```

However because it is under `/nl` instead of `/en` it will render out as follows:

```html
<!-- Output HTML of /src/pages/nl/index.mdx -->
<a href="/nl/about" hreflang="nl">Over ons</a>
```

### Linking to non-internationalized content

What about non-internationalized content, like images or other downloadable content? Because we automatically prefix links that do not have a valid language code in it (e.g. `/en` or `/nl`), we have to put a prefix in front of the links to make it not prefix them with a language. By default this prefix is `*PUBLIC*`. Here are a few examples:

```md
[View this image](*PUBLIC*/linked-image.png)

[View this other image](*PUBLIC*/images/nested-image.png)

[View this research paper](*PUBLIC*/research-paper.pdf)

[Absolute link to the about page](*PUBLIC*/en/about)
```

These would render out to:

```html
<a href="/linked-image.png">View this image</a>

<a href="/images/nested-image.png">Over ons</a>

<a href="/research-paper.pdf">View this research paper</a>

<a href="/en/about" hreflang="en">Absolute link to the about page</a>
```

### Other links

A note on relative links, links with protocols, or links that go to other websites, these are **NOT** transformed by internationalization.

Examples of relative links are:

- `../less-important/misc`
- `./moderately-important/devices`
- `most-important/`

Examples of links with protocols / links that go to other websites:

- `https://www.example.com`
- `file:///C:/some/dir/file.pdf`
- `blog.thenewoil.org`
  - _(Note that this link is also not valid)_
