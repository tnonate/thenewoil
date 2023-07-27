# Create a new guide

To create a guide, create a page under the guides folder. There are 2 additional frontmatter properties for guides. For example:

```yaml
---
layout: "@layouts/guides.astro"
title: Understanding Surveillance
topic: How Surveillance Works
weight: 4
draft: false
---
```

The `topic` refers to how the page will be described as when used in a `GuidesList`. The `weight` is the order in which the page is shown in the sidebar.
