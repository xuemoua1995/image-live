export const IndustryTypes: StringTypeObject = {
  factory: { en: "Factory", la: "ໂຮງງານ", cn: "工厂" },
  mines: { en: "Mines", la: "ເຫມືອງແຮ່", cn: "矿山" }
};

export const landTypes: StringTypeObject = {
  mountain: { en: "Mountainous Region", la: "ດິນພູເຂົາ", cn: "山地" },
  farmland: { en: "Farmland", la: "ດິນປູກຝັງ", cn: "农田" }
}
export const propertyStatusAll: PropertyStatus = {
  "All": {
    "key": 3,
    "en": "All",
    "la": "ທັງໝົດ",
    "cn": "全部"
  },
  "Rent": {
    "key": 2,
    "en": "Rent",
    "la": "ເຊົ່າ",
    "cn": "租"
  },
  "Buy": {
    "key": 1,
    "en": "Buy",
    "la": "ຊື້",
    "cn": "买"
  },
  "OwnerRent": {
    "key": 4,
    "en": "Rent By Landlords",
    "la": "ເຈົ້າຂອງປ່ອຍເຊົ່າ",
    "cn": " 业主直租"
  },
  "OwnerSale": {
    "key": 5,
    "en": "Buy By Landlords",
    "la": "ເຈົ້າຂອງປ່ອຍຊື້",
    "cn": "业主直售"
  }
};
export const sortListAll: SortList = {
  "Newest": {
    "en": "Newest",
    "la": "ໃໝ່ລ່າສຸດ",
    "cn": "最新"
  },
  "PriceLowest": {
    "en": "Price Lowest",
    "la": "ລາຄາຕໍ່າສຸດ - ສູງ",
    "cn": "最低价-高价"
  },
  "PriceHighest": {
    "en": "Price Highest",
    "la": "ລາຄາສູງສຸດ - ຕ່ຳ",
    "cn": "最高价-低价"
  },
  "SquareMeter": {
    "en": "Square Area",
    "la": "ຕາລາງແມັດ​",
    "cn": "平方米"
  }
}
export const propertyTypesALL: PropertyTypes = {
  "villa": { "la": "ເຮືອນວິນລາ", "cn": "别墅", "en": "Villas" },
  "condominium": { "la": "ຄອນໂດມີນຽມ", "cn": "公寓", "en": " Condominium" },
  "land": { "la": "ທີ່ດິນ", "cn": "土地", "en": "Land" },
  "office_buildings": { "la": "ອາຄານຫ້ອງການ", "cn": "写字楼", "en": "Office Buildings" },
  "shop": { "la": "ຮ້ານຄ້າ", "cn": "商铺", "en": "Shops" },
  "five_star_hotels": { "la": "ໂຮງແຮມຫ້າດາວ", "cn": "五星级酒店", "en": "Five-star Hotels" },
  "golf_courses": { "la": "ສະໜາມກ໋ອບ", "cn": "高尔夫球场", "en": "Golf Courses" },
  "mine": { "la": "ບໍ່ແຮ່", "cn": "矿山", "en": "Mines" },
  "factories": { "la": "ໂຮງງານ", "cn": "工厂", "en": "Factories" }
}

interface PropertyTypeForm {
  type: string;
  name: {
    en: string;
    cn: string;
    la: string;
  };
  description: string;
}
interface PropertyTypeList extends Array<PropertyTypeForm> { }

export const propertyTypeForm: PropertyTypeList = [
  {
    "type": "villa",
    "name": { "en": "Villa", "cn": "别墅", "la": "ເຮືອນວິນລາ" },
    "description": ""
  },
  {
    "type": "condominium",
    "name": { "en": "Condominium", "cn": "公寓", "la": "ຄອນໂດມີນຽມ" },
    "description": ""
  },
  {
    "type": "office_buildings",
    "name": { "en": "Office Buildings", "cn": "写字楼", "la": "ອາຄານຫ້ອງການ" },
    "description": ""
  },
  {
    "type": "shop",
    "name": { "en": "Shop", "cn": "商铺", "la": "ຮ້ານຄ້າ" },
    "description": ""
  },
  {
    "type": "land",
    "name": { "en": "Land", "cn": "土地", "la": "ທີ່ດິນ" },
    "description": ""
  },
  {
    "type": "five_star_hotels",
    "name": { "en": "Five-star Hotels", "cn": "五星级酒店", "la": "ໂຮງແຮມຫ້າດາວ" },
    "description": ""
  },
  {
    "type": "golf_courses",
    "name": { "en": "Golf Courses", "cn": "高尔夫球场", "la": "ສະໜາມກ໋ອບ" },
    "description": ""
  },
  {
    "type": "mine",
    "name": { "en": "Mines", "cn": "矿山", "la": "ບໍ່ແຮ່" },
    "description": ""
  },
  {
    "type": "factories",
    "name": { "en": "Factories", "cn": "工厂", "la": "ໂຮງງານ" },
    "description": ""
  }
]



