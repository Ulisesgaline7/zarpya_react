import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useTranslation } from "react-i18next";
import CustomPopover from "../../CustomPopover";

const filterLabels = [
  { label: "Todos", value: "all" },
  { label: "A domicilio", value: "delivery" },
  { label: "Para recoger", value: "take_away" },
];

const MobileMenus = ({
  selectedMenuIndex,
  setSelectedMenuIndex,
  menus,
  selectedFilterValue,
  setSelectedFilterValue,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const primary = theme.palette.primary.main;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
      {/* Horizontally scrollable pill tabs */}
      <Box
        sx={{
          display: "flex",
          gap: "6px",
          overflowX: "auto",
          flexShrink: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {menus.map((item, index) => {
          const isActive = selectedMenuIndex === index;
          return (
            <Box
              key={index}
              onClick={() => setSelectedMenuIndex(index)}
              sx={{
                flexShrink: 0,
                cursor: "pointer",
                px: "12px",
                py: "5px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 500,
                whiteSpace: "nowrap",
                border: `1.5px solid ${isActive ? primary : alpha(primary, 0.25)}`,
                backgroundColor: isActive ? primary : "transparent",
                color: isActive ? "#fff" : "text.secondary",
                transition: "all 0.15s ease",
                userSelect: "none",
              }}
            >
              {t(item?.label ?? item)}
            </Box>
          );
        })}
      </Box>

      {/* Compact delivery-type filter button */}
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        variant="outlined"
        size="small"
        sx={{
          flexShrink: 0,
          minWidth: 0,
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          p: 0,
          border: `1.5px solid ${alpha(primary, 0.35)}`,
          color: open ? primary : "text.secondary",
          backgroundColor: open ? alpha(primary, 0.08) : "transparent",
        }}
      >
        <FilterAltOutlinedIcon fontSize="small" />
      </Button>

      {open && (
        <CustomPopover
          openPopover={open}
          anchorEl={anchorEl}
          placement="bottom"
          handleClose={() => setAnchorEl(null)}
        >
          <Box sx={{ width: 140, bgcolor: "background.paper", borderRadius: "10px", overflow: "hidden" }}>
            <List dense disablePadding>
              {filterLabels.map((item, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedFilterValue === item.value}
                  onClick={() => {
                    setSelectedFilterValue(item.value);
                    setAnchorEl(null);
                  }}
                  sx={{
                    py: 0.8,
                    px: 2,
                    "&.Mui-selected": {
                      backgroundColor: alpha(primary, 0.1),
                      "& .MuiListItemText-primary": {
                        color: primary,
                        fontWeight: 700,
                      },
                    },
                    "&:hover": {
                      backgroundColor: alpha(primary, 0.06),
                    },
                  }}
                >
                  <ListItemText
                    primary={t(item.label)}
                    primaryTypographyProps={{ fontSize: "13px", fontWeight: selectedFilterValue === item.value ? 700 : 400 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </CustomPopover>
      )}
    </Box>
  );
};

export default MobileMenus;
