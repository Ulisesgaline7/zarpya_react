/**
 * SUSCRIPCIONES — Planes Free / Plus / Premium
 * Modelo: Freemium. Cliente paga mensual para obtener envíos gratis, descuentos y cashback
 * UI: Tabla comparativa tipo Rappi Prime / PedidosYa+
 */
import React, { useState } from "react";
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Button, Chip, List, ListItem, ListItemIcon, ListItemText,
  CircularProgress, Divider, Stack, alpha, useTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import CurrencyExchangeRoundedIcon from "@mui/icons-material/CurrencyExchangeRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Head from "next/head";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useGetSubscriptionPlans from "../../src/api-manage/hooks/react-query/subscription/useGetSubscriptionPlans";
import usePostSubscribe from "../../src/api-manage/hooks/react-query/subscription/usePostSubscribe";
import MainLayout from "../../src/components/layout/MainLayout";

const PLANS_META = {
  free: {
    emoji: "⚪",
    gradient: "linear-gradient(135deg, #F9FAFB, #F3F4F6)",
    headerBg: "#F3F4F6",
    color: "#6B7280",
    textColor: "#374151",
    cta: "Plan actual",
    features: [
      { text: "Precio normal de envío", ok: false },
      { text: "Sin descuento en pedidos", ok: false },
      { text: "Historial básico", ok: true },
      { text: "Soporte estándar", ok: true },
    ],
  },
  plus: {
    emoji: "🔵",
    gradient: "linear-gradient(135deg, #1565C0, #1976D2)",
    headerBg: "#1565C0",
    color: "#1565C0",
    textColor: "#fff",
    cta: "Suscribir Plus",
    badge: "Más popular",
    features: [
      { text: "Envío gratis en pedidos > L 150", ok: true },
      { text: "1 envío gratis al mes", ok: true },
      { text: "5% descuento en todo", ok: true },
      { text: "Historial completo", ok: true },
    ],
  },
  premium: {
    emoji: "🟣",
    gradient: "linear-gradient(135deg, #6A1B9A, #7B1FA2)",
    headerBg: "#6A1B9A",
    color: "#6A1B9A",
    textColor: "#fff",
    cta: "Suscribir Premium",
    features: [
      { text: "Envío gratis en TODOS los pedidos", ok: true },
      { text: "10% descuento en todo", ok: true },
      { text: "Cashback 2% por pedido", ok: true },
      { text: "Historial + exportar", ok: true },
    ],
  },
};

const DEFAULT_PLANS = [
  { type: "free",    name: "Free",    price: 0,   period: "para siempre" },
  { type: "plus",    name: "Plus",    price: 99,  period: "/mes" },
  { type: "premium", name: "Premium", price: 199, period: "/mes" },
];

