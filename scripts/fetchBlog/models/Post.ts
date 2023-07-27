import { stripHtml } from "string-strip-html";

class Post {
  id: string;
  slug: string;
  appearance: string;
  language: string;
  rtl: boolean;
  type: string;
  created: string;
  updated: string;
  title: string;
  body: string;
  tags: string[];
  images?: string[];
  paid: boolean;
  views: number;

  constructor(data: Post) {
    this.id = data.id;
    this.slug = data.slug;
    this.appearance = data.appearance;
    this.language = data.language;
    this.rtl = data.rtl;
    this.type = data.type;
    this.created = data.created;
    this.updated = data.updated;
    this.title = data.title;
    this.tags = data.tags;
    this.images = data.images;
    this.paid = data.paid;
    this.views = data.views;
    this.body = stripHtml(data.body).result.substring(0, 1000);
  }
}

export default Post;
