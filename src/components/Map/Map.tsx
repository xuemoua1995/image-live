import React, { useState } from 'react';
import Modal from '../Modal/Modal'
import ProvinceMap from './Province.Map';
import Vientiane from './Provinces/Vientiane';
import { IoArrowBackSharp } from "react-icons/io5";
import './Map.css'
import Bolikhamxay from './Provinces/Bolikhamxay';
import { useAppContext } from '../../context/AppContext';
import VientianeProvince from './Provinces/VientianeProvince';
import Xaysomboun from './Provinces/Xaysomboun';
import Xayabury from './Provinces/Xayabury';
import Khammuane from './Provinces/Khammuane';
import Savannakhet from './Provinces/Savannakhet';
import Salavan from './Provinces/Salavan';
import Sekong from './Provinces/Sekong';
import Attapeu from './Provinces/Attapeu';
import Champasak from './Provinces/Champasak';
import Xiengkhuang from './Provinces/Xiengkhuang';
import LuangPrabang from './Provinces/LuangPrabang';
import Houaphan from './Provinces/Houaphan';
import Oudomxay from './Provinces/Oudomxay';
import LuangNamtha from './Provinces/LuangNamtha';
import Bokeo from './Provinces/Bokeo';
import Phongsali from './Provinces/Phongsali';
import { useTranslation } from 'react-i18next';

export interface ModalContainerProps{
  type: string;
}

export interface ProvinceProps {
  handleClick: (event: React.MouseEvent<SVGElement>) => void;
  checkActiveArea: (name:string) => boolean;
}

interface CountyProps extends ProvinceProps{
  name: string;
  points?: string;
  d?: string;
}

interface ProvinceComponents {
  [key: string]: React.ComponentType<ProvinceProps>;
}

const provinceComponents: ProvinceComponents = {
  "vientianeprovince": VientianeProvince,
  "vientiane": Vientiane,
  "bolikhamxai": Bolikhamxay,
  "saisomboun": Xaysomboun,
  "xayabury": Xayabury,
  "khammouane": Khammuane,
  "savannakhet": Savannakhet,
  "salavan": Salavan,
  "sekong": Sekong,
  "attapeu": Attapeu,
  "champasak": Champasak,
  "xiengkhouang": Xiengkhuang,
  "luangprabang": LuangPrabang,
  "houaphan": Houaphan,
  "oudomxay": Oudomxay,
  "luangnamtha": LuangNamtha,
  "bokeo": Bokeo,
  "phonsaly": Phongsali,
};

export const County = ({ name, handleClick, checkActiveArea, points, d }:CountyProps) => (
  <React.Fragment>
    {d!== undefined ? (
      <path
        onClick={handleClick}
        name={name}
        className={`county ${checkActiveArea(name) && 'active'}`}
        d={d}
      />
    ) : (
      <polygon
        onClick={handleClick}
        name={name}
        className={`county ${checkActiveArea(name) && 'active'}`}
        points={points}
      />
    )}
  </React.Fragment>
);

function Map({type}:ModalContainerProps) {
  const { t, i18n }  = useTranslation()
  const {Province} = useAppContext();
  
  const {updateFilters, filters} = useAppContext();
  const [hoverArea, setHoverArea] = useState<string | null>(null);
  const [isProvinceMap, setIsProvinceMap] = useState<boolean>(true);
  

  const SelectedProvinceComponent = filters.province && provinceComponents[filters.province]
  // change color when mouse enters to map area
  const handleMouseOver = (event: React.MouseEvent<SVGPathElement>)=>{
    const provinceName: any = event.currentTarget.getAttribute('name');
    setHoverArea(provinceName);
  }

  // change color when mouse out map area
  const handleMouseOut = ()=>{
    setHoverArea(null);
  }

  // function for when province area is clicked
  const handleProvinceClick = (e: React.MouseEvent<SVGPathElement, MouseEvent>)=>{
    const pathName = e.currentTarget.getAttribute('name');
    setIsProvinceMap(false);
    updateFilters({province:pathName})
  }

  // command to go back from county map to province map
  const showProvinceMap = ()=>{
    setIsProvinceMap(true);
    updateFilters({areas:[]})
  }

  // function for when county area is clicked
  const handleCountyClick=(event: React.MouseEvent<SVGElement>)=>{
    const item = event.currentTarget.getAttribute('name');
    if(item!==null){
      const newSelection = filters.areas.includes(item)
      ? filters.areas.filter((current) => current !== item)
      : [...filters.areas, item];
  
      updateFilters({ areas: newSelection });
    }

  }

  // check if the province is the selected province
  const checkActiveProvince=(name:string)=>{
    if(filters.province === name){
      return true
    }
    return false
  }

  // check if the county is the selected counties
  const checkActiveArea=(name:string)=>{
    
    if(filters.areas.includes(name)){
      return true
    }
    return false
  }
  
  return (
    <Modal title={t('map.map_location')} rightModal={type==="Map"}>
      <div className='map-location'>
        <strong>{t('map.current_map')}:</strong> &nbsp;
        {filters.province} / &nbsp;
        {filters.areas.length > 1 ? 
          filters.areas.join(', ')
          : 
          filters.areas
        }
      </div>
      <div className='interactive-map'>
        <h2 style={{textTransform: 'none'}} >{hoverArea ?  Province[hoverArea][i18n.language] : ""}</h2>
        <div className={`map-container ${!isProvinceMap && 'zoom-in'}`}>
          <ProvinceMap checkActiveProvince={checkActiveProvince} handleMouseOut={handleMouseOut} handleMouseOver={handleMouseOver} handleClick={handleProvinceClick}/>
        </div>

        <div className={`map-container ${isProvinceMap && 'zoom-out'}`}>
          <div className='btn_provinceMap font-header' onClick={showProvinceMap}>
            <IoArrowBackSharp/>
          </div>
          <h2 style={{textTransform: 'none'}} >{hoverArea ?  Province[hoverArea][i18n.language] : ""}</h2>
          {SelectedProvinceComponent && <SelectedProvinceComponent handleClick={handleCountyClick} checkActiveArea={checkActiveArea} />}
        </div>
      </div>
    </Modal>
  )
}

export default Map