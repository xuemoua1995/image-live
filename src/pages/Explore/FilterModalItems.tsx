import React from 'react'
import { NumberRange } from '../../context/AppContext'
import './FilterModal.css'
import { formatNumberWithCommas } from '../../components/Dropdown/NumberRangeDropdown';

interface FilterLendsTypeProps {
    title: string;
    options: StringTypeObject;
    filterKey: 'properties' | 'land' | 'industry' | 'features';
    selectedValues: string[];
    handleFilterChange: (item: string, filterKey: 'properties' | 'land' | 'industry' | 'features') => void;
    className?: string;
    lang: string;
}
interface FilterPropertyTypeProps {
    title: string;
    propertyType: PropertyTypes;
    filterKey: 'properties' | 'land' | 'industry' | 'features';
    selectedValues: string[];
    handleFilterChange: (item: string, filterKey: 'properties' | 'land' | 'industry' | 'features') => void;
    className?: string;
    lang: string
}

interface FilterPropertyInteriorProps {
    title: string;
    filterKey: string;
    selectedValue: number | null;
    handleFilterChange: (filter: { [key: string]: number | null }) => void;
    className?: string;

}

interface FilterPropertyNumberProps {
    title: string;
    min: number | null;
    max: number | null;
    filterType: 'priceRange' | 'sizeRange' | 'yearRange';
    className?: string;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        numKey: keyof NumberRange,
        filterType: 'priceRange' | 'sizeRange' | 'yearRange'
    ) => void
}

export const FilterLends: React.FC<FilterLendsTypeProps> = ({
    className = 'filter-item',
    title,
    options,
    filterKey,
    selectedValues,
    handleFilterChange,
    lang
}) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            <div className='checkbox-tile-container'>
                {Object.keys(options).map((key) => (
                    <label className='checkbox-label' key={key}>
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(key)}
                            onChange={() => handleFilterChange(key, filterKey)}
                        />
                        <div className='checkbox-text'>
                            {options[key as keyof langType][lang as keyof langType]}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    )
};

export const FilterPropertyType: React.FC<FilterPropertyTypeProps> = ({
    className = 'filter-item',
    title,
    propertyType,
    filterKey,
    selectedValues,
    handleFilterChange,
    lang
}) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            <div className='checkbox-tile-container'>
                {Object.keys(propertyType).map((key, index) => (
                    <label className='checkbox-label' key={index}>
                        <input
                            type="checkbox"
                            checked={selectedValues.includes(key)}
                            onChange={() => handleFilterChange(key, filterKey)}
                        />
                        <div className='checkbox-text'>
                            {propertyType[key][lang]}
                        </div>
                    </label>
                ))}
            </div>
        </div>
    )
};

export const FilterPropertyInteriorOption: React.FC<FilterPropertyInteriorProps> = ({
    title,
    filterKey,
    selectedValue,
    handleFilterChange,
    className="filter-item"
}) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            <ul className='interior-list'>
                <li
                    className={`${selectedValue === null && 'active'}`}
                    onClick={() => handleFilterChange({ [filterKey]: null })}
                >
                    Any
                </li>
                {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}
                        className={`${selectedValue === index + 1 && 'active'}`}
                        onClick={() => handleFilterChange({ [filterKey]: index + 1 })}
                    >
                        {index + 1}+
                    </li>
                ))}
            </ul>
        </div>
    )
};

export const FilterPropertyNumberOption: React.FC<FilterPropertyNumberProps> = ({
    title, min, max, filterType, onChange, className="filter-item"
}) => {
    return (
        <div className={className}>
            <h3>{title}</h3>
            <div className="number-container">
                <input
                    type="text"
                    className="font-default number-input"
                    placeholder="Min"
                    value={formatNumberWithCommas(min)}
                    onChange={(e) => onChange(e, 'min', filterType)}
                />
                <input
                    type="text"
                    className="font-default number-input"
                    placeholder="Max"
                    value={formatNumberWithCommas(max)}
                    onChange={(e) => onChange(e, 'max', filterType)}
                />
            </div>
        </div>
    )
};
