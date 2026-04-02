import React, { useEffect, useRef, useState } from "react";
import { ListItemIcon, MenuItem, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import eng from "../../../../public/landingpage/us.svg";
import arabicImg from "../../../../public/landingpage/arabic-flag-svg.svg";
import spainImg from "../../../../public/landingpage/spain.png";

import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import i18n, { t } from "i18next";
import { useTheme } from "@mui/material/styles";
import { StyledMenu, TopBarButton } from "../NavBar.style";
import { useSettings } from "contexts/use-settings";
import Image from "next/image";

const CustomLanguage = ({ formmobilemenu }) => {
  const { configData } = useSelector((state) => state.configData);
  const theme = useTheme();
  const [language, setLanguage] = useState("es");
  const [anchorEl, setAnchorEl] = useState(null);
  const { settings, saveSettings } = useSettings();
  const anchorRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("language-setting");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLanguage(parsed);
      i18n.changeLanguage(parsed);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lan) => {
    i18n.changeLanguage(lan);
    setLanguage(lan);
    localStorage.setItem("language-setting", JSON.stringify(lan));

    // Solo árabe es RTL
    const isRTL = lan === "ar";

    saveSettings({
      ...settings,
      direction: isRTL ? "rtl" : "ltr",
    });

    toast.success(t("Language changed"));
    window.location.reload();
  };

  const open = Boolean(anchorEl);

  // Mapeo dinámico de bandera
  const flagMap = {
    en: eng.src,
    ar: arabicImg.src,
    es: spainImg.src,
  };

  const nameMap = {
    en: "English",
    ar: "Arabic",
    es: "Español",
  };

  return (
    <>
      <TopBarButton
        formmobilemenu={formmobilemenu}
        variant="text"
        size="small"
        onClick={handleClick}
        startIcon={
          <Stack>
            <Image
              width={20}
              height={21}
              src={flagMap[language]}
              alt="Language"
              priority
            />
          </Stack>
        }
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Typography>
          {nameMap[language]}
        </Typography>
      </TopBarButton>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {configData?.language?.map((lan, index) => (
          <MenuItem
            onClick={() => handleChangeLanguage(lan.key)}
            key={index}
          >
            <ListItemIcon>
              <Image
                width={20}
                height={21}
                src={flagMap[lan.key]}
                alt="Language"
              />
            </ListItemIcon>
            {lan.value}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default CustomLanguage;