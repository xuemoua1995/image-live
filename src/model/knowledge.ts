interface KnowledgeModel {
    _id:        string;
    title:      string;
    desc:       string;
    author:     Author;
    lang:       string;
    createDate: number;
    updateDate: number;
}

 interface Author {
    _id:   string;
    fname: string;
    gname: string;
    email: string;
}
