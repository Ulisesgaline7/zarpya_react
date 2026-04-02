// Colors - Deliveroo Theme

const neutral = {
	90: "#FFFFFF1A",
	100: "#FFFFFF",
	200: "#E5E7EB",
	300: "#F5F6F6",
	400: "#9CA3AF",
	500: "#6B7280",
	600: "#4B5563",
	700: "#374151",
	800: "#2E3333",
	900: "#1A1F1F",
	1000: "#2E3333",
	1100: "#D6D6D6",
};

const background = {
	default: "#F5F6F6",
	paper: "#FFFFFF",
	custom: "#F0F2F2",
	custom2: "#FFFFFF",
	custom3: "#F5F6F6",
	custom4: "#ffffff",
	footer1: "#2E33331A",
	footer2: "#2E33330D",
	custom5: "#EFF1F1",
	custom6: "#FAFAFA",
	custom7: "#F5F5F5",
};

const divider = "#E0E4E4";

const primary = {
	main: "#00CCBC",
	deep: "#007A73",
	light: "#E6FAF9",
	dark: "#005F5A",
	semiLight: "#DFFAF8",
	contrastText: "#FFFFFF",
	customType1: "#00E5D3",
	customType2: "#00CCBC",
	customType3: "#00B8AA",
	overLay: "#000000",
	lite: "rgba(0, 204, 188, 0.1)",
	icon: "#00CCBC",
};

const moduleTheme = {
	pharmacy: "#00CCBC",
	ecommerce: "#00CCBC",
	food: "#00CCBC",
	parcel: "#00CCBC",
};

const horizontalCardBG = "#E6FAF9";

const secondary = {
	main: "#00B8AA",
	light: "#33C9BC",
	dark: "#007A73",
	contrastText: "#FFFFFF",
};

const success = {
	main: "#00CCBC",
	light: "#33D9CB",
	dark: "#007A73",
	contrastText: "#FFFFFF",
};

const info = {
	main: "#2196F3",
	light: "#64B6F7",
	dark: "#0B79D0",
	lite: "#DBF5FF",
	contrastText: "#FFFFFF",
	contrastText1: "#F5F6F6",
	blue: "#0D6EFD",
	custom1: "#31C0F5",
};

const warning = {
	main: "#FFB020",
	light: "#FFF8D5",
	lite: "#FFBD8B",
	liter: "#FFF8F2",
	dark: "#FE961C",
	contrastText: "#FFFFFF",
	new: "#FFC817",
};

const error = {
	main: "#E8203A",
	light: "#EE4D62",
	dark: "#B01629",
	contrastText: "#FFFFFF",
	deepLight: "#FF5C72",
};

const text = {
	primary: "#2E3333",
	secondary: "#717878",
	disabled: "rgba(46, 51, 51, 0.48)",
	custom: "#3F3F3F",
	customText1: "#4B5563",
};

const footer = {
	inputButton: "#00CCBC",
	inputButtonHover: "#007A73",
	bottom: "rgba(0, 122, 115, 0.3)",
	foodBottom: "#2E3333",
	appDownloadButtonBg: "#2E3333",
	appDownloadButtonBgGray: "#3D4444",
	appDownloadButtonBgHover: "#4f5555",
	foodFooterBg: "#2E3333",
};

const customColor = {
	textGray: "#9c9c9c",
	textGrayDeep: "#717878",
	buyButton: "#00CCBC",
	parcelWallet: "#7C3AED",
};

const whiteContainer = {
	main: "#ffffff",
};

const pink = {
	main: "#FF6D76",
};

const foodCardColor = "#F0FAF9";
const paperBoxShadow = "#DDE4E4";
const roundStackOne = "rgba(255, 255, 255, 0.04)";
const roundStackTwo = "rgba(255, 255, 255, 0.06)";
const toolTipColor = neutral[1000];

export const lightThemeOptions = {
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
						backgroundColor: neutral[200],
						"& .MuiChip-deleteIcon": {
							color: neutral[400],
						},
					},
					"&.MuiChip-outlinedDefault": {
						"& .MuiChip-deleteIcon": {
							color: neutral[300],
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
						"-webkit-box-shadow": "0 0 0 100px #eef5f5 inset",
						"-webkit-text-fill-color": "#000",
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
					color: neutral[500],
				},
				track: {
					backgroundColor: neutral[400],
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
					backgroundColor: neutral[100],
					".MuiTableCell-root": {
						color: neutral[700],
					},
				},
			},
		},
	},
	palette: {
		action: {
			active: neutral[500],
			focus: "rgba(46, 51, 51, 0.12)",
			hover: "rgba(46, 51, 51, 0.04)",
			selected: "rgba(46, 51, 51, 0.08)",
			disabledBackground: "rgba(46, 51, 51, 0.12)",
			disabled: "rgba(46, 51, 51, 0.26)",
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
		"0px 1px 1px rgba(46, 51, 51, 0.06), 0px 1px 2px rgba(46, 51, 51, 0.1)",
		"0px 1px 2px rgba(46, 51, 51, 0.12)",
		"0px 1px 4px rgba(46, 51, 51, 0.12)",
		"0px 1px 5px rgba(46, 51, 51, 0.12)",
		"0px 1px 6px rgba(46, 51, 51, 0.12)",
		"0px 2px 6px rgba(46, 51, 51, 0.12)",
		"0px 3px 6px rgba(46, 51, 51, 0.12)",
		"0px 2px 4px rgba(46, 51, 51, 0.06), 0px 4px 6px rgba(46, 51, 51, 0.12)",
		"0px 5px 12px rgba(46, 51, 51, 0.12)",
		"0px 5px 14px rgba(46, 51, 51, 0.12)",
		"0px 5px 15px rgba(46, 51, 51, 0.12)",
		"0px 6px 15px rgba(46, 51, 51, 0.12)",
		"0px 7px 15px rgba(46, 51, 51, 0.12)",
		"0px 8px 15px rgba(46, 51, 51, 0.12)",
		"0px 9px 15px rgba(46, 51, 51, 0.12)",
		"0px 10px 15px rgba(46, 51, 51, 0.12)",
		"0px 12px 22px -8px rgba(46, 51, 51, 0.25)",
		"0px 13px 22px -8px rgba(46, 51, 51, 0.25)",
		"0px 14px 24px -8px rgba(46, 51, 51, 0.25)",
		"0px 10px 10px rgba(46, 51, 51, 0.04), 0px 20px 25px rgba(46, 51, 51, 0.1)",
		"0px 25px 50px rgba(46, 51, 51, 0.25)",
		"0px 25px 50px rgba(46, 51, 51, 0.25)",
		"0px 25px 50px rgba(46, 51, 51, 0.25)",
		"0px 25px 50px rgba(46, 51, 51, 0.25)",
	],
};