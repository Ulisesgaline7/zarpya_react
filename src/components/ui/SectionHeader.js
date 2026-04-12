/**
 * SectionHeader — Encabezado de sección reutilizable
 * Patrón: Título bold + subtítulo + acción opcional
 */
import { Box, Typography, Button, alpha, useTheme } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useRouter } from "next/router";

const SectionHeader = ({ title, subtitle, href, actionLabel = "Ver todos", emoji }) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Box>
        {emoji && (
          <Typography variant="h4" sx={{ lineHeight: 1, mb: 0.5 }}>
            {emoji}
          </Typography>
        )}
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ color: theme.palette.text.primary, lineHeight: 1.2 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.3, display: "block" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {href && (
        <Button
          size="small"
          endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: "14px !important" }} />}
          onClick={() => router.push(href)}
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "none",
            background: alpha(theme.palette.primary.main, 0.08),
            borderRadius: "20px",
            px: 1.5,
            py: 0.5,
            "&:hover": { background: alpha(theme.palette.primary.main, 0.15) },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default SectionHeader;
