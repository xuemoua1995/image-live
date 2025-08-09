 interface Favourites {
    _id:        string;
    email:      string;
    properties: Propertiy;
    createDate: number;
}

 interface Propertiy {
    id: string
    name:   Name;
    _id:    string;
    images: string[];
}

 interface Name {
    en: string;
    la: string;
    cn: string;
}