import { Box, alpha, styled } from "@mui/material";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
export const StyledFooterBackground = styled(Box)(
	({ theme, nobottommargin }) => ({
		//minHeight: '500px',
		width: "100%",
		backgroundColor: theme.palette.mode === "dark" ? "#000D1A" : "#0A1929",
		borderRadius:'20px 20px 0 0',
		marginTop:'-16px',
		[theme.breakpoints.down("md")]: {
			marginBottom: nobottommargin === "true" ? "none" : "70px",
		},
	})
);

export const StyledFooterTop = styled(CustomStackFullWidth)(({ theme }) => ({
	backgroundColor: "transparent",
	width: "100%",
	[theme.breakpoints.down("md")]: {
		paddingBottom:"20px"
	},
}));
