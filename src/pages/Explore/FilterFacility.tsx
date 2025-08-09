import React, { useEffect, useState } from "react";
import "./Explore.css";
import Card from "../../components/Card/Card";
import PriceDropdown from "../../components/Dropdown/NumberRangeDropdown";
import { Helmet } from "react-helmet-async";
//import { useParams } from 'react-router-dom';
import { useAppContext } from "../../context/AppContext";
import { VscSettings } from "react-icons/vsc";
import Pagination from "../../components/Pagination/pagination-news";
import { TbZoomReset } from "react-icons/tb";
import { APIPOST } from "../../helper/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DropdownProperty from "../../components/Dropdown/DropdownProperty";
import DropdownSort from "../../components/Dropdown/DropdownSort";
import DropdownStatus from "../../components/Dropdown/DropdownStatus";
// import emptyImage from "../../assest/empty.png";
import emptyImage from "../../assest/empty.png";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { MdSearch } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";

const Explore: React.FC = () => {
  const { t, i18n } = useTranslation(); // Initialize useTranslation
  const lang = i18n.language;
  const navigate = useNavigate();
  //let { page } = useParams();
  const {
    toggleModal,
    filters,
    updateFilters,
    resetFilter,
    propertyStatus,
    propertyType,
    sortList,
  } = useAppContext();

  const [properties, setProperties] = useState<Properties[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [pages, setPage] = useState<Pagination>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 0,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  });

  const getProperty = async () => {
    const res = await APIPOST(`/property/explore/?page=${pages.currentPage}`, {
      province: filters.province,
      district: filters.areas,
      type: filters.properties,
      status: filters.status,
      features: filters,
      sort: filters.sort,
    });
    if (res.statusCode === 200) {
      setProperties(res.data.properties);
      setPage(res.data.pagination);
    } else {
      toast.warn("Something went wrong!");
    }
  };
  const resetAllFitter = async () => {
    setIsloading(true);
    try {
      await resetFilter();
      // Wait for a short delay or you can use another mechanism to ensure the state is updated.
      //await new Promise(resolve => setTimeout(resolve, 500));
      //await getProperty();
      navigate(`/explore/page/1`);
    } finally {
      setIsloading(false);
      // Refresh the page
      window.location.reload();
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typesValue = urlParams.get("types");
    if (typesValue) {
      updateFilters({ properties: [typesValue] });
    }
    const abortController = new AbortController();
    getProperty();
    return () => {
      // Abort the fetch request when the component is unmounted
      abortController.abort();
    };
  }, [filters.status, filters.sort]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Get the current items based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = properties.slice(startIndex, startIndex + itemsPerPage);

  // updating the only search bar value
  const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.target.value;
    updateFilters({ search: inputValue });
  };
  // const handleClick = (pageNumber: number) => {
  //   setPage((prevPage) => ({ ...prevPage, currentPage: pageNumber }));
  //   navigate(`/explore/page/${pageNumber}`);
  //   getProperty();
  // };
  const cliceS = async () => {
    setIsloading(true);
    try {
      await getProperty();
    } finally {
      setIsloading(false);
    }
  };

  
  //console.log(filters);

  return (
    <>
      <Helmet>
        <title
          style={{
            fontFamily:
              'Times New Roman, "PT Serif", "NotoSanLao", Times, serif',
          }}
        >
          {" "}
          {filters.status === 0
            ? t("explore.header.subtitle.allStatus")
            : filters.status === 1
            ? t("home.sale")
            : filters.status === 2
            ? t("home.rent")
            : t("data.sale_or_rent")}{" "}
          | Zion Group
        </title>
      </Helmet>
      <div className="explore">
        <section className="filter-section">
          <main className="filter-box container" style={{ maxWidth: 1000 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={3} sx={{ padding: { xs: 0, md: 2 } }}>
                  <DropdownStatus
                    setSelection={updateFilters}
                    selection={filters.status}
                    items={propertyStatus}
                    filterKey="status"
                    allOption={false}
                    lang={lang}
                  />
                </Grid>
                <Grid item xs={12} md={3} sx={{ padding: { xs: 0, md: 2 } }}>
                  <DropdownProperty
                    setSelection={updateFilters}
                    selection={filters.properties}
                    items={propertyType}
                    filterKey="properties"
                    multiSelect={true}
                    lang={lang}
                  />
                </Grid>
                <Grid item xs={12} md={3} sx={{ padding: { xs: 0, md: 2 } }}>
                  <PriceDropdown
                    setNumberRange={updateFilters}
                    priceRange={filters.priceRange}
                    position="right"
                    filterKey="priceRange"
                  />
                </Grid>
                <Grid item xs={12} md={3} sx={{ padding: { xs: 0, md: 2 } }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdSearch />
                        </InputAdornment>
                      ),
                      style: {
                        height: 45,
                        fontFamily:
                          'Times New Roman, "PT Serif", "NotoSanLao", Times, serif',
                        borderRadius: "5px", // Rounded corners
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Box shadow
                      },
                    }}
                    type="text"
                    value={filters.search}
                    onChange={updateSearch}
                    placeholder={t(
                      "explore.filterSection.typeSearch.placeholder"
                    )} // Use i18n key
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ margin: "2px", padding: 2 }}>
                <Button
                  sx={{ margin: 1, textAlign: "center", textTransform: "none" }}
                  variant="outlined"
                  onClick={() => toggleModal("Map")}
                >
                  <FaMapMarkedAlt style={{ marginRight: 5 }} />{" "}
                  {t("explore.filterSection.mapButton.label")}
                </Button>
                <Button
                  sx={{ margin: 1, textAlign: "center", textTransform: "none" }}
                  variant="outlined"
                  onClick={() => toggleModal("Setting")}
                >
                  <VscSettings style={{ marginRight: 5 }} />{" "}
                  {t("explore.filterSection.settingButton.label")}
                </Button>
                {/* Search and reset buttons */}
                <Button
                  sx={{
                    margin: 1,
                    textAlign: "center",
                    textTransform: "none",
                    background: "#582C86",
                  }}
                  variant="contained"
                  onClick={cliceS}
                  disabled={isLoading}
                >
                  <MdSearch style={{ marginRight: 5 }} />{" "}
                  {isLoading ? t("loading") : t("home.search")}
                </Button>
                <Button
                  sx={{
                    margin: 1,
                    textAlign: "center",
                    textTransform: "none",
                    background: "rgb(119, 33, 33)",
                  }}
                  variant="contained"
                  onClick={resetAllFitter}
                  disabled={isLoading}
                >
                  <TbZoomReset style={{ marginRight: 5 }} /> {t("home.reset")}
                </Button>
              </Grid>
            </Grid>
          </main>
        </section>

        <div className="explore-items container">
          <div className="breadcumbs font-small">
            {t("explore.breadcrumbs.home")} /{t("explore.breadcrumbs.explore")}{" "}
            /{t("explore.breadcrumbs.currentPage")} /{pages.currentPage}
          </div>
          <div className="explore-header">
            <div className="explore-text">
              <h1 className="font-header">
                {t("explore.header.title")}
                <span className="font-title">
                  (
                  {filters.status === 0
                    ? t("explore.header.subtitle.allStatus")
                    : filters.status === 1
                    ? t("home.forBuy")
                    : filters.status === 2
                    ? t("home.rent")
                    : filters.status === 4
                    ? t("home.OwnerRent")
                    : filters.status === 5
                    ? t("home.OwnerSale")
                    : t("home.all")}
                  )
                </span>
              </h1>
            </div>
            <div className="explore-sort">
              <DropdownSort
                setSelection={updateFilters}
                selection={filters.sort}
                items={sortList}
                filterKey="sort"
                allOption={false}
                position="right"
                lang={lang}
              />
            </div>
          </div>
          <div className="property-card-wrapper">
            {currentItems.length > 0 ? (
              currentItems.map((item, i) => <Card key={i} id={i} item={item} />)
            ) : (
              <img className="img-empty" src={emptyImage} alt="Empty" />
            )}
          </div>
        </div>
        {properties.length > 0 && (
          // <Pagination totalPages={pages.totalPages} handleClick={handleClick} />
          <Pagination
          // totalPages={pages.totalPages}
          // handleClick={handleClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
        )}
      </div>
      <Container
        maxWidth="md"
        sx={{ backgroundColor: "#fff", marginTop: 10, marginBottom: 10 }}
      >
        <Box sx={{ backgroundColor: "#ff9966", padding: 2, borderRadius: 3 }}>
          <h2>{t("story.warning.title")}</h2>
          <p
            style={{ margin: 10, textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: t("story.warning.sub_title") }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Explore;
