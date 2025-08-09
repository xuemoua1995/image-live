import Animation from '../../components/Animation/Animation';
import { ModalContainerProps } from '../../components/Map/Map';
import Modal from '../../components/Modal/Modal'
import { NumberRange, useAppContext } from '../../context/AppContext'
import { IndustryTypes, landTypes } from '../../utils/modal';
import './FilterModal.css'
import { FilterLends, FilterPropertyInteriorOption, FilterPropertyNumberOption, FilterPropertyType } from './FilterModalItems';
import { useTranslation } from 'react-i18next';  // Import useTranslation


//const Features = ["Private Pool", "Basement", "Roof", "Fireplace", "Hardwood Floors", "Gardens"]


function FilterModal({ type }: ModalContainerProps) {
  const { t, i18n } = useTranslation();  // Initialize useTranslation
  const lang = i18n.language;

  const { propertyType, propertyStatus, filters, updateFilters } = useAppContext();

// console.log("filters data:", filters)


  const handleInfoChange = (
    property: string,
    filterKey: 'properties' | 'land' | 'industry' | 'features'
  ) => {
    let selected = filters[filterKey];

    if (selected.includes(property)) {
      const indexToRemove = selected.indexOf(property);
      selected.splice(indexToRemove, 1);
    } else {
      if(filterKey === 'properties'){
        selected = [property];
      }else{
        selected.push(property);
      }
      
    }

    updateFilters({ [filterKey]: selected });
  };

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    numKey: keyof NumberRange,
    filterType: 'priceRange' | 'sizeRange' | 'yearRange'
  ) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    const parsedValue = inputValue === '' ? null : parseFloat(inputValue);
    filters[filterType][numKey] = parsedValue;

    updateFilters({ [filterType]: filters[filterType] })
  }
  //console.log(filters);
  
  return (
    <Modal title={t('allFilter.modalTitle')} rightModal={type === "Setting"}>
      <div className='filter-toolbox'>
        <div className='filter-status'>
          <ul className='filter-status-list'>
            {Object.keys(propertyStatus).map((key, i) => (
              <li
                key={i} className={`${filters.status === propertyStatus[key as keyof PropertyStatus].key && 'active'}`}
                onClick={() => updateFilters({ "status": propertyStatus[key as keyof PropertyStatus].key })}
              >
                {propertyStatus[key as keyof PropertyStatus][lang as keyof StatusItem]}
              </li>
            ))}
          </ul>
        </div>
        <div className='filter-type'>
          <FilterPropertyType
            title={t('allFilter.propertyTypes')}
            propertyType={propertyType}
            filterKey="properties"
            selectedValues={filters.properties}
            handleFilterChange={handleInfoChange}
            lang={lang}
          />
        </div>
        <Animation show={filters.properties.includes("land") || filters.properties.includes("factories")}>
          <div
            className='filter-others'
            style={{
              gap: filters.properties.includes("land") && filters.properties.includes("factories") ? "40px" : "0"
            }}
          >
            <FilterLends
              className={`filter-item land ${filters.properties.includes("land") && 'show'}`}
              title={t('allFilter.landTypes')}
              options={landTypes}
              filterKey="land"
              selectedValues={filters.land}
              handleFilterChange={handleInfoChange}
              lang={lang}
            />
            <div className={`filter-divider ${filters.properties.includes("land") && filters.properties.includes("factories") && 'show'}`} />
            <FilterLends
              className={`filter-item industry ${filters.properties.includes("factories") && 'show'}`}
              title={t('allFilter.industryTypes')}
              options={IndustryTypes}
              filterKey="industry"
              selectedValues={filters.industry}
              handleFilterChange={handleInfoChange}
              lang={lang}
            />
          </div>
        </Animation>
        <div className='filter-info-container'>
          <div className='filter-info-box'>
            <FilterPropertyNumberOption
              title={t('allFilter.price')}
              filterType='priceRange'
              min={filters.priceRange.min}
              max={filters.priceRange.max}
              onChange={handleNumberChange}
            />
            <FilterPropertyNumberOption
              title={t('allFilter.squareMeter')}
              filterType='sizeRange'
              min={filters.sizeRange.min}
              max={filters.sizeRange.max}
              onChange={handleNumberChange}
            />
            <FilterPropertyNumberOption
              className={`${(filters.properties.includes("land") || !((filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels") || filters.properties.includes("office_buildings")  || filters.properties.includes("shop")))) ?'filter-item hide' : 'filter-item'}`}
              title={t('allFilter.yearBuilt')}
              filterType='yearRange'
              min={filters.yearRange.min}
              max={filters.yearRange.max}
              onChange={handleNumberChange}
            />
          </div>
          <div className='filter-info-box'>
            <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels")) ?'filter-item' : 'filter-item hide'}`}
              title={t('data.bedRoom')}
              filterKey="bedRoom"
              selectedValue={filters.bedRoom}
              handleFilterChange={updateFilters}
            />
            <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels")) ?'filter-item' : 'filter-item hide'}`}
              title={t('allFilter.livingRoom')}
              filterKey="livingRoom"
              selectedValue={filters.livingRoom}
              handleFilterChange={updateFilters}
            />
             <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels") || filters.properties.includes("office_buildings")  || filters.properties.includes("shop")) ?'filter-item' : 'filter-item hide'}`}
              title={t('allFilter.baths')}
              filterKey="bathRoom"
              selectedValue={filters.bathRoom}
              handleFilterChange={updateFilters}
            />
            <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium")) ? 'filter-item' : 'filter-item hide'}`}
              title={t('allFilter.kitchen')}
              filterKey="kitchen"
              selectedValue={filters.kitchen}
              handleFilterChange={updateFilters}
            />
            <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels")  || filters.properties.includes("shop"))  ?'filter-item' : 'filter-item hide'}`}
              title={t('allFilter.balcony')}
              filterKey="balcony"
              selectedValue={filters.balcony}
              handleFilterChange={updateFilters}
            />
            <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels")) ?'filter-item' : 'filter-item hide'}`}
              title={t('allFilter.swimming_Pool')}
              filterKey="swimming_Pool"
              selectedValue={filters.swimming_Pool}
              handleFilterChange={updateFilters}
            />
            <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels")) ?'filter-item' : 'filter-item hide'}`}
              title={t('allFilter.gym')}
              filterKey="gym"
              selectedValue={filters.gym}
              handleFilterChange={updateFilters}
            />
            <FilterPropertyInteriorOption
              className={`${(filters.properties.includes("villa") || filters.properties.includes("condominium") || filters.properties.includes("five_star_hotels") || filters.properties.includes("office_buildings"))   || filters.properties.includes("shop")?'filter-item' : 'filter-item hide'}`}
              title={t('allFilter.parking')}
              filterKey="parking"
              selectedValue={filters.parking}
              handleFilterChange={updateFilters}
            />
          </div>
        </div>
        {/*<div className='filter-features'>
          <div className='filter-item'>
            <h3>{t('allFilter.features')}</h3>  
            <div className='filter-feature-container'>
              {Features.map((item, i) => (
                <label
                  className='filter-feature-item' key={i}
                  onChange={() => handleInfoChange(item, "features")}
                >
                  <input type="checkbox" name={item} />
                  <span className='checkbox-bin'></span>
                  <span>{item}</span>  
                </label>
              ))}
            </div>
          </div>
        </div>*/}
      </div>
    </Modal>
  )
}

export default FilterModal