 interface PropertyStatus {
    All:  StatusItem;
    Buy: StatusItem;
    Rent: StatusItem;
    OwnerRent: StatusItem;
    OwnerSale: StatusItem;
}

 interface StatusItem {
    key: number;
    en: string;
    la: string;
    cn: string;
}