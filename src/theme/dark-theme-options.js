// Colors - Deliveroo Dark Theme

const neutral = {
  100: "#000000",
  200: "#1A1F1F",
  300: "#0F1515",
  400: "#717878",
  500: "#9AABAB",
  600: "#C4D0D0",
  700: "#1E2828",
  800: "#162020",
  900: "#0F1515",
  1000: "#FFFFFF",
  1100: "#D6D6D6",
};

const moduleTheme = {
  pharmacy: "#00CCBC",
  ecommerce: "#00CCBC",
  food: "#00CCBC",
  parcel: "#007A73",
};

const background = {
  default: "#0A1010",
  paper: "#0F1515",
  custom: "#1A2222",
  custom2: "#162020",
  custom3: "#162020",
  custom4: "#000000",
  footer1: "#FFFFFF1A",
  footer2: "#FFFFFF0D",
  custom5: "#1A2222",
  custom6: "rgba(0, 204, 188, 0.05)",
  custom7: "#000000",
};

const horizontalCardBG = "#162020";
const divider = "#1E3030";
const foodCardColor = "#162020";
const roundStackOne = "rgba(255, 255, 255, 0.04)";
const roundStackTwo = "rgba(255, 255, 255, 0.06)";

const primary = {
  main: "#00CCBC",
  light: "#33D9CB",
  dark: "#007A73",
  deep: "#005F5A",
  contrastText: "#0F1515",
  semiLight: "#003D39",
  overLay: "#000000",
  customType2: "#00B8AA",
  lite: "rgba(0, 204, 188, 0.1)",
  customType3: "#00E5D3",
  icon: "#ffffff",
};

const secondary = {
  main: "#00B8AA",
  light: "#33C9BC",
  dark: "#007A73",
  contrastText: "#0F1515",
};

const success = {
  main: "#00CCBC",
  light: "#33D9CB",
  dark: "#007A73",
  contrastText: "#0F1515",
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  lite: "#DBF5FF",
  contrastText: "#0F1515",
  contrastText1: "#F5F6F8",
  blue: "#0D6EFD",
  custom1: "#31C0F5",
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  lite: "#FFBD8B",
  liter: "#2A1F00",
  contrastText: "#0F1515",
  new: "#FFC817",
};

const error = {
  main: "#E8203A",
  light: "#EE4D62",
  dark: "#B01629",
  contrastText: "#0F1515",
  deepLight: "#FF5C72",
};

const text = {
  primary: "#E8EDED",
  secondary: "#8FAAAA",
  disabled: "rgba(255, 255, 255, 0.38)",
  custom: "#D0DADA",
  customText1: "#B8CCCC",
};

const footer = {
  inputButton: "#00CCBC",
  inputButtonHover: "#007A73",
  bottom: "rgba(0, 122, 115, 0.3)",
  foodBottom: "#2E3333",
  appDownloadButtonBg: "#1A2222",
  appDownloadButtonBgGray: "#243030",
  foodFooterBg: "#1A2222",
};

const customColor = {
  textGray: "#717878",
  textGrayDeep: "#5A6666",
  buyButton: "#00CCBC",
  parcelWallet: "#7C3AED",
};

const whiteContainer = {
  main: "#162020",
};

const pink = {
  main: "#FF6D76",
};

const toolTipColor = "#4A5E5E";
const paperBoxShadow = "#0A1010";

export const darkThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: "#FFFFFF",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-filledDefault": {
            backgroundColor: neutral[800],
            "& .MuiChip-deleteIcon": {
              color: neutral[500],
            },
          },
          "&.MuiChip-outlinedDefault": {
            borderColor: neutral[700],
            "& .MuiChip-deleteIcon": {
              color: neutral[700],
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: text.secondary,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px #1A2222 inset",
            "-webkit-text-fill-color": "#E8EDED",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[100],
        },
        track: {
          backgroundColor: neutral[500],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[800],
          ".MuiTableCell-root": {
            color: neutral[600],
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: neutral[500],
      hover: "rgba(0, 204, 188, 0.06)",
      selected: "rgba(0, 204, 188, 0.12)",
      disabledBackground: "rgba(255, 255, 255, 0.10)",
      disabled: "rgba(255, 255, 255, 0.26)",
    },
    horizontalCardBG,
    background,
    divider,
    error,
    info,
    mode: "dark",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
    footer,
    customColor,
    whiteContainer,
    pink,
    paperBoxShadow,
    foodCardColor,
    moduleTheme,
    roundStackOne,
    roundStackTwo,
    toolTipColor,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.4)",
    "0px 1px 2px rgba(0, 0, 0, 0.4)",
    "0px 1px 4px rgba(0, 0, 0, 0.4)",
    "0px 1px 5px rgba(0, 0, 0, 0.4)",
    "0px 1px 6px rgba(0, 0, 0, 0.4)",
    "0px 2px 6px rgba(0, 0, 0, 0.4)",
    "0px 3px 6px rgba(0, 0, 0, 0.4)",
    "0px 4px 6px rgba(0, 0, 0, 0.4)",
    "0px 5px 12px rgba(0, 0, 0, 0.4)",
    "0px 5px 14px rgba(0, 0, 0, 0.4)",
    "0px 5px 15px rgba(0, 0, 0, 0.4)",
    "0px 6px 15px rgba(0, 0, 0, 0.4)",
    "0px 7px 15px rgba(0, 0, 0, 0.4)",
    "0px 8px 15px rgba(0, 204, 188, 0.08)",
    "0px 9px 15px rgba(0, 0, 0, 0.4)",
    "0px 10px 15px rgba(0, 0, 0, 0.4)",
    "0px 12px 22px -8px rgba(0, 0, 0, 0.4)",
    "0px 13px 22px -8px rgba(0, 0, 0, 0.4)",
    "0px 14px 24px -8px rgba(0, 0, 0, 0.4)",
    "0px 20px 25px rgba(0, 0, 0, 0.4)",
    "0px 25px 50px rgba(0, 0, 0, 0.4)",
    "0px 25px 50px rgba(0, 0, 0, 0.4)",
    "0px 25px 50px rgba(0, 0, 0, 0.4)",
    "0px 25px 50px rgba(0, 0, 0, 0.4)",
  ],
};