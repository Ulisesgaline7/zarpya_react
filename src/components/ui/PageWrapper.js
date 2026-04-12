/**
 * PageWrapper — Contenedor de página con padding consistente
 * Usado en todas las páginas de módulos
 */
import { Box, Container } from "@mui/material";

const PageWrapper = ({ children, maxWidth = "lg", noPadding = false }) => (
  <Box
    sx={{
      minHeight: "70vh",
      pb: { xs: "80px", md: "40px" }, // espacio para bottom nav en móvil
    }}
  >
    <Container maxWidth={maxWidth} sx={{ px: noPadding ? 0 : { xs: 2, sm: 3, md: 3 } }}>
      {children}
    </Container>
  </Box>
);

export default PageWrapper;
