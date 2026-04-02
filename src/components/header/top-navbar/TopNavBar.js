import {
	Box,
	NoSsr,
	Stack,
	Typography,
	useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { CustomStackForLoaction } from "../NavBar.style";
import ThemeSwitches from "./ThemeSwitches";
import AddressReselect from "./address-reselect/AddressReselect";
import CustomLanguage from "./language/CustomLanguage";

import { useSelector } from "react-redux";
import CallToAdmin from "../../CallToAdmin";
import CustomContainer from "../../container";
import LogoSide from "../../logo/LogoSide";
import DrawerMenu from "./drawer-menu/DrawerMenu";

export const AddressTypographyGray = styled(Typography)(({ theme }) => ({
	color: "rgba(255,255,255,0.9)",
	fontSize: "13px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	display: "-webkit-box",
	WebkitLineClamp: "1",
	WebkitBoxOrient: "vertical",
}));

const TopNavBar = () => {
	const { configData, countryCode, language } = useSelector(
		(state) => state.configData
	);
	const [tempLocation, setTempLocation] = useState(() => {
		if (typeof window === "undefined") return null;
		return localStorage.getItem("location");
	});
	const [openDrawer, setOpenDrawer] = useState(false);
	const isSmall = useMediaQuery("(max-width:1180px)");

	useEffect(() => {
		if (typeof window === "undefined") return;

		const readLocation = () => localStorage.getItem("location");
		let prevLocation = readLocation();

		const syncLocation = () => {
			const nextLocation = readLocation();
			if (nextLocation !== prevLocation) {
				prevLocation = nextLocation;
				setTempLocation(nextLocation);
			}
		};

		setTempLocation(prevLocation);
		window.addEventListener("storage", syncLocation);
		window.addEventListener("focus", syncLocation);
		const intervalId = window.setInterval(syncLocation, 1000);

		return () => {
			window.removeEventListener("storage", syncLocation);
			window.removeEventListener("focus", syncLocation);
			window.clearInterval(intervalId);
		};
	}, []);

	return null;
};

export default TopNavBar;
