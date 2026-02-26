# Icons

Within `.mdx` and `.astro` you are able to use icons. To allow for this we use "[astro-icon](https://github.com/natemoo-re/astro-icon#readme)" which is able to take icons from various [icon sets](https://icon-sets.iconify.design). Currently most icons are from [Material Design Icons (MDI)](https://icon-sets.iconify.design/mdi/), but others can be used.

The following example shows how to use the Icon component in MDX. First you need to import the Icon component from `astro-icon` and then place it like a regular HTML element. Now specify an icon-name with the `name` attribute. If you wanted to add some extra styling to the icon (which will be passed through directly to the SVG element) you can do this with the `class` attribute.

```tsx
import { Icon } from "astro-icon/components";

<Icon name="mdi:house" class="size-7" />
```
