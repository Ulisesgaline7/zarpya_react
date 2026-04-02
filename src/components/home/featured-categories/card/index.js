import { alpha, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { getModuleId } from "helper-functions/getModuleId";
import Link from "next/link";
import NextImage from "components/NextImage";
import { useRouter } from "next/router";

export const Card = Box; // Keep export for backward compat

const FeaturedItemCard = ({ image, title, id, onlyshimmer }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const theme = useTheme();
  const queryModule = router?.query?.module || router?.query?.module_id;
  const moduleValue = Array.isArray(queryModule)
    ? queryModule[0]
    : queryModule || getModuleId();

  if (onlyshimmer) {
    return (
      <Box sx={{ px: "6px" }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: "40px",
            border: `1.5px solid ${alpha(theme.palette.neutral[400], 0.15)}`,
            backgroundColor: theme.palette.background.paper,
            width: "fit-content",
            minWidth: "110px",
          }}
        >
          <Skeleton variant="circular" width={36} height={36} />
          <Skeleton variant="text" width={60} height={18} />
        </Stack>
      </Box>
    );
  }

  return (
    <Link
      href={{
        pathname: "/search",
        query: {
          search: "category",
          id: id,
          name: title,
          data_type: "category",
          ...(moduleValue ? { module: String(moduleValue) } : {}),
        },
      }}
      passHref
    >
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          px: "10px",
          py: "8px",
          borderRadius: "40px",
          cursor: "pointer",
          border: `1.5px solid ${
            hover
              ? theme.palette.primary.main
              : alpha(theme.palette.neutral[400], 0.2)
          }`,
          backgroundColor: hover
            ? alpha(theme.palette.primary.main, 0.06)
            : theme.palette.background.paper,
          transition: "all 0.2s ease",
          boxShadow: hover
            ? `0 4px 16px ${alpha(theme.palette.primary.main, 0.18)}`
            : "0 1px 4px rgba(0,0,0,0.06)",
          mx: "4px",
          userSelect: "none",
        }}
      >
        {/* Circular image */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          <NextImage
            src={image}
            alt={title}
            height={40}
            width={40}
            objectFit="cover"
            bg={alpha(theme.palette.primary.main, 0.08)}
          />
        </Box>
        {/* Label */}
        <Typography
          variant="body2"
          fontWeight={hover ? 700 : 500}
          color={hover ? "primary.main" : "text.primary"}
          sx={{
            whiteSpace: "nowrap",
            maxWidth: "90px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
            transition: "color 0.2s ease, font-weight 0.1s ease",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Link>
  );
};

export default FeaturedItemCard;
