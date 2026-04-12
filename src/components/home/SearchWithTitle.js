import {
  Box,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useTranslation } from "react-i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import ManageSearch from "../header/second-navbar/ManageSearch";
import TrackParcelFromHomePage from "../parcel/TrackParcelFromHomePage";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const SearchWithTitle = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const moduleType = getCurrentModuleType();
  const { zoneid, token, searchQuery, name, query, currentTab } = props;
  const { configData } = useSelector((state) => state.configData);

  // Leer ubicación guardada
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLocation(localStorage.getItem("location") || "");
    }
  }, []);

  const getBannerTexts = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return { title: "Lo mejor zarpa directo a tu puerta", subTitle: "Mercado fresco entregado en menos de una hora" };
      case ModuleTypes.PHARMACY:
        return { title: "Tu salud siempre a flote", subTitle: "Medicamentos y cuidado personal en tu puerto" };
      case ModuleTypes.ECOMMERCE:
        return { title: "Descubre lo que zarpa para ti", subTitle: "Los mejores productos anclan en tu puerta" };
      case ModuleTypes.FOOD:
        return { title: "¡El sabor zarpa hacia ti!", subTitle: "El mejor restaurante navega hasta tu puerta" };
      case ModuleTypes.PARCEL:
        return { title: "Sigue tu envío en alta mar", subTitle: "Rastrea tu paquete en tiempo real, donde zarpe." };
      case ModuleTypes.RENTAL:
        return { title: "Zarpa hacia tu próxima aventura", subTitle: `Renta con ${configData?.business_name}` };
      default:
        return { title: "¿Qué zarpa hoy?", subTitle: "Comida, mercado, taxi y más — todo en un lugar" };
    }
  };

  const isRental = moduleType === "rental";
  const isParcel = moduleType === "parcel";
  const { title, subTitle } = getBannerTexts();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isSmall ? "12px" : "18px",
        px: { xs: 2, sm: 4 },
        py: { xs: 2.5, md: 3.5 },
        textAlign: "center",
      }}
    >
      {/* Chip de ubicación estilo Gojek */}
      {location && (
        <Chip
          icon={<LocationOnRoundedIcon sx={{ fontSize: "14px !important", color: "rgba(255,255,255,0.9) !important" }} />}
          deleteIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: "16px !important", color: "rgba(255,255,255,0.7) !important" }} />}
          onDelete={() => {}}
          label={
            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.95)",
                fontWeight: 600,
                fontSize: "12px",
                maxWidth: { xs: "180px", sm: "280px" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {location.length > 35 ? location.substring(0, 35) + "…" : location}
            </Typography>
          }
          sx={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "20px",
            height: "32px",
            cursor: "pointer",
            "&:hover": {
              background: "rgba(255,255,255,0.22)",
            },
          }}
        />
      )}

      {/* Título y subtítulo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
          maxWidth: "640px",
        }}
      >
        <Typography
          variant={isSmall ? "h5" : "h3"}
          fontWeight={800}
          component="h1"
          sx={{
            color: "#fff",
            lineHeight: 1.2,
            letterSpacing: "-0.5px",
            textShadow: "0 2px 12px rgba(0,0,0,0.25)",
          }}
        >
          {t(title)}
        </Typography>
        <Typography
          variant={isSmall ? "body2" : "body1"}
          sx={{
            color: "rgba(255,255,255,0.82)",
            maxWidth: "460px",
            lineHeight: 1.6,
          }}
        >
          {t(subTitle)}
        </Typography>
      </Box>

      {/* Buscador */}
      {isParcel ? (
        <TrackParcelFromHomePage />
      ) : isRental ? null : (
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "540px", md: "620px" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
              borderRadius: "14px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              "&:hover fieldset": { borderColor: "transparent" },
              "&.Mui-focused fieldset": { borderColor: "transparent" },
            },
          }}
        >
          <ManageSearch
            zoneid={zoneid}
            token={token}
            maxwidth="false"
            fullWidth
            searchQuery={searchQuery}
            name={name}
            query={query}
            currentTab={currentTab}
          />
        </Box>
      )}
    </Box>
  );
};

export default SearchWithTitle;
