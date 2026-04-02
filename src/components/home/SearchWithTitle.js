import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { getCurrentModuleType } from "helper-functions/getCurrentModuleType";
import { ModuleTypes } from "helper-functions/moduleTypes";
import ManageSearch from "../header/second-navbar/ManageSearch";
import TrackParcelFromHomePage from "../parcel/TrackParcelFromHomePage";
import { useSelector } from "react-redux";

const SearchWithTitle = (props) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const moduleType = getCurrentModuleType();
  const { zoneid, token, searchQuery, name, query, currentTab } = props;
  const { configData } = useSelector((state) => state.configData);

  const getBannerTexts1 = t("Get your car rental service with");
  const getBannerSubTexts = t("with affordable price.");

  const getBannerTexts = () => {
    switch (getCurrentModuleType()) {
      case ModuleTypes.GROCERY:
        return {
          title: "Lo mejor zarpa directo a tu puerta",
          subTitle: "Mercado fresco entregado en menos de una hora",
        };
      case ModuleTypes.PHARMACY:
        return {
          title: "Tu salud siempre a flote",
          subTitle: "Medicamentos y cuidado personal en tu puerto",
        };
      case ModuleTypes.ECOMMERCE:
        return {
          title: "Descubre lo que zarpa para ti",
          subTitle: "Los mejores productos anclan en tu puerta",
        };
      case ModuleTypes.FOOD:
        return {
          title: "¡El sabor zarpa hacia ti!",
          subTitle: "El mejor restaurante navega hasta tu puerta",
        };
      case ModuleTypes.PARCEL:
        return {
          title: "Sigue tu envío en alta mar",
          subTitle: "Rastrea tu paquete en tiempo real, donde zarpe.",
        };
      case ModuleTypes.RENTAL:
        return {
          title: "Zarpa hacia tu próxima aventura",
          subTitle: `${getBannerTexts1} ${configData?.business_name} ${getBannerSubTexts}`,
        };
      default:
        return { title: "", subTitle: "" };
    }
  };

  const isRental = moduleType === "rental";
  const isParcel = moduleType === "parcel";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: isSmall ? "14px" : "22px",
        px: { xs: 2, sm: 4 },
        py: { xs: 3, md: 4 },
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          maxWidth: "680px",
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
          {t(getBannerTexts().title)}
        </Typography>
        <Typography
          variant={isSmall ? "body2" : "body1"}
          sx={{
            color: "rgba(255,255,255,0.82)",
            maxWidth: "480px",
            lineHeight: 1.6,
          }}
        >
          {t(getBannerTexts().subTitle)}
        </Typography>
      </Box>

      {isParcel ? (
        <TrackParcelFromHomePage />
      ) : isRental ? null : (
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "560px", md: "640px" },
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
