import "./Dropdown.css";
import { useState, useRef, useEffect } from "react";
import { FilterType } from "../../context/AppContext";

type SetProps = {
  setSelection: (newFilters: Partial<FilterType>) => void;
  selection: string[] | string | null;
  items: string[];
  filterKey: string;
  allOption?: boolean;
  multiSelect?: Boolean;
  position?: "left" | "right";
};

function Dropdown({
  position = "left",
  multiSelect,
  filterKey,
  allOption = true,
  items,
  setSelection,
  selection,
}: SetProps) {
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
                ${
                  selection !== null && selection?.length > 0 && "dd-show-color"
                }`}
        onClick={toggle}
      >
        {Array.isArray(selection)
          ? selection.length > 0
            ? selection.join(", ")
            : `All ${filterKey}`
          : selection === null
          ? `All ${filterKey}`
          : selection}
      </div>
      {openDD && (
        <ul className="dd-list" style={{ [position]: 0 }}>
          {allOption && (
            <li className="dd-item" onClick={handleClickAll}>
              <b> All {filterKey} </b>
            </li>
          )}
          {items.map((item, idx) => (
            <li
              className="dd-item"
              onClick={() => handleOnClick(item)}
              key={idx}
            >
              <span>{item}</span>
              <span
                className={
                  isItemInSelection(item) ? "select-icon show" : "select-icon"
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
