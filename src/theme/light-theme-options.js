// ── MODO CLARO — estilo Rappi/PedidosYa ──────────────────────────
// Color primario: Cyan #2FB9CB (siempre)
// Fondo: blanco puro, cards con sombra suave
// Tipografía: negrita, legible

const neutral = {
  90: "#FFFFFF1A",
  100: "#FFFFFF",
  200: "#E5E7EB",
  300: "#F6F7FB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
  1000: "#1A1A2E",
  1100: "#D6D6D6",
};

const background = {
  default: "#F4F6F9",   // gris muy suave — fondo de página
  paper: "#FFFFFF",
  custom: "#F0F2F5",
  custom2: "#FFFFFF",
  custom3: "#F6F7FB",
  custom4: "#FFFFFF",
  footer1: "#9f9f9f1a",
  footer2: "#9f9f9f0d",
  custom5: "#F4F6F8",
  custom6: "#FFFFFF",
  custom7: "#F6F6F6",
};

const divider = "#EAECF0";

const primary = {
  main: "#2FB9CB",
  deep: "#1A8E9D",
  light: "#E6F8FA",
  dark: "#1E98A8",
  semiLight: "#D4F4F8",
  contrastText: "#FFFFFF",
  customType1: "#47C8D8",
  customType2: "#2FB9CB",
  customType3: "#0DABB8",
  overLay: "#000000",
  lite: "rgba(47, 185, 203, 0.1)",
  icon: "#2FB9CB",
};

const moduleTheme = {
  pharmacy: "#2FB9CB",
  ecommerce: "#5859A3",
  food: "#FF6B35",
  parcel: "#2FB9CB",
};

const horizontalCardBG = "#E6F8FA";

const secondary = {
  main: "#5859A3",
  light: "#7879B8",
  dark: "#3E3F7A",
  contrastText: "#FFFFFF",
};

const success = {
  main: "#22C55E",
  light: "#4ADE80",
  dark: "#16A34A",
  contrastText: "#FFFFFF",
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  lite: "#DBF5FF",
  contrastText: "#FFFFFF",
  contrastText1: "#F5F6F8",
  blue: "#0D6EFD",
  custom1: "#31C0F5",
};

const warning = {
  main: "#F59E0B",
  light: "#FCD34D",
  lite: "#FEF3C7",
  liter: "#FFFBEB",
  dark: "#D97706",
  contrastText: "#FFFFFF",
  new: "#FFC817",
};

const error = {
  main: "#EF4444",
  light: "#F87171",
  dark: "#DC2626",
  contrastText: "#FFFFFF",
  deepLight: "#FF725E",
};

const text = {
  primary: "#111827",
  secondary: "#6B7280",
  disabled: "rgba(55, 65, 81, 0.38)",
  custom: "#1F2937",
  customText1: "#374151",
};

const footer = {
  inputButton: "#B3ECEF",
  inputButtonHover: "#7DD4DB",
  bottom: "rgba(21, 38, 62, 0.3)",
  foodBottom: "#686B78",
  appDownloadButtonBg: "#1A1A1A",
  appDownloadButtonBgGray: "#15263E",
  appDownloadButtonBgHover: "#4f4f4f",
  foodFooterBg: "#414141",
};

const customColor = {
  textGray: "#9c9c9c",
  textGrayDeep: "#787676",
  buyButton: "#F9E091",
  parcelWallet: "#8B3FFD",
};

const whiteContainer = { main: "#ffffff" };
const pink = { main: "#FF6D76" };
const foodCardColor = "#FFF6EF";
const paperBoxShadow = "#E5EAF1";
const roundStackOne = "rgba(255, 255, 255, 0.04)";
const roundStackTwo = "rgba(255, 255, 255, 0.06)";
const toolTipColor = neutral[1000];

export const lightThemeOptions = {
	components: {
		 MuiUseMediaQuery: { defaultProps: { noSsr: true } },
		MuiAvatar: {
			styleOverrides: {
				root: {
					backgroundColor: neutral[500],
					color: "#FFFFFF",
				},
			},
		},
		// Cards más redondeadas estilo Rappi
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: "16px",
					boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
					border: `1px solid ${divider}`,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
					borderRadius: "16px",
				},
				rounded: {
					borderRadius: "16px",
				},
			},
		},
		// Botones más redondeados
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
					"&:hover": { boxShadow: "0 4px 14px rgba(47,185,203,0.3)" },
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					borderRadius: "8px",
					"&.MuiChip-filledDefault": {
						backgroundColor: neutral[200],
						"& .MuiChip-deleteIcon": { color: neutral[400] },
					},
					"&.MuiChip-outlinedDefault": {
						"& .MuiChip-deleteIcon": { color: neutral[300] },
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
						"-webkit-box-shadow": "0 0 0 100px #f0f5f5 inset",
						"-webkit-text-fill-color": "#000",
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
					boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
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
					boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
				},
			},
		},
		MuiSwitch: {
			styleOverrides: {
				switchBase: { color: neutral[500] },
				track: { backgroundColor: neutral[400], opacity: 1 },
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
					backgroundColor: neutral[100],
					".MuiTableCell-root": { color: neutral[700] },
				},
			},
		},
		MuiBottomNavigation: {
			styleOverrides: {
				root: {
					backgroundColor: "#FFFFFF",
					borderTop: `1px solid ${divider}`,
				},
			},
		},
	},
	palette: {
		action: {
			active: neutral[500],
			focus: "rgba(55, 65, 81, 0.12)",
			hover: "rgba(55, 65, 81, 0.04)",
			selected: "rgba(55, 65, 81, 0.08)",
			disabledBackground: "rgba(55, 65, 81, 0.12)",
			disabled: "rgba(55, 65, 81, 0.26)",
		},
		horizontalCardBG,
		background,
		divider,
		error,
		info,
		mode: "light",
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
		"0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
		"0px 1px 2px rgba(100, 116, 139, 0.12)",
		"0px 1px 4px rgba(100, 116, 139, 0.12)",
		"0px 1px 5px rgba(100, 116, 139, 0.12)",
		"0px 1px 6px rgba(100, 116, 139, 0.12)",
		"0px 2px 6px rgba(100, 116, 139, 0.12)",
		"0px 3px 6px rgba(100, 116, 139, 0.12)",
		"0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
		"0px 5px 12px rgba(100, 116, 139, 0.12)",
		"0px 5px 14px rgba(100, 116, 139, 0.12)",
		"0px 5px 15px rgba(100, 116, 139, 0.12)",
		"0px 6px 15px rgba(100, 116, 139, 0.12)",
		"0px 7px 15px rgba(100, 116, 139, 0.12)",
		"0px 8px 15px rgba(100, 116, 139, 0.12)",
		"0px 9px 15px rgba(100, 116, 139, 0.12)",
		"0px 10px 15px rgba(100, 116, 139, 0.12)",
		"0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
		"0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
		"0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
		"0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
		"0px 25px 50px rgba(100, 116, 139, 0.25)",
		"0px 25px 50px rgba(100, 116, 139, 0.25)",
		"0px 25px 50px rgba(100, 116, 139, 0.25)",
		"0px 25px 50px rgba(100, 116, 139, 0.25)",
	],
};
