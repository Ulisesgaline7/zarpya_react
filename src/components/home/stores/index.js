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
  Button,
  List,
  Skeleton,
  Typography,
  useMediaQuery,
  alpha,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CustomPopover from "../../CustomPopover";
import AllStores from "./AllStores";
import MobileMenus from "./MobileMenus";

const menus = [
  { label: t("All"), value: "all" },
  { label: t("Newly Joined"), value: "newly_joined" },
  { label: t("Popular"), value: "popular" },
  { label: t("Top Rated"), value: "top_rated" },
];
const filterLabels = [
  { label: t("All"), value: "all" },
  { label: t("Delivery"), value: "delivery" },
  { label: t("Take Away"), value: "take_away" },
];

const Filter = (props) => {
  const { selectedFilterValue, setSelectedFilterValue } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const desktopLayout = () => {
    return (
      <Box
        sx={{
          width: 130,
          bgcolor: isDark ? alpha("#061410", 0.95) : "background.paper",
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${alpha(primary, 0.15)}`,
        }}
      >
        <List component="nav">
          {filterLabels?.map((item, index) => (
            <ListItemButton
              key={index}
              selected={selectedFilterValue === item?.value}
              onClick={() => setSelectedFilterValue(item?.value)}
              sx={{
                borderRadius: "8px",
                mx: 0.5,
                my: 0.3,
                "&.Mui-selected": {
                  background: alpha(primary, 0.12),
                  color: primary,
                  "&:hover": { background: alpha(primary, 0.18) },
                },
                "&:hover": { background: alpha(primary, 0.07) },
              }}
            >
              <ListItemText
                primary={t(item?.label)}
                primaryTypographyProps={{
                  fontSize: "13px",
                  fontWeight: selectedFilterValue === item?.value ? 600 : 400,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="text"
        sx={{
          borderRadius: "10px",
          px: 1.5,
          py: 0.6,
          gap: 0.5,
          border: `1px solid ${alpha(primary, open ? 0.4 : 0.15)}`,
          background: open ? alpha(primary, 0.08) : "transparent",
          color: open ? primary : "inherit",
          transition: "all 0.2s ease",
          "&:hover": {
            background: alpha(primary, 0.07),
            borderColor: alpha(primary, 0.3),
          },
        }}
      >
        <FilterAltOutlinedIcon fontSize="small" />
        {!isSmall && (
          <>
            <Typography
              sx={{ fontSize: "13px", fontWeight: 500 }}
              color="inherit"
            >
              {t("Filter")}
            </Typography>
            {open ? (
              <KeyboardArrowUpIcon sx={{ fontSize: "16px" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: "16px" }} />
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
          {desktopLayout()}
        </CustomPopover>
      )}
    </>
  );
};

const Stores = (props) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [selectedFilterValue, setSelectedFilterValue] = useState("all");
  const [filteredData, setFilteredData] = useState("all");
  const [totalDataCount, setTotalDataCount] = useState(null);
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const stores = t("Stores");

  const handleSelectedMenuIndex = (value) => {
    setSelectedMenuIndex(value);
  };

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
      {/* Header bar — sticky */}
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py="12px"
        pl="20px"
        pr="16px"
        sx={{
          position: "sticky",
          top: { xs: "55px", md: "63px" },
          zIndex: 100,
          background: isDark
            ? `linear-gradient(90deg, ${alpha("#061410", 0.97)} 0%, ${alpha("#0a1f1b", 0.97)} 100%)`
            : `linear-gradient(90deg, ${alpha("#f0fcfa", 0.97)} 0%, ${alpha("#e8faf8", 0.97)} 100%)`,
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${alpha(primary, 0.12)}`,
          borderRadius: "0",
        }}
      >
        {/* Title + ship icon */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {/* Nautical accent line */}
          <Box
            sx={{
              width: "4px",
              height: "28px",
              borderRadius: "2px",
              background: `linear-gradient(180deg, ${primary} 0%, ${alpha(primary, 0.3)} 100%)`,
            }}
          />
          {totalDataCount ? (
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "15px", md: "18px" },
                color: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
                letterSpacing: "-0.01em",
              }}
            >
              {totalDataCount}{" "}
              <Box
                component="span"
                sx={{ color: primary }}
              >
                {stores}
              </Box>
            </Typography>
          ) : (
            <Skeleton variant="text" width="100px" height="28px" sx={{ borderRadius: "8px" }} />
          )}
        </Stack>

        {/* Menus / filters */}
        {isSmall ? mobileScreenHandler() : desktopScreenHandler()}
      </CustomStackFullWidth>

      {/* Store grid */}
      <CustomBoxFullWidth
        key={`${filteredData}${selectedFilterValue}`}
        sx={{
          minHeight: "20vh",
          marginTop: "1.5rem",
          px: { xs: 1, md: 0 },
        }}
      >
        <AllStores
          selectedFilterValue={selectedFilterValue}
          configData={configData}
          totalDataCount={totalDataCount}
          setTotalDataCount={setTotalDataCount}
          filteredData={filteredData}
        />
      </CustomBoxFullWidth>
    </HomeComponentsWrapper>
  );
};

export default Stores;