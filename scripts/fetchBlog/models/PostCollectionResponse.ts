import Post from "./Post.js";
import CollectionMeta from "./CollectionMeta.js";

interface PostCollectionResponse {
  code: number;
  data: {
    style_sheet: string;
    url: string;
    posts: Post[];
  } & CollectionMeta;
}

export default PostCollectionResponse;
