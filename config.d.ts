interface Config {
  title: string;
  metatags: {
    name: string;
    content: string;
  }[];
  languages: {
    code: string;
    name: string;
    weight: number;
    isDefault?: boolean;
  }[];
}

export default Config;
