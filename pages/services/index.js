/**
 * SERVICIOS — Marketplace tipo Fiverr/TaskRabbit
 * Modelo: Cliente busca proveedor por categoría → solicita servicio → proveedor cotiza → cliente acepta
 * UI: Categorías horizontales → Grid de proveedores → Filtros → Detalle
 */
import React, { useState } from "react";
import {
  Box, Container, Typography, Grid, Card, CardContent,
  CardActionArea, Chip, TextField, InputAdornment,
  CircularProgress, Avatar, Stack, Rating, alpha, useTheme,
  Skeleton, Badge,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import Head from "next/head";
import { useRouter } from "next/router";
import useGetServiceCategories from "../../src/api-manage/hooks/react-query/services/useGetServiceCategories";
import useGetServiceProviders from "../../src/api-manage/hooks/react-query/services/useGetServiceProviders";
import MainLayout from "../../src/components/layout/MainLayout";
import SectionHeader from "../../src/components/ui/SectionHeader";
import EmptyState from "../../src/components/ui/EmptyState";

const CATEGORY_COLORS = {
  fontaneria:   { bg: "#E0F2FE", color: "#0284C7" },
  electricidad: { bg: "#FEF9C3", color: "#CA8A04" },
  limpieza:     { bg: "#F0FDF4", color: "#16A34A" },
  mecanica:     { bg: "#FEF2F2", color: "#DC2626" },
  computadoras: { bg: "#EDE9FE", color: "#7C3AED" },
  default:      { bg: "#E6F8FA", color: "#2FB9CB" },
};

const ProviderCard = ({ provider, onClick }) => {
  const theme = useTheme();
  const catColors = CATEGORY_COLORS[provider.category?.slug] || CATEGORY_COLORS.default;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
        transition: "all 0.18s ease",
        "&:hover": { transform: "translateY(-3px)", boxShadow: `0 8px 24px ${alpha("#000", 0.1)}`, borderColor: "#2FB9CB" },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: "100%", borderRadius: "16px" }}>
        <CardContent sx={{ p: 2.5 }}>
          {/* Avatar + nombre */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.5 }}>
            <Avatar
              sx={{
                width: 48, height: 48, borderRadius: "14px",
                background: catColors.bg, color: catColors.color,
                fontSize: "1.4rem", flexShrink: 0,
              }}
            >
              {provider.category?.icon || "🔧"}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography variant="subtitle2" fontWeight={800} noWrap sx={{ flex: 1 }}>
                  {provider.business_name}
                </Typography>
                {provider.verified && (
                  <VerifiedRoundedIcon sx={{ fontSize: 16, color: "#2FB9CB", flexShrink: 0 }} />
                )}
              </Box>
              <Chip
                label={provider.category?.name}
                size="small"
                sx={{
                  height: "18px", fontSize: "10px", fontWeight: 600, mt: 0.3,
                  background: catColors.bg, color: catColors.color, border: "none",
                }}
              />
            </Box>
          </Box>

          {/* Descripción */}
          {provider.description && (
            <Typography
              variant="caption" color="text.secondary"
              sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5, mb: 1.5 }}
            >
              {provider.description}
            </Typography>
          )}

          {/* Stats */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarRoundedIcon sx={{ fontSize: 14, color: "#F59E0B" }} />
              <Typography variant="caption" fontWeight={700} color="text.primary">
                {provider.avg_rating > 0 ? provider.avg_rating.toFixed(1) : "Nuevo"}
              </Typography>
              {provider.total_reviews > 0 && (
                <Typography variant="caption" color="text.secondary">
                  ({provider.total_reviews})
                </Typography>
              )}
            </Box>
            {provider.hourly_rate && (
              <Typography variant="caption" fontWeight={800} color="primary.main">
                L {provider.hourly_rate}/hr
              </Typography>
            )}
          </Box>

          {provider.total_jobs > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
              {provider.total_jobs} trabajos completados
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const ProviderSkeleton = () => (
  <Card elevation={0} sx={{ borderRadius: "16px", border: "1px solid #eee" }}>
    <CardContent sx={{ p: 2.5 }}>
      <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
        <Skeleton variant="rounded" width={48} height={48} sx={{ borderRadius: "14px" }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="70%" height={18} />
          <Skeleton width="40%" height={14} sx={{ mt: 0.5 }} />
        </Box>
      </Box>
      <Skeleton width="100%" height={12} />
      <Skeleton width="80%" height={12} sx={{ mt: 0.5 }} />
    </CardContent>
  </Card>
);

export default function ServicesPage({ configData }) {
  const router = useRouter();
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  const { data: categoriesData, isLoading: loadingCats } = useGetServiceCategories();
  const { data: providersData, isLoading: loadingProviders } = useGetServiceProviders({ category_id: selectedCategory });

  const categories = categoriesData?.data || [];
  const rawProviders = Array.isArray(providersData?.data) ? providersData.data : (providersData?.data?.data || []);
  const providers = rawProviders.filter((p) =>
    !search || p.business_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head><title>Servicios — Zarpya</title></Head>
      <CssBaseline />
      <MainLayout configData={configData}>
        <Box sx={{ background: theme.palette.background.default, minHeight: "100vh" }}>

          {/* Hero */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #15263E 0%, #F59E0B 100%)",
              pt: { xs: 4, md: 6 }, pb: { xs: 5, md: 7 }, px: 2, textAlign: "center",
            }}
          >
            <Typography variant="h4" fontWeight={900} color="#fff" mb={0.5}>🔧 Servicios</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)", mb: 2.5 }}>
              Fontanería, electricidad, limpieza y más — profesionales verificados
            </Typography>
            <Container maxWidth="sm">
              <TextField
                fullWidth placeholder="Buscar servicio o proveedor..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchRoundedIcon sx={{ color: "rgba(0,0,0,0.4)", mr: 1 }} />,
                  sx: { borderRadius: "14px", background: "#fff", "& fieldset": { border: "none" } },
                }}
                size="small"
              />
            </Container>
          </Box>

          <Container maxWidth="lg" sx={{ pt: 3, pb: 10 }}>
            {/* Categorías */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Chip
                  label="Todos"
                  onClick={() => setSelectedCategory(null)}
                  color={!selectedCategory ? "primary" : "default"}
                  variant={!selectedCategory ? "filled" : "outlined"}
                  sx={{ fontWeight: 700, borderRadius: "10px" }}
                />
                {loadingCats
                  ? [1, 2, 3, 4].map((i) => <Skeleton key={i} width={80} height={32} sx={{ borderRadius: "10px" }} />)
                  : categories.map((cat) => (
                    <Chip
                      key={cat.id}
                      label={`${cat.icon || ""} ${cat.name}`}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                      color={selectedCategory === cat.id ? "primary" : "default"}
                      variant={selectedCategory === cat.id ? "filled" : "outlined"}
                      sx={{ fontWeight: 600, borderRadius: "10px" }}
                    />
                  ))}
              </Box>
            </Box>

            {/* Grid de proveedores */}
            <SectionHeader
              title="Proveedores disponibles"
              subtitle={`${providers.length} profesionales en tu zona`}
            />

            {loadingProviders ? (
              <Grid container spacing={2}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}><ProviderSkeleton /></Grid>
                ))}
              </Grid>
            ) : providers.length === 0 ? (
              <EmptyState
                emoji="🔧"
                title="Sin proveedores disponibles"
                subtitle="Prueba con otra categoría o amplía tu búsqueda"
                actionLabel="Ver todos"
                onAction={() => { setSelectedCategory(null); setSearch(""); }}
              />
            ) : (
              <Grid container spacing={2}>
                {providers.map((provider) => (
                  <Grid item xs={12} sm={6} md={4} key={provider.id}>
                    <ProviderCard
                      provider={provider}
                      onClick={() => router.push(`/services/provider/${provider.id}`)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </MainLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/config`, {
      headers: { "X-software-id": "33571750" },
    });
    return { props: { configData: await res.json() } };
  } catch {
    return { props: { configData: null } };
  }
};
