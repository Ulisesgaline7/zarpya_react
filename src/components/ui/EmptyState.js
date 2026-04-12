/**
 * EmptyState — Estado vacío reutilizable
 */
import { Box, Typography, Button } from "@mui/material";

const EmptyState = ({ emoji = "📭", title, subtitle, actionLabel, onAction }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 8,
      textAlign: "center",
      gap: 1.5,
    }}
  >
    <Typography sx={{ fontSize: "3.5rem", lineHeight: 1 }}>{emoji}</Typography>
    <Typography variant="h6" fontWeight={700} color="text.primary">
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280 }}>
        {subtitle}
      </Typography>
    )}
    {actionLabel && onAction && (
      <Button
        variant="contained"
        onClick={onAction}
        sx={{ mt: 1, borderRadius: "12px", fontWeight: 700, px: 3 }}
      >
        {actionLabel}
      </Button>
    )}
  </Box>
);

export default EmptyState;
