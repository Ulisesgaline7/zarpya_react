import { Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box, alpha } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import AppLinks from "./AppLinks";
import RouteLinks from "./RouteLinks";
import SocialLinks from "./SocialLinks";
import FooterBottomItems from "../FooterBottomItems";
import { useRouter } from "next/router";
import LocationViewOnMap from "../../Map/location-view/LocationViewOnMap";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const FooterMiddle = (props) => {
  const { configData, landingPageData } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpenCloseMap = () => setOpen(!open);
  const handleClickToRoute = (href) => {
    router.push(href, undefined, { shallow: true });
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const businessLogo = configData?.logo_full_url;

  const contactItems = [
    {
      icon: <EmailOutlinedIcon sx={{ fontSize: 16, color: "#2FB9CB", flexShrink: 0 }} />,
      label: configData?.email,
      href: `mailto:${configData?.email}`,
    },
    {
      icon: <PhoneOutlinedIcon sx={{ fontSize: 16, color: "#2FB9CB", flexShrink: 0 }} />,
      label: configData?.phone,
      href: `tel:${configData?.phone}`,
    },
    {
      icon: <LocationOnOutlinedIcon sx={{ fontSize: 16, color: "#2FB9CB", flexShrink: 0 }} />,
      label: configData?.address,
      href: null,
      onClick: handleOpenCloseMap,
    },
  ];

  return (
    <CustomStackFullWidth sx={{ py: { xs: "28px", sm: "48px" } }}>
      <Grid container spacing={{ xs: 4, md: 5 }}>

        {/* Column 1: Logo + description + social + apps */}
        <Grid item xs={12} sm={6} md={4}>
          <Stack spacing={2.5} alignItems={{ xs: "center", sm: "flex-start" }}>
            <Box
              sx={{
                "& img": { filter: "brightness(0) invert(1)", maxHeight: "44px" },
              }}
            >
              <CustomImageContainer
                src={businessLogo}
                alt={configData?.business_name}
                width="auto"
                height="44px"
                objectfit="contain"
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.6)",
                maxWidth: "280px",
                lineHeight: 1.7,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {configData?.business_description ||
                "Zarpa con nosotros. Delivery rápido, fácil y seguro a tu puerta."}
            </Typography>
            <SocialLinks
              configData={configData}
              landingPageData={landingPageData}
            />
            <AppLinks
              landingPageData={{
                app_store_link:
                  landingPageData?.user_app_download_section
                    ?.download_user_app_links?.apple_store_url,
                play_store_link:
                  landingPageData?.user_app_download_section
                    ?.download_user_app_links?.playstore_url,
                app_status:
                  landingPageData?.user_app_download_section
                    ?.download_user_app_links?.apple_store_url_status,
                play_status:
                  landingPageData?.user_app_download_section
                    ?.download_user_app_links?.playstore_url_status,
              }}
            />
          </Stack>
        </Grid>

        {/* Column 2: Links */}
        <Grid item xs={6} sm={3} md={2.5}>
          <Stack spacing={2}>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "11px" }}
            >
              {t("Zarpya")}
            </Typography>
            <RouteLinks token={undefined} configData={configData} />
          </Stack>
        </Grid>

        {/* Column 3: Legal links */}
        <Grid item xs={6} sm={3} md={2}>
          <Stack spacing={2}>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "11px" }}
            >
              {t("Legal")}
            </Typography>
            <FooterBottomItems
              handleClickToRoute={handleClickToRoute}
              configData={configData}
              vertical
            />
          </Stack>
        </Grid>

        {/* Column 4: Contact */}
        <Grid item xs={12} sm={6} md={3.5}>
          <Stack spacing={2}>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              sx={{ color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "11px" }}
            >
              {t("Contacto")}
            </Typography>
            <Stack spacing={1.5}>
              {contactItems.map((item, i) =>
                item.label ? (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                    sx={{
                      cursor: item.href || item.onClick ? "pointer" : "default",
                      "&:hover span": { color: "#2FB9CB" },
                    }}
                    onClick={item.onClick}
                    component={item.href ? "a" : "div"}
                    href={item.href || undefined}
                    target={item.href?.startsWith("mailto") || item.href?.startsWith("tel") ? undefined : undefined}
                  >
                    {item.icon}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: 1.5,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Stack>
                ) : null
              )}
            </Stack>
          </Stack>
        </Grid>

      </Grid>

      {open && (
        <LocationViewOnMap
          open={open}
          handleClose={handleOpenCloseMap}
          latitude={configData?.default_location?.lat}
          longitude={configData?.default_location?.lng}
          address={configData?.address}
          isFooter
        />
      )}
    </CustomStackFullWidth>
  );
};

export default FooterMiddle;
