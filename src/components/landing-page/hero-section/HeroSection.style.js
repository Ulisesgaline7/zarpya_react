import { alpha, Paper, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CustomButtonPrimary } from "../../../styled-components/CustomButtons.style";
import Box from "@mui/material/Box";

export const CustomSearchField = styled(Paper)(({ theme }) => ({
  width: "100%",
  border: "none",
}));

export const SearchLocationTextField = styled(TextField)(
  ({
    theme,
    language_direction,
    frommap,
    fromparcel,
    margin_top,
    isLanding,
    isXSmall,
    searchHeight,
    showCurrentLocation,
    backgroundColor,
    toReceiver,
  }) => ({
    width: "100%",
    backgroundColor: backgroundColor
      ? theme.palette.mode === "dark" ? "#0d1a12" : "#ffffff"
      : theme.palette.mode === "dark" ? "#0d1a12" : theme.palette.neutral[300],
    borderRadius: isXSmall && isLanding ? "14px" : "0 0 14px 14px",
    border: "none",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      fontSize: fromparcel === "true" ? "12px" : { xs: "14px", sm: "16px" },
      padding: fromparcel === "true" && "5px",
      height: fromparcel === "true" && "45px",
      paddingRight: "0px",
      borderTopRightRadius:
        frommap === "true" ? "0px" : fromparcel === "false" ? "0px" : "14px",
      borderBottomRightRadius:
        frommap === "true" ? "0px" : fromparcel === "false" ? "0px" : "14px",
      borderTopLeftRadius: frommap === "true" && "0px",
      borderBottomLeftRadius: frommap === "true" && "0px",
      border: "1.5px solid",
      borderColor: alpha(theme.palette.neutral[400], 0.3),
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      "& fieldset": { borderColor: theme.palette.primary.main },
      "&:hover": {
        borderColor: alpha(theme.palette.primary.main, 0.45),
      },
      "&:hover fieldset": { borderColor: theme.palette.primary.main },
      "&.Mui-focused": {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
      },
      "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
      "& .MuiAutocomplete-input": {
        padding: "2.5px 4px 2.5px 6px",
      },
      "& .MuiInputBase-input": {
        padding: showCurrentLocation && "11.5px 14px",
      },
      "& .MuiInputBase-input::placeholder": {
        opacity: theme.palette.mode === "dark" ? ".55" : ".65",
      },
    },
  })
);

export const StyledButton = styled(CustomButtonPrimary)(
  ({ theme, radiuschange, language_direction }) => ({
    color: theme.palette.whiteContainer.main,
    width: "500px",
    padding: "10px 7px 11px 7px",
    fontWeight: 700,
    fontSize: "15px",
    letterSpacing: "0.02em",
    marginLeft: language_direction === "rtl" && "15px",
    borderTopLeftRadius:
      (language_direction === "ltr" || !language_direction) &&
      radiuschange === "true"
        ? "0px"
        : undefined,
    borderBottomLeftRadius:
      (language_direction === "ltr" || !language_direction) &&
      radiuschange === "true"
        ? "0px"
        : undefined,
    borderTopRightRadius:
      language_direction === "rtl" && radiuschange === "true" ? "0px" : undefined,
    borderBottomRightRadius:
      language_direction === "rtl" && radiuschange === "true" ? "0px" : undefined,
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: `0 6px 24px ${alpha(theme.palette.primary.main, 0.55)}`,
    },
    "&:disabled": {
      opacity: 0.45,
      cursor: "not-allowed",
    },
  })
);

export const CustomBox = styled(Box)(({ theme }) => ({
  maxWidth: "825px",
  width: "100%",
  padding: "2.625rem",
  borderRadius: "1.25rem",
  height: "132px",
}));

export const CustomTypography = styled(Typography)(
  ({ theme, fontWeight, align }) => ({
    color: theme.palette.neutral[1000],
    fontWeight: fontWeight ? fontWeight : "inherit",
    textAlign: align ? align : "",
  })
);

export const HeroFormInputWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  position: "relative",
}));

export const HeroFormItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  position: "absolute",
  marginRight: "5px",
  top: "0",
  right: "0",
}));