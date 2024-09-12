import fetch from "node-fetch";

import Post from "./models/Post.js";
import PostCollectionResponse from "./models/PostCollectionResponse.js";
import CollectionMeta from "./models/CollectionMeta.js";
import CollectionResponse from "./models/CollectionResponse.js";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
} as const;

export const POSTS_PER_PAGE = 10;

class WriteAsClient {
  async FetchCollection(name: string): Promise<CollectionMeta> {
    const rawResponse = await fetch(
      `https://write.as/api/collections/${name}`,
      {
        headers: { ...DEFAULT_HEADERS },
      },
    );

    const response = (await rawResponse.json()) as CollectionResponse;
    return new CollectionMeta(response.data);
  }

  async FetchCollectionPage(
    collectionName: string,
    page: number,
  ): Promise<number | [CollectionMeta, Post[]]> {
    try {
      const rawResponse = await fetch(
        `https://write.as/api/collections/${collectionName}/posts?body=html&page=${page}`,
        {
          headers: { ...DEFAULT_HEADERS },
        },
      );

      if (rawResponse.status !== 200) {
        return rawResponse.status;
      }

      const response = (await rawResponse.json()) as PostCollectionResponse;

      const collectionMeta = new CollectionMeta(response.data);
      const posts = response.data.posts.map((post) => new Post(post));

      return [collectionMeta, posts];
    } catch (error) {
      console.error(error);
      return 500;
    }
  }
}

export default WriteAsClient;
