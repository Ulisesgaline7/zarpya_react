import { alpha, NoSsr, useMediaQuery, useTheme } from "@mui/material";
import AvailableZoneSection from "components/landing-page/AvailableZoneSection";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import CookiesConsent from "../CookiesConsent";
import PushNotificationLayout from "../PushNotificationLayout";
import ComponentTwo from "./ComponentTwo";
import DiscountBanner from "./DiscountBanner";
import HeroSection from "./hero-section/HeroSection";
import Registration from "./Registration";
import CustomContainer from "components/container";
import Banners from "components/landing-page/Banners";
import Box from "@mui/material/Box";
import StatsSection from "./stats-section";
import ClientSection from "./our-client/ClientSection";
import DeliveryManAppDownload from "./delivery-download-section";
import { GallerySection } from "./gallery-section";
import ImageTitleSection from "./ImageTitleSection";
import FaqTabSection from "./FaqTabSection";

const MapModal = dynamic(() => import("../Map/MapModal"));

// Sección con animación de entrada al hacer scroll
const Section = ({ children, background, py = "5rem" }) => (
  <Box
    component="section"
    sx={{
      background,
      py,
      // Entrada suave al cargar
      animation: "fadeInUp 0.6s ease both",
    }}
  >
    {children}
  </Box>
);

// Divisor minimalista entre secciones
const Divider = () => (
  <Box
    sx={{
      width: "48px",
      height: "2px",
      borderRadius: "2px",
      background: (theme) => alpha(theme.palette.primary.main, 0.25),
      margin: "0 auto",
    }}
  />
);

const LandingPage = ({ configData, landingPageData }) => {
  const Testimonials = dynamic(() => import("./Testimonials"), { ssr: false });

  const [location, setLocation] = useState(undefined);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 5000,
    isGeolocationEnabled: true,
  });

  useEffect(() => {
    setLocation(JSON.stringify(localStorage.getItem("location")));
  }, []);

  const handleClose = () => setOpen(false);
  const router = useRouter();

  const handleOrderNow = () => {
    if (location) {
      location === "null" ? setOpen(true) : router.push("/home", undefined, { shallow: true });
    } else {
      setOpen(true);
    }
  };

  // Fondos alternos minimalistas
  const bgWhite = theme.palette.background.paper;
  const bgGray  = theme.palette.mode === "dark"
    ? "rgba(255,255,255,0.02)"
    : "#f9fafb";
  const bgGreen = theme.palette.mode === "dark"
    ? "rgba(3,157,85,0.06)"
    : "rgba(3,157,85,0.04)";

  return (
    <>
      <PushNotificationLayout>

        {/* ── Hero ── */}
        <HeroSection landingPageDataheroSection={landingPageData?.hero_section} />

        {/* ── Stats ── */}
        {landingPageData?.trust_section?.trust_section_status === 1 && (
          <>
            <Divider />
            <Section background={bgWhite} py={{ xs: "3rem", md: "4rem" }}>
              <StatsSection trustSectionData={landingPageData?.trust_section} />
            </Section>
          </>
        )}

        {/* ── Zonas disponibles ── */}
        {landingPageData?.available_zone_section?.available_zone_status === 1 &&
          landingPageData?.available_zone_section?.available_zone_list?.length > 0 && (
          <>
            <Divider />
            <Section background={bgGray}>
              <AvailableZoneSection zoneSection={landingPageData?.available_zone_section} />
            </Section>
          </>
        )}

        {/* ── Banners promocionales ── */}
        {Number(landingPageData?.promotional_banner_section?.promotion_banner_section_status) === 1 && (
          <Section background={bgWhite} py={{ xs: "2rem", md: "3rem" }}>
            <Banners
              promotionalBanner={landingPageData?.promotional_banner_section?.promotion_banners_full_url}
              isSmall={isSmall}
            />
          </Section>
        )}

        {/* ── Descarga app usuario ── */}
        {landingPageData?.user_app_download_section?.download_user_app_section_status === 1 && (
          <>
            <Divider />
            <Section background={bgGreen}>
              <ComponentTwo user_app_download_section={landingPageData?.user_app_download_section} />
            </Section>
          </>
        )}

        {/* ── Clientes populares + Registro vendedor ── */}
        <Section background={bgGray}>
          <CustomContainer>
            {Number(landingPageData?.popular_client_section?.popular_client_section_status) === 1 && (
              <ClientSection popular_client_section={landingPageData?.popular_client_section} />
            )}
            {landingPageData?.seller_app_download_section?.download_seller_app_section_status === 1 && (
              <>
                <Box sx={{ mt: 4 }} />
                <Registration
                  configData={configData}
                  seller_app_download_section={landingPageData?.seller_app_download_section}
                  isSmall={isSmall}
                />
              </>
            )}
          </CustomContainer>
        </Section>

        {/* ── Descarga app repartidor ── */}
        {landingPageData?.deliveryman_app_download_section?.download_deliveryman_app_section_status === 1 && (
          <>
            <Divider />
            <Section background={bgWhite}>
              <CustomContainer>
                <DeliveryManAppDownload deliveryManApp={landingPageData?.deliveryman_app_download_section} />
              </CustomContainer>
            </Section>
          </>
        )}

        {/* ── Banner descuento + Testimonios ── */}
        <Section background={bgGray}>
          {landingPageData?.banner_section?.banner_section_status && (
            <DiscountBanner
              bannerImage={landingPageData?.banner_section?.banner_iamge_full_url}
              isSmall={isSmall}
            />
          )}
          {landingPageData?.testimonial_section?.testimonial_section_status === 1 && (
            <Box sx={{ mt: landingPageData?.banner_section?.banner_section_status ? 4 : 0 }}>
              <Testimonials
                handleOrderNow={handleOrderNow}
                testimonial_section={landingPageData?.testimonial_section}
                isSmall={isSmall}
              />
            </Box>
          )}
        </Section>

        {/* ── Galería ── */}
        {landingPageData?.gallery_section && (
          <>
            <Divider />
            <Section background={bgGreen}>
              <GallerySection gallery_section={landingPageData?.gallery_section} />
            </Section>
          </>
        )}

        {/* ── Highlight ── */}
        {landingPageData?.highlight_section?.highlight_section_status === 1 && (
          <Section background={bgWhite}>
            <CustomContainer>
              <ImageTitleSection highlight_section={landingPageData?.highlight_section} />
            </CustomContainer>
          </Section>
        )}

        {/* ── FAQ ── */}
        <Section background={bgGray} py={{ xs: "3rem", md: "5rem" }}>
          <CustomContainer>
            <FaqTabSection faq_section={landingPageData?.faq_section} />
          </CustomContainer>
        </Section>

        <Box sx={{ mb: { xs: "2rem", md: "4rem" } }} />

        {open && (
          <MapModal open={open} handleClose={handleClose} coords={coords} disableAutoFocus />
        )}

        <NoSsr>
          <CookiesConsent text={configData?.cookies_text} />
        </NoSsr>

      </PushNotificationLayout>
    </>
  );
};

export default LandingPage;