import { Box, Button, Container, Grid, Typography, alpha, useTheme } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { useSelector } from "react-redux";

const AppDownloadCTA = () => {
  const theme = useTheme();
  const { configData } = useSelector((state) => state.configData);

  const appStoreLink = configData?.app_store_link || "#";
  const playStoreLink = configData?.play_store_link || "#";

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, #15263E 0%, #1a3a5c 50%, ${alpha("#2FB9CB", 0.9)} 100%)`,
        py: { xs: 6, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative wave top */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "#f7fbfc",
          clipPath: "ellipse(55% 100% at 50% 0%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h3"
                fontWeight={800}
                color="#fff"
                sx={{ lineHeight: 1.2, letterSpacing: "-0.5px" }}
              >
                Tu sabor favorito,
                <br />
                donde quiera que zarpes
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: alpha("#fff", 0.75), maxWidth: 440 }}
              >
                Descarga la app de Zarpya y pide desde tu móvil en segundos.
                Delivery, recoger en tienda y más — siempre a tu alcance.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                  mt: 1,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AndroidIcon />}
                  href={playStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#15263E",
                    fontWeight: 700,
                    borderRadius: "10px",
                    px: 3,
                    py: 1.2,
                    "&:hover": {
                      backgroundColor: alpha("#fff", 0.9),
                    },
                    "& .MuiButton-startIcon svg": { color: "#2FB9CB" },
                  }}
                >
                  Google Play
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AppleIcon />}
                  href={appStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: alpha("#fff", 0.5),
                    color: "#fff",
                    fontWeight: 700,
                    borderRadius: "10px",
                    px: 3,
                    py: 1.2,
                    "&:hover": {
                      borderColor: "#fff",
                      backgroundColor: alpha("#fff", 0.08),
                    },
                  }}
                >
                  App Store
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
            <Box
              sx={{
                width: 220,
                height: 380,
                borderRadius: "32px",
                background: alpha("#fff", 0.08),
                border: `2px solid ${alpha("#fff", 0.2)}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                boxShadow: `0 30px 80px ${alpha("#000", 0.3)}`,
              }}
            >
              <Typography variant="h6" color={alpha("#fff", 0.4)} textAlign="center">
                📱<br />App Preview
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Decorative wave bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.background.default
              : "#fff",
          clipPath: "ellipse(55% 100% at 50% 100%)",
        }}
      />
    </Box>
  );
};

export default AppDownloadCTA;
