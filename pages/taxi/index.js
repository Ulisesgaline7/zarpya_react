/**
 * TAXI — Página principal
 * Modelo: Uber-like. Cliente solicita viaje → conductor acepta → viaje en tiempo real
 * UI: Estimación de tarifa → Selección vehículo → Solicitar → Estado
 */
import React, { useState, useEffect } from "react";
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Button, TextField, MenuItem, Divider, Chip, CircularProgress,
  Alert, Stack, alpha, useTheme, Paper, Skeleton,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import TwoWheelerRoundedIcon from "@mui/icons-material/TwoWheelerRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import Head from "next/head";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import MainLayout from "../../src/components/layout/MainLayout";
import useTaxiEstimate from "../../src/api-manage/hooks/react-query/taxi/useTaxiEstimate";
import useTaxiRequest from "../../src/api-manage/hooks/react-query/taxi/useTaxiRequest";
import { useSelector } from "react-redux";

const VEHICLE_TYPES = [
  {
    value: "standard",
    label: "Standard",
    emoji: "🚕",
    desc: "Sedán cómodo",
    capacity: "4 pasajeros",
    color: "#2FB9CB",
  },
  {
    value: "premium",
    label: "Premium",
    emoji: "🚙",
    desc: "Vehículo de lujo",
    capacity: "4 pasajeros",
    color: "#7C3AED",
  },
  {
    value: "moto",
    label: "Moto",
    emoji: "🏍️",
    desc: "Rápido y económico",
    capacity: "1 pasajero",
    color: "#F59E0B",
  },
];

const PAYMENT_METHODS = [
  { value: "cash", label: "💵 Efectivo" },
  { value: "bac", label: "🏦 BAC" },
  { value: "ficohsa", label: "🏦 Ficohsa" },
  { value: "tigo_money", label: "📱 Tigo Money" },
];

const VehicleCard = ({ vehicle, selected, onClick }) => {
  const theme = useTheme();
  return (
    <Card
      onClick={onClick}
      elevation={0}
      sx={{
        cursor: "pointer",
        border: `2px solid ${selected ? vehicle.color : theme.palette.divider}`,
        borderRadius: "16px",
        background: selected ? alpha(vehicle.color, 0.06) : theme.palette.background.paper,
        transition: "all 0.18s ease",
        "&:hover": { borderColor: vehicle.color, transform: "translateY(-2px)" },
      }}
    >
      <CardContent sx={{ p: "14px !important", textAlign: "center" }}>
        <Typography sx={{ fontSize: "2rem", lineHeight: 1, mb: 0.5 }}>{vehicle.emoji}</Typography>
        <Typography variant="subtitle2" fontWeight={800} sx={{ color: selected ? vehicle.color : "text.primary" }}>
          {vehicle.label}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">{vehicle.desc}</Typography>
        <Chip
          label={vehicle.capacity}
          size="small"
          sx={{ mt: 0.5, fontSize: "10px", height: "18px", background: alpha(vehicle.color, 0.1), color: vehicle.color }}
        />
      </CardContent>
    </Card>
  );
};

