import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  CustomBoxFullWidth,
  CustomStackFullWidth,
} from "styled-components/CustomStyles.style";
import CustomContainer from "../../container";
import HeroTitleSection from "./HeroTitleSection";
import DollarSignHighlighter from "components/DollarSignHighlighter";

const DynamicModuleSelection = dynamic(() =>
  import("./module-selection/ModuleSelectionRaw")
);

const FloatingEmoji = ({ emoji, top, left, right, bottom, size, delay, animB }) => (
  <Box sx={{
    position: "absolute",
    top, left, right, bottom,
    fontSize: size ?? "60px",
    pointerEvents: "none",
    userSelect: "none",
    filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
    opacity: 0.65,
    animation: `${animB ? "heroFloatB" : "heroFloat"} ${animB ? "5s" : "4s"} ease-in-out infinite`,
    animationDelay: delay ?? "0s",
    zIndex: 0,
    display: { xs: "none", md: "block" },
  }}>
    {emoji}
  </Box>
);

const HeroSection = ({ landingPageDataheroSection }) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mounted, setMounted] = useState(false);
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentLocation(window.localStorage.getItem("location"));
    }
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const calculateTopMargin = () => {
    if (currentLocation) {
      return { xs: "4rem", sm: "5rem", md: "7rem" };
    }
    return { xs: "4rem", sm: "5rem", md: "5rem" };
  };

  const primary = theme.palette.primary.main;

  return (
    <>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes heroFloatB {
          0%, 100% { transform: translateY(-8px) rotate(3deg); }
          50% { transform: translateY(8px) rotate(-3deg); }
        }
        @keyframes heroShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-shimmer-text {
          background: linear-gradient(135deg, ${primary}, #7fffd4, ${primary});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: heroShimmer 3s linear infinite;
        }
        .hero-tag-pill:hover {
          border-color: ${primary} !important;
          color: ${primary} !important;
        }
      `}</style>

      <CustomContainer>
        <CustomBoxFullWidth
          sx={{
            marginTop: calculateTopMargin(),
            borderRadius: { xs: "20px", md: "28px" },
            position: "relative",
            overflow: "hidden",
            background: isDark
              ? "linear-gradient(145deg, #061410 0%, #0a1f1b 55%, #071510 100%)"
              : "linear-gradient(145deg, #e8faf8 0%, #f0fcfa 55%, #d9f5f2 100%)",
            border: `1px solid ${isDark ? "rgba(0,204,188,0.18)" : "rgba(0,204,188,0.25)"}`,
            boxShadow: isDark
              ? "0 24px 80px rgba(0,0,0,0.55)"
              : "0 8px 60px rgba(0,204,188,0.14)",
            padding: { xs: "52px 20px 44px", sm: "80px 48px 68px", md: "100px 80px 88px" },
            minHeight: { xs: "auto", md: "480px" },
            display: "flex",
            alignItems: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Glow top center */}
          <Box sx={{
            position: "absolute", top: "-25%", left: "50%",
            transform: "translateX(-50%)",
            width: "700px", height: "500px",
            background: isDark
              ? "radial-gradient(ellipse, rgba(0,204,188,0.1) 0%, transparent 65%)"
              : "radial-gradient(ellipse, rgba(0,204,188,0.15) 0%, transparent 65%)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Glow bottom right */}
          <Box sx={{
            position: "absolute", bottom: "-20%", right: "8%",
            width: "400px", height: "300px",
            background: isDark
              ? "radial-gradient(ellipse, rgba(0,168,78,0.07) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(0,168,78,0.09) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }} />

          {/* Decorative rings */}
          <Box sx={{
            position: "absolute", top: "8%", right: "5%",
            width: 210, height: 210, borderRadius: "50%",
            border: `1px solid ${isDark ? "rgba(0,204,188,0.08)" : "rgba(0,204,188,0.15)"}`,
            pointerEvents: "none",
          }} />
          <Box sx={{
            position: "absolute", top: "16%", right: "9%",
            width: 115, height: 115, borderRadius: "50%",
            border: `1px solid ${isDark ? "rgba(0,204,188,0.05)" : "rgba(0,204,188,0.1)"}`,
            pointerEvents: "none",
          }} />

          {/* Floating emojis */}
          <FloatingEmoji emoji="🍔" top="18%" right="11%" size="72px" />
          <FloatingEmoji emoji="🍕" top="58%" right="4%" size="56px" animB delay="0.5s" />
          <FloatingEmoji emoji="🍜" top="22%" left="4%" size="52px" delay="1s" />
          <FloatingEmoji emoji="🌮" bottom="20%" left="11%" size="44px" animB delay="2s" />

          {/* Main content */}
          <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>

            {/* Badge */}
            {landingPageDataheroSection?.header_tag_line && (
              <Box sx={{
                display: "flex", justifyContent: "center",
                mb: { xs: 3, md: 4 },
                animation: mounted ? "heroSlideUp 0.6s 0.05s ease both" : "none",
              }}>
                <Box sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  px: 2.5, py: 0.9, borderRadius: "99px",
                  background: isDark ? "rgba(0,204,188,0.1)" : "rgba(0,204,188,0.1)",
                  border: `1px solid ${isDark ? "rgba(0,204,188,0.3)" : "rgba(0,204,188,0.35)"}`,
                }}>
                  <Box sx={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: primary,
                    boxShadow: `0 0 0 3px ${primary}40`,
                    flexShrink: 0,
                  }} />
                  <Typography sx={{
                    fontSize: { xs: "11px", sm: "12px" },
                    fontWeight: 700,
                    color: primary,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                  }}>
                    {landingPageDataheroSection.header_tag_line}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Title */}
            <Box sx={{
              textAlign: "center", maxWidth: "820px", mx: "auto",
              mb: { xs: 2, md: 3 },
              animation: mounted ? "heroSlideUp 0.7s 0.1s ease both" : "none",
            }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "30px", sm: "46px", md: "64px" },
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: isDark ? "#e8f5ee" : theme.palette.neutral[1000],
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {landingPageDataheroSection?.header_title ? (
                  <DollarSignHighlighter
                    theme={theme}
                    text={landingPageDataheroSection.header_title}
                  />
                ) : (
                  <>
                    Tu comida favorita,{" "}
                    <span className="hero-shimmer-text">directo a tu puerta</span>
                  </>
                )}
              </Typography>
            </Box>

            {/* Subtitle */}
            {landingPageDataheroSection?.header_sub_title && (
              <Box sx={{
                textAlign: "center", maxWidth: "560px", mx: "auto",
                mb: { xs: 3.5, md: 4.5 },
                animation: mounted ? "heroSlideUp 0.7s 0.18s ease both" : "none",
              }}>
                <Typography sx={{
                  fontSize: { xs: "14px", sm: "17px", md: "18px" },
                  fontWeight: 400,
                  lineHeight: 1.72,
                  color: isDark
                    ? "rgba(232,245,238,0.62)"
                    : theme.palette.text.secondary,
                }}>
                  {landingPageDataheroSection.header_sub_title}
                </Typography>
              </Box>
            )}

            {/* Search / Module */}
            <Box sx={{
              maxWidth: "700px", mx: "auto",
              animation: mounted ? "heroSlideUp 0.7s 0.28s ease both" : "none",
            }}>
              <HeroTitleSection landingPageData={landingPageDataheroSection} />
            </Box>

            {/* Quick tags */}
            <Box sx={{
              display: "flex", gap: 1.5, justifyContent: "center",
              flexWrap: "wrap", mt: 2.5,
              animation: mounted ? "heroSlideUp 0.7s 0.38s ease both" : "none",
            }}>
              {["🔥 Más pedidos", "⚡ Entrega express", "🎉 Nuevos restaurantes"].map(tag => (
                <Box
                  key={tag}
                  className="hero-tag-pill"
                  sx={{
                    px: 2, py: 0.7,
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    borderRadius: "99px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: isDark ? "rgba(232,245,238,0.5)" : theme.palette.text.secondary,
                    cursor: "pointer",
                    border: `1px solid ${isDark ? "rgba(0,204,188,0.12)" : "rgba(0,204,188,0.18)"}`,
                    transition: "all 0.2s ease",
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>

          </Box>
        </CustomBoxFullWidth>
      </CustomContainer>
    </>
  );
};

export default HeroSection;