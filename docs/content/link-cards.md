# Link Cards

Link cards are visual preview cards for external links, similar to the "bookmark cards" in Ghost. Instead of a plain text link, readers see a styled card with the linked page's title, description, thumbnail, and domain — all self-hosted, with no iframes, third-party scripts, or changes to the site's Content Security Policy.

## How it works

Link cards are built in **two stages**:

1. **Fetching (manual).** A script scans `src/pages` for `<LinkCard url="..." />` usage, visits each URL, reads its Open Graph metadata (the `og:title`, `og:description`, and `og:image` tags that most websites provide for social media previews), downloads the thumbnail image, and saves everything to a cache.
2. **Rendering (automatic).** When the site builds, the `LinkCard.astro` component looks up each URL in that cache and renders a styled card. If a URL isn't in the cache — because the fetch failed or the script was never run — the component still renders a plain fallback card showing the domain and URL. **A bad link never breaks the build.**

The cache and thumbnails are committed to the repository, so builds don't need network access and are fully reproducible.

## Using a link card

Link cards can only be used in `.mdx` files, not plain `.md` (this is an Astro limitation — components don't work in regular markdown). Add the import and use it like any other component:

```mdx
import LinkCard from "@components/LinkCard.astro";

Check out this post:

<LinkCard url="https://ghost.thenewoil.org/why-i-hate-samsung/" />

The component accepts a single prop: url (the full https:// URL to link to).

## Fetching previews
After adding or changing a <LinkCard url="..." /> in any page, run:

`npm run scripts:fetch-links`

The script will:

* Scan all .md and .mdx files under `src/pages` for LinkCard usage
* Fetch previews for any URLs not already in the cache (cached URLs are never re-fetched)
* Download thumbnails to `src/assets/link-previews/`
* Save metadata to `src/assets/data/link-previews/link-previews.json`
* Always commit the cache JSON and the downloaded thumbnail images together with your page changes — like `src/assets/data/blog-pages.json`, they belong in the repository.

If the script fails to fetch some URLs (the site is down, or it has no Open Graph tags), it lists the failures and exits with code 1, but the cache still saves. The affected cards simply render the fallback version. Failed URLs are retried the next time you run the script.

## Refreshing a stale preview
If a linked page changes its title or thumbnail and you want the card updated, delete that URL's entry from `src/assets/data/link-previews/link-previews.json` and re-run npm run `scripts:fetch-links`. If the page had a thumbnail that no longer matches, the old image file in `src/assets/link-previews/` can be deleted too; a new one (with a new hash) will be downloaded.
