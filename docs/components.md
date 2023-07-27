# Components

Components are chunks of code and is helpful for reusability.

## Creating a component

Create a `.astro` file under the components folder. Inside of a code fence (`---`), you can write server-side javascript code. Anything after will be rendered as HTML. You can also add javascript expressions (inside `{}`) and other components.

## Using a component

### For Pages

To use components, first import it in the beginning of the content and use it like an HTML element. For example:

```tsx
import Button from '@components/charts/Button.astro';

<Button />
```

### For components

Import the component inside of the code fence and use it like an HTML element elsewhere. For example:

```tsx
---
import Button from '@components/charts/Button.astro';
---

<Button />
```

## Props

Like regular html components, astro components can be given properties or attributes for more functionality. To pass a prop, write attributes in the element with their assigned value. For example:

```tsx
<Button href="/" slot="action" variant="contained" color="primary" />
```

In the component itself, import the properties from `Astro.props`. For example:

```tsx
const {class: className = "", variant, color, bgColor } = Astro.props;
```

See <https://docs.astro.build/en/core-concepts/astro-components/> for more information.

## Components for pages

### Charts

- [Criterias](../src/components/charts/Criterias.astro) - Gives a chart of services based on criterias
- [Plans](../src/components/charts/Plans.astro) - Gives a chart of services based on each of their pricing tiers
- [ProsAndCons](../src/components/charts/ProsAndCons.astro) - Gives a chart of services based on their pros and cons

### Controls

- [Button](../src/components/controls/Button.astro) - Gives a clickable component to link

### Common

- [GuidesList](../src/components/common/GuidesList.astro) - Gives a list of guides under a section
- [Highlighting](../src/components/common/Highlighting.astro) - Highlights a block of text
- [LinkGrid](../src/components/common/LinkGrid.astro) - Gives a grid of linkable cards
