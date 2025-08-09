interface Blogs {
    _id: string;
    cover: string;
    title: string;
    view: number | null;
    comment: number | null;
    share: number | null;
    favorite: number | null;
    desc: string;
    author: {
      _id: string;
      fname: string;
      gname: string;
      email: string;
    };
    updateDate: number;
    createDate: number;
    tag: string[];
    lang: string;
  }