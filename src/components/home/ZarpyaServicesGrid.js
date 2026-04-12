/**
 * ZarpyaServicesGrid — Grid de servicios estilo Gojek/super-app
 * Se muestra en la home debajo del hero banner.
 * Colores y tipografía originales de Zarpya.
 */
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { t } from "i18next";

// Íconos SVG inline para no depender de assets externos
const ServiceIcon = ({ emoji, size = 28 }) => (
  <Box
    sx={{
      fontSize: size,
      lineHeight: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {emoji}
  </Box>
);

const SERVICES = [
  {
    id: "food",
    label: "Comida",
    emoji: "🍔",
    color: "#FF6B35",
    bg: "#FFF3EE",
    moduleType: "food",
    path: "/home",
  },
  {
    id: "grocery",
    label: "Mercado",
    emoji: "🛒",
    color: "#4AB05E",
    bg: "#EEF8F0",
    moduleType: "grocery",
    path: "/home",
  },
  {
    id: "taxi",
    label: "Taxi",
    emoji: "🚕",
    color: "#2FB9CB",
    bg: "#E6F8FA",
    moduleType: "taxi",
    path: "/taxi",
  },
  {
    id: "pharmacy",
    label: "Farmacia",
    emoji: "💊",
    color: "#5859A3",
    bg: "#EEEEF8",
    moduleType: "pharmacy",
    path: "/home",
  },
  {
    id: "services",
    label: "Servicios",
    emoji: "🔧",
    color: "#F59E0B",
    bg: "#FEF9EE",
    moduleType: "services",
    path: "/services",
  },
  {
    id: "parcel",
    label: "Paquetería",
    emoji: "📦",
    color: "#6366F1",
    bg: "#EEEEFF",
    moduleType: "parcel",
    path: "/home",
  },
  {
    id: "rental",
    label: "Renta",
    emoji: "🚗",
    color: "#EC4899",
    bg: "#FEF0F7",
    moduleType: "rental",
    path: "/home",
  },
  {
    id: "subscription",
    label: "Plus",
    emoji: "⭐",
    color: "#7C3AED",
    bg: "#F3EEFF",
    moduleType: null,
    path: "/subscription",
  },
];

const ServiceTile = ({ service, onClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      onClick={() => onClick(service)}
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        p: { xs: "12px 6px", sm: "16px 8px" },
        borderRadius: "16px",
        cursor: "pointer",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
        background: isDark
          ? alpha(service.color, 0.12)
          : service.bg,
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 8px 24px ${alpha(service.color, 0.2)}`,
          borderColor: alpha(service.color, 0.3),
        },
        "&:active": {
          transform: "scale(0.96)",
        },
      }}
    >
      {/* Ícono con fondo circular */}
      <Box
        sx={{
          width: { xs: 44, sm: 52 },
          height: { xs: 44, sm: 52 },
          borderRadius: "50%",
          background: isDark
            ? alpha(service.color, 0.2)
            : alpha(service.color, 0.15),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ServiceIcon emoji={service.emoji} size={22} />
      </Box>

      <Typography
        variant="caption"
        fontWeight={600}
        textAlign="center"
        sx={{
          color: isDark ? "rgba(255,255,255,0.85)" : theme.palette.text.primary,
          fontSize: { xs: "11px", sm: "12px" },
          lineHeight: 1.2,
        }}
      >
        {t(service.label)}
      </Typography>
    </Paper>
  );
};

const ZarpyaServicesGrid = ({ configData }) => {
  const router = useRouter();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const { modules } = useSelector((state) => state.configData);

  // Filtrar servicios según módulos disponibles
  const availableModuleTypes = Array.isArray(modules)
    ? modules.map((m) => m.module_type)
    : [];

  const visibleServices = SERVICES.filter((s) => {
    if (!s.moduleType) return true;
    // Taxi y Servicios siempre visibles (son módulos Zarpya propios)
    if (["taxi", "services"].includes(s.moduleType)) return true;
    return availableModuleTypes.includes(s.moduleType);
  });

  const handleServiceClick = (service) => {
    if (service.path === "/home" && service.moduleType) {
      const targetModule = Array.isArray(modules)
        ? modules.find((m) => m.module_type === service.moduleType)
        : null;
      if (targetModule) {
        localStorage.setItem("module", JSON.stringify(targetModule));
      }
      router.push("/home");
    } else {
      router.push(service.path);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 0 },
        py: { xs: 2, sm: 3 },
      }}
    >
      {/* Título sección */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: theme.palette.text.primary }}
        >
          {t("¿Qué necesitas hoy?")}
        </Typography>
      </Box>

      {/* Grid de servicios */}
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {visibleServices.map((service) => (
          <Grid item xs={3} sm={3} md={1.5} key={service.id}>
            <ServiceTile service={service} onClick={handleServiceClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ZarpyaServicesGrid;
