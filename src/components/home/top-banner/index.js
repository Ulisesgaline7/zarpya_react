import { alpha, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";
import { BannerCityIcon } from "components/home/module-wise-components/rental/RentalIcons";
import LeftCar from "/public/static/rental/left_car.png";
import RightCar from "/public/static/rental/right_car.png";
import { useEffect, useState } from "react";

// Module-specific gradient configs
const MODULE_GRADIENTS = {
  grocery: "linear-gradient(135deg, #15263E 0%, #1a3550 40%, #2FB9CB 100%)",
  pharmacy: "linear-gradient(135deg, #15263E 0%, #1e3048 40%, #5859A3 100%)",
  ecommerce: "linear-gradient(135deg, #0D1E30 0%, #15263E 50%, #2FB9CB 100%)",
  food: "linear-gradient(135deg, #2FB9CB 0%, #15263E 60%, #000100 100%)",
  parcel: "linear-gradient(135deg, #15263E 0%, #1a3550 50%, #4AB05E 100%)",
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
          xs: isParcel ? "220px" : "260px",
          sm: "300px",
          md: "340px",
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
          <Box
            component="img"
            className="left_img"
            src={LeftCar?.src}
            width={238}
            height={94}
            alt=""
          />
          <Box
            component="img"
            className="right_img"
            src={RightCar?.src}
            width={246}
            height={122}
            alt=""
          />
        </Box>
      ) : (
        <>
          {/* Decorative wave overlay bottom */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50px",
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.background.default
                  : "#fff",
              clipPath: "ellipse(60% 100% at 50% 100%)",
              pointerEvents: "none",
            }}
          />
          {/* Subtle dot grid pattern */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.06,
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />
          {/* Top-right decorative circle */}
          <Box
            sx={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: { xs: "240px", md: "380px" },
              height: { xs: "240px", md: "380px" },
              borderRadius: "50%",
              background: alpha("#fff", 0.05),
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: { xs: "140px", md: "220px" },
              height: { xs: "140px", md: "220px" },
              borderRadius: "50%",
              background: alpha("#fff", 0.04),
              pointerEvents: "none",
            }}
          />
          {/* Bottom-left decorative circle */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: { xs: "180px", md: "280px" },
              height: { xs: "180px", md: "280px" },
              borderRadius: "50%",
              background: alpha("#fff", 0.04),
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </CustomBoxFullWidth>
  );
};

export default TopBanner;
