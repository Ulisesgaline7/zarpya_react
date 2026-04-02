import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Typography, alpha, useMediaQuery } from "@mui/material";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import { useTheme } from "@emotion/react";
import { Box, Stack } from "@mui/system";
import { t } from "i18next";
import CustomContainer from "../container";
import { useRouter } from "next/router";
import FooterBottomItems from "./FooterBottomItems";

const FooterBottom = (props) => {
  const router = useRouter()
  const handleClickToRoute = (href) => {
    router.push(href, undefined, { shallow: true });
  };
  const { configData } = props;
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "0",
          background: "transparent",
        },
      }}
    >
      <CustomStackFullWidth
        py="1rem"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "relative",
          zIndex: "1",
          backgroundColor: "transparent",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <CustomContainer>
          <CustomStackFullWidth
            direction={{ xs: "column", sm: "row", md: "row" }}
            justifyContent={{ xs: "center", sm: "space-between", md: "space-between" }}
            alignItems="center"
          >
            <Typography
              width="100%"
              textAlign={{ xs: "center", md: "start" }}
              sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
            >
              {configData?.footer_text || `© ${new Date().getFullYear()} Zarpya. All rights reserved.`}
            </Typography>
            <>
              {!isXSmall && <FooterBottomItems handleClickToRoute={handleClickToRoute} configData={configData} />}
            </>
          </CustomStackFullWidth>
        </CustomContainer>
      </CustomStackFullWidth>
    </Box>
  );
};

FooterBottom.propTypes = {};

export default FooterBottom;
