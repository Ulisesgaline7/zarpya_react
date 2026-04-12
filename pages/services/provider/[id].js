/**
 * SERVICIOS — Detalle del proveedor + formulario de solicitud
 * Modelo: Ver perfil → Descripción → Portafolio → Solicitar → Proveedor cotiza
 */
import React, { useState } from "react";
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Button, TextField, Chip, Divider, CircularProgress,
  Avatar, Stack, Rating, alpha, useTheme, Skeleton,
  IconButton,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import MainApi from "../../../src/api-manage/MainApi";
import { service_provider_api } from "../../../src/api-manage/ApiRoutes";
import usePostServiceRequest from "../../../src/api-manage/hooks/react-query/services/usePostServiceRequest";
import toast from "react-hot-toast";
import MainLayout from "../../../src/components/layout/MainLayout";

const CATEGORY_COLORS = {
  fontaneria:   { bg: "#E0F2FE", color: "#0284C7" },
  electricidad: { bg: "#FEF9C3", color: "#CA8A04" },
  limpieza:     { bg: "#F0FDF4", color: "#16A34A" },
  mecanica:     { bg: "#FEF2F2", color: "#DC2626" },
  computadoras: { bg: "#EDE9FE", color: "#7C3AED" },
  default:      { bg: "#E6F8FA", color: "#2FB9CB" },
};

export default function ServiceProviderPage({ configData }) {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading } = useQuery(
    ["service-provider", id],
    async () => {
      const { data } = await MainApi.get(`${service_provider_api}/${id}`);
      return data;
    },
    { enabled: !!id, retry: 1 }
  );

  const { mutateAsync: sendRequest, isLoading: sending } = usePostServiceRequest();
  const provider = data?.data;
  const catColors = CATEGORY_COLORS[provider?.category?.slug] || CATEGORY_COLORS.default;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) { toast.error("Describe lo que necesitas"); return; }
    if (!address.trim()) { toast.error("Ingresa tu dirección"); return; }
    try {
      await sendRequest({ category_id: provider?.category_id, description, address, scheduled_at: scheduledAt || undefined });
      setSubmitted(true);
      toast.success("¡Solicitud enviada! El proveedor te contactará pronto.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error al enviar solicitud");
    }
  };

  if (isLoading) {
    return (
      <MainLayout configData={configData}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: "20px", mb: 2 }} />
          <Skeleton variant="rounded" height={300} sx={{ borderRadius: "20px" }} />
        </Container>
      </MainLayout>
    );
  }

  if (!provider) return null;

  return (
    <>
      <Head><title>{provider.business_name} — Zarpya Servicios</title></Head>
      <CssBaseline />
      <MainLayout configData={configData}>
        <Box sx={{ background: theme.palette.background.default, minHeight: "100vh", pb: 10 }}>
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${catColors.color}22 0%, ${catColors.bg} 100%)`,
              borderBottom: `1px solid ${alpha(catColors.color, 0.15)}`,
              pt: 2, pb: 3, px: 2,
            }}
          >
            <Container maxWidth="md">
              <IconButton onClick={() => router.back()} sx={{ mb: 1, color: catColors.color }}>
                <ArrowBackRoundedIcon />
              </IconButton>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 64, height: 64, borderRadius: "18px",
                    background: catColors.bg, color: catColors.color,
                    fontSize: "2rem", border: `2px solid ${alpha(catColors.color, 0.2)}`,
                  }}
                >
                  {provider.category?.icon || "🔧"}
                </Avatar>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <Typography variant="h6" fontWeight={900}>{provider.business_name}</Typography>
                    {provider.verified && <VerifiedRoundedIcon sx={{ fontSize: 18, color: "#2FB9CB" }} />}
                  </Box>
                  <Chip
                    label={provider.category?.name}
                    size="small"
                    sx={{ background: catColors.bg, color: catColors.color, fontWeight: 700, fontSize: "11px" }}
                  />
                  {provider.avg_rating > 0 && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                      <StarRoundedIcon sx={{ fontSize: 14, color: "#F59E0B" }} />
                      <Typography variant="caption" fontWeight={700}>{provider.avg_rating.toFixed(1)}</Typography>
                      <Typography variant="caption" color="text.secondary">({provider.total_reviews} reseñas)</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Container>
          </Box>

          <Container maxWidth="md" sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              {/* Info del proveedor */}
              <Grid item xs={12} md={5}>
                <Stack spacing={2}>
                  {/* Descripción */}
                  {provider.description && (
                    <Card elevation={0} sx={{ borderRadius: "16px", border: `1px solid ${theme.palette.divider}` }}>
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="subtitle2" fontWeight={700} mb={1} color="text.secondary">SOBRE MÍ</Typography>
                        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.7 }}>
                          {provider.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  )}

                  {/* Stats */}
                  <Card elevation={0} sx={{ borderRadius: "16px", border: `1px solid ${theme.palette.divider}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="subtitle2" fontWeight={700} mb={2} color="text.secondary">INFORMACIÓN</Typography>
                      <Stack spacing={1.5}>
                        {provider.hourly_rate && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <AccessTimeRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="body2" color="text.secondary">Tarifa por hora</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={800} color="primary.main">L {provider.hourly_rate}</Typography>
                          </Box>
                        )}
                        {provider.total_jobs > 0 && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <CheckCircleRoundedIcon sx={{ fontSize: 16, color: "#22C55E" }} />
                              <Typography variant="body2" color="text.secondary">Trabajos completados</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={700}>{provider.total_jobs}</Typography>
                          </Box>
                        )}
                        {provider.zone?.name && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <LocationOnRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="body2" color="text.secondary">Zona</Typography>
                            </Box>
                            <Typography variant="body2" fontWeight={600}>{provider.zone.name}</Typography>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              {/* Formulario de solicitud */}
              <Grid item xs={12} md={7}>
                {submitted ? (
                  <Card elevation={0} sx={{ borderRadius: "20px", border: `1px solid ${alpha("#22C55E", 0.3)}`, background: alpha("#22C55E", 0.04) }}>
                    <CardContent sx={{ p: 4, textAlign: "center" }}>
                      <Typography sx={{ fontSize: "3rem", mb: 2 }}>✅</Typography>
                      <Typography variant="h6" fontWeight={800} mb={1}>¡Solicitud enviada!</Typography>
                      <Typography variant="body2" color="text.secondary" mb={3}>
                        {provider.business_name} revisará tu solicitud y te contactará pronto para coordinar.
                      </Typography>
                      <Stack spacing={1.5}>
                        <Button variant="contained" color="primary" onClick={() => router.push("/services/my-requests")} sx={{ borderRadius: "12px", fontWeight: 700 }}>
                          Ver mis solicitudes
                        </Button>
                        <Button variant="outlined" onClick={() => router.push("/services")} sx={{ borderRadius: "12px", fontWeight: 700 }}>
                          Explorar más servicios
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ) : (
                  <Card elevation={0} sx={{ borderRadius: "20px", border: `1px solid ${theme.palette.divider}` }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={800} mb={0.5}>Solicitar servicio</Typography>
                      <Typography variant="caption" color="text.secondary" mb={3} display="block">
                        Describe tu necesidad y el proveedor te enviará una cotización
                      </Typography>
                      <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                          <TextField
                            fullWidth multiline rows={4}
                            label="¿Qué necesitas?"
                            placeholder="Ej: Tengo una fuga de agua en el baño del segundo piso, necesito reparación urgente..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            InputProps={{ sx: { borderRadius: "12px" } }}
                          />
                          <TextField
                            fullWidth
                            label="Dirección"
                            placeholder="Col. Kennedy, Tegucigalpa"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            InputProps={{
                              startAdornment: <LocationOnRoundedIcon sx={{ color: "text.secondary", mr: 1, fontSize: 18 }} />,
                              sx: { borderRadius: "12px" },
                            }}
                          />
                          <TextField
                            fullWidth type="datetime-local"
                            label="Fecha y hora preferida (opcional)"
                            value={scheduledAt}
                            onChange={(e) => setScheduledAt(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ sx: { borderRadius: "12px" } }}
                          />
                          <Button
                            type="submit" variant="contained" fullWidth size="large"
                            disabled={sending}
                            startIcon={sending ? <CircularProgress size={18} color="inherit" /> : <WorkRoundedIcon />}
                            sx={{
                              borderRadius: "14px", fontWeight: 800, py: 1.5, fontSize: "15px",
                              boxShadow: `0 6px 20px ${alpha("#2FB9CB", 0.35)}`,
                            }}
                          >
                            {sending ? "Enviando..." : "Enviar solicitud"}
                          </Button>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
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
