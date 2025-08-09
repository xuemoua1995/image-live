// DropdownProvince.tsx
import { Box } from '@mui/material';
import './Dropdown.css';
import { useState, useRef, useEffect } from 'react';
//import { FilterType } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation

type DropdownProvinceProps = {
  setSelection: (arg: any) => void;
  selection: string[] | string | null;
  items: ProvincesModel;
  filterKey: string;
  allOption?: boolean;
  multiSelect?: boolean;
  position?: 'left' | 'right';
  lang: string;
};

function DropdownProvince({
  position = "left",
  multiSelect,
  filterKey,
  allOption = true,
  items,
  setSelection,
  selection,
  lang
}: DropdownProvinceProps) {
  const { t } = useTranslation();  // Initialize useTranslation
  const allowMultiSelect = multiSelect || false;

  const [openDD, setOpenDD] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpenDD((openDD) => !openDD);

  function handleOnClick(key: string) {
   //console.log(key);
    
   if (!allowMultiSelect) {
      setSelection(key);
      setOpenDD(false);
    } else {
      setSelection({ [filterKey]: key });
    }
  }

  const handleClickAll = () => {
    if (allowMultiSelect) {
      setSelection({ [filterKey]: [] });
    } else {
      setSelection(null);
    }
    setOpenDD(false);
  };

  function isItemInSelection(item: string) {
    if (Array.isArray(selection)) {
      return selection.some((current) => current === item);
    }
    return false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
      setOpenDD(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
 // console.log("dddddddddddddd", selection);
  
  return (
    <div className="dd-wrapper" ref={dropdownRef}>
      <Box
       
        className={`dd-selectedany flex-center ${openDD && 'active'} ${ selection !== null && selection?.length > 0 && 'dd-show-color'}`}
        sx={{height: {xs: 35, md: 45}}}
        onClick={toggle}
      >
        { !selection ? (
          t('home.province')
        ) : (
           items[selection as keyof ProvinceData][lang]
        )}
      </Box>
      {openDD && (
        <ul className="dd-list" style={{ [position]: 0 }}>
          {allOption && (
            <li className="dd-item" onClick={handleClickAll}>
              <b> {t('home.all')}</b>
            </li>
          )}
          {Object.keys(items).map((key) => (
            <li className="dd-item" onClick={() => handleOnClick(key)} key={key}>
              <span>{items[key][lang]}</span>
              <span className={isItemInSelection(key) ? 'select-icon show' : 'select-icon'}></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownProvince;