export default function TaxiPage({ configData }) {
  const router = useRouter();
  const theme = useTheme();
  const [vehicleType, setVehicleType] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [zoneId, setZoneId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("zoneid");
        const parsed = JSON.parse(raw);
        setZoneId(Array.isArray(parsed) ? parsed[0] : parsed);
      } catch {}
    }
  }, []);

  const { mutateAsync: getEstimate, isLoading: estimating } = useTaxiEstimate();
  const { mutateAsync: requestRide, isLoading: requesting } = useTaxiRequest();

  const handleEstimate = async () => {
    if (!distanceKm || parseFloat(distanceKm) <= 0) {
      toast.error("Ingresa la distancia aproximada");
      return;
    }
    try {
      const res = await getEstimate({ zone_id: zoneId, vehicle_type: vehicleType, distance_km: parseFloat(distanceKm) });
      setEstimate(res?.data);
    } catch (e) {
      toast.error(e?.response?.data?.message || "No hay tarifas configuradas para esta zona");
    }
  };

  const handleRequest = async () => {
    if (!pickup || !dropoff) { toast.error("Ingresa origen y destino"); return; }
    if (!distanceKm) { toast.error("Ingresa la distancia"); return; }
    try {
      const res = await requestRide({
        zone_id: zoneId, vehicle_type: vehicleType,
        pickup_address: pickup, pickup_lat: 14.0818, pickup_lng: -87.2068,
        dropoff_address: dropoff, dropoff_lat: 14.09, dropoff_lng: -87.19,
        distance_km: parseFloat(distanceKm), payment_method: paymentMethod,
      });
      toast.success("¡Buscando conductor cercano!");
      router.push(`/taxi/ride/${res?.data?.id}`);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Error al solicitar viaje");
    }
  };

  return (
    <>
      <Head><title>Taxi — Zarpya</title></Head>
      <CssBaseline />
      <MainLayout configData={configData}>
        <Box sx={{ background: theme.palette.background.default, minHeight: "100vh" }}>
          {/* Hero */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #15263E 0%, #2FB9CB 100%)",
              pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 8 },
              px: 2, textAlign: "center", position: "relative", overflow: "hidden",
            }}
          >
            <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <Typography variant="h4" fontWeight={900} color="#fff" mb={0.5}>
              🚕 Pide tu Taxi
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)" }}>
              Conductores verificados · Tarifa fija · Tegucigalpa
            </Typography>
          </Box>

          <Container maxWidth="sm" sx={{ mt: -3, pb: 10 }}>
            <Card elevation={0} sx={{ borderRadius: "20px", border: `1px solid ${theme.palette.divider}`, overflow: "visible" }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>

                {/* Tipo de vehículo */}
                <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="text.secondary" sx={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
                  Tipo de vehículo
                </Typography>
                <Grid container spacing={1.5} mb={3}>
                  {VEHICLE_TYPES.map((v) => (
                    <Grid item xs={4} key={v.value}>
                      <VehicleCard vehicle={v} selected={vehicleType === v.value} onClick={() => { setVehicleType(v.value); setEstimate(null); }} />
                    </Grid>
                  ))}
                </Grid>

                {/* Origen y destino */}
                <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="text.secondary" sx={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
                  ¿A dónde vas?
                </Typography>
                <Stack spacing={1.5} mb={3}>
                  <TextField
                    fullWidth size="small" placeholder="📍 ¿Dónde estás?"
                    value={pickup} onChange={(e) => setPickup(e.target.value)}
                    InputProps={{
                      startAdornment: <MyLocationRoundedIcon sx={{ color: "#2FB9CB", mr: 1, fontSize: 18 }} />,
                      sx: { borderRadius: "12px", background: alpha("#2FB9CB", 0.04) },
                    }}
                  />
                  <TextField
                    fullWidth size="small" placeholder="🏁 ¿A dónde vas?"
                    value={dropoff} onChange={(e) => setDropoff(e.target.value)}
                    InputProps={{
                      startAdornment: <LocationOnRoundedIcon sx={{ color: "#EF4444", mr: 1, fontSize: 18 }} />,
                      sx: { borderRadius: "12px", background: alpha("#EF4444", 0.04) },
                    }}
                  />
                  <TextField
                    fullWidth size="small" type="number" placeholder="Distancia aproximada (km)"
                    value={distanceKm} onChange={(e) => { setDistanceKm(e.target.value); setEstimate(null); }}
                    inputProps={{ min: 0.1, step: 0.5 }}
                    InputProps={{
                      startAdornment: <AccessTimeRoundedIcon sx={{ color: "text.secondary", mr: 1, fontSize: 18 }} />,
                      sx: { borderRadius: "12px" },
                    }}
                  />
                </Stack>

                {/* Método de pago */}
                <Typography variant="subtitle2" fontWeight={700} mb={1.5} color="text.secondary" sx={{ textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
                  Método de pago
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                  {PAYMENT_METHODS.map((p) => (
                    <Chip
                      key={p.value}
                      label={p.label}
                      onClick={() => setPaymentMethod(p.value)}
                      variant={paymentMethod === p.value ? "filled" : "outlined"}
                      color={paymentMethod === p.value ? "primary" : "default"}
                      sx={{ fontWeight: 600, borderRadius: "10px" }}
                    />
                  ))}
                </Box>

                {/* Estimación */}
                {estimate && (
                  <Alert
                    severity="info"
                    sx={{ borderRadius: "12px", mb: 2, background: alpha("#2FB9CB", 0.08), border: `1px solid ${alpha("#2FB9CB", 0.2)}`, color: "text.primary" }}
                    icon={false}
                  >
                    <Typography variant="subtitle2" fontWeight={700} mb={1}>Tarifa estimada</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      <Chip label={`Base: L ${estimate.base_fare}`} size="small" sx={{ background: "#fff", fontWeight: 600 }} />
                      <Chip label={`Distancia: L ${estimate.distance_fare}`} size="small" sx={{ background: "#fff", fontWeight: 600 }} />
                      {estimate.multiplier > 1 && (
                        <Chip label={`×${estimate.multiplier} demanda`} size="small" color="warning" sx={{ fontWeight: 700 }} />
                      )}
                      <Chip
                        label={`Total: L ${estimate.estimated_fare}`}
                        size="small" color="primary"
                        sx={{ fontWeight: 800, fontSize: "13px" }}
                      />
                    </Stack>
                  </Alert>
                )}

                {/* Botones */}
                <Stack spacing={1.5}>
                  <Button
                    fullWidth variant="outlined" color="primary"
                    onClick={handleEstimate} disabled={estimating}
                    startIcon={estimating ? <CircularProgress size={16} /> : null}
                    sx={{ borderRadius: "12px", fontWeight: 700, py: 1.2 }}
                  >
                    {estimating ? "Calculando..." : "Ver tarifa estimada"}
                  </Button>
                  <Button
                    fullWidth variant="contained" color="primary" size="large"
                    onClick={handleRequest} disabled={requesting}
                    startIcon={requesting ? <CircularProgress size={18} color="inherit" /> : <DirectionsCarRoundedIcon />}
                    sx={{ borderRadius: "14px", fontWeight: 800, py: 1.5, fontSize: "15px", boxShadow: `0 6px 20px ${alpha("#2FB9CB", 0.4)}` }}
                  >
                    {requesting ? "Buscando conductor..." : "Solicitar Taxi"}
                  </Button>
                </Stack>

              </CardContent>
            </Card>

            {/* Info de seguridad */}
            <Stack direction="row" spacing={2} mt={3} justifyContent="center">
              {["✓ Conductores verificados", "✓ Tarifa fija", "✓ Seguro incluido"].map((t) => (
                <Typography key={t} variant="caption" color="text.secondary" fontWeight={600}>{t}</Typography>
              ))}
            </Stack>
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
    const configData = await res.json();
    return { props: { configData } };
  } catch {
    return { props: { configData: null } };
  }
};
