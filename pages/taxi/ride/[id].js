/**
 * TAXI — Estado del viaje en tiempo real
 * Modelo: Polling cada 10s → muestra estado, conductor, mapa
 */
import React from "react";
import {
  Box, Container, Typography, Card, CardContent,
  Button, Chip, CircularProgress, Divider, Avatar,
  Stack, alpha, useTheme, LinearProgress,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Head from "next/head";
import { useRouter } from "next/router";
import useGetTaxiRide from "../../../src/api-manage/hooks/react-query/taxi/useGetTaxiRide";
import useTaxiCancel from "../../../src/api-manage/hooks/react-query/taxi/useTaxiCancel";
import toast from "react-hot-toast";
import MainLayout from "../../../src/components/layout/MainLayout";

const STATUS_CONFIG = {
  searching:   { label: "Buscando conductor...", color: "#F59E0B", bg: "#FEF9EE", icon: "🔍", step: 1 },
  accepted:    { label: "Conductor en camino",   color: "#2FB9CB", bg: "#E6F8FA", icon: "🚗", step: 2 },
  arriving:    { label: "Conductor llegando",    color: "#6366F1", bg: "#EEEEFF", icon: "📍", step: 3 },
  in_progress: { label: "Viaje en curso",        color: "#22C55E", bg: "#F0FDF4", icon: "🛣️", step: 4 },
  completed:   { label: "¡Llegaste!",            color: "#22C55E", bg: "#F0FDF4", icon: "✅", step: 5 },
  cancelled:   { label: "Viaje cancelado",       color: "#EF4444", bg: "#FEF2F2", icon: "❌", step: 0 },
};

const STEPS = ["Buscando", "Aceptado", "En camino", "En viaje", "Completado"];

export default function TaxiRidePage({ configData }) {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const { data, isLoading } = useGetTaxiRide(id);
  const { mutateAsync: cancelRide, isLoading: cancelling } = useTaxiCancel();

  const ride = data?.data;
  const status = STATUS_CONFIG[ride?.status] || STATUS_CONFIG.searching;

  const handleCancel = async () => {
    try {
      await cancelRide({ rideId: id, reason: "Cancelado por el cliente" });
      toast.success("Viaje cancelado");
      router.push("/taxi");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Error al cancelar");
    }
  };

  return (
    <>
      <Head><title>Viaje #{id} — Zarpya Taxi</title></Head>
      <CssBaseline />
      <MainLayout configData={configData}>
        <Box sx={{ background: theme.palette.background.default, minHeight: "100vh", pb: 10 }}>
          {/* Header de estado */}
          <Box
            sx={{
              background: status.bg,
              borderBottom: `1px solid ${alpha(status.color, 0.2)}`,
              py: 3, px: 2, textAlign: "center",
            }}
          >
            <Typography sx={{ fontSize: "2.5rem", lineHeight: 1, mb: 1 }}>{status.icon}</Typography>
            <Typography variant="h6" fontWeight={800} sx={{ color: status.color }}>
              {status.label}
            </Typography>
            {ride?.status === "searching" && (
              <Box sx={{ mt: 1.5, maxWidth: 200, mx: "auto" }}>
                <LinearProgress color="warning" sx={{ borderRadius: 4, height: 4 }} />
              </Box>
            )}
          </Box>

          <Container maxWidth="sm" sx={{ pt: 3 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Stack spacing={2}>
                {/* Progreso del viaje */}
                {ride?.status !== "cancelled" && (
                  <Card elevation={0} sx={{ borderRadius: "16px", border: `1px solid ${theme.palette.divider}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {STEPS.map((step, i) => (
                          <React.Fragment key={step}>
                            <Box sx={{ textAlign: "center", flex: 1 }}>
                              <Box
                                sx={{
                                  width: 28, height: 28, borderRadius: "50%", mx: "auto", mb: 0.5,
                                  background: i < status.step ? "#2FB9CB" : i === status.step - 1 ? "#2FB9CB" : theme.palette.divider,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  transition: "all 0.3s",
                                }}
                              >
                                {i < status.step ? (
                                  <CheckCircleRoundedIcon sx={{ fontSize: 16, color: "#fff" }} />
                                ) : (
                                  <Typography sx={{ fontSize: "10px", color: i === status.step - 1 ? "#fff" : "text.secondary", fontWeight: 700 }}>
                                    {i + 1}
                                  </Typography>
                                )}
                              </Box>
                              <Typography variant="caption" sx={{ fontSize: "9px", color: i < status.step ? "#2FB9CB" : "text.secondary", fontWeight: 600 }}>
                                {step}
                              </Typography>
                            </Box>
                            {i < STEPS.length - 1 && (
                              <Box sx={{ height: 2, flex: 1, background: i < status.step - 1 ? "#2FB9CB" : theme.palette.divider, transition: "all 0.3s" }} />
                            )}
                          </React.Fragment>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                )}

                {/* Detalles del viaje */}
                {ride && (
                  <Card elevation={0} sx={{ borderRadius: "16px", border: `1px solid ${theme.palette.divider}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="subtitle2" fontWeight={700} mb={2} color="text.secondary">
                        DETALLES DEL VIAJE
                      </Typography>
                      <Stack spacing={1.5}>
                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", mt: 0.5, flexShrink: 0 }} />
                          <Typography variant="body2" color="text.primary">{ride.pickup_address}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", mt: 0.5, flexShrink: 0 }} />
                          <Typography variant="body2" color="text.primary">{ride.dropoff_address}</Typography>
                        </Box>
                      </Stack>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Typography variant="caption" color="text.secondary">Distancia</Typography>
                          <Typography variant="subtitle2" fontWeight={700}>{ride.distance_km} km</Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography variant="caption" color="text.secondary">Total</Typography>
                          <Typography variant="h6" fontWeight={900} color="primary.main">L {ride.total_fare}</Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                )}

                {/* Conductor */}
                {ride?.driver && (
                  <Card elevation={0} sx={{ borderRadius: "16px", border: `1px solid ${theme.palette.divider}` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="subtitle2" fontWeight={700} mb={2} color="text.secondary">
                        TU CONDUCTOR
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar sx={{ width: 52, height: 52, background: alpha("#2FB9CB", 0.15), color: "#2FB9CB", fontSize: "1.5rem" }}>
                          🧑‍✈️
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight={800}>
                            {ride.driver.f_name} {ride.driver.l_name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ride.driver.vehicle_type} · {ride.driver.license_plate}
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined" size="small" color="primary"
                          startIcon={<PhoneRoundedIcon />}
                          href={`tel:${ride.driver.phone}`}
                          sx={{ borderRadius: "10px", fontWeight: 700 }}
                        >
                          Llamar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                )}

                {/* Acciones */}
                {["searching", "accepted"].includes(ride?.status) && (
                  <Button
                    fullWidth variant="outlined" color="error"
                    startIcon={cancelling ? <CircularProgress size={16} /> : <CancelRoundedIcon />}
                    onClick={handleCancel} disabled={cancelling}
                    sx={{ borderRadius: "12px", fontWeight: 700, py: 1.3 }}
                  >
                    {cancelling ? "Cancelando..." : "Cancelar viaje"}
                  </Button>
                )}

                {ride?.status === "completed" && (
                  <Button
                    fullWidth variant="contained" color="primary" size="large"
                    onClick={() => router.push("/taxi")}
                    sx={{ borderRadius: "14px", fontWeight: 800, py: 1.5 }}
                  >
                    Pedir otro taxi
                  </Button>
                )}
              </Stack>
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
