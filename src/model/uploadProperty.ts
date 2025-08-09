interface RealEstate {
    type: string;
    name: {
      en: string;
      la: string;
      cn: string;
    };
    available: boolean;
    description: {
      en: string;
      la: string;
      cn: string;
    };
    subType: any[],
    price: string;
    status: string;
    features: Record<string, any>; 
    higthligth: {
      en: string[];
      la: string[];
      cn: string[];
    };
    images: string[];
    floorplans: string[];
    address: string;
    province: Record<string, any>; 
    district: Record<string, any>;
    city: Record<string, any>;
    map: string;
    video: {
      type: number; // type 0 Upload, 1 from social 
      from: string;
      url: string;
    };
    interiors: {
      la: {
        title: string;
        desc: string[];
      }[];
      en: {
        title: string;
        desc: string[];
      }[];
      cn: {
        title: string;
        desc: string[];
      }[];
    };
    surroundings: {
      la: {
        title: string;
        desc1: string;
        desc2: string;
        icon: string;
      }[];
      en: {
        title: string;
        desc1: string;
        desc2: string;
        icon: string;
      }[];
      cn: {
        title: string;
        desc1: string;
        desc2: string;
        icon: string;
      }[];
    };
    owner_id: {
        name: string;
        email: string;
        phone: string[];
      };
      user: boolean
  }

  interface NewPropertyCreate {
    initProperty: RealEstate;
    setProperty: React.Dispatch<React.SetStateAction<RealEstate>>;
}