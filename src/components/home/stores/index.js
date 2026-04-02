import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import H2 from "../../typographies/H2";
import { HomeComponentsWrapper } from "../HomePageComponents";
import Menus from "../best-reviewed-items/Menus";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  alpha,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CustomPopover from "../../CustomPopover";
import AllStores from "./AllStores";
import MobileMenus from "./MobileMenus";
import { useGetFeaturedCategories } from "api-manage/hooks/react-query/all-category/all-categorys";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { useRouter } from "next/router";

const menus = [
  { label: t("Todos"), value: "all" },
  { label: t("Recién zarpados"), value: "newly_joined" },
  { label: t("Popular"), value: "popular" },
  { label: t("Mejor valorados"), value: "top_rated" },
];
const filterLabels = [
  { label: t("Todos"), value: "all" },
  { label: t("A domicilio"), value: "delivery" },
  { label: t("Para recoger"), value: "take_away" },
];

const Filter = ({ selectedFilterValue, setSelectedFilterValue }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  return (
    <>
      <Button onClick={handleClick} variant="text">
        <FilterAltOutlinedIcon fontSize="small" />
        {!isSmall && (
          <>
            <Typography color="customColor.textGray">{t("Filtrar")}</Typography>
            {open ? (
              <KeyboardArrowUpIcon sx={{ color: (theme) => theme.palette.customColor.textGray }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: (theme) => theme.palette.customColor.textGray }} />
            )}
          </>
        )}
      </Button>
      {open && (
        <CustomPopover
          openPopover={open}
          anchorEl={anchorEl}
          placement="bottom"
          handleClose={() => setAnchorEl(null)}
          top="10px"
        >
          <Box sx={{ width: 120, bgcolor: "background.paper" }}>
            <List component="nav">
              {filterLabels?.map((item, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedFilterValue === item?.value}
                  onClick={() => setSelectedFilterValue(item?.value)}
                >
                  <ListItemText primary={t(item?.label)} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </CustomPopover>
      )}
    </>
  );
};

const CategorySidebar = ({ selectedCategory, onCategorySelect }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { data, isLoading } = useGetFeaturedCategories();
  const moduleType = getCurrentModuleType();

  if (moduleType !== ModuleTypes.FOOD && moduleType !== ModuleTypes.GROCERY) return null;

  const handleCategoryClick = (item) => {
    if (onCategorySelect) {
      onCategorySelect(item?.id === selectedCategory ? null : item?.id);
    }
    router.push(
      {
        pathname: "/search",
        query: { name: item?.name, id: item?.id },
      },
      undefined,
      { shallow: false }
    );
  };

  return (
    <Box
      sx={{
        width: { md: "220px" },
        flexShrink: 0,
        position: "sticky",
        top: { md: "75px" },
        alignSelf: "flex-start",
        backgroundColor: "background.paper",
        borderRadius: "12px",
        border: (theme) => `1px solid ${alpha(theme.palette.neutral[400], 0.15)}`,
        overflow: "hidden",
        display: { xs: "none", md: "block" },
      }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: (theme) => `1px solid ${alpha(theme.palette.neutral[400], 0.15)}` }}>
        <Typography
          variant="subtitle2"
          fontWeight={700}
          color="text.primary"
          sx={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}
        >
          {t("Categorías")}
        </Typography>
      </Box>
      <List dense disablePadding sx={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto", py: 0.5 }}>
        {isLoading
          ? [...Array(8)].map((_, i) => (
              <Box key={i} sx={{ px: 2, py: 1 }}>
                <Skeleton variant="text" width="80%" height={18} />
              </Box>
            ))
          : data?.data?.map((item) => (
              <ListItemButton
                key={item?.id}
                selected={selectedCategory === item?.id}
                onClick={() => handleCategoryClick(item)}
                sx={{
                  px: 2,
                  py: 0.7,
                  borderRadius: "0px",
                  "&.Mui-selected": {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    "& .MuiListItemText-primary": {
                      color: "primary.main",
                      fontWeight: 700,
                    },
                  },
                  "&:hover": {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.06),
                  },
                }}
              >
                <ListItemText
                  primary={item?.name}
                  primaryTypographyProps={{
                    fontSize: "13px",
                    fontWeight: selectedCategory === item?.id ? 700 : 500,
                    noWrap: true,
                  }}
                />
              </ListItemButton>
            ))}
      </List>
    </Box>
  );
};

const Stores = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [selectedFilterValue, setSelectedFilterValue] = useState("all");
  const [filteredData, setFilteredData] = useState("all");
  const [totalDataCount, setTotalDataCount] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const stores = t("puertos");

  const handleSelectedMenuIndex = (value) => setSelectedMenuIndex(value);

  const desktopScreenHandler = () => (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
      <Menus
        selectedMenuIndex={selectedMenuIndex}
        setSelectedMenuIndex={handleSelectedMenuIndex}
        menus={menus}
        setFilteredData={setFilteredData}
      />
      <Filter
        selectedFilterValue={selectedFilterValue}
        setSelectedFilterValue={setSelectedFilterValue}
      />
    </Stack>
  );

  const mobileScreenHandler = () => (
    <MobileMenus
      selectedMenuIndex={selectedMenuIndex}
      setSelectedMenuIndex={setSelectedMenuIndex}
      selectedFilterValue={selectedFilterValue}
      setSelectedFilterValue={setSelectedFilterValue}
      menus={menus}
    />
  );

  return (
    <HomeComponentsWrapper sx={{ paddingTop: "1rem" }}>
      {/* Sticky header with count + filters */}
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py="10px"
        pl="20px"
        sx={{
          position: "sticky",
          top: { xs: "55px", md: "63px" },
          zIndex: 100,
          background: (theme) => theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          borderRadius: "0",
        }}
      >
        {totalDataCount ? (
          <H2 text={`${totalDataCount} ${stores}`} component="h2" />
        ) : (
          <Skeleton variant="text" width="80px" />
        )}
        {isSmall ? mobileScreenHandler() : desktopScreenHandler()}
      </CustomStackFullWidth>

      {/* Two-column layout: sidebar + store grid */}
      <Stack
        direction="row"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <CustomBoxFullWidth
          key={`${filteredData}${selectedFilterValue}`}
          sx={{ minHeight: "20vh", flex: 1 }}
        >
          <AllStores
            selectedFilterValue={selectedFilterValue}
            configData={configData}
            totalDataCount={totalDataCount}
            setTotalDataCount={setTotalDataCount}
            filteredData={filteredData}
          />
        </CustomBoxFullWidth>
      </Stack>
    </HomeComponentsWrapper>
  );
};

export default Stores;
