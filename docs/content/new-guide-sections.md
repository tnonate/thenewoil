# Creating a new section

Create a folder under the guides folder with the section name. Inside of the folder, Create a new `index.mdx`. This will be treated like a page with the routing of the section. For example, an `index.mdx` file under the "Most Important" section will have the routing of `/guides/most-important`. The `index.mdx` are also given 2 extra frontmatter properties. For example:

```yaml
---
layout: "@layouts/guides.astro"
title: Introduction
section_title: Prologue
section_weight: 100
weight: 1
draft: false
---
```

The `section_title` is used to be shown in the sidebar. The `section_weight` is how the section will be ordered in the sidebar. Any additional pages under this folder will be considered as part of the section. The section will automatically be added to the sidebar and pages can be automatically generated using the component `<GuidesList />` with the `index.mdx` file.