interface PropertySubType {
  en: string;
  la: string;
  cn: string;
}

interface PropertyTypeK {
  [key: string]: PropertySubType;
}

interface PropertiesSubTypeMain {
  land: PropertyTypeK;
  factories: PropertyTypeK;
}

export const propertiesSubType: PropertiesSubTypeMain = {
  land: {
    mountain: { en: "Mountainous Region", la: "ດິນພູເຂົາ", cn: "山地" },
    farmland: { en: "Farmland", la: "ດິນປູກຝັງ", cn: "农田" }
  },
  factories: {
    factory: { en: "Factory", la: "ໂຮງງານ", cn: "工厂" },
    mines: { en: "Mines", la: "ເຫມືອງແຮ່", cn: "矿山" }
  }
}

interface Option {
  label: string;
  id: number;
}

interface OptionsStatus {
  la: Option[];
  en: Option[];
  cn: Option[];
}

export const optionsStatus: OptionsStatus = {
  "la": [
    { "label": "ຊື້", "id": 1 },
    { "label": "ເຊົ່າ", "id": 2 },
    { "label": "ຊື້ ຫຼື ເຊົ່າ", "id": 3 },
    { "label": "ເຈົ້າຂອງປ່ອຍເຊົ່າ", "id": 4 },
    { "label": "ເຈົ້າຂອງປ່ອຍຊື້", "id": 5 }
  ],
  "en": [
    { "label": "Buy", "id": 1 },
    { "label": "Rent", "id": 2 },
    { "label": "Buy or Rent", "id": 3 },
    { "label": "Rent By Owner", "id": 4 },
    { "label": "Buy By Owner", "id": 5 }
  ],
  "cn": [
    { "label": "买", "id": 1 },
    { "label": "租", "id": 2 },
    { "label": "出售、出租皆可", "id": 3 },
    { "label": "业主出租", "id": 4 },
    { "label": "业主直售", "id": 5 }
  ]
}
export const optionsStatususer: OptionsStatus = {
  "la": [
    { "label": "ຊື້ ຫຼື ເຊົ່າ", "id": 3 },
    { "label": "ເຊົ່າ", "id": 4 },
    { "label": "ຊື້", "id": 5 }
  ],
  "en": [
    { "label": "Buy or Rent", "id": 3 },
    { "label": "Rent", "id": 4 },
    { "label": "Buy", "id": 5 }
  ],
  "cn": [
    { "label": "出售、出租皆可", "id": 3 },
    { "label": "出租", "id": 4 },
    { "label": "出售", "id": 5 }
  ]
}

interface Language {
  value: string;
  label: string;
  icon: string;
}

interface Languages {
  [key: string]: Language[];
}

export const LANGS: Languages = {
  en: [
    {
      value: 'la',
      label: 'Lao',
      icon: '/assets/icons/ic_flag_la.svg',
    },
    {
      value: 'en',
      label: 'English',
      icon: '/assets/icons/ic_flag_en.svg',
    },
    {
      value: 'cn',
      label: 'Chinese',
      icon: '/assets/icons/ic_flag_ch.svg',
    }
  ],
  la: [

    {
      value: 'la',
      label: 'ລາວ',
      icon: '/assets/icons/ic_flag_la.svg',
    },
    {
      value: 'en',
      label: 'ອັງກິດ',
      icon: '/assets/icons/ic_flag_en.svg',
    },
    {
      value: 'cn',
      label: 'ຈິນ',
      icon: '/assets/icons/ic_flag_ch.svg',
    }
  ],
  cn: [

    {
      value: 'la',
      label: '老挝',
      icon: '/assets/icons/ic_flag_la.svg',
    },
    {
      value: 'en',
      label: '英语',
      icon: '/assets/icons/ic_flag_en.svg',
    },
    {
      value: 'cn',
      label: '中国人',
      icon: '/assets/icons/ic_flag_ch.svg',
    }
  ]
};


