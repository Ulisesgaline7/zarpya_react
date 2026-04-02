import { Box, alpha, styled } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";

export const StyledFooterBackground = styled(Box)(
  ({ theme, nobottommargin }) => ({
    width: "100%",
    backgroundColor: theme.palette.background.custom4,
    borderRadius: "28px 28px 0 0",
    marginTop: "-20px",
    borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    [theme.breakpoints.down("md")]: {
      marginBottom: nobottommargin === "true" ? "none" : "70px",
    },
  })
);

export const StyledFooterTop = styled(CustomStackFullWidth)(({ theme }) => ({
  backgroundColor:
    getCurrentModuleType() === ModuleTypes?.FOOD
      ? alpha(theme.palette.moduleTheme.food, 0.06)
      : alpha(theme.palette.primary.main, 0.07),
  width: "100%",
  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  [theme.breakpoints.down("md")]: {
    paddingBottom: "20px",
  },
}));