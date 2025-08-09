// AppContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import i18n from 'i18next';
import { Provinces } from '../locale/laosData/Province';
import { cities, mainCiy } from '../locale/laosData/cities';
import { propertyStatusAll, propertyTypesALL, sortListAll } from '../utils/modal';

// Define price range
export interface NumberRange {
  min: number | null;
  max: number | null;
}

// Modal Type
export type ModalType = 'Setting' | 'Map' | 'SignIn' | 'Request' | 'Agent';

// Define Filter type
export interface FilterType {
  status: number;
  priceRange: NumberRange;
  sizeRange: NumberRange;
  yearRange: NumberRange;
  properties: string[];
  search: string;
  province: string | null;
  areas: string[];
  mainAreas: string[];
  sort: string;
  // beds: number | null;
  bedRoom: number | null;
  // baths: number | null;
  bathRoom: number | null;
  parking: number | null;
  livingRoom: number | null;
  kitchen:  number | null;
  balcony: number | null;
  swimming_Pool: number | null;
  gym: number | null;
  industry: string[];
  land: string[];
  features: string[];
}

// Define the context type
interface AppContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  modalType: ModalType;
  isModalOpen: boolean;
  toggleModal: (type: ModalType) => void;
  language: string;
  changeLang: (newLang: string) => void;
  Province: ProvincesModel;
  Cities: Cities;
  mCities: Cities;
  propertyType: PropertyTypes;
  propertyStatus: PropertyStatus;
  sortList: SortList;
  filters: FilterType;
  resetFilter: () => Promise<boolean>;
  updateFilters: (newFilters: Partial<FilterType>) => void;
}

// Define a provider component
interface AppProviderProps {
  children: ReactNode;
}


// Create the context with an initial value
const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  // user
  // const [user, setUser]= useLocalStorage<UserType | null>(null);
  const [user, setUser] = useLocalStorage<UserType>('user', null);

  // filter modal open / close
  const [modalType, setModalType] = useState<ModalType>("Setting");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = (type: ModalType) => {
    type !== modalType && setModalType(type);
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  // change lang
  // const storedLang = localStorage.getItem('lang') || 'en';
  
  const [language, setLanguage] = useLocalStorage('lang', 'en') ?? "en";
  //console.log('jjjjjjjjjjjj', language);
  

  const changeLang = (newLang: string) => {
    localStorage.setItem('lang', newLang)
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };


  const initialFilterValues = {
    status: 3,
    priceRange: { min: null, max: null },
    sizeRange: { min: null, max: null },
    yearRange: { min: null, max: null },
    properties: [],
    search: '',
    province: null,
    areas: [],
    mainAreas: [],
    // beds: null,
    // baths: null,
    bedRoom: null,
    bathRoom: null,
    parking: null,
    livingRoom: null,
    kitchen: null,
    balcony: null,
    swimming_Pool: null,
    gym: null,
    land: [],
    industry: [],
    features: [],
    sort: 'Newest'
  };
  
  const [filters, setFilters] = useLocalStorage<FilterType>('filter', initialFilterValues);


  // console.log("filters on context:", filters)
  
  const resetFilter = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      try {
        setFilters(initialFilterValues);
        resolve(true);
      } catch (error) {
        // Handle error if needed
        resolve(false); // You might want to return false in case of an error
      }
    });
  };

  const updateFilters = (newFilters: Partial<FilterType>) => {
    //console.log(newFilters);

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };


  // map

 
  const Province: ProvincesModel = Provinces;

  const Cities: Cities = cities;
  const mCities: Cities = mainCiy;

  const propertyTypes: PropertyTypes = propertyTypesALL;

  const sortList: SortList = sortListAll;

  const propertyStatus: PropertyStatus = propertyStatusAll;

  const contextValue: AppContextType = {
    user,
    setUser,
    modalType,
    isModalOpen,
    toggleModal,
    language,
    changeLang,
    Province,
    Cities,
    mCities,
    propertyType: propertyTypes,
    propertyStatus: propertyStatus,
    filters,
    resetFilter,
    updateFilters,
    sortList: sortList
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Define a custom hook for using the context
const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

export { AppProvider, useAppContext };
