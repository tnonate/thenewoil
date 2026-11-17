// Fetches Open Graph metadata for every <LinkCard url="..." /> in src/pages,
// downloads thumbnails, and writes a cache consumed by LinkCard.astro at build time.
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "src", "pages");
const DATA_DIR = path.join(ROOT, "src", "assets", "data", "link-previews");
const CACHE_PATH = path.join(DATA_DIR, "link-previews.json");
const IMAGE_DIR = path.join(ROOT, "src", "assets", "link-previews");

const LINK_CARD_PATTERN = /<LinkCard\s+[^>]*url=["']([^"']+)["'][^>]*>/g;

interface LinkPreview {
  url: string;
  host: string;
  title: string;
  description?: string;
  image?: string; // file name inside src/assets/link-previews
  fetchedAt: string;
}

const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory()
        ? walk(full)
        : Promise.resolve(/\.(md|mdx)$/i.test(entry.name) ? [full] : []);
    }),
  );
  return results.flat();
}

async function collectUrls(): Promise<string[]> {
  const files = await walk(PAGES_DIR);
  const urls = new Set<string>();
  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    for (const match of content.matchAll(LINK_CARD_PATTERN)) {
      urls.add(match[1]);
    }
  }
  return [...urls];
}

function decodeEntities(text: string): string {
  const named: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };
  return text
    .replace(/&(amp|lt|gt|quot|#39|apos);/g, (m) => named[m])
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

/** Reads <meta property|name="key" content="..."> in either attribute order. */
function metaContent(html: string, key: string): string | undefined {
  const forward = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']*)["']`,
    "i",
  );
  const reverse = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${key}["']`,
    "i",
  );
  return (
    html.match(forward)?.[1] ?? html.match(reverse)?.[1] ?? undefined
  );
}

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; TheNewOilLinkCard/1.0; +https://thenewoil.org)",
      Accept: "text/html",
    },
  });
  if (!response.ok) {
    throw new Error(`status ${response.status}`);
  }
  return response.text();
}

async function downloadImage(
  previewUrl: string,
  imageUrl: string,
): Promise<string | undefined> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`image status ${response.status}`);
  }
  const contentType = response.headers.get("content-type")?.split(";")[0] ?? "";
  const extension = IMAGE_EXTENSIONS[contentType.trim()];
  if (!extension) return undefined; // unknown image type: skip thumbnail

  const fileName =
    // Deterministic name from the *page* URL so the cache entry stays stable
    `${crypto.createHash("sha1").update(previewUrl).digest("hex")}${extension}`;

  // Skip download if we already have the file
  const destination = path.join(IMAGE_DIR, fileName);
  try {
    await fs.access(destination);
    return fileName;
  } catch {
    /* not cached yet */
  }
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
  return fileName;
}

async function buildPreview(url: string): Promise<LinkPreview> {
  const html = await fetchPage(url);
  const title =
    decodeEntities(metaContent(html, "og:title") ?? "") ||
    decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "") ||
    url;
  const rawDescription =
    metaContent(html, "og:description") ?? metaContent(html, "description");
  const description = rawDescription
    ? decodeEntities(rawDescription).slice(0, 280)
    : undefined;
  const ogImage = metaContent(html, "og:image");

  let image: string | undefined;
  if (ogImage) {
    try {
      image = await downloadImage(url, new URL(ogImage, url).toString());
    } catch (error) {
      console.warn(`Could not download thumbnail for ${url}: ${error}`);
    }
  }

  return {
    url,
    host: new URL(url).hostname,
    title,
    description,
    image,
    fetchedAt: new Date().toISOString(),
  };
}

async function main() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(IMAGE_DIR, { recursive: true });

  let cache: Record<string, LinkPreview> = {};
  try {
    cache = JSON.parse(
      (await fs.readFile(CACHE_PATH, "utf8")).toString(),
    ) as Record<string, LinkPreview>;
  } catch {
    /* no cache yet — start fresh */
  }

  const urls = await collectUrls();
  console.log(`Found ${urls.length} LinkCard URL(s) in src/pages`);

  let fetched = 0;
  let failed = 0;
  const failures: string[] = [];

  for (const url of urls) {
    if (cache[url]) {
      continue; // already cached — never refetch on reruns
    }
    try {
      cache[url] = await buildPreview(url);
      fetched += 1;
      console.log(`Fetched preview for ${url}`);
    } catch (error) {
      failed += 1;
      failures.push(`${url} (${error instanceof Error ? error.message : error})`);
      console.error(`Failed to fetch ${url}: ${error}`);
    }
    await wait(500); // be polite between requests
  }

  await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2));

  console.log(
    `Done: ${fetched} new preview(s), ${failed} failed, ` +
      `${Object.keys(cache).length} total cached.`,
  );
  if (failed > 0) {
    console.error("Failures:");
    failures.forEach((entry) => console.error(` - ${entry}`));
    process.exitCode = 1;
  }
}

await main();
