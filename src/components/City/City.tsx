import React, { useEffect, useState } from 'react'
import './CIty.css'
import { useTranslation } from 'react-i18next';
import { APIPOST } from '../../helper/api';
import { toast } from 'react-toastify';

interface CityProps {
  title:string;
  img:string;
  word: string
}

const City:React.FC<CityProps>=({img, title, word})=>{
  const { t, } = useTranslation();  // Initialize useTranslation
  const [count, setCount] = useState(0)
  const handleCheck = async () => {
    const res = await APIPOST('/check/properties', {
      key: word
    });
    if (res.statusCode === 200) {
      setCount(res.data.counts);
    } else {
      toast.warn(res.message);
    }
  }
  useEffect(() => {
    handleCheck(); // Call the function inside useEffect
  }, []);
  return (
    <div className='city-card'>
      <img src={img} alt="" />
      <div className='city-text'>
        <div className='font-small'>{count} {t('property')}</div>
        <div className='city-title'>{title}</div>
      </div>
    </div>
  )
}

export default City