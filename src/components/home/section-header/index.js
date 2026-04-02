import { alpha, Button, Stack, Typography, useTheme } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useRouter } from "next/router";

/**
 * Reusable section header used across homepage sections.
 * Shows a bold title on the left and an optional "Ver todos" link on the right.
 *
 * Props:
 *  - title: string
 *  - subtitle: string (optional)
 *  - href: string (optional) — if provided, shows "Ver todos" button
 */
const SectionHeader = ({ title, subtitle, href }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack
      direction="row"
      alignItems={{ xs: "flex-start", sm: "center" }}
      justifyContent="space-between"
      mb={2}
      flexWrap="wrap"
      gap={1}
    >
      <Stack spacing={0.3}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="text.primary"
          sx={{ lineHeight: 1.2 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Stack>

      {href && (
        <Button
          size="small"
          endIcon={
            <ArrowForwardIosRoundedIcon sx={{ fontSize: "12px !important" }} />
          }
          onClick={() => router.push(href)}
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontSize: "13px",
            textTransform: "none",
            borderRadius: "20px",
            px: 1.5,
            py: 0.5,
            backgroundColor: alpha(theme.palette.primary.main, 0.07),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.14),
            },
          }}
        >
          Ver todos
        </Button>
      )}
    </Stack>
  );
};

export default SectionHeader;
