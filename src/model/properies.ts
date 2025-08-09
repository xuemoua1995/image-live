// To parse this data:
//
//   import { Convert } from "./file";
//
//   const properties = Convert.toProperties(json);

interface Properties {
    available: boolean;
    bestSellerStatus:boolean;
    name: District;
    higthligth: Higthligth;
    province: District;
    type: string;
    owner_id:string;
    user_id:{
        _id: string;
        fname: string;
        gname: string;
        email: string;
    };
    price: number;
    status: number;
    address:District;
    district: District;
    _id: string;
    features: Features;
    video: {
        type: number;
        from: string;
        url: string;
    },
    images: string[];
    createDate: number;
    id: string | null
}



 interface District {
    key?: string;
    la:   string;
    en:   string;
    cn:   string;
}

 interface Features {
    cafe:    string;
    // baths:   string;
    livingRoom: string;
    bedRoom:string;
    bathRoom:string;
    diningRoom:string;
    laundryRoom:string;
    meetingRoom:string;
    bar:string;
    parking: string;
    kitchen: string;
    balcony: string;
    swimming_Pool: string;
    gym: string;
    roomtype: string;
    sqm:     string;
    basketBall:string;
    garden:string;
    restaurant:string;
    poolBar:string;
    playground:string;  
}

 interface Higthligth {
    en: string[];
    la: string[];
    cn: string[];
}

interface Pagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  }