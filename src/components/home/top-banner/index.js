import { alpha, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import { CustomBoxFullWidth } from "styled-components/CustomStyles.style";
import CustomImageContainer from "../../CustomImageContainer";
import banner from "../assets/banner.webp";
import rcommerceSearchBg from "../assets/ecommerce_top_bg.png";
import foodBanner from "../assets/food.png";
import pharmacy from "../assets/par.png";
import parcelImage from "../assets/parcelBg.png";
import { BannerCityIcon } from "components/home/module-wise-components/rental/RentalIcons";
import LeftCar from "/public/static/rental/left_car.png";
import RightCar from "/public/static/rental/right_car.png";
import { useEffect, useState } from "react";
import Image from "next/image";

// Inline SVG wave component
const OceanWaves = ({ theme }) => {
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main; // #00CCBC

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
        background: isDark
          ? `linear-gradient(160deg, #020d0b 0%, #041a15 40%, #062820 70%, #041a15 100%)`
          : `linear-gradient(160deg, #e0faf7 0%, #c5f4ef 40%, #a8edea 70%, #c5f4ef 100%)`,
      }}
    >
      {/* Stars / bubbles background */}
      {[...Array(18)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${4 + (i % 5) * 3}px`,
            height: `${4 + (i % 5) * 3}px`,
            borderRadius: "50%",
            background: isDark
              ? `rgba(0,204,188,${0.06 + (i % 4) * 0.04})`
              : `rgba(0,204,188,${0.12 + (i % 4) * 0.06})`,
            top: `${(i * 17) % 90}%`,
            left: `${(i * 13 + 5) % 95}%`,
            animation: `zarBubble ${3 + (i % 4)}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`,
            "@keyframes zarBubble": {
              from: { transform: "translateY(0px) scale(1)", opacity: 0.6 },
              to: { transform: "translateY(-12px) scale(1.15)", opacity: 1 },
            },
          }}
        />
      ))}

      {/* Decorative rope / horizon line */}
      <Box
        sx={{
          position: "absolute",
          bottom: "40%",
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${alpha(primary, 0.15)} 20%, ${alpha(primary, 0.3)} 50%, ${alpha(primary, 0.15)} 80%, transparent 100%)`,
        }}
      />

      {/* Anchor watermark */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "-30px", md: "40px" },
          bottom: { xs: "-20px", md: "10px" },
          fontSize: { xs: "120px", md: "180px" },
          opacity: isDark ? 0.04 : 0.06,
          userSelect: "none",
          lineHeight: 1,
          filter: "blur(1px)",
        }}
      >
        ⚓
      </Box>

      {/* Wave SVG — bottom */}
      <Box
        component="svg"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: { xs: "50px", sm: "70px", md: "90px" },
          zIndex: 2,
        }}
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,10 1080,45 C1260,80 1380,30 1440,50 L1440,90 L0,90 Z"
          fill={isDark ? "#061410" : "#f0fcfa"}
          opacity="0.9"
        />
        <path
          d="M0,60 C200,20 400,70 600,50 C800,30 1000,65 1200,45 C1320,35 1380,55 1440,40 L1440,90 L0,90 Z"
          fill={isDark ? "#071914" : "#e8faf8"}
          opacity="0.7"
        />
      </Box>
    </Box>
  );
};

const TopBanner = () => {
  const [moduleType, setModuleType] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setModuleType(getCurrentModuleType());
  }, []);

  const getBGImage = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return banner?.src;
      case ModuleTypes.PHARMACY:
        return pharmacy?.src;
      case ModuleTypes.ECOMMERCE:
        return rcommerceSearchBg?.src;
      case ModuleTypes.FOOD:
        return foodBanner?.src;
      case ModuleTypes.PARCEL:
        return parcelImage?.src;
      default:
        return null;
    }
  };

  const bgImage = getBGImage();

  return (
    <CustomBoxFullWidth
      sx={{
        minHeight: {
          xs: moduleType === "parcel" ? "250px" : "200px",
          sm: "290px",
          md: "300px",
        },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {getCurrentModuleType() === "rental" ? (
        <Box sx={{ position: "absolute", inset: 0 }}>
          <OceanWaves theme={theme} />
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
            <CustomImageContainer
              className="left_img"
              src={LeftCar?.src}
              width={238}
              height={94}
            />
            <CustomImageContainer
              className="right_img"
              src={RightCar?.src}
              width={246}
              height={122}
            />
          </Box>
        </Box>
      ) : bgImage ? (
        <>
          {/* Background image with overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              img: { objectFit: "cover", width: "100%", height: "100%" },
            }}
          >
            <Image
              width={1917}
              height={300}
              src={bgImage}
              alt="banner"
              priority
            />
          </Box>
          {/* Nautical overlay on top of image */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(160deg, rgba(2,13,11,0.7) 0%, rgba(4,26,21,0.5) 60%, transparent 100%)"
                  : "linear-gradient(160deg, rgba(224,250,247,0.5) 0%, rgba(197,244,239,0.3) 60%, transparent 100%)",
            }}
          />
          {/* Wave bottom */}
          <Box
            component="svg"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: { xs: "50px", sm: "70px", md: "90px" },
              zIndex: 2,
            }}
          >
            <path
              d="M0,40 C180,80 360,0 540,40 C720,80 900,10 1080,45 C1260,80 1380,30 1440,50 L1440,90 L0,90 Z"
              fill={theme.palette.mode === "dark" ? "#061410" : "#f0fcfa"}
              opacity="0.9"
            />
            <path
              d="M0,60 C200,20 400,70 600,50 C800,30 1000,65 1200,45 C1320,35 1380,55 1440,40 L1440,90 L0,90 Z"
              fill={theme.palette.mode === "dark" ? "#071914" : "#e8faf8"}
              opacity="0.6"
            />
          </Box>
        </>
      ) : (
        <OceanWaves theme={theme} />
      )}
    </CustomBoxFullWidth>
  );
};

export default TopBanner;