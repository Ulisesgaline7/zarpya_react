import React, { useState } from "react";
import { Button, Typography, alpha } from "@mui/material";
import { Stack, styled } from "@mui/system";
import CustomContainer from "./container";
import { CustomStackFullWidth } from "styled-components/CustomStyles.style";
import { useTranslation } from "react-i18next";

const Wrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  width: "calc(100% - 40px)",
  maxWidth: "820px",
  padding: theme.spacing(1.8, 2.5),
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(6,20,16,0.96)"
      : "rgba(255,255,255,0.97)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(0,204,188,0.2)"
      : "rgba(0,204,188,0.22)"
  }`,
  borderRadius: "18px",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 16px 56px rgba(0,0,0,0.45)"
      : "0 16px 56px rgba(0,0,0,0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  zIndex: 9999,
  animation: "fadeInUp 0.4s ease both",
  whiteSpace: "nowrap",
}));

const CookiesConsent = ({ text }) => {
  const [showConsent, setShowConsent] = useState(true);
  const { t } = useTranslation();

  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "true");
    setShowConsent(false);
  };
  const handleDeny = () => {
    localStorage.setItem("cookiesConsent", "false");
    setShowConsent(false);
  };

  let cookiesConsent;
  if (typeof window !== "undefined") {
    cookiesConsent = window.localStorage.getItem("cookiesConsent");
  }

  if (!showConsent || cookiesConsent === "true") {
    return null;
  }

  return (
    <Wrapper>
      <CustomContainer>
        <CustomStackFullWidth
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: "20px", flexShrink: 0 }}>🍪</Typography>
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "14px" },
                color: "text.secondary",
                lineHeight: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: { xs: "normal", sm: "nowrap" },
              }}
            >
              {text}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1.2} sx={{ flexShrink: 0 }}>
            <Button
              id="cookies-deny-btn"
              variant="outlined"
              color="primary"
              onClick={handleDeny}
              sx={{
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "13px",
                px: 2.2, py: 0.85,
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.35),
                "&:hover": {
                  borderColor: "primary.main",
                  background: (theme) => alpha(theme.palette.primary.main, 0.06),
                },
              }}
            >
              {t("Deny")}
            </Button>
            <Button
              id="cookies-accept-btn"
              variant="contained"
              color="primary"
              onClick={handleAccept}
              sx={{
                color: "#fff",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "13px",
                px: 2.5, py: 0.85,
                boxShadow: (theme) =>
                  `0 4px 16px ${alpha(theme.palette.primary.main, 0.45)}`,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: (theme) =>
                    `0 6px 22px ${alpha(theme.palette.primary.main, 0.55)}`,
                },
              }}
            >
              {t("Accept")}
            </Button>
          </Stack>
        </CustomStackFullWidth>
      </CustomContainer>
    </Wrapper>
  );
};

export default CookiesConsent;