// ── MODO OSCURO — estilo Rappi dark ──────────────────────────────
// Fondo: azul marino profundo, no negro puro
// Cards: azul oscuro con borde sutil
// Primario: Cyan #2FB9CB (siempre)

const neutral = {
  100: "#0A0F1E",
  200: "#1A2235",
  300: "#111827",
  400: "#9CA3AF",
  500: "#8B9BB4",
  600: "#C5D0E0",
  700: "#E2E8F0",
  800: "#1E293B",
  900: "#0F172A",
  1000: "#F1F5F9",
  1100: "#D6D6D6",
};
const moduleTheme = {
  pharmacy: "#2FB9CB",
  ecommerce: "#5859A3",
  food: "#4AB05E",
  parcel: "#2FB9CB",
};

const background = {
  default: "#060D1A",    // azul marino muy oscuro
  paper: "#0D1829",      // cards
  custom: "#111F35",
  custom2: "#162030",
  custom3: "#0D1829",
  custom4: "#060D1A",
  footer1: "#9f9f9f1a",
  footer2: "#9f9f9f1a",
  custom5: "#111F35",
  custom6: "rgba(255, 255, 255, 0.04)",
  custom7: "#060D1A",
};
const horizontalCardBG = "#0D1829";
const divider = "#1E2D45";
const foodCardColor = neutral[800];
const roundStackOne = "rgba(255, 255, 255, 0.04)";
const roundStackTwo = "rgba(255, 255, 255, 0.06)";
const primary = {
  main: "#2FB9CB",
  light: "#47C8D8",
  dark: "#1E98A8",
  deep: "#1A8E9D",
  contrastText: "#FFFFFF",
  semiLight: "#D4F4F8",
  overLay: "#000000",
  customType2: "#2FB9CB",
  lite: "rgba(47, 185, 203, 0.1)",
  customType3: "#0DABB8",
  icon: "#2FB9CB",
};

const secondary = {
  main: "#5859A3",
  light: "#7879B8",
  dark: "#3E3F7A",
  contrastText: "#FFFFFF",
};

const success = {
  main: "#4AB05E",
  light: "#6BC27B",
  dark: "#337E42",
  contrastText: "#FFFFFF",
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  lite: "#DBF5FF",
  contrastText: neutral[900],
  contrastText1: "#F5F6F8",
  blue: "#0D6EFD",
  custom1: "#31C0F5",
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  lite: "#FFBD8B",
  liter: "#FFF8F2",
  contrastText: neutral[900],
  new: "#FFC817",
};

const error = {
  main: "#D14343",
  light: "#DA6868",
  dark: "#922E2E",
  contrastText: neutral[900],
  deepLight: "#FF725E",
};

const text = {
  primary: "#F1F5F9",
  secondary: "#8B9BB4",
  disabled: "rgba(255, 255, 255, 0.38)",
  custom: "#E2E8F0",
  customText1: "#CBD5E1",
};
const footer = {
  inputButton: "#B3ECEF",
  inputButtonHover: "#7DD4DB",
  bottom: "rgba(21, 38, 62, 0.3)",
  foodBottom: "#686B78",
  appDownloadButtonBg: "#1A1A1A",
  appDownloadButtonBgGray: "#15263E",
  foodFooterBg: "#414141",
};
const customColor = {
  textGray: "#9c9c9c",
  textGrayDeep: "#787676",
  buyButton: "#F9E091",
  parcelWallet: "#8B3FFD",
};
const whiteContainer = {
  main: "#ffffff",
};
const pink = {
  main: "#FF6D76",
};
const toolTipColor = "#88908C";
const paperBoxShadow = "#E5EAF1";
export const darkThemeOptions = {
  components: {
     MuiUseMediaQuery: { defaultProps: { noSsr: true } },
    MuiAvatar: {
      styleOverrides: {
        root: { backgroundColor: neutral[500], color: "#FFFFFF" },
      },
    },
    // Cards redondeadas modo oscuro
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
          border: `1px solid ${divider}`,
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", borderRadius: "16px" },
        rounded: { borderRadius: "16px" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "12px",
          fontWeight: 700,
        },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "0 4px 14px rgba(47,185,203,0.35)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "8px",
          "&.MuiChip-filledDefault": {
            backgroundColor: neutral[800],
            "& .MuiChip-deleteIcon": { color: neutral[500] },
          },
          "&.MuiChip-outlinedDefault": {
            borderColor: neutral[700],
            "& .MuiChip-deleteIcon": { color: neutral[700] },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: "12px !important" },
        input: {
          "&::placeholder": { opacity: 1, color: text.secondary },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: "12px" },
        notchedOutline: { borderColor: divider },
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px #0D1829 inset",
            "-webkit-text-fill-color": "#F1F5F9",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "16px",
          borderColor: divider,
          borderStyle: "solid",
          borderWidth: 1,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: { color: neutral[100] },
        track: { backgroundColor: neutral[500], opacity: 1 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: `1px solid ${divider}` },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[800],
          ".MuiTableCell-root": { color: neutral[300] },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: background.paper,
          borderTop: `1px solid ${divider}`,
        },
      },
    },
  },
  palette: {
    action: {
      active: neutral[400],
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
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
    "0px 1px 2px rgba(0, 0, 0, 0.24)",
    "0px 1px 2px rgba(0, 0, 0, 0.24)",
    "0px 1px 4px rgba(0, 0, 0, 0.24)",
    "0px 1px 5px rgba(0, 0, 0, 0.24)",
    "0px 1px 6px rgba(0, 0, 0, 0.24)",
    "0px 2px 6px rgba(0, 0, 0, 0.24)",
    "0px 3px 6px rgba(0, 0, 0, 0.24)",
    "0px 4px 6px rgba(0, 0, 0, 0.24)",
    "0px 5px 12px rgba(0, 0, 0, 0.24)",
    "0px 5px 14px rgba(0, 0, 0, 0.24)",
    "0px 5px 15px rgba(0, 0, 0, 0.24)",
    "0px 6px 15px rgba(0, 0, 0, 0.24)",
    "0px 7px 15px rgba(0, 0, 0, 0.24)",
    "0px 8px 15px rgba(255, 255, 255, 0.07)",
    "0px 9px 15px rgba(0, 0, 0, 0.24)",
    "0px 10px 15px rgba(0, 0, 0, 0.24)",
    "0px 12px 22px -8px rgba(0, 0, 0, 0.24)",
    "0px 13px 22px -8px rgba(0, 0, 0, 0.24)",
    "0px 14px 24px -8px rgba(0, 0, 0, 0.24)",
    "0px 20px 25px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
    "0px 25px 50px rgba(0, 0, 0, 0.24)",
  ],
};
