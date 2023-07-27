import CollectionMeta from "./CollectionMeta.js";

interface CollectionResponse {
  code: number;
  data: {
    style_sheet: string;
    url: string;
  } & CollectionMeta;
}

export default CollectionResponse;
