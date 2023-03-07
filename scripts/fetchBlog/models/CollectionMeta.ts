class CollectionMeta {
    alias: string;
    title: string;
    description: string;
    public: boolean;
    format: string;
    views: number;
    domain: string;
    monetization_pointer: string;
    total_posts: number;

    constructor(data: CollectionMeta) {
        this.alias = data.alias;
        this.title = data.title;
        this.description = data.description;
        this.public = data.public;
        this.format = data.format;
        this.views = data.views;
        this.domain = data.domain;
        this.monetization_pointer = data.monetization_pointer;
        this.total_posts = data.total_posts;
    }
}

export default CollectionMeta;