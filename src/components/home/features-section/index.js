import { Box, Container, Grid, Typography, alpha, useTheme } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const features = [
  {
    icon: LocalShippingOutlinedIcon,
    title: "Entrega rápida",
    description:
      "Tu pedido zarpa en minutos. Llevamos lo que necesitas directo a tu puerta sin demoras.",
    color: "#2FB9CB",
  },
  {
    icon: StarOutlineRoundedIcon,
    title: "Calidad garantizada",
    description:
      "Solo trabajamos con los mejores establecimientos para que cada experiencia valga la pena.",
    color: "#5859A3",
  },
  {
    icon: AccessTimeRoundedIcon,
    title: "Seguimiento en vivo",
    description:
      "Sigue tu envío en tiempo real. Sabe exactamente cuándo zarpa y cuándo llega.",
    color: "#4AB05E",
  },
];

const FeaturesSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "#f7fbfc",
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
          >
            Nuestros Servicios
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 480, mx: "auto" }}
          >
            Zarpa con nosotros y descubre por qué somos el destino favorito de
            tu ciudad
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Grid item xs={12} sm={4} key={feature.title}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 3,
                    borderRadius: "16px",
                    border: `1px solid ${alpha(feature.color, 0.15)}`,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? alpha(feature.color, 0.07)
                        : "#fff",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    "&:hover": {
                      boxShadow: `0 8px 30px ${alpha(feature.color, 0.18)}`,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 68,
                      height: 68,
                      borderRadius: "50%",
                      backgroundColor: alpha(feature.color, 0.12),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 32, color: feature.color }} />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: feature.color }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