export default function SubscriptionPage({ configData }) {
  const theme = useTheme();
  const { profileInfo } = useSelector((s) => s.profileInfo);
  const currentPlan = profileInfo?.subscription?.type || "free";
  const { data: plansData, isLoading } = useGetSubscriptionPlans();
  const { mutateAsync: subscribe, isLoading: subscribing } = usePostSubscribe();
  const [subscribingPlan, setSubscribingPlan] = useState(null);

  const plans = plansData?.plans || DEFAULT_PLANS;

  const handleSubscribe = async (planType) => {
    if (planType === "free" || planType === currentPlan) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) { toast.error("Inicia sesión para suscribirte"); return; }
    setSubscribingPlan(planType);
    try {
      await subscribe({ plan_type: planType, payment_method: "wallet" });
      toast.success(`¡Plan ${planType} activado!`);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Error al suscribirse");
    } finally {
      setSubscribingPlan(null);
    }
  };

  return (
    <>
      <Head><title>Planes Zarpya — Suscripciones</title></Head>
      <CssBaseline />
      <MainLayout configData={configData}>
        <Box sx={{ background: theme.palette.background.default, minHeight: "100vh", pb: 10 }}>
          {/* Hero */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #15263E 0%, #2FB9CB 100%)",
              pt: { xs: 5, md: 7 }, pb: { xs: 6, md: 8 }, px: 2, textAlign: "center",
            }}
          >
            <Chip label="⭐ Zarpya Plus" sx={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, mb: 2 }} />
            <Typography variant="h3" fontWeight={900} color="#fff" mb={1} sx={{ lineHeight: 1.1 }}>
              Más pedidos,<br />menos costo
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 400, mx: "auto" }}>
              Elige el plan que mejor se adapte a ti y ahorra en cada pedido
            </Typography>
            {currentPlan !== "free" && (
              <Chip
                label={`Plan actual: ${currentPlan.toUpperCase()}`}
                sx={{ mt: 2, background: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700 }}
              />
            )}
          </Box>

          <Container maxWidth="lg" sx={{ mt: -3 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Grid container spacing={2.5} justifyContent="center">
                {plans.map((plan) => {
                  const meta = PLANS_META[plan.type] || PLANS_META.free;
                  const isCurrentPlan = currentPlan === plan.type;
                  const isPremium = plan.type === "premium";
                  const isPlus = plan.type === "plus";

                  return (
                    <Grid item xs={12} sm={6} md={4} key={plan.type}>
                      <Card
                        elevation={0}
                        sx={{
                          borderRadius: "20px",
                          border: isCurrentPlan
                            ? `2px solid ${meta.color}`
                            : `1px solid ${theme.palette.divider}`,
                          overflow: "visible",
                          position: "relative",
                          transform: isPremium ? { md: "scale(1.03)" } : "none",
                          boxShadow: isPremium ? `0 12px 40px ${alpha(meta.color, 0.25)}` : "none",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            boxShadow: `0 8px 32px ${alpha(meta.color, 0.2)}`,
                            transform: isPremium ? { md: "scale(1.05)" } : "translateY(-3px)",
                          },
                        }}
                      >
                        {/* Badge */}
                        {meta.badge && (
                          <Box
                            sx={{
                              position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                              background: meta.gradient, color: "#fff",
                              borderRadius: "20px", px: 2, py: 0.5,
                              fontSize: "11px", fontWeight: 800, whiteSpace: "nowrap",
                              boxShadow: `0 4px 12px ${alpha(meta.color, 0.4)}`,
                            }}
                          >
                            ⭐ {meta.badge}
                          </Box>
                        )}

                        {/* Header del plan */}
                        <Box
                          sx={{
                            background: meta.gradient,
                            borderRadius: "18px 18px 0 0",
                            p: 3, textAlign: "center",
                          }}
                        >
                          <Typography sx={{ fontSize: "2.2rem", lineHeight: 1, mb: 1 }}>{meta.emoji}</Typography>
                          <Typography variant="h5" fontWeight={900} color={meta.textColor} mb={0.5}>
                            {plan.name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 0.5 }}>
                            <Typography variant="h3" fontWeight={900} color={meta.textColor}>
                              {plan.price === 0 ? "Gratis" : `L ${plan.price}`}
                            </Typography>
                            {plan.price > 0 && (
                              <Typography variant="body2" color={meta.textColor} sx={{ opacity: 0.8 }}>
                                {plan.period}
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        {/* Features */}
                        <CardContent sx={{ p: 2.5 }}>
                          <List dense disablePadding>
                            {meta.features.map((feature, i) => (
                              <ListItem key={i} disablePadding sx={{ mb: 1 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                  {feature.ok
                                    ? <CheckRoundedIcon sx={{ fontSize: 18, color: meta.color }} />
                                    : <CloseRoundedIcon sx={{ fontSize: 18, color: "#D1D5DB" }} />
                                  }
                                </ListItemIcon>
                                <ListItemText
                                  primary={feature.text}
                                  primaryTypographyProps={{
                                    variant: "body2",
                                    color: feature.ok ? "text.primary" : "text.disabled",
                                    fontWeight: feature.ok ? 500 : 400,
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>

                          <Divider sx={{ my: 2 }} />

                          {isCurrentPlan ? (
                            <Button fullWidth variant="outlined" disabled sx={{ borderRadius: "12px", fontWeight: 700 }}>
                              ✓ Plan actual
                            </Button>
                          ) : plan.type === "free" ? (
                            <Button fullWidth variant="outlined" disabled sx={{ borderRadius: "12px", fontWeight: 700, color: "#9CA3AF", borderColor: "#E5E7EB" }}>
                              Gratis
                            </Button>
                          ) : (
                            <Button
                              fullWidth variant="contained" size="large"
                              onClick={() => handleSubscribe(plan.type)}
                              disabled={subscribingPlan === plan.type}
                              sx={{
                                borderRadius: "14px", fontWeight: 800, py: 1.4,
                                background: meta.gradient,
                                boxShadow: `0 6px 20px ${alpha(meta.color, 0.35)}`,
                                "&:hover": { background: meta.gradient, boxShadow: `0 8px 28px ${alpha(meta.color, 0.45)}` },
                              }}
                              startIcon={subscribingPlan === plan.type ? <CircularProgress size={18} color="inherit" /> : null}
                            >
                              {subscribingPlan === plan.type ? "Procesando..." : meta.cta}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {/* Ejemplo real */}
            <Card
              elevation={0}
              sx={{
                mt: 4, borderRadius: "16px",
                background: alpha("#2FB9CB", 0.06),
                border: `1px solid ${alpha("#2FB9CB", 0.2)}`,
              }}
            >
              <CardContent sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight={800} mb={1}>💡 Ejemplo real</Typography>
                <Typography variant="body2" color="text.secondary">
                  Un pedido de <strong>L 300</strong> con plan Plus →
                  Zarpya descuenta <strong>L 0 de envío</strong> + <strong>L 15 de descuento (5%)</strong> →
                  pagas solo <strong>L 285</strong>.
                  <br />
                  Con plan Free pagarías L 300 + envío.
                </Typography>
              </CardContent>
            </Card>
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
