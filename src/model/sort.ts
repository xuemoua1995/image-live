interface SortList {
    Newest:       SortItem;
    PriceLowest:  SortItem;
    PriceHighest: SortItem;
    SquareMeter:  SortItem;
}

interface SortItem {
    en: string;
    la: string;
    cn: string;
}