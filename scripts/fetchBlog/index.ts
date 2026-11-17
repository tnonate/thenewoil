import path from "node:path";
import process from "node:process";
import BlogStore from "./BlogStore.js";
import Post from "./models/Post.js";
import WriteAsClient, { POSTS_PER_PAGE } from "./WriteAsClient.js";

const COLLECTION_NAME = "thenewoil";

const blogStore = new BlogStore({
  metaStoragePath: path.join(
    process.cwd(),
    "src",
    "assets",
    "data",
    "blog-index",
    "blog-meta.json",
  ),
  postsStoragePath: path.join(
    process.cwd(),
    "src",
    "assets",
    "data",
    "blog-index",
    "blog-pages.json",
  ),
});
const writeAsClient = new WriteAsClient();

const storedMeta = await blogStore.GetBlogMeta();
let storedPosts = await blogStore.GetBlogPosts();

const fetchedMeta = await writeAsClient.FetchCollection(COLLECTION_NAME);

if (typeof fetchedMeta === "number") {
  console.error(
    `Could not fetch collection "${COLLECTION_NAME}" (status ${fetchedMeta}). Aborting without modifying local data.`,
  );
  process.exit(1);
}

const meta = fetchedMeta;

if (storedPosts.length > storedMeta.total_posts) {
  const sliceStart = storedPosts.length - storedMeta.total_posts;
  storedPosts =
    storedMeta.total_posts === 0 ? [] : storedPosts.slice(sliceStart);
}

const deltaTotalPosts = meta.total_posts - storedMeta.total_posts;

if (deltaTotalPosts > 0) {
  const pagesToRetrieve = Math.ceil(deltaTotalPosts / POSTS_PER_PAGE);
  let index = 0;

  console.log("Fetching posts", deltaTotalPosts, "new posts");
  const fetchedPosts = await new Promise<Post[]>((resolve) => {
    let fetchedPosts: Post[] = [];

    const createFetchTask = async () => {
      index += 1;
      console.log("Fetching", index, "from the", pagesToRetrieve);

      const pageNumber = pagesToRetrieve - (index - 1);
      const response = await writeAsClient.FetchCollectionPage(
        COLLECTION_NAME,
        pageNumber,
      );

if (typeof response === "number") {
  if (response === 429) {
    console.log(
      "Write.as has rate limited the fetch-script, saving current posts. Restart the script later.",
    );
  } else {
    console.error(
      `Write.as returned unexpected status ${response} for page ${pageNumber} — saving partial data.`,
    );
    process.exitCode = 1;
  }
  return resolve(fetchedPosts);
}

      const [, posts] = response;

      console.log("Fetched page", pageNumber, "successfully! \n");
      fetchedPosts = fetchedPosts.concat(posts);

      if (index < pagesToRetrieve) {
        console.log("Waiting 30 seconds before fetching the next.");
        setTimeout(createFetchTask, 30000);
      } else {
        return resolve(fetchedPosts);
      }
    };

    createFetchTask();
  });

  console.log(fetchedPosts.length);

  console.log("Sorting posts by newest date");
  let updatedPosts = storedPosts.filter(
    (storedPost) =>
      fetchedPosts.findIndex(
        (fetchedPost) => fetchedPost.id === storedPost.id,
      ) === -1,
  );

  console.log(updatedPosts.length);

  updatedPosts = updatedPosts.concat(fetchedPosts);

  console.log(updatedPosts.length);

// If the script was not able to fetch all posts, adjust the metadata to reflect it
if (updatedPosts.length !== meta.total_posts) {
  console.warn(
    `Incomplete run: saved ${updatedPosts.length} posts but Write.as reports ${meta.total_posts}.`,
  );
  meta.total_posts = updatedPosts.length;
  process.exitCode = 1;
}

console.log("Saving posts to file");
await blogStore.SaveBlogPosts(updatedPosts);
} else {
  console.log("It seems like you are up-to-date!");
}

await blogStore.SaveBlogMeta(meta);
