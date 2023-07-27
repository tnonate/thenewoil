# Layouts

Layouts provide an easy way to apply styles to multiple pages without having to repeat code.

## Creating a layout

Create a `.astro` file under the layouts folder. The `<slot />` element refers to the content from the page that uses this layout.

## Using a layout

In a page's frontmatter, link the layout property to the layout you want to use. For example:

```yaml
---
layout: "@layouts/default.astro"
---
```

See <https://docs.astro.build/en/core-concepts/layouts/> for more information.
