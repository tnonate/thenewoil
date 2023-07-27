import { PathLike } from "fs";
import fs from "fs/promises";
import CollectionMeta from "./models/CollectionMeta.js";
import Post from "./models/Post.js";
import compareDate from "./utils/compareDate.js";

export interface BlogStoreConfig {
  metaStoragePath: PathLike;
  postsStoragePath: PathLike;
}

const sortByMostRecentPost = (postA: Post, postB: Post) =>
  compareDate(
    new Date(postB.created.replace("-", "/")),
    new Date(postA.created.replace("-", "/"))
  );

class BlogStore {
  private config: BlogStoreConfig;

  constructor(config: BlogStoreConfig) {
    this.config = config;
  }

  async GetBlogMeta(): Promise<CollectionMeta> {
    const fileHandle = await fs.open(
      this.config.metaStoragePath,
      "a+" /* Opens/creates file for reading */
    );
    const fileContent = (await fileHandle.readFile()).toString();
    await fileHandle.close();

    // No collection meta stored
    if (fileContent.length === 0) {
      return new CollectionMeta({
        alias: "unknown",
        title: "unknown",
        description: "unknown",
        domain: "unknown",
        format: "blog",
        public: true,
        monetization_pointer: "unknown",
        total_posts: 0,
        views: 0,
      });
    }

    return JSON.parse(fileContent) as CollectionMeta;
  }

  async SaveBlogMeta(meta: CollectionMeta) {
    const fileHandle = await fs.open(
      this.config.metaStoragePath,
      "w+" /* Opens/creates file for writing */
    );
    await fileHandle.writeFile(JSON.stringify(meta));
    await fileHandle.close();
  }

  async GetBlogPosts(): Promise<Post[]> {
    const fileHandle = await fs.open(
      this.config.postsStoragePath,
      "a+" /* Opens/creates file for reading */
    );
    const fileContent = (await fileHandle.readFile()).toString();
    await fileHandle.close();

    if (fileContent.length === 0) return [];

    const posts = JSON.parse(fileContent) as Post[];
    posts.sort(sortByMostRecentPost);
    return posts;
  }

  async SaveBlogPosts(posts: Post[]) {
    posts.sort(sortByMostRecentPost);

    const fileHandle = await fs.open(
      this.config.postsStoragePath,
      "w+" /* Opens/creates file for writing */
    );
    await fileHandle.writeFile(JSON.stringify(posts));
    await fileHandle.close();
  }
}

export default BlogStore;
