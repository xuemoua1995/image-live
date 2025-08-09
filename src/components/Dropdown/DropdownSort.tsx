import './Dropdown.css'
import { useState, useRef, useEffect } from 'react'
import { FilterType } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation

type SetProps = {
    setSelection: (newFilters: Partial<FilterType>) => void;
    selection: string[] | string | null;
    items: SortList; // 
    filterKey: string;
    allOption?: boolean;
    multiSelect?: Boolean;
    position?: 'left' | 'right';
    lang: string;
}

function Dropdown({ position = "left", multiSelect, filterKey, allOption = true, items, setSelection, selection, lang }: SetProps) {
    const { t } = useTranslation();  // Initialize useTranslation
    const allowMultiSelect = multiSelect || false;

    const [openDD, setOpenDD] = useState<Boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => setOpenDD((openDD) => !openDD);

    function handleOnClick(item: string) {
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
    }

    function isItemInSelection(item: string) {
        if (Array.isArray(selection)) {
            if (selection.some(current => current === item)) {
                return true;
            }
            return false;
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
            setOpenDD(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef])
     
    return (
        <div className="dd-wrapper" ref={dropdownRef}>
            <div
                className={`dd-selectede flex-center ${openDD && 'active'} 
                ${selection !== null && selection?.length > 0 && 'dd-show-color'}`}
                onClick={toggle}
            >
                {Array.isArray(selection)
                    ? selection.length > 0
                        ? selection.map(sel => items[sel as keyof SortList][lang as keyof SortItem] + ", ")
                        : t('home.all')
                    : selection === null
                        ? t('home.all')
                        :  items[selection as keyof SortList][lang as keyof SortItem]
                }
            </div>
            {openDD && (
                <ul className='dd-list' style={{ [position]: 0 }}>
                    {allOption &&
                        <li className='dd-item' onClick={handleClickAll}>
                            <b> {t('home.all')} </b>
                        </li>
                    }
                    {Object.keys(items).map((key) => (
                        <li className='dd-item' onClick={() => handleOnClick(key)} key={key}>
                            <span>{items[key as keyof SortList][lang as keyof SortItem]}</span>
                            <span className={isItemInSelection(key) ? 'select-icon show' : 'select-icon'}></span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default Dropdown;