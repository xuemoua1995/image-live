import './Dropdown.css'
import { useState, useRef, useEffect } from 'react'
import { FilterType, NumberRange } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { fCurrency } from '../../utils/format-number';

type NumberRangeProps = {
    setNumberRange: (newFilters: Partial<FilterType>) => void;
    priceRange: NumberRange;
    position?: 'left' | 'right';
    filterKey: string;
}

export function formatNumberWithCommas(value: number | null): string {
    if (value === null) {
        return '';
    }
    return value.toLocaleString();
}

function NumberRangeDropdown({ position = "left", setNumberRange, filterKey, priceRange }: NumberRangeProps) {
    const { t } = useTranslation();

    const [openDD, setOpenDD] = useState<Boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = () => setOpenDD((openDD) => !openDD);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: keyof NumberRange) => {
        const inputValue = event.target.value.replace(/\D/g, '');
        const parsedValue = inputValue === '' ? null : parseFloat(inputValue);

        setNumberRange({
            [filterKey]: {
                ...priceRange,
                [key]: parsedValue
            }
        })
    };
    const priceRaad = priceRange.min && priceRange.max ? `${fCurrency(priceRange.min ?? 0)}-${fCurrency(priceRange.max ?? 0)}` : ""
    return (
        <div className="dd-wrapper" ref={dropdownRef}>
            <div className={`dd-selectede flex-center ${openDD && 'active'}`} onClick={toggle} style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {priceRaad ? priceRaad : t('Price_Range.price')}
            </div>
            {openDD && (
                <div className='dd-list' style={{ [position]: 0 }}>
                    <main>
                        <p className='price-range-title'>{t('Price_Range.priceRangeTitle')}</p>
                        <div className='price-lists'>
                            <div className='price-list'>
                                <h4>{t('Price_Range.minimum')}</h4>
                                <input type="text" className='font-default number-input' placeholder={t('Price_Range.noMin')}
                                    value={formatNumberWithCommas(priceRange.min)}
                                    onChange={(e) => handleInputChange(e, 'min')}
                                />
                            </div>
                            <div className='price-list'>
                                <h4>{t('Price_Range.maximum')}</h4>
                                <input type="text" className='font-default number-input' placeholder={t('Price_Range.noMax')}
                                    value={formatNumberWithCommas(priceRange.max)}
                                    onChange={(e) => handleInputChange(e, 'max')}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
}


export default NumberRangeDropdown;