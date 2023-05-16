interface Config {
    title: string,
    metatags: {
        "name": "description",
        "content": "Data is the new oil";
    }[],
    languages: {
        code: string;
        name: string;
        weight: number;
        isDefault?: boolean;
    }[];
}

export default Config;