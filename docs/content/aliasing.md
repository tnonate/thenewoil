# Aliasing

Aliasing solves the problem of having to keep track of multiple different files with the same content. For example the frontpage. Usually websites want to have a page on the index or `/` path. Since all of the content is highly recommended to be namespaced under folder with the language-code as name we need a way to hoist the `/en/` file up to the `/` path. That is where aliases come in.

In the root directory of the project there should be a file called `aliases.json`. It is a JSON formatted file that takes an array of objects. The objects are **REQUIRED** to have a valid source and target key. These paths are taken relative from the `/src/pages/` directory.

The following is an example of the contents of `aliases.json`:

```json
[
    {
        "source": "en/index.mdx",
        "target": "index.mdx"
    }
]
```

Since these are hardlinks it is highly discouraged that you commit them to the Git repository. Make sure to add the created alias file to the `.gitignore` file.

```py
# Alias files
src/pages/index.mdx
```
