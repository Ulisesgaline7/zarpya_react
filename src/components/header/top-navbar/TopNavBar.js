import { Box, NoSsr, Stack, useMediaQuery, alpha } from "@mui/material";
import React, { useState } from "react";
import { CustomStackForLoaction } from "../NavBar.style";
import ThemeSwitches from "./ThemeSwitches";
import AddressReselect from "./address-reselect/AddressReselect";
import CustomLanguage from "./language/CustomLanguage";
import { useSelector } from "react-redux";
import CallToAdmin from "../../CallToAdmin";
import CustomContainer from "../../container";
import LogoSide from "../../logo/LogoSide";
import DrawerMenu from "./drawer-menu/DrawerMenu";

const TopNavBar = () => {
  const { configData, countryCode, language } = useSelector(
    (state) => state.configData
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  let location = undefined;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
  }
  const isSmall = useMediaQuery("(max-width:1180px)");

  return (
    <>
      <NoSsr>
        <Box
          sx={{
            width: "100%",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(6,20,16,0.9)"
                : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: (theme) =>
              `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          {!isSmall && (
            <CustomContainer>
              <Box sx={{ display: isSmall ? "none" : "block" }}>
                <Stack
                  pt=".4rem"
                  pb=".4rem"
                  width="100%"
                  height="32px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <CustomStackForLoaction direction="row">
                    {location && (
                      <AddressReselect
                        setOpenDrawer={setOpenDrawer}
                        location={location}
                      />
                    )}
                  </CustomStackForLoaction>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    justifyContent="end"
                    alignItems="center"
                  >
                    <ThemeSwitches />
                    {configData?.phone && (
                      <CallToAdmin configData={configData} />
                    )}
                    <CustomLanguage
                      countryCode={countryCode}
                      language={language}
                    />
                  </Stack>
                </Stack>
              </Box>
              {!location && (
                <Box
                  sx={{
                    display: {
                      xs: "flex",
                      md: "none",
                      alignItems: "center",
                      gap: "10px",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    },
                    flexGrow: 1,
                  }}
                >
                  <Stack alignItems="center" justifyContent="flex-start">
                    <LogoSide width="126px" configData={configData} />
                  </Stack>
                  <Stack>
                    <DrawerMenu
                      openDrawer={openDrawer}
                      setOpenDrawer={setOpenDrawer}
                    />
                  </Stack>
                </Box>
              )}
            </CustomContainer>
          )}
        </Box>
      </NoSsr>
    </>
  );
};

export default TopNavBar;