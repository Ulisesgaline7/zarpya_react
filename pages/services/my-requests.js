/**
 * SERVICIOS — Mis solicitudes
 * Modelo: Historial de solicitudes con estado → cotización → aceptar → completar
 */
import React from "react";
import {
  Box, Container, Typography, Card, CardContent,
  Chip, CircularProgress, Button, Divider, Stack,
  Avatar, alpha, useTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Head from "next/head";
import { useRouter } from "next/router";
import useGetMyServiceRequests from "../../src/api-manage/hooks/react-query/services/useGetMyServiceRequests";
import MainLayout from "../../src/components/layout/MainLayout";
import EmptyState from "../../src/components/ui/EmptyState";

const STATUS_CONFIG = {
  open:        { label: "Abierta",        color: "info",    bg: "#EFF6FF", dot: "#3B82F6" },
  quoted:      { label: "Con cotización", color: "warning", bg: "#FFFBEB", dot: "#F59E0B" },
  accepted:    { label: "Aceptada",       color: "success", bg: "#F0FDF4", dot: "#22C55E" },
  in_progress: { label: "En proceso",     color: "primary", bg: "#E6F8FA", dot: "#2FB9CB" },
  completed:   { label: "Completada",     color: "success", bg: "#F0FDF4", dot: "#22C55E" },
  cancelled:   { label: "Cancelada",      color: "error",   bg: "#FEF2F2", dot: "#EF4444" },
  disputed:    { label: "En disputa",     color: "error",   bg: "#FEF2F2", dot: "#EF4444" },
};

export default function MyServiceRequestsPage({ configData }) {
  const router = useRouter();
  const theme = useTheme();
  const { data, isLoading } = useGetMyServiceRequests();
  const requests = Array.isArray(data?.data) ? data.data : (data?.data?.data || []);

  return (
    <>
      <Head><title>Mis solicitudes — Zarpya Servicios</title></Head>
      <CssBaseline />
      <MainLayout configData={configData}>
        <Box sx={{ background: theme.palette.background.default, minHeight: "100vh", pb: 10 }}>
          {/* Header */}
          <Box sx={{ background: theme.palette.background.paper, borderBottom: `1px solid ${theme.palette.divider}`, py: 2.5, px: 2 }}>
            <Container maxWidth="md">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" fontWeight={800}>Mis solicitudes</Typography>
                  <Typography variant="caption" color="text.secondary">Historial de servicios solicitados</Typography>
                </Box>
                <Button
                  variant="contained" color="primary" size="small"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => router.push("/services")}
                  sx={{ borderRadius: "10px", fontWeight: 700 }}
                >
                  Nueva
                </Button>
              </Box>
            </Container>
          </Box>

          <Container maxWidth="md" sx={{ pt: 3 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : requests.length === 0 ? (
              <EmptyState
                emoji="🔧"
                title="Sin solicitudes aún"
                subtitle="Explora los servicios disponibles y solicita el que necesitas"
                actionLabel="Explorar servicios"
                onAction={() => router.push("/services")}
              />
            ) : (
              <Stack spacing={2}>
                {requests.map((req) => {
                  const sc = STATUS_CONFIG[req.status] || STATUS_CONFIG.open;
                  return (
                    <Card
                      key={req.id}
                      elevation={0}
                      sx={{
                        borderRadius: "16px",
                        border: `1px solid ${theme.palette.divider}`,
                        transition: "all 0.15s",
                        "&:hover": { borderColor: "#2FB9CB", boxShadow: `0 4px 16px ${alpha("#000", 0.08)}` },
                      }}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{ width: 40, height: 40, borderRadius: "12px", background: alpha("#2FB9CB", 0.1), color: "#2FB9CB", fontSize: "1.2rem" }}>
                              {req.category?.icon || "🔧"}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={700}>{req.category?.name || "Servicio"}</Typography>
                              {req.provider && (
                                <Typography variant="caption" color="text.secondary">{req.provider.business_name}</Typography>
                              )}
                            </Box>
                          </Box>
                          <Chip
                            label={sc.label}
                            size="small"
                            sx={{
                              background: sc.bg, color: sc.dot,
                              fontWeight: 700, fontSize: "11px",
                              border: `1px solid ${alpha(sc.dot, 0.2)}`,
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body2" color="text.secondary"
                          sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", mb: 1.5 }}
                        >
                          {req.description}
                        </Typography>

                        <Divider sx={{ mb: 1.5 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(req.created_at).toLocaleDateString("es-HN", { day: "numeric", month: "short", year: "numeric" })}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {req.quoted_price && (
                              <Typography variant="caption" fontWeight={700} color="text.secondary">
                                Cotización: L {req.quoted_price}
                              </Typography>
                            )}
                            {req.final_price && (
                              <Typography variant="subtitle2" fontWeight={800} color="primary.main">
                                L {req.final_price}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
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
