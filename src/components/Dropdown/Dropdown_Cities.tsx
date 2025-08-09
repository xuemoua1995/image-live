// DropdownProvince.tsx
import './Dropdown.css';
import { useState, useRef, useEffect } from 'react';
import { FilterType } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation

type DropdownProvinceProps = {
  setSelection: (newFilters: Partial<FilterType>) => void;
  selection: string[] | string | null;
  items: any; // { [key: string]: cityName }
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
  //console.log(selection);

  function handleOnClick(item: string) {
    // console.log(key);
    if (!allowMultiSelect) {
      setSelection({ [filterKey]: item });
      setOpenDD(false);
    } else {
      if (Array.isArray(selection)) {
        const newSelection = selection.includes(item)
          ? selection.filter((current) => current !== item)
          : [...selection, item];
        setSelection({ [filterKey]: newSelection });
      }
    }
  }

  const handleClickAll = () => {
    if (allowMultiSelect) {
      setSelection({ [filterKey]: [] });
    } else {
      setSelection({ [filterKey]: null });
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

  return (
    <div className="dd-wrapper" ref={dropdownRef}>
      <div
        className={`dd-selected flex-center ${openDD && 'active'} ${selection !== null && selection?.length > 0 && 'dd-show-color'}`}
        onClick={toggle}
      >
        {
          Array.isArray(selection) && selection.length > 0
            ? selection.length === 1
              ? items && items[selection[0]] && items[selection[0]][lang]
              : items && items[selection[0]] && items[selection[0]][lang] + ",..."
            : t('home.city')
        }
      </div>
      {openDD && (
        <ul className="dd-list" style={{ [position]: 0 }}>
          {allOption && (
            <li className="dd-item" onClick={handleClickAll}>
              <b> {t('home.all')} </b>
            </li>
          )}
          {typeof items === 'object' && Object.keys(items).map((key) => (
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
