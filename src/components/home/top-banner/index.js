import { alpha, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";
import { BannerCityIcon } from "components/home/module-wise-components/rental/RentalIcons";
import LeftCar from "/public/static/rental/left_car.png";
import RightCar from "/public/static/rental/right_car.png";
import { useEffect, useState } from "react";

// Gradientes por módulo — colores originales de Zarpya
const MODULE_GRADIENTS = {
  grocery:  "linear-gradient(135deg, #15263E 0%, #1a3550 40%, #2FB9CB 100%)",
  pharmacy: "linear-gradient(135deg, #15263E 0%, #1e3048 40%, #5859A3 100%)",
  ecommerce:"linear-gradient(135deg, #0D1E30 0%, #15263E 50%, #2FB9CB 100%)",
  food:     "linear-gradient(135deg, #2FB9CB 0%, #15263E 60%, #000100 100%)",
  parcel:   "linear-gradient(135deg, #15263E 0%, #1a3550 50%, #4AB05E 100%)",
  taxi:     "linear-gradient(135deg, #0D1E30 0%, #15263E 50%, #2FB9CB 100%)",
  services: "linear-gradient(135deg, #15263E 0%, #1a3550 50%, #F59E0B 100%)",
};

const TopBanner = () => {
  const [moduleType, setModuleType] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setModuleType(getCurrentModuleType());
  }, []);

  const gradient =
    MODULE_GRADIENTS[moduleType] ||
    "linear-gradient(135deg, #15263E 0%, #2FB9CB 100%)";

  const isRental = moduleType === "rental";
  const isParcel = moduleType === "parcel";

  return (
    <CustomBoxFullWidth
      sx={{
        minHeight: {
          xs: isParcel ? "200px" : "240px",
          sm: "280px",
          md: "300px",
        },
        position: "relative",
        overflow: "hidden",
        background: gradient,
      }}
    >
      {isRental ? (
        <Box
          sx={{
            svg: { position: "absolute" },
            ".left_img": (t) => ({
              position: "absolute",
              left: "-150px",
              bottom: 0,
              [t.breakpoints.up("sm")]: { left: "-60px" },
            }),
            ".right_img": (t) => ({
              position: "absolute",
              left: "auto",
              right: "-150px",
              bottom: 0,
              [t.breakpoints.up("sm")]: { right: "-50px" },
            }),
          }}
        >
          <BannerCityIcon height="100%" width="100%" objectFit="cover" />
          <Box component="img" className="left_img" src={LeftCar?.src} width={238} height={94} alt="" />
          <Box component="img" className="right_img" src={RightCar?.src} width={246} height={122} alt="" />
        </Box>
      ) : (
        <>
          {/* Wave bottom */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "48px",
              background: theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "#fff",
              clipPath: "ellipse(60% 100% at 50% 100%)",
              pointerEvents: "none",
            }}
          />
          {/* Dot grid */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          />
          {/* Círculo decorativo top-right */}
          <Box
            sx={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: { xs: "260px", md: "400px" },
              height: { xs: "260px", md: "400px" },
              borderRadius: "50%",
              background: alpha("#fff", 0.04),
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: { xs: "150px", md: "240px" },
              height: { xs: "150px", md: "240px" },
              borderRadius: "50%",
              background: alpha("#fff", 0.03),
              pointerEvents: "none",
            }}
          />
          {/* Círculo bottom-left */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-80px",
              left: "-80px",
              width: { xs: "200px", md: "300px" },
              height: { xs: "200px", md: "300px" },
              borderRadius: "50%",
              background: alpha("#fff", 0.03),
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </CustomBoxFullWidth>
  );
};

export default TopBanner;
