// To parse this data:
//
//   import { Convert, Property } from "./file";
//
// 


 interface Property {
    name:         Name;
    description:  Description;
    higthligth:   Higthligth;
    province:     Description;
    district:     Description;
    video:        Video;
    interiors:    Interiors;
    surroundings: Surroundings;
    _id:          string;
    id:           string;
    type:         string;
    available:    boolean;
    bestSellerStatus: boolean;
    owner_id:     OwnerID;
    price:        number;
    status:       number; // 1 buy, 2 rent, 3 buy or rent
    features:     Features;
    images:       string[];
    floorplans:   string[];
    address:      Name;
    map:          string;
    createDate:   number;
    updateDate:   number;
    unit: number | null;
    user_id: User | null; // Define user_id as a nullable property,
   
}

interface User {
    _id: string;
    fname: string;
    gname: string;
    phone: string;
}

interface Name {
    cn:   string;
    en:   string;
    la:   string;
}

 interface Description {
    cn:   string;
    en:   string;
    la:   string;
    key?: string;
}

 interface Features {
    // beds:    string;
    bedRoom:    string;
    // baths:   string;
    bathRoom:   string;
    parking: string;
    sqm:     string;
}

 interface Higthligth {
    cn: string[];
    en: string[];
    la: string[];
}

interface Interiors {
    la: InteriorsCh[];
    en: InteriorsCh[];
    cn: InteriorsCh[];
}

interface InteriorsCh {
    title: string;
    desc:  string[];
    _id:   string;
}

 interface OwnerID {
    _id:        string;
    name:       string;
    email:      string;
    phone:      string[];
    isActive:   boolean;
    createDate: number;
    updateDate: number;
}

 interface Surroundings {
    la: SurroundingsCh[];
    en: SurroundingsCh[];
    cn: SurroundingsCh[];
}

 interface SurroundingsCh {
    title: string;
    desc1: string;
    desc2: string;
    icon:  Icon;
    _id:   string;
}

 enum Icon {
    Drive = "Drive",
    Walk = "Walk",
}

 interface Video {
    type: number;
    from: string;
    url:  string;
}

