import fs from "node:fs/promises";
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

const meta = await writeAsClient.FetchCollection(COLLECTION_NAME);

if (storedPosts.length > storedMeta.total_posts) {
  const sliceStart = storedPosts.length - storedMeta.total_posts;
  storedPosts =
    storedMeta.total_posts === 0 ? [] : storedPosts.slice(sliceStart);
}

const deltaTotalPosts = meta.total_posts - storedMeta.total_posts;

if (deltaTotalPosts > 0) {
  const pagesToRetreive = Math.ceil(deltaTotalPosts / POSTS_PER_PAGE);
  let index = 0;

  console.log("Fetching posts", deltaTotalPosts, "new posts");
  const fetchedPosts = await new Promise<Post[]>((resolve, reject) => {
    let fetchedPosts: Post[] = [];

    const createFetchTask = async () => {
      index += 1;
      console.log("Fetching", index, "from the", pagesToRetreive);

      const pageNumber = pagesToRetreive - (index - 1);
      const response = await writeAsClient.FetchCollectionPage(
        COLLECTION_NAME,
        pageNumber,
      );

      if (typeof response === "number") {
        if (response === 429) {
          console.log(
            "Write.as has rate limited the fetch-script, saving current posts. Restart the script later.",
          );
        }
        return resolve(fetchedPosts);
      }

      const [, posts] = response;

      console.log("Fetched page", pageNumber, "succesfully! \n");
      fetchedPosts = fetchedPosts.concat(posts);

      if (index < pagesToRetreive) {
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

  // If the script was not able to fetch all scripts, adjust the metadata to reflect it
  if (updatedPosts.length !== meta.total_posts) {
    meta.total_posts = updatedPosts.length;
  }

  console.log("Saving posts to file");
  blogStore.SaveBlogPosts(updatedPosts);
} else {
  console.log("It seems like you are up-to-date!");
}

await blogStore.SaveBlogMeta(meta);
