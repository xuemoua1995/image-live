import "./Dropdown.css";
import { useState, useRef, useEffect } from "react";
import { FilterType } from "../../context/AppContext";
import { useTranslation } from "react-i18next"; // Import useTranslation

type SetProps = {
  setSelection: (newFilters: Partial<FilterType>) => void;
  selection: number | null;
  items: PropertyStatus; //
  filterKey: string;
  allOption?: boolean;
  multiSelect?: Boolean;
  position?: "left" | "right";
  lang: string;
};

function Dropdown({
  position = "left",
  multiSelect,
  filterKey,
  allOption = true,
  items,
  setSelection,
  selection,
  lang,
}: SetProps) {
  const { t } = useTranslation(); // Initialize useTranslation
  const allowMultiSelect = multiSelect || false;

  const [openDD, setOpenDD] = useState<Boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpenDD((openDD) => !openDD);

  function handleOnClick(item: number) {
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
      if (selection.some((current) => current === item)) {
        return true;
      }
      return false;
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as HTMLElement)
    ) {
      setOpenDD(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="dd-wrapper" ref={dropdownRef}>
      <div
        className={`dd-selected flex-center ${openDD && "active"} 
                ${selection !== null && "dd-show-color"}`}
        onClick={toggle}
      >
        {Array.isArray(selection)
          ? selection.length > 0
            ? selection.map(
                (sel) =>
                  items[sel as keyof PropertyStatus][lang as keyof StatusItem] +
                  ", "
              )
            : t("home.all")
          : selection === null
          ? t("home.all")
          : selection === 1
          ? t("home.buy")
          : selection === 2
          ? t("home.rent")
          : selection === 4
          ? t("home.OwnerRent")
          : selection === 5
          ? t("home.OwnerSale")
          : t("home.all")}
      </div>
      {openDD && (
        <ul className="dd-list" style={{ [position]: 0 }}>
          {allOption && (
            <li className="dd-item" onClick={handleClickAll}>
              <b> {t("home.all")} </b>
            </li>
          )}
          {Object.keys(items).map((key) => (
            <li
              className="dd-item"
              onClick={() =>
                handleOnClick(items[key as keyof PropertyStatus].key)
              }
              key={key}
            >
              <span>
                {items[key as keyof PropertyStatus][lang as keyof StatusItem]}
              </span>
              <span
                className={
                  isItemInSelection(key) ? "select-icon show" : "select-icon"
                }
              ></span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
