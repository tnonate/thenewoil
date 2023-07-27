# Internationalization

## Linking

For general linking refer to [Linking](./linking.md).

The TL;DR version is that if the following conditions are met it will get automatically internationalized:

- Writing `[Link to About](/about)` will navigate users to `/en/about`
- Only the `[]()` markdown syntax and `<a></a>` tags get affected. (`<img />` and others will stays the same)

If the following conditions are met the `<a>` will **not** be internationalized:

- A tags with the `hreflang` attribute set (e.g. `<a hreflang="en">`) do not get affected
- Relative links do not get affected (e.g. `../foo` or `./bar`)
- Writing `[Link to Dutch About](*PUBLIC*/nl/about)` will **always** navigate users to `/nl/about`

### Pages that don't exist in other languages

If a page exists in English, but they don't exist in for example Dutch, it will show the 404 page aka `404.html` to the user. If it doesn't it is.

### Images, Documents and others

Since most images are the same across different languages (e.g. logos, quotes, qr-codes or graphics) it does not get the same treatment as links. However if you link to a image, document or audio file **will** get internationalized.

#### Example

All of the following **will** be internationalized

```md

[Link to video](./video.mp4)
[Link to image](./image.png)
[Link to document](./document.pdf)

```

However, embedding them with the `![]()` syntax **will not** internationalize them, since those will not be transformed into `<a>` tags.

```md

![Link to video](./video.mp4)
![Link to image](./image.png)
![Link to document](./document.pdf)

```

## Adding new languages

Inside the `config.json` there is a key in the root object called `languages`. It takes an list of objects that have the following structure:

```json
{
    "code": "en",
    "name": "English",
    "weight": 1,
    "image": "/images/languages/en.svg",
    "isDefault": true
}
```

For more information about the `config.json` go to the [config docs](./config.md)

### Structure

The code is the language code that it will redirect pages to. Lets take a Dutch language as an example. If the code of Dutch would be `hello` when switching languages using the language switcher it will show `/hello/example`.

Since we are using file-system routing the pages for the Dutch language would have to be under `src/pages/hello/`
