import { Typography, useTheme,NoSsr } from '@mui/material'
import { t } from 'i18next';
import React from 'react'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style';

const FooterBottomItems = ({ configData, handleClickToRoute, vertical }) => {
    const theme = useTheme();

    const linkSx = vertical
        ? {
              cursor: "pointer",
              color: "rgba(255,255,255,0.75)",
              fontSize: "14px",
              "&:hover": { color: "#2FB9CB" },
          }
        : {
              cursor: "pointer",
              "&:hover": { color: theme.palette.primary.main },
          };

    const go = (path) => {
        if (handleClickToRoute) handleClickToRoute(path);
    };

    return (
        <NoSsr>
        <CustomStackFullWidth
            direction={vertical ? "column" : { xs: "column", sm: "row" }}
            spacing={vertical ? 1.5 : { xs: 2, md: 3 }}
            alignItems={vertical ? "flex-start" : { xs: "start", sm: "center" }}
            justifyContent={vertical ? "flex-start" : { xs: "flex-start", sm: "flex-end" }}
        >
            <Typography onClick={() => go("/terms-and-conditions")} sx={linkSx}>
                {t("Terms & Conditions")}
            </Typography>
            <Typography onClick={() => go("/privacy-policy")} sx={linkSx}>
                {t("Privacy Policy")}
            </Typography>
            {configData?.refund_policy !== 0 && (
                <Typography onClick={() => go("/refund-policy")} sx={linkSx}>
                    {t("Refund Policy")}
                </Typography>
            )}
            {configData?.cancelation_policy !== 0 && (
                <Typography onClick={() => go("/cancellation-policy")} sx={linkSx}>
                    {t("Cancellation Policy")}
                </Typography>
            )}
            {configData?.shipping_policy !== 0 && (
                <Typography onClick={() => go("/shipping-policy")} sx={linkSx}>
                    {t("Shipping Policy")}
                </Typography>
            )}
        </CustomStackFullWidth>
        </NoSsr>
    );
}

export default FooterBottomItems